<template>
  <div>
    <!--监测项目配置-->
    <div class="operation-header div-margin-bottom">{{operation.title}}</div>
    <div>
      <validator name="validation">
        <form role="form" novalidate>
          <div class="">
            <div class="div-margin-bottom">
              <div class="col-xs-3 col-sm-2 col-lg-1"><label for="itemName"><span class="span-necessary">*</span>监测项名称:</label>
              </div>
              <div class="col-xs-9 col-sm-10 col-lg-11">
                <input type="text" class="form-control" v-model="itemInfo.name" id="itemName" placeholder="请设置"
                       v-validate:name="['required']">
                <div class="errors vue-error-bottom">
                  <p v-if="$validation.name.dirty && $validation.name.required">
                    请输入监测项目名称</p>
                </div>
              </div>
            </div>
            <div class="div-margin-bottom">
              <div class="col-xs-3 col-sm-2 col-lg-1"><label><span class="span-necessary">*</span> 监测类型:</label></div>
              <div class="col-xs-9 col-sm-10 col-lg-11">
                <vue-select2 :ajax=true :paging=false :multiple=false
                             :ajax-url="monitorTypes.ajaxUrl"
                             :init-data="monitorTypes.initData"
                             :placeholder="monitorTypes.placeholder"
                             :evt-selected="monitorTypes.evtSelected"></vue-select2>
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
  import TableConfig from '../../../managers/enum/tableConfig-enum';
  export default {
    /*this.info:{itemObj pointObj},itemInfo:{post information}*/
    components: {
    },
    props: {
      info: {
        /*本页未使用*/
        type: Object,
        required: true
      },
      /*  jsonInfo: {
       /!*本页未使用*!/
       type: Object,
       required: true
       },*/
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
            title: '新增监测项',
            pathKey: 'projectItemAdd',
            path: 'add',
            confirm: function (info) {
              window.mainConfig.http.monitorItemAdd(info).then((response) => {
                if (response.data.MESSAGE === 'success') {
                  this.$router.push({path: '/project/edit/itemList'});
                  toastr.info('添加成功!');
                } else {
                  toastr.error(response.data.MESSAGE);
                }
              }, (response) => {
                toastr.error('通信失败');
              });
            }.bind(this)
          },
          modify: {
            title: '修改监测项',
            pathKey: 'projectItemModify',
            path: 'modify',
            confirm: function (info) {
              window.mainConfig.http.monitorItemModify(info).then((response) => {
                if (response.data.MESSAGE === 'success') {
                  this.$router.push({path: '/project/edit/itemList'});
                  toastr.info('修改成功!');
                } else {
                  toastr.error(response.data.MESSAGE);
                }
              }, (response) => {
                toastr.error('通信失败');
              });
            }.bind(this)
          }
        },
        monitorItemTable1: {},
        monitorTypes: {
          initData: [],
          placeholder: '请选择监测类型',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.itemInfo.monitorTypeId = data[0].id;
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorTypePage();
          }.bind(this)
        }
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
        this.itemInfo.sequence = this.itemInfo.sequence + 1;
      } else {
        this.initMonitorTypeInfo(this.itemInfo);
      }
    },
    methods: {
      confirm () {
        if (this.$validation.name === false) {
          toastr.info('格式错误,请填写完整!');
          return;
        }
        if (!this.itemInfo.monitorTypeId) {
          toastr.error('请选择监测类型');
          return;
        }
        let obj = {};
        obj.id = this.itemInfo.id;
        obj.name = this.itemInfo.name;
        obj.sequence = this.itemInfo.sequence;
        obj.monitorTypeId = this.itemInfo.monitorTypeId;
        obj.projectId = this.itemInfo.projectId;
        obj.remark = this.itemInfo.remark;
        obj.json = JSON.stringify(TableConfig.getTableConfig(parseInt(obj.monitorTypeId)));
        this.operation.confirm(obj);
      },
      cancel(){
        this.$router.push({path: '/project/edit/itemList'});
      },
      initMonitorTypeInfo(info){
        if (info.monitorTypeName) {
          let monitorType = info;
          if (monitorType.monitorTypeName) {
            this.monitorTypes.initData.push({
              id: monitorType.monitorTypeId,
              text: monitorType.monitorTypeName,
              obj: monitorType
            })
          }
        } else {
        }
      }
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

