<template>
  <div class="">
    <div class="box-body">
      <div class="form-group select2-bootstrap-prepend ">
        <!--<div class="div-margin-bottom">-->
        <!--<div class="col-xs-3 col-sm-2 col-lg-1"><label class="input-group-addon">监测项:</label></div>-->
        <!--<div class="col-xs-9 col-sm-10 col-lg-11">-->
        <!--<vue-select2 :ajax=true :paging=false :multiple=false v-ref:item-selector-->
        <!--:ajax-url="monitorItems.ajaxUrl"-->
        <!--:init-data="monitorItems.initData"-->
        <!--:placeholder="monitorItems.placeholder"-->
        <!--:evt-selected="monitorItems.evtSelected"></vue-select2>-->
        <!--</div>-->
        <!--</div>-->
        <div class="">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding">
            <div class="input-group">
              <label class="input-group-addon addon-label">预警类型:</label>
              <vue-select2 :ajax=false :paging=false :multiple=false v-ref:watch-slt id="monitorPrmType"
                           :init-data="zoneOptions.initData"
                           :local-data="zoneOptions.localData"
                           :placeholder="zoneOptions.placeholder"
                           :evt-selected="zoneOptions.evtSelected"></vue-select2>
            </div>
          </div>
          <div class="">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding">
              <div class="input-group">
                <span class="input-group-addon"><input type="checkbox" id="isEnable"/></span>
                <label class="input-group-addon addon-label">监测项:</label>
                <vue-select2 :ajax=true :paging=false :multiple=false v-ref:item-selector
                             :ajax-url="monitorItems.ajaxUrl"
                             :init-data="monitorItems.initData"
                             :placeholder="monitorItems.placeholder"
                             :evt-selected="monitorItems.evtSelected"></vue-select2>
              </div>
            </div>
          </div>

          <!--<div class="div-margin-bottom">-->
          <!--<div class="col-xs-3 col-sm-2 col-lg-1"><label class="input-group-addon">测点:</label></div>-->
          <!--<div class="col-xs-9 col-sm-10 col-lg-11">-->
          <!--<vue-select2 :ajax=true :paging=false :multiple=false v-ref:point-selector-->
          <!--:ajax-url="monitorPoints.ajaxUrl"-->
          <!--:init-data="monitorPoints.initData"-->
          <!--:placeholder="monitorPoints.placeholder"-->
          <!--:evt-selected="monitorPoints.evtSelected"></vue-select2>-->
          <!--</div>-->
          <!--</div>-->
          <div class="" v-if="monitorPrmType===1">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding" id="point">
              <div class="input-group">
                <label class="input-group-addon addon-label">测点:</label>
                <vue-select2 :ajax=true :paging=false :multiple=false v-ref:point-selector
                             :ajax-url="monitorPoints.ajaxUrl"
                             :init-data="monitorPoints.initData"
                             :placeholder="monitorPoints.placeholder"
                             :evt-selected="monitorPoints.evtSelected">
                </vue-select2>
              </div>
            </div>
          </div>

          <!--<div class="div-margin-bottom">-->
          <!--<div class="col-xs-3 col-sm-2 col-lg-1"><label for="warningType" class="input-group-addon">预警参数:</label></div>-->
          <!--<div class="col-xs-9 col-sm-10 col-lg-11">-->
          <!--<select id="warningType" class="form-control" v-model="warningType">-->
          <!--<option v-for="option in attrOption" :value="option.value" :selected="option.selected">-->
          <!--{{option.text}}-->
          <!--</option>-->
          <!--</select>-->
          <!--</div>-->
          <!--</div>-->
          <div class="">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding">
              <div class="input-group" style="margin-top:10px;">
                <label class="input-group-addon addon-label">物理量类型:</label>
                <select id="warningType" class="form-control" v-model="warningType">
                  <option v-for="option in attrOption" :value="option.value" :selected="option.selected">
                    {{option.text}}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <water-level-0 :info.sync="info" v-if="monitorType===1 &&warningType===0&& renderAble"
                     transition="fade" class="section-wrapper"></water-level-0>
      <water-level-1 :info.sync="info" v-if="monitorType===1 && warningType===1 && renderAble"
                     transition="fade" class="section-wrapper"></water-level-1>
      <in-displacement-0 :info.sync="info" v-if="monitorType===2 && warningType===0&&renderAble"
                         transition="fade" class="section-wrapper"></in-displacement-0>
      <brace-0 :info.sync="info" v-if="monitorType===3 && warningType===0&&renderAble" transition="fade"
               class="section-wrapper"></brace-0>
      <!--<alarm-six :info.sync="info" v-if="monitorType===4 &&warningType===0&& renderAble"-->
      <!--transition="fade"></alarm-six>-->
      <ombrometer-0 :info.sync="info" v-if="monitorType===5 &&warningType===0&& renderAble"
                    transition="fade" class="section-wrapper"></ombrometer-0>
      <joint-0 :info.sync="info" v-if="monitorType===6 && warningType===0&&renderAble"
               transition="fade" class="section-wrapper"></joint-0>
      <gps-0 :info.sync="info" :gps.sync="gps" v-if="monitorType===7&& warningType===0&&renderAble"
             transition="fade" class="section-wrapper"></gps-0>
      <gps-1 :info.sync="info" :gps.sync="gps" v-if="monitorType===7&& warningType===1&&renderAble"
             transition="fade" class="section-wrapper"></gps-1>
      <gps-2 :info.sync="info" :gps.sync="gps" v-if="monitorType===7&& warningType===2&&renderAble"
             transition="fade" class="section-wrapper"></gps-2>
      <gps-3 :info.sync="info" :gps.sync="gps" v-if="monitorType===7&& warningType===3&&renderAble"
             transition="fade" class="section-wrapper"></gps-3>
      <!--<alarm-six :info.sync="info" v-if="monitorType===7 &&warningType===0&& renderAble"-->
      <!--transition="fade"></alarm-six>-->
      <dry-shoal-0 :info.sync="info" v-if="monitorType===8 && warningType===0&&renderAble"
                   transition="fade" class="section-wrapper"></dry-shoal-0>
      <saturation-line-0 :info.sync="info" v-if="monitorType===9 && warningType===0&&renderAble"
                         transition="fade" class="section-wrapper"></saturation-line-0>
      <saturation-line-1 :info.sync="info" v-if="monitorType===9 && warningType===1&&renderAble"
                         transition="fade" class="section-wrapper"></saturation-line-1>
      <saturation-line-2 :info.sync="info" v-if="monitorType===9 && warningType===2&&renderAble"
                         transition="fade" class="section-wrapper"></saturation-line-2>
      <!--<alarm-saturation :info.sync="info" v-if="monitorType===9 && warningType===1&&renderAble"-->
      <!--transition="fade"></alarm-saturation>-->
      <turbidity-0 :info.sync="info" v-if="monitorType===10 && warningType===0&&renderAble"
                   transition="fade" class="section-wrapper"></turbidity-0>
      <seepage-0 :info.sync="info" v-if="monitorType===11 && warningType===0&&renderAble"
                 transition="fade" class="section-wrapper"></seepage-0>
      <seepage-1 :info.sync="info" v-if="monitorType===11 && warningType===1&&renderAble"
                 transition="fade" class="section-wrapper"></seepage-1>
      <seepage-2 :info.sync="info" v-if="monitorType===11 && warningType===2&&renderAble"
                 transition="fade" class="section-wrapper"></seepage-2>
      <!--<alarm-speed :info.sync="info" v-if="monitorType===11 && warningType===1&&renderAble"-->
      <!--transition="fade"></alarm-speed>-->
      <!--<alarm-flow :info.sync="info" v-if="monitorType===11 && warningType===2&&renderAble"-->
      <!--transition="fade"></alarm-flow>-->
      <stress-0 :info.sync="info" v-if="monitorType===12 && warningType===0&&renderAble"
                transition="fade" class="section-wrapper"></stress-0>
      <strain-0 :info.sync="info" v-if="monitorType===13 && warningType===0&&renderAble"
                transition="fade" class="section-wrapper"></strain-0>
      <soil-moisture-0 :info.sync="info" v-if="monitorType===14 && warningType===0 &&renderAble"
                       transition="fade" class="section-wrapper"></soil-moisture-0>
      <water-elevation-0 :info.sync="info" v-if="monitorType===15 && warningType===0 &&renderAble"
                         transition="fade" class="section-wrapper"></water-elevation-0>
      <concreteb-brace-0 :info.sync="info" v-if="monitorType===16 && warningType===0 &&renderAble"
                         transition="fade" class="section-wrapper"></concreteb-brace-0>
      <pressure-0 :info.sync="info" v-if="monitorType===17 && warningType===0 &&renderAble"
                  transition="fade" class="section-wrapper"></pressure-0>
      <ph-0 :info.sync="info" v-if="monitorType===18 && warningType===0 &&renderAble" transition="fade"
            class="section-wrapper"></ph-0>
      <in-settlement-0 :info.sync="info" v-if="monitorType===19 && warningType===0 &&renderAble"
                       transition="fade" class="section-wrapper"></in-settlement-0>
      <total-station-0 :info.sync="info" :gps.sync="gps" v-if="monitorType===20&& warningType===0&& renderAble"
                       transition="fade" class="section-wrapper"></total-station-0>
      <total-station-1 :info.sync="info" :gps.sync="gps" v-if="monitorType===20&& warningType===1&& renderAble"
                       transition="fade" class="section-wrapper"></total-station-1>
      <total-station-2 :info.sync="info" :gps.sync="gps" v-if="monitorType===20&& warningType===2&& renderAble"
                       transition="fade" class="section-wrapper"></total-station-2>
      <total-station-3 :info.sync="info" :gps.sync="gps" v-if="monitorType===20&& warningType===3&& renderAble"
                       transition="fade" class="section-wrapper"></total-station-3>
      <total-station-4 :info.sync="info" :gps.sync="gps" v-if="monitorType===20&& warningType===4&& renderAble"
                       transition="fade" class="section-wrapper"></total-station-4>
      <total-station-5 :info.sync="info" :gps.sync="gps" v-if="monitorType===20&& warningType===5&& renderAble"
                       transition="fade" class="section-wrapper"></total-station-5>
      <total-station-6 :info.sync="info" :gps.sync="gps" v-if="monitorType===20&& warningType===6&& renderAble"
                       transition="fade" class="section-wrapper"></total-station-6>
      <total-station-7 :info.sync="info" :gps.sync="gps" v-if="monitorType===20&& warningType===7&& renderAble"
                       transition="fade" class="section-wrapper"></total-station-7>
      <total-station-8 :info.sync="info" :gps.sync="gps" v-if="monitorType===20&& warningType===8&& renderAble"
                       transition="fade" class="section-wrapper"></total-station-8>
      <total-station-9 :info.sync="info" :gps.sync="gps" v-if="monitorType===20&& warningType===9&& renderAble"
                       transition="fade" class="section-wrapper"></total-station-9>
      <total-station-10 :info.sync="info" :gps.sync="gps" v-if="monitorType===20&& warningType===10&& renderAble"
                        transition="fade" class="section-wrapper"></total-station-10>
      <total-station-11 :info.sync="info" :gps.sync="gps" v-if="monitorType===20&& warningType===11&& renderAble"
                        transition="fade" class="section-wrapper"></total-station-11>
      <total-station-12 :info.sync="info" :gps.sync="gps" v-if="monitorType===20&& warningType===12&& renderAble"
                        transition="fade" class="section-wrapper"></total-station-12>

      <strain-deformation-0 :info.sync="info" :gps.sync="gps" v-if="monitorType===21&& warningType===0&& renderAble"
                        transition="fade" class="section-wrapper"></strain-deformation-0>
      <!--<alarm-six :info.sync="info" v-if="monitorType===20 && warningType===0 &&renderAble"-->
      <!--transition="fade"></alarm-six>-->
      <!-- <alarm-six :info.sync="info" v-if="monitorType===50 && renderAble" transition="fade"></alarm-six>-->
      <!--<data-sensor-0 :info.sync="info" v-if="monitorType===50 && warningType===0 &&renderAble"-->
                     <!--transition="fade" class="section-wrapper"></data-sensor-0>-->
      <data-sensor-1 :info.sync="info" v-if="monitorType===50 && warningType===1 &&renderAble"
                     transition="fade" class="section-wrapper"></data-sensor-1>
      <data-sensor-2 :info.sync="info" v-if="monitorType===50 && warningType===2 &&renderAble"
                     transition="fade" class="section-wrapper"></data-sensor-2>
      <data-sensor-3 :info.sync="info" v-if="monitorType===50 && warningType===3 &&renderAble"
                     transition="fade" class="section-wrapper"></data-sensor-3>
    </div>
  </div>
</template>
<script>
  import AlarmEnum from '../../../manager/enum/alarm-enum';
  import CommonEnum from '../../../manager/enum/common-enum';
  export default {
    /*this.info:{itemObj pointObj,relAlarmAccount,relMessageAccount,alarm};itemInfo:{null}*/
    components: {
      'alarm-three': require('../alarm-three.vue'),
      'alarm-six': require('../alarm-six.vue'),
      'alarm-rain': require('../alarm-ombrometer.vue'),
      'alarm-data-sensor': require('../alarm-dataSensor.vue'),
      'alarm-saturation': require('../alarm-saturation.vue'),
      'alarm-water-level': require('../alarm-water-level.vue'),
      'alarm-speed': require('../alarm-water-speed.vue'),
      'alarm-flow': require('../alarm-water-flow.vue'),
      'gps-x': require('../alarm-gps-x.vue'),
      'alarm-total-station': require('../alarm-total-station.vue'),
      'water-level-0': require('../alarm-variable-pages/water-level-0.vue'),
      'in-displacement-0': require('../alarm-variable-pages/in-displacement-0.vue'),
      'brace-0': require('../alarm-variable-pages/brace-0.vue'),
      'ombrometer-0': require('../alarm-variable-pages/ombrometer-0.vue'),
      'joint-0': require('../alarm-variable-pages/joint-0.vue'),
      'gps-0': require('../alarm-variable-pages/gps-0.vue'),
      'dry-shoal-0': require('../alarm-variable-pages/dry-shoal-0.vue'),
      'saturation-line-0': require('../alarm-variable-pages/saturation-line-0.vue'),
      'turbidity-0': require('../alarm-variable-pages/turbidity-0.vue'),
      'seepage-0': require('../alarm-variable-pages/seepage-0.vue'),
      'stress-0': require('../alarm-variable-pages/stress-0.vue'),
      'strain-0': require('../alarm-variable-pages/strain-0.vue'),
      'soil-moisture-0': require('../alarm-variable-pages/soil-moisture-0.vue'),
      'water-elevation-0': require('../alarm-variable-pages/water-elevation-0.vue'),
      'concrete-brace-0': require('../alarm-variable-pages/concrete-brace-0.vue'),
      'pressure-0': require('../alarm-variable-pages/pressure-0.vue'),
      'ph-0': require('../alarm-variable-pages/ph-0.vue'),
      'in-settlement-0': require('../alarm-variable-pages/in-settlement-0.vue'),
      'total-station-0': require('../alarm-variable-pages/total-station-0.vue'),
      'strain-deformation-0': require('../alarm-variable-pages/strain-deformation-0.vue'),
//      'data-sensor-0': require('../alarm-variable-pages/data-sensor-0.vue'),
      'water-level-1': require('../alarm-normal-pages/water-level-1.vue'),
      'gps-1': require('../alarm-normal-pages/gps-1.vue'),
      'gps-2': require('../alarm-normal-pages/gps-2.vue'),
      'gps-3': require('../alarm-normal-pages/gps-3.vue'),
      'seepage-1': require('../alarm-normal-pages/seepage-1.vue'),
      'seepage-2': require('../alarm-normal-pages/seepage-2.vue'),
      'saturation-line-1': require('../alarm-normal-pages/saturation-line-1.vue'),
      'saturation-line-2': require('../alarm-normal-pages/saturation-line-2.vue'),
      'data-sensor-1': require('../alarm-normal-pages/data-sensor-1.vue'),
      'data-sensor-2': require('../alarm-normal-pages/data-sensor-2.vue'),
      'data-sensor-3': require('../alarm-normal-pages/data-sensor-3.vue'),
      'total-station-1': require('../alarm-normal-pages/total-station-1.vue'),
      'total-station-2': require('../alarm-normal-pages/total-station-2.vue'),
      'total-station-3': require('../alarm-normal-pages/total-station-3.vue'),
      'total-station-4': require('../alarm-normal-pages/total-station-4.vue'),
      'total-station-5': require('../alarm-normal-pages/total-station-5.vue'),
      'total-station-6': require('../alarm-normal-pages/total-station-6.vue'),
      'total-station-7': require('../alarm-normal-pages/total-station-7.vue'),
      'total-station-8': require('../alarm-normal-pages/total-station-8.vue'),
      'total-station-9': require('../alarm-normal-pages/total-station-9.vue'),
      'total-station-10': require('../alarm-normal-pages/total-station-10.vue'),
      'total-station-11': require('../alarm-normal-pages/total-station-11.vue'),
      'total-station-12': require('../alarm-normal-pages/total-station-12.vue'),
    },
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        account: {},
        renderAble: false,
        monitorType: null,//根据监测项去判断显示哪个组件
        warningType: null,
        rendering: false,
//        isEnable: 0,
        monitorPrmType: 0,
        attrOption: [],
        zoneOptions: {
          initData: [],
          placeholder: '预警类型',
          evtSelected: function (evt, data) {
            this.renderAble = false;
            this.monitorPrmType = parseInt(data[0].id);
            if (this.monitorPrmType === 1) {
              this.getFirstPoint();
            } else {
              this.getAlarmParam(this.info.itemObj.id, '', this.monitorPrmType);
            }
          }.bind(this),
          localData: [{id: 0, text: '监测项'}, {id: 1, text: '监测点'}, /*  {id: 3, text: '年报表'}*/]
        },
//        gps: 0,
        monitorItems: {
          initData: [],
          placeholder: '请选择监测项',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.renderAble = false; // 控制页面重新渲染
              this.info.itemObj = {};
              let item = data[0].obj;
              if (item) {
                this.info.itemObj = item;
              }
              this.monitorType = item.monitorTypeId;
              this.getFirstPoint();
            }
          }.bind(this),
          ajaxUrl: function () {
            let projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
            return window.mainConfig.url.getMonitorItemPage_U(projectId);
          }.bind(this)
        },
        monitorPoints: {
          initData: [],
          placeholder: '请选择测点',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.renderAble = false; // 控制页面重新渲染
//              this.info.pointObj = {};
              this.info.monitorPointId = data[0].id;
              this.info.pointObj = data[0].obj;
              let point = data[0].obj;
              this.$refs.pointSelector.$emit('update', [{id: point.id, text: point.name, obj: point}]);
              this.attrOption = AlarmEnum.getItemMark(this.info.itemObj.monitorTypeId).DataType;
              this.warningType = this.attrOption[0].value;
              this.getAlarmParam(this.info.itemObj.id, point.id, this.monitorPrmType);
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getRelPointOfItems(this.info.itemObj.id);
          }.bind(this)

        },
      };
    },
    watch: {
      'warningType': function (e) {
        this.renderAble = false;
        let pointId = '';
        if (this.monitorPrmType === 1) pointId = this.info.pointObj.id;
        this.getAlarmParam(this.info.itemObj.id, pointId, this.monitorPrmType);
      },
    },
    attached () {
      this.initMonitorItem();
    },
    methods: {
      initMonitorItem(){
        let component = this;
        let interval = setInterval(() => {
          let item = component.info.itemObj;
          if (item) {
            component.$refs.itemSelector.$emit('update', [{id: item.id, text: item.name, obj: item}]);
            if (this.monitorPrmType === 0) {
              component.monitorType = component.info.itemObj.monitorTypeId;
              component.attrOption = AlarmEnum.getItemMark(component.info.itemObj.monitorTypeId).DataType;
              component.commonOption = CommonEnum.getItemMark(component.info.itemObj.monitorTypeId).DataType;
              component.commonUnit = component.commonOption[0].unit;
              component.warningType = component.attrOption[0].value;
//              component.getAlarmParam(item.id, '', this.monitorPrmType);
            }
            clearInterval(interval);
          }

        }, 200);
      },
//      initMonitorPoint(){
//        let component = this;
//        let interval = setInterval(function () {
//          if (component.info.pointObj) {
//            component.getFirstPoint();
//            clearInterval(interval);
//          }
//        }, 200);
//      },
      getFirstPoint(){
        let opacity = '<div style="width:100%;height: 100%;" class="opacity-wrapper">' +
            '<div style="width: inherit;height: inherit;z-index: 10;opacity: 0.7;background-color: #787878;position: absolute;top: 0;"></div>' +
            '<img src="./../../../../static/image/ellipsis2.gif" style="z-index: 11;position: absolute;top:50%;left: 50%;margin-top: -100px ;"/></div>';
        $('.section-wrapper').append(opacity);
        window.mainConfig.http.getFirstPointOfItem(this.info.itemObj.id).then((response) => {
          $('.opacity-wrapper').remove();
          let option = response.data[0];
          if (option && option.id) {
            this.info.pointObj = option;
            if (this.$refs.pointSelector)
              this.$refs.pointSelector.$emit('update', [{id: option.id, text: option.name, obj: option}]);
            this.attrOption = AlarmEnum.getItemMark(this.info.itemObj.monitorTypeId).DataType;
            this.warningType = this.attrOption[0].value;
            this.commonOption = CommonEnum.getItemMark(this.info.itemObj.monitorTypeId).DataType;
            this.commonUnit = this.commonOption[0].unit;
            if (this.monitorPrmType === 1) {
              this.getAlarmParam(this.info.itemObj.id, option.id, this.monitorPrmType);
            } else {
              this.getAlarmParam(this.info.itemObj.id, '', this.monitorPrmType);
            }
          } else {
            this.info.pointObj = {};
            if (this.$refs.pointSelector)
              this.$refs.pointSelector.clear(false);
//                  this.attrOption = [];
            this.attrOption = AlarmEnum.getItemMark(this.info.itemObj.monitorTypeId).DataType;
            this.warningType = this.attrOption[0].value;
            this.commonOption = CommonEnum.getItemMark(this.info.itemObj.monitorTypeId).DataType;
            this.commonUnit = this.commonOption[0].unit;
            this.getAlarmParam(this.info.itemObj.id, '', this.monitorPrmType);
          }
        }, (response) => {
          toastr.error(response);
        });
      },
      getAlarmParam(monitorItemId, pointId, monitorPrmType){
        window.mainConfig.http.getAlarmParamList(monitorItemId, pointId, monitorPrmType).then((response) => {
          let data = response.data[0];
          if (!$.isEmptyObject(data)) {//this.info.alarm
            this.info.alarm = data;
//            console.log(this.info.alarm);
            this.info.alarm.param = JSON.parse(data.prms);
            this.info.alarm.paramB = JSON.parse(data.prmsB);
            this.info.alarm.isEnable = data.isEnable;
            if (data.isEnable === 1) {
              $('#isEnable').prop('checked', 'checked');
            }
            this.info.alarm.monitorPrmType = data.monitorPrmType;
            this.info.alarm.unitList = this.commonUnit;
          } else {
            this.info.alarm = {};
            this.info.alarm.param = {};
            this.info.alarm.paramB = {};
            this.info.alarm.isEnable = this.isEnable;
            this.info.alarm.monitorPrmType = this.monitorPrmType;
            this.info.alarm.unitList = this.commonUnit;
          }
          this.renderAble = true;// 有 alarm.param 方可渲染自组件
        }, (response) => {
          console.log(response);
        })
      },
    }
  };
</script>
<style lang="scss" scoped>
  /*.input-group-addon {*/
  /*font-size: 18px;*/
  /*color: #1b9bff;*/
  /*border: 0;*/
  /*font-weight: 700;*/
  /*background-color: transparent;*/
  /*}*/

  input-group-addon {
    border: solid rgba(61, 155, 179, 0.56);
    border-width: 1px 0 1px 1px;
    border-radius: 5px 0 0 5px;
  }

  .input-group select {
    border-radius: 0 5px 5px 0;
    border: solid rgba(61, 155, 179, 0.56) 1px;
    color: #00aadd;
    font-size: 14px;
  }

  .addon-label {
    color: #00aadd;
    font-weight: 900;
    font-size: 1.105em;
  }

  .wrap-padding {
    margin-top: 10px;
  }

  @media screen and (max-width: 768px) {
    .input-group-addon[_v-08f05d6c] {
      font-size: 12px;
    }

    .input-group-addon {
      padding: 6px 0;
    }

  }
</style>

