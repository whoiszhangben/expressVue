<template>
  <el-form-item label="字段标签对齐">
    <el-radio-group v-model="optionModel.labelAlign" class="radio-group-custom">
      <el-radio-button label="label-left-align">
        左对齐</el-radio-button>
      <el-radio-button label="label-center-align">
        居中对齐</el-radio-button>
      <el-radio-button label="label-right-align">
        右对齐</el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<script>

  export default {
    name: "sub-form-labelAlign-editor",
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>
  .radio-group-custom ::v-deep .el-radio-button__inner {
  padding-left: 12px;
  padding-right: 12px;
}


</style>
