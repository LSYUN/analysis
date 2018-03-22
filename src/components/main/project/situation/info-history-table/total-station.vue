<template>
  <table cellpadding="0" cellspacing="0" border="0" class="display muchColumn table" width="100%" id="example">
    <thead>
    <tr>
      <th class="text-center">测点</th>
      <th class="text-center">周期</th>
      <th class="text-center">测回</th>
      <th class="text-center">E(m)</th>
      <th class="text-center">N(m)</th>
      <th class="text-center">H(m)</th>
      <th class="text-center">水平角(°)</th>
      <th class="text-center">竖直角(°)</th>
      <th class="text-center">斜距(m)</th>
      <th class="text-center">∆E(mm)</th>
      <th class="text-center">∆N(mm)</th>
      <th class="text-center">∆H(mm)</th>
      <th class="text-center">∆P(mm)</th>
      <th class="text-center">∑∆E(mm)</th>
      <th class="text-center">∑∆N(mm)</th>
      <th class="text-center">∑∆H(mm)</th>
      <th class="text-center">∑∆P(mm)</th>
      <th class="text-center">变化速率E(mm/d)</th>
      <th class="text-center">变化速率N(mm/d)</th>
      <th class="text-center">变化速率H(mm/d)</th>
      <th class="text-center">变化速率P(mm/d)</th>
      <th class="text-center">断面方位角(°)</th>
      <th class="text-center">垂直于断面本次位移(mm/d)</th>
      <th class="text-center">垂直于断面累积位移(mm/d)</th>
      <th class="text-center">垂直于断面变化速率(mm/d)</th>
      <th class="text-center">累积初始位移E(mm)</th>
      <th class="text-center">累积初始位移N(mm)</th>
      <th class="text-center">累积初始位移H(mm)</th>
      <th class="text-center">参考周期</th>
      <th class="text-center" style="min-width: 150px">时间</th>
    </tr>
    </thead>
  </table>
</template>
<script>
  import * as tableConfig from "../../../../../managers/configs/dataTable.js"
  export default {
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        variety: 'measureData',
        table: {},
        projectId: null,
        monitorItemId: null,
        startEndDate: {},
      };
    },
    watch: {
      info: function () {
        this.initTable(this.info);
      }
    },
    mounted () {
//      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
//      let info = this.info;
//      this.initTable(info.url, info.mark, info.itemId, info.projectId, info.pointNames, info.calculateType, info.pointType, info.startDate, info.endDate);
//      $('a.dt-button').css({
//        'padding': '.1em .5em',
//        'min-width': '45px'
//      });
    },
    methods: {
      initTable(info){
        let setting = {
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
            url: window.mainConfig.url.getMonitorItemData_U(info),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: function (d) {
              return JSON.stringify({
                syncNo: d.draw,
                pageIndex: (d.start / d.length) + 1,
                pageSize: 50
              });
            },
            dataFilter: function (data) {
              let json = (JSON.parse(data)), list = json.dataList;
//              console.log(list);
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
          columnDefs: [
            {
              render: function (data, type, row) {
                if (data && data !== 0) {
                  return data.toFixed(5);
                } else {
                  return data;
                }
              },
              targets: [3, 4, 5, 6, 7, 8]
            }, {
              render: function (data, type, row) {
                if (data && data !== 0) {
                  return (data * 1000).toFixed(2);
                } else {
                  return data;
                }
              },
              targets: [9, 10, 11, 12, 13, 14, 15, 16, 22, 23, 25, 26, 27]
            }, {
              render: function (data, type, row) {
                if (data && data !== 0) {
                  return data.toFixed(2);
                } else {
                  return data;
                }
              },
              targets: [17, 18, 19, 20, 24]
            }],
          data: null,
          columns: [
            {
              data: 'pointName',
            },
            {
              data: 'periodNO',
            },
            {
              data: 'measureCount',
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
              data: 'hA',
            },
            {
              data: 'vA',
            },
            {
              data: 'sD',
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
              data: 'gapPlane',
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
              data: 'accumulationPlane',
            },
            {
              data: 'rateOfChangeEast',
            },
            {
              data: 'rateOfChangeNorth',
            },
            {
              data: 'rateOfChangeHeight',
            },
            {
              data: 'rateOfChangePlane',
            },
            {
              data: 'sectionAzimuth',//断面方位角 21
            },
            {
              data: 'gapEast',//垂直于断面 本次位移 22
            },
            {
              data: 'accumulationEast',//垂直于断面累积位移 23
            },
            {
              data: 'rateOfChangeEast',//垂直于断面变化速率 24
            },
            {
              data: 'eastAccInitVal',
            },
            {
              data: 'northAccInitVal',
            },
            {
              data: 'heightAccInitVal',
            },
            {
              data: 'referencePeriods',
            },
            {
              data: 'dateTime',
            },
          ]
        };
        if (!this.table[0]) {
          this.table = $("#example").dataTable(setting);
        } else {
          this.table.fnDestroy();
          $('#example').empty();
          this.table = $('#example').dataTable(setting);
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
</style>

