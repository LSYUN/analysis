<template>
  <section class="content-header">
    <navigation-path :path-key="pathKey"></navigation-path>
  </section>
  <div class="content content-overflow">
    <div class="panel panel-info">
      <nav class="navbar navbar-inverse" role="navigation">
        <div class="container-fluid">
          <div class="navbar-header">
            <div class="navbar-brand" @click="backToList()"><b>{{imcName}}</b></div>
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse" id="nav-collapse">
            <ul class="nav navbar-nav">
              <li v-link-active><a v-link="{path:'/watchdog/imcEdit/sctList'}">SCT</a></li>
              <li v-link-active><a v-link="{path:'/watchdog/imcEdit/sensorList'}">传感器</a></li>
            </ul>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>
      <div>
        <router-view :info.sync="info"  :channel.sync="channel"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      'navigation-path': require('../../utility/navigation-path.vue'),
    },
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        itemInfo: {},
        channel: {},
        pathKey: 'imcEdit',
        projectId: null,
        projectName: null,
        imcName: null,
      };
    },
    mounted () {
      let project = window.sessionUtility.getObj(window.sessionKeys.PROJECT);
      let imc = window.sessionUtility.getObj(window.sessionKeys.IMC);
      this.info = {}; // 清空project info
      this.projectId = project.id;
      this.projectName = project.name;
      this.imcId = imc.id;
      this.imcName = imc.name;
    },
    methods: {
      getFirstMonitorItem(projectId){
        window.appContext.http.getMonitorItemPage_R(projectId).then((response) => {
          let firstOption = response.body[0];
          if (firstOption) {
            this.info.itemObj = firstOption;
            this.getFirstMonitorPoint( firstOption.id);
          } else {
            toastr.info('目前项目下没有监测项');
          }
        }, (response) => {
          toastr.error('通信失败');
        });
      },
      getFirstMonitorPoint(itemId){
        window.appContext.http.getFirstPointOfItem(itemId).then((response) => {
          let option = response.body;
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
        this.$route.router.go({path: '/watchdog/imcList'});
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

