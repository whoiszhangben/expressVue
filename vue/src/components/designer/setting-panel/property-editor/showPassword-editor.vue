<template>
  <el-form-item label="可显示密码" v-if="optionModel.type === 'password'">
    <el-checkbox v-model="optionModel.showPassword"></el-checkbox>
  </el-form-item>
</template>

<script>
  export default {
    name: "showPassword-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },

  }
</script>

<style scoped>

</style>
