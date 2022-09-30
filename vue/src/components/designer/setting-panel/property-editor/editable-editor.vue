<template>
  <el-form-item label="可输入">
    <el-checkbox v-model="optionModel.editable"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "editable-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },

  }
</script>

<style scoped>

</style>
