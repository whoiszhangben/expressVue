<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
                     :index-of-parent-list="indexOfParentList">

    <el-row :key="widget.id" :gutter="widget.options.gutter" class="grid-container"
            :class="[selected ? 'selected' : '', customClass]"
            @click.native.stop="selectWidget(widget)">
      <template v-for="(colWidget, colIdx) in widget.cols">
        <grid-col-widget :widget="colWidget" :designer="designer" :key="colWidget.id" :parent-list="widget.cols"
                         :index-of-parent-list="colIdx" :parent-widget="widget"
                         :col-height="widget.options.colHeight"></grid-col-widget>
      </template>
    </el-row>

  </container-wrapper>
</template>

<script>
  import GridColWidget from "@/components/designer/design-panel/containers/grid-col-widget"
  import containerMixin from "@/components/designer/design-panel/containers/containerMixin";
  import ContainerWrapper from "@/components/designer/design-panel/containers/container-wrapper";

  export default {
    name: "grid-widget",
    componentName: 'ContainerWidget',
    mixins: [containerMixin],
    components: {
      ContainerWrapper,
      GridColWidget
    },
    props: {
      widget: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,
    },
    computed: {
      selected() {
        return this.widget.id === this.designer.selectedId
      },

      customClass() {
        return this.widget.options.customClass || ''
      },

    },
    watch: {
      //
    },
    mounted() {
      //
    },
    methods: {


    }
  }
</script>

<style scoped>
  .el-row.grid-container {
  min-height: 50px;
  outline: 1px dashed #336699;
}

.el-row.grid-container .form-widget-list {
  min-height: 28px;
}

.grid-container.selected, .grid-cell.selected {
  outline: 2px solid #409EFF !important;
}


</style>
