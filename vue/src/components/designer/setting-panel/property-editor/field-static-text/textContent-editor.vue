<template>
  <el-form-item label="静态文字">
    <el-input v-model="optionModel.textContent"></el-input>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "textContent-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
