<template>
  <el-form-item label="显示类型">
    <el-select v-model="optionModel.type">
      <el-option label="daterange" value="daterange"></el-option>
      <el-option label="datetimerange" value="datetimerange"></el-option>
      <el-option label="monthrange" value="monthrange"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>


  export default {
    name: "date-range-type-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
