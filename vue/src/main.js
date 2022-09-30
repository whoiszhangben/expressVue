import Vue from 'vue'
import "./assets/theme/style.css";
import ElementUI from 'element-ui';
import App from './App.vue'


import Contacts from './page/contacts/main.vue';
import Message from './page/message/message.vue';
import External from './page/external/index.vue';
import Intro from './page/intro/intro.vue';
import Media from './page/media/media.vue';
import Title from './components/title.vue';
import QrScan from './page/qrscan/qrscan.vue';
import FormCustom from "./page/formCustom/index.vue";
import DataCustom from "./components/designer2/index.vue";
import Reference from "./page/reference/index.vue";
import Tools from "./page/tools/index.vue";
import ColorConverter from "./page/tools/color-converter.vue";
import ColorCaptrue from "./page/tools/color-captrue.vue";
import vueRouter from 'vue-router';

import './icons';
import dataV from '@jiaminghi/data-view';
import '@/components/register-option'
import '@/components/register-cpt'
import '@/assets/font/custom-font.css';
import '@/utils/RegisterMap';



Vue.config.productionTip = false;
Vue.use(vueRouter);
Vue.use(ElementUI);
Vue.use(dataV);

Vue.directive('drag', function (el, binding, vnode) {
  if (el.disabled || el.classList.contains('disabled')) {
      el.draggable = false;
      return;
  }
  el.draggable = true;
  el.ondragstart = function (evt) {
      setTimeout(() => {
          el.classList.add('dragging');
      }, 0);
      if (!evt.dataTransfer) {
          return;
      }
      const obj = binding.value;
      if (obj) {
          if (obj.effect) {
              evt.dataTransfer.effectAllowed = obj.effect;
          }
          if (obj.value) {
              let type = obj.type ? obj.type : 'text';
              evt.dataTransfer.setData(type, obj.value);
          }
      }
      const component = vnode.componentInstance;
      if (component && component.onDragstart) {
          component.onDragstart(evt);
      }
  };
  el.ondragend = function (evt) {
      el.classList.remove('dragging');
      // 移除拖动添加的样式
      el.removeAttribute('style');
      const component = vnode.componentInstance;
      if (component && component.onDragend) {
          component.onDragend(evt);
      }
  };
});

Vue.directive('drop', function (el, binding, vnode) {
  const component = vnode.componentInstance;
  el.ondragenter = function (evt) {
      const obj = binding.value;
      if (obj && evt.dataTransfer) {
          if (obj.types && Array.isArray(obj.types)) {
              if (!evt.dataTransfer.types.some(t => obj.types.indexOf(t) > -1)) {
                  return;
              }
          }
          if (obj.type) {
              if (!evt.dataTransfer.types.some(t => t === obj.type)) {
                  return;
              }
          }
      }
      if (component && component.onDragenter) {
          component.onDragenter(evt);
      }
  };
  el.ondragover = function (evt) {
      if (component && component.onDragover) {
          component.onDragover(evt);
      }
  };
  el.ondragleave = function (evt) {
      if (component && component.onDragleave) {
          component.onDragleave(evt);
      }
  };
  el.ondrop = function (evt) {
      if (component && component.onDrop) {
          component.onDrop(evt);
      }
  };
});

new Vue({
  router: new vueRouter({
    routes: [{
      name: 'contacts',
      path: '/contacts',
      components: {
        default: Contacts,
        title: Title
      },
      content: {
        title: '通讯录管理',
        desc: '拉取企业通讯录的组织架构数，可以预览部门和成员的详情，对成员信息进行编辑，对部门进行成员的添加、删除、移动等操作'
      }
    },
    {
      name: 'intro',
      path: '/intro',
      components: {
        default: Intro,
        title: Title
      },
      content: {
        title: '监控系统功能点预演',
        desc: '项目信息记录'
      }
    },
    {
      name: 'message',
      path: '/message',
      components: {
        default: Message,
        title: Title
      },
      content: {
        title: '消息推送',
        desc: '企业微信开放了消息发送接口，企业可以使用这些接口让自定义应用与企业微信后台或用户间进行双向通信。'
      }
    },
    {
      name: 'external',
      path: '/external',
      components: {
        default: External,
        title: Title
      },
      content: {
        title: '客户联系',
        desc: '企业内的员工可以添加外部企业的联系人进行工作沟通，外部联系人分为企业微信联系人和微信联系人两种类型。配置了客户联系功能的成员所添加的外部联系人为企业客户。'
      }
    },
    {
      name: 'media',
      path: '/media',
      components: {
        default: Media,
        title: Title
      },
      content: {
        title: '素材管理',
        desc: '企业微信开放了消息发送接口，企业可以使用这些接口让自定义应用与企业微信后台或用户间进行双向通信。'
      }
    },
    {
      name: 'qrscan',
      path: '/qrscan',
      components: {
        default: QrScan,
        title: Title
      },
      content: {
        title: '扫码登录',
        desc: '企业微信开放了消息发送接口，企业可以使用这些接口让自定义应用与企业微信后台或用户间进行双向通信。'
      }
    },
    {
      name: 'formCustom',
      path: '/formCustom',
      components: {
        default: FormCustom,
        title: Title
      },
      content: {
        title: '拖拉拽实现表单定制化',
        desc: '拖拉拽'
      }
    },
    {
      name: 'dataCustom',
      path: '/dataCustom',
      components: {
        default: DataCustom
      },
      content: {
        title: '拖拉拽实现大屏定制化',
        desc: '拖拉拽'
      }
    },
    {
      name: 'reference',
      path: '/reference',
      components: {
        default: Reference,
        title: Title
      },
      content: {
        title: '参考资料',
        desc: '人有坎,失于盛年;犹当晚学,不可自弃'
      }
    },
    {
      name: 'tools',
      path: '/tools',
      components: {
        default: Tools,
        title: Title
      },
      content: {
        title: '工具',
        desc: '工欲善其事,必先利其器'
      },
      children: [
        {
          name: 'colorConverter',
          path: '/colorConverter',
          component: ColorConverter
        },
        {
          name: 'colorCaptrue',
          path: '/colorCaptrue',
          component: ColorCaptrue
        },
      ]
    }
    
  ]
  }),
  render: h => h(App),
}).$mount('#app')
