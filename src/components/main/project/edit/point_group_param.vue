<template>
  <div class="padding-default">
    <div class="box box-solid">
      <div class="box-body">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-xs-12 col-sm-6">
            <div class="form-group select2-bootstrap-prepend  col-xs-6" style="width: 100%;">
              <div class="input-group">
                <label class="input-group-addon">监测项:</label>
                <vue-select2 :ajax=true :paging=false :multiple=false v-ref:item-selector
                             :ajax-url="monitorItems.ajaxUrl"
                             :init-data="monitorItems.initData"
                             :placeholder="monitorItems.placeholder"
                             :evt-selected="monitorItems.evtSelected">
                </vue-select2>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-xs-12 col-sm-6">
            <div class="form-group select2-bootstrap-prepend  col-xs-6" style="width: 100%;">
              <div class="input-group">
                <label class="input-group-addon">点组:</label>
                <vue-select2 id='groupType' :ajax=true :paging=false :multiple=false v-ref:point-group-selector
                             :ajax-url="monitorPointGroups.ajaxUrl"
                             :init-data="monitorPointGroups.initData"
                             :placeholder="monitorPointGroups.placeholder"
                             :evt-selected="monitorPointGroups.evtSelected">
                </vue-select2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- 支撑轴力 点组参数-->
      <brace-axial-force-group :info.sync="info" v-if="groupType===1 && renderAble"></brace-axial-force-group>
      <brace-axial-force-group :info.sync="info" v-if="groupType===3 && renderAble"></brace-axial-force-group>
      <!--  <brace-axial-force-group :info.sync="info" v-if="groupType===0 && renderAble"></brace-axial-force-group>-->
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      'brace-axial-force-group': require('../project-edit-point-group-pages/brace-axial-force-group.vue')
    },
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
        deviceType: null,
        groupType: null,   //v-modal于“点组类型”选框
        renderAble: false,
        groupTypes: [],
        groupId: null,
        relItemPointTable: {},
        unRelItemPointTable: {},
        monitorItems: {
          initData: [],
          placeholder: '请选择监测项',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              let item = data[0].obj;
              this.info.itemObj = item;
              this.getFirstGroupOfItem();
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorItemPage_U(this.projectId);
          }.bind(this)
        },
        monitorPointGroups: {
          initData: [],
          placeholder: '请选择测点点组',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.renderAble = false;
              let groupItem = data[0].obj;
              this.info.pointGroupObj = groupItem;
              this.groupType = this.info.pointGroupObj.groupType;
              this.getDeviceData(this.info.pointGroupObj.id);

            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.selectItemRelMonitorPointGroup(this.info.itemObj.id);
          }.bind(this)
        },
        monitorPoints: {
          initData: [],
          placeholder: '请选择测点',
          evtSelected: function (evt, data) {
            if (data && data.length > 0 && data[0].id) {
              this.sensorMark = null;
              this.info.monitorPointId = data[0].id;
            }
          }.bind(this),
          ajaxUrl: function () {
//            return window.mainConfig.url.getMonitorPointPage(this.projectId);
            return window.mainConfig.url.getRelPointOfItems(this.info.itemObj.id);
          }.bind(this)
        },
      };
    },
    watch: {
      groupType: function () {
        if (this.groupType) {
          this.renderAble = false;
          this.info.param = {};
          this.info.groupType = this.groupType;
        }
      }
    },
    created: function () {
    },
    mounted () {
      this.itemInfo = {};
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
      this.initItemOption();
    },
    methods: {
      /*
       * 初始化‘监测项’选择框
       * */
      initItemOption(){
        let component = this;
        let interval = setInterval(function () {
          if (component.info.itemObj) {
            let item = component.info.itemObj;
            component.monitorItemId = item.id;
            component.$refs.itemSelector.$emit('update', [{id: item.id, text: item.name, obj: item}]);
            component.getFirstGroupOfItem();
            clearInterval(interval);
          }
        }, 200)
      },
      getFirstGroupOfItem(){
        window.mainConfig.http.getFirstPointGroupOfItem(this.info.itemObj.id).then((response) => {
          let firstGroupOption = response.data[0];
          if (firstGroupOption && firstGroupOption.id) {
            this.info.pointGroupObj = firstGroupOption;
            this.renderAble = false;
            this.info.param = {};
            this.groupType = firstGroupOption.groupType;
            this.getDeviceData(this.info.pointGroupObj.id);
            this.renderAble = true;
            this.$refs.pointGroupSelector.$emit('update', [{
              id: firstGroupOption.id,
              text: firstGroupOption.name,
              obj: firstGroupOption
            }]);
          } else {
            this.info.pointGroupObj = {};
            this.$refs.pointGroupSelector.$emit('clear');
            this.renderAble = false;
          }
        }, (response) => {
          toastr.error('通信失败');
        });
      },
      /**
       *初始化“监测点”选择框
       */
      initPointGropOption(){
        if (this.info.pointGroupObj) {
          let pointGroup = this.info.pointGroupObj;
          this.$refs.pointGroupSelector.$emit('update', [{id: pointGroup.id, text: pointGroup.name, obj: pointGroup}]);
          this.info.monitorPointGroupId = pointGroup.id;
          this.getDeviceData(this.info.pointGroupObj.id);
//          this.monitorPointGroups.initData.push({id: pointGroup.id, text: pointGroup.name, obj: pointGroup})
        }
        this.firstTime = false;
      },
      initMonitorPoint(){
        let component = this;
        let interval = setInterval(function () {
          if (component.info.pointObj) {
            let point = component.info.pointObj;
            component.$refs.pointSelector.$emit('update', [{id: point.id, text: point.name, obj: point}]);
            component.info.monitorPointId = point.id;
            clearInterval(interval);
          }
        }, 200);
      },
      /**
       * 获取关联点组与点组类型的参数
       * @param pointGroupId
       * @param monitorItemId
       */
      getDeviceData(groupId){
        window.mainConfig.http.getPointGroupParams(groupId).then((response) => {
          let data = response.data;
          if (data.length > 0) {
            let vdata = data[0].vdata;
            let param = JSON.parse(vdata);
            this.info.param = param;
//          this.info.param = data;
            this.renderAble = true;
          } else {
            this.info.param = {};
            this.renderAble = true;
          }
        }, (response) => {
          toastr.error('通信失败');
        });
      },
    }
  };
</script>
<style lang="scss" scoped>
</style>
