<template>
  <div class="dt-wrapper" v-on:keyup.enter='submit()'>
    <form role="form">
      <div class="column is-12">
        <label class="dt-label" for="loginName">用户名</label>
        <p class="control has-icon has-icon-right">
          <input name="name" id="loginName" v-model="loginName" type="text" class="dt-input" placeholder="用户名"
                 v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('name') }">
          <i v-show="errors.has('name')" class="fa fa-warning"></i>
          <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
        </p>
      </div>
      <div class="column is-12">
        <label class="dt-label" for="password">密码</label>
        <p class="control has-icon has-icon-right">
          <input name="password" id="password" v-model="password" type="text" class="dt-input" placeholder="密码"
                 v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('password') }">
          <i v-show="errors.has('password')" class="fa fa-warning"></i>
          <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
        </p>
      </div>
      <div class="column is-12">
        <label class="dt-label" for="valCode">验证码</label>
        <img :src="imgCode">
        <p class="control has-icon has-icon-right">
          <input name="valCode" id="valCode" v-model="validateCode" v-validate="'required'" type="text" class="dt-input"
                 placeholder="Last Name" :class="{'input': true, 'is-danger': errors.has('valCode') }">
          <i v-show="errors.has('valCode')" class="fa fa-warning"></i>
          <span v-show="errors.has('valCode')" class="help is-danger">{{ errors.first('valCode') }}</span>
        </p>
      </div>
      <div>
        <button type="button" @click="submit()" class="dt">登 录</button>
      </div>
    </form>
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
        auto: '',
        loginName: 'lsy',
        password: '',
        validateCode: '',
        imgCode: '',
        serverCode: '',
        loginImg: '',
        enterprise: null
      };
    },
    created(){
    },
    mounted () {
//      this.enterprise = window.appContext.enterprise;
//      this.initParticles();
//      if (this.$route.query.hasOwnProperty('auto')) {
//        this.auto = true;
//      } else {
//        this.auto = false;
//        this.clickImgCode();
//        this.loginImg = window.appContext.enterpriseType;
//      }
    },
    methods: {
      submit () {
        console.log('ok');
        axios.get('http://jsonplaceholder.typicode.com/todos')
          .then(function (response) {
            resultElement.innerHTML = generateSuccessHTMLOutput(response);
          })
          .catch(function (error) {
            resultElement.innerHTML = generateErrorHTMLOutput(error);
          });
//        if (this.$validation.valid === false) {
//          toastr.error('请正确填写信息!');
//          return;
//        }
//        const user = {
//          account: this.loginName,
//          password: md5(this.password),
//          validateCode: this.validateCode
//        };
//        if (user.validateCode !== this.serverCode) {
//          toastr.error('验证码错误');
//          this.clickImgCode();
//          this.validateCode = '';
//          return;
//        }
//        window.appContext.http.getCode({
//          params: {account: this.loginName}
//        }).then((response) => {
//          const code = response.data.ENCRYPT_CODE;
//          user.password = md5(code + user.password);
//          window.appContext.http.login(user).then((response) => {
//            this.setSessionCache(response);
//            this.getAllOrganization();
//            this.$route.router.go({path: '/project/map'});
//          }, (response) => {
//            if (response.status === 403) {
//              toastr.error('账号或密码错误');
//            } else if (response.status === 500) {
//              toastr.error('服务器发生错误，请联系管理员!');
//            } else {
//              toastr.error('账号或密码错误');
//            }
//            this.clickImgCode();
//            this.validateCode = '';
//          });
//        }, (response) => {
//          toastr.error(JSON.stringify(response.body));
//        });
      },
      getAllOrganization(){
        window.appContext.http.getAllOrganizationPage().then((response) => {
          let account = window.sessionUtility.getObj(window.sessionKeys.ACCOUNT);
          let organizations = response.body;
          let organization = _.find(organizations, (org) => org.id === account.organizationId);
          organization.parsedRoleId = (organization && organization.id) ? this.setOrganization(organization.organizationRoleId) : 1;
          window.sessionUtility.setObj(window.sessionKeys.ORGANIZATION, organization);
          window.sessionUtility.setObj(window.sessionKeys.ORGANIZATIONS, organizations);
        }, (response) => {
          toastr.error('通信失败');
        });
      },

      clickImgCode: function () {
        window.appContext.http.getValidationCode().then((response) => {
          this.imgCode = response.data.VALIDATION_CODEIMAGE;
          this.serverCode = response.data.VALIDATION_CODE;
        }, (response) => {
          toastr.error('后台服务未开启，验证码获取失败!');
        });
      },
      setSessionCache (response){
        const account = response.data.ACCOUNT;
        const token = response.data.TOKEN;
        window.sessionUtility.set(window.sessionKeys.TOKEN, token);
        window.sessionUtility.setObj(window.sessionKeys.AUTHORIZED, true);
        account.permissionType = this.setPermission(account.roleId);
        window.sessionUtility.setObj(window.sessionKeys.ACCOUNT, account);
      },
      /***
       * 设置账号权限 0-超级管理员 1-普通用户 2-企业管理员
       * perm 的值'0'级别最高, 其余数值越大，级别越高
       * @param type
       * @returns {number}
       */
      setPermission (type) {
        let perm = 1;
        type = parseInt(type);
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
      /***
       * 设置机构的角色权限 1-基础版 2-专业版 4-高级版
       * ogr 的值的值'0'级别最高, 其余数值越大，级别越高
       * @param type
       * @returns {number}
       */
      setOrganization(type){
        let org = 1;
        type = parseInt(type);
        switch (type) {
          case 1:
            org = 1;
            break;
          case 2:
            org = 2;
            break;
          case 4:
            org = 0;
            break;
          default:
            org = 1;
            break;
        }
        return org;
      },

      initParticles: function () {
        particlesJS('particles-js',
          {
            "particles": {
              "number": {
                "value": 50,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "color": {
                "value": "#ffffff"
              },
              "shape": {
                "type": "circle",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 0.4,
                "random": false,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 5,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                  "enable": true,
                  "rotateX": 600,
                  "rotateY": 1200
                }
              }
            },
            "interactivity": {
              "detect_on": "canvas",
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "repulse"
                },
                "onclick": {
                  "enable": true,
                  "mode": "push"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 400,
                  "line_linked": {
                    "opacity": 1
                  }
                },
                "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true,
            "config_demo": {
              "hide_card": false,
              "background_color": "#b61924",
              "background_image": "",
              "background_position": "50% 50%",
              "background_repeat": "no-repeat",
              "background_size": "cover"
            }
          }
        );

      },

    }
  };
</script>

<style type="scss" scoped>
  @import "../assets/css/dt_button.scss";

  .dt-wrapper {
    text-align: center;
    position: fixed;
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(to bottom, #cccccc 0%, #333 100%);
  }

  .dt-wrapper:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }

  .dt-wrapper form {
    display: inline-block;
    vertical-align: middle;
  }

  .dt-label {
    color: #ffffff;
    font-size: 1.2em;
  }

  .dt-input {
    background-color: transparent;
  }

  .column {
    padding-bottom: 10px;
  }

  .column p {
    margin: 0;
  }

  .column p span {
    min-height: 17px;
    text-align: center;
    position: absolute;
    display: inline-block;
    float: left;
    margin-top: 0;
    font-size: 1em;
  }

  .column p input {
    color: #ffffff;
  }

  .auto-login-bg {
    background-image: url("../../static/image/loading.gif");
    background-repeat: no-repeat;
    background-position: center;
    background-color: #ffffff;
    width: 100%;
    height: 100vh;
  }

  .bgImg {
    background-repeat: no-repeat;
    background-position: center;
    background-color: #e0dfd0;
    width: 100%;
    height: 99.4%;
  }

  #particles-js {
    position: absolute;
    width: 100%;
    background-color: #2561a0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }

  .bgImg > section {
    position: absolute;
  }

  .box1 {
    min-width: 178px;
    margin-top: 18vh;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid rgba(69, 183, 214, 0.69);
    box-shadow: 0 0 100px 10px rgba(69, 183, 214, 0.69);
    border-radius: 10px;
    background-color: #ffffff;
    font-size: 16px;
  }

  .form-wrapper {
    padding: 0 100px;
    font-size: inherit;
  }

  .title-img {
    display: block;
    margin-right: auto;
    margin-left: auto;
    width: 80%;
  }

  .form-group {
    margin-bottom: 20px;
    font-size: inherit;
  }

  .input-group {
    height: 40px;
    font-size: inherit;
    color: #00aadd;
  }

  .form-control {
    font-size: 0.8em;
    color: inherit;
    font-weight: bold;
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
    border: 1px solid rgba(53, 149, 204, 0.50);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px !important;
    background-color: transparent;
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
    -moz-box-shadow: 0 0 0 1000px #ffffff inset;
    box-shadow: 0 0 0 1000px #ffffff inset;
  }

  .input-group-addon {
    /*border-color: #00aadd;*/
    font-size: 0.8em;
    border: 1px rgba(61, 155, 179, 1);
    color: #00aadd;
    font-weight: 600;
  }

  .input-group-addon > i {
    color: inherit;
    width: 1em;
    font-size: 1.2em;
  }

  .validate-img {
    width: 5em;
  }

  .validate-code {
    /*width: 13em;*/
  }

  .btn-size {
    box-sizing: border-box;
    color: #3595CC;
    font-size: 1.1em;
    font-weight: bolder;
    border: 1px #3595CC solid;
    border-radius: 5px;
    background: transparent;
    width: 100%;
    min-width: 50px;
    max-width: 120px;
    height: 100%;
    padding: 4px;
    margin: auto;
  }

  .btn-size:hover {
    color: #ffffff;
    border: 0px #3595CC solid;
    background: -moz-linear-gradient(left, red, orange, yellow, green, blue, indigo, violet);
    background: -webkit-linear-gradient(to bottom, #3595CC, #00b6e2);
    background: -ms-linear-gradient(to bottom, #3595CC, #00b6e2);
    background: -o-linear-gradient(to bottom, #3595CC, #00b6e2);
    background: linear-gradient(to bottom, #3595CC, #00b6e2);
  }

  @media (max-width: 768px) {
    .title-img {
      width: 350px;
    }

    .form-wrapper {
      padding: 0 40px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .input-group {
      height: 35px;
    }

  }

  @media (max-width: 500px) {
    .title-img {
      width: 200px;
    }
  }

</style>
