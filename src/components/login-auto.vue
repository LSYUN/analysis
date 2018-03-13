<template>
  <div>
    <div class="bgImg"></div>
  </div>
</template>


<script>
  export default{
    computed: {
      operation () {
      }
    },
    data () {
      return {
        loginName: '',
        password: '',
        validateCode: '',
        imgCode: '',
        serverCode: '',
        loginImg: '',
        projectId: ''
      };
    },
    mounted () {
      this.login();
      window.session.set(window.sessionKeys.ACCOUNTCONFIRM, 0);
    },
    methods: {
      login() {
        let user = {}, component = this;
//        user.account = 'changsha';
//        user.password = md5('changsha');
        window.mainConfig.http.getFirstAccountRecord().then((response) => {
          let firstUser = response.data;
          user.account = firstUser.accountName;
          user.password = firstUser.password;
          window.session.set(window.sessionKeys.ACCOUNTPASSWORD, firstUser.password);
          user.validateCode = 'whatever';
          window.mainConfig.http.getCode({
            params: {account: user.account}
          }).then((response) => {
            const code = response.data.ENCRYPT_CODE;
            user.password = md5(code + user.password);
            window.mainConfig.http.login(user).then((response) => {
              this.setSessionCache(response);
              setTimeout(function () {
                component.$router.push({path: '/situation/realTime'});
              }, 2000);
            }, (response) => {
            });
          }, (response) => {
            toastr.error("通信失败");
            console.log("获取秘钥失败: " + response);
          });
        }, (response) => {
          toastr.error("获取用户失败");
          console.log(response);
        });
      },
      setSessionCache (response){
        let account = response.data.ACCOUNT;
        const token = response.data.TOKEN;
        window.session.set(window.sessionKeys.TOKEN, token);
        window.session.setObj(window.sessionKeys.AUTHORIZED, true);
        account.permissionType = this.setPermission(account.roleId);
        window.session.setObj(window.sessionKeys.ACCOUNT, account);
        this.getProject(account.id);
      },
      getProject(accountId){
        http.getProjectPage_R(accountId).then((response) => {
          let project = response.data[0];
          window.session.setObj(window.sessionKeys.PROJECT, project);
          //          component.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
        })
      },
      /***
       * 设置账号权限 0-超级管理员 1-普通用户 2-企业管理员
       * @param type
       * @returns {number}
       */
      setPermission (type) {
        type = parseInt(type);
        let perm = 1;
        switch (type) {
          case 0:
            perm = 0;
            break;
          case 1:
            perm = 1;
            break;
          case 2:
            perm = 2;
            break;
//          case 3:
//            perm = 4;
//            break;
          default:
            perm = 1;
            break;
        }
        return perm;
      },
    }
  };
</script>


<style type="scss" scoped>
  .bgImg {
    background-image: url("../../static/image/loginAuto.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-color: #127cc7;
    width: 100%;
    height: 100vh;
  }

</style>
