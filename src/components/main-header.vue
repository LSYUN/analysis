<template>
  <header class="main-header">
    <!-- Logo -->
    <a class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>欢迎</b></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">
        <div class="row">
          <div class="col-xs-3">
            <!--<img class="col-xs-6 img-circle" v-bind:src="avatar" alt="User Image">-->
            <img class="col-xs-6 img-circle" v-bind:src="logoContent" alt="User Image" >

          </div>
          <!--<div class="col-sm-9">{{welcomeL}}</div>-->
          <div class="col-sm-9">{{subHeadline}}</div>
        </div>
      </span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top width-minimun">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
      <!--<div class="navbar-custom-menu title"> 云监测分析平台</div>-->
      <div class="navbar-custom-menu title">{{headline}}</div>
      <!--<div class="navbar-custom-menu title"> 花溪区地质灾害自动化监测平台</div>-->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img v-bind:src="logoContent" class="user-image" alt="User Image">
              <span class="hidden-xs">{{loginName}}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img v-bind:src="logoContent" class="img-circle" alt="User Image">
                <p class="loginName">{{loginName}}</p>
                <p class="role">{{role}}</p>
              </li>
              <li class="user-footer">
                <div class="pull-right">
                  <button type="button" class="btn btn-info btn-block" @click=loginOut()>退出</button>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
  export default{
    data () {
      return {
        loginName: '',
        role: null,
        avatar: null,
        welcomeL: '',
        title:'',
        logoContent:null,
        subHeadline:null,
        headline:null
      };
    },
    mounted () {
      let account = window.sessionUtility.getObj(window.sessionKeys.ACCOUNT);
      this.initLogoInfo();
      this.avatar = window.appContext.avatar;
      this.welcomeL = window.appContext.welcomeL;
      this.title = window.appContext.title;
      let roleList = [
        {value: '0', text: '超级管理员'},
        {value: '1', text: '普通用户'},
        {value: '2', text: '企业管理员'}
      ];
      this.loginName = account.name;
      let roleObj = _.find(roleList, function (type) {
        return type.value === account.roleId;
      });
      this.role = roleObj ? roleObj.text : '';
    },
    methods: {
      loginOut() {
        sessionStorage.clear();
        this.$route.router.go({path: '/login'});
      },
      initLogoInfo(){
        let accountId = window.sessionUtility.getObj(window.sessionKeys.ACCOUNT).id;
        window.appContext.http.selectOrganizationRoleIdAndLogo(accountId).then((response)=>{
          this.logoContent = response.body[0].logoContent;
          this.subHeadline = response.body[0].subHeadline;
          this.headline = response.body[0].headline;
          if(this.logoContent===null&this.subHeadline===null&this.headline===null){
            this.logoContent = this.avatar;
            this.subHeadline = this.welcomeL;
            this.headline = this.title;
          }else {
            this.logoContent = response.body[0].logoContent;
            this.subHeadline = response.body[0].subHeadline;
            this.headline = response.body[0].headline;
          }
//          console.log(this.logoContent);
//          console.log(this.subHeadline);
//          console.log(this.headline);
        });
      }
    }
  };
</script>
<style scoped>
  .title {
    float: left;
    margin-left: 20px;
    line-height: 50px;
    font-size: 2em;
    font-family: inherit;
    font-weight: 900;
    color: white;
  }

  .navbar-custom-menu > .navbar-nav > li > .dropdown-menu {
    border: 1px solid #ddd;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

  .navbar-nav > .user-menu > .dropdown-menu > li.user-header {
    border: 1px solid #ddd;
    border-radius: 3px;
  }

  .navbar-nav > .user-menu > .dropdown-menu > li.user-header > p.loginName {
    font-size: 2em;
  }

  .navbar-nav > .user-menu > .dropdown-menu > li.user-header > p.role {
    font-size: 0.5em;
  }

  .img-circle {
    width: 80px;
    height: 48px;
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .width-minimun {
    min-width: 300px;
  }

  @media screen and (max-width: 768px) {
    #app .main-header .logo {
      display: none
    }
  }
</style>
