<template>
  <div style="min-width:300px;">
    <section class="content-header">
      <navigation-path :path-key="pathKey"></navigation-path>
    </section>
    <div class="content content-overflow">
      <div class="">
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
                <li v-link-active><a v-link="{path:'/project/situationInfo/diagram'}">工程简图</a></li>
                <li v-link-active><a v-link="{path:'/project/situationInfo/history'}">历史数据</a></li>
                <li v-link-active><a v-link="{path:'/project/situationInfo/analysis'}">数据分析(趋势)</a></li>
                <li v-link-active><a v-link="{path:'/project/situationInfo/relAnalysis'}">关联分析(趋势)</a></li>
                <li v-link-active><a v-link="{path:'/project/situationInfo/realTime'}">实时数据</a></li>
              </ul>
            </div><!-- /.navbar-collapse -->
          </div><!-- /.container-fluid -->
        </nav>
      </div>
      <div>
        <router-view :info.sync="info"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      'navigation-path': require('../utility/navigation-path.vue'),
      'vue-select2': require('../utility/vue-select2.vue'),
    },
    data () {
      return {
        info: {},
        pathKey: 'projectSituationInfo',
        projectId: null,
        projectName: null,
      }
    },
    events: {
      'monitorItem': function (msg) {
        this.getFirstPointGroupOfFirstItem(msg.id);
      },
      'monitorGroupItem': function (msg) {
        this.getFirstPointOfFirstPointGroup(msg.id);
      },
      'monitorItem2': function (msg, autoReq) {
        this.getFirstPointOfSecondItem(msg.id, autoReq);
      },
    },
    attached(){
      if (!this.info) {
        this.$route.router.go({path: '/project/situationList'});
        return;
      }
      let project = window.sessionUtility.getObj(window.sessionKeys.PROJECT);
      this.projectId = project.id;
      this.projectName = project.name;
      this.getFirstMonitorItem(this.projectId);// 用来获取第一个监测项

    },
    methods: {
      getFirstMonitorItem(projectId){
        window.appContext.http.getMonitorItemPage_R(projectId).then((response) => {
          let firstOption = response.body[0];
          let secondOption = response.body[1] || firstOption;
          if (firstOption) {
            this.info.itemObj = firstOption;
            this.info.itemObj2 = secondOption;
            this.$broadcast('updateItem', this.info.itemObj);
            this.$broadcast('updateItem2', this.info.itemObj2);
            this.getFirstPointGroupOfFirstItem(firstOption.id);// 用来加载第一个点组
            this.getFirstPointOfSecondItem(secondOption.id, true);  //第二个参数控制关联分析是否自动画图
          } else {
            toastr.info('项目下没有监测项');
          }
        }, (response) => {
          toastr.error('通信失败');
        });
      },
      getFirstPointGroupOfFirstItem(itemId){
        window.appContext.http.getFirstPointGroupOfItem(itemId).then((response) => {
          let firstGroupOption = response.body;
//          console.log(firstGroupOption);
          if (firstGroupOption && firstGroupOption.length > 0) {
            this.info.pointGroupObj = firstGroupOption;
            this.getFirstPointOfFirstPointGroup(firstGroupOption.id);// 用来加载第一个点组数据
          } else {
//            toastr.info('项目下没有点组');
            this.getFirstPointOfFirstItem(itemId);// 用来加载第一个测点数据(之前的)
          }
          this.$broadcast('updatePointGroup', this.info.pointGroupObj);
        }, (response) => {
          toastr.error('通信失败');
        });
      },
      getFirstPointOfFirstPointGroup(groupId){
        window.appContext.http.getFirstPointOfGroup(groupId).then((response) => {
          let option = response.body;
//          console.log(option);
          if (option && option.length > 0) {
            this.info.pointObj = option;
//            console.log(this.info.pointObj);
          } else {
            this.info.pointObj = [];
            toastr.info('该点组下没有关联测点');
          }
          this.$broadcast('updatePoint', this.info.pointObj);
        }, (response) => {
          console.log(response);
          toastr.error('通信失败');
        });
      },
      getFirstPointOfFirstItem(itemId){
        window.appContext.http.getFirstPointOfItem(itemId).then((response) => {
          let option = response.body;
          if (option && option.length > 0) {
            this.info.pointObj = option;
          } else {
            this.info.pointObj = [];
          }
          this.$broadcast('updatePoint', this.info.pointObj);
        }, (response) => {
          toastr.error('通信失败');
        });
      },
      getFirstPointOfSecondItem(itemId, autoReq){
        window.appContext.http.getFirstPointOfItem(itemId).then((response) => {
          let option = response.body[0];
          if (option && option.id) {
            this.info.pointObj2 = option;
            this.$broadcast('updatePoint2', this.info.pointObj2, autoReq);
          } else {
            this.info.pointObj2 = {};
            this.$broadcast('updatePoint2', this.info.pointObj2, autoReq);
          }
        }, (response) => {
          toastr.error('通信失败');
        });
      },
      backToList(){
        this.$route.router.go({path: '/project/situationList'});
      }
    }
  };
</script>

<style lang="scss" scoped>
  .navbar {
    margin-bottom: 2px;
  }

  .navbar-brand {
    /*width: 30vw;*/
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #FFFFFF;
    font-weight: 700;
    cursor: pointer;
  }

  .navbar-brand > b {
    color: #ffffff;
    font-weight: 900;
  }

  .navbar-collapse {
    padding: 0;
    float: right;
  }

  .nav > li {
    position: relative;
    display: table-cell;
  }

  .v-link-active > a {
    font-size: 20px;
    color: #3c8dbc !important;
    font-weight: bolder;
  }

  @media (max-width: 768px) {
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



