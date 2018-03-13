<template>
  <div class="app-nav">
    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12 xs-hidden">
      <h4 class="nav-name">{{pathName}}</h4>
    </div>
    <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
      <ol class="breadcrumb">
        <template v-for="row in navigation">
          <li :class="{active: row.active}">
            <template v-if="row.active">
              <i class="row.icon"></i>
              <span>{{ row.name }}</span>
            </template>
            <router-link v-else :to="{ path: row.link }">
              <i class=" row.icon "></i>
              <span>{{ row.name }}</span>
            </router-link>
          </li>
        </template>
      </ol>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  export default{
    data () {
      return {
        navigations: {
          key: 'projectManager',
          name: '首页',
          link: '/project/map',
          icon: 'fa fa-home text-aqua',
          child: [
            {
              key: 'projectMap',
              name: '监测管理',
              link: '/project/map',
              icon: 'iconfont icon-shexiangtou',
              child: [
                {
                  key: 'projectMap',
                  name: '工程分布地图',
                  link: '/project/map',
                  icon: 'iconfont icon-mn03'
                },
                {
                  key: 'projectList',
                  name: '工程信息登记',
                  link: '/project/list',
                  icon: 'iconfont icon-dengji',
                  child: [
                    {
                      key: 'projectAdd',
                      name: '工程信息添加',
                      link: '/project/info/add',
                      icon: 'iconfont icon-add'
                    },
                    {
                      key: 'projectModify',
                      name: '工程信息修改',
                      link: '/project/info/modify',
                      icon: 'iconfont icon-xiugai'
                    },
                    {
                      key: 'projectEdit',
                      name: '工程项目编辑',
                      link: '/project/edit',
                      icon: 'iconfont icon-peizhi',
                      child: [
                        {
                          key: 'projectItemAdd',
                          name: '监测项新增',
                          link: '/project/edit',
                          icon: 'iconfont icon-add'
                        },
                        {
                          key: 'projectItemModify',
                          name: '监测项修改',
                          link: '/project/edit',
                          icon: 'iconfont icon-xiugai'
                        },
                        {
                          key: 'toleranceAdd',
                          name: '监测项限差新增',
                          link: '/project/edit',
                          icon: 'iconfont icon-add'
                        },
                        {
                          key: 'toleranceModify',
                          name: '监测项限差修改',
                          link: '/project/edit',
                          icon: 'iconfont icon-xiugai'
                        },
                        {
                          key: 'projectPointAdd',
                          name: '监测点新增',
                          link: '/project/edit',
                          icon: 'iconfont icon-add'
                        },
                        {
                          key: 'projectPointModify',
                          name: '监测点修改',
                          link: '/project/edit',
                          icon: 'iconfont icon-xiugai'
                        },
                        {
                          key: 'projectPushItemAdd',
                          name: '推送服务新增',
                          link: '/project/edit',
                          icon: 'iconfont icon-add'
                        },
                        {
                          key: 'projectPushItemModify',
                          name: '推送服务修改',
                          link: '/project/edit',
                          icon: 'iconfont icon-xiugai'
                        },
                      ]
                    },
                  ]
                },
                {
                  key: 'projectSituationList',
                  name: '监测情况查询',
                  link: '/project/situationList',
                  icon: 'iconfont icon-chaxunchuangyebankaitongqingkuang',
                  child: [
                    {
                      key: 'projectSituationInfo',
                      name: '监测情况详情',
                      link: '/project/situationInfo',
                      icon: 'iconfont icon-xiangxi'
                    },
                    {
                      key: 'projectSituationModify',
                      name: '监测情况修改',
                      link: '/project/situationInfo/modify',
                      icon: 'iconfont icon-xiugai'
                    },
                  ]
                },
                {
                  key: 'checkRecordList',
                  name: '巡检记录登记',
                  link: '/project/checkRecord',
                  icon: 'iconfont icon-jiancha1',
                  child: [
                    {
                      key: 'checkRecordAdd',
                      name: '新增巡检记录登记',
                      link: '/project/checkRecordInfo/add',
                      icon: 'iconfont icon-add'
                    },
                    {
                      key: 'checkRecordModify',
                      name: '巡检记录修改',
                      link: '/project/checkRecordInfo/modify',
                      icon: 'iconfont icon-xiugai'
                    },
                  ]
                },
                {
                  key: 'manualDataImport',
                  name: '人工数据导入',
                  link: '/project/manualDataImport',
                  icon: 'iconfont icon-gongren',
                },
              ]
            },
            {
              key: 'organization',
              name: '机构管理',
              link: '/organization/list',
              icon: 'iconfont icon-jigou',
              child: [
                {
                  key: 'organizationAdd',
                  name: '机构添加',
                  link: '/organization/info/add',
                  icon: 'iconfont icon-add'
                },
                {
                  key: 'organizationModify',
                  name: '机构修改',
                  link: '/organization/info/modify',
                  icon: 'iconfont icon-xiugai'
                }
              ]
            },
            {
              key: 'account',
              name: '人员管理',
              link: '/account/list',
              icon: 'iconfont icon-staff-copy',
              child: [
                {
                  key: 'accountAdd',
                  name: '人员添加',
                  link: '/account/info/add',
                  icon: 'iconfont icon-add'
                },
                {
                  key: 'accountModify',
                  name: '人员修改',
                  link: '/account/info/modify',
                  icon: 'iconfont icon-xiugai'
                }
              ]
            },
            {
              key: 'document',
              name: '资料管理',
//              link: '/account/list',
              icon: 'iconfont icon-ziliaoguanli',
              child: [
                {
                  key: 'accountAdd',
                  name: '资料上传',
                  link: '/document/info/add',
                  icon: 'iconfont icon-shangchuan'
                },
                {
                  key: 'accountModify',
                  name: '资料下载',
                  link: '/document/info/modify',
                  icon: 'iconfont icon-xiazai'
                }
              ]
            },
            {
              key: 'report',
              name: '下载管理',
              link: '/download',
              icon: 'iconfont icon-xiazaibaobiao',
              child: [
                {
                  key: 'itemReport',
                  name: '监测项目报表',
                  link: '/download/itemReport',
                  icon: 'iconfont icon-xiazaibaobiao'
                },
                {
                  key: 'wholeReport',
                  name: '工程完整报表',
                  link: '/download/wholeReport',
                  icon: 'iconfont icon-xiazaibaobiao'
                },
                {
                  key: 'originalData',
                  name: '原始测量数据',
                  link: '/download/originalData',
                  icon: 'iconfont icon-xiazaibaobiao'
                }
              ]
            },
            {
              key: 'alarmMessage',
              name: '预警查询',
              link: '/alarmMessage',
              icon: 'fa fa-circle-o text-aqua',
            },
            {
              key: 'watchdogList',
              name: '设备监控',
              link: '/watchdog/projectList',
              icon: 'iconfont icon-shebei',
              child: [
                {
                  key: 'watchdogAdd',
                  name: '设备监控添加',
                  link: '/watchdog/info/add',
                  icon: 'iconfont icon-add'
                },
                {
                  key: 'watchdogModify',
                  name: '设备监控修改',
                  link: '/watchdog/info/modify',
                  icon: 'iconfont icon-xiugai'
                },
                {
                  key: 'watchdogEdit',
                  name: 'IMC监控',
                  link: '/watchdog/imcList',
                  icon: 'iconfont icon-computer',
                  child: [
                    {
                      key: 'watchdogItemAdd',
                      name: '监测项新增',
                      link: '/watchdog/edit',
                      icon: 'iconfont icon-add'
                    },
                    {
                      key: 'watchdogItemModify',
                      name: '监测项修改',
                      link: '/watchdog/edit',
                      icon: 'iconfont icon-xiugai'
                    },
                    {
                      key: 'imcEdit',
                      name: 'SCT和传感器',
                      link: '/watchdog/imcEdit',
                      icon: 'iconfont icon-details'
                    }
                  ]
                },
              ]
            },
          ]
        }
      };
    },
    computed: {
      ...mapState({
        pathKey: state => state.nav.pathKey,
        pathName: state => state.nav.pathName
      }),
      navigation(){
        return this.getCurrentNavigation(this.navigations, this.pathKey);
      },
    },
//    computed: {
//      navigation () {
//
////        return this.getCurrentNavigation(this.navigations, this.pathKey);
//      }
//    },
    methods: {
      getCurrentNavigation (root, key) {
        try {
          const navigations = [];
          this.recursion(root, key, navigations);
          return navigations;
        } catch (e) {
          console.error(e);
        }
      },
      recursion (root, key, array) {
        if (root === null && key === null) {
          return false;
        }
        array.push(root);
        if (root.key === null) {
          console.error(root);
          return false;
        }
        if (root.key === key) {
          root.active = true;
          return true;
        }
        if (root.hasOwnProperty('child') === true) {
          for (let i = 0; i < root.child.length; i++) {
            if (this.recursion(root.child[i], key, array) === true) {
              return true;
            }
          }
        }
        this.removeArray(array, root);
        return false;
      },
      removeArray (array, obj) {
        for (var i = 0; i < array.length; i++) {
          var temp = array[i];
          if (!isNaN(obj)) {
            temp = i;
          }
          if (temp === obj) {
            for (var j = i; j < array.length; j++) {
              array[j] = array[j + 1];
            }
            array.length = array.length - 1;
          }
        }
      }
    }
  }
</script>
<style scoped>
  .app-nav {
    height: 46px;
    background: #ffffff;
    padding: 4px 9px 4px 10px;
  }

  .nav-name {
    color: #313131;
    font-family: Rubik, sans-serif;
    margin: 10px 0;
    font-weight: 300;
  }

  .breadcrumb {
    float: right;
    background: 0 0;
    margin-bottom: 0;
    padding: 0;
    margin-top: 8px;
  }

  .breadcrumb a {
    color: rgba(0, 0, 0, .5)
  }

  .breadcrumb a:hover {
    color: rgba(0, 0, 0, 1)
  }

  .breadcrumb li.active span {
    color: #f44336;
  }

  @media screen and (max-width: 768px) {
    #app .breadcrumb {
      padding: 8px 10px;
    }

    .xs-hidden {
      display: none;
    }
  }
</style>
