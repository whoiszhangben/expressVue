<template>
  <div>
    <el-form-item label="栅格宽度" v-if="!optionModel.responsive">
      <el-input-number v-model.number="optionModel.span" :min="1" :max="24"
                       style="width: 100%"></el-input-number>
    </el-form-item>
    <el-form-item label="栅格宽度PC"
                  v-if="!!optionModel.responsive && (formConfig.layoutType === 'PC')">
      <el-input-number v-model.number="optionModel.md" :min="1" :max="24"
                       style="width: 100%"></el-input-number>
    </el-form-item>
    <el-form-item label="栅格宽度PAD"
                  v-if="!!optionModel.responsive && (formConfig.layoutType === 'Pad')">
      <el-input-number v-model.number="optionModel.sm" :min="1" :max="24"
                       style="width: 100%"></el-input-number>
    </el-form-item>
    <el-form-item label="栅格宽度H5"
                  v-if="!!optionModel.responsive && (formConfig.layoutType === 'H5')">
      <el-input-number v-model.number="optionModel.xs" :min="1" :max="24"
                       style="width: 100%"></el-input-number>
    </el-form-item>
  </div>
</template>

<script>

  export default {
    name: "grid-col-span-editor",
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    computed: {
      formConfig() {
        return this.designer.formConfig
      },


    }
  }
</script>

<style scoped>

</style>
