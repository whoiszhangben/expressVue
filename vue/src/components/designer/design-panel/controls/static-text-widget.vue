<template>
  <static-content-wrapper :designer="designer" :field="field" :design-state="designState"
                          :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
                          :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
    <div ref="fieldEditor">{{field.options.textContent}}</div>
  </static-content-wrapper>
</template>

<script>
  import StaticContentWrapper from './static-content-wrapper'
  import emitter from 'element-ui/lib/mixins/emitter'
  import fieldMixin from "@/components/designer/design-panel/controls/fieldMixin";

  export default {
    name: "static-text-widget",
    componentName: 'FieldWidget',  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
    mixins: [emitter, fieldMixin],
    props: {
      field: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,

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
    components: {
      StaticContentWrapper,
    },
    computed: {

    },
    beforeCreate() {
      /* 这里不能访问方法和属性！！ */
    },

    created() {
      /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
      this.registerToRefList()
      this.initEventHandler()

      this.handleOnCreated()
    },

    mounted() {
      this.handleOnMounted()
    },

    beforeDestroy() {
      this.unregisterFromRefList()
    },

    methods: {

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

</style>
