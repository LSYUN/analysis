<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <navigation-path :path-key=operation.pathKey></navigation-path>
    </section>
    <section class="content content-overflow">
      <div class="box box-solid">
        <validator name="validation">
          <form role="form" novalidate>
            <div class="box-body">
              <div class="form-group">
                <label for="inputName">机构名称</label>
                <input type="text" class="form-control" v-model="info.name" v-validate:login-name="['required']"
                       id="inputName" placeholder="">
                <div class="errors vue-error-bottom">
                  <p v-if="$validation.loginName.dirty && $validation.loginName.required">
                    请输入名称</p>
                </div>
              </div>
              <div class="form-group">
                <label>机构类型</label>
                <select class="form-control" v-model="info.type">
                  <option v-for="option in organizationTyps" :value="option.value"
                          :selected="option.value == info.type ? true : false"> {{ option.text }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>备注</label>
                <textarea class="form-control" rows="3" v-model="info.remark" placeholder=""></textarea>
              </div>
            </div>
            <div class="box-footer">
              <button type="button" @click="confirm()" class="btn btn-block btn-info">确定</button>
            </div>
          </form>
        </validator>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    components: {
      'navigation-path': require('../utility/navigation-path.vue')
    },
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        operations: {
          add: {
            title: '新增机构',
            pathKey: 'organizationAdd',
            path: 'add',
            confirm: function (info) {
              window.appContext.http.organizationAdd(info).then((response) => {
                this.$route.router.go({path: '/organization/list'});
                toastr.info('添加成功!');
              }, (response) => {
                toastr.error('通信失败');
              });
            }.bind(this)
          },
          modify: {
            title: '修改机构',
            pathKey: 'organizationModify',
            path: 'modify',
            confirm: function (info) {
              window.appContext.http.organizationModify(info).then((response) => {
                this.$route.router.go({path: '/organization/list'});
                toastr.info('修改成功!');
              }, (response) => {
                toastr.error('通信失败');
              });
            }.bind(this)
          }
        },
        organizationTyps: [
          {value: 0, text: '系统管理机构'},
          {value: 1, text: '业主'},
          {value: 2, text: '施工单位'}
        ]
      };
    },
    computed: {
      operation () {
        var operation = _.find(this.operations, function (p) {
          return p.path === this.$route.params.operation;
        }.bind(this));
        return operation;
      }
    },
    mounted () {
      if (this.info.hasOwnProperty('id') === false) {
        this.info.id = uuid.v4();
        this.info.type = 1;
      }
    },
    methods: {
      confirm () {
        if (this.$validation.valid === false) {
          toastr.info('格式错误!');
          return;
        }
        this.operation.confirm(this.info);
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>

