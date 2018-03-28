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
  export default {
    components: {
      'vue-select2': require('../utility/vue-select2.vue'),
      'history-table': require('../utility/common-table.vue'),//应力，支撑轴力
    },
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
//        variety: 'waterLevelData',
        table: {},
        projectId: null,
        startEndDate: {},
        historyTable: {
          paging: true,
//          columnsNames: ['测点名称', '水位值(m)', '变化值(m)', '液面高度(m)', '测量时间'], //'累计变化值(m)',
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorItemData_U(this.info.itemOption.url, this.info.itemOption.mark, this.info.itemObj.id, this.info.projectId, this.info.itemOption.pointNames,
                this.info.startEndDate.startDate.dateL, this.info.startEndDate.endDate.dateL);
          }.bind(this),
          columnsData: function () {
            return this.info.tableOption;
          }.bind(this),
          columnsRender: [{
            render: function (data, type, obj, row) {
              if (typeof data === 'number') {
                return data.toFixed(this.keepDecs[row.col]);
              }else{
                return data;
              }
            }.bind(this),
            targets: '_all'
          }],
        },
      };
    },
    created: function () {
      let component = this;
      this.$on('filterTable', function (e) {
        function filterUrl() {
          return window.mainConfig.url.getMonitorItemData_U(e.url, e.mark, e.monitorItemId, e.projectId, e..pointNames,  e.startDate, e.endDate);
//          return window.mainConfig.url.getPageByMonitorItemIdAndTime(component.variety,e.monitorItemId, e.projectId, e.startDate, e.endDate);
        }

        this.$broadcast('updateTable', filterUrl());
      });
    },
    computed: {
      keepDecs(){
        let type = this.info.keepDecs;
        let decs = [];
        for (let j = 0; j < type.length; j++) {
          decs.push(type[j].keepDec);
        }
        return decs;
      }
    },
    mounted () {
    },
    methods: {}
  };
</script>

<style lang="scss" scoped>
</style>

