<template>
  <el-form-item label="onChange" label-width="150px">
    <el-button type="info" icon="el-icon-edit" plain round @click="editEventHandler('onChange', eventParams)">
      编写代码</el-button>
  </el-form-item>
</template>

<script>
  import eventMixin from "@/components/designer/setting-panel/property-editor/event-handler/eventMixin"

  export default {
    name: "onChange-editor",
    mixins: [eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    data() {
      return {
        eventParams: ['value', 'oldValue', 'subFormData', 'rowId'],
      }
    }
  }
</script>

<style scoped>

</style>
