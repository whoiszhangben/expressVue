<template>
  <el-form-item label="可远程搜索">
    <el-checkbox v-model="optionModel.remote" @change="onRemoteChange"></el-checkbox>
  </el-form-item>
</template>

<script>
  
  import propertyMixin from "@/components/designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "remote-editor",
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
