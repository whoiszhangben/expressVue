<template>
  <el-form-item label="文字位置">
    <el-select v-model="optionModel.contentPosition">
      <el-option label="center" value="center"></el-option>
      <el-option label="left" value="left"></el-option>
      <el-option label="right" value="right"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "contentPosition-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
