<template xmlns="http://www.w3.org/1999/html">
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <navigation-path :path-key="pathKey"></navigation-path>
    </section>
    <section class="content content-overflow">
      <div class="box box-solid">
        <div class="box-header">
          <h3 class="box-title">人员信息</h3>
          <span class="table-title-span">
            <button type="button" @click="addInfo()" class="btn table-title-button">
              <i class="iconfont icon-add"></i> 新增
            </button>
          </span>
        </div>
        <div class="box-body">
          <table cellpadding="0" cellspacing="0" border="0" class="display muchColumn table" id="example" width="100%">
            <thead>
            <tr>
              <th class="text-center" rowspan="2">姓名</th>
              <th class="text-center" rowspan="2">账户名称</th>
              <th class="text-center" rowspan="2">所属机构</th>
              <th class="text-center" rowspan="2">角色</th>
              <th class="text-center" rowspan="2">职务</th>
              <th class="text-center" rowspan="2">联系电话</th>
              <th class="text-center" rowspan="2">邮箱</th>
              <th class="text-center" rowspan="2">备注</th>
              <th class="text-center" colspan="3" style="width: 180px;">操作</th>
            </tr>
            <tr>
              <th class="secondHead">详细</th>
              <th class="secondHead">删除</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
      </div>
      <div style="text-align: center;">
        <!--<p>提示语提示语提示语</p>-->
        <img v-bind:src="companyLogo" class="company-logo" alt="company Image">
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
        pathKey: 'account',
        table: {},
        accountId: null,
        organizationList: [],
        roleList: [
          {value: '0', text: '超级管理员'},
          {value: '1', text: '普通用户'},
          {value: '2', text: '企业管理员'}
        ],
        companyLogo: null
      };
    },
    components: {
      'navigation-path': require('../utility/navigation-path.vue')
    },
    mounted () {
      this.accountId = window.sessionUtility.getObj(window.sessionKeys.ACCOUNT).id;
      this.initTable();
      this.modifyInfo();
      this.deleteInfo();
      this.organizationList = window.sessionUtility.getObj(window.sessionKeys.ORGANIZATIONS);
      this.companyLogo = window.appContext.companyLogo;
    },
    methods: {
      initTable () {
        this.table = $('#example').DataTable({
          scrollX: true,
          showCheckbox: true,
          processing: true,
//          serverSide: true,
          searching: true,
          ordering: false,
          deferRender: true,
          ajax: {
            url: window.appContext.urls.getAccountOfOrganizationPage(this.accountId),
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
          select: {style: 'single', selector: 'td:not(:nth-child(9),:nth-child(10))'},
          language: this.$store.state.dataTable.language,
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          columnDefs: [
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
              targets: 2
            },
            {
              render: function (data, type, row) {
                const view = _.find(this.roleList, function (type) {
                  return type.value === data
                });
                if (!view || !view.text) {
                  return '';
                }
                return view.text;
              }.bind(this),
              targets: 3
            },
            {
              render: function (data, type, row) {
                return '<button type="button" class="btn btn-info"><i class="iconfont icon-xiangxi"></i></button>';
              },
              targets: 8
            },
            {
              render: function (data, type, row) {
                return '<button type="button" class="btn btn-danger"><i class="iconfont icon-shanchu"></i></button>';
              },
              targets: 9
            },
          ],
          data: null,
          columns: [
            {
              data: 'name'
            },
            {
              data: 'accountName'
            },
            {
              data: 'organizationId'
            },
            {
              data: 'roleId'
            },
            {
              data: 'title'
            },
            {
              data: 'phone'
            },
            {
              data: 'email'
            },
            {
              data: 'remark'
            },
            {
              data: null
            }
          ]
        });
      },
      addInfo () {
        this.info = {};
        this.$route.router.go({path: '/account/info/add'});
      },
      modifyInfo(){
        const component = this;
        $('#example tbody').on('click', 'td:nth-child(9)', function (p) {
          component.info = component.table.row(this).data();
          component.$route.router.go({path: '/account/info/modify'});
        });
      },
      deleteInfo () {
        const component = this;
        $('#example tbody').on('click', 'td:nth-child(10)', function (p) {
          const oneId = _.map(component.table.rows(this).data(), (p) => p.id);
          layer.open({
            icon: 3,
            title: '<h4 style="color: #4898d5;font-weight: bold">删除人员信息</h4>',
            content: '<div style="color: #c39e00;font-size: 1.1em;">您确定删除此人员信息吗?</div>',
            btn: ['确定', '取消'],
            yes: function (index, layero) {
              window.appContext.http.accountDelete(JSON.stringify(oneId)).then((response) => {
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
    }
  };
</script>
<style lang="scss" scoped>
</style>
