<template>
  <div class="box box-info box-solid div-margin-bottom">
    <div class="box-body">
      <div class="form-group">
        <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 wrap-padding">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding">
            <div class="input-group ">
              <label for="monitorItem" class="input-group-addon addon-label">监测项</label>
              <vue-select2 id="monitorItem" :ajax=true :paging=false :multiple=false v-ref:item-selector
                           :ajax-url="monitorItems.ajaxUrl"
                           :init-data="monitorItems.initData"
                           :placeholder="monitorItems.placeholder"
                           :evt-selected="monitorItems.evtSelected"></vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding">
            <div class="input-group">
              <span class="input-group-addon">
                <input id="dateCheck" class="hiddenCheckbox" type="checkbox" v-model="dateCheck">
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
               v-if="itemMark==2 || itemMark==16 && isRender">
            <div id="toggleHide">
              <div class="input-group">
                <span class="input-group-addon">
                  <input id="pointGroupCheck" class="hiddenCheckbox" type="checkbox" v-model="pointGroupCheck">
                  <label for="pointGroupCheck"></label>
                </span>
                <label for="pointGroup" class="input-group-addon addon-label select-label">测点点组</label>
                <vue-select2 id="pointGroup" :ajax=true :paging=false :multiple=false v-ref:point-group-selector
                             :ajax-url="monitorPointGroups.ajaxUrl"
                             :init-data="monitorPointGroups.initData"
                             :placeholder="monitorPointGroups.placeholder"
                             :evt-selected="monitorPointGroups.evtSelected">
                </vue-select2>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding" id="toggleShow" v-if="itemMark !=16">
            <div class="input-group">
              <span class="input-group-addon">
                <input id="pointCheck" class="hiddenCheckbox" type="checkbox" v-model="pointCheck">
                <label for="pointCheck"></label>
              </span>
              <label for="point" class="input-group-addon addon-label select-label" style="*margin-top: 1px;">测点</label>
              <vue-select2 id="point" :ajax=true :paging=false :multiple=true :allow-clear=true v-ref:point-selector
                           :ajax-url="monitorPoints.ajaxUrl"
                           :init-data="monitorPoints.initData"
                           :placeholder="monitorPoints.placeholder"
                           :evt-selected="monitorPoints.evtSelected">
              </vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 wrap-padding"
               v-if="itemMark!=5 && itemMark!=7 && itemMark!=20">
            <div class="input-group" id="showTypes">
              <label for="showType" class="input-group-addon addon-label">显示类型</label>
              <select id="showType" class="form-control" v-model="attrValue">
                <option v-for="option in attrOption" :value="option.value" :selected="option.selected">
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 wrap-padding" v-if="itemMark===20 && isRender">
            <div class="input-group">
              <label for="dataType" class="input-group-addon addon-label">数据类型</label>
              <select id="dataType" class="form-control type-select" v-model="calculateType">
                <option value=0>极坐标数据</option>
                <option value=1 selected="selected">解算数据</option>
              </select>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding" v-if="itemMark===20 && isRender">
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
      <img src="/static/image/spinner_B.gif" class="loadingImg "/>
      <water-level :info.sync="info" v-if="itemMark===1 && isRender"></water-level><!--水位-->
      <in-displacement :info.sync="info" v-if="itemMark===2 && isRender"></in-displacement><!--内部位移 -->
      <brace :info.sync="info" v-if="itemMark===3 && isRender"></brace><!--支撑轴力-->
      <ombrometer :info.sync="info" v-if="itemMark===5 && isRender"></ombrometer><!--降雨量-->
      <joint :info.sync="info" v-if="itemMark===6 && isRender"></joint><!--裂缝-->
      <surface-gps :info.sync="info" v-if="itemMark===7 && isRender"></surface-gps><!--GPS-->
      <dry-shoal :info.sync="info" v-if="itemMark===8 && isRender"></dry-shoal><!--干滩-->
      <saturation :info.sync="info" v-if="itemMark===9 && isRender"></saturation><!--浸润线-->
      <turbidity :info.sync="info" v-if="itemMark===10 && isRender"></turbidity><!--浊度-->
      <seepage :info.sync="info" v-if="itemMark===11 && isRender"></seepage><!--渗流量-->
      <stress :info.sync="info" v-if="itemMark===12 && isRender"></stress><!--压力-->
      <strain :info.sync="info" v-if="itemMark===13 && isRender"></strain><!--应力-->
      <soil-moisture :info.sync="info" v-if="itemMark===14 && isRender"></soil-moisture><!--土壤水分-->
      <water-elevation :info.sync="info" v-if="itemMark===15 && isRender"></water-elevation><!--高程水准/沉降-->
      <concrete-brace :info.sync="info" v-if="itemMark===16 && isRender"></concrete-brace><!--混凝土支撑-->
      <pressure :info.sync="info" v-if="itemMark===17 && isRender"></pressure><!--压强-->
      <ph :info.sync="info" v-if="itemMark===18 && isRender"></ph><!--PH-->
      <in-settlement :info.sync="info" v-if="itemMark===19 && isRender"></in-settlement><!--内部沉降-->
      <total-station :info.sync="info" v-if="itemMark===20 && isRender"></total-station><!--全站仪位移-->
      <data-sensor :info.sync="info" v-if="itemMark===50 && isRender"></data-sensor><!--原始数据 湘银河-->
    </div>
  </div>
</template>
<script>
  import '../../../../assets/css/pre-situation.scss';
  import AnalysisEnum from '../../managers/enum/analysis-enum';
  export default {
    components: {
      'water-level': require('../project-situation-info-pages/analysis-water-level.vue'),
      'in-displacement': require('../project-situation-info-pages/analysis-in-displacement.vue'),
      'clinometer-hole': require('../project-situation-info-pages/analysis-clinometer-hole.vue'),
      'brace': require('../project-situation-info-pages/analysis-brace-axial-force.vue'),
      'ombrometer': require('../project-situation-info-pages/analysis-ombrometer.vue'),
      'joint': require('../project-situation-info-pages/analysis-jointmeter.vue'),
      'surface-gps': require('../project-situation-info-pages/analysis-surface-GPS.vue'),
      'dry-shoal': require('../project-situation-info-pages/analysis-dry-shoal.vue'),
      'saturation': require('../project-situation-info-pages/analysis-saturation.vue'),
      'turbidity': require('../project-situation-info-pages/analysis-turbidity.vue'),
      'seepage': require('../project-situation-info-pages/analysis-seepage.vue'),
      'stress': require('../project-situation-info-pages/analysis-stress.vue'),
      'strain': require('../project-situation-info-pages/analysis-strain.vue'),
      'soil-moisture': require('../project-situation-info-pages/analysis-soil-moisture.vue'),
      'water-elevation': require('../project-situation-info-pages/analysis-water-elevation.vue'),
      'concrete-brace': require('../project-situation-info-pages/analysis-concrete-brace.vue'),
      'pressure': require('../project-situation-info-pages/analysis-pressure.vue'),
      'ph': require('../project-situation-info-pages/analysis-PH.vue'),
      'in-settlement': require('../project-situation-info-pages/analysis-in-settlement.vue'),
      'total-station': require('../project-situation-info-pages/analysis-total-station.vue'),
      'data-sensor': require('../project-situation-info-pages/analysis-data-sensor.vue'),
    },
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        projectId: {},
        dateCheck: false,
        pointCheck: false,
        pointGroupCheck: false,
        calculateType: 1,//解算类型默认为0
        pointType: 1,//点类型默认为1
        startEndDate: {},
        timeout: null,
        firstTime: true, //首次加载不触发watch
        itemOption: {},  //AnalysisEnum.getItemMark(Name,DataType)
        attrOption: [],  //itemOption.DataType
        attrValue: null,//itemOption.DataType.value
        attrText: null, //itemOption.DataType.text
        attrUnit: null,  //itemOption.DataType.unit
        isRender: false,
        itemMark: null,
        monitorItems: {
          initData: [],
          placeholder: '请选择监测项',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              let item = data[0].obj;
              this.isRender = false;
              this.pointCheck = false;
              this.dateCheck = false;
//              this.pointGroupCheck = false;
              this.info.itemObj = item;
              this.$dispatch('monitorItem', item);
              this.$broadcast('refresh', item);
              this.itemMark = item.monitorTypeId;
              this.itemOption = AnalysisEnum.getItemMark(item.monitorTypeId);
              this.attrOption = this.itemOption.DataType;
              this.attrValue = this.attrOption[0].value;
              this.attrText = this.attrOption[0].text;
              this.attrUnit = this.attrOption[0].unit;
              this.info.itemOption = {
                Url: this.itemOption.Url,
                attrValue: this.attrValue,
                attrText: this.attrText,
                attrUnit: this.attrUnit,
                calculateType: this.calculateType,
                pointType: this.pointType,
                mark: 1
              };
              this.info.itemMark = this.itemMark;
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
              this.pointGroupCheck = true;
              this.isRender = true;
              let groupItem = data[0].obj;
              this.info.pointGroupObj = groupItem;
              this.monitorGroupId = this.info.pointGroupObj.id;
//              console.log(this.info.pointGroupObj);
              this.$dispatch('monitorGroupItem', groupItem);
              this.info.pointGroupObj = _.map(data, (d) => {
                return d.obj;
              });
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
            if (data && data.length > 0) {
              this.pointCheck = true;
              this.info.pointObj = _.map(data, (d) => {
                return d.obj;
              });
            }
          }.bind(this),
          ajaxUrl: function () {
            if (this.info.pointGroupObj && this.info.pointGroupObj.length > 0) {
              return window.mainConfig.url.selectByGroupIdPoint(this.info.pointGroupObj.id);
            } else {
              return window.mainConfig.url.getRelPointOfItems(this.info.itemObj.id);
            }
          }.bind(this)
        }
      };
    },
    watch: {
      'attrValue': function (e) {
        if (!this.firstTime) {
          let obj = _.find(this.attrOption, function (type) {
            return type.value === e;
          });
          this.attrText = obj.text;
          this.attrUnit = obj.unit;
          this.info.itemOption = {
            Url: this.itemOption.Url,
            attrValue: this.attrValue,
            attrText: this.attrText,
            attrUnit: this.attrUnit,
            calculateType: this.calculateType,
            pointType: this.pointType,
            mark: 1
          };
        }
      },
      'calculateType': function (e) {
        if (!this.firstTime) {
          this.info.itemOption.calculateType = e;
        }
      },
      'pointType': function (e) {
        if (!this.firstTime) {
          this.info.itemOption.pointType = e;
        }
      },
      'dateCheck': function (e) {
        this.info.dateCheck = e;
      }
    },
    route: {
      deactivate: function (transition) {
        clearInterval(this.timeout);
//        transition.next;
        setTimeout(transition.next, 10);
      }
    },
    created: function () {
      this.$on('updateItem', function (data) {
        this.startEndDate = {};
        if (data) {
          this.itemOption = AnalysisEnum.getItemMark(data.monitorTypeId);
          this.attrOption = this.itemOption.DataType;
          this.attrValue = this.attrOption[0].value;
          this.attrText = this.attrOption[0].text;
          this.attrUnit = this.attrOption[0].unit;
          this.info.itemOption = {
            Url: this.itemOption.Url,
            mark: 1,
            attrValue: this.attrValue,
            attrText: this.attrText,
            attrUnit: this.attrUnit,
            calculateType: this.calculateType,
            pointType: this.pointType
          };
          this.$refs.itemSelector.$emit('update', [{id: data.id, text: data.name, obj: data}]);
          this.itemMark = data.monitorTypeId;       // 监测项(子组件)渲染条件一
        } else {
          this.info.itemObj = {};
          this.$refs.itemSelector.clear(true);
        }
      });
      this.$on('updatePointGroup', function (data) {
        if (data) {
          let self = this;
          this.info.pointGroupObj = data;
          this.monitorGroupId = this.info.pointGroupObj.id;
//         let timeout=setTimeout(function () {
//            clearTimeout(timeout);
//         })
          this.$refs.pointSelector.clear(true);
//          this.$refs.pointGroupSelector.$emit('update', [{id: data.id, text: data.name, obj: data}]);
        } else {
          this.info.pointGroupObj = {};
//          this.$refs.pointGroupSelector.clear(true);
//          this.isRender = true;
        }
      });
      this.$on('updatePoint', function (data) {
        if (data.length !== 0) {
          this.info.pointObj = data.slice(0, 1);
          this.$refs.pointSelector.clear(true);
//          this.$refs.pointSelector.$emit('update', [{id: data[0].id, text: data[0].name, obj: data[0]}]);
          this.isRender = true; // 监测项(子组件)渲染条件二
        } else {
          this.info.pointObj = [];
//          this.$refs.pointSelector.clear(true);
          this.isRender = true; // 监测项(子组件)渲染条件二
        }
      });
    },
    mounted () {
      this.projectId = this.info.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
      this.info = Object.assign({}, this.info);
      this.initItemOption();
      this.initPointGropOption();
      this.initPointOption();
      this.webSocket();
      this.initDateRangePicker();
      this.initDateTime();
      console.log('加载分析页面完成');
    },
    methods: {
      initItemOption(){
        if (this.info.itemObj) {
          let item = this.info.itemObj;
          this.itemMark = item.monitorTypeId; //render child condition 1
          this.itemOption = AnalysisEnum.getItemMark(item.monitorTypeId);
          this.attrOption = this.itemOption.DataType;
          this.attrValue = this.attrOption[0].value;
          this.attrText = this.attrOption[0].text;
          this.attrUnit = this.attrOption[0].unit;
          this.info.itemOption = {
            Url: this.itemOption.Url,
            mark: 1,
            attrValue: this.attrValue,
            attrText: this.attrText,
            attrUnit: this.attrUnit,
            calculateType: this.calculateType,
            pointType: this.pointType
          };
          this.monitorItems.initData.push({id: item.id, text: item.name, obj: item});
          this.isRender = true;
        }
        this.firstTime = false;
      },
      initPointGropOption(){
        if (this.info.pointGroupObj) {
//          let pointGroup = this.info.pointGroupObj;
//          console.log(this.info.pointGroupObj.id);
//          this.monitorPointGroups.initData.push({id: pointGroup.id, text: pointGroup.name, obj: pointGroup})
          this.isRender = true;
        }
        this.firstTime = false;
      },
      initPointOption(){
        if (this.info.pointObj && this.info.pointObj.length > 0) {
//          this.dateCheck = true;
          this.dateCheck = false;
          let point = this.info.pointObj;
//          this.monitorPoints.initData.push({id: point[0].id, text: point[0].name, obj: point[0]});  //只显示一个测点数据
          this.isRender = true;//render child condition 2
        }
      },
      query(){
        let mark = null, startDate = null, endDate = null, e = this.info;
        if (this.pointCheck === false && this.dateCheck === false && this.pointGroupCheck === false) {
          mark = 1;
        }
        if (this.pointCheck === true && this.dateCheck === false && this.pointGroupCheck === false) {
          mark = 2;
        }
        if (this.pointCheck === false && this.dateCheck === true && this.pointGroupCheck === false) {
          mark = 3;
        }
        if (this.pointCheck === true && this.dateCheck === true && this.pointGroupCheck === false) {
          mark = 4
        }
        if (this.itemMark === 2) {
          if (this.pointGroupCheck === false && this.dateCheck === false && this.pointCheck === false) {
            mark = 5;
          }
        }
        if (this.pointGroupCheck === true && this.dateCheck === false && this.pointCheck === false) {
          mark = 6;
        }
        if (this.pointGroupCheck === false && this.dateCheck === true && this.pointCheck === false) {
          mark = 7;
        }
        if (this.pointGroupCheck === true && this.dateCheck === true && this.pointCheck === false) {
          mark = 8;
        }
        switch (mark) {
          case 1://select all
            startDate = '1000-01-01 0:0:0';
            endDate = '9999-12-31 23:59:59';
            e.itemOption.pointNames = [];//_.map(e.pointObj, (d) => (d.name));
            e.itemOption.pointGroupName = [];
            break;
          case 2://ByPoint
            startDate = '1000-01-01 0:0:0';
            endDate = '9999-12-31 23:59:59';
            e.itemOption.pointNames = _.map(e.pointObj, function (d) {
              return d.name;
            });
            e.itemOption.pointGroupName = _.map(e.pointGroupObj, function (a) {
              return a.name;
            });
            break;
          case 3://ByTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            e.itemOption.pointNames = [];// _.map(e.pointObj, (d) => (d.name));
            e.itemOption.pointGroupName = [];
            break;
          case 4://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            e.itemOption.pointNames = _.map(e.pointObj, (d) => (d.name));
            e.itemOption.pointGroupName = _.map(e.pointGroupObj, (d) => (d.name));
            break;
          case 5://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            e.itemOption.pointNames = [];
//            e.monitorGroupId = this.info.pointGroupObj.id;
            e.monitorGroupId = this.monitorGroupId;
            break;
          case 6://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            e.itemOption.pointNames = [];
//            e.monitorGroupId = this.info.pointGroupObj.id;
            e.monitorGroupId = this.monitorGroupId;
            break;
          case 7://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            e.itemOption.pointNames = [];
//            e.monitorGroupId = this.info.pointGroupObj.id;
            e.monitorGroupId = this.monitorGroupId;
            break;
          case 8://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            e.itemOption.pointNames = [];
//            e.monitorGroupId = this.info.pointGroupObj.id;
            e.monitorGroupId = this.monitorGroupId;
            break;
        }
        this.info.itemOption.mark = mark;
        let pointNames = [];
        for (let i = 0; i < e.itemOption.pointNames.length; i++) {
          let a = e.itemOption.pointNames[i].replace(/\+/g, '%2B').replace(/\+/g, ' %20').replace(/\+/g, '%2F').replace(/\+/g, '%3F')
            .replace(/\+/g, '%25').replace(/\+/g, '%23').replace(/\+/g, '%26').replace(/\+/g, '%3D');
          pointNames.push(a);
        }
        this.$broadcast('filterChart', {
          Url: e.itemOption.Url,
          projectId: e.projectId,
          monitorItemId: e.itemObj.id,
          mark: e.itemOption.mark,
          itemId: e.itemObj.id,                     // 查全部
          pointNames: pointNames,
          pointGroupName: e.itemOption ? e.itemOption.pointGroupName : null,
          startDate: startDate,
          endDate: endDate,
          attrText: e.itemOption.attrText,
          attrValue: e.itemOption.attrValue,
          attrUnit: e.itemOption.attrUnit,
          calculateType: e.itemOption.calculateType, // 全站仪
          pointType: e.itemOption.pointType, // 全站仪
//          monitorGroupId: e.pointGroupObj ? e.pointGroupObj.id : null
          monitorGroupId: e.monitorGroupId,
        });
      },
      queryAll(){
        let startDate = null, endDate = null, e = this.info;
        startDate = '1000-01-01 0:0:0';
        endDate = '9999-12-31 23:59:59';
        this.$broadcast('filterChart', {
          Url: e.itemOption.Url,
          projectId: e.projectId,
          monitorItemId: e.itemObj.id,
          mark: 1,
          itemId: e.itemObj.id,                     // 查全部
          pointNames: e.itemOption.pointNames,
          pointGroupName: e.itemOption.pointGroupName,
          startDate: startDate,
          endDate: endDate,
          attrText: e.itemOption.attrText,
          attrValue: e.itemOption.attrValue,
          attrUnit: e.itemOption.attrUnit,
          calculateType: e.itemOption.calculateType, // 全站仪
          pointType: e.itemOption.pointType, // 全站仪
          monitorGroupId: e.pointGroupObj ? e.pointGroupObj.id : null
        });
      },
      webSocket(){
//        console.log(window.WebSocket);
        if (window.WebSocket) {
          //更改WebSocket的projectId
          let encodeURIStr = window.mainConfig.wsUrls.getRealDataWebSockPage(this.projectId);
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
              if (this.itemMark === dict.monitorTypeCode) {
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
      initDateRangePicker(){
        let component = this;
        $("#dateSelect1").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          opens: 'center',
          maxDate: new Date(),
        }, function (date) {
          component.info.startEndDate.startDate.dateL = date.format('YYYY-MM-DD HH:mm:ss');
          component.info.startEndDate.startDate.dateS = date.format('YYYY-MM-DD');
          if (!component.dateCheck) component.dateCheck = true;
          component.toDate(component.info.startEndDate.startDate.dateS);
        });
        $("#dateSelect2").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          opens: 'center',
          maxDate: new Date(),
        }, function (date) {
          component.info.startEndDate.endDate.dateL = date.format('YYYY-MM-DD 23:59:59');
          component.info.startEndDate.endDate.dateS = date.format('YYYY-MM-DD');
          if (!component.dateCheck) component.dateCheck = true;
        });
        $('#dateSelect1').on('cancel.daterangepicker', function (ev, picker) {
          $("#dateSelect").val('请选择日期');
        });
        $('#dateSelect2').on('cancel.daterangepicker', function (ev, picker) {
          $("#dateSelect").val('请选择日期');
        });
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
        date.dateS = window.global.formatDate(objDate, 4);
        date.dateL = window.global.formatDate(objDate, 1);
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
    min-width: 550px;
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

