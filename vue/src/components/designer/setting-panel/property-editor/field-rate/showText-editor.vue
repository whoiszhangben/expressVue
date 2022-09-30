<template>
  <el-form-item label="显示辅助文字">
    <el-checkbox v-model="optionModel.showText"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "showText-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
