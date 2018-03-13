<template>
  <div>
    <section class="content-header">
      <navigation-path :path-key="pathKey"></navigation-path>
    </section>
    <section class="content content-overflow">
      <div class="box box-solid">
        <div class="box-header">
          <h3 class="box-title">工程监控</h3>
         <!-- <span class="table-title-span">
            <button type="button" @click="addInfo()" class="btn table-title-button">
              <i class="iconfont icon-add"></i> 新增
            </button>
          </span>-->
        </div>
        <div class="box-body">
          <table cellpadding="0" cellspacing="0" border="0" class="display much-column table pointer max-width"
                 id="example" width="100%">
            <thead>
            <tr>
              <th class="text-center" rowspan="2">工程名称</th>
              <!--<th class="text-center" rowspan="2">工程地址</th>-->
              <!--<th class="text-center" rowspan="2">工程类别</th>-->
              <!--<th class="text-center" rowspan="2">监管单位</th>-->
              <!--<th class="text-center" rowspan="2">工程状态</th>-->
              <!--<th class="text-center" rowspan="2">备注</th>-->
              <th class="text-center" colspan="1">操作</th>
            </tr>
            <tr>
              <!--<th class="secondHead">详细</th>-->
              <th class="secondHead">查看</th>
              <!--<th class="secondHead">删除</th>-->
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
  import GlobalEnum from '../../../managers/enum/global-enum';
  export default{
//    props: {
//      info: {
//        type: Object,
//        required: true
//      },
//    },
    data () {
      return {
        pathKey: 'watchdogList',
        table: {},
        account: null,
        projectTypes: GlobalEnum.projectTypes,
        workStates: GlobalEnum.workStates,
        organizationList: [],
      };
    },
    components : {
      'navigation-path' :require('../../utility/navigation-path.vue'),
    },
    mounted () {
      let ACCOUNT = window.session.getObj(window.sessionKeys.ACCOUNT);
      if (ACCOUNT) {
        this.account = ACCOUNT.id;
        this.initTable();
        this.modifyInfo();
        this.deleteInfo();
        this.editInfo();
        this.organizationList = window.session.getObj(window.sessionKeys.ORGANIZATIONS);
        if (this.organizationList === null || !this.organizationList) {
          this.$router.push({path: '/login'});
        }
      } else {
        this.$router.push({path: '/login'});
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
            url: window.mainConfig.url.getProjectPage_U(this.account),
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
          select: {style: 'os', selector: 'td:not(:nth-child(2))'},
          language: this.$store.state.dataTable.language,
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          columnDefs: [
            {
              render: function (data, type, row, meta) {
                return '<button type="button" class="btn btn-success"><i class="iconfont icon-xiugai1"></i></button>';
              },
              targets: 1
            },
          ],
          data: null,
          columns: [

            {
              data: 'name'
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
        this.$router.push({path: '/watchdog/info/add'});
      },
      modifyInfo(){
        this.renderAble = false;
        const components = this;
        $('#example tbody').on('click', 'td:nth-child(8)', function (p) {
          components.info = components.table.row(this).data();
          components.$router.push({path: '/watchdog/info/modify'});
        });
      },
      editInfo(){
        const component = this;
        $('#example tbody').on('click', 'td:nth-child(2)', function (p) {
          component.info = component.table.row(this).data();
          window.session.setObj(window.sessionKeys.PROJECT, component.info);
          component.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
//          window.session.setObj(window.sessionKeys.IMC, component.info);
          component.$router.push({path: '/watchdog/imcList'});
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
              window.mainConfig.http.projectDelete(JSON.stringify(oneId)).then((response) => {
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
  }
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
