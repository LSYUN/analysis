<template>
  <div>
    <div class="box box-info box-solid div-margin-bottom">
      <div class="box-body">
        <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 wrap-padding">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding">
            <div class="input-group ">
              <label class="input-group-addon addon-label">监测项</label>
              <vue-select2 :ajax=true :paging=false :multiple=false ref="itemSlt"
                           :ajax-url="monitorItems.ajaxUrl"
                           :init-data="monitorItems.initData"
                           :result-add="monitorItems.resultAdd"
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
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding" v-if="itemMark===3 && isRender">
            <div class="input-group">
            <span class="input-group-addon">
              <input id="groupCheck" class="hiddenCheckbox" type="checkbox" v-model="groupCheck">
              <label for="groupCheck"></label>
            </span>
              <label class="input-group-addon addon-label select-label" style="*margin-top: 1px;">测点点组</label>
              <vue-select2 :ajax=true :paging=false :multiple=true ref="pointGroupSlt"
                           :ajax-url="monitorPointGroups.ajaxUrl"
                           :init-data="monitorPointGroups.initData"
                           :placeholder="monitorPointGroups.placeholder"
                           :evt-selected="monitorPointGroups.evtSelected">
              </vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding" v-if="itemMark !==200 || itemMark !==16">
            <div class="input-group">
            <span class="input-group-addon">
              <input id="pointCheck" class="hiddenCheckbox" type="checkbox" v-model="pointCheck">
              <label for="pointCheck"></label>
            </span>
              <label class="input-group-addon addon-label select-label">测点</label>
              <vue-select2 :ajax=true :paging=false :multiple=true :allow-clear=true ref="pointSlt"
                           :ajax-url="monitorPoints.ajaxUrl"
                           :init-data="monitorPoints.initData"
                           :placeholder="monitorPoints.placeholder"
                           :evt-selected="monitorPoints.evtSelected">
              </vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding" v-if="itemMark===20 && isRender">
            <div class="input-group" style="line-height:35px;">
              <label for="calculateType" class="input-group-addon addon-label">数据类型</label>
              <select class="form-control type-select" v-model="calculateType" id="calculateType">
                <option value="0">极坐标数据</option>
                <option value="1" selected>解算数据</option>
              </select>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding" v-if="itemMark===20 && isRender">
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
      <div class="min-size">
        <common-table ref="child"></common-table><!--水位-->
        <!--<common-table v-if="itemMark===2 && isRender"></common-table>&lt;!&ndash;内部位移&ndash;&gt;-->
        <!--<common-table v-if="itemMark===3 && isRender"></common-table>&lt;!&ndash;支撑轴力&ndash;&gt;-->
        <!--&lt;!&ndash;<brace v-if="itemMark===3 && isRender"></brace>&lt;!&ndash;支撑轴力&ndash;&gt;&ndash;&gt;-->
        <!--<common-table v-if="itemMark===5 && isRender"></common-table>&lt;!&ndash;降雨量&ndash;&gt;-->
        <!--<common-table v-if="itemMark===6 && isRender"></common-table>&lt;!&ndash;裂缝&ndash;&gt;-->
        <!--<common-table v-if="itemMark===7 && isRender"></common-table>&lt;!&ndash;GPS&ndash;&gt;-->
        <!--<common-table v-if="itemMark===8 && isRender"></common-table>&lt;!&ndash;干滩&ndash;&gt;-->
        <!--<common-table v-if="itemMark===9 && isRender"></common-table>&lt;!&ndash;浸润线&ndash;&gt;-->
        <!--<common-table v-if="itemMark===10 && isRender"></common-table>&lt;!&ndash;浊度&ndash;&gt;-->
        <!--<common-table v-if="itemMark===11 && isRender"></common-table>&lt;!&ndash;渗流量&ndash;&gt;-->
        <!--<common-table v-if="itemMark===12 && isRender"></common-table>&lt;!&ndash;压力&ndash;&gt;-->
        <!--<common-table v-if="itemMark===13 && isRender"></common-table>&lt;!&ndash;应力&ndash;&gt;-->
        <!--<common-table v-if="itemMark===14 && isRender"></common-table>&lt;!&ndash;土壤水分&ndash;&gt;-->
        <!--<common-table v-if="itemMark===15 && isRender"></common-table>&lt;!&ndash;高程水准/沉降&ndash;&gt;-->
        <!--<common-table v-if="itemMark===16 && isRender"></common-table>&lt;!&ndash;混凝土&ndash;&gt;-->
        <!--<common-table v-if="itemMark===17 && isRender"></common-table>&lt;!&ndash;压强&ndash;&gt;-->
        <!--<common-table v-if="itemMark===18 && isRender"></common-table>&lt;!&ndash;PH&ndash;&gt;-->
        <!--<common-table v-if="itemMark===19 && isRender"></common-table>&lt;!&ndash;内部沉降&ndash;&gt;-->
        <!--<common-table v-if="itemMark===50 && isRender"></common-table>&lt;!&ndash;原始数据 湘银河&ndash;&gt;-->
        <!--<common-table v-if="itemMark===60 && isRender"></common-table>&lt;!&ndash;视频&ndash;&gt;-->
        <!--<total-station v-if="itemMark===20 && isRender"></total-station>&lt;!&ndash;全站仪位移&ndash;&gt;-->
        <!--<message v-if="itemMark===200"></message>&lt;!&ndash;消息&ndash;&gt;-->
        <!--<station-check v-if="itemMark===201"></station-check>-->
      </div>
    </div>

  </div>
</template>
<script>
  import {bus} from '../../../../managers/utils/bus';
  import {mapState, mapGetters} from 'vuex';
  import AnalysisEnum from '../../../../managers/enum/analysis-enum';
  import TableConfig from '../../../../managers/enum/tableConfig-enum';
  import commonTable from './info-history-table/common-table.vue'
  export default {
    components: {
      'common-table': commonTable,
//      'brace': require('../project-situation-info-pages/history-brace-axial-force.vue'),
//      'total-station': require('./info-history-table/total-station.vue'),
//      'message': require('./info-history-table/message.vue'),
//      'station-check': require('./info-history-table/total-station-coord-check.vue')
    },
    computed: {},
    data () {
      return {
        projectId: {},
        itemMark: null,
        isRender: false, //控制v-if与页面更新
        dateCheck: false,
        pointCheck: false,
        groupCheck: false,
        firstTime: true, //首次加载不触发watch
        calculateType: 1,//解算类型默认为0
        pointType: 1,//点类型默认为0
        startEndDate: {},
        currentTime: {},
        itemObj: {},
        pointObj: [],
        groupObj: [],
        itemOption: {},
        tableOption: [],
        keepDecs: [],
        monitorItems: {
          initData: [],
          placeholder: '请选择监测项',
          resultAdd: [{
            id: 'stationCoordCheck',
            name: '测站自检',
            monitorTypeId: 201,
            projectId: this.projectId,
          }],
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              let item = data[0].obj;
              if (item) {
                this.isRender = false;
                this.pointCheck = false;
                this.groupCheck = false;
                this.dateCheck = false;
                this.itemMark = item.monitorTypeId;
                this.itemOption = AnalysisEnum.getItemMark(item.monitorTypeId);
                if (this.itemMark === 200 || this.itemMark === 201) { // 消息查询或者误差查询
                  this.isRender = true;
                } else {
                  this.$emit('monitorItem', item);
                  this.itemObj = item;
                  window.session.setObj(window.sessionKeys.ITEMOBJ2, item);
                  this.itemOption = {
                    url: this.itemOption.url,
                    calculateType: this.calculateType,
                    pointType: this.pointType,
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
        monitorPointGroups: {
          initData: [],
          placeholder: '请选择测点点组',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.groupCheck = true;
              this.isRender = true;
              let groupItem = data[0].obj;
              this.$dispatch('monitorGroupItem', groupItem);
              this.groupObj = _.map(data, (d) => {
                return d.obj;
              });
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.selectItemRelMonitorPointGroup(this.itemObj.id);
          }.bind(this)
        },
        monitorPoints: {
          initData: [],
          placeholder: '请选择测点',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.pointCheck = true;
              this.pointObj = _.map(data, (d) => {
                return d.obj;
              });
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getRelPointOfItems(this.itemObj.id);
          }.bind(this)

        },
      };
    },
    watch: {
      'calculateType': function (e) {
        if (!this.firstTime) {
          this.itemOption.calculateType = e;
        }
      },
      'pointType': function (e) {
        if (!this.firstTime) {
          this.itemOption.pointType = e;
        }
      },
      'dateCheck': function (e) {
        this.dateCheck = e;
      }
    },
    created: function () {// 当前页面刷新
      const _this = this;
      bus.$on('updateItem1', function (data) {
        _this.startEndDate = {};
        let option;
        if (data && data.id) {
          _this.itemMark = data.monitorTypeId;
          _this.itemObj = data;
          option = AnalysisEnum.getItemMark(data.monitorTypeId);
          if (_this.$refs.itemSlt) _this.$refs.itemSlt.update([{id: data.id, text: data.name, obj: data}]);
        } else {
          _this.itemObj = {};
          _this.$refs.itemSlt.clear(true);
        }
        _this.itemOption = {
          url: option.url,
          calculateType: _this.calculateType,
          pointType: _this.pointType,
          mark: 1
        };
        _this.initTableConfig();
      });
      bus.$on('updateGroup', function (data) {
        if (data) {
          _this.pointGroupObj = data;
          _this.$refs.pointSlt.clear(true);
        } else {
          _this.pointGroupObj = [];
        }
      });
      bus.$on('updatePoint1', function (data) {
        if (data && data.length > 0) {
          _this.dateCheck = false;
          _this.pointObj = data.slice(0, 1);
          if (_this.$refs.pointSlt) _this.$refs.pointSlt.update(data);
        } else if (_this.itemMark !== 200) {
          _this.dateCheck = false;
          _this.pointObj = [];
          _this.$refs.pointSlt.clear(true);
        }
      });
    },
    mounted () {
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
//      console.log(this.$store.state.situation.itemObj1);
//      this.info = Object.assign({}, this.info);
      this.initDateRangePicker();
      this.initDateTime();
//      this.initItemOption();
//      this.initPointGroupOption();
//      this.initPointOption();
    },
    methods: {
      initItemOption(){
        if (this.itemObj) {
          let item = this.itemObj;
          this.itemMark = item.monitorTypeId;//= this.itemMark
          this.itemOption = AnalysisEnum.getItemMark(item.monitorTypeId);
//          console.log(this.itemMark);
          this.monitorItems.initData.push({id: item.id, text: item.name, obj: item});
          this.initTableConfig();
          this.itemOption = {
            url: this.itemOption.url,
            calculateType: this.calculateType,
            pointType: this.pointType,
            mark: 1
          };
        }
        this.firstTime = false;
      },
      initTableConfig(){
        if (!this.itemObj || !this.itemObj.id) {
          this.itemObj = window.session.getObj(window.sessionKeys.ITEMOBJ2);
          return;
        }
        window.mainConfig.http.selectConfigNamesR(this.projectId, this.itemObj.id).then((response) => {
          let changeData = [], keepDecs = [], data = [];
          if (response.data && response.data.length > 0) {
            data = response.data;
          } else {
            toastr.options.timeOut = '15000';
            toastr.options.closeButton = true;
            toastr.info('显示配置尚未设置, 可到"工程项目登记" -> "编辑" -> "监测项目配置"列表下设置');
            data = TableConfig.getTableConfig(this.itemMark);
          }
          if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].visibility) {
                changeData.push({
                  title: data[i].historyTitle,
                  data: data[i].property,
                });
                keepDecs.push({
                  keepDec: data[i].keepDec,
                });
              }
            }
            this.$store.state.table.tableOption = changeData;
            this.$store.state.table.keepDecs = keepDecs;
          }
          this.isRender = true;
          this.query();
        }, (response) => {
          toastr.error(response.data);
        });
      },
      initPointGroupOption(){
        this.firstTime = false;
      },
      initPointOption(){
        if (this.pointObj && this.pointObj.length > 0) {
          this.dateCheck = false;
        }
      },
      getDefaultTime(){/*获取最近一万点时间段*/
        let startEndDate = {};
        let eDate = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);//这是获取当前时间
        let sDate = new Date(eDate.getTime() - 10 * 24 * 60 * 60 * 1000 + 1000);//当前时间的前10日
        startEndDate.startDate = this.formatDate(sDate);//转换成日期格式
        startEndDate.endDate = this.formatDate(eDate);
        return startEndDate;
      },
      //转换的函数
      formatDate(objDate){
        let date = {};
        date.dateS = window.globalTool.formatDate(objDate, 4);
        date.dateL = window.globalTool.formatDate(objDate, 1);
        return date;
      },
      /*初始化日期控件*/
      initDateRangePicker(){
        let that = this;
        $("#dateSelect1").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          opens: 'center',
          maxDate: new Date(),
        }, function (date) {
          that.startEndDate.startDate.dateL = date.format('YYYY-MM-DD HH:mm:ss');
          that.startEndDate.startDate.dateS = date.format('YYYY-MM-DD');
          if (!that.dateCheck) that.dateCheck = true;
          that.toDate(that.startEndDate.startDate.dateS);
        });
        $("#dateSelect2").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          opens: 'center',
          maxDate: new Date(),
        }, function (date) {
          that.startEndDate.endDate.dateL = date.format('YYYY-MM-DD 23:59:59');
          that.startEndDate.endDate.dateS = date.format('YYYY-MM-DD');
          if (!that.dateCheck) that.dateCheck = true;
        });
        $('#dateSelect1').on('cancel.daterangepicker', function (ev, picker) {
          $("#dateSelect1").val('请选择日期');
        });
        $('#dateSelect2').on('cancel.daterangepicker', function (ev, picker) {
          $("#dateSelect2").val('请选择日期');
        });
      },
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
      query(){
        let mark = null, startDate = null, endDate = null;
        let pointNames, groupNames, allNames = [];
        if (this.pointCheck === false && this.dateCheck === false) mark = 1;
        if (this.pointCheck === true && this.dateCheck === false) mark = 2;
        if (this.pointCheck === false && this.dateCheck === true) mark = 3;
        if (this.pointCheck === true && this.dateCheck === true) mark = 4;
        switch (this.itemOption.mark) {
          case 1://select all
            startDate = '1000-01-01 0:0:0';
            endDate = '9999-12-31 23:59:59';
//            pointNames = [];
//            groupNames = [];
//            allNames = pointNames.concat(pointGroupName);
            break;
          case 2://ByPoint
            startDate = '1000-01-01 0:0:0';
            endDate = '9999-12-31 23:59:59';
            pointNames = _.map(this.pointObj, (d) => encodeURIComponent(d.name));
            groupNames = _.map(this.groupObj, (d) => encodeURIComponent(d.name));
            allNames = pointNames.concat(groupNames);
            break;
          case 3://ByTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
//            pointNames = [];
//            groupNames = [];
//            allNames = pointNames.concat(pointGroupName);
            break;
          case 4://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            pointNames = _.map(this.pointObj, (d) => encodeURIComponent(d.name));
            groupNames = _.map(this.groupObj, (d) => encodeURIComponent(d.name));
            allNames = pointNames.concat(groupNames);
//            e.itemOption.pointNames = pointNames.concat(pointGroupName);
            break;
          default:

        }
        let itemOption = {
          projectId: this.projectId,
          itemId: this.itemObj.id,
          mark: mark,
          url: this.itemOption.url,
          pointNames: pointNames,
          groupName: groupNames,
          allNames: allNames,
          startDate: startDate,
          endDate: endDate,
          calculateType: this.calculateType, // 全站仪
          pointType: this.pointType,// 全站仪
        };
//        console.log(this.$refs);
//        bus.$emit('filterTable', itemOption);
        this.$refs.child.init(itemOption);
      },
      queryAll(){
        let startDate = '1000-01-01 00:00:00', endDate = '9999-12-31 23:59:59', e = this.info;
        this.$emit('filterTable', {
          url: e.itemOption.url,
          projectId: e.projectId,
          monitorItemId: e.itemObj.id,
          pointNames: e.itemOption.pointNames,
          pointGroupName: e.itemOption.pointGroupName,
          startDate: startDate,
          endDate: endDate,
          mark: 1,
          calculateType: e.itemOption.calculateType, // 全站仪
          pointType: e.itemOption.pointType,// 全站仪
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

  /*.min-size {*/
  /*position: relative;*/
  /*width: inherit;*/
  /*min-width: 550px;*/
  /*min-height: inherit;*/
  /*}*/

  .min-size {
    width: inherit;
    padding: 5px;
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
