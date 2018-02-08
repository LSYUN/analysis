// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router/index";
import axios from "axios";
import VeeValidate from "./validate/index";
import "./assets/css/site.scss";
import "./assets/css/reset.css";

Vue.use(VeeValidate);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
