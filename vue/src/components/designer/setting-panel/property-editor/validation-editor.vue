<template>
  <el-form-item>
    <span slot="label">字段校验
      <el-tooltip effect="light" content="支持输入正则表达式">
        <i class="el-icon-info"></i></el-tooltip>
    </span>
    <el-select v-model="optionModel.validation" filterable allow-create default-first-option>
      <el-option v-for="(fv, fvIdx) in fieldValidators"
                 :key="fvIdx"
                 :label="fv.label"
                 :value="fv.value">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "validation-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    data() {
      return {
        fieldValidators: [
          {value: 'number', label: "数字"},
          {value: 'letter', label: "字母"},
          {value: 'letterAndNumber', label: "数字字母"},
          {value: 'mobilePhone', label: "手机号码"},
          {value: 'email', label: "邮箱"},
          {value: 'url', label: "网址"},
          {value: 'noChinese', label: "非中文字符"},
          {value: 'chinese', label: "仅中文字符"},
        ],
      }
    },

  }
</script>

<style scoped>

</style>
