<template>
  <el-form-item label="禁用">
    <el-checkbox v-model="optionModel.disabled"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "disabled-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
