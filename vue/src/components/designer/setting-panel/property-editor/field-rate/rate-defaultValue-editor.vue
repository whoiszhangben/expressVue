<template>
  <el-form-item label="默认值">
    <el-input-number v-model="optionModel.defaultValue" :min="0" :max="optionModel.max" style="width: 100%"
                     @change="emitDefaultValueChange">
    </el-input-number>
  </el-form-item>
</template>

<script>
  
  import propertyMixin from "@/components/designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "rate-defaultValue-editor",
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
