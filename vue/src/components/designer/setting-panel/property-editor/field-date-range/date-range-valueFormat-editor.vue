<template>
  <el-form-item label="绑定值格式">
    <el-select v-model="optionModel.valueFormat" filterable allow-create>
      <el-option label="yyyy-MM-dd" value="yyyy-MM-dd"></el-option>
      <el-option label="yyyy-MM-dd HH:mm:ss" value="yyyy-MM-dd HH:mm:ss"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "date-range-valueFormat-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
