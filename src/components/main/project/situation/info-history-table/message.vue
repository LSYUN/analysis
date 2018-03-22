<template>
  <div>
    <table cellpadding="0" cellspacing="0" border="0" class="display nowrap table" width="100%" id="example">
      <thead>
      <tr>
        <th class="text-center">消息体</th>
        <th class="text-center">消息级别</th>
        <th class="text-center">更新时间</th>
      </tr>
      </thead>
    </table>
  </div>
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
    watch: {
      info: function () {
        this.initTable(this.info);
      }
    },
    data () {
      return {
        table: {},
        levels:[
          {value:0 ,text:'默认消息'},
          {value:1 ,text:'一般消息'},
          {value:2 ,text:'跟踪消息'},
          {value:3,text:'警告消息'},
          {value:4,text:'错误消息'},
        ]
      };
    },
    mounted(){
      this.initTable(this.info);
    },
    methods: {
      initTable(info){
        let setting = {
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
          language: tableConfig.LANGUAGE,
          ajax: {
            url: window.mainConfig.url.getMessage_U(info.projectId, info.startDate, info.endDate),
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
          createdRow: (row) => $('td', row).addClass('text-center'),
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
        };
        if (!this.table[0]) {
          this.table = $("#example").dataTable(setting);
        } else {
          this.table.fnDestroy();
          $('#example').empty();
          this.table = $('#example').dataTable(setting);
        }
        $('a.dt-button').css({
          'padding': '.1em .5em',
          'min-width': '45px'
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
</style>

