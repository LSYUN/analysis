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
              <th class="text-center">编号</th>
              <th class="text-center">名称</th>
              <th class="text-center">地址(箱号)</th>
              <!--<th class="text-center">通道</th>-->
              <th class="text-center">SCT类型</th>
              <th class="text-center">在线</th>
              <th class="text-center">备注</th>
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
        pathKey: 'SCTList',
        table: {},
        projectId: null,
        imcId: null,
        allChannels: [],
        onlineMCUs: [],
        status: [
          {value: 0, text: '离线'},
          {value: 1, text: '在线'}
        ],
        SCTTypes: [
          {value: 1, text: '斯比特'},
          {value: 2, text: '大铁检测'},
          {value: 3, text: '湘银河模块'},
          {value: 4, text: '南京葛南'},
          {value: 5, text: '苏州百恒'},
          {value: 6, text: '深圳地质'},
          {value: 7, text: '康耐德模块'},
        ],
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
        let component = this;
        this.table = $('#example').DataTable({
          scrollX: true,
          scrollY: '30vh',
          bScrollCollapse: true,
          showCheckbox: true,
          processing: true,
          searching: true,
          ordering: true,
          order: [[1, 'asc']],
          deferRender: true,
          ajax: {
            url: window.appContext.urls.getMcuPage(this.imcId, this.projectId),
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
          buttons: [
          ],
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
                const view = _.find(this.SCTTypes, function (type) {
                  return type.value === data;
                });
                return (!view || !view.text) ? '' : view.text;
              }.bind(this),
              targets: 4
            },
            {
              render: function (data, type, row) {
                const view = _.find(this.status, function (type) {
                  return type.value === data;
                });
//                '<div style="color:#00acd6;max-width: 200px;white-space: normal">在线(上线时间:' + time + ')</div>'
                if(view.value===1){
                  return '<div style="color:#00acd6;max-width: 200px;white-space: normal">'+view.text+'</div>';
                }else{
                 return  '<div style="color: rgba(0,0,0,0.48);">'+view.text+'</div>';
                }
                return (!view || !view.text) ? '' : view.text;
              }.bind(this),
              targets: 5
            },
          ],
          data: null,
          columns: [
            {
              data: null
            },
            {
              data: 'no'
            },
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
              data: 'status'
            },
            {
              data: 'remark'
            }
          ]
        });
      },
      mcuSelected () {
        const component = this;
        $('#example tbody ').on('click', 'tr', function () {
          let data = component.table.row(this).data();
          component.channel = _.find(component.allChannels, function (type) {
            return type.id === data.commChannelId;
          });
        })
      }
    }
  };
</script>

