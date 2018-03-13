<template>
  <div>
    <!--监测项目配置-->
    <div class="operation-header div-margin-bottom">{{operation.title}}</div>
    <div>
      <validator name="validation">
        <form role="form" novalidate>
          <div class="">
            <div class="div-margin-bottom">
              <div class="col-xs-3 col-sm-2 col-lg-1"><label for="itemName"><span class="span-necessary">*</span>推送服务名称:</label>
              </div>
              <div class="col-xs-9 col-sm-10 col-lg-11">
                <input type="text" class="form-control" v-model="itemInfo.name" id="itemName" placeholder="请设置推送服务名称"
                       v-validate:name="['required']">
                <div class="errors vue-error-bottom">
                  <p v-if="$validation.name.dirty && $validation.name.required">
                    请输入推送服务名称</p>
                </div>
              </div>
            </div>
            <div class="div-margin-bottom">
              <div class="col-xs-3 col-sm-2 col-lg-1">
                <label><span class="span-necessary">*</span>推送类型</label>
              </div>
              <div class="col-xs-9 col-sm-10 col-lg-11">
                <select class="form-control" v-model="itemInfo.receiveType" name="typeId">
                  <option value="" v-bind:selected="!itemInfo.receiveType" disabled>请选择推送类型</option>
                  <option v-for="option in typeList" :value="option.value"
                          :selected="option.value === typeId ? true : false">{{ option.text }}
                  </option>
                </select>
              </div>
            </div>
            <div class="div-margin-bottom">
              <div class="col-xs-3 col-sm-2 col-lg-1"><label for="itemRecIp"><span class="span-necessary">*</span>推送IP:</label>
              </div>
              <div class="col-xs-9 col-sm-10 col-lg-11">
                <input type="text" class="form-control" v-model="itemInfo.recIp" id="itemRecIp" placeholder="请设置推送IP"
                       v-validate:name="['required']">
                <div class="errors vue-error-bottom">
                  <p v-if="$validation.name.dirty && $validation.name.required">
                    请输入推送IP</p>
                </div>
              </div>
            </div>
            <div class="div-margin-bottom">
              <div class="col-xs-3 col-sm-2 col-lg-1"><label for="itemRecPort"><span class="span-necessary">*</span>推送端口:</label>
              </div>
              <div class="col-xs-9 col-sm-10 col-lg-11">
                <input class="form-control" type="number" v-model="itemInfo.recPort" id="itemRecPort" placeholder="选填(仅限数字)"
                       v-validate:name="['required']">
                <div class="errors vue-error-bottom">
                  <p v-if="$validation.name.dirty && $validation.name.required">
                    请输入推送端口</p>
                </div>
              </div>
            </div>
            <div class="div-margin-bottom">
              <div class="col-xs-3 col-sm-2 col-lg-1"><label for="itemApiUrl"><span class="span-necessary">*</span>推送API:</label>
              </div>
              <div class="col-xs-9 col-sm-10 col-lg-11">
                <input type="text" class="form-control" v-model="itemInfo.apiUrl" id="itemApiUrl" placeholder="必填，除去IP和端口剩下的url字符串，如：/api/test"
                       v-validate:name="['required']">
                <div class="errors vue-error-bottom">
                  <p v-if="$validation.name.dirty && $validation.name.required">
                    请输入推送API</p>
                </div>
              </div>
            </div>
            <div class="div-margin-bottom">
              <div class="col-xs-3 col-sm-2 col-lg-1"><label for="remark">&nbsp&nbsp&nbsp&nbsp备注:</label></div>
              <div class="col-xs-9 col-sm-10 col-lg-11">
                <textarea class="form-control" v-model="itemInfo.remark" id="remark"></textarea>
              </div>
            </div>
          </div>
          <div class="box-footer">
            <div class="btn-footer-wrapper">
              <button type="button" @click="confirm()" class="btn btn-info btn-foot">确定</button>
              <button type="button" @click="cancel()" class="btn btn-info btn-foot">取消</button>
            </div>
          </div>
        </form>
      </validator>
    </div>
  </div>
</template>
<script>
  export default {
    /*this.info:{itemObj pointObj},itemInfo:{post information}*/
    props: {
      info: {
        /*本页未使用*/
        type: Object,
        required: true
      },
      itemInfo: {
        type: Object,
        required: false
      }
    },
    data () {
      return {
        pathKey: 'projectEdit',
        projectId: null,
        monitorItemId: null,
        operations: {
          add: {
            title: '新增推送服务',
            pathKey: 'projectPushItemAdd',
            path: 'add',
            confirm: function (info) {
              console.log(info);
              window.mainConfig.http.pushServerIntemAdd(info).then((response) => {
                this.$router.push({path: '/project/edit/dataReceiver'});
                toastr.info('添加成功!');
              }, (response) => {
                toastr.error('通信失败');
              });
            }.bind(this)
          },
          modify: {
            title: '修改推送服务',
            pathKey: 'projectPushItemModify',
            path: 'modify',
            confirm: function (info) {
              window.mainConfig.http.pushServerItemModify(info).then((response) => {
                this.$router.push({path: '/project/edit/dataReceiver'});
                toastr.info('修改成功!');
              }, (response) => {
                toastr.error('通信失败');
              });
            }.bind(this)
          }
        },
        monitorItemTable1: {},
        typeList: [
          {value: '1', text: 'webApi'},
          {value: '2', text: 'TCP'}
        ],
        locationTypes: {
          initData: [],
          placeholder: '请选择推送类型',
          evtSelected: function (evt, data) {
            let obj = {};
            if(data && data.length>0){
              this.itemInfo.receiveType = parseInt(data[0].id);
            }
          }.bind(this),
          localData: [{id:1, text: 'webApi'},{id: 2, text: 'TCP'},]
        },
      };
    },
    computed: {
      operation () {
        let operation = _.find(this.operations, function (p) {
          return p.path === this.$route.params.operation;
        }.bind(this));
        return operation;
      }
    },
    mounted () {
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
      if (this.itemInfo.hasOwnProperty('id') === false) {
        this.itemInfo.id = uuid.v4();
        this.itemInfo.projectId = this.projectId;
        parseInt(this.itemInfo.receiveType);
//        this.itemInfo.receiveType=1;
//        this.itemInfo.sequence = this.itemInfo.sequence + 1;
      } else {
//        this.initMonitorTypeInfo(this.itemInfo);
      }
    },
    methods: {
      confirm () {
        if (this.$validation.name === false) {
          toastr.info('格式错误,请填写完整!');
          return;
        }
        this.operation.confirm(this.itemInfo);
      },
      cancel(){
        this.$router.push({path: '/project/edit/dataReceiver'});
      },
    }
  };
</script>
<style lang="scss" scoped>
  @media screen and(max-width: 768px) {
    .box-footer .btn {
      margin-bottom: 10px;
    }
  }

</style>

