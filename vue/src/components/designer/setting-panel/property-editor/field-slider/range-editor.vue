<template>
  <el-form-item label="是否为范围选择">
    <el-checkbox v-model="optionModel.range"></el-checkbox>
  </el-form-item>
</template>

<script>
  export default {
    name: "range-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
