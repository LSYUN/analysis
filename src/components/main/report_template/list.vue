<template>
  <div>
    <section class="content-header">
      <navigation-path :path-key="pathKey"></navigation-path>
    </section>
    <section class="content content-overflow">
      <div class="box box-solid">
        <div class="box-header">
          <h3 class="box-title">机构信息</h3>
          <span class="table-title-span">
            <button type="button" @click="addInfo()" class="btn table-title-button">
              <i class="iconfont icon-add"></i> 新增
            </button>
          </span>
        </div>
        <div class="box-body">
          <table cellpadding="0" cellspacing="0" border="0" class="display much-column table" id="example" width="100%">
            <thead>
            <tr>
              <th class="text-center" rowspan="2">机构名称</th>
              <th class="text-center" rowspan="2">机构地址</th>
              <th class="text-center" rowspan="2">备注</th>
              <th class="text-center" colspan="2" style="width: 180px;">操作</th>
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
      },
    },
    data () {
      return {
        pathKey: 'organization',
        table: {},
        accountId: null,
        permission: null,
        cityCode: null,
      };
    },
    mounted () {
      this.accountId = window.session.getObj(window.sessionKeys.ACCOUNT).id;
      this.permission = window.session.getObj(window.sessionKeys.PERMISSION);
      this.initTable();
      this.modifyInfo();
      this.deleteInfo();
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
//          serverSide: true,
//          dom: 'frtip',
          ajax: {
            url: window.mainConfig.url.getOrganizationsPage(),
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
          select: {style: 'single', selector: 'td:not(:nth-child(4),:nth-child(5))'},
          language: this.$store.state.dataTable.language,
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return '<button type="button" class="btn btn-info"><i class="iconfont icon-xiangxi"></i></button>';
              },
              targets: 3
            },
            {
              render: function (data, type, row) {
                return '<button type="button" class="btn btn-danger"><i class="iconfont icon-shanchu"></i></button>';
              },
              targets: 4
            },
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
        this.$router.push({path: '/organization/info/add'});
      },
      modifyInfo(){
        const component = this;
        $('#example tbody').on('click', 'td:nth-child(4)', function (p) {
          component.info = component.table.row(this).data();
          component.cityCode = component.info.cityCode;
          window.mainConfig.http.getAddressByCode(component.info.cityCode).then((response) => {
            component.info.cityList = response.data;
            component.$router.push({path: '/organization/info/modify'});
          }, (response) => {
            component.address = {};
            component.$router.push({path: '/organization/info/modify'});
            toastr.error('工程地址未能识别,请重新设置');
          });
        });
      },
      deleteInfo () {
        const component = this;
        $('#example tbody').on('click', 'td:nth-child(5)', function (p) {
          const oneId = _.map(component.table.rows(this).data(), (p) => p.id);
          layer.open({
            icon: 3,
            title: '<h4 style="color: #4898d5;font-weight: bold">删除机构</h4>',
            content: '<div style="color: #c39e00;font-size: 1.1em;">您确定删除此机构吗?</div>',
            btn: ['确定', '取消'],
            yes: function (index, layero) {
              window.mainConfig.http.organizationDelete(JSON.stringify(oneId)).then((response) => {
                component.table.ajax.reload();
                toastr.success('已删除');
              }, (response) => {
                toastr.info(response.data);
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
