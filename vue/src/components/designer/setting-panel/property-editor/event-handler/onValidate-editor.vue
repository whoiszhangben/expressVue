<template>
  <el-form-item label="onValidate" label-width="150px">
    <el-button type="info" icon="el-icon-edit" plain round @click="editEventHandler('onValidate', eventParams)">
      编写代码</el-button>
  </el-form-item>
</template>

<script>
  
  import eventMixin from "@/components/designer/setting-panel/property-editor/event-handler/eventMixin"

  export default {
    name: "onValidate-editor",
    mixins: [eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    data() {
      return {
        eventParams: ['rule', 'value', 'callback'],
      }
    }
  }
</script>

<style scoped>

</style>
