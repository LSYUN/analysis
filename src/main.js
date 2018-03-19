// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
xhook.before(function (request) {
  if (window.session) {
    if (!request.headers.token)
      request.xhr.setRequestHeader('token', window.session.get(window.sessionKeys.TOKEN));
  }
});
xhook.after(function (request, response) {
  // if (response.status === 0) {  //后台服务没启动 或 token已过期
  //   window.location.href = window.mainConfig.redirectUrl;
  //   if (window.session.get(window.sessionKeys.TOKEN)) {
  //     toastr.clear();
  //     toastr.error('操作超时, 请重新登录');
  //   }
  //   window.sessionStorage.clear();
  // }
  if (response.status === 403) {
    // console.log(response);
    if (window.location.href.indexOf('login') === -1) {
      window.sessionStorage.clear();
      if (window.mainConfig.redirectUrl === 'undefined' || window.mainConfig.redirectUrl.length < 10) {
        window.location.href = 'http://112.74.205.248:8600/#!/login';
      } else {
        window.location.href = window.mainConfig.redirectUrl;
      }
    }
  } else if (response.status !== 200) {
    console.log(response);
  }
});
import Vue from "vue";
import App from "./App";
import router from "./router/index";
import store from "./managers/vuex/store";
import Keys from "./managers/storage/storage-key";
import Local from "./managers/storage/local";
import Session from "./managers/storage/session";
import MainConfig from "./main-config";
import Permission from "./managers/vue_extend/permission.js";
import VeeValidate from "./managers/validate/index";
import VueSelect2 from "./components/utility/vue-select2.vue";
import GlobalTool from "./managers/utils/global-tool";
import "./assets/css/site.scss";

Vue.prototype.bus = new Vue();
Vue.use(VeeValidate.VeeValidate, VeeValidate.config);
window.local = Local;
window.session = Session;
window.localKeys = Keys.LocalKeys;
window.sessionKeys = Keys.SessionKeys;
window.mainConfig = MainConfig;
window.globalTool = GlobalTool;
Permission.accountType(Vue);
Permission.organizationType(Vue);
Vue.config.productionTip = false;
Vue.component('vue-select2', VueSelect2);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
