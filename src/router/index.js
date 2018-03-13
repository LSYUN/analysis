import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

const router = new Router({
  linkActiveClass: "",
  linkExactActiveClass: "",
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
      path: '/loginAuto',
      component: resolve => require(['../components/login-auto.vue'], resolve)
    },
    {
      path: '/',
      component: resolve => require(['../components/main.vue'], resolve),
      children: [
        {
          path: 'project',
          component: resolve => require(['../components/main/project/manager.vue'], resolve),
          children: [
            {path: 'map', component: resolve => require(['../components/main/project/map.vue'], resolve)},
            {path: 'test', component: resolve => require(['../components/main/project/test.vue'], resolve)},
            {path: 'list', component: resolve => require(['../components/main/project/list.vue'], resolve)},
            {
              path: 'info/:operation',
              component: resolve => require(['../components/main/project/info.vue'], resolve),
              // beforeEnter: (to, from, next) => {
              //   // if (from.fullPath = '/')
              //   //   console.log(to, from);
              //   next();
              // },
              // beforeEnter: (to, from, next) => {
              //   console.log(to, from);
              //   next();
              // },
            },
            {
              path: 'edit',
              component: resolve => require(['../components/main/project/edit/manager.vue'], resolve),
              children: [
                {
                  path: 'list',
                  component: resolve => require(['../components/main/project/edit/list.vue'], resolve)
                },
                // {
                //   path: 'listSet',//原projectSet.vue
                //   component: resolve => require(['../components/main/project/edit/list-set.vue'], resolve)
                // },
                {
                  path: 'info/:operation',
                  component: resolve => require(['../components/main/project/edit/info.vue'], resolve),
                  beforeUpdate: (to, from, next) => {
                    console.log(to, from);
                    next();
                  }
                },
                // {
                //   path: 'alarm',
                //   component: resolve => require(['../components/main/project/edit/alarm/manager.vue'], resolve),
                //   children: [
                //     {
                //       path: 'point',
                //       component: resolve => require(['../components/main/project/edit/alarm/point.vue'], resolve)
                //     },
                //     {
                //       path: 'account',
                //       component: resolve => require(['../components/main/project/edit/alarm/account.vue'], resolve)
                //     },
                //     {
                //       path: 'message',
                //       component: resolve => require(['../components/main/project/edit/alarm/message.vue'], resolve)
                //     },
                //   ]
                // },
                // {
                //   path: 'relItemPoint',
                //   component: resolve => require(['../components/main/project/edit/rel_item_point/list.vue'], resolve)
                // },
                // {
                //   path: 'sensorParam',
                //   component: resolve => require(['../components/main/project/edit/sensor_param/list.vue'], resolve)
                // },
                // {
                //   path: 'pointGroupParam',
                //   component: resolve => require(['../components/main/project/edit/point_group_param/list.vue'], resolve)
                // },
                // {
                //   path: 'dataReceiverList',
                //   component: resolve => require(['../components/main/project/edit/data_receiver/list.vue'], resolve)
                // },
                // {
                //   path: 'dataReceiverInfo/:operation',
                //   component: resolve => require(['../components/main/project/edit/data_receiver/info.vue'], resolve)
                // },
                // {
                //   path: 'necessaryPeriod',
                //   component: resolve => require(['../components/main/project/edit/necessary_period/list.vue'], resolve)
                // },
              ]
            },
            {
              path: 'situationList',
              component: resolve => require(['../components/main/project/situation/list.vue'], resolve)
            },
            {
              path: 'situationInfo',
              component: resolve => require(['../components/main/project/situation/info.vue'], resolve),
              children: [
                // {
                //   path: 'diagram',
                //   component: resolve => require(['../components/main/project/situation/info-diagram.vue'], resolve)
                // },
                {
                  path: 'history',
                  component: resolve => require(['../components/main/project/situation/info-history.vue'], resolve)
                },
                // {
                //   path: 'analysis',
                //   component: resolve => require(['../components/main/project/situation/info-analysis.vue'], resolve)
                // },
                // {
                //   path: 'analysisLink',
                //   component: resolve => require(['../components/main/project/situation/info-analysis-link.vue'], resolve)
                // },
                {
                  path: 'realTime',
                  component: resolve => require(['../components/main/project/situation/info-realTime.vue'], resolve)
                },
              ]
            },
            // {
            //   path: 'checkRecordList',
            //   component: resolve => require(['../components/main/project/check_record/list.vue'], resolve)
            // },
            // {
            //   path: 'checkRecordInfo/:operation',
            //   component: resolve => require(['../components/main/project/check_record/info.vue'], resolve)
            // },
            // {
            //   path: 'manualDataImport',
            //   component: resolve => require(['../components/main/project/manual_data/import.vue'], resolve)
            // },
          ]
        },
        // {
        //   path: 'organization',
        //   component: resolve => require(['../components/main/organization/manager.vue'], resolve),
        //   children: [
        //     {path: 'list', component: resolve => require(['../components/main/organization/list.vue'], resolve)},
        //     {path: 'info/:operation', component: resolve => require(['../components/main/organization/info.vue'], resolve)}
        //   ]
        // },
        // {
        //   path: 'account',
        //   component: resolve => require(['../components/main/account/manager.vue'], resolve),
        //   children: [
        //     {path: 'list', component: resolve => require(['../components/main/account/list.vue'], resolve)},
        //     {path: 'info/:operation', component: resolve => require(['../components/main/account/info.vue'], resolve)}
        //   ]
        // },
        // {
        //   path: 'document',
        //   component: resolve => require(['../components/main/document/manager.vue'], resolve),
        //   children: [
        //     {path: 'list', component: resolve => require(['../components/main/document/list.vue'], resolve)},
        //     {path: 'info/:operation', component: resolve => require(['../components/main/document/info.vue'], resolve)}
        //   ]
        // },
        // {
        //   path: 'download',
        //   component: resolve => require(['../components/main/download/manager.vue'], resolve),
        //   children: [
        //     {
        //       path: 'itemReport',
        //       component: resolve => require(['../components/main/download/item-report.vue'], resolve)
        //     },
        //     {
        //       path: 'wholeReport',
        //       component: resolve => require(['../components/main/download/whole-report.vue'], resolve)
        //     },
        //     {
        //       path: 'originalData',
        //       component: resolve => require(['../components/main/download/original-data.vue'], resolve)
        //     }
        //   ]
        // },
        // {path: 'alarm', component: resolve => require(['../components/main/alarm/message.vue'], resolve)},
        // {
        //   path: 'watchdog',
        //   component: resolve => require(['../components/main/watchdog/manager.vue'], resolve),
        //   children: [
        //     {
        //       path: 'projectList',
        //       component: resolve => require(['../components/main/watchdog/project-list.vue'], resolve)
        //     },
        //     {path: 'imcList', component: resolve => require(['../components/main/watchdog/imc-list.vue'], resolve)},
        //     {
        //       path: 'imcEdit', component: resolve => require(['../components/main/watchdog/imc-edit.vue'], resolve),
        //       children: [
        //         {
        //           path: 'sctList',
        //           component: resolve => require(['../components/main/watchdog/imc-edit-sct-list.vue'], resolve)
        //         },
        //         {
        //           path: 'sensorList',
        //           component: resolve => require(['../components/main/watchdog/imc-edit-sensor-list.vue'], resolve)
        //         }
        //       ]
        //     }
        //   ]
        // },
      ]
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
});
router.beforeEach(function (to, from, next) {
  // const allow = ['login', 'loginAuto'];
  // var path = to.path.split('/')[1];
  // if (allow.indexOf(path) < 0) {
  //   router.push({path: '/login'});
  // }
  next();
});
export default router;
