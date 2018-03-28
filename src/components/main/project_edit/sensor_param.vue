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
                <label class="input-group-addon">测点:</label>
                <vue-select2 :ajax=true :paging=false :multiple=false v-ref:point-selector
                             :ajax-url="monitorPoints.ajaxUrl"
                             :init-data="monitorPoints.initData"
                             :placeholder="monitorPoints.placeholder"
                             :evt-selected="monitorPoints.evtSelected">
                </vue-select2>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-xs-12 col-sm-6">
            <div class="form-group select2-bootstrap-prepend  col-xs-6" style="width: 100%;">
              <div class="input-group">
                <label class="input-group-addon">传感器:</label>
                <select class="form-control field" v-model="sensorMark">
                  <!--try v:bind-->
                  <option v-for="option in deviceOptions" :value="option.value"
                          :selected="option.value == sensorMark ? true : false"> {{ option.text }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div> <!--style="height:70vh;"-->
      <osmometer-30 :info.sync="info" v-if="sensorMark===30 && renderAble"></osmometer-30><!-- 渗压计-->
      <!--内部沉降监测项：33, 葛南振弦式土体沉降计VWD-A -->
      <in-settlement-33 :info.sync="info" v-if="sensorMark===33 && renderAble"></in-settlement-33>
      <!--浸润线监测项：34, 葛南振弦式扬压力计VWP-D -->
      <saturation-line-34 :info.sync="info" v-if="sensorMark===34 && renderAble"></saturation-line-34>
      <water-elevation-36 :info.sync="info" v-if="sensorMark===36 && renderAble"></water-elevation-36>
      <!--浸润线监测项：37, 葛南VWE型振弦式土压力计 -->
      <pressure-37 :info.sync="info" v-if="sensorMark===37 && renderAble"></pressure-37>
      <!--内部位移监测项：50, 葛南固定测斜仪GN-1B -->
      <in-displacement-50 :info.sync="info" v-if="sensorMark===50 && renderAble"></in-displacement-50>
      <!-- 水准高程 沉降 水准仪-->
      <ombrometer-90 :info.sync="info" v-if="sensorMark===90 && renderAble"></ombrometer-90><!-- 渗压计-->
      <ombrometer-92 :info.sync="info" v-if="sensorMark===92 && renderAble"></ombrometer-92><!--雨量计-->
      <water-level-120 :info.sync="info" v-if="sensorMark===120 && renderAble"></water-level-120><!-- 水位-->
      <osmometerl-140 :info.sync="info" v-if="sensorMark===140 && renderAble"></osmometerl-140><!-- 渗压计-->
      <!--压强监测项： 150, 泰佳振弦式渗压计TJ-04B -->
      <pressure-150 :info.sync="info" v-if="sensorMark===150 && renderAble"></pressure-150>
      <brace-axial-force-161 :info.sync="info" v-if="sensorMark===161 && renderAble"></brace-axial-force-161>
      <concrete-brace-160 :info.sync="info" v-if="sensorMark===160 && renderAble"></concrete-brace-160>
      <water-level-162 :info.sync="info" v-if="sensorMark===162 && renderAble"></water-level-162>
      <in-displacement-163 :info.sync="info" v-if="sensorMark===163 && renderAble"></in-displacement-163>
      <!-- 支撑轴力 监测项 ：170, 长沙金码JMZX-30XX轴力计-->
      <brace-axial-force-170 :info.sync="info" v-if="sensorMark===170 && renderAble"></brace-axial-force-170>
      <!-- 混凝土支撑 监测项 ：171，长沙金码JMZX-4XX钢筋计-->
      <concrete-brace-171 :info.sync="info" v-if="sensorMark===171 && renderAble"></concrete-brace-171>
      <!--水位 监测项 ：172，长沙金码JMZX-55XXHAT渗压计-->
      <water-level-172 :info.sync="info" v-if="sensorMark===172 && renderAble"></water-level-172>
      <in-displacement-173 :info.sync="info" v-if="sensorMark===173 && renderAble"></in-displacement-173>
      <strain-deformation-174 :info.sync="info" v-if="sensorMark===174 && renderAble"></strain-deformation-174>
      <water-level-180 :info.sync="info" v-if="sensorMark===180 && renderAble"></water-level-180>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      'osmometer-30': require('../project-edit-point-sensor-pages/osmometer-30.vue'),
      'in-settlement-33': require('../project-edit-point-sensor-pages/in-settlement-33.vue'),
      'saturation-line-34': require('../project-edit-point-sensor-pages/saturation-line-34.vue'),
      'water-elevation-36': require('../project-edit-point-sensor-pages/water-elevation-36.vue'),
      'pressure-37': require('../project-edit-point-sensor-pages/pressure-37.vue'),
      'in-displacement-50': require('../project-edit-point-sensor-pages/in-displacement-50.vue'),
      'ombrometer-90': require('../project-edit-point-sensor-pages/ombrometer-90.vue'),
      'ombrometer-92': require('../project-edit-point-sensor-pages/ombrometer-92.vue'),
      'water-level-120': require('../project-edit-point-sensor-pages/water-level-120.vue'),
      'osmometerl-140': require('../project-edit-point-sensor-pages/osmometerl-140.vue'),
      'pressure-150': require('../project-edit-point-sensor-pages/pressure-150.vue'),
      'concrete-brace-160': require('../project-edit-point-sensor-pages/concrete-brace-160.vue'),
      'brace-axial-force-161': require('../project-edit-point-sensor-pages/brace-axial-force-161.vue'),
      'water-level-162': require('../project-edit-point-sensor-pages/water-level-162.vue'),
      'in-displacement-163': require('../project-edit-point-sensor-pages/in-displacement-163.vue'),
      'brace-axial-force-170': require('../project-edit-point-sensor-pages/brace-axial-force-170.vue'),
      'concrete-brace-171': require('../project-edit-point-sensor-pages/concrete-brace-171.vue'),
      'water-level-172': require('../project-edit-point-sensor-pages/water-level-172.vue'),
      'in-displacement-173': require('../project-edit-point-sensor-pages/in-displacement-173.vue'),
      'strain-deformation-174': require('../project-edit-point-sensor-pages/strain-deformation-174.vue'),
      'water-level-180': require('../project-edit-point-sensor-pages/water-level-180.vue')
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
        sensorId: null,
        deviceType: null,
        sensorMark: null,   //v-modal于“传感器”选框
        renderAble: false,
        deviceOptions: [],
        relItemPointTable: {},
        unRelItemPointTable: {},
        monitorItems: {
          initData: [],
          placeholder: '请选择监测项',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              let item = data[0].obj;
              this.info.itemObj = item;
              window.mainConfig.http.getFirstPointOfItem(this.info.itemObj.id).then((response) => {
                let option = response.data[0];
                if (option && option.id) {
                  this.info.pointObj = option;
                  this.$refs.pointSelector.$emit('update', [{id: option.id, text: option.name, obj: option}]);
                  this.getDeviceType(option.id);
                } else {
                  this.info.pointObj = {};
                  this.$refs.pointSelector.clear(true);
                }
              }, (response) => {
                toastr.error('通信失败');
              });
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorItemPage_U(this.projectId);
          }.bind(this)
        },
        monitorPoints: {
          initData: [],
          placeholder: '请选择测点',
          evtSelected: function (evt, data) {
            if (data && data.length > 0 && data[0].id) {
              this.sensorMark = null;
              this.info.monitorPointId = data[0].id;
              this.getDeviceType(this.info.monitorPointId);
            }
          }.bind(this),
          ajaxUrl: function () {
//            return window.mainConfig.url.getMonitorPointPage(this.projectId);
            return window.mainConfig.url.getRelPointOfItems(this.info.itemObj.id);
          }.bind(this)
        },
        deviceTypes: [
          {value: 1, text: '湘银河'},
          {value: 32, text: '葛南量水堰GL-1A'},
          {value: 33, text: '葛南振弦式土体沉降计VWD'},
          {value: 34, text: '葛南振弦式扬压力计VWP-D'},
          {value: 35, text: '葛南VWR型振弦式钢筋计'},
          {value: 36, text: '葛南静力水准仪'},
          {value: 37, text: '葛南VWE型振弦式土压力计'},
          {value: 40, text: '倾角测斜仪SQJ-032'},
          {value: 50, text: '固定测斜仪GN-1B'},
          {value: 60, text: '钢筋计'},
          {value: 70, text: '锚索计'},
          {value: 80, text: '雨量计SL3-1'},
          {value: 90, text: '伟思雨量计JD系列'},
          {value: 92, text: '大铁检测雨量计或裂缝计'},//雨量计
          {value: 100, text: '葛南测缝计'},
          {value: 110, text: '葛能测缝计'},
          {value: 120, text: '迅嘉水位计XJ-F-12C'},
          {value: 121, text: '讯嘉超声波水位计'},
          {value: 130, text: '诺普泰克PH计'},
          {value: 135, text: '百恒仪表浊度仪'},
          {value: 140, text: '基康渗压计'},//140-基康BGK-4500AL渗压计
          {value: 141, text: '基康振弦式表面裂缝计'},
          {value: 150, text: '泰佳振弦式渗压计TJ-04B'},
          {value: 160, text: '工讯MAS-GJ振弦式钢筋计'},
          {value: 161, text: '工讯MAS-ZL振弦式轴力计'},
          {value: 162, text: '工讯MAS-KY振弦式孔隙水压计'},
          {value: 163, text: '工讯导轮式固定测斜仪'},
          {value: 170, text: '金码JMZX-3830HB轴力计'},
          {value: 171, text: '金码JMZX-428HB钢筋计'},
          {value: 172, text: '金码JMZX-5506HB水压计'},
          {value: 173, text: '金码JMZX-7430ADY测斜仪'},
          {value: 174, text: '金码JMZX-212HB应变计'},
          {value: 180, text: '科隆水位计'}
        ],
      };
    },
    watch: {
      sensorMark: function () {
        if (this.sensorMark) {
          this.renderAble = false;
          this.info.param = {};
          this.info.sensorMark = this.sensorMark;
          this.getDeviceData(this.info.monitorPointId, this.info.sensorId);
        }
      }
    },
    created: function () {
    },
    mounted () {
      this.itemInfo = {};
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
      this.initItemOption();
      this.initMonitorPoint();
      this.getSensorId();
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
            clearInterval(interval);
          }
        }, 200)
      },
      /**
       *初始化“监测点”选择框
       */
      initMonitorPoint(){
        let component = this;
        let interval = setInterval(function () {
          if (component.info.pointObj) {
            let point = component.info.pointObj;
            component.$refs.pointSelector.$emit('update', [{id: point.id, text: point.name, obj: point}]);
            component.info.monitorPointId = point.id;
            component.getDeviceType(component.info.monitorPointId);
            clearInterval(interval);
          }
        }, 200);
      },
      /**
       * 获取相关传感器，用于“传感器”选择框
       * @param monitorPointId
       */
      getDeviceType(monitorPointId){
        this.deviceOptions = [];
        window.mainConfig.http.getRelSensorByPoint(monitorPointId).then((response) => {
          let data = response.data;
          for (let i in data) {
            for (let j in this.deviceTypes) {
              if (data[i].deviceType === this.deviceTypes[j].value) {
                this.deviceTypes[j].sensorId = data[i].id;
                this.deviceOptions.push(this.deviceTypes[j]);   //根据后台数据筛选this.deviceTypes中符合的对象
                continue;
              }
            }
          }
          if (this.deviceOptions.length > 0) {
            this.sensorMark = this.deviceOptions[0].value;   //v-modal于“传感器”选框,触发监听事件
            this.info.sensorId = this.deviceOptions[0].sensorId;
            this.info.monitorPointId = monitorPointId;
          } else {
            toastr.info('没有关联传感器');
          }
        }, (response) => {
          console.log(response.data);
//                    toastr.error(response.data);
        })
      },
      /**
       * 监听“传感器”选框
       */
      getSensorId(){
        let component = this;
        $(".field").change(function () {
          let option = _.find(component.deviceOptions, function (option) {
            return option.value === component.sensorMark;
          });
          component.info.sensorId = option.sensorId;
          component.sensorId = option.sensorId;
        });
      },

      /**
       * 获取关联测点与传感器的设备参数
       * @param pointId
       * @param sensorId
       */
      getDeviceData(pointId, sensorId){
        window.mainConfig.http.getItemDevicePara(pointId, sensorId).then((response) => {
          let data = response.data;
          console.log(data);
          if (data.length > 0) {
            let vdata = data[0].vdata;
            let param = JSON.parse(vdata);
            this.info.param = param;
            this.renderAble = true;
          } else {
            this.info.param = {};
            this.renderAble = true;
          }
        }, (response) => {
          toastr.error('通信失败');
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>
