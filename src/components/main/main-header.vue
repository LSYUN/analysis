<template>
  <header class="main-header">
    <a href="#" class="logo" data-toggle="offcanvas">
      <span><i class="iconfont icon-cloud dt-logo-icon"></i></span>
      <span class="logo-mini"><b>A</b>nalysis</span>
      <span class="logo-lg"><b>A</b>nalysis</span>
    </a>
    <nav class="navbar navbar-static-top" role="navigation">
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown messages-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-envelope-o"></i>
              <span class="label label-success">4</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">You have 4 messages</li>
              <li>
                <ul class="menu">
                  <li>
                    <a href="#">
                      <div class="pull-left">
                        <img src="../../../static/image/users/pawandeep.jpg" class="img-circle" alt="User Image">
                      </div>
                      <h4>
                        Support Team
                        <small><i class="fa fa-clock-o"></i> 5 mins</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="footer"><a href="#">See All Messages</a></li>
            </ul>
          </li>

          <li class="dropdown notifications-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning">10</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">You have 10 notifications</li>
              <li>
                <ul class="menu">
                  <li>
                    <a href="#">
                      <i class="fa fa-users text-aqua"></i> 5 new members joined today
                    </a>
                  </li>
                </ul>
              </li>
              <li class="footer"><a href="#">View all</a></li>
            </ul>
          </li>
          <li class="dropdown tasks-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-flag-o"></i>
              <span class="label label-danger">9</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">You have 9 tasks</li>
              <li>
                <ul class="menu">
                  <li>
                    <a href="#">
                      <h3>
                        Design some buttons
                        <small class="pull-right">20%</small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar"
                             aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">20% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="footer">
                <a href="#">View all tasks</a>
              </li>
            </ul>
          </li>
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="../../../static/image/users/pawandeep.jpg" class="user-image"
                   alt="User Image">
              <span class="hidden-xs">Alexander Pierce</span>
            </a>
            <ul class="dropdown-menu">
              <li class="user-header">
                <img src="../../../static/image/users/pawandeep.jpg" class="img-circle"
                     alt="User Image">
                <p>
                  Alexander Pierce - Web Developer
                  <small>Member since Nov. 2012</small>
                </p>
              </li>
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </div>
              </li>
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" class="dropdown-toggle" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
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
        title: '',
        logoContent: null,
        subHeadline: null,
        headline: null
      };
    },
    mounted () {
      let account = window.session.getObj(window.sessionKeys.ACCOUNT);
      if (!account || !account.id) {
        this.$router.push({path: '/login'});
        return;
      }
//      this.initLogoInfo();
//      this.toggleMenu();
      this.avatar = window.mainConfig.avatar;
      this.welcomeL = window.mainConfig.welcomeL;
      this.title = window.mainConfig.title;
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
        this.$router.push({path: '/login'});
      },
      initLogoInfo(){
//        let accountId = window.session.getObj(window.sessionKeys.ACCOUNT).id;
//        window.mainConfig.http.selectOrganizationRoleIdAndLogo(accountId).then((response) => {
//          this.logoContent = response.data[0].logoContent;
//          this.subHeadline = response.data[0].subHeadline;
//          this.headline = response.data[0].headline;
//          if (this.logoContent === null & this.subHeadline === null & this.headline === null) {
//            this.logoContent = this.avatar;
//            this.subHeadline = this.welcomeL;
//            this.headline = this.title;
//          } else {
//            this.logoContent = response.data[0].logoContent;
//            this.subHeadline = response.data[0].subHeadline;
//            this.headline = response.data[0].headline;
//          }
////          console.log(this.logoContent);
////          console.log(this.subHeadline);
////          console.log(this.headline);
//        });
      },
      toggleMenu(){
        $('#toggleMenu').pushMenu({})
      }
    }
  };
</script>
<style type="scss" scoped>
  .main-header {
    width: 100%;
    position: fixed;
    /*width: calc(100% + 230px);*/
    /*margin-left: -230px;*/
    background-color: #2f323e;
  }


  .main-header .logo {
    color: #ffffff;
  }

  .main-header .logo .logo-lg {
    display: inline-block;
  }

  .main-header .navbar .sidebar-toggle {
    color: #ffffff;
  }

  .main-header .navbar .navbar-custom-menu .nav li a.dropdown-toggle {
    background-color: #2f323e;
    color: #ffffff;
  }

  .main-header .navbar .navbar-custom-menu .nav li a.dropdown-toggle:hover {
    background-color: #ffffff;
    color: #2f323e;
  }

</style>
