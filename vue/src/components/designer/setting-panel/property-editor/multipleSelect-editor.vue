<template>
  <el-form-item label="文件可多选">
    <el-checkbox v-model="optionModel.multipleSelect"></el-checkbox>
  </el-form-item>
</template>

<script>
  export default {
    name: "multipleSelect-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },

  }
</script>

<style scoped>

</style>
