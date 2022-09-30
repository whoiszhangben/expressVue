<template>
    <el-container>
      <el-aside class="side-panel">
        <control-panel :designer="designer" />
      </el-aside>
      <el-container class="center-layout-container">
          <el-header class="toolbar-header">设计区域</el-header>
          <el-main class="form-widget-main">
            <el-scrollbar class="container-scroll-bar" :style="{height: scrollerHeight}">
              <design-panel :designer="designer" :form-config="designer.formConfig"></design-panel>
            </el-scrollbar>
          </el-main>
        </el-container>
        <el-aside>
          <setting-panel :designer="designer" :selected-widget="designer.selectedWidget" :form-config="designer.formConfig" />
        </el-aside>
    </el-container>
  </template>
  
  <script>
    import ControlPanel from '@/components/designer/control-panel/index';
    import DesignPanel from './design-panel/index.vue';
    import SettingPanel from './setting-panel/index.vue';
    import {addWindowResizeHandler} from "@/utils/util"
    import {createDesigner} from "@/components/designer/designer"
  export default {
    props: {
      /* 后端字段列表API */
      fieldListApi: {
        type: Object,
        default: null,
      },

      /* 禁止显示的组件名称数组 */
      bannedWidgets: {
        type: Array,
        default: () => []
      },

      designerConfig: {
        type: Object,
        default: () => {
          return {
            languageMenu: true,  //是否显示语言切换菜单
            externalLink: true,  //是否显示GitHub、文档等外部链接
            formTemplates: true,  //是否显示表单模板
            eventCollapse: true,  //是否显示组件事件属性折叠面板
            clearDesignerButton: true,  //是否显示清空设计器按钮
            previewFormButton: true,  //是否显示预览表单按钮
            importJsonButton: true,  //是否显示导入JSON按钮
            exportJsonButton: true,  //是否显示导出JSON器按钮
            exportCodeButton: true,  //是否显示导出代码按钮
            generateSFCButton: true,  //是否显示生成SFC按钮

            presetCssCode: '',  //设计器预设CSS样式代码
          }
        }
      },
    },
    data() {
      return {
        designer: createDesigner(this),
        scrollerHeight: 0,
      }
    },
    components: {
    ControlPanel,
    DesignPanel,
    SettingPanel
},
    provide() {
      return {
        serverFieldList: this.fieldList,
        getDesignerConfig: () => this.designerConfig,
        getBannedWidgets: () => this.bannedWidgets,
      }
    },
    mounted() {
        this.scrollerHeight = window.innerHeight - 56 - 36 + 'px'
      addWindowResizeHandler(() => {
        this.$nextTick(() => {
          this.scrollerHeight = window.innerHeight - 56 - 36 + 'px'
        })
      })
    }
  }
  </script>
  
  <style scoped>
.el-container.full-height {
  height: 100%;
  overflow-y: hidden;
}

.el-container.center-layout-container {
  min-width: 680px;
  border-left: 2px dotted #EBEEF5;
  border-right: 2px dotted #EBEEF5;
}

.el-header.main-header {
  border-bottom: 2px dotted #EBEEF5;
  height: 48px !important;
  line-height: 48px !important;
  min-width: 800px;
}

div.main-title {
  font-size: 18px;
  color: #242424;
  display: flex;
  align-items: center;
  justify-items: center;
}

div.main-title img {
  cursor: pointer;
  width: 36px;
  height: 36px;
}

div.main-title span.bold {
  font-size: 20px;
  font-weight: bold;
  margin: 0 6px 0 6px;
}

div.main-title span.version-span {
  font-size: 14px;
  color: #101F1C;
  margin-left: 6px;
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

.el-dropdown-link {
  margin-right: 12px;
  cursor: pointer;
}

div.external-link a {
  font-size: 13px;
  text-decoration: none;
  margin-right: 10px;
  color: #606266;
}

.el-header.toolbar-header {
  font-size: 14px;
  border-bottom: 1px dotted #CCCCCC;
  height: 42px !important;
}

.el-aside.side-panel {
  width: 260px !important;
  overflow-y: hidden;
}

.el-main.form-widget-main {
  padding: 0;
  position: relative;
  overflow-x: hidden;
}

.container-scroll-bar ::v-deep .el-scrollbar__wrap, .container-scroll-bar ::v-deep .el-scrollbar__view {
  overflow-x: hidden;
}


  </style>