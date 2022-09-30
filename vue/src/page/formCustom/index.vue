<!-- <template>
  <div class="block form-design-content">
    <sider :options="leftSider">
      <form-design-panel></form-design-panel>
    </sider>
    <sider :options="rightSider">
      
    </sider>
  </div>
</template>

<script>
  import Sider from '../../components/sider/sider.vue';
  import FormDesignPanel from '../../components/panels/form-design-panel.vue'
  export default {
    name: 'design',
    components: {
      Sider,
      FormDesignPanel,
    },
    data() {
      return {
        leftSider: {
          width: 238,
          minWidth: 238,
          maxWidth: 700,
          direction: 'left',
          collapsible: true,
        },
        rightSider: {
          width: 276,
          minWidth: 276,
          maxWidth: 700,
          direction: 'right',
          collapsible: true,
        }
      }
    }
  }
</script>


<style scoped>
  .action .form-info {
  display: flex;
  margin-left: -3px;
  padding-top: 5px;
  padding-bottom: 9px;
  align-items: baseline;
  width: 40%;
}
.action .form-info .form-name {
  height: 22px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
  margin-right: 8px;
}
.action .form-info .form-draft,
.action .form-info .form-version {
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 17px;
}
.action .design-box {
  width: 20%;
  min-width: 270px;
  text-align: center;
}
.action .options-box {
  width: 40%;
  min-width: 478px;
  text-align: right;
}
.tips {
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 800;
}
.tips .is-draft-tips {
  box-sizing: border-box;
  margin: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: 'tnum';
  font-feature-settings: 'tnum';
  position: relative;
  padding: 8px 15px 8px 37px;
  word-wrap: break-word;
  border-radius: 4px;
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  color: rgba(0, 0, 0, 0.65);
}
.tips .is-draft-tips .draft-icon {
  position: absolute;
  top: 11.5px;
  left: 16px;
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  color: #1890ff;
}
.tips .is-draft-tips .draft-text {
  color: rgba(0, 0, 0, 0.85);
}
.ant-modal-body {
  padding: 16px 24px;
}
.title-tip {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
.publicTips {
  width: 500px;
}
.design__preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: #f4f6fc;
}
:v-deep .control-field > .logic:before {
  content: '';
}
:v-deep .location:before {
  content: '';
}
.form-design-content {
  min-height: calc(30vh);
}
.form-design-content :v-deep.right .h3-sider-body {
  overflow-x: hidden;
}
.desc-box {
  height: 223px;
  position: relative;
}
.desc-box .desc-num {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: right;
}
.desc-box textarea {
  width: 100%;
  height: 100%;
  font-size: 14px;
  border: none;
  resize: none;
  outline: none;
}

</style> -->

<template>
  <designer></designer>
</template>

<script>
  import Designer from '@/components/designer/index';
export default {
  components: {
    Designer
  }
}
</script>

<style>

</style>