<template>
  <div class="content content-overflow">
    <div class="panel panel-info">
      <nav class="navbar navbar-inverse" role="navigation">
        <div class="container-fluid">
          <div class="navbar-header">
            <div class="navbar-brand" @click="backToList()"><b>{{projectName}}</b></div>
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse" id="nav-collapse">
            <ul class="nav navbar-nav">
              <li v-link-active><a v-link="{path:'/project/edit/itemList'}">监测项目配置</a></li>
              <li v-link-active><a v-link="{path:'/project/edit/alarm/alarmPoint'}">预警配置</a></li>
              <li v-link-active><a v-link="{path:'/project/edit/itemPoint'}">监测项关联</a></li>
              <li v-link-active><a v-link="{path:'/project/edit/pointSensor'}">传感器参数</a></li>
              <li v-link-active><a v-link="{path:'/project/edit/pointGroup'}">点组参数</a></li>
              <li v-link-active><a v-link="{path:'/project/edit/dataReceiver'}">数据推送</a></li>
              <li v-link-active><a v-link="{path:'/project/edit/necessaryPeriod'}">必要周期配置</a></li>
            </ul>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>
      <div>
        <router-view :info.sync="info" :item-info.sync="itemInfo"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    /*this.info:{itemObj pointObj},itemInfo:{}*/
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        itemInfo: {},
        pathKey: 'projectEdit',
        projectId: null,
        projectName: null,
      };
    },
    mounted () {
      let project = window.session.getObj(window.sessionKeys.PROJECT);
      this.info = {}; // 清空project info
      this.projectId = project.id;
      this.projectName = project.name;
      this.getFirstMonitorItem(this.projectId);
//      this.$router.push({path: '/project/edit/itemList'});
//      //移动端点击选择后，收起下拉菜单
//      $('.nav').click(function () {
//        $('.navbar-collapse').removeClass('in');
//      });
//      $(document).on('click',function () {
//        $('.navbar-collapse').removeClass('in');
//      })
    },
    methods: {
      getFirstMonitorItem(projectId){
        window.mainConfig.http.getMonitorItemPage_R(projectId).then((response) => {
          let firstOption = response.data[0];
          if (firstOption) {
            this.info.itemObj = firstOption;
//            this.getFirstMonitorPoint( firstOption.id);
            this.getFirstPointGroupOfFirstItem(firstOption.id);// 用来加载第一个点组
          } else {
            toastr.info('目前项目下没有监测项');
          }
        }, (response) => {
          toastr.error('通信失败');
        });
      },
     /* getFirstMonitorPoint(projectId){
        window.mainConfig.http.getFirstPointOfProject(projectId).then((response) => {
          let firstOption = response.data[0];
          if (firstOption) {
            this.info.pointObj = firstOption;
            this.$broadcast('updateItem', this.info.pointObj);
          }
        }, (response) => {
      toastr.error('通信失败');
        });
      },*/
      getFirstPointGroupOfFirstItem(itemId){
        window.mainConfig.http.getFirstPointGroupOfItem(itemId).then((response) => {
          let firstGroupOption = response.data[0];
          if (firstGroupOption) {
            this.info.pointGroupObj = firstGroupOption;
            this.getFirstPointOfFirstPointGroup(firstGroupOption.id);// 用来加载第一个点组数据
//
          } else {
//            toastr.info('项目下没有点组');
            this.getFirstMonitorPoint(itemId);// 用来加载第一个测点数据(之前的)
          }
//          this.$broadcast('updatePointGroup', this.info.pointGroupObj);
        }, (response) => {
          toastr.error('通信失败');
        });
      },
      getFirstPointOfFirstPointGroup(groupId){
//        console.log(groupId);
        window.mainConfig.http.getFirstPointOfGroup(groupId).then((response) => {
          let option = response.data;
//          console.log(option);
          if (option) {
//            let name = _.map(option, (name) => name.name);
            this.info.pointNameList = _.map(option, (name) => name.name);
            this.info.pointObj = option;
          } else {
            this.info.pointObj = {};
            toastr.info('该点组下没有关联测点');
          }
          this.$broadcast('updatePoint', this.info.pointObj);
        }, (response) => {
          console.log(response);
          toastr.error('通信失败');
        });
      },
      getFirstMonitorPoint(itemId){
        window.mainConfig.http.getFirstPointOfItem(itemId).then((response) => {
          let option = response.data;
          if (option) {
            this.info.pointObj = option;
//            this.$broadcast('updatePoint', this.info.pointObj);
          } else {
            this.info.pointObj = {};
          }
        }, (response) => {
          toastr.error('通信失败');
        });
      },
      backToList(){
        this.$router.push({path: '/project/list'});
      }
    }
  };
</script>
<style lang="scss" scoped>
  .v-link-active > a {
    font-size: 1.5em;
    color: #43b6d8 !important;
    font-weight: bolder;
  }

  .navbar {
    margin-bottom: 2px;
  }

  .navbar-brand {
    width: 30vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #FFFFFF;
    font-weight: 700;
    cursor: pointer;
  }

  .navbar-collapse {
    float: right;
  }

  .nav > li {
    position: relative;
    display: table-cell;
  }

  .navbar-brand > b {
    color: #ffffff;
    font-weight: 900;
  }

  @media (max-width: 768px) {
    .v-link-active > a {
      font-size: 1em;
      color: #43b6d8 !important;
      font-weight: bolder;
    }

    .navbar-brand {
      width: 60vw;
    }

    .navbar-collapse {
      float: none;
    }

    .nav {
      width: 100%;
      display: table;
    }

    .nav li {
      display: table-cell;
      text-align: center;
    }

    .nav > li > a {
      padding: 5px 10px;
    }
  }

</style>

