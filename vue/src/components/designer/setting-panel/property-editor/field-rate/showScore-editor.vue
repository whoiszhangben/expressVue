<template>
  <el-form-item label="显示当前分数">
    <el-checkbox v-model="optionModel.showScore"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "showScore-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
