<template>
  <el-form-item label="左侧间隔格数">
    <el-input-number v-model.number="optionModel.offset" :min="0" :max="24"
                     style="width: 100%"></el-input-number>
  </el-form-item>
</template>

<script>

  export default {
    name: "grid-col-offset-editor",
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
