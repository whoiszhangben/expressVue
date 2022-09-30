<template>
  <el-form-item label="显示间断点">
    <el-checkbox v-model="optionModel.showStops"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "showStops-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
