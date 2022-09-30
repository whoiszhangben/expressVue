<template>
  <el-form-item label="默认值">
    <el-input v-if="!hasConfig('optionItems')" type="text" v-model="optionModel.defaultValue"
              @change="emitDefaultValueChange"></el-input>
  </el-form-item>
</template>

<script>
  import propertyMixin from "@/components/designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "defaultValue-editor",
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
