<template>
  <div class="field-wrapper" :class="{'design-time-bottom-margin': !!this.designer}">
    <div class="static-content-item" v-show="!field.options.hidden || (designState === true)"
         :class="[selected ? 'selected' : '', customClass]" @click.stop="selectField(field)">
      <slot></slot>
    </div>

    <template v-if="!!this.designer">
      <div class="field-action" v-if="designer.selectedId === field.id">
        <i class="el-icon-back" title="选中父组件" @click.stop="selectParentWidget(field)"></i>
        <i class="el-icon-top" v-if="!!parentList && (parentList.length > 1)" title="上移组件"
           @click.stop="moveUpWidget(field)"></i>
        <i class="el-icon-bottom" v-if="!!parentList && (parentList.length > 1)" title="下移组件"
           @click.stop="moveDownWidget(field)"></i>
        <i class="el-icon-delete" title="移除组件" @click.stop="removeFieldWidget"></i>
      </div>

      <div class="drag-handler background-opacity" v-if="designer.selectedId === field.id">
        <i class="el-icon-rank" title="拖拽手柄"></i>
        <i>{{field.displayName}}</i>
        <i v-if="field.options.hidden === true" class="iconfont icon-hide"></i>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: "static-content-wrapper",
    props: {
      field: Object,
      designer: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,

      designState: {
        type: Boolean,
        default: false
      },

      subFormRowIndex: { /* 子表单组件行索引，从0开始计数 */
        type: Number,
        default: -1
      },
      subFormColIndex: { /* 子表单组件列索引，从0开始计数 */
        type: Number,
        default: -1
      },
      subFormRowId: { /* 子表单组件行Id，唯一id且不可变 */
        type: String,
        default: ''
      },
    },
    computed: {
      selected() {
        return !!this.designer && this.field.id === this.designer.selectedId
      },

      customClass() {
        return this.field.options.customClass ? this.field.options.customClass.join(' ') : ''
      },

    },
    methods: {

      selectField(field) {
        if (this.designer) {
          this.designer.setSelected(field)
          this.designer.emitEvent('field-selected', this.parentWidget)  //发送选中组件的父组件对象
        }
      },

      selectParentWidget() {
        if (this.parentWidget) {
          this.designer.setSelected(this.parentWidget)
        } else {
          this.designer.clearSelected()
        }
      },

      moveUpWidget() {
        this.designer.moveUpWidget(this.parentList, this.indexOfParentList)
        this.designer.emitHistoryChange()
      },

      moveDownWidget() {
        this.designer.moveDownWidget(this.parentList, this.indexOfParentList)
        this.designer.emitHistoryChange()
      },

      removeFieldWidget() {
        if (this.parentList) {
          let nextSelected = null
          if (this.parentList.length === 1) {
            if (this.parentWidget) {
              nextSelected = this.parentWidget
            }
          } else if (this.parentList.length === (1 + this.indexOfParentList)) {
            nextSelected = this.parentList[this.indexOfParentList - 1]
          } else {
            nextSelected = this.parentList[this.indexOfParentList + 1]
          }

          this.$nextTick(() => {
            this.parentList.splice(this.indexOfParentList, 1)
            //if (!!nextSelected) {
            this.designer.setSelected(nextSelected)
            //}

            this.designer.emitHistoryChange()
          })
        }
      },

    }
  }
</script>

<style scoped>
.primary-color {
  color: #409EFF;
}

.background-opacity {
  background: rgba(64, 158, 255, 0.6);
}

.form-widget-list .ghost {
  content: '';
  font-size: 0;
  height: 3px;
  box-sizing: border-box;
  background: #409EFF;
  border: 2px solid #409EFF;
  outline-width: 0;
  padding: 0;
  overflow: hidden;
}

.el-form-item--medium .el-radio {
  line-height: 36px !important;
}

.el-form-item--medium .el-rate {
  margin-top: 8px;
}

.el-form-item--small .el-radio {
  line-height: 32px !important;
}

.el-form-item--small .el-rate {
  margin-top: 6px;
}

.el-form-item--mini .el-radio {
  line-height: 28px !important;
}

.el-form-item--mini .el-rate {
  margin-top: 4px;
}

input[type="password"]::-ms-reveal {
  /* 隐藏IE/Edge原生的密码查看按钮 */
  display: none;
}

/* 滚动条样式 begin */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  width: 8px;
  background: rgba(16, 31, 28, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(16, 31, 28, 0.35);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(16, 31, 28, 0.85);
}

* {
  scrollbar-color: #e5e5e5 #f7f7f9;
  scrollbar-width: thin;
}

.design-time-bottom-margin {
  margin-bottom: 5px;
}

.field-wrapper {
  position: relative;
}

.field-wrapper .field-action {
  position: absolute;
  bottom: 0;
  right: -2px;
  height: 22px;
  line-height: 22px;
  background: #409EFF;
  z-index: 9;
}

.field-wrapper .field-action i {
  font-size: 14px;
  color: #fff;
  margin: 0 5px;
  cursor: pointer;
}

.field-wrapper .drag-handler {
  position: absolute;
  top: 0;
  left: -1px;
  height: 20px;
  line-height: 20px;
  z-index: 9;
}

.field-wrapper .drag-handler i {
  font-size: 12px;
  font-style: normal;
  color: #fff;
  margin: 4px;
  cursor: move;
}

.field-wrapper .drag-handler:hover {
  background: #409EFF;
}

.static-content-item {
  min-height: 20px;
  display: flex;
  /* 垂直居中 */
  align-items: center;
  /* 垂直居中 */
}

.static-content-item ::v-deep .el-divider--horizontal {
  margin: 0;
}

.el-form-item.selected, .static-content-item.selected {
  outline: 2px solid #409EFF;
}

</style>
