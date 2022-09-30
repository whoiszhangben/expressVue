<template>
  <el-form-item label="发送cookie凭证">
    <el-checkbox v-model="optionModel.withCredentials"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "withCredentials-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
