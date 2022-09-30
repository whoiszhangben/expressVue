<template>
  <el-form-item label="显示行号">
    <el-checkbox v-model="optionModel.showRowNumber"></el-checkbox>
  </el-form-item>
</template>

<script>

  export default {
    name: "showRowNumber-editor",
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
