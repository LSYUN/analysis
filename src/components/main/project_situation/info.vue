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
              <router-link :to="{path:'/project/situationInfo/analysisLink'}">关联分析(趋势)</router-link>
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
  import {bus} from '../../../managers/utils/bus';
  import '../../../assets/css/pre-situation.scss';
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
        let item2 = this.$store.getters.getItemObj2 || item1;  //如果只有一个监测项, 则 itemObj2 = itemObj1
        if (item1 && item1.id) {                        //session 中已经保存了 itemObj1 与 itemObj2 情况下
          console.log('you have set MONITORITEM1');
          this.$store.dispatch('setItemObj1', item1);  //修改 store 与 session 中 monitorItem1 的值
          this.$store.dispatch('setItemObj2', item2);  //修改 store 与 session 中 monitorItem2 的值
          this.getFirstGroupOfFirstItem(item1.id);
          this.getFirstPointOfSecondItem(item2.id);
        } else {                                       //session 中没有 itemObj1 与 itemObj2
          console.log('you have NOT set MONITORITEM1');
          window.mainConfig.http.getMonitorItemPage_R(projectId).then((response) => {
            item1 = response.data[0];
            item2 = response.data[1] || item1;
            if (item1 && item1.id) {
              this.$store.dispatch('setItemObj1', item1);
              this.$store.dispatch('setItemObj2', item2);
              this.getFirstGroupOfFirstItem(item1.id);
              this.getFirstPointOfSecondItem(item2.id);
            } else {
              toastr.info('项目下没有监测项');
            }
          }, (response) => {
            toastr.error('通信失败');
          });
        }
      },
      getFirstGroupOfFirstItem(itemId){
        window.mainConfig.http.getFirstPointGroupOfItem(itemId).then((response) => {
          let option = response.data;
          if (option && option.length > 0) {
//            bus.$emit('updateGroup', option);
            console.log(option);
            this.$store.dispatch('setGroupObj', option);  //修改session
            this.getFirstPointOfFirstGroup(option.id);// 用来加载第一个点组数据  //todo:未测试
          } else {
//            toastr.info('项目下没有点组');
            this.getFirstPointOfFirstItem(itemId);// 用来加载第一个测点数据(之前的)
          }
        }, (response) => {
          toastr.error('通信失败');
        });
      },
      getFirstPointOfFirstGroup(groupId){
        window.mainConfig.http.getFirstPointOfGroup(groupId).then((response) => {
          let option = response.data;
          if (option && option.length > 0) {
            this.$store.dispatch('setPointObj1', option);  //修改session 与 store 中的pointObj[Array类型]
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
            this.$store.dispatch('setPointObj1', option);  //修改 store 与 session 中 monitorPoint1 的值
          } else {
            this.$store.dispatch('setPointObj1', []);
          }
//          bus.$emit('updatePoint1', option)
        }, (response) => {
          toastr.error('通信失败');
        });
      },
      getFirstPointOfSecondItem(itemId, autoReq){
        window.mainConfig.http.getFirstPointOfItem(itemId).then((response) => {
          let option = response.data;
          if (option && option.length && option.length > 0) {
            this.$store.dispatch('setPointObj2', option);  //修改session 与 store 中的pointObj[Array类型]
//            bus.$emit('updatePoint2', option);
          } else {
            this.$store.dispatch('setPointObj2', []);
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
    },
    destroyed(){
      window.session.remove(window.sessionKeys.MONITORITEM1);
      window.session.remove(window.sessionKeys.MONITORITEM2);
      window.session.remove(window.sessionKeys.MONITORPOINT1);
      window.session.remove(window.sessionKeys.MONITORPOINT2);
//      this.$store.dispatch('setPointObj1', []);
//      this.$store.dispatch('setPointObj2', []);
      console.log('you left');
//      console.log(window.session.getObj(window.sessionKeys.MONITORITEM1));
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



