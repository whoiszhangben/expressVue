<template>
  <el-form-item label="选项可多选">
    <el-checkbox v-model="optionModel.multiple"></el-checkbox>
  </el-form-item>
</template>

<script>
  
  import propertyMixin from "@/components/designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "multiple-editor",
    mixins: [propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
