<template>
  <el-form-item label="隐藏字段标签">
    <el-checkbox v-model="optionModel.labelHidden"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "labelHidden-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
