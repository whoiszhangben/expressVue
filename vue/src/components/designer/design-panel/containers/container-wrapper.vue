<template>
  <div class="container-wrapper" :class="[customClass]">
    <slot></slot>

    <div class="container-action" v-if="designer.selectedId === widget.id && !widget.internal">
      <i class="el-icon-back" title="选中父组件"
         @click.stop="selectParentWidget(widget)"></i>
      <i class="el-icon-top" v-if="!!parentList && (parentList.length > 1)" title="上移组件"
         @click.stop="moveUpWidget()"></i>
      <i class="el-icon-bottom" v-if="!!parentList && (parentList.length > 1)" title="下移组件"
         @click.stop="moveDownWidget()"></i>
      <i v-if="widget.type === 'table'" class="iconfont icon-insertrow" title="插入新行"
         @click.stop="appendTableRow(widget)"></i>
      <i v-if="widget.type === 'table'" class="iconfont icon-insertcolumn" title="插入新列"
         @click.stop="appendTableCol(widget)"></i>
      <i class="el-icon-copy-document" v-if="(widget.type === 'grid') || (widget.type === 'table')"
         title="复制组件" @click.stop="cloneContainer(widget)"></i>
      <i class="el-icon-delete" title="删除组件" @click.stop="removeWidget"></i>
    </div>

    <div class="drag-handler" v-if="designer.selectedId === widget.id && !widget.internal">
      <i class="el-icon-rank" title="拖拽手柄"></i>
      <i>{{widget.displayName}}</i>
      <i v-if="widget.options.hidden === true" class="iconfont icon-hide"></i>
    </div>
  </div>
</template>

<script>
  import containerMixin from "@/components/designer/design-panel/containers/containerMixin";

  export default {
    name: "container-wrapper",
    mixins: [containerMixin],
    props: {
      widget: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,
    },
    computed: {
      customClass() {
        return this.widget.options.customClass ? this.widget.options.customClass.join(' ') : ''
      },

    }
  }
</script>

<style scoped>
  
  .container-wrapper {
  position: relative;
  margin-bottom: 5px;
}

.container-wrapper .container-action {
  position: absolute;
  bottom: 0;
  right: -2px;
  height: 28px;
  line-height: 28px;
  background: #409EFF;
  z-index: 999;
}

.container-wrapper .container-action i {
  font-size: 14px;
  color: #fff;
  margin: 0 5px;
  cursor: pointer;
}

.container-wrapper .drag-handler {
  position: absolute;
  top: -2px;
  left: -2px;
  height: 22px;
  line-height: 22px;
  background: #409EFF;
  z-index: 9;
}

.container-wrapper .drag-handler i {
  font-size: 14px;
  font-style: normal;
  color: #fff;
  margin: 4px;
  cursor: move;
}


</style>
