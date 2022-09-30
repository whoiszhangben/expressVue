<template>
  <el-form-item label="朴素按钮">
    <el-checkbox v-model="optionModel.plain"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "plain-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },

  }
</script>

<style scoped>

</style>
