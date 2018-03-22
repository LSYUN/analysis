<template>
  <div>
    <div class="box box-info box-solid div-margin-bottom">
      <div class="box-body">
        <div class="form-group">
          <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 wrap-padding">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding">
              <div class="input-group ">
                <label class="input-group-addon addon-label">监测项</label>
                <vue-select2 :ajax=true :paging=false :multiple=false ref="itemSlt"
                             :ajax-url="itemOption.ajaxUrl"
                             :init-data="itemOption.initData"
                             :placeholder="itemOption.placeholder"
                             :evt-selected="itemOption.evtSelected"></vue-select2>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding">
              <div class="input-group">
              <span class="input-group-addon">
                <input id="dateCheck" class="hiddenCheckbox" type="checkbox" v-model="dateCheckD">
                <label for="dateCheck"></label>
              </span>
                <label class="input-group-addon addon-label">日期</label>
                <span>
                <div class="col-xs-6 picker-wrapper">
                  <input id="dateSelect1" class="form-control daterangepicker" placeholder="请输入开始时间">
                </div>
                <div class="col-xs-6 picker-wrapper">
                  <input id="dateSelect2" class="form-control daterangepicker" placeholder="请输入结束时间">
                </div>
              </span>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding"
                 v-if="itemType==2 || itemType==16 && isRender">
              <div id="toggleHide">
                <div class="input-group">
                <span class="input-group-addon">
                  <input id="pointGroupCheck" class="hiddenCheckbox" type="checkbox" v-model="groupCheckD">
                  <label for="pointGroupCheck"></label>
                </span>
                  <label for="pointGroup" class="input-group-addon addon-label select-label">测点点组</label>
                  <vue-select2 :ajax=true :paging=false :multiple=false ref="groupSlt"
                               :ajax-url="groupOption.ajaxUrl"
                               :init-data="groupOption.initData"
                               :placeholder="groupOption.placeholder"
                               :evt-selected="groupOption.evtSelected">
                  </vue-select2>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding" id="toggleShow" v-if="itemType !=16">
              <div class="input-group">
              <span class="input-group-addon">
                <input id="pointCheck" class="hiddenCheckbox" type="checkbox" v-model="pointCheckD">
                <label for="pointCheck"></label>
              </span>
                <label class="input-group-addon addon-label select-label" style="*margin-top: 1px;">测点</label>
                <vue-select2 :ajax=true :paging=false :multiple=true :allow-clear=true ref="pointSlt"
                             :ajax-url="pointOption.ajaxUrl"
                             :init-data="pointOption.initData"
                             :placeholder="pointOption.placeholder"
                             :evt-selected="pointOption.evtSelected">
                </vue-select2>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 wrap-padding"
                 v-if="itemType!=5 && itemType!=7 && itemType!=20">
              <div class="input-group" id="showTypes">
                <label for="showType" class="input-group-addon addon-label">显示类型</label>
                <select id="showType" class="form-control" v-model="attrValue">
                  <option v-for="option in attrOption" :value="option.value" :selected="option.selected">
                    {{ option.text }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 wrap-padding" v-if="itemType===20 && isRender">
              <div class="input-group">
                <label for="dataType" class="input-group-addon addon-label">数据类型</label>
                <select id="dataType" class="form-control type-select" v-model="calculateType">
                  <option value=0>极坐标数据</option>
                  <option value=1 selected="selected">解算数据</option>
                </select>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding" v-if="itemType===20 && isRender">
              <div class="input-group">
                <label for="pointType" class="input-group-addon addon-label">测点类型</label>
                <select id="pointType" class="form-control type-select" v-model="pointType">
                  <option value=0>控制点</option>
                  <option value=1 selected="selected">监测点</option>
                  <!--<option value="2">联测点</option>-->
                </select>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 wrap-padding">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding">
              <button class="btn btn-info btn-block" v-on:click.capture="query()">查询</button>
            </div>
          </div>
          <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 wrap-padding">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding">
              <button class="btn btn-info btn-block" v-on:click.capture="queryAll()">查询全部</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="min-wrapper">
      <div class="min-size">
        <!--<img src="/static/image/spinner_B.gif" class="loadingImg "/>-->
        <water-level :info="info" v-if="itemType===1"></water-level><!--水位-->
        <!--<in-displacement :info.sync="info" v-if="itemType===2 && isRender"></in-displacement>&lt;!&ndash;内部位移 &ndash;&gt;-->
        <!--<brace :info.sync="info" v-if="itemType===3 && isRender"></brace>&lt;!&ndash;支撑轴力&ndash;&gt;-->
        <!--<ombrometer :info.sync="info" v-if="itemType===5 && isRender"></ombrometer>&lt;!&ndash;降雨量&ndash;&gt;-->
        <!--<joint :info.sync="info" v-if="itemType===6 && isRender"></joint>&lt;!&ndash;裂缝&ndash;&gt;-->
        <!--<surface-gps :info.sync="info" v-if="itemType===7 && isRender"></surface-gps>&lt;!&ndash;GPS&ndash;&gt;-->
        <!--<dry-shoal :info.sync="info" v-if="itemType===8 && isRender"></dry-shoal>&lt;!&ndash;干滩&ndash;&gt;-->
        <!--<saturation :info.sync="info" v-if="itemType===9 && isRender"></saturation>&lt;!&ndash;浸润线&ndash;&gt;-->
        <!--<turbidity :info.sync="info" v-if="itemType===10 && isRender"></turbidity>&lt;!&ndash;浊度&ndash;&gt;-->
        <!--<seepage :info.sync="info" v-if="itemType===11 && isRender"></seepage>&lt;!&ndash;渗流量&ndash;&gt;-->
        <!--<stress :info.sync="info" v-if="itemType===12 && isRender"></stress>&lt;!&ndash;压力&ndash;&gt;-->
        <!--<strain :info.sync="info" v-if="itemType===13 && isRender"></strain>&lt;!&ndash;应力&ndash;&gt;-->
        <!--<soil-moisture :info.sync="info" v-if="itemType===14 && isRender"></soil-moisture>&lt;!&ndash;土壤水分&ndash;&gt;-->
        <!--<water-elevation :info.sync="info" v-if="itemType===15 && isRender"></water-elevation>&lt;!&ndash;高程水准/沉降&ndash;&gt;-->
        <!--<concrete-brace :info.sync="info" v-if="itemType===16 && isRender"></concrete-brace>&lt;!&ndash;混凝土支撑&ndash;&gt;-->
        <!--<pressure :info.sync="info" v-if="itemType===17 && isRender"></pressure>&lt;!&ndash;压强&ndash;&gt;-->
        <!--<ph :info.sync="info" v-if="itemType===18 && isRender"></ph>&lt;!&ndash;PH&ndash;&gt;-->
        <!--<in-settlement :info.sync="info" v-if="itemType===19 && isRender"></in-settlement>&lt;!&ndash;内部沉降&ndash;&gt;-->
        <!--<total-station :info.sync="info" v-if="itemType===20 && isRender"></total-station>&lt;!&ndash;全站仪位移&ndash;&gt;-->
        <!--<data-sensor :info.sync="info" v-if="itemType===50 && isRender"></data-sensor>&lt;!&ndash;原始数据 湘银河&ndash;&gt;-->
      </div>
    </div>
  </div>
</template>
<script>
  import {bus} from '../../../../managers/utils/bus';
  import '../../../../assets/css/pre-situation.scss';
  import AnalysisEnum from '../../../../managers/enum/analysis-enum';
  import chart from './info-analysis-chart/water-level.vue';
  export default {
    components: {
      'water-level': chart,
//      'in-displacement': require('../project-situation-info-pages/analysis-in-displacement.vue'),
//      'clinometer-hole': require('../project-situation-info-pages/analysis-clinometer-hole.vue'),
//      'brace': require('../project-situation-info-pages/analysis-brace-axial-force.vue'),
//      'ombrometer': require('../project-situation-info-pages/analysis-ombrometer.vue'),
//      'joint': require('../project-situation-info-pages/analysis-jointmeter.vue'),
//      'surface-gps': require('../project-situation-info-pages/analysis-surface-GPS.vue'),
//      'dry-shoal': require('../project-situation-info-pages/analysis-dry-shoal.vue'),
//      'saturation': require('../project-situation-info-pages/analysis-saturation.vue'),
//      'turbidity': require('../project-situation-info-pages/analysis-turbidity.vue'),
//      'seepage': require('../project-situation-info-pages/analysis-seepage.vue'),
//      'stress': require('../project-situation-info-pages/analysis-stress.vue'),
//      'strain': require('../project-situation-info-pages/analysis-strain.vue'),
//      'soil-moisture': require('../project-situation-info-pages/analysis-soil-moisture.vue'),
//      'water-elevation': require('../project-situation-info-pages/analysis-water-elevation.vue'),
//      'concrete-brace': require('../project-situation-info-pages/analysis-concrete-brace.vue'),
//      'pressure': require('../project-situation-info-pages/analysis-pressure.vue'),
//      'ph': require('../project-situation-info-pages/analysis-PH.vue'),
//      'in-settlement': require('../project-situation-info-pages/analysis-in-settlement.vue'),
//      'total-station': require('../project-situation-info-pages/analysis-total-station.vue'),
//      'data-sensor': require('../project-situation-info-pages/analysis-data-sensor.vue'),
    },
    computed: {
      itemObj1: {
        set: function (obj) {
          this.$store.dispatch('setItemObj1', obj);
        },
        get: function () {
          return this.$store.getters.getItemObj1;
        }
      },
      groupObj: {
        set: function (obj) {
          this.$store.dispatch('setItemObj2', obj);
        },
        get: function () {
          return this.$store.getters.getItemObj2;
        }
      },
      pointObj1: {
        set: function (obj) {
          this.$store.dispatch('setPointObj1', obj);
        },
        get: function () {
          return this.$store.getters.getPointObj1;
        }
      },
      startDate: {
        set: function (obj) {
          this.$store.dispatch('setStartDate', obj);
        },
        get: function () {
          return this.$store.getters.getStartDate;
        }
      },
      endDate: {
        set: function (obj) {
          this.$store.dispatch('setEndDate', obj);
        },
        get: function () {
          return this.$store.getters.getEndDate;
        }
      },
      dateCheck: {
        set: function (obj) {
          this.$store.dispatch('setDateCheck', obj);
        },
        get: function () {
          this.dateCheckD = this.dateCheckD !== '' ? this.dateCheckD : this.$store.getters.getPointCheck;
          return this.dateCheckD;
        }
      },
      groupCheck: {
        set: function (obj) {
          this.$store.dispatch('setGroupCheck', obj);
        },
        get: function () {
          this.groupCheckD = this.groupCheckD !== '' ? this.groupCheckD : this.$store.getters.getGroupCheck;
          return this.groupCheckD;
        }
      },
      pointCheck: {
        set: function (obj) {
          this.$store.dispatch('setPointCheck', obj);
        },
        get: function () {
          this.pointCheckD = this.pointCheckD !== '' ? this.pointCheckD : this.$store.getters.getPointCheck;
          return this.pointCheckD;
        }
      },
    },
    data () {
      return {
        info: {},
        projectId: {},
        dateCheckD: false,
        pointCheckD: false,
        groupCheckD: false,
        calculateType: 1,//解算类型默认为0
        pointType: 1,//点类型默认为1
        startEndDate: {},
        timeout: null,
        firstTime: true, //首次加载不触发watch
        request: {},//AnalysisEnum.getItemMark(Name,dataType)
        attrOption: [],  //request.dataType
        attrValue: null,//request.dataType.value
        attrText: null, //request.dataType.text
        attrUnit: null,  //request.dataType.unit
        isRender: false,
        itemType: null,
        itemOption: {
          initData: [],
          placeholder: '请选择监测项',
          evtSelected: function (evt, data) {
            this.itemObj1 = data[0].obj;
            this.initItemOption();
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorItemPage_U(this.projectId);
          }.bind(this)
        },
        groupOption: {
          initData: [],
          placeholder: '请选择测点点组',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.groupCheckD = true;
              this.isRender = true;
              let groupItem = data[0].obj;
              this.groupObj = groupItem;
              this.$store.dispatch('setGroupObj', groupItem);
              this.groupObj = _.map(data, (d) => d.obj);
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.selectItemRelMonitorPointGroup(this.itemObj1.id);
          }.bind(this)
        },
        pointOption: {
          initData: [],
          placeholder: '请选择测点',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.pointCheckD = true;
              this.pointObj1 = _.map(data, (d) => d.obj);
            }
          }.bind(this),
          ajaxUrl: function () {
            if (this.groupObj && this.groupObj.length > 0) {
              return window.mainConfig.url.selectByGroupIdPoint(this.groupObj.id);
            } else {
              return window.mainConfig.url.getRelPointOfItems(this.itemObj1.id);
            }
          }.bind(this)
        }
      };
    },
    watch: {
      'attrValue': function (e) {
        if (!this.firstTime) {
          let obj = _.find(this.attrOption, (type) => type.value === e);
          this.attrText = obj.text;
          this.attrValue = obj.value;
          this.attrUnit = obj.unit;
        }
      },
//      'calculateType': function (e) {
//        if (!this.firstTime) {
//          this.request.calculateType = e;
//        }
//      },
    },
    route: {
      deactivate: function (transition) {
        clearInterval(this.timeout);
        setTimeout(transition.next, 10);
      }
    },
    created: function () {
    },
    mounted () {
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
      this.initDatePicker();
      this.initItemOption();
//      this.initGroupOption();
//      this.initPointOption();
//      this.webSocket();
//      this.info = Object.assign({}, this.info);
//      console.log('加载分析页面完成');
    },
    methods: {
      /***
       * 初始化监测项选项, this.itemObj1 自动从$store中获取
       */
      initItemOption(){
        if (this.itemObj1 && this.itemObj1.hasOwnProperty('id')) {
          this.isRender = false;
          this.dateCheckD = false;
          this.groupCheckD = false;
          this.pointCheckD = false;
          let item = Object.assign({}, this.itemObj1);
          let request = AnalysisEnum.getItemMark(item.monitorTypeId);
          this.itemType = item.monitorTypeId;
          this.attrOption = request.dataType;
          this.attrValue = this.attrOption[0].value;
          this.attrText = this.attrOption[0].text;
          this.attrUnit = this.attrOption[0].unit;
          if (this.$refs.itemSlt) this.$refs.itemSlt.update([{id: item.id, text: item.name, obj: item}]);
          this.request = {
            url: request.url,
            attrValue: this.attrValue,
            attrText: this.attrText,
            attrUnit: this.attrUnit,
            calculateType: this.calculateType,
            pointType: this.pointType,
            mark: 1
          };
          this.query();
        } else {
          if (this.$refs.itemSlt) this.$refs.itemSlt.update([{id: null}]);
        }
      },
      initGroupOption(){
        if (this.groupObj && this.groupObj.id) {
          let group = this.groupObj;
          if (this.$refs.groupSlt) this.$refs.groupSlt.update([{id: group.id, text: group.name, obj: group}]);
          this.isRender = true;
        }
        this.firstTime = false;
      },
      initPointOption(){
        if (this.pointObj1 && this.pointObj1.length > 0) {
          let pointList = this.pointObj1.map((obj, idx) => {

            return {id: obj.id, text: obj.name, obj: obj}
          });
          if (this.$refs.pointSlt) this.$refs.pointSlt.update(pointList);
          this.isRender = true;
        }
      },
      query(){
        let mark = null, startDate = null, endDate = null;
        let pointNames = _.map(this.pointObj1, (d) => encodeURIComponent(d.name)),
          groupNames = _.map(this.groupObj, (d) => encodeURIComponent(d.name)),
          allNames = pointNames.concat(groupNames);
        if (this.pointCheck === false && this.dateCheck === false && this.groupCheck === false) mark = 1;
        if (this.pointCheck === true && this.dateCheck === false && this.groupCheck === false) mark = 2;
        if (this.pointCheck === false && this.dateCheck === true && this.groupCheck === false) mark = 3;
        if (this.pointCheck === true && this.dateCheck === true && this.groupCheck === false) mark = 4;
        if (this.itemType === 2) {
          if (this.groupCheck === false && this.dateCheck === false && this.pointCheck === false) mark = 5;
          if (this.groupCheck === true && this.dateCheck === false && this.pointCheck === false) mark = 6;
          if (this.groupCheck === false && this.dateCheck === true && this.pointCheck === false) mark = 7;
          if (this.groupCheck === true && this.dateCheck === true && this.pointCheck === false) mark = 8;
        }
        switch (mark) {
          case 1://select all point
            startDate = '1000-01-01 00:00:00';
            endDate = '9999-12-31 23:59:59';
            pointNames = [];
            groupNames = [];
            break;
          case 2://by point
            startDate = '1000-01-01 00:00:00';
            endDate = '9999-12-31 23:59:59';
            break;
          case 3://by time
            startDate = this.startDate;
            endDate = this.endDate;
            pointNames = [];
            groupNames = [];
            break;
          case 4://by point and time
            startDate = this.startDate;
            endDate = this.endDate;
            break;
          case 5://select all group
            startDate = '1000-01-01 00:00:00';
            endDate = '9999-12-31 23:59:59';
            break;
          case 6://by group
            startDate = '1000-01-01 00:00:00';
            endDate = '9999-12-31 23:59:59';
            break;
          case 7://by time
            startDate = this.startDate;
            endDate = this.endDate;
            break;
          case 8://by group and time
            startDate = this.startDate;
            endDate = this.endDate;
            break;
        }
        let request = {
          url: this.request.url,
          projectId: this.projectId,
          itemId: this.itemObj1.id,
          groupId: this.groupObj && this.groupObj.id ? this.groupObj.id : '',
          mark: mark,
          pointNames: pointNames,
          groupName: groupNames,
          startDate: startDate,
          endDate: endDate,
          attrText: this.attrText,
          attrValue: this.attrValue,
          attrUnit: this.attrUnit,
          calculateType: this.calculateType, // 全站仪
          pointType: this.pointType, // 全站仪
        };
        this.info = Object.assign({}, request);
      },
      queryAll(){
        this.pointCheckD = false;
        this.dateCheckD = false;
        this.query();
      },
      webSocket(){
//        console.log(window.WebSocket);
        if (window.WebSocket) {
          //更改WebSocket的projectId
          let encodeURIStr = window.mainConfig.wsUrl.getRealDataWebSockPage(this.projectId);
          let webSocket = new WebSocket(encodeURI(encodeURIStr));
          webSocket.onopen = function (evt) {
            //链接建立
            console.log('链接建立');
            window.onbeforeunload = function () {
              webSocket.close();
            }
          };
          webSocket.onerror = function () {
            //连接失败
            console.log('链接发生错误');
            toastr.error('链接发生错误');
          };
          webSocket.onclose = function () {
            //连接断开
            console.log('链接关闭');
          };
          webSocket.onmessage = function (msg) {
//            console.log(msg);
            if (window.location.hash !== '#!/project/situationInfo/analysis') {
              webSocket.close();
              return;
            }
            //消息接收
            let data = JSON.parse(msg.data);
            if (data.commandKey === 'RealtimeData') {
              let dict = JSON.parse(data.dict.RealtimeData);
//              console.log(dict);
              if (this.itemType === dict.monitorTypeCode) {
                if (dict.jsonData) {
                  let jsonData = JSON.parse(dict.jsonData);
//                  console.log(jsonData);
                  this.$broadcast('updateChart', jsonData, this.attrValue);
                }

              }
            }
          }.bind(this);
        }
        else {
          console.log('该浏览器不能接收消息');
        }
      },
      updateChart(){
        let times = 0;
        this.timeout = setInterval(function () {
          this.$broadcast('updateChart', [new Date().getTime(), Math.round(Math.random() * 10)]);
          times++;
          if (times > 10) clearInterval(this.timeout);
        }.bind(this), 1000);
      },
      initDatePicker(){
        let _this = this, start = '开始时间', end = '结束时间';
        let option = {
          singleDatePicker: true,
          showDropdowns: true,
          opens: 'center',
          maxDate: new Date(),
          timePicker: true,
          timePickerIncrement: 1,
          timePicker24Hour: true,
          locale: {
            format: 'YYYY-MM-DD',// HH:mm:ss
            applyLabel: "应用",
            cancelLabel: "取消",
            resetLabel: "重置",
          }
        };
        $("#dateSelect1").daterangepicker(option).on('apply.daterangepicker', function (ev, date) {
          if (!_this.dateCheckD && _this.endDate && typeof _this.endDate === 'string') _this.dateCheckD = true;
          _this.startDate = date.startDate.format('YYYY-MM-DD 00:00:00');
        }).on('cancel.daterangepicker', function () {
          $("#dateSelect1").val(start);
          _this.dateCheckD = false;
          _this.startDate = '';
        }).val(start);

        $("#dateSelect2").daterangepicker(option).on('apply.daterangepicker', function (ev, date) {
          if (!_this.dateCheckD && _this.startDate && typeof _this.startDate === 'string') _this.dateCheckD = true;
          _this.endDate = date.startDate.format('YYYY-MM-DD 23:59:59');
        }).on('cancel.daterangepicker', function () {
          $("#dateSelect2").val(end);
          _this.dateCheckD = false;
          _this.endDate = '';
        }).val(end);
      },


      initDateTime(){
        if (!this.info.startEndDate) {
          this.info.startEndDate = this.getDefaultTime();
          this.info.startEndDate.startDate.dateL = '1000-01-01 00:00:00';
          this.info.startEndDate.endDate.dateL = "9999-12-31 23:59:59";
        } else if (this.info.dateCheck) {
          this.dateCheck = this.info.dateCheck;
          this.startEndDate = this.info.startEndDate;
        }
        if (!this.startEndDate.startDate) {
          $("#dateSelect1").val('开始日期');
          $("#dateSelect2").val('结束日期');
        } else {
          $("#dateSelect1").val(this.startEndDate.startDate.dateS);
          $("#dateSelect2").val(this.startEndDate.endDate.dateS);
        }
      },
      toDate(minDate){
        let component = this;
        $("#dateSelect2").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          opens: 'center',
          minDate: new Date(Date.parse(minDate)),
          maxDate: new Date(),
        }, function (date) {
          component.info.startEndDate.endDate.dateL = date.format('YYYY-MM-DD 23:59:59');
          component.info.startEndDate.endDate.dateS = date.format('YYYY-MM-DD');
          if (!component.dateCheck) {
            component.dateCheck = true;
          }
        });
      },
      getDefaultTime(){/*获取最近一万点时间段*/
        let startEndDate = {};
        let eDate = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
        let sDate = new Date(eDate.getTime() - 10 * 24 * 60 * 60 * 1000 + 1000);//10日
        startEndDate.startDate = this.formatDate(sDate);
        startEndDate.endDate = this.formatDate(eDate);
        return startEndDate;
      },
      formatDate(objDate){
        let date = {};
        date.dateS = window.globalTool.formatDate(objDate, 4);
        date.dateL = window.globalTool.formatDate(objDate, 1);
        return date;
      },
    }
  };
</script>

<style lang="scss" scoped>

  /*"监测项"选框*/
  .input-group-addon {
    border: solid rgba(61, 155, 179, 0.56);
    border-width: 1px 0 1px 1px;
    border-radius: 5px 0 0 5px;
  }

  .daterangepicker {
    position: initial;
    border-radius: 5px;
    border: solid rgba(61, 155, 179, 0.56) 1px;
    color: #00aadd;
    /*margin-top: 0;*/
  }

  .min-wrapper {
    position: relative;
    width: inherit;
    min-height: 50vh;
    border: 1px solid rgba(61, 155, 179, 0.56);
    border-radius: 5px;
    /*overflow-x: scroll;*/
  }

  .min-size {
    position: relative;
    width: inherit;
    min-width: inherit;
    min-height: inherit;
  }

   .loadingImg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .btn-info {
    width: 80px;
    float: right;
  }

  #app .select-box {
    margin-bottom: 10px;
    padding-left: 0;
    padding-right: 0;
    margin-top: 3px;
  }

  @media screen and(max-width: 768px) {
    .btn-info {
      margin-left: auto;
      margin-right: auto;
      display: inherit;
      float: right;
    }

    #app .select-box {
      margin-top: 0;
      margin-bottom: 5px;
    }
  }
</style>

