<template>
  <el-form-item label="可清除">
    <el-checkbox v-model="optionModel.clearable"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "clearable-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
