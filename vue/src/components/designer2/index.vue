<template>
  <div>
    <el-row class="top">
      <el-col :span="2" align="right" style="height: 100%;overflow: hidden;">
        <el-image style="width: 40px; height: 40px;padding: 0;margin: 0" :src="require('/src/assets/logo.png')"
                  fit="fill"/>
      </el-col>
      <el-col :span="6">
        <span class="el-icon-magic-stick lg" style="width: 30px"/>
        <span>大屏设计</span>
      </el-col>
      <el-col :span="16" @click.self.native="outBlur">
        <el-button size="mini" @click="preview" style="margin: 10px 10px;
            background: #49586e;color: #fff;float: right">预览</el-button>
        <el-button size="mini" @click="submitDesign" style="margin: 10px 5px;background: #d5d9e2;float: right">保存</el-button>
        <div style="float: right;margin: 1px 10px;" class="configBtn" @click="clearDesign">
          <i style="font-size: 22px;" class="el-icon-delete"/>
        </div>
        <div style="float: right;margin: 0 10px;">
          <el-dropdown @command="exportCommand">
            <span class="el-dropdown-link">
              导出<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="img">图片</el-dropdown-item>
              <el-dropdown-item command="json">设计文件</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div style="float: right;margin: 0 10px;" @click="importDesign()">
          <span style="font-size: 14px;cursor: pointer">导入</span>
        </div>
      </el-col>
    </el-row>
    <div class="designerPanel">
      <div class="ctrArea">
        <component-bar @dragStart="dragStart" :selectedComponents="cacheComponents" :currentCptIndex="currentCptIndex"
                       @showConfigBar="showConfigBar" @copyCpt="copyCpt" @delCpt="delCpt"/><!--左侧组件栏-->
      </div>
      <div class="designArea">
        哈哈哈哈哈
      </div>
      <div class="configArea">
        <config-bar ref="configBar" :currentCpt.sync="currentCpt" :designData.sync="designData" @refreshCptData="refreshCptData" :height="windowHeight"/><!--右侧属性栏-->
      </div>
    </div>
    
    <input v-show="false" type="file" id="files" ref="refFile" @change="fileLoad" accept=".cd">
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import {fileDownload} from '@/utils/FileUtil'
import env from "/env";
import {clearCptInterval} from "@/utils/refreshCptData";
import ComponentBar from "@/components/designer2/componentBar";
import ConfigBar from "@/components/designer2/configBar";
// import ScaleMarkX from "@/components/designer2/scaleMark/ScaleMarkX";
// import ScaleMarkY from "@/components/designer2/scaleMark/ScaleMarkY";

export default {
  name: 'design-index',
  components: {ConfigBar, ComponentBar},
  data() {
    return {
      windowWidth:0,
      windowHeight:0,
      fileUrl:env.fileUrl,
      cptBarWidth:200,
      configBarWidth:300,
      copyDom: '',
      designData:{
        id:'',title:'我的大屏', scaleX:1920, scaleY:1080, version:'',
        bgColor:'#2B3340',simpleDesc:'',bgImg:'',viewCode:'',components:[]
      },
      cacheComponents:[],
      currentCptIndex: -1,
      currentCpt: {cptOption: undefined},
      containerScale:1,
      cacheChoices:{},
      cacheChoicesFixed:{}//记录移动前选中组件的位置 自定义事件内部无法处理，放在了外面。
    }
  },
  created() {
    this.loadCacheData();
  },
  mounted() {
    const that = this;
    this.initContainerSize();
    window.addEventListener("keydown",(event)=>{
      if (that.currentCptIndex !== -1){
        let key = event.key
        switch (key) {//方向键移动当前组件
          case 'ArrowDown':
            that.currentCpt.cptY += 1;
            break;
          case 'ArrowUp':
            that.currentCpt.cptY -= 1;
            break;
          case 'ArrowLeft':
            that.currentCpt.cptX -= 1
            break;
          case 'ArrowRight':
            that.currentCpt.cptX += 1
            break;
        }
      }
    })
    window.onresize = () => {
      return (() => {
        that.initContainerSize()
      })();
    };
  },
  methods: {
    initContainerSize(){
      this.windowWidth = document.documentElement.clientWidth - 320;
      this.windowHeight = document.documentElement.clientHeight;
      console.log("initContainerSize windowWidth:", this.windowWidth, this.windowHeight);
      let tempWidth = this.windowWidth - this.cptBarWidth - this.configBarWidth;
      this.containerScale = Math.round(tempWidth / this.designData.scaleX * 100) / 100
    },
    exportCommand(command) {
      if(command === 'img'){
        html2canvas(this.$refs.webContainer, {backgroundColor: '#49586e'}).then(canvas => {
          const canvasData = canvas.toDataURL("image/jpeg");
          fileDownload(canvasData,this.designData.title+'.png');
        })
      }else if(command === 'json'){
        this.designData.components = this.cacheComponents;
        this.designData.version = env.version;
        const data = JSON.stringify(this.designData)
        let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(data);//encodeURIComponent解决中文乱码
        fileDownload(uri,this.designData.title+'.cd');
      }
    },
    importDesign(){
      this.$refs.refFile.dispatchEvent(new MouseEvent('click'))
    },
    fileLoad(){
      const that = this;
      const selectedFile = this.$refs.refFile.files[0];
      const reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = function() {
        const fileJson = JSON.parse(this.result);//文件大小、合法性待校验
        if (!fileJson.version || fileJson.version !== env.version){
          that.$message.error('导入失败，与当前版本不一致');
        }else{
          fileJson.id = that.designData.id
          that.designData = fileJson;
          that.cacheComponents = fileJson.components;
          that.designData.components = [];
          that.$message.success('导入成功');
        }
      }
      this.$refs.refFile.value =''
    },
    clearDesign(){
      this.$confirm('此操作将会清空图层，是否继续？', '警告', {
        confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
      }).then(() => {
        this.cacheComponents = [];
        this.designData.components = [];
        this.currentCpt = {};
        localStorage.removeItem('designCache');
        clearCptInterval(null, true);
        this.$message.success("清除成功");
      }).catch(() => {});
    },
    loadCacheData(){
      const loading = this.$loading({
        lock: true, text: '加载中', spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      if ('preview' === env.active){
        const cacheStr = localStorage.getItem('designCache');
        if (cacheStr){
          this.designData = JSON.parse(cacheStr);
          if (!this.designData.version || this.designData.version !== env.version){
            localStorage.removeItem('designCache');
            this.$message.success("发现旧版缓存，已清除");
          }else{
            this.cacheComponents = this.designData.components;
            this.designData.components = [];//强迫症
          }
        }
        this.designData.version = env.version;
        this.initContainerSize();
      }else{
        // 获取数据
      }
      loading.close();
    },
    copyCpt(item){
      let copyItem = JSON.parse(JSON.stringify(item))
      copyItem.cptX = item.cptX+30//复制的组件向右下偏移
      copyItem.cptY = item.cptY+30
      copyItem.id = require('uuid').v1();
      this.cacheComponents.push(copyItem);
      this.currentCptIndex = this.cacheComponents.length - 1//聚焦到复制的组件
    },
    refreshCptData(){
      const refName = this.currentCpt.cptKey + this.currentCptIndex;
      if(!this.$refs[refName][0].refreshCptData){
        this.$message.warning('当前图层还未实现refreshCptData方法')
      }else {
        this.$refs[refName][0].refreshCptData();//刷新子组件数据，refs为组建名加index
      }
    },
    outBlur(){//取消聚焦组件
      this.currentCptIndex = -1;
      this.currentCpt = {};
      this.cacheChoices = {}
    },
    submitDesign() {//保存
      if ('preview'===env.active){
        this.designData.components = this.cacheComponents;
        localStorage.setItem('designCache', JSON.stringify(this.designData));
        this.$message.success('已保存')
      }else {
        // todo
      }
    },
    preview() {//预览按钮
      this.designData.components = this.cacheComponents;
      localStorage.setItem('designCache', JSON.stringify(this.designData));
      let routeUrl = this.$router.resolve({
        path: "/preview"
      });
      window.open(routeUrl.href, '_blank');
    },
    delCpt(cpt,index) {
      this.$confirm('删除'+cpt.cptTitle+'组件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //记录一个bug，v-for key值重复导致页面渲染数据错乱。在丢下组件时实用uuid作为key解决。
        this.currentCpt = {};
        this.cacheComponents.splice(index, 1);
        const childId = this.$refs[cpt.cptKey+index][0].uuid
        clearCptInterval(childId);
      }).catch(() => {});
    },
    showConfigBar(e, item, index) {//刷新属性栏数据，页面上拖动的组件执行click事件来更新组件的属性栏
      this.currentCpt = item;
      this.currentCptIndex = index;
      if(this.$refs['div'+item.cptKey+index]){
        this.$refs['div'+item.cptKey+index][0].focus();//聚焦 用于多选移动
      }
      if(!e.ctrlKey){//未按住ctrl键
        this.cacheChoices = {}
      }
      this.$refs['configBar'].showCptConfig(item);
      this.cacheChoices[item.id]=item
      this.cacheChoicesFixed[item.id]=JSON.parse(JSON.stringify(item))
    },
    dragStart(copyDom) {//从组件栏拿起组件
      this.copyDom = copyDom;
      copyDom.draggable = false;
    },
    allowDrop(e) {e.preventDefault()},
    drop(e) {//从组件栏丢下组件
      let config = JSON.parse(this.copyDom.getAttribute('config'));
      if(config.option.cptDataForm){//2022-01-24：将静态数据、api、sql用三个字段存储，配置项未填写apiUrl字段和sql字段在此处赋默认值
        if (!config.option.cptDataForm.apiUrl){
          config.option.cptDataForm.apiUrl = '/design/test'
        }
        if(!config.option.cptDataForm.sql){
          config.option.cptDataForm.sql = 'select username from sys_user limit 1'
        }
      }
      let cpt = {
        cptTitle:config.name,
        icon: config.icon,
        cptKey: config.cptKey,
        cptOptionKey:config.cptOptionKey ? config.cptOptionKey : config.cptKey+'-option',
        cptOption: config.option,
        cptX: Math.round(e.offsetX),
        cptY: Math.round(e.offsetY),
        cptZ: 100,
        cptWidth: config.width ? config.width:400,
        cptHeight: config.height ? config.height : 300,
        id: require('uuid').v1(),
      }
      this.cacheComponents.push(cpt);
      this.cacheChoices = {}//多选清空
      this.showConfigBar({}, cpt, this.cacheComponents.length - 1)//丢下组件后刷新组件属性栏
      this.$refs['configBar'].showCptConfig();
    },
  },
  directives: {
    resize(el, binding, vNode) {//组件拉伸，移动位置
      el.onmousedown = function (e) {
        const that = vNode.context;
        const scaleClientX = e.clientX / that.containerScale;
        const scaleClientY = e.clientY / that.containerScale;
        const rbX = scaleClientX - el.parentNode.offsetWidth;
        const rbY = scaleClientY - el.parentNode.offsetHeight;
        const ltX = scaleClientX + el.parentNode.offsetWidth;
        const ltY = scaleClientY + el.parentNode.offsetHeight;
        const disX = scaleClientX - el.parentNode.offsetLeft;
        const disY = scaleClientY - el.parentNode.offsetTop;
        let cptWidth, cptHeight, cptX, cptY;

        document.onmousemove = function (me) {
          const meScaleClientX = me.clientX/that.containerScale
          const meScaleClientY = me.clientY/that.containerScale
          if (binding.value === 'move'){
            cptX = meScaleClientX - disX;
            cptY = meScaleClientY - disY;
            Object.keys(that.cacheChoices).forEach((key)=>{
              that.cacheChoices[key].cptX = that.cacheChoicesFixed[key].cptX + Math.round(meScaleClientX-scaleClientX)
              that.cacheChoices[key].cptY = that.cacheChoicesFixed[key].cptY + Math.round(meScaleClientY-scaleClientY)
            })
          }else{
            switch (binding.value) {
              case 'lt':
                cptWidth = ltX - meScaleClientX;
                cptHeight = ltY - meScaleClientY;
                cptX = meScaleClientX - disX;
                cptY = meScaleClientY - disY;
                that.currentCpt.cptX = Math.round(cptX);
                that.currentCpt.cptY = Math.round(cptY);
                break;
              case 't':
                cptHeight = ltY - meScaleClientY;
                cptY = meScaleClientY - disY;
                that.currentCpt.cptY = Math.round(cptY);
                break;
              case 'rt':
                cptWidth = meScaleClientX - rbX;
                cptHeight = ltY - meScaleClientY;
                cptY = meScaleClientY - disY;
                that.currentCpt.cptY = Math.round(cptY);
                break;
              case 'r':
                cptWidth = meScaleClientX - rbX;
                break;
              case 'rb':
                cptWidth = meScaleClientX - rbX;
                cptHeight = meScaleClientY - rbY;
                break;
              case 'b':
                cptHeight = meScaleClientY - rbY;
                break;
              case 'lb':
                cptWidth = ltX - meScaleClientX;
                cptHeight = meScaleClientY - rbY;
                cptX = meScaleClientX - disX;
                that.currentCpt.cptX = Math.round(cptX);
                break;
              case 'l':
                cptWidth = ltX - meScaleClientX;
                cptX = meScaleClientX - disX;
                that.currentCpt.cptX = Math.round(cptX);
                break;
            }
            cptWidth = cptWidth < 40 ? 40:cptWidth;//限制最小缩放
            cptHeight = cptHeight < 20 ? 20:cptHeight;
            if (cptWidth) that.currentCpt.cptWidth = Math.round(cptWidth);
            if (cptHeight) that.currentCpt.cptHeight = Math.round(cptHeight);
          }
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
          that.cacheChoicesFixed = JSON.parse(JSON.stringify(that.cacheChoices));//解决多选移动未松开ctrl键第二次以后拖动定位还原
        }
        return false;
      }
    }
  },
}
</script>

<style scoped>
.top {height: 45px;box-shadow: 0 2px 5px #2b3340 inset;color: #fff;overflow: hidden;
  margin: 0;font-size: 18px;line-height: 45px;background: #353F50}
.webContainer {position: relative;margin: 0 10px;background-size:100% 100%;transform-origin:0 0}
.delTag {width: 45px;height: 22px;background: rgba(43, 51, 64, 0.8);border-radius: 2px;color: #ccc;z-index: 2000;
  position: absolute;top: 0;right: 0;text-align: center;display: none;cursor: pointer
}
.activeMask{width: 100%;height: 100%;position: absolute;z-index: 1801}
.cptDiv{position: absolute;outline:none}
.cptDiv:hover .delTag {display: block}
.resizeTag{width: 8px;height: 8px;position: absolute;background-color: #B6BFCE;z-index: 2000;border-radius: 50%;}
.configBtn:hover{cursor: pointer;color: #B6BFCE}
.el-dropdown-link { cursor: pointer; color: #fff;}

.designerPanel {
  display: flex;
}
.ctrArea {
  width: 200px;
}
.designArea {
  flex: 1;
}
.configArea {
  width: 300px;
}
</style>
