<template>
  <el-form-item label="默认值">
    <el-time-picker v-model="optionModel.defaultValue" @change="emitDefaultValueChange"
                    :format="optionModel.format" value-format="HH:mm:ss" style="width: 100%">
    </el-time-picker>
  </el-form-item>
</template>

<script>
  
  import propertyMixin from "@/components/designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "time-defaultValue-editor",
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
