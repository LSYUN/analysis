<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <ul class="sidebar-menu">
        <li class="header"><span>管理菜单</span></li>
        <li class="treeview" v-for="row in menus" :class=" {active: row.active}">
          <router-link v-account-type="row.accountType" :to="{ path: row.link }" class="a-link row-link"
                       :data-path="row.key">
            <i :class="row.icon" class="row-icon"></i><span class="link-name row-name">{{ row.name }}</span>
            <span v-if="row.child" class="pull-right-container"><i class="fa fa-angle-left pull-right"></i> </span>
          </router-link>
          <ul v-show="row.child" class="treeview-menu row-child">
            <li class="treeview" v-for="child in row.child">
              <router-link v-organization-type="child.organizationType" :to="{ path: child.link }"
                           :data-path="child.key"
                           class="a-link child-link">
                <i :class="child.icon"></i><span class="link-name child-name"> {{ child.name }}</span>
              </router-link>
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
    //accountType 与 organizationType 限制规律：數值越小級別越高
    data: function () {
      return {
        enPath: '/',
        cnPath: '首页',
        menus: [
          {
            name: '监测管理',
            key: 'projectMap',
//            link: '/',
            icon: 'iconfont icon-shexiangtou',
            accountType: 111,
            child: [
              {
                name: '工程分布地图',
                key: 'projectMap',
                link: '/project/map',
                icon: 'iconfont icon-mn03',
                accountType: 111,
                organizationType: 111,
              },
              {
                name: '工程信息登记',
                key: 'projectList',
                link: '/project/list',
                icon: 'iconfont icon-dengji',
                accountType: 110,
                organizationType: 111,
              },
              {
                name: '监测情况查询',
                key: 'projectSituationList',
                link: '/project/situationList',
                icon: 'iconfont icon-chaxunchuangyebankaitongqingkuang',
                accountType: 111,
                organizationType: 111,
              },
              {
                name: '巡检记录登记',
                key: 'checkRecordList',
                link: '/project/checkRecord',
                icon: 'iconfont icon-jiancha1',
                accountType: 110,
                organizationType: 111,
              },
              {
                name: '人工数据导入',
                key: 'manualDataImport',
                link: '/project/manualDataImport',
                icon: 'iconfont icon-gongren',
                accountType: 0,
                organizationType: 110,
              },
            ]
          },
          {
            name: '机构管理',
            key: 'organization',
//            link: '/organization/list',
            icon: 'iconfont icon-jigou',
            accountType: 0,
          },
          {
            name: '人员管理',
            key: 'account',
//            link: '/account/list',
            icon: 'iconfont icon-staff-copy',
            accountType: 110,
          },
          {
            name: '资料管理',
            key: 'document',
//            link: '/document/list',
            icon: 'iconfont icon-ziliaoguanli',
            accountType: 111,
          },
          {
            name: '下载管理',
            key: 'report',
//            link: '/report',
            icon: 'iconfont icon-xiazaibaobiao',
            accountType: 111,
            child: [
              {
                name: '监测项目报表',
                key: 'itemReport',
                link: '/download/itemReport',
                icon: 'iconfont icon-wenjian',
                accountType: 111,
                organizationType: 111,
              },
              {
                name: '工程完整报表',
                key: 'wholeReport',
                link: '/download/wholeReport',
                icon: 'iconfont icon-duogewenjian',
                accountType: 0,
                organizationType: 110,
              },
              {
                name: '原始测量数据',
                key: 'originalData',
                link: '/download/originalData',
                icon: 'iconfont icon-shuju',
                accountType: 0,
                organizationType: 110,
              }
            ]
          },
          {
            name: '预警查询',
            key: 'alarmMessage',
//            link: '/alarmMessage',
            icon: 'iconfont icon-yujing',
            accountType: 111,
          },
          {
            name: '设备监控',
            key: 'watchdogList',
//            link: '/watchdog/projectList',
            icon: 'iconfont icon-shebei',
            accountType: 111,
          },
          // {
          //   name: '模板上传',
          //   link: '/reportTemplate/list',
          //   icon: 'iconfont icon-jigou',
          //   accountType: 0,
          // },
        ]
      };
    },
    mounted(){
      let _this = this;
      $('.treeview').click(function (e) {
        var $this = $(this);
        var $sib = $this.siblings('.treeview');
        var $children = $this.children('.a-link');
        var enPath = $children.attr('data-path');
        var cnPath = $children.text();
        $children.addClass('active');
        $sib.children('.a-link').removeClass('active');
        $sib.children('.row-child').children('.treeview').children('.child-link').removeClass('active');
        if (enPath) {
          _this.enPath = enPath;
          _this.cnPath = cnPath;
        }
        _this.$store.commit('changePath', {enPath: _this.enPath, cnPath: _this.cnPath});
      })
    }
  };
</script>
<style>
  .main-sidebar {
    position: fixed;
    -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
    -moz-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
    box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  }

  .sidebar-menu .header span {
    color: #54667a;
    font-size: 1.5em;
    font-weight: bold;
  }

  .sidebar-menu .treeview a {
    color: #54667a;
  }

  .sidebar-menu .treeview a i {
    font-size: 1.8em;
  }

  .sidebar-menu .treeview .row-link {
    padding: 18px 35px 18px 20px;
  }

  .sidebar-menu .treeview .child-link {
    padding: 14px 10px 14px 30px;
  }

  .sidebar-menu .treeview a .link-name {
    font-size: 1.2em;
  }

  .sidebar-menu .treeview > a .row-icon {
    padding-right: 10px;
  }

  .sidebar-menu .treeview > a .row-name {
    font-weight: bold;
    margin-top: -3px;
    /*-webkit-transform: translateY(5px);*/
    /*-moz-transform: translateY(5px);*/
    /*-ms-transform: translateY(5px);*/
    /*-o-transform: translateY(5px);*/
    /*transform: translateY(5px);*/
  }

  .sidebar-menu .treeview a:hover {
    color: #f44336;
  }

  .sidebar-menu .treeview .row-link.active {
    color: #ffffff;
    background-color: #f44336;
  }

  .sidebar-menu .treeview .child-link.active {
    color: #f44336;
    font-weight: bolder;
  }

  @media screen and (max-width: 768px) {
    .main-sidebar, .left-side {
      padding-top: 50px;
    }
  }
</style>
