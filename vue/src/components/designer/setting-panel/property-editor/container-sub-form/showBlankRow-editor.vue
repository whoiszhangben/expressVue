<template>
  <el-form-item label="默认显示新行">
    <el-checkbox v-model="optionModel.showBlankRow"></el-checkbox>
  </el-form-item>
</template>

<script>

  export default {
    name: "showBlankRow-editor",
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
