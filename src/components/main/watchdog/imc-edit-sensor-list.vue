<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <navigation-path :path-key="pathKey"></navigation-path>
    </section>
    <section class="content content-overflow">
      <div class="box box-info box-solid">
        <div class="box-body">
          <table cellpadding="0" cellspacing="0" border="0" class="display nowrap table pointer" id="example"
                 width="100%">
            <thead>
            <tr>
              <th class="text-center" style="width:15px"></th>
              <th class="text-center">传感器名称</th>
              <th class="text-center">连接类型</th>
              <th class="text-center">编号(模块号)</th>
              <th class="text-center">地址(通道号)</th>
              <th class="text-center">通道或SCT名称</th>
              <th class="text-center">备注</th>
              <th class="text-center">状态</th>
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

<style lang="scss" scoped>
</style>
<script>
  export default {
    props: {
      info: {
        type: Object,
        required: true
      },
      channel: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        pathKey: 'sensorList',
        table: {},
        imcId: null,
        projectId: null,
        allChannelAndSCT: [],
        sensorStatus: [],
        linkTypes: [
          {value: 0, text: '直连'},
          {value: 1, text: 'SCT'}
        ],
        status: [
          {value: 0, text: '离线'},
          {value: 1, text: '采集正常'},
          {value: 2, text: '采集异常'}
        ]
      };
    },
    components: {
      'navigation-path': require('../../utility/navigation-path.vue')
    },
    mounted () {
      this.projectId = window.sessionUtility.getObj(window.sessionKeys.PROJECT).id;
      this.imcId = window.sessionUtility.getObj(window.sessionKeys.IMC).id;
      this.initTable();
    },
    methods: {
      initTable () {
        let self = this;
        this.table = $('#example').DataTable({
          scrollX: true,
//          scrollY: '30vh',
          scrollY: false,
          bScrollCollapse: true,
          showCheckbox: true,
          processing: true,
          searching: true,
          ordering: true,
          order: [[1, 'asc']],
          deferRender: true,
          ajax: {
            url: window.appContext.urls.getSensorCollectState(window.sessionUtility.getObj(window.sessionKeys.IMC).id, window.sessionUtility.getObj(window.sessionKeys.PROJECT).id),
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
          dom: "<'row'<'col-sm-8'B><'col-sm-4'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-6'i><'col-sm-6'p>>",
          buttons: [],
          language: this.$store.state.dataTable.language,
          select: {style: 'os', selector: 'tr'},
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return '';
              },
              className: 'select-checkbox',
              targets: 0
            },
            {
              render: function (data, type, row) {
                const view = _.find(this.linkTypes, function (type) {
                  return type.value === data;
                });
                return (!view || !view.text) ? '' : view.text;
              }.bind(this),
              targets: 2
            },
            {
              render: function (data, type, row) {
                const view = _.find(this.status, function (type) {
                  return type.value === data;
                });
                if(view.value===0){
                  return  '<div style="color: rgba(0,0,0,0.48);">'+view.text+'</div>';
                }else if(view.value===1){
                  return '<div style="color:#00acd6;max-width: 200px;white-space: normal">'+view.text+'</div>';
                }else{
                  return '<div style="color: red;">'+view.text+'</div>';
                }
                return (!view || !view.text) ? '' : view.text;
              }.bind(this),
              targets: 7
            }
          ],
          data: null,
          columns: [
            {
              data: null
            },
            {
              data: 'name'
            },
            {
              data: 'linkType'
            },
            {
              data: 'no'
            },
            {
              data: 'address'
            },
            {
              data: 'linkName'
            },
            {
              data: 'remark'
            },
            {
              data: 'status'
            }
          ]
        });
      },
      sensorSelected () {
        const self = this;
        $('#example tbody').on('click', 'tr', function () {
          let data = self.table.row(this).data();
          let channelAndSCT = _.find(self.allChannelAndSCT, function (type) {
            return type.id === data.linkId;
          });
          self.channel = channelAndSCT ? channelAndSCT : {};
        })
      },
    }
  };
</script>
