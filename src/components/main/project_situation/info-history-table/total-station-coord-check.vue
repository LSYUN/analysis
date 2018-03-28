<template>
  <table cellpadding="0" cellspacing="0" border="0" class="display nowrap table" width="100%" id="example">
    <thead>
    <tr>
      <th class="text-center">测站名称</th>
      <th class="text-center">作业名称</th>
      <th class="text-center">周期</th>
      <th class="text-center">E(m)</th>
      <th class="text-center">N(m)</th>
      <th class="text-center">H(m)</th>
      <th class="text-center">∆E(m)</th>
      <th class="text-center">∆N(m)</th>
      <th class="text-center">∆H(m)</th>
      <th class="text-center">∑∆E(m)</th>
      <th class="text-center">∑∆N(m)</th>
      <th class="text-center">∑∆H(m)</th>
      <th class="text-center">时间</th>
    </tr>
    </thead>
  </table>
</template>
<script>
  import * as tableConfig from "../../../managers/configs/dataTable.js"
  export default {
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    watch: {
      info: function () {
        this.initTable(this.info);
      }
    },
    data () {
      return {
        url: 'measureData',
        table: {},
      };
    },
    mounted () {
//      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
//      this.monitorItemId = this.info.monitorItemId;
//      this.initTable(this.projectId);
//      $('a.dt-button').css({
//        'padding': '.1em .5em',
//        'min-width': '45px'
//      });
    },

    methods: {
      initTable(info){
        this.table = $('#example').DataTable({
          scrollX: true,
          scrollY: '55vh',
          bScrollCollapse: true,
          serverSide: true,
          showCheckbox: true,
          processing: true,
          searching: false,
          ordering: false,
          deferRender: true,
          iDisplayLength: 50,
          lengthMenu: [[10, 25, 50, 100, 200, 1000, -1], [10, 25, 50, 100, 200, 1000, "所有"]],
          dom: "<'row'<'col-xs-9'l><'col-xs-3'B>>" + "<'row'<'col-xs-12'tr>>" + "<'row'<'col-md-6'i><'col-md-6'p>>",
          buttons: ['excelHtml5', 'pdfHtml5'],
          language: tableConfig.LANGUAGE,
          ajax: {
            url: window.mainConfig.url.getStationCoordCheck(info.projectId),
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
          columnDefs: [{
            render: function (data, type, row) {
              if (data && data !== 0) {
                return (data * 1000).toFixed(5);
              } else {
                return data;
              }
            },
            targets: [3, 4, 5, 6, 7, 8, 9, 10, 11]
          }],
          data: null,
          columns: [
            {
              data: 'observationName',
            },
            {
              data: 'taskName',
            },
            {
              data: 'periodNo',
            },
            {
              data: 'east',
            },
            {
              data: 'north',
            },
            {
              data: 'height',
            },
            {
              data: 'gapEast',
            },
            {
              data: 'gapNorth',
            },
            {
              data: 'gapHeight',
            },
            {
              data: 'accumulationEast',
            },
            {
              data: 'accumulationNorth',
            },
            {
              data: 'accumulationHeight',
            },
            {
              data: 'datetime',
            },
          ]
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
</style>

