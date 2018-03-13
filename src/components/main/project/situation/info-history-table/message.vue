<template>
  <table cellpadding="0" cellspacing="0" border="0" class="display nowrap table" width="100%" id="example">
    <thead>
    <tr>
      <th class="text-center">消息体</th>
      <th class="text-center">消息级别</th>
      <th class="text-center">更新时间</th>
    </tr>
    </thead>
  </table>
</template>
<script>
  export default {
    components: {
      'vue-select2': require('../utility/vue-select2.vue'),
    },
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        variety: 'messageInfo',
        projectId: null,
        monitorItemId: null,
        table: {},
        startEndDate: {},
        levels:[
          {value:0 ,text:'默认消息'},
          {value:1 ,text:'一般消息'},
          {value:2 ,text:'跟踪消息'},
          {value:3,text:'警告消息'},
          {value:4,text:'错误消息'},
        ]
      };
    },
    created: function () {
      let component = this;
      this.$on('filterTable', function (e) {
        this.filterTableByPointAndTime(component.variety, e.projectId, [], e.startDate, e.endDate);
      });
    },
    attached () {
      this.projectId = window.sessionUtility.getObj(window.sessionKeys.PROJECT).id;
      this.monitorItemId = this.info.monitorItemId;
      let info = this.info;
      let startDate = info.startEndDate.startDate.dateL;
      let endDate = info.startEndDate.endDate.dateL;
      this.initTable(this.variety, info.projectId, startDate, endDate);
    },

    methods: {
      initTable(variety, projectId, startDate, endDate){
        this.table = $('#example').DataTable({
          scrollX: false,
          scrollY: '55vh',
          bScrollCollapse: true,
          serverSide: true,
          showCheckbox: true,
          processing: true,
          searching: false,
          ordering: false,
          deferRender: true,
          iDisplayLength: 50,
          lengthMenu: [[10, 25, 50, 100, 200, 1000, -1], [10, 25, 50, 100, 200, 1000, "All"]],
          dom: "<'row'<'col-xs-9'l><'col-xs-3'B>>" + "<'row'<'col-xs-12'tr>>" + "<'row'<'col-md-6'i><'col-md-6'p>>",
          buttons: ['excelHtml5', 'pdfHtml5'],
          language: this.$store.state.dataTable.language,
          ajax: {
            url: window.appContext.urls.getMessageByPointAndTime_U(variety, projectId, startDate, endDate),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: function (d) {
              return JSON.stringify({
                syncNo: d.draw,
                pageIndex: (d.start / d.length) + 1,
                pageSize: d.length
              });
            },
            dataFilter: function (data) {
              let json = (JSON.parse(data)), list = json.dataList;
              return JSON.stringify({
                draw: json.syncNo,
                recordsTotal: json.totalcount,
                recordsFiltered: json.totalcount,
                data: (list && list.length) > 0 ? list : [],
                error: ''
              });
            }
          },
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          data: null,
          columns: [
            {
              data: 'messageBody',
              render: function (data) {
                if (data) return "<div class='td-max-length'>" + data + "</div>";
                else return null;
              },
            },
            {
              data: 'messageLevel',
              render:function(data){
                const view =_.find(this.levels,function(type){
                  return type.value===data;
                });
                return (!view || !view.text) ? '' :view.text;
              }.bind(this),
            },
            {
              data: 'upLoadDateTime'
            }]
        });
        $('a.dt-button').css({
          'padding': '.1em .5em',
          'min-width': '45px'
        });
      },
      filterTableByPointAndTime(variety, projectId, pointNames, startDate, endDate){
        this.table.ajax.url(window.appContext.urls.getMessageByPointAndTime_U(variety, projectId, pointNames, startDate, endDate, {
          syncNo: 1, pageIndex: 1, pageSize: 50
        })).load();
      },
//      filterTableByPoint(pointName, projectId){
//        this.table.ajax.url(window.appContext.urls.getDataByPoint_U(this.variety, pointName, projectId, {
//          syncNo: 1, pageIndex: 1, pageSize: 50
//        })).load();
//      },
    }
  };
</script>

<style lang="scss" scoped>
</style>

