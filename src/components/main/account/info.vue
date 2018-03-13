<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <navigation-path :path-key=operation.pathKey></navigation-path>
    </section>
    <section class="content content-overflow">
      <h4 class="info-title">{{operation.title}}</h4>
      <div class="box box-solid">
        <validator name="validation">
          <form role="form" novalidate autocomplete="off">
            <div class="box-body">
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label for="nickname"><span class="span-necessary">*</span> 姓名</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <input type="text" class="form-control" v-model="info.name" id="nickname"
                         placeholder="请设置" v-validate:nickname="{required:true, maxlength:50}">
                  <div class="errors vue-error-bottom">
                    <p v-if="$validation.nickname.dirty && $validation.nickname.required">请输入姓名</p>
                    <p v-if="$validation.nickname.maxlength">最大长度为50</p>
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label><span class="span-necessary">*</span> 账户名称</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <input type="text" class="form-control accountName" v-model="info.accountName"
                         placeholder="请设置(只允许输入字母与数字)" v-validate:login-name="{required:true, maxlength:50}">
                  <div class="errors vue-error-bottom">
                    <p v-if="$validation.loginName.dirty && $validation.loginName.required">请输入账户名称</p>
                    <p v-if="$validation.loginName.maxlength">最大长度为50</p>
                  </div>
                </div>
              </div>

              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label><span class="span-necessary">*</span> 账号密码</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <input type="password" class="form-control inputPassword" v-model="info.password" autocomplete="off"
                         placeholder="请输入密码" v-validate:input-Password="{required:true, maxlength:50, minlength:6}">
                  <div class="errors vue-error-bottom">
                    <p v-if="$validation.inputPassword.dirty && $validation.inputPassword.required">请设置密码</p>
                    <p v-if="$validation.inputPassword.maxlength">最大长度为50</p>
                    <p v-if="$validation.inputPassword.dirty && $validation.inputPassword.minlength">最小长度为6</p>
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom" v-if="$validation.inputPassword.dirty">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label for="ConfirmPassword"><span class="span-necessary">*</span> 确认密码</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <input type="password" class="form-control" v-model="confirmPassword" id="ConfirmPassword"
                         placeholder="请再次输入密码">
                </div>
              </div>
              <div class="div-margin-bottom select2-bootstrap-prepend" v-if="isCreateAccount&&isSupperAccount">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label><span class="span-necessary">*</span> 所属机构</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <vue-select2
                      :ajax=true :multiple="false" :paging="false"
                      :ajax-url="organizationOptions.ajaxUrl"
                      :placeholder="organizationOptions.placeholder"
                      :evt-selected="organizationOptions.evtSelected"
                      :init-data="organizationOptions.initData"></vue-select2>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label><span class="span-necessary">*</span> 角色</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <select class="form-control placeholder" v-model="info.roleId" name="roleId" id="roleId">
                    <option value="" v-bind:selected="!info.roleId" disabled>请选择角色</option>
                    <option v-for="option in roleList" :value="option.value"
                            :selected="option.value === roleId ? true : false">{{ option.text }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label for="email"><span class="span-necessary">*</span> 邮箱</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <input type="email" class="form-control" v-model="info.email" id="email"
                         placeholder="请输入邮箱" v-validate:email="{required:ture}">
                  <div class="errors vue-error-bottom">
                    <p v-if="$validation.email.dirty && $validation.email.required">请设置邮箱</p>
                    <p v-if="$validation.email.email">邮箱格式不正确</p>
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label for="title"> &nbsp&nbsp职务</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <input type="text" class="form-control" v-model="info.title" id="title" placeholder="请输入职务">
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label for="phone"><span class="span-necessary">*</span> 手机号码</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <input type="number" class="form-control" v-model="info.phone" id="phone"
                         v-validate:phone="{required:true, maxlength:11}" placeholder="请输入联系电话,用于预警消息推送">
                  <div class="errors vue-error-bottom">
                    <span v-show="$validation.phone.dirty && $validation.phone.required">请设置手机号码</span>
                    <span v-show="$validation.phone.dirty && $validation.phone.maxlength">号码格式不正确</span>
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label>&nbsp&nbsp备注</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <textarea class="form-control" rows="3" v-model="info.remark" placeholder=""></textarea>
                </div>
              </div>
            </div>
            <div class="box-footer">
              <div class="btn-footer-wrapper">
                <button type="button" @click="confirm()" class="btn btn-info">确定</button>
                <button type="button" @click="cancel()" class="btn btn-info">取消</button>
              </div>
            </div>
          </form>
        </validator>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        accountId: null,
        account: null,
        isCreateAccount: false,
        isSupperAccount: true,
        confirmPassword: null,
        orgId: null,
        email: '',
        oldPhone: null,
        operations: {
          add: {
            title: '新增账户',
            pathKey: 'accountAdd',
            path: 'add',
            restUrl: 'accounts/add',
            confirm: function (info) {
              const data = _.clone(info);
              data.password = md5(data.password);
              var wechatInfo = {};
              wechatInfo.userid = data.phone;
              wechatInfo.name = data.name;
              wechatInfo.mobile = data.phone;
              window.mainConfig.http.accountAdd(data).then((response) => {
                let body = response.data;
                if (body.errcode !== 0) {
                  toastr.error(body.meesage);
                } else {
                  // if (body.addWechat === false) {
                  //   this.addWechaUser(wechatInfo);
                  // }
                  this.addWechaUser(wechatInfo);
                  this.$router.push({path: '/account/list'});
                  toastr.success('成功创建用户!');
                }
              }, (response) => {
                toastr.error(response.data);
              });


            }.bind(this)
          },
          modify: {
            title: '修改账户',
            pathKey: 'accountModify',
            path: 'modify',
            restUrl: 'accounts/modify',
            confirm: function (info) {
              const data = _.clone(info);
              if (this.$validation.inputPassword.dirty) {
                data.password = md5(data.password);
              }
              var wechatInfo = {};
              wechatInfo.userid = data.phone;
              wechatInfo.name = data.name;
              wechatInfo.mobile = data.phone;

              window.mainConfig.http.accountModify(data).then((response) => {
                let body = response.data;
                if (body.errcode !== 0) {
                  toastr.error(body.meesage);
                } else {
                  // if (body.addWechat === false) {
                  //   toastr.info("该用户手机号码发生更改，正在将该手机号码加入企业微信通讯录")
                  //   this.addWechaUser(wechatInfo);
                  // }
                  this.addWechaUser(wechatInfo);
                  this.$router.push({path: '/account/list'});
                  toastr.success('修改成功!');
                }
              }, (response) => {
                toastr.error('通信失败');
              });
            }.bind(this)
          }
        },
        roleList: [
          {value: '1', text: '普通用户'},
          {value: '2', text: '企业管理员'}
        ],
        organizationOptions: {
          initData: [],
          placeholder: '请选择所属地址',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.info.organizationId = data[0].obj.id;
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getOrganizationsPage(this.accountId);
          }.bind(this)
        }
      };
    },
    computed: {
      operation () {
        const operation = _.find(this.operations, function (p) {
          return p.path === this.$route.params.operation;
        }.bind(this));
        return operation;
      }
    },
    mounted () {
      this.account = window.session.getObj(window.sessionKeys.ACCOUNT);
      this.accountId = this.account.id;
      this.orgId = this.account.organizationId;
//      Vue.validator('email', function (val) {
//        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
//      })
      if (this.account.roleId !== "0")
        this.isSupperAccount = false;
      if (this.info.hasOwnProperty('id') === false) {
        this.info.id = uuid.v4();
        this.isCreateAccount = true;
      } else {
        this.oldPhone = this.info.phone;
      }
      $('#roleId').change(function (e) {
        $('#roleId').addClass('selectChanged');
      })
    },
    methods: {
      confirm () {
        if (this.$validation.nickname.valid === false) {
          toastr.warning('昵称不能为空');
          return;
        }
        if (this.$validation.loginName.valid === false) {
          toastr.warning('登录名不能为空');
          return;
        }
        if (this.$validation.inputPassword.valid === false) {
          toastr.warning('密码不能为空');
          return;
        }
        if ((this.$route.params.operation === 'modify' && this.$validation.inputPassword.dirty && (this.info.password !== this.confirmPassword)) ||
            (this.$route.params.operation === 'add' && (this.info.password !== this.confirmPassword))) {
          toastr.warning('密码不一致');
          return;
        }
        if (this.isSupperAccount) {
          if (!this.info.organizationId) {
            toastr.warning('机构不能为空');
            return;
          }
        }
        if (!this.info.roleId) {
          toastr.warning('角色不能为空');
          return;
        }
        if (this.$validation.email.valid === false) {
          toastr.warning('邮箱不能为空');
          return;
        }
        if (!this.isSupperAccount) {
          this.info.organizationId = this.orgId;
        }
        if (this.$validation.phone.valid === false) {
          toastr.warning('手机号码不能为空');
          return;
        }
        this.info.accountName = (this.info.accountName).trim();
        this.operation.confirm(this.info);
      },
      cancel(){
        this.$router.push({path: '/account/list'});
      },
      /**
       * 将用户微信号加入微信企业号
       * @param wechatInfo 微信用户实体属性说明：userid——AccountPhone；name——AccountName；mobile——AccountPhone;
       */
      addWechaUser(wechatInfo){
        let alarmMessageUrl = window.mainConfig.alarmMessageURL;
        let addWeChatUserResoureUrl = alarmMessageUrl + '/wechat/addWeChatUser';
        let sendMessageResoureUrl = alarmMessageUrl + '/wechat/sendMsg';
        this.$http.post(addWeChatUserResoureUrl, wechatInfo)
            .then((response) => {
              if (response.data.errcode == '0') {
                toastr.success("该用户微信号成功加入企业微信通讯录，扫码关注后将可随时接收平台消息推送");
                // window.mainConfig.http.WeChatAccountAdd(wechatInfo.mobile).then((response) => {
                // }, (response) => {
                // })
              } else if (response.data.errcode == '60102'|| response.data.errcode==='60104') {
                toastr.success("该用户微信号成功加入企业微信通讯录，扫码关注后将可随时接收平台消息推送");
                // window.mainConfig.http.WeChatAccountAdd(wechatInfo.mobile).then((response) => {
                // }, (response) => {
                // })
              } else {
                toastr.error('1、您的微信号关联平台的微信企业号失败,请一小时后再来点击修改你的个人信息(不用做修改)，再确认保存即可。' +
                  '2、微信企业号出错代号：'+response.data.errcode+',详情：'+response.data.meesage);
              }
            }, (response) => {
              toastr.error('1、您的微信号关联平台的微信企业号失败,请一小时后再来点击修改你的个人信息(不用做修改)，再确认保存即可。' +
                '2、微信企业号出错代号：'+response.data.errcode+',详情：'+response.data.meesage);
            }).bind(this)
      }
    }
  };
</script>
<style lang="scss" scoped>
  select {
    color: #999999;
  }

  select [disabled]:first-child {
    color: #999999;
  }

  select :not(:first-child) {
    color: #00c0f1;
  }

  .selectChanged {
    color: #00c0f1;
  }
</style>
