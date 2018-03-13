<template>
  <div class="box box-solid">
    <div class="box-header">
      <h3 class="box-title">监测项</h3>
      <span class="table-title-span">
        <button type="button" @click="addInfo()" class="btn table-title-button">
          <i class="iconfont icon-add"></i> 新增
        </button>
      </span>
    </div>
    <div class="box-body">
      <table id="example" cellpadding="0" cellspacing="0" border="0" width="100%" class="display much-column hover">
        <thead>
        <tr>
          <th class="text-center" rowspan="2">监测项名称</th>
          <th class="text-center" rowspan="2">监测类型</th>
          <th class="text-center" colspan="3" style="width: 180px;">操作</th>
        </tr>
        <tr>
          <th class="secondHead">显示配置</th>
          <th class="secondHead">修改</th>
          <th class="secondHead">删除</th>
        </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
<script>
  import TableConfig from '../../../../managers/enum/tableConfig-enum';
  import GlobalEnum from '../../../../managers/enum/global-enum';
  export default {
    /*this.info:{itemObj pointObj},itemInfo:{}*/
    components: {},
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
        table: {},
        sequence: '',
        typesList: GlobalEnum.monitorTypes,
      };
    },
    mounted () {
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
      this.initTable();
      this.projectSetting();
      this.modifyInfo();
      this.deleteInfo();
    },
    methods: {
      initTable () {
        console.log('ok');
        let that = this;
        this.table = $('#example').DataTable({
          retrieve: true,
          scrollX: true,
          showCheckbox: true,
          processing: true,
//          serverSide: true,
          searching: false,
          ordering: false,
          deferRender: true,
          ajax: {
            url: window.mainConfig.url.getMonitorItemPage_U(this.projectId),
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            dataFilter: function (data) {
//              console.log(data);
              let json = JSON.parse(data);
//              console.log(json);
              if (json.length > 0) {
                that.sequence = (_.max(json, (j) => j.sequence)).sequence;
              }
              return JSON.stringify({data: json});
            }
          },
          dom: "<'col-sm-12'r><'col-sm-12't><'col-sm-2'l><'col-sm-4'i><'col-sm-6'p>",
          language: this.$store.state.dataTable.language,
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          data: null,
          columns: [
            {
              data: 'name'
            },
            {
              data: 'monitorTypeId'
            },
            {
              data: null
            }
          ],
          columnDefs: [
            {
              render: function (data, type, row) {
                const view = _.find(this.typesList, function (type) {
                  return data === type.value;
                });
                if (!view) {
                  return '';
                }
                return view.text;
              }.bind(this),
              targets: 1
            },
            {
              render: function (data, type, row) {
                return '<button type="button" class="btn btn-info"><i class="iconfont icon-xiangmupeizhi"></i></button>';
              },
              targets: 2
            },
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
          ]
        });
      },
      addInfo () {
        this.itemInfo = {};
        this.itemInfo.sequence = this.sequence;
        this.$router.push({path: '/project/edit/itemInfo/add'});
      },
      projectSetting(){
        const component = this;
        $('#example tbody').on('click', 'td:nth-child(3)', function (p) {
//          component.info.itemInfo = component.table.row(this).data();
          component.info.itemObj = component.table.row(this).data();
          window.session.setObj(window.sessionKeys.ITEMOBJ, component.info.itemObj);
          component.$router.push({path: '/project/edit/projectSet'});
        });
      },
      modifyInfo(){
        const component = this;
        $('#example tbody').on('click', 'td:nth-child(4)', function (p) {
          component.itemInfo = component.table.row(this).data();
          let typeObj = _.find(component.typesList, function (type) {
            return component.itemInfo.monitorTypeId === type.value;
          });
          (typeObj && typeObj.text) ? component.itemInfo.monitorTypeName = typeObj.text : console.log('this.typesList中该项未定义');
          component.$router.push({path: '/project/edit/itemInfo/modify'});
        });
      },
      deleteInfo(){
        const component = this;
        $('#example tbody').on('click', 'td:nth-child(5)', function (p) {
          const oneId = _.map(component.table.rows(this).data(), (p) => p.id);
          layer.open({
            icon: 3,
            title: '<h4 style="color: #4898d5;font-weight: bold">删除监测项</h4>',
            content: '<div style="color: #c39e00;font-size: 1.1em;">您确定删除此监测项吗?</div>',
            btn: ['确定', '取消'],
            yes: function (index, layero) {
              window.mainConfig.http.monitorItemDelete(JSON.stringify(oneId)).then((response) => {
                component.table.ajax.reload();
                toastr.success('已删除');
              }, (response) => {
                toastr.error('通信失败');
                console.log(response.data)
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
  @media screen and(max-width: 768px) {
    #app .modal .modal-dialog {
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
    }
  }
</style>

