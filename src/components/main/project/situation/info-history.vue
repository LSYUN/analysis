<template>
  <div>
    <div class="box box-info box-solid div-margin-bottom">
      <div class="box-body">
        <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 wrap-padding">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding">
            <div class="input-group ">
              <label class="input-group-addon addon-label">监测项</label>
              <vue-select2 :ajax=true :paging=false :multiple=false ref="itemSlt"
                           :ajax-url="itemOption.ajaxUrl"
                           :init-data="itemOption.initData"
                           :result-add="itemOption.resultAdd"
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
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding" v-if="itemType===3 && isRender">
            <div class="input-group">
            <span class="input-group-addon">
              <input id="groupCheck" class="hiddenCheckbox" type="checkbox" v-model="groupCheckD">
              <label for="groupCheck"></label>
            </span>
              <label class="input-group-addon addon-label select-label" style="*margin-top: 1px;">测点点组</label>
              <vue-select2 :ajax=true :paging=false :multiple=true ref="groupSlt"
                           :ajax-url="groupOption.ajaxUrl"
                           :init-data="groupOption.initData"
                           :placeholder="groupOption.placeholder"
                           :evt-selected="groupOption.evtSelected">
              </vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding" v-if="itemType !==200 || itemType !==16">
            <div class="input-group">
            <span class="input-group-addon">
              <input id="pointCheck" class="hiddenCheckbox" type="checkbox" v-model="pointCheckD">
              <label for="pointCheck"></label>
            </span>
              <label class="input-group-addon addon-label select-label">测点</label>
              <vue-select2 :ajax=true :paging=false :multiple=true :allow-clear=true ref="pointSlt"
                           :ajax-url="pointOption.ajaxUrl"
                           :init-data="pointOption.initData"
                           :placeholder="pointOption.placeholder"
                           :evt-selected="pointOption.evtSelected">
              </vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding" v-if="itemType===20 && isRender">
            <div class="input-group" style="line-height:35px;">
              <label for="calculateType" class="input-group-addon addon-label">数据类型</label>
              <select class="form-control type-select" v-model="calculateType" id="calculateType">
                <option value="0">极坐标数据</option>
                <option value="1" selected>解算数据</option>
              </select>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding" v-if="itemType===20 && isRender">
            <div class="input-group">
              <label for="pointType" class="input-group-addon addon-label">测点类型</label>
              <select class="form-control type-select" v-model="pointType" id="pointType">
                <option value="0">控制点</option>
                <option value="1" selected>监测点</option>
                <!--<option value="2" style="display: none;">联测点</option>-->
              </select>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 wrap-padding">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding">
            <button class="btn btn-info" v-on:click.capture="query()" id="query">查询</button>
          </div>
        </div>
        <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 wrap-padding">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding">
            <button class="btn btn-info" v-on:click.capture="queryAll()">查询全部</button>
          </div>
        </div>
      </div>
    </div>
    <div class="min-wrapper">
      <base-table v-if="itemType!==200 && itemType!==201" :info="info" :paging="true"></base-table>
      <!--&lt;!&ndash;<brace v-if="itemType===3 && isRender"></brace>&lt;!&ndash;支撑轴力&ndash;&gt;&ndash;&gt;-->
      <!--<total-station v-if="itemType===20 && isRender"></total-station>&lt;!&ndash;全站仪位移&ndash;&gt;-->
      <!--<message v-if="itemType===200"></message>&lt;!&ndash;消息&ndash;&gt;-->
      <!--<station-check v-if="itemType===201"></station-check>-->
    </div>
  </div>
</template>
<script>
  import {bus} from '../../../../managers/utils/bus';
  import {mapState, mapGetters} from 'vuex';
  import AnalysisEnum from '../../../../managers/enum/analysis-enum';
  import TableConfig from '../../../../managers/enum/tableConfig-enum';
  import baseTable from './info-history-table/base-table.vue'
  export default {
    components: {
      'base-table': baseTable,
//      'brace': require('../project-situation-info-pages/history-brace-axial-force.vue'),
//      'total-station': require('./info-history-table/total-station.vue'),
//      'message': require('./info-history-table/message.vue'),
//      'station-check': require('./info-history-table/total-station-coord-check.vue')
    },
    data () {
      return {
        info: {},
        projectId: {},
        itemType: null,
        isRender: false, //控制v-if与页面更新
        dateCheckD: '',
        groupCheckD: '',
        pointCheckD: '',
        dateObj: {
//          start: '',
//          end: ''
        },
        groupObj: [],
        pointObj: [],
        firstTime: true, //首次加载不触发watch
        calculateType: 1,//解算类型默认为0
        pointType: 1,//点类型默认为0
//        currentTime: {},
//        tableOption: [],
//        keepDecs: [],
        itemOption: {
          initData: [],
          placeholder: '请选择监测项',
          resultAdd: [{
            id: 'stationCoordCheck',
            name: '测站自检',
            monitorTypeId: 201,
            projectId: window.session.getObj(window.sessionKeys.PROJECT).id,
          }],
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              let item = data[0].obj;
              if (item) {
//                this.pointCheck = false;
//                this.groupCheck = false;
//                this.dateCheck = false;
                this.itemType = item.monitorTypeId;
                let request = AnalysisEnum.getItemMark(item.monitorTypeId);
                if (this.itemType === 200 || this.itemType === 201) { // 消息查询或者误差查询
                  this.isRender = true;
                } else {
//                  this.$emit('monitorItem', item);//用于控制点名选框的获取与渲染
                  this.$store.commit('setItemObj1', item);
                  this.request = {
                    url: request.url,
                    mark: 1
                  };
                  this.initTableConfig();
                }
              }
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorItemAndMsgQueryPage(this.projectId);
          }.bind(this)
        },
        groupOption: {
          initData: [],
          placeholder: '请选择测点点组',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.groupCheckD = true;
              this.$store.commit('setGroupCheck', this.groupCheckD);
//              let groupItem = data[0].obj;
//              this.$dispatch('monitorGroupItem', groupItem);
//              this.groupObj = _.map(data, (d) => {
//                return d.obj;
//              });
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
            this.$store.commit('setPointCheck', this.pointCheckD);
            this.pointObj = _.map(data, (d) => d.obj);
            this.pointCheckD = this.pointObj.length > 0;
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getRelPointOfItems(this.itemObj1.id);
          }.bind(this)

        },
      };
    },
    computed: {
      itemObj1: {
        set: function (obj) {
        },
        get: function () {
          return this.$store.getters.getItemObj1;
        }
      },
//      groupObj(){
//        return this.$store.getters.getItemObj2;
//      },
      pointObj1(){
        return this.$store.getters.getPointObj1;
      },
      startDate(){
        return this.$store.getters.getStartDate;
      },
      endDate(){
        return this.$store.getters.getEndDate;
      },
      dateCheck: {
        set: function () {
        },
        get: function () {
          this.dateCheckD = this.dateCheckD !== '' ? this.dateCheckD : this.$store.getters.getPointCheck;
          return this.dateCheckD;
        }
      },
      pointCheck: {
        set: function () {
        },
        get: function () {
          this.pointCheckD = this.pointCheckD !== '' ? this.pointCheckD : this.$store.getters.getPointCheck;
          return this.pointCheckD;
        }
      },
    },
    watch: {
      'calculateType': function (e) {
        if (!this.firstTime) {
          this.request.calculateType = e;
        }
      },
      'pointType': function (e) {
        if (!this.firstTime) {
          this.request.pointType = e;
        }
      },
//      'dateCheck': function (e) {
//        this.dateCheck = e;
//      }
    },
    created: function () {// 当前页面刷新
      const _this = this;
      bus.$on('updateItem1', function () {
        _this.initItemOption();
      });
//      bus.$on('updateGroup', function (data) {
//        if (data) {
//          _this.pointGroupObj = data;
//          _this.$refs.pointSlt.clear(true);
//        } else {
//          _this.pointGroupObj = [];
//        }
//      });
//      bus.$on('updatePoint1', function (data) {
//        if (data && data.length > 0) {
//          _this.dateCheck = false;
//          _this.pointObj = data.slice(0, 1);
//          if (_this.$refs.pointSlt) _this.$refs.pointSlt.update(data);
//        } else if (_this.itemType !== 200) {
//          _this.dateCheck = false;
//          _this.pointObj = [];
//          _this.$refs.pointSlt.clear(true);
//        }
//      });
    },
    mounted () {
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
//      this.info = Object.assign({}, this.info);
      this.initDatePicker();
//      this.initDateTime();
      this.initItemOption();
      this.initGroupOption();
//      this.initPointOption();
    },
    methods: {
      /***
       * 初始化监测项选项, this.itemObj1 自动从$store中获取
       */
      initItemOption(){
        if (this.itemObj1 && this.itemObj1.hasOwnProperty('id')) {
          let item = Object.assign({}, this.itemObj1);
          let request = AnalysisEnum.getItemMark(item.monitorTypeId);
          this.itemType = item.monitorTypeId;
          if (this.$refs.itemSlt) this.$refs.itemSlt.update([{id: item.id, text: item.name, obj: item}]);
          this.initTableConfig();
          this.request = {
            url: request.url,
            calculateType: this.calculateType,
            pointType: this.pointType,
            mark: 1
          };
        }
      },
      /***
       * 初始化点组选项
       */
      initGroupOption(){
        this.firstTime = false;
      },
      /***
       * 初始化测点选项
       */
      initPointOption(){
//        if (this.pointObj && this.pointObj.length > 0) {
//          this.dateCheck = false;
//        }
      },
      /***
       * 获取用户配置监测项下的内容, 用于表格绘制
       */
      initTableConfig(){
        window.mainConfig.http.selectConfigNamesR(this.projectId, this.itemObj1.id).then((response) => {
          let tableOption = [], keepDecs = [], data = [];
          if (response.data && response.data.length > 0) {
            data = response.data;
          } else {
            toastr.options.timeOut = '15000';
            toastr.options.closeButton = true;
            toastr.info('显示配置尚未设置, 可到"工程项目登记" -> "编辑" -> "监测项目配置"列表下设置');
            data = TableConfig.getTableConfig(this.itemType);
          }
          if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].visibility) {
                tableOption.push({
                  title: data[i].historyTitle,
                  data: data[i].property,
                });
                keepDecs.push({
                  keepDec: data[i].keepDec,
                });
              }
            }
            this.request.tableOption = tableOption;
            this.request.keepDecs = keepDecs;
          }
          this.query();
        }, (response) => {
          toastr.error(response.data);
        });
      },
      /***
       * 请求条件整理,改变this.info ,触发子组件监听事件,并向后台请求数据
       */
      query(){
        let mark = null, startDate = null, endDate = null;
        let pointNames, groupNames, allNames = [];
        if (this.pointCheck === false && this.dateCheck === false) mark = 1;
        if (this.pointCheck === true && this.dateCheck === false) mark = 2;
        if (this.pointCheck === false && this.dateCheck === true) mark = 3;
        if (this.pointCheck === true && this.dateCheck === true) mark = 4;
        switch (mark) {
          case 1://select all
            startDate = '1000-01-01 0:0:0';
            endDate = '9999-12-31 23:59:59';
            break;
          case 2://ByPoint
            startDate = '1000-01-01 0:0:0';
            endDate = '9999-12-31 23:59:59';
            pointNames = _.map(this.pointObj, (d) => encodeURIComponent(d.name));
            groupNames = _.map(this.groupObj, (d) => encodeURIComponent(d.name));
            allNames = pointNames.concat(groupNames);
            break;
          case 3://ByTime
            startDate = this.dateObj.start;
            endDate = this.dateObj.end;
            break;
          case 4://ByPointAndTime
            startDate = this.dateObj.start;
            endDate = this.dateObj.end;
            pointNames = _.map(this.pointObj, (d) => encodeURIComponent(d.name));
            groupNames = _.map(this.groupObj, (d) => encodeURIComponent(d.name));
            allNames = pointNames.concat(groupNames);
            break;
          default:
            mark = 1;
            startDate = '1000-01-01 00:00:00';
            endDate = '9999-12-31 23:59:59';
        }
        let request = {
          projectId: this.projectId,
          itemId: this.itemObj1.id,
          mark: mark,
          url: this.request.url,
          pointNames: pointNames,
          groupName: groupNames,
          allNames: allNames,
          startDate: startDate,
          endDate: endDate,
          calculateType: this.calculateType, // 全站仪
          pointType: this.pointType,// 全站仪
          tableOption: this.request.tableOption,
          keepDecs: this.request.keepDecs
        };
        this.info = Object.assign({}, request);
      },
      queryAll(){
        this.pointCheckD = false;
        this.dateCheckD = false;
        this.query();
      },
      /***
       * 获取初始查询时间段
       * @returns {{}}
       */
      getDefaultTime(){/*获取最近一万点时间段*/
        let startEndDate = {};
        let eDate = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);//这是获取当前时间
        let sDate = new Date(eDate.getTime() - 10 * 24 * 60 * 60 * 1000 + 1000);//当前时间的前10日
        startEndDate.startDate = this.formatDate(sDate);//转换成日期格式
        startEndDate.endDate = this.formatDate(eDate);
        return startEndDate;
      },
      /***
       * 转换时间格式
       */
      formatDate(objDate){
        let date = {};
        date.dateS = window.globalTool.formatDate(objDate, 4);
        date.dateL = window.globalTool.formatDate(objDate, 1);
        return date;
      },
      /***
       * 初始化日期控件
       */
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
          if (!_this.dateCheckD && _this.dateObj.end) _this.dateCheckD = true;
          _this.dateObj.start = date.startDate.format('YYYY-MM-DD 00:00:00');
        }).on('cancel.daterangepicker', function () {
          $("#dateSelect1").val(start);
          _this.dateCheckD = false;
          _this.dateObj.start = '';
        }).val(start);

        $("#dateSelect2").daterangepicker(option).on('apply.daterangepicker', function (ev, date) {
          if (!_this.dateCheckD && _this.dateObj.start) _this.dateCheckD = true;
          _this.dateObj.end = date.startDate.format('YYYY-MM-DD 23:59:59');
        }).on('cancel.daterangepicker', function () {
          $("#dateSelect2").val(end);
          _this.dateCheckD = false;
          _this.dateObj.end = '';
        }).val(end);
      },
      /***
       *
       */
      initDateTime(){
        if (!this.startEndDate) {
          this.startEndDate = this.getDefaultTime();
          this.startEndDate.startDate.dateL = '1000-01-01 00:00:00';
          this.startEndDate.endDate.dateL = "9999-12-31 23:59:59";
        } else if (this.$store.state.situation.dateCheck) {
          this.dateCheck = this.$store.state.situation.dateCheck;
          this.startEndDate = this.$store.state.situation.startEndDate;
        }
        if (!this.startEndDate.startDate) {
          $("#dateSelect1").val('开始日期');
          $("#dateSelect2").val('结束日期');
        } else {
          $("#dateSelect1").val(this.startEndDate.startDate.dateS);
          $("#dateSelect2").val(this.startEndDate.endDate.dateS);
        }
      },
      /***
       *
       * @param minDate
       */
      toDate(minDate){
        let that = this;
        $("#dateSelect2").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          opens: 'center',
          minDate: new Date(Date.parse(minDate)),
          maxDate: new Date(),
        }, function (date) {
          that.startEndDate.endDate.dateL = date.format('YYYY-MM-DD 23:59:59');
          that.startEndDate.endDate.dateS = date.format('YYYY-MM-DD');
          if (!that.dateCheck) {
            that.dateCheck = true;
          }
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import url('../../../../assets/css/pre-situation.scss');
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

  .btn-info {
    width: 80px;
    float: right;
  }

  /*.min-wrapper {*/
  /*position: relative;*/
  /*width: inherit;*/
  /*min-width: 550px;*/
  /*min-height: inherit;*/
  /*}*/

  .min-wrapper {
    width: inherit;
    /*min-width: 550px;*/
  }

  #app .select-box {
    margin: 3px 3px 10px 0;
    padding-left: 0;
    padding-right: 0;
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
