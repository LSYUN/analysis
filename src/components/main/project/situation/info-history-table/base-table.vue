<template>
  <div>
    <p>you are right</p>
    <table cellpadding="0" cellspacing="0" border="0" class="display nowrap table" width="100%" id="example">
    </table>
  </div>
</template>
<script>
  import {bus} from  '../../../../../managers/utils/bus';
  export default {
    props: {
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
    data () {
      return {
        table: {},
      };
    },
    created: function () {
      bus.$on('updateTable', function (e) {
        console.log('updateTable');
        this.table.ajax.url(e).load();
      });
    },
    attached () {
      let that = this;
      this.table = $('#example').DataTable({
        scrollX: that.scrollX || true,
        scrollY: that.scrollY || '48vh',
        bScrollCollapse: true,
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
        language: this.$store.state.dataTable.language,
        ajax: {
          url: that.ajaxUrl(),
          type: that.ajaxType || 'POST',
          contentType: that.ajaxContentType || 'application/json',
          dataType: that.ajaxDataType || 'json',
          data: function (d) {
            that.searchFilter = d.search.value;
            if (that.paging) {
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
        createdRow: function (row, data, index) {
          $('td', row, index).addClass('text-center');
        },
        data: that.staticData || null,
        columns: that.columnsData(),
        columnDefs: that.columnsRender,
      });
      $('a.dt-button').css({
        'padding': '.1em .5em',
        'min-width': '45px'
      });
    },
    methods: {
      initColumnData(){
        let dataArray = [];
        for (let i = 0; i < this.columnsData.length; i++) {
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

