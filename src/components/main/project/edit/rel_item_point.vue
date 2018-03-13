<template>
  <div class="padding-default">
    <div class="box box-solid">
      <div class="box-body">
        <div class="form-group select2-bootstrap-prepend ">
          <div class="input-group">
            <label class="input-group-addon">监测项:</label>
            <vue-select2 :ajax=true :multiple=false :paging=false v-ref:item-selector
                         :ajax-url="monitorItems.ajaxUrl"
                         :init-data="monitorItems.initData"
                         :placeholder="monitorItems.placeholder"
                         :evt-selected="monitorItems.evtSelected">
            </vue-select2>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 min-height-fill">
        <div class="box box-solid">
          <div class="box-header">
            <h3 class="box-title">已选测点</h3>
            <!--<span class="table-title-span">-->
              <!--<button @click="itemRemovePoint()" class="btn table-title-button">移除</button>-->
            <!--</span>-->
          </div>
          <div class="box-body">
            <table id="relItemPoint" cellpadding="0" cellspacing="0" border="0" class="display nowrap table pointer">
              <thead>
              <tr>
                <th class="text-center" style="width:15px"></th>
                <th class="text-center">点名</th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 min-height-fill">
        <div class="box box-solid">
          <div class="box-body">
            <div class="box-header">
              <h3 class="box-title">待选测点</h3>
           <!--   <span class="table-title-span">
                <button @click="itemAddPoint()" class="btn table-title-button">添加</button>
              </span>-->
            </div>
            <table id="unRelItemPoint" cellpadding="0" cellspacing="0" border="0" class="display nowrap table pointer">
              <thead>
              <tr>
                <th class="text-center" style="width:15px"></th>
                <th class="text-center">点名</th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 min-height-fill">
        <div class="box box-solid">
          <div class="box-header">
            <h3 class="box-title">已选测点点组</h3>
            <span class="table-title-span">
              <button @click="itemRemovePointGroup()" class="btn table-title-button">移除</button>
            </span>
          </div>
          <div class="box-body">
            <table id="relItemPointGroup" cellpadding="0" cellspacing="0" border="0"
                   class="display nowrap table pointer">
              <thead>
              <tr>
                <th class="text-center" style="width:15px"></th>
                <th class="text-center">测点点组名称</th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 min-height-fill">
        <div class="box box-solid">
          <div class="box-header">
            <h3 class="box-title">未选测点点组</h3>
            <span class="table-title-span">
              <button @click="itemAddPointGroup()" class="btn table-title-button">添加</button>
            </span>
          </div>
          <div class="box-body">
            <table id="unRelItemPointGroup" cellpadding="0" cellspacing="0" border="0"
                   class="display nowrap table pointer">
              <thead>
              <tr>
                <th class="text-center" style="width:15px"></th>
                <th class="text-center">测点点组名称</th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      info: {
        type: Object,
        required: true
      },
      itemInfo: {
        type: Object,
        required: false
      }
    },
    data () {
      return {
        pathKey: 'projectEdit',
        projectId: null,
        monitorItemId: null,
        relItemPointTable: {},
        unRelItemPointTable: {},
        relItemPointGroupTable: {},
        notRelItemPointGroupTable: {},
        sequence: null,
        pointGroupIds: null,
        monitorItems: {
          initData: [],
          placeholder: '请选择监测项',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.monitorItemId = data[0].id;
              this.info.itemObj = data[0].obj;
              this.updateTable(this.monitorItemId);
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorItemPage_U(this.projectId);
          }.bind(this)
        }
      };
    },
    mounted () {
      this.itemInfo = {};
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
      this.initMonitorItem();
    },
    methods: {
      initMonitorItem(){
        let component = this;
        let interval = setInterval(function () {
          if (component.info.itemObj) {
            let item = component.info.itemObj;
            component.monitorItemId = item.id;
            component.$refs.itemSelector.$emit('update', [{id: item.id, text: item.name, obj: item}]);
            component.initSelectedPointTable(component.monitorItemId);
            component.initUnSelectedPointTable(component.monitorItemId);
            component.initSelectedRelItemPointGroupTable(component.monitorItemId);
            component.initUnSelectedRelItemPointGroupTable(component.monitorItemId);
            clearInterval(interval);
          }
        }, 200)
      },
      initSelectedPointTable(itemId){
        let component = this;
        this.relItemPointTable = $('#relItemPoint').DataTable({
//          retrieve: true,
          scrollX: false,
          scrollY: '30vh',
          bScrollCollapse: true,
          showCheckbox: true,
          processing: true,
          searching: true,
          ordering: false,
          deferRender: true,
          ajax: {
            url: window.mainConfig.url.getRelPointOfItems(itemId),
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            dataFilter: function (data) {
              let json = JSON.parse(data);
              component.sequence = (_.max(json, (j) => j.seq)).seq;
              return JSON.stringify({data: json});
            }
          },
          dom: "<'col-sm-7'f><'col-sm-2'B><'col-sm-12'r><'col-sm-12't><'col-sm-5'l><'col-sm-7'i><'col-sm-12'p>",
          buttons: [
            {
              text: '<i class="iconfont icon-remove dt-icon"></i> 移除', className: '', action: function (e, dt, node, config) {
              if (!component.monitorItemId) {
                toastr.warning('请选中一个测点!');
                return;
              }
              let data = component.relItemPointTable.rows({selected: true}).data();
              if (data.length <= 0) {
                toastr.warning('请选中要删除的测点!');
                return;
              }
              let pointIds = _.map(data, (p) => p.id);
              window.mainConfig.http.relItemRemovePoint(JSON.stringify(pointIds), {
                params: {
                  itemId: component.monitorItemId,
                }
              }).then((response) => {
                component.relItemPointTable.ajax.reload();
                component.unRelItemPointTable.ajax.reload();
              }, (response) => {
                toastr.info(response);
              }).bind(component);
            }
            },/* 'selectAll', 'selectNone'*/],
          language: this.$store.state.dataTable.language,
          select: {style: 'multi', selector: 'tr'},
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
          ],
          data: null,
          columns: [
            {
              data: null
            },
            {
              data: 'name'
            },
          ]
        });
      },
      initUnSelectedPointTable(itemId){
        let self = this;
        this.unRelItemPointTable = $('#unRelItemPoint').DataTable({
          retrieve: true,
          scrollX: false,
          scrollY: '30vh',
          bScrollCollapse: true,
          showCheckbox: true,
          processing: true,
          searching: true,
          ordering: false,
          deferRender: true,
//          serverSide: true,
          ajax: {
            url: window.mainConfig.url.getUnRelPointOfItems(itemId),
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
          buttons: ['selectAll', 'selectNone'],
          dom: "<'col-sm-7'f><'col-sm-2'B><'col-sm-12'r><'col-sm-12't><'col-sm-5'l><'col-sm-7'i><'col-sm-12'p>",
          buttons:[{text: '添加',className:'',action:function(e,dt,node,config){
            if(!self.monitorItemId ){
              toastr.info('请选择监测项！');
              return ;
            }
            const data = self.unRelItemPointTable.rows({selected: true}).data();
            if(data.length<=0){
              toastr.warning('请选中要添加的测点');
              return ;
            }
            let list = [];
            let pointsIds = _.map(data,(p) => p.id);
            for(let i in pointsIds){
              let info = {};
              info.id = uuid.v4();
              info.monitorItemId =self.monitorItemId ;
              info.monitorPointId  = pointsIds[i];
              info.seq = self.sequence +1;
              list.push(info);
            }
            window.mainConfig.http.relItemAddPoint(list).then((response) => {
              self.relItemPointTable.ajax.reload();
              self.unRelItemPointTable.ajax.reload();
              toastr.info('成功添加测点!');
            },(response) =>{
              toastr.info(response);
            }).bind(self);
          }}],
          language: this.$store.state.dataTable.language,
          select: {style: 'multi', selector: 'tr'},
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
//                        {
//                            data: null
//                        }
          ]
        });
      },
      initSelectedRelItemPointGroupTable(itemId){
        this.relItemPointGroupTable = $('#relItemPointGroup').DataTable({
          retrieve: true,
          scrollX: false,
          scrollY: '30vh',
          bScrollCollapse: true,
          showCheckbox: true,
          processing: true,
          searching: false,
          ordering: false,
          deferRender: true,
//          serverSide: true,
          ajax: {
            url: window.mainConfig.url.getRelItemPointGroup(itemId),
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
          buttons: ['selectAll', 'selectNone'],
          dom: "<'col-sm-12'r><'col-sm-12't><'col-sm-5'l><'col-sm-7'i><'col-sm-12'p>",
          language: this.$store.state.dataTable.language,
          select: {style: 'multi', selector: 'tr'},
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
          ]
        });
      },
      initUnSelectedRelItemPointGroupTable(itemId){
        this.unRelItemPointGroupTable = $('#unRelItemPointGroup').DataTable({
          retrieve: true,
          scrollX: false,
          scrollY: '30vh',
          bScrollCollapse: true,
          showCheckbox: true,
          processing: true,
          searching: false,
          ordering: false,
          deferRender: true,
//          serverSide: true,
          ajax: {
            url: window.mainConfig.url.getNotRelItemPointGroup(itemId),
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
          buttons: ['selectAll', 'selectNone'],
          dom: "<'col-sm-12'r><'col-sm-12't><'col-sm-5'l><'col-sm-7'i><'col-sm-12'p>",
          language: this.$store.state.dataTable.language,
          select: {style: 'multi', selector: 'tr'},
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
          ]
        });
      },
      updateTable(monitorItemId){
        this.relItemPointTable.ajax.url(window.mainConfig.url.getRelPointOfItems(monitorItemId)).load();
        this.unRelItemPointTable.ajax.url(window.mainConfig.url.getUnRelPointOfItems(monitorItemId)).load();
        this.relItemPointGroupTable.ajax.url(window.mainConfig.url.getRelItemPointGroup(monitorItemId)).load();
        this.unRelItemPointGroupTable.ajax.url(window.mainConfig.url.getNotRelItemPointGroup(monitorItemId)).load();
      },
      itemAddPoint(){
        if (!this.monitorItemId) {
          toastr.warning('请选择监测项!');
          return;
        }
        const selectedNum = this.unRelItemPointTable.rows({selected: true}).data().length;
        if (selectedNum < 1) {
          toastr.warning('请选中要添加的测点!');
          return;
        }
        let list = [];
        let pointIds = _.map(this.unRelItemPointTable.rows({selected: true}).data(), (p) => p.id);
        for (let i in pointIds) {
          let info = {};
          info.id = uuid.v4();
          info.monitorItemId = this.monitorItemId;
          info.monitorPointId = pointIds[i];
          info.seq = this.sequence + 1;
          list.push(info);
        }
        window.mainConfig.http.relItemAddPoint(list).then((response) => {
          this.relItemPointTable.ajax.reload();
          this.unRelItemPointTable.ajax.reload();
//                    toastr.info('成功添加测点!');
        }, (response) => {
          toastr.info(response);
        })
      },
      itemRemovePoint(){
        if (!this.monitorItemId) {
          toastr.warning('请选中一个测点!');
          return;
        }
        const selectedNum = this.relItemPointTable.rows({selected: true}).data().length;
        if (selectedNum < 1) {
          toastr.warning('请选中要删除的测点!');
          return;
        }
        let pointIds = _.map(this.relItemPointTable.rows({selected: true}).data(), (p) => p.id);
        window.mainConfig.http.relItemRemovePoint(JSON.stringify(pointIds), {
          params: {
            itemId: this.monitorItemId,
          }
        }).then((response) => {
          this.relItemPointTable.ajax.reload();
          this.unRelItemPointTable.ajax.reload();
        }, (response) => {
          toastr.info(response);
        })
      },

      itemAddPointGroup(){
        if (!this.monitorItemId) {
          toastr.warning('请选择监测项!');
          return;
        }
        const selectedNum = this.unRelItemPointGroupTable.rows({selected: true}).data().length;
        if (selectedNum < 1) {
          toastr.warning('请选中要添加的测点点组!');
          return;
        }
        let list = [];
        let pointGroupIds = _.map(this.unRelItemPointGroupTable.rows({selected: true}).data(), (p) => p.id);
        // console.log(pointGroupIds);
        for (let i in pointGroupIds) {
          let info = {};
          info.id = uuid.v4();
          info.monitorItemId = this.monitorItemId;
          info.monitorPointGroupId = pointGroupIds[i];
          list.push(info)
//          console.log(pointGroupIds);
        }
        window.mainConfig.http.relItemPointGroupAdd(list).then((response) => {
          this.relItemPointGroupTable.ajax.reload();
          this.unRelItemPointGroupTable.ajax.reload();
//                    toastr.info('成功添加测点!');
        }, (response) => {
          toastr.info(response);
        })
      },
      itemRemovePointGroup(){
        if (!this.monitorItemId) {
          toastr.warning('请选中一个监测项!');
          return;
        }
        const selectedNum = this.relItemPointGroupTable.rows({selected: true}).data().length;
        if (selectedNum < 1) {
          toastr.warning('请选中要删除的测点点组!');
          return;
        }
        let pointGroupIds = _.map(this.relItemPointGroupTable.rows({selected: true}).data(), (p) => p.id);
        window.mainConfig.http.relItemPointGroupDelete(JSON.stringify(pointGroupIds), {
          params: {
            itemId: this.monitorItemId,
          }
        }).then((response) => {
          this.relItemPointGroupTable.ajax.reload();
          this.unRelItemPointGroupTable.ajax.reload();
        }, (response) => {
          toastr.info(response);
        })
      },
    }
  };
</script>
<style lang="scss" scoped>
  @media screen and(max-width: 768px) {
    .add-remove-button {
      padding: 10px;
    }
  }

  .min-height-fill {
    min-height: inherit;
  }

</style>

