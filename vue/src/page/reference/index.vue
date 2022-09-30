<template>
  <div class="block">
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="iShow客户端" name="1">

        </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
    data() {
      return {
        activeNames: ['1']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
}
</script>

<style>

</style>