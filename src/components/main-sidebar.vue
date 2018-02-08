<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <ul class="sidebar-menu">
        <li class="header">管理菜单</li>
        <li class="treeview" v-for="row in menus" :class="{ 'active': row.active}">
          <a v-permission-type="row.permissionType" v-link="{ path: row.link }" href="javascript:void(0)">
            <i class="{{ row.icon }}"></i>
            <span>{{ row.name }}</span>
            <span v-if="row.child" class="pull-right-container"><i class="fa fa-angle-left pull-right"></i> </span>
          </a>
          <ul v-show="row.child" class="treeview-menu">
            <li v-for="child in row.child" class="child-li">
              <a v-organization-type="child.organizationType" v-link="{ path: child.link }" style="font-size: 17px">
                <i class="{{ child.icon }}"></i> {{ child.name }}
              </a>
            </li>
          </ul>
        </li>
        <!--<li class="header active-pro" style="font-size: larger">-->
        <!--&lt;!&ndash;<a href="#">&ndash;&gt;-->
        <!--<i class="fa fa-chevron-circle-right"></i>-->
        <!--<span>切换至配置端</span>-->
        <!--&lt;!&ndash;</a>&ndash;&gt;-->
        <!--</li>-->
      </ul>
    </section>
  </aside>
</template>
<script>
  export default {
    //permissionType 与 organizationRoleType 限制规律：數值越小級別越高
    data: function () {
      return {
        menus: [
          {
            name: '监测管理',
//            link: '/',
            icon: 'iconfont icon-shexiangtou',
            permissionType: 111,
            child: [
              {
                name: '工程分布地图',
                link: '/project/map',
                icon: 'iconfont icon-mn03',
                permissionType: 111,
                organizationType: 111,
              },
              {
                name: '工程信息登记',
                link: '/project/list',
                icon: 'iconfont icon-dengji',
                permissionType: 110,
                organizationType: 111 ,
              },
              {
                name: '监测情况查询',
                link: '/project/situationList',
                icon: 'iconfont icon-chaxunchuangyebankaitongqingkuang',
                permissionType: 111,
                organizationType:  111,
              },
              {
                name: '巡检记录登记',
                link: '/project/checkRecord',
                icon: 'iconfont icon-jiancha1',
                permissionType: 110,
                organizationType: 111,
              },
              {
                name: '人工数据导入',
                link: '/project/manualDataImport',
                icon: 'iconfont icon-gongren',
                permissionType: 0,
                organizationType: 110 ,
              },

            ]
          },
          {
            name: '机构管理',
            link: '/organization/list',
            icon: 'iconfont icon-jigou',
            permissionType: 0,
          },
          {
            name: '人员管理',
            link: '/account/list',
            icon: 'iconfont icon-staff-copy',
            permissionType: 110,
          },
          {
            name: '资料管理',
            link: '/document/list',
            icon: 'iconfont icon-ziliaoguanli',
            permissionType: 111,
          },
          {
            name: '下载管理',
//            link: '/report',
            icon: 'iconfont icon-xiazaibaobiao',
            permissionType: 111,
            child: [
              {
                name: '监测项目报表',
                link: '/download/itemReport',
                icon: 'iconfont icon-wenjian',
                permissionType: 111,
                organizationType:  111,
              },
              {
                name: '工程完整报表',
                link: '/download/wholeReport',
                icon: 'iconfont icon-duogewenjian',
                permissionType: 0,
                organizationType: 110,
              },
              {
                name: '原始测量数据',
                link: '/download/originalData',
                icon: 'iconfont icon-shuju',
                permissionType: 0,
                organizationType: 110 ,
              }
            ]
          },
          {
            name: '预警查询',
            link: '/alarmMessage',
            icon: 'iconfont icon-yujing',
            permissionType: 111,
          },
          {
            name: '设备监控',
            link: '/watchdog/projectList',
            icon: 'iconfont icon-shebei',
            permissionType: 111,
          },
          // {
          //   name: '模板上传',
          //   link: '/reportTemplate/list',
          //   icon: 'iconfont icon-jigou',
          //   permissionType: 0,
          // },
        ]
      };
    }
  };
</script>
<style>
  .treeview > a {
    font-size: 18px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px){
    .main-sidebar, .left-side{
      padding-top: 50px;
    }
  }
</style>
