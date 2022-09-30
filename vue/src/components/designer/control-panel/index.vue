<template>
  <el-scrollbar class="side-scroll-bar" :style="{height: scrollerHeight}">
    <div class="panel-container">
        <el-tabs v-model="firstTab" class="no-bottom-margin indent-left-margin">
            <el-tab-pane name="componentLib">
                <span slot="label"><i class="el-icon-set-up"></i> 组件库</span>

            <el-collapse v-model="activeNames" class="widget-collapse">
                <el-collapse-item name="1" title="容器">
                <draggable tag="ul" :list="containers" :group="{name: 'dragGroup', pull: 'clone', put: false}"
                            :clone="handleContainerWidgetClone" ghost-class="ghost" :sort="false"
                            :move="checkContainerMove" @end="onContainerDragEnd">
                    <li v-for="(ctn, index) in containers" :key="index" class="container-widget-item" :title="ctn.displayName"
                        @dblclick="addContainerByDbClick(ctn)">
                    <span><i :class="ctn.icon" />{{ctn.displayName}}</span>
                    </li>
                </draggable>
                </el-collapse-item>

                <el-collapse-item name="2" title="基础组件">
                <draggable tag="ul" :list="basicFields" :group="{name: 'dragGroup', pull: 'clone', put: false}"
                            :clone="handleFieldWidgetClone" ghost-class="ghost" :sort="false">
                    <li v-for="(fld, index) in basicFields" :key="index" class="field-widget-item" :title="fld.displayName"
                        @dblclick="addFieldByDbClick(fld)">
                    <span><svg-icon :icon-class="fld.icon" />{{fld.displayName}}</span>
                    </li>
                </draggable>
                </el-collapse-item>

                <el-collapse-item name="3" title="高级组件">
                <draggable tag="ul" :list="advancedFields" :group="{name: 'dragGroup', pull: 'clone', put: false}"
                            :clone="handleFieldWidgetClone" ghost-class="ghost" :sort="false">
                    <li v-for="(fld, index) in advancedFields" :key="index" class="field-widget-item" :title="fld.displayName"
                        @dblclick="addFieldByDbClick(fld)">
                    <span><svg-icon :icon-class="fld.icon" />{{fld.displayName}}</span>
                    </li>
                </draggable>
                </el-collapse-item>

                <!-- -->
                <el-collapse-item name="4" title="自定义组件">
                <draggable tag="ul" :list="customFields" :group="{name: 'dragGroup', pull: 'clone', put: false}"
                            :clone="handleFieldWidgetClone" ghost-class="ghost" :sort="false">
                    <li v-for="(fld, index) in customFields" :key="index" class="field-widget-item" :title="fld.displayName"
                        @dblclick="addFieldByDbClick(fld)">
                    <span>
                        <svg-icon :icon-class="fld.icon" />{{fld.displayName}}</span>
                    </li>
                </draggable>
                </el-collapse-item>
                <!-- -->

            </el-collapse>

            </el-tab-pane>
        </el-tabs>
    </div>
  </el-scrollbar>
</template>

<script>
    import Draggable from 'vuedraggable';
    import {containers, basicFields, advancedFields, customFields} from "./widgetsConfig";
    import {formTemplates} from './templatesConfig';
    import {addWindowResizeHandler} from "@/utils/util";
    import {get} from 'axios';
export default {
    components: {
      Draggable,
    },
    props: {
      designer: Object,
    },
    inject: ['getBannedWidgets', 'getDesignerConfig'],
    data() {
        return {
            designerConfig: this.getDesignerConfig(),

            firstTab: 'componentLib',

            scrollerHeight: 0,

            activeNames: ['1', '2', '3', '4'],

            containers,
            basicFields,
            advancedFields,
            customFields,

            formTemplates: formTemplates,
        }
    },
    mounted() {
      this.loadWidgets()

      this.scrollerHeight = window.innerHeight - 56 + 'px'
      addWindowResizeHandler(() => {
        this.$nextTick(() => {
          this.scrollerHeight = window.innerHeight - 56 + 'px'
          //console.log(this.scrollerHeight)
        })
      })
    },
    methods: {
      isBanned(wName) {
        return this.getBannedWidgets().indexOf(wName) > -1
      },

      showFormTemplates() {
        if (this.designerConfig['formTemplates'] === undefined) {
          return true
        }

        return !!this.designerConfig['formTemplates']
      },

      loadWidgets() {
        this.containers = this.containers.map(con => {
          return {
            ...con
          }
        }).filter(con => {
          return !con.internal && !this.isBanned(con.type)
        })

        this.basicFields = this.basicFields.map(fld => {
          return {
            ...fld,
          }
        }).filter(fld => {
          return !this.isBanned(fld.type)
        })

        this.advancedFields = this.advancedFields.map(fld => {
          return {
            ...fld,
          }
        }).filter(fld => {
          return !this.isBanned(fld.type)
        })

        this.customFields = this.customFields.map(fld => {
          return {
            ...fld,
          }
        }).filter(fld => {
          return !this.isBanned(fld.type)
        })
      },

      handleContainerWidgetClone(origin) {
        return this.designer.copyNewContainerWidget(origin)
      },

      handleFieldWidgetClone(origin) {
        return this.designer.copyNewFieldWidget(origin)
      },

      checkContainerMove(evt) {
        return this.designer.checkWidgetMove(evt)
      },

      onContainerDragEnd(evt) {
        
        console.log(evt)
      },

      addContainerByDbClick(container) {
        this.designer.addContainerByDbClick(container)
      },

      addFieldByDbClick(widget) {
        this.designer.addFieldByDbClick(widget)
      },

      loadFormTemplate(jsonUrl) {
        this.$confirm('是否加载这个模板？加载后会覆盖设计器当前表单，你可以使用“撤销”功能恢复。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          get(jsonUrl).then(res => {
            let modifiedFlag = false
            if (typeof res.data === 'string') {
              modifiedFlag = this.designer.loadFormJson( JSON.parse(res.data) )
            } else if (res.data.constructor === Object) {
              modifiedFlag = this.designer.loadFormJson(res.data)
            }
            if (modifiedFlag) {
              this.designer.emitHistoryChange()
            }

            this.$message.success('表单模板加载成功')
          }).catch(() => {
            this.$message.error("表单模板加载失败")
          })
        }).catch(error => {
          console.error(error)
        })
      }

    }
}
</script>

<style scoped>
@charset "UTF-8";
.side-scroll-bar ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}

div.panel-container {
  padding-bottom: 10px;
}

.no-bottom-margin ::v-deep .el-tabs__header {
  margin-bottom: 0;
}

.indent-left-margin ::v-deep .el-tabs__nav {
  margin-left: 20px;
}

.el-collapse-item ::v-deep ul > li {
  list-style: none;
}

.widget-collapse {
  border-top-width: 0;
}

.widget-collapse ::v-deep .el-collapse-item__header {
  font-style: italic;
  font-weight: bold;
}

.widget-collapse ::v-deep .el-collapse-item__content {
  padding-bottom: 6px;
}

.widget-collapse ::v-deep .el-collapse-item__content ul {
  padding-left: 10px;
  /* 重置IE11默认样式 */
  margin: 0;
  /* 重置IE11默认样式 */
  margin-block-start: 0;
  margin-block-end: 0.25em;
  padding-inline-start: 10px;
}

.widget-collapse ::v-deep .el-collapse-item__content ul:after {
  content: "";
  display: block;
  clear: both;
}

.widget-collapse ::v-deep .el-collapse-item__content ul .container-widget-item, .widget-collapse ::v-deep .el-collapse-item__content ul .field-widget-item {
  display: inline-block;
  height: 28px;
  line-height: 28px;
  width: 115px;
  float: left;
  margin: 2px 6px 6px 0;
  cursor: move;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  background: #f1f2f3;
}

.widget-collapse ::v-deep .el-collapse-item__content ul .container-widget-item:hover, .widget-collapse ::v-deep .el-collapse-item__content ul .field-widget-item:hover {
  background: #EBEEF5;
  outline: 1px solid #409EFF;
}

.widget-collapse ::v-deep .el-collapse-item__content ul .drag-handler {
  position: absolute;
  top: 0;
  left: 160px;
  background-color: #dddddd;
  border-radius: 5px;
  padding-right: 5px;
  font-size: 11px;
  color: #666666;
}

.el-card.ft-card {
  border: 1px solid #8896B3;
}

.ft-card {
  margin-bottom: 10px;
  /*
    .image-zoom {
      height: 500px;
      width: 620px
    }
    */
}

.ft-card .bottom {
  margin-top: 10px;
  line-height: 12px;
}

.ft-card .ft-title {
  font-size: 13px;
  font-weight: bold;
}

.ft-card .right-button {
  padding: 0;
  float: right;
}

.ft-card .clear-fix:before, .ft-card .clear-fix:after {
  display: table;
  content: "";
}

.ft-card .clear-fix:after {
  clear: both;
}

</style>