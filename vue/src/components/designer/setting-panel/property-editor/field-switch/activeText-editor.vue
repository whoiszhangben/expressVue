<template>
  <el-form-item label="开启时文字描述">
    <el-input v-model="optionModel.activeText"></el-input>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "activeText-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
