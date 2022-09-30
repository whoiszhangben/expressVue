<template>
  <el-form-item label="允许半选">
    <el-checkbox v-model="optionModel.allowHalf"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "allowHalf-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
