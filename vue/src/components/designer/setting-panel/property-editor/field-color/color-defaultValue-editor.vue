<template>
  <el-form-item label="默认值">
    <el-color-picker v-model="optionModel.defaultValue" @change="emitDefaultValueChange">
    </el-color-picker>
  </el-form-item>
</template>

<script>
  
  import propertyMixin from "@/components/designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "color-defaultValue-editor",
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
