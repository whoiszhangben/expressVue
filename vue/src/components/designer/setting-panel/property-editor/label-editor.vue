<template>
  <el-form-item label="字段标签" v-if="!noLabelSetting">
    <el-input type="text" v-model="optionModel.label"></el-input>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "label-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    computed: {
      noLabelSetting() {
        return (this.selectedWidget.type === 'static-text') || (this.selectedWidget.type === 'html-text')
        //|| (this.selectedWidget.type === 'divider')
      },

    }
  }
</script>

<style scoped>

</style>
