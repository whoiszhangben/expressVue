<template>
  <el-form-item label="响应式布局">
    <el-checkbox v-model="optionModel.responsive"></el-checkbox>
  </el-form-item>
</template>

<script>

  export default {
    name: "grid-col-responsive-editor",
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
