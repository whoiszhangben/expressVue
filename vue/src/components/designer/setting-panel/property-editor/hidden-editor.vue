<template>
  <el-form-item label="隐藏">
    <el-checkbox v-model="optionModel.hidden"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "hidden-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
