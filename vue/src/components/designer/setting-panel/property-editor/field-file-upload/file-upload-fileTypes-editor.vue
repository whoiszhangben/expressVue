<template>
  <el-form-item>
    <span slot="label">上传文件类型
      <el-tooltip effect="light" content="支持添加其他文件类型">
        <i class="el-icon-info"></i></el-tooltip>
    </span>
    <el-select multiple allow-create filterable default-first-option
               v-model="optionModel.fileTypes" style="width: 100%">
      <el-option v-for="(ft, ftIdx) in uploadFileTypes"
                 :key="ftIdx"
                 :label="ft.label"
                 :value="ft.value">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  

  export default {
    name: "fileTypes-editor",
    
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    data() {
      return {
        uploadFileTypes: [
          {value: 'doc', label: 'doc'},
          {value: 'xls', label: 'xls'},
          {value: 'docx', label: 'docx'},
          {value: 'xlsx', label: 'xlsx'},
        ],
      }
    }
  }
</script>

<style scoped>

</style>
