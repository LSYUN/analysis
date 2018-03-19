<template>
  <history-table :paging="historyTable.paging"
                 :columns-data="historyTable.columnsData"
                 :ajax-url="historyTable.ajaxUrl"
                 :columns-render="historyTable.columnsRender">
    <!--:ajax-type="historyTable.ajaxType"-->
  </history-table>
</template>
<script>
  //  import TableConfig from '../../manager/enum/tableConfig-enum';
  import historyTable from './base-table.vue'
  import * as tableConfig from "../../../../../managers/configs/dataTable.js"
  export default {
    components: {
      'history-table': historyTable,
    },
//    props: {
//      info: {
//        type: Object,
//        required: true
//      }
//    },
    data () {
      return {
//        variety: 'waterLevelData',
        table: {},
        projectId: null,
        startEndDate: {},
        historyTable: {
          paging: true,
//          searching: true,
//          ordering: true,
//          order: [[0, 'asc']],
//          searching: true,
//          ordering: true,
//          columnsNames: ['测点名称', '水位值(m)', '变化值(m)', '液面高度(m)', '测量时间'], //'累计变化值(m)',
          ajaxUrl: function () {
//            return window.mainConfig.url.getMonitorItemData_U(this.info.itemOption.url, this.info.itemOption.mark, this.info.itemObj.id, this.info.projectId, this.info.itemOption.pointNames,
//              this.info.startEndDate.startDate.dateL, this.info.startEndDate.endDate.dateL);
          }.bind(this),
          columnsData: function () {
            return this.info.tableOption;
          }.bind(this),
          columnsRender: [{
            render: function (data, type, obj, row) {
              if (typeof data === 'number') {
                let decsList = this.keepDecs;
                let decimal = parseInt(decsList[row.col]);
                let temp = data.toFixed(decimal);
                return (Math.abs(data) <= Math.pow(10, -(decimal + 1))) ? 0 : temp;
              } else {
                return data;
              }
            }.bind(this),
            targets: '_all'
          }],
        },
      };
    },
    created: function () {
//      bus.$on('filterTable', function (e) {
//        function filterUrl() {
//          return window.mainConfig.url.getMonitorItemData_U(e.url, e.mark, e.itemId, e.projectId, e.pointNames, e.startDate, e.endDate);
////          return window.mainConfig.url.getPageByMonitorItemIdAndTime(component.variety,e.monitorItemId, e.projectId, e.startDate, e.endDate);
//        }
//
//        console.log('filterTable');
//        bus.$emit('updateTable', filterUrl());
//      });
    },
    computed: {
      keepDecs(){
        let type = this.$store.state.table.keepDecs;
        let decs = [];
        for (let j = 0; j < type.length; j++) {
          decs.push(type[j].keepDec);
        }
        return decs;
      }
    },
    mounted () {
    },
    methods: {
      init(e){
        console.log(e);
        let url = window.mainConfig.url.getMonitorItemData_U(e.url, e.mark, e.itemId, e.projectId, e.pointNames, e.startDate, e.endDate);
        this.$refs.child.updateTable(url);
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>

