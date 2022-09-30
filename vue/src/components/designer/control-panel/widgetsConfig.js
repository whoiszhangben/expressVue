
export const containers = [
  {
    type: 'grid',
    category: 'container',
    icon: 'el-icon-s-grid',
    displayName: '栅格',
    cols: [],
    options: {
      name: '',
      hidden: false,
      gutter: 12,
      colHeight: null,  //栅格列统一高度属性，用于解决栅格列设置响应式布局浮动后被挂住的问题！！
      customClass: '',  //自定义css类名
    }
  },

  {
    type: 'table',
    category: 'container',
    icon: 'el-icon-bank-card',
    displayName: '表格',
    rows: [],
    options: {
      name: '',
      hidden: false,
      customClass: '',  //自定义css类名
    }
  },

  {
    type: 'tab',
    category: 'container',
    icon: 'el-icon-money',
    displayType: 'border-card',
    displayName: '标签页',
    tabs: [],
    options: {
      name: '',
      hidden: false,
      customClass: '',  //自定义css类名
    }
  },
  {
    type: 'grid-col',
    category: 'container',
    icon: 'grid-col',
    internal: true,
    displayName: '栅格列',
    widgetList: [],
    options: {
      name: '',
      hidden: false,
      span: 12,
      offset: 0,
      push: 0,
      pull: 0,
      responsive: false,  //是否开启响应式布局
      md: 12,
      sm: 12,
      xs: 12,
      customClass: '',  //自定义css类名
    }
  },

  {
    type: 'table-cell',
    category: 'container',
    icon: 'table-cell',
    internal: true,
    widgetList: [],
    displayName: '表格列',
    merged: false,
    options: {
      name: '',
      cellWidth: '',
      cellHeight: '',
      colspan: 1,
      rowspan: 1,
      customClass: '',  //自定义css类名
    }
  },

  {
    type: 'tab-pane',
    category: 'container',
    icon: 'tab-pane',
    internal: true,
    widgetList: [],
    displayName: 'tab页',
    options: {
      name: '',
      label: '',
      hidden: false,
      active: false,
      disabled: false,
      customClass: '',  //自定义css类名
    }
  },


]

export const basicFields = [
  {
    type: 'input',
    icon: 'text-field',
    formItemFlag: true,
    displayName: '单行文本',
    options: {
      name: '',
      label: '',
      labelAlign: '',
      type: 'text',
      defaultValue: '',
      placeholder: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      readonly: false,
      disabled: false,
      hidden: false,
      clearable: true,
      showPassword: false,
      required: false,
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '',  //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      minLength: null,
      maxLength: null,
      showWordLimit: false,
      prefixIcon: '',
      suffixIcon: '',
      appendButton: false,
      appendButtonDisabled: false,
      buttonIcon: 'el-icon-search',
      //-------------------
      onCreated: '',
      onMounted: '',
      onInput: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: '',
    },
  },
  {
    type: 'button',
    icon: 'button',
    formItemFlag: false,
    displayName: '按钮',
    options: {
      name: '',
      label: '',
      columnWidth: '200px',
      size: '',
      disabled: false,
      hidden: false,
      type: '',
      plain: false,
      round: false,
      circle: false,
      icon: null,
      //-------------------
      customClass: '',  //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: '',
      onClick: '',
    },
  },

  {
    type: 'divider',
    icon: 'divider',
    formItemFlag: false,
    displayName: '分割线',
    options: {
      name: '',
      label: '',
      columnWidth: '200px',
      direction: 'horizontal',
      contentPosition: 'center',
      hidden: false,
      //-------------------
      customClass: '',  //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: '',
    },
  },

  //

]

export const advancedFields = [
  {
    type: 'picture-upload',
    icon: 'picture-upload-field',
    formItemFlag: true,
    displayName: '图片',
    options: {
      name: '',
      label: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      customRule: '',
      customRuleHint: '',
      //-------------------
      uploadURL: '',
      uploadTip: '',
      withCredentials: false,
      multipleSelect: false,
      showFileList: true,
      limit: 3,
      fileMaxSize: 5, //MB
      fileTypes: ['jpeg', 'png'],
      //headers: [],
      //-------------------
      customClass: '',  //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onBeforeUpload: '',
      onUploadSuccess: '',
      onUploadError: '',
      onValidate: '',
      //onFileChange: '',
    },

  },

  {
    type: 'file-upload',
    icon: 'file-upload-field',
    displayName: '文件',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      customRule: '',
      customRuleHint: '',
      //-------------------
      uploadURL: '',
      uploadTip: '',
      withCredentials: false,
      multipleSelect: false,
      showFileList: true,
      limit: 3,
      fileMaxSize: 5, //MB
      fileTypes: ['doc', 'docx', 'xls', 'xlsx'],
      //headers: [],
      //-------------------
      customClass: '',  //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onBeforeUpload: '',
      onUploadSuccess: '',
      onUploadError: '',
      onValidate: '',
      //onFileChange: '',
    },
  },

  {
    type: 'rich-editor',
    icon: 'rich-editor-field',
    formItemFlag: true,
    displayName: '富文本',
    options: {
      name: '',
      label: '',
      placeholder: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      customRule: '',
      customRuleHint: '',
      //-------------------
      customClass: '',  //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      minLength: null,
      maxLength: null,
      showWordLimit: false,
      //-------------------
      onCreated: '',
      onMounted: '',
      onValidate: '',
    },
  },

  // {
  //   type: 'slot',
  //   icon: 'slot-field',
  //   formItemFlag: false,
  //   options: {
  //     name: '',
  //     label: '',
  //     customClass: '',  //自定义css类名
  //   }
  // },

]

export const customFields = [

]

export function addContainerWidgetSchema(containerSchema) {
  containers.push(containerSchema)
}

export function addBasicFieldSchema(fieldSchema) {
  basicFields.push(fieldSchema)
}

export function addAdvancedFieldSchema(fieldSchema) {
  advancedFields.push(fieldSchema)
}

export function addCustomWidgetSchema(widgetSchema) {
  customFields.push(widgetSchema)
}
