<template>
  <div>
    <comp-one ref="zk1" width="a" height="b" imgurl="c" @cherry="cherry">
    </comp-one>
    {{b}}
  </div>
</template>

<script>
// import Vue from 'vue'
const componet = {
  template: `<div :style="style">
        <input type="button" name="btn" value="按钮测试" @click="test" />
    </div>
  `,
  data() {
    return {
      a: "子组件",
      style: {
        width: "200px",
        height: "200px",
        border: "1px solid red"
      }
    }
  },
  props: {
    width: {
      type: String,
      default: ""
    }
  },
  methods: {
    test() {
      this.$emit("cherry", "测试子组件事件")
    }
  },
  created() {
    console.log("子组件created")
  },
  beforeCreate() {
    console.log("子组件beforeCreate")
  },
  mounted() {
    console.log("子组件mounted")
    console.log(this.$attrs);
    console.log(this.$listeners);
    this.$listeners.cherry();
    console.log(this.foo, "-------");
    this.fooMethod();
  },
  beforeMount() {
    console.log("子组件beforeMount")
  },
  beforeDestroy() {
    console.log("子组件beforeDestroy")
  },
  destroyed() {
    console.log("子组件destroyed")
  },
  inject: ['foo', 'fooMethod']
}

// const CompVue = Vue.extend(componet);
export default {
  components: {
    CompOne: componet
  },
  data() {
    return {
      a: "父组件",
      b: 0,
      testObj: {
        b: 1
      }
    }
  },
  methods: {
    cherry() {
      alert("aaaa")
    }
  },
  provide: {
    foo: 'are you a fool?',
    fooMethod: () => {
      console.log("you are a fool");
    }
  },
  created() {
    console.log("父组件created")
  },
  beforeCreate() {
    console.log("父组件beforeCreate")
  },
  mounted() {
    console.log("父组件mounted")
  },
  beforeMount() {
    console.log("父组件beforeMount")
  },
  beforeDestroy() {
    console.log("父组件beforeDestroy")
  },
  destroyed() {
    console.log("父组件destroyed")
  }
};
</script>


<style scoped>
</style>