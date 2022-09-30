<template>
  <el-form-item label="必填字段">
    <el-checkbox v-model="optionModel.required"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "required-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
