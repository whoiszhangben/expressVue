<template>
  <el-form-item label="圆角按钮">
    <el-checkbox v-model="optionModel.round"></el-checkbox>
  </el-form-item>
</template>

<script>


  export default {
    name: "round-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
