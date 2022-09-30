<template>
  <div>
    <el-dialog title="网站设置" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px" center :before-close="close">
      <el-form :model="formData" label-width="100px" size="small">
        <el-form-item label="网站标题">
          <el-input v-model="formData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网站描述">
          <el-input type="textarea" v-model="formData.simpleDesc"></el-input>
        </el-form-item>
        <el-form-item label="分辨率X">
          <el-input-number v-model="formData.scaleX" :min="640" :max="10240" style="width: 100%"/>
        </el-form-item>
        <el-form-item label="分辨率Y">
          <el-input-number v-model="formData.scaleY" :min="320" :max="10240" style="width: 100%"/>
        </el-form-item>
        <el-form-item label="背景颜色">
          <el-color-picker v-model="formData.bgColor" show-alpha/>
        </el-form-item>
        <el-form-item label="背景图片">
          <div v-if="formData.bgImg" style="width: 100%;height: 100%;position: relative">
            <img :src="fileUrl+formData.bgImg" style="width: 100%;height: 100%;"/>
            <i style="position: absolute;z-index: 6;right: 0;font-size: 20px;color: #FFCCCC"
               class="el-icon-delete" @click.stop="handleRemove"></i>
          </div>
          <div v-else class="uploadItem" @click="showGallery">
            <i style="font-size: 40px;color: #aaa" class="el-icon-plus"></i>
          </div>
        </el-form-item>
        <el-form-item label="个性链接">
          <el-input disabled v-model="formData.id" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="访问码">
          <el-input v-model="formData.viewCode" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div style="text-align: center;margin-top: 10px;">
        <el-button @click="close" size="small">取 消</el-button>
        <el-button style="background: #2B3340;color: #eee" @click="save" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <gallery ref="gallery" @confirmCheck="confirmCheck"/>
  </div>
</template>

<script>
import {fileUrl} from "/env";
import {getToken} from "@/utils/auth";
import Gallery from "@/components/gallery";
export default {
  name: "configForm",
  components: {Gallery},
  props:{
    formData:Object
  },
  data(){
    return {
      fileUrl:fileUrl,
      uploadHeaders:{'X-Token':getToken()},
      dialogVisible:false,
    }
  },
  methods:{
    opened(){
      this.dialogVisible = true;
    },
    close(){
      this.$emit('cancel');
      this.dialogVisible = false
    },
    save(){
      this.$emit('saveSittingForm',JSON.parse(JSON.stringify(this.formData)));
      this.dialogVisible = false
    },
    showGallery(){
      this.$refs.gallery.opened();
    },
    confirmCheck(fileUrl){
      this.formData.bgImg = fileUrl;
    },
    handleRemove(){
      this.formData.bgImg = ''
    }
  }
}
</script>

<style scoped>
.uploadItem{width: 120px;height: 120px;text-align: center;line-height: 120px;border: 1px solid #ddd;cursor: pointer}
</style>
