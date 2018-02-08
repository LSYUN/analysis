import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: resolve => require(['../components/404.vue'], resolve)
    },
    {
      path: '/login',
      component: resolve => require(['../components/login.vue'], resolve)
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
