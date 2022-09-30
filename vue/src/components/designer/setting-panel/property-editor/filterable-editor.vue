<template>
  <el-form-item label="可搜索选项">
    <el-checkbox v-model="optionModel.filterable"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "filterable-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
