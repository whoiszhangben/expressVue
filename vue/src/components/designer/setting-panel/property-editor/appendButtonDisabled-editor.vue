<template>
  <el-form-item label="后置按钮禁用">
    <el-checkbox v-model="optionModel.appendButtonDisabled"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "appendButtonDisabled-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
