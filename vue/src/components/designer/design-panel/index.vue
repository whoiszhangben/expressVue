<template>
  <div class="form-widget-container">

<el-form class="full-height-width widget-form" :label-position="labelPosition"
         :class="[customClass, layoutType + '-layout']" :size="size" :validate-on-rule-change="false">

  <div v-if="designer.widgetList.length === 0" class="no-widget-hint">请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处.</div>

  <draggable :list="designer.widgetList" v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 300}"
             handle=".drag-handler" @end="onDragEnd" @add="onDragAdd" @update="onDragUpdate" :move="checkMove">
    <transition-group name="fade" tag="div" class="form-widget-list">
      <template v-for="(widget, index) in designer.widgetList">
        <template v-if="'container' === widget.category">
          <component :is="getWidgetName(widget)" :widget="widget" :designer="designer" :key="widget.id" :parent-list="designer.widgetList"
                            :index-of-parent-list="index" :parent-widget="null"></component>
        </template>
        <template v-else>
          <component :is="getWidgetName(widget)" :field="widget" :designer="designer" :key="widget.id" :parent-list="designer.widgetList"
                        :index-of-parent-list="index" :parent-widget="null" :design-state="true"></component>
        </template>
      </template>
    </transition-group>
  </draggable>

</el-form>

</div>
</template>

<script>
    import Draggable from 'vuedraggable'
    import '@/components/designer/design-panel/containers/index'
    import FieldComponents from '@/components/designer/design-panel/controls/index'

  export default {
    name: "DesignPanel",
    componentName: "DesignPanel",
    components: {
      Draggable,

      ...FieldComponents,
    },
    props: {
      designer: Object,
      formConfig: Object,
      optionData: { //prop传入的选项数据
        type: Object,
        default: () => {}
      },
    },
    provide() {
      return {
        refList: this.widgetRefList,
        formConfig: this.formConfig,
        globalOptionData: this.optionData,
        getOptionData: () => this.optionData,
        globalModel: {
          formModel: this.formModel,
        }
      }
    },
    inject: ['getDesignerConfig'],
    data() {
      return {
        formModel: {},
        widgetRefList: {},
      }
    },
    computed: {
      labelPosition() {
        if (!!this.designer.formConfig && !!this.designer.formConfig.labelPosition) {
          return this.designer.formConfig.labelPosition
        }

        return 'left'
      },

      size() {
        if (!!this.designer.formConfig && !!this.designer.formConfig.size) {
          return this.designer.formConfig.size
        }

        return 'medium'
      },

      customClass() {
        return this.designer.formConfig.customClass || ''
      },

      layoutType() {
        return this.designer.getLayoutType()
      },

    },
    watch: {
      'designer.widgetList': {
        deep: true,
        handler(val) {
          console.log('designer.widgetList:', val);
        }
      },

      'designer.formConfig': {
        deep: true,
        handler(val) {
          console.log('designer.formConfig:', val)
        }
      },

    },
    created() {
      this.designer.initDesigner();
      this.designer.loadPresetCssCode( this.getDesignerConfig().presetCssCode )
    },
    mounted() {
      this.disableFirefoxDefaultDrop()  /* 禁用Firefox默认拖拽搜索功能!! */
      this.designer.registerFormWidget(this)
    },
    methods: {
      getWidgetName(widget) {
        return widget.type + '-widget'
      },

      disableFirefoxDefaultDrop() {
        let isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox") !== -1)
        if (isFirefox) {
          document.body.ondrop = function (event) {
            event.stopPropagation();
            event.preventDefault();
          }
        }
      },

      onDragEnd(evt) {
        console.log('drag end000', evt)
      },

      onDragAdd(evt) {
        const newIndex = evt.newIndex
        if (this.designer.widgetList[newIndex]) {
          this.designer.setSelected( this.designer.widgetList[newIndex] )
        }

        this.designer.emitHistoryChange()
      },

      onDragUpdate() {  /* 在VueDraggable内拖拽组件发生位置变化时会触发update，未发生组件位置变化不会触发！！ */
        this.designer.emitHistoryChange()
      },

      checkMove(evt) {
        return this.designer.checkWidgetMove(evt)
      },

      getFormData() {
        return this.formModel
      },

      getWidgetRef(widgetName, showError) {
        let foundRef = this.widgetRefList[widgetName]
        if (!foundRef && !!showError) {
          this.$message.error('未找到组件' + widgetName)
        }
        return foundRef
      },

    }
  }
</script>

<style scoped>
    .container-scroll-bar ::v-deep .el-scrollbar__wrap, .container-scroll-bar ::v-deep .el-scrollbar__view {
  overflow-x: hidden;
}

.form-widget-container {
  padding: 10px;
  background: #f1f2f3;
  overflow-x: hidden;
  overflow-y: auto;
}

.form-widget-container .el-form.full-height-width {
  /*
      margin: 0 auto;
      width: 420px;
      border-radius: 15px;
      //border-width: 10px;
      box-shadow: 0 0 1px 10px #495060;
      */
  height: 100%;
  padding: 3px;
  background: #ffffff;
}

.form-widget-container .el-form.full-height-width .no-widget-hint {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  color: #999999;
}

.form-widget-container .el-form.full-height-width .form-widget-list {
  min-height: calc(100vh - 56px - 68px);
  padding: 3px;
}

.form-widget-container .el-form.Pad-layout {
  margin: 0 auto;
  max-width: 960px;
  border-radius: 15px;
  box-shadow: 0 0 1px 10px #495060;
}

.form-widget-container .el-form.H5-layout {
  margin: 0 auto;
  width: 420px;
  border-radius: 15px;
  box-shadow: 0 0 1px 10px #495060;
}

.form-widget-container .el-form.widget-form ::v-deep .el-row {
  padding: 2px;
  border: 1px dashed rgba(170, 170, 170, 0.75);
}

.grid-cell {
  min-height: 30px;
  border-right: 1px dotted #cccccc;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>