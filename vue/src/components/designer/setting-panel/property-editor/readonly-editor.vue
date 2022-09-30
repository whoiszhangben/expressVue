<template>
  <el-form-item label="只读">
    <el-checkbox v-model="optionModel.readonly"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "readonly-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
