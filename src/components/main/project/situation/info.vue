<template>
  <div class="content">
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
            <li>
              <router-link :to="{path:'/project/situationInfo/diagram'}">工程简图</router-link>
            </li>
            <li>
              <router-link :to="{path:'/project/situationInfo/history'}">历史数据</router-link>
            </li>
            <li>
              <router-link :to="{path:'/project/situationInfo/analysis'}">数据分析(趋势)</router-link>
            </li>
            <li>
              <router-link :to="{path:'/project/situationInfo/relAnalysis'}">关联分析(趋势)</router-link>
            </li>
            <li>
              <router-link :to="{path:'/project/situationInfo/realTime'}">实时数据</router-link>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import {bus} from '../../../../managers/utils/bus';
  export default {
    data () {
      return {
        info: {},
        pathKey: 'projectSituationInfo',
        projectId: null,
        projectName: null,
      }
    },
    mounted(){
      if (!this.info) {
        this.$router.push({path: '/project/situationList'});
        return;
      }
      this.active();
      let project = window.session.getObj(window.sessionKeys.PROJECT);
      this.projectId = project.id;
      this.projectName = project.name;
      this.getFirstMonitorItem(this.projectId);// 用来获取第一个监测项
    },
    methods: {
      getFirstMonitorItem(projectId){
        let item1 = this.$store.getters.getItemObj1;
        let item2 = this.$store.getters.getItemObj2;
        if (item1 && item1.id) {
          console.log('you have set MONITORITEM1');
          bus.$emit('updateItem1', item1);  //修改子组件渲染
          bus.$emit('updateItem2', item2);  //修改子组件渲染
          this.getFirstPointGroupOfFirstItem(item1.id);// 用来加载第一个点组
        } else {
          console.log('you have NOT set MONITORITEM1');
          window.mainConfig.http.getMonitorItemPage_R(projectId).then((response) => {
            let oneOption = response.data[0];
            let twoOption = response.data[1] || oneOption;
            if (oneOption && oneOption.id) {
              this.$store.dispatch('setItemObj1', oneOption);  //修改session
              this.$store.dispatch('setItemObj2', twoOption);  //修改session
              bus.$emit('updateItem1', oneOption);  //修改子组件渲染
              bus.$emit('updateItem2', twoOption);  //修改子组件渲染
              this.getFirstPointGroupOfFirstItem(oneOption.id);// 用来加载第一个点组
//            this.getFirstPointOfSecondItem(secondOption.id, true);  //第二个参数控制关联分析是否自动画图
            } else {
              toastr.info('项目下没有监测项');
            }
          }, (response) => {
            toastr.error('通信失败');
          });
        }
      },
      getFirstPointGroupOfFirstItem(itemId){
        window.mainConfig.http.getFirstPointGroupOfItem(itemId).then((response) => {
          let option = response.data;
          if (option && option.length > 0) {
            this.$store.dispatch('setGroupObj', option);  //修改session
            bus.$emit('updateGroup', option);
            this.getFirstPointOfFirstPointGroup(option.id);// 用来加载第一个点组数据
          } else {
//            toastr.info('项目下没有点组');
            this.getFirstPointOfFirstItem(itemId);// 用来加载第一个测点数据(之前的)
          }
        }, (response) => {
          toastr.error('通信失败');
        });
      },
      getFirstPointOfFirstPointGroup(groupId){
        window.mainConfig.http.getFirstPointOfGroup(groupId).then((response) => {
          let option = response.data;
          console.log(option);
          if (option && option.length > 0) {
            this.$store.dispatch('setPointObj1', option);  //修改session
            bus.$emit('updatePoint1', option);
          } else {
            toastr.info('该点组下没有关联测点');
          }
        }, (response) => {
          console.log(response);
          toastr.error('通信失败');
        });
      },
      getFirstPointOfFirstItem(itemId){
        window.mainConfig.http.getFirstPointOfItem(itemId).then((response) => {
          let option = response.data;
          if (option && option.length > 0) {
            this.$store.dispatch('setPointObj1', option);  //修改session
            bus.$emit('updatePoint1', option);
          } else {
//            this.info.pointObj = [];
          }
          bus.$emit('updatePoint1', option)
        }, (response) => {
          toastr.error('通信失败');
        });
      },
      getFirstPointOfSecondItem(itemId, autoReq){
        window.mainConfig.http.getFirstPointOfItem(itemId).then((response) => {
          let option = response.data[0];
          if (option && option.id) {
            this.$store.dispatch('setPointObj2', option);  //修改session
            bus.$emit('updatePoint2', option);
          } else {
            this.info.pointObj2 = {};
//            this.$broadcast('updatePoint2', this.info.pointObj2, autoReq);
          }
        }, (response) => {
          toastr.error('通信失败');
        });
      },
      backToList(){
        this.$router.push({path: '/project/situationList'});
      },
      active(){
        let _this = this;
        let li = $('#nav-collapse ul li');
        for (let i = 0, len = li.length; i < len; i++) {
          let $li = li[i];
          if ($($li).children('a')[0].href.indexOf(_this.$route.path) > 0) {
            $($li).addClass('active');
            break;
          }
        }
        $('#nav-collapse ul li').click(function () {
          let $this = $(this);
          let $sib = $this.siblings('li');
          $this.addClass('active');
          $sib.removeClass('active');
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .navbar {
    margin-bottom: 2px;
  }

  .navbar-inverse {
    background-color: #f45b2a;
    border-color: #f44336;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .navbar-inverse .navbar-toggle {
    margin-top: 3px;
    margin-right: 3px;
  }

  .navbar-inverse .navbar-toggle:focus, .navbar-inverse .navbar-toggle:hover {
    background-color: #f44336;
    border-color: #f45b2a;
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

  .navbar-inverse .navbar-collapse, .navbar-inverse .navbar-form {
    border-top-color: #f44336;
  }

  ul.nav {
    background-color: #f45b2a;
    margin: 0 auto;
    display: table;
    height: 100%;
  }

  ul.nav > li {
    border: 0;
    position: relative;
    display: table-cell;
    cursor: default;
    height: 100%;
  }

  ul.nav > li a {
    color: #ffffff;
    border: 0;
    font-size: 1.2em;
    font-weight: bolder;
    letter-spacing: 2px;
    font-family: "Microsoft Sans Serif";
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  ul.nav > li.active a {
    background-color: #f44336;
  }

  ul.nav > li.active a:hover {
    background-color: #f44336;
  }

  ul.nav > li a:hover {
    background-color: #f44336;
  }

  ul.nav > li.active a:visited {
    background-color: #f44336;
  }

  @media (max-width: 1024px) {
    ul.nav {
      border-top: 1px solid #f44336;
    }

    ul.nav > li a {
      font-size: 1em;
    }
  }

  @media (max-width: 850px) {
    ul.nav > li a {
      font-size: 0.90em;
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  @media (max-width: 768px) {
    .navbar-collapse {
      float: none;
    }

    ul.nav {
      height: 100%;
      border: 0;
    }

    ul.nav > li {
      height: 100%;
      vertical-align: middle;
    }

    ul.nav > li a {
      /*padding: 0 15px;*/
      height: 100%;
    }
  }
</style>



