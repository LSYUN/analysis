<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <navigation-path :path-key="pathKey"></navigation-path>
    </section>
    <section class="content content-overflow">
      <div class="box box-solid">
        <div class="box-header">
          <h3 class="box-title">工程信息</h3>
          <span class="table-title-span">
            <button type="button" @click="addInfo()" class="btn table-title-button">
              <i class="iconfont icon-add"></i> 新增
            </button>
          </span>
        </div>
        <div class="box-body">
          <table cellpadding="0" cellspacing="0" border="0" class="display muchColumn table pointer max-width"
                 id="example" width="100%">
            <thead>
            <tr>
              <th class="text-center" rowspan="2">工程名称</th>
              <th class="text-center" rowspan="2">工程地址</th>
              <th class="text-center" rowspan="2">工程类别</th>
              <th class="text-center" rowspan="2">监管单位</th>
              <th class="text-center" rowspan="2">工程状态</th>
              <th class="text-center" rowspan="2">备注</th>
              <th class="text-center" colspan="3">操作</th>
            </tr>
            <tr>
              <th class="secondHead">详细</th>
              <th class="secondHead">编辑</th>
              <th class="secondHead">删除</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import GlobalEnum from '../../manager/enum/global-enum';
  export default {
    props: {
      info: {
        type: Object,
        required: true
      },
    },
    data () {
      return {
        pathKey: 'projectList',
        table: {},
        account: null,
        projectTypes: GlobalEnum.projectTypes,
        workStates: GlobalEnum.workStates,
        organizationList: [],
      };
    },
    components: {
      'navigation-path': require('../utility/navigation-path.vue'),
    },
    mounted () {
      let ACCOUNT = window.sessionUtility.getObj(window.sessionKeys.ACCOUNT);
      if (ACCOUNT) {
        this.account = ACCOUNT.id;
        this.initTable();
        this.modifyInfo();
        this.deleteInfo();
        this.editInfo();
        this.organizationList = window.sessionUtility.getObj(window.sessionKeys.ORGANIZATIONS);
        if (this.organizationList === null || !this.organizationList) {
          this.$route.router.go({path: '/login'});
        }
      } else {
        this.$route.router.go({path: '/login'});
      }
    },
    methods: {
      initTable () {
        this.table = $('#example').DataTable({
          scrollX: true,
          showCheckbox: true,
          processing: true,
          searching: true,
          ordering: false,
          deferRender: true,
          iDisplayLength: 10,
          lengthMenu: [[10, 15, 25, 50], [10, 15, 25, 50]],
          ajax: {
            url: window.appContext.urls.getProjectPage_U(this.account),
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            dataFilter: function (data) {
              let json = JSON.parse(data);
              return JSON.stringify({
                data: json
              });
            }
          },
          select: {style: 'os', selector: 'td:not(:nth-child(7),:nth-child(8),:nth-child(9))'},
          language: this.$store.state.dataTable.language,
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                const view = _.find(this.projectTypes, function (type) {
                  return type.value === data;
                });
                if (!view || !view.text) {
                  return '';
                }
                return view.text;
              }.bind(this),
              targets: 2
            },
            {
              render: function (data, type, row) {
                const view = _.find(this.organizationList, function (type) {
                  return type.id === data;
                });
                if (!view || !view.name) {
                  return '';
                }
                return view.name;
              }.bind(this),
              targets: 3
            },
            {
              render: function (data, type, row) {
                const view = _.find(this.workStates, function (type) {
                  return type.value === data;
                });
                if (!view || !view.text) {
                  return '';
                }
                return view.text;
              }.bind(this),
              targets: 4
            },
            {
              render: function (data, type, row, meta) {
                return '<button type="button" class="btn btn-info"><i class="iconfont icon-xiangxi"></i></button>';
              },
              targets: 6
            },
            {
              render: function (data, type, row, meta) {
                return '<button type="button" class="btn btn-success"><i class="iconfont icon-xiugai1"></i></button>';
              },
              targets: 7
            },
            {
              render: function (data, type, row, meta) {
                return '<button type="button" class="btn btn-danger"><i class="iconfont icon-shanchu"></i></button>';
              },
              targets: 8
            }
          ],
          data: null,
          columns: [

            {
              data: 'name'
            },
            {
              data: 'address'
            },
            {
              data: 'type'
            },
            {
              data: 'organizationId'
            },
            {
              data: 'workState'
            },
            {
              data: 'remark'
            },
            {
              data: null
            },
            {
              data: null
            },
            {
              data: null
            },
          ]
        });
      },
      addInfo () {
        this.info = {};
        this.address = {};
        this.$route.router.go({path: '/project/info/add'});
      },
      modifyInfo(){
        this.renderAble = false;
        const components = this;
        $('#example tbody').on('click', 'td:nth-child(7)', function (p) {
          components.info = components.table.row(this).data();
          components.$route.router.go({path: '/project/info/modify'});
        });
      },
      editInfo(){
        const component = this;
        $('#example tbody').on('click', 'td:nth-child(8)', function (p) {
          component.info = component.table.row(this).data();
          window.sessionUtility.setObj(window.sessionKeys.PROJECT, component.info);
          component.projectId = window.sessionUtility.getObj(window.sessionKeys.PROJECT).id;
          component.$route.router.go({path: '/project/edit/itemList'});
        });
      },
      deleteInfo () {
        const component = this;
        $('#example tbody').on('click', 'td:nth-child(9)', function (p) {
          const oneId = _.map(component.table.rows(this).data(), (p) => p.id);
          layer.open({
            icon: 3,
            title: '<h4 style="color: #4898d5;font-weight: bold">删除项目</h4>',
            content: '<div style="color: #c39e00;font-size: 1.1em;">您确定删除此项目吗?</div>',
            btn: ['确定', '取消'],
            yes: function (index, layero) {
              window.appContext.http.projectDelete(JSON.stringify(oneId)).then((response) => {
                component.table.ajax.reload();
                toastr.success('已删除');
              }, (response) => {
                toastr.error('通信失败');
              });
              layer.close(index);
            },
            btn1: function (index, layero) {
              layer.close(index);
            },
          });
        })
      },
    },
  };
</script>
<style lang="scss" scoped>

  @media screen and(max-width: 768px) {
  #app .modal .modal-dialog{
    position: relative;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    -webkit-transform:translate(-50%,-50%);
    -moz-transform:translate(-50%,-50%);
  }
}
</style>
