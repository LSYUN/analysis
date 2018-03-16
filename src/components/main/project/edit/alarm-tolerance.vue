<template>
  <div>
    <div class="box-body">
      <div class="form-group select2-bootstrap-prepend">
        <div class="">
          <!--<div class="col-xs-3 col-sm-2 col-lg-1">-->
          <!--<label class="input-group-addon">监测项:</label>-->
          <!--</div>-->
          <!--<div class="col-xs-9 col-sm-10 col-lg-11">-->
          <!--<vue-select2 :ajax=true :paging=false :multiple=false v-ref:item-selector-->
          <!--:ajax-url="monitorItems.ajaxUrl"-->
          <!--:init-data="monitorItems.initData"-->
          <!--:placeholder="monitorItems.placeholder"-->
          <!--:evt-selected="monitorItems.evtSelected"></vue-select2>-->
          <!--</div>-->
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding">
            <div class="input-group">
              <span class="input-group-addon"><input type="checkbox" v-model=""></span>
              <label class="input-group-addon addon-label">监测项:</label>
              <vue-select2 :ajax=true :paging=false :multiple=false v-ref:item-selector
                           :ajax-url="monitorItems.ajaxUrl"
                           :init-data="monitorItems.initData"
                           :placeholder="monitorItems.placeholder"
                           :evt-selected="monitorItems.evtSelected"></vue-select2>
            </div>
          </div>
        </div>
        <div class="">
          <!--<div class="col-xs-3 col-sm-2 col-lg-1"><label for="warningType" class="input-group-addon">预警参数:</label></div>-->
          <!--<div class="col-xs-9 col-sm-10 col-lg-11">-->
            <!--<select id="warningType" class="form-control" v-model="warningType">-->
              <!--<option v-for="option in attrOption" :value="option.value" :selected="option.selected">-->
                <!--{{option.text}}-->
              <!--</option>-->
            <!--</select>-->
          <!--</div>-->
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding">
            <div class="input-group" style="margin-top:10px;">
              <span class="input-group-addon"><input type="checkbox" v-model=""></span>
              <label class="input-group-addon addon-label">预警参数:</label>
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
    <alarm-six :info.sync="info" v-if="monitorItemType===1 &&warningType===0&& renderAble"
               transition="fade"></alarm-six>
    <alarm-water-level :info.sync="info" v-if="monitorItemType===1 && warningType===1 &&renderAble"
                       transition="fade"></alarm-water-level>
    <alarm-six :info.sync="info" v-if="monitorItemType===2 && warningType===0&&renderAble"
               transition="fade"></alarm-six>
    <alarm-six :info.sync="info" v-if="monitorItemType===3 && warningType===0&&renderAble"
               transition="fade"></alarm-six>
    <alarm-six :info.sync="info" v-if="monitorItemType===4 &&warningType===0&& renderAble"
               transition="fade"></alarm-six>
    <alarm-rain :info.sync="info" v-if="monitorItemType===5 &&warningType===0&& renderAble"
                transition="fade"></alarm-rain>
    <alarm-six :info.sync="info" v-if="monitorItemType===6 && warningType===0&&renderAble"
               transition="fade"></alarm-six>
    <!--<alarm-six :info.sync="info" v-if="monitorItemType===7 && warningType===0&&renderAble"-->
    <!--transition="fade"></alarm-six>-->
    <gps-x :info.sync="info" :gps.sync="gps" v-if="monitorItemType===7&& renderAble"
           transition="fade"></gps-x>
    <!--<gps-y :info.sync="info" v-if="monitorItemType===7 &&warningType===1&& renderAble"-->
    <!--transition="fade"></gps-y>-->
    <!--<gps-z :info.sync="info" v-if="monitorItemType===7 &&warningType===2&& renderAble"-->
    <!--transition="fade"></gps-z>-->
    <alarm-six :info.sync="info" v-if="monitorItemType===8 && warningType===0&&renderAble"
               transition="fade"></alarm-six>
    <alarm-six :info.sync="info" v-if="monitorItemType===9 && warningType===0&&renderAble"
               transition="fade"></alarm-six>
    <alarm-saturation :info.sync="info" v-if="monitorItemType===9 && warningType===1&&renderAble"
                      transition="fade"></alarm-saturation>
    <alarm-saturation-water :info.sync="info" v-if="monitorItemType===9 && warningType===2&&renderAble"
                            transition="fade"></alarm-saturation-water>
    <alarm-six :info.sync="info" v-if="monitorItemType===10 && warningType===0&&renderAble"
               transition="fade"></alarm-six>
    <alarm-six :info.sync="info" v-if="monitorItemType===11 && warningType===0&&renderAble"
               transition="fade"></alarm-six>
    <alarm-speed :info.sync="info" v-if="monitorItemType===11 && warningType===1&&renderAble"
                 transition="fade"></alarm-speed>
    <alarm-flow :info.sync="info" v-if="monitorItemType===11 && warningType===2&&renderAble"
                transition="fade"></alarm-flow>
    <alarm-six :info.sync="info" v-if="monitorItemType===12 && warningType===0&&renderAble"
               transition="fade"></alarm-six>
    <alarm-six :info.sync="info" v-if="monitorItemType===13 && warningType===0&&renderAble"
               transition="fade"></alarm-six>
    <alarm-six :info.sync="info" v-if="monitorItemType===14 && warningType===0 &&renderAble"
               transition="fade"></alarm-six>
    <alarm-six :info.sync="info" v-if="monitorItemType===15 && warningType===0 &&renderAble"
               transition="fade"></alarm-six>
    <alarm-six :info.sync="info" v-if="monitorItemType===16 && warningType===0 &&renderAble"
               transition="fade"></alarm-six>
    <alarm-six :info.sync="info" v-if="monitorItemType===17 && warningType===0 &&renderAble"
               transition="fade"></alarm-six>
    <alarm-six :info.sync="info" v-if="monitorItemType===18 && warningType===0 &&renderAble"
               transition="fade"></alarm-six>
    <alarm-six :info.sync="info" v-if="monitorItemType===19 && warningType===0 &&renderAble"
               transition="fade"></alarm-six>
    <!--<alarm-six :info.sync="info" v-if="monitorItemType===20 && warningType===0 &&renderAble"-->
    <!--transition="fade"></alarm-six>-->
    <alarm-total-station :info.sync="info" :gps.sync="gps" v-if="monitorItemType===20&& renderAble"
                         transition="fade"></alarm-total-station>
    <!--<alarm-data-sensor :info.sync="info" v-if="monitorItemType===50 && warningType===0 &&renderAble"-->
    <!--transition="fade"></alarm-data-sensor>-->
    <alarm-data-sensor :info.sync="info" v-if="monitorItemType===50 && warningType===0&&renderAble"
                       transition="fade"></alarm-data-sensor>
    <alarm-data-sensor :info.sync="info" v-if="monitorItemType===50 && warningType===1&&renderAble"
                       transition="fade"></alarm-data-sensor>
    <alarm-data-sensor :info.sync="info" v-if="monitorItemType===50 && warningType===2&&renderAble"
                       transition="fade"></alarm-data-sensor>
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
      'alarm-saturation-water': require('../alarm-saturation-water.vue'),
      'alarm-water-level': require('../alarm-water-level.vue'),
      'alarm-speed': require('../alarm-water-speed.vue'),
      'alarm-flow': require('../alarm-water-flow.vue'),
      'gps-x': require('../alarm-gps-x.vue'),
      'alarm-total-station': require('../alarm-total-station.vue'),
//      'gps-z': require('../project-edit-alarm-pages/alarm-gps-z'),
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
        gps: 0,
        renderAble: false,
        monitorItemType: null,//根据监测项去判断显示哪个组件
        warningType: null,
        attrOption: [],
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
                this.monitorItemType = item.monitorTypeId;
                this.attrOption = AlarmEnum.getItemMark(item.monitorTypeId).DataType;
                this.commonOption = CommonEnum.getItemMark(item.monitorTypeId).DataType;
                this.warningType = this.attrOption[0].value;
                this.commonUnit = this.commonOption[0].unit;
                this.getAlarmParam(item.id, null);
              }
            }
          }.bind(this),
          ajaxUrl: function () {
            let projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
            return window.mainConfig.url.getMonitorItemPage_U(projectId);
          }.bind(this)
        }
      };
    },
    watch: {
      'warningType': function (e) {
        console.log(e);
        let obj = _.find(this.attrOption, function (type) {
          return type.value === e;
        });
        this.warningType = obj.value;
        if(typeof this.gps !== 'string'){
          this.gps = obj.value;
        }
//        console.log(this.gps);
        this.renderAble = false;
        this.getAlarmParam(this.info.itemObj.id, '');
      },
    },
    attached () {
      console.log(this.gps);
      let component = this;
      let interval = setInterval(() => {
        let item = component.info.itemObj;
        if (item) {
          component.$refs.itemSelector.$emit('update', [{id: item.id, text: item.name, obj: item}]);
          component.monitorItemType = item.monitorTypeId;
          component.attrOption = AlarmEnum.getItemMark(item.monitorTypeId).DataType;
          component.commonOption = CommonEnum.getItemMark(item.monitorTypeId).DataType;
          component.warningType = component.attrOption[0].value;
          component.commonUnit = component.commonOption[0].unit;
          component.getAlarmParam(item.id, '');
          clearInterval(interval);
        }
      }, 200)
    },
    methods: {
//      getAlarmParam(monitorItemId, pointId){
//        window.mainConfig.http.getAlarmParamList(monitorItemId, pointId).then((response) => {
//          let data = response.data[0];
//          if (data) {//this.info.alarm
//            this.info.alarm = data;
//            this.info.alarm.param = JSON.parse(data.prms);
////            console.log(this.info.alarm.param );
//            this.info.alarm.unitList = this.commonUnit;
//          } else {
//            this.info.alarm = {};
//            this.info.alarm.param = {};
//            this.info.alarm.unitList = this.commonUnit;
//          }
//          this.renderAble = true;// 有 alarm.param 方可渲染自组件
//        }, (response) => {
//          console.log(response);
//        })
//      },
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
  @media screen and (max-width: 768px) {
    .input-group-addon[_v-08f05d6c] {
      font-size: 12px;
    }

    /*.input-group-addon {*/
      /*padding: 6px 0;*/
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


  }
</style>

