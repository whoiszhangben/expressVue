<template>
  <el-form-item label="HTML">
    <el-input v-model="optionModel.htmlContent"></el-input>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "htmlContent-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
