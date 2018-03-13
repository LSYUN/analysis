<template>
  <div>
    <section class="content content-overflow">
      <div class="box box-solid">
        <div class="box-header">
          <h3 class="box-title">工程监测</h3>
        </div>
        <div class="box-body">
          <table cellpadding="0" cellspacing="0" border="0" class="display much-column table pointer" id="example"
                 width="100%">
            <thead>
            <tr>
              <th class="text-center">工程名称</th>
              <th class="text-center">工程类别</th>
              <th class="text-center">监管单位</th>
              <th class="text-center">工程状态</th>
              <th class="text-center">备注</th>
              <th class="text-center">查看</th>
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
  import GlobalEnum from '../../../../managers/enum/global-enum';
  import * as tableConfig from "../../../../managers/configs/dataTable.js"
  export default {
    props: {
      info: {
        type: Object,
        required: true
      },
    },
    data () {
      return {
        pathKey: 'projectSituationList',
        table: {},
        account: null,
        projectTypes: GlobalEnum.projectTypes,
        workStates: GlobalEnum.workStates,
        organizationList: []
      };
    },
    components: {},
    mounted () {
      this.account = window.session.getObj(window.sessionKeys.ACCOUNT).id;
      this.organizationList = window.session.getObj(window.sessionKeys.ORGANIZATIONS);
      this.initTable();
      this.intoDetails();
    },
    methods: {
      initTable () {
        this.table = $('#example').DataTable({
          scrollX: true,
          scrollY: '75vh',
          bScrollCollapse: true,
          showCheckbox: true,
          processing: true,
//          serverSide: true,
          searching: true,
          ordering: false,
          deferRender: true,
          iDisplayLength: 10,
          lengthMenu: [[10, 15, 25, 50], [10, 15, 25, 50]],
          select: {style: 'single', selector: 'td:not(:nth-child(6))'},
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
          language: tableConfig.LANGUAGE,
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
              targets: 1
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
              targets: 2
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
              targets: 3
            },
            {
              render: function (data, type, row, meta) {
                return '<button type="button" class="btn btn-success"><i class="iconfont icon-ziliaoguanli"></i></button>';
              },
              targets: 5
            }
          ],
          data: null,
          columns: [
            {
              data: 'name'
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
            }
          ]
        });
      },
      intoDetails(){
        const component = this;
        $('#example tbody').on('click', 'td:nth-child(6)', function (p) {
          let project = component.table.row(this).data();
          window.session.setObj(window.sessionKeys.PROJECT, project);
//                        component.$router.push({path: '/project/situationinfo/diagram'});
          component.$router.push({path: '/project/situationInfo/realTime'});
        });
      },
    }
  };
</script>
<style lang="scss" scoped>

</style>
