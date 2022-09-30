<template>
  <div>
    <el-form-item label="栅格列统一高度(px)">
      <el-input type="number" v-model="optionModel.colHeight" @input.native="inputNumberHandler"
                min="0" class="hide-spin-button"></el-input>
    </el-form-item>
  </div>
</template>

<script>
  import propertyMixin from "@/components/designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "colHeight-editor",
    mixins: [propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },

  }
</script>

<style scoped>

</style>
