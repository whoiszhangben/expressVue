<template>
  <dv-water-level-pond :key="refreshFlagKey" :config="config" :style="{width:width+'px',height:height+'px'}" />
</template>

<script>
import {getDataJson, pollingRefresh} from "@/utils/refreshCptData";
export default {
  name: "cpt-dataV-waterLevel",
  title: "",
  icon: '',
  initWidth: 120,
  initHeight: 100,
  group: 'chart',
  props:{
    width:Number,
    height:Number,
    option:Object
  },
  data(){
    return {
      config: {},
      uuid: null,
      refreshFlagKey: null
    }
  },
  watch: {
    'option.attribute': {
      handler() {
        this.loadData();
      },
      deep: true//深度监听
    },
    width(){
      this.refreshFlagKey = require('uuid').v1();
    },
    height(){
      this.refreshFlagKey = require('uuid').v1();
    }
  },
  created() {
    this.uuid = require('uuid').v1();
    this.refreshFlagKey = require('uuid').v1();
    this.refreshCptData();
  },
  methods:{
    refreshCptData(){
      pollingRefresh(this.uuid, this.option.cptDataForm, this.loadData);
      this.refreshFlagKey = require('uuid').v1();
    },
    loadData(){
      getDataJson(this.option.cptDataForm).then(res => {
        this.config = JSON.parse(JSON.stringify(this.option.attribute))
        this.config.data = res;
      });
    }
  }
}
</script>

<style scoped>

</style>
