<template>
  <div class="padding-default">
    <div class="box box-solid">
      <div class="box-header">
        <h3 class="box-title">推送服务信息</h3>
        <span class="table-title-span">
            <button type="button" @click="addInfo()" class="btn table-title-button">
              <i class="iconfont icon-add"></i> 新增
            </button>
        </span>
      </div>
      <div class="box-body">
        <table id="pushServerItem" cellpadding="0" cellspacing="0" border="0" width="100%" class="display nowrap hover">
          <thead>
          <tr>
            <th class="text-center" rowspan="2">推送服务名称</th>
            <th class="text-center" rowspan="2">推送类型</th>
            <th class="text-center" rowspan="2">推送IP</th>
            <th class="text-center" rowspan="2">推送端口</th>
            <th class="text-center" rowspan="2">推送API</th>
            <th class="text-center" rowspan="2">备注</th>
            <th class="text-center" colspan="2" style="width: 180px;">操作</th>
          </tr>
          <tr>
            <th class="secondHead">修改</th>
            <th class="secondHead">删除</th>
          </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      'navigation-path': require('../utility/navigation-path.vue'),
      'vue-select2': require('../utility/vue-select2.vue')
    },
    props: {
      info: {
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
//        monitorItemId: null,
        pushServerItemTable: {},
        typeList: [
          {value: '1', text: 'webApi'},
          {value: '2', text: 'TCP'}
        ],
       /* receiveTypesList: [
          {id: '1', text: 'webApi'},
          {id: '2', text: 'TCP'}
        ],*/
        /*monitorTypesList: [
          {value: 1, text: '水位'},
          {value: 2, text: '内部位移'},
          {value: 3, text: '支撑轴力'},
          {value: 4, text: '锚索'},
          {value: 5, text: '降雨量'},
          {value: 6, text: '裂缝'},
          {value: 7, text: '表面位移(GPS)'},
          {value: 8, text: '表面位移(全站仪)'},
          {value: 9, text: '浸润线'},
          {value: 10, text: '浊度'},
          {value: 11, text: '流量'},
          {value: 12, text: '压力'},
          {value: 13, text: '应变'},
          {value: 14, text: '土壤水分'},
          {value: 15, text: '水准高程'},
          {value: 16, text: '应力'},
          {value: 17, text: '压强'},
          {value: 18, text: 'PH'},
          {value: 19, text: '内部沉降'},
          {value: 50, text: '原始数据'},
        ],*/
//        sequence: '',
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
      this.projectId = window.sessionUtility.getObj(window.sessionKeys.PROJECT).id;
      this.initTable();
      this.deletePushServer();
      this.modifyInfo();
    },
    methods: {
      initTable () {
        this.pushServerItemTable = $('#pushServerItem').DataTable({
          retrieve: true,
          scrollX: true,
          showCheckbox: true,
          processing: true,
//          serverSide: true,
          searching: false,
          ordering: false,
          deferRender: true,
          ajax: {
            url: window.appContext.urls.getDataReceiverPage(this.projectId),
//            url:'',
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
          dom: "<'col-sm-12'r><'col-sm-12't><'col-sm-2'l><'col-sm-4'i><'col-sm-6'p>",
          language: this.$store.state.dataTable.language,
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                const that = this;
                const view = _.find(that.typeList, function (type) {
                  return parseInt(type.value) === data
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
                return '<button type="button" class="btn btn-info"><i class="iconfont icon-xiangxi"></i></button>';
              },
              targets: 6
            },
            {
              render: function (data, type, row) {
                return '<button type="button" class="btn btn-danger"><i class="iconfont icon-shanchu"></i></button>';
              },
              targets: 7
            },
          ],
          data: null,
          columns: [
            {
              data: 'name'
            },
            {
              data: 'receiveType'
            },
            {
              data: 'recIp'
            },
            {
              data: 'recPort'
            },
            {
              data: 'apiUrl'
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
        this.itemInfo = {};
//        this.itemInfo.sequence = this.sequence;
        this.$route.router.go({path: '/project/edit/dataReceiverInfo/add'});
      },
      modifyInfo(){
        const component = this;
        $('#pushServerItem tbody').on('click', 'td:nth-child(7)', function (p) {
          component.itemInfo = component.pushServerItemTable.row(this).data();
          console.log(component.itemInfo);
          component.$route.router.go({path: '/project/edit/dataReceiverInfo/modify'});
        });
      },
      deletePushServer(){
        const component = this;
        $('#pushServerItem tbody').on('click', 'td:nth-child(8)', function (p) {
          let oneId = _.map(component.pushServerItemTable.rows(this).data(), (p) => p.id);
          layer.open({
            icon: 3,
            title: '<h4 style="color: #4898d5;font-weight: bold">删除推送服务</h4>',
            content: '<div style="color: #c39e00;font-size: 1.1em;">您确定删除此推送服务设置吗?</div>',
            btn: ['确定', '取消'],
            yes: function (index, layero) {
              window.appContext.http.pushServerItemDelete(JSON.stringify(oneId)).then((response) => {
                component.pushServerItemTable.ajax.reload();
                toastr.success('删除成功');
              }, (response) => {
                toastr.error('通信失败');
              });
              layer.close(index);
            },
            btn1: function (index, layero) {
              layer.close(index);
            },
          });
        });
      },
    }
  };
</script>
<style lang="scss" scoped>
</style>

