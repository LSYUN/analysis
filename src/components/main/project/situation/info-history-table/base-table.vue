<template>
  <div>
    <table cellpadding="0" cellspacing="0" border="0" class="display nowrap table" width="100%" id="example"></table>
  </div>
</template>
<script>
  import * as tableConfig from "../../../../../managers/configs/dataTable.js"
  export default {
    props: {
      info: {
        type: Object,
      },
      paging: {
        type: Boolean
      },
      staticData: {//静态表格所用数据
        type: Array
      },
      columnsName: {//列名
        type: Array
      },
      columnsData: {//列数据
        type: Function
      },
      columnsRender: {//列渲染
        type: Array
      },
      ajaxUrl: {
        type: Function
      },
      onAjaxUrl: {
        type: Function
      },
      ajaxType: {
        type: String
      },
      ajaxContentType: {
        type: String
      },
      ajaxDataType: {
        type: String
      },
      scrollX: {
        type: Boolean
      },
      scrollY: {
        type: Number
      },
      printButton: {
        type: String
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
      };
    },
    methods: {
      /*初始化table*/
      initTable(info){
        if (!info.hasOwnProperty('projectId'))return;
        const _this = this;
        let option = this.getOption(info);
        let setting = {
          scrollX: _this.scrollX || true,
          scrollY: _this.scrollY || '30vh',
          bScrollCollapse: true,
          retrieve: true,
//        searching: true,
//        order: [[0, 'asc']],
//        ordering: true,
          serverSide: true,
          showCheckbox: true,
          processing: true,
          searching: false,
          ordering: false,
          deferRender: true,
          iDisplayLength: 50,
          lengthMenu: [[10, 25, 50, 100, 200, 1000], [10, 25, 50, 100, 200, 1000]],
          dom: "<'row'<'col-xs-9'l><'col-xs-3'B>>" + "<'row'<'col-xs-12'tr>>" + "<'row'<'col-md-6'i><'col-md-6'p>>",
          buttons: ['excelHtml5', 'pdfHtml5'],
          language: tableConfig.LANGUAGE,
          ajax: {
            url: option.url,
            type: option.ajaxType || 'POST',
            contentType: option.ajaxContentType || 'application/json',
            dataType: option.ajaxDataType || 'json',
            data: function (d) {
              _this.searchFilter = d.search.value;
              if (_this.paging) {
                return JSON.stringify({
                  syncNo: d.draw,
                  pageIndex: (d.start / d.length) + 1,
                  pageSize: d.length || 50,
                });
              }
            },
            dataFilter: function (data) {
              let json = JSON.parse(data);
              let list = json.dataList;
              return JSON.stringify({
                draw: json.syncNo,
                recordsTotal: json.totalcount,
                recordsFiltered: json.totalcount,
                data: (list && list.length) > 0 ? list : [],
                error: ''
              });
            }
          },
          createdRow: (row, data, index) => $('td', row).addClass('text-center'),
          data: option.data || [],
          columns: option.columns || [],
          columnDefs: option.columnDefs || []
        };
        if (!this.table[0]) {
          this.table = $("#example").dataTable(setting);
        } else {
          this.table.fnDestroy();
          $('#example').empty();
          this.table = $('#example').dataTable(setting);
        }
      },

      getOption(info){
        let url = window.mainConfig.url.getMonitorItemData_U(info);
        let columns = [];
        for (let i = 0, len = info.tableOption.length; i < len; i++) {
          let op = info.tableOption[i];
          let keep = parseInt(info.keepDecs[i].keepDec);
          columns.push({
            data: op.data,
            title: op.title,
            render: function (data, type, obj, row) {
              if (keep !== null && keep !== undefined) {
                if (typeof data === 'number') {
                  let temp = data.toFixed(keep);
                  return (Math.abs(data) <= Math.pow(10, -(keep + 1))) ? 0 : temp;
                }
              }
              return data;
            }
          })
        }
        return {url, columns};
      },

      initColumnData(){
        let dataArray = [];
        for (let i = 0, len = this.columnsData.length; i < len; i++) {
          dataArray.push({
            data: this.columnsData[i],
          });
        }
        return dataArray;
      },
      updateTable(e){
        this.table.ajax.url(e).load();
      }
    }
  };
</script>

<style lang="scss" scoped>

  @media screen and(max-width: 768px) {
    #app table.nowrap a.dt-button {
      padding: .2em .5em;
      min-width: 45px;
    }
  }
</style>

