<template>
  <el-form-item label="是否竖向显示">
    <el-checkbox v-model="optionModel.vertical"></el-checkbox>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "vertical-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
