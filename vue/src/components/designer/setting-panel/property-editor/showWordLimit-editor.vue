<template>
  <el-form-item label="显示字数统计">
    <el-checkbox v-model="optionModel.showWordLimit"></el-checkbox>
  </el-form-item>
</template>

<script>
  export default {
    name: "showWordLimit-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
