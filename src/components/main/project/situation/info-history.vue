<template>
  <div class="box box-info box-solid div-margin-bottom">
    <div class="box-body">
      <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 wrap-padding">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding">
          <div class="input-group ">
            <label class="input-group-addon addon-label">监测项</label>
            <vue-select2 :ajax=true :paging=false :multiple=false v-ref:item-selector
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
              <input id="pointGroupCheck" class="hiddenCheckbox" type="checkbox" v-model="pointGroupCheck">
              <label for="pointGroupCheck"></label>
            </span>
            <label for="pointGroup" class="input-group-addon addon-label select-label"
                   style="*margin-top: 1px;">测点点组</label>
            <vue-select2 id="pointGroup" :ajax=true :paging=false :multiple=true v-ref:point-group-selector
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
            <label for="point" class="input-group-addon addon-label select-label">测点</label>
            <vue-select2 id="point" :ajax=true :paging=false :multiple=true :allow-clear=true v-ref:point-selector
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
      <history-common-table :info.sync="info" v-if="itemMark===1 && isRender"></history-common-table><!--水位-->
      <history-common-table :info.sync="info" v-if="itemMark===2 && isRender"></history-common-table><!--内部位移-->
      <history-common-table :info.sync="info" v-if="itemMark===3 && isRender"></history-common-table><!--支撑轴力-->
      <!--<brace :info.sync="info" v-if="itemMark===3 && isRender"></brace>&lt;!&ndash;支撑轴力&ndash;&gt;-->
      <history-common-table :info.sync="info" v-if="itemMark===5 && isRender"></history-common-table><!--降雨量-->
      <history-common-table :info.sync="info" v-if="itemMark===6 && isRender"></history-common-table><!--裂缝-->
      <history-common-table :info.sync="info" v-if="itemMark===7 && isRender"></history-common-table><!--GPS-->
      <history-common-table :info.sync="info" v-if="itemMark===8 && isRender"></history-common-table><!--干滩-->
      <history-common-table :info.sync="info" v-if="itemMark===9 && isRender"></history-common-table><!--浸润线-->
      <history-common-table :info.sync="info" v-if="itemMark===10 && isRender"></history-common-table><!--浊度-->
      <history-common-table :info.sync="info" v-if="itemMark===11 && isRender"></history-common-table><!--渗流量-->
      <history-common-table :info.sync="info" v-if="itemMark===12 && isRender"></history-common-table><!--压力-->
      <history-common-table :info.sync="info" v-if="itemMark===13 && isRender"></history-common-table><!--应力-->
      <history-common-table :info.sync="info" v-if="itemMark===14 && isRender"></history-common-table><!--土壤水分-->
      <history-common-table :info.sync="info" v-if="itemMark===15 && isRender"></history-common-table><!--高程水准/沉降-->
      <history-common-table :info.sync="info" v-if="itemMark===16 && isRender"></history-common-table><!--混凝土-->
      <history-common-table :info.sync="info" v-if="itemMark===17 && isRender"></history-common-table><!--压强-->
      <history-common-table :info.sync="info" v-if="itemMark===18 && isRender"></history-common-table><!--PH-->
      <history-common-table :info.sync="info" v-if="itemMark===19 && isRender"></history-common-table><!--内部沉降-->
      <history-common-table :info.sync="info" v-if="itemMark===50 && isRender"></history-common-table><!--原始数据 湘银河-->
      <history-common-table :info.sync="info" v-if="itemMark===60 && isRender"></history-common-table><!--视频-->
      <total-station :info.sync="info" v-if="itemMark===20 && isRender"></total-station><!--全站仪位移-->
      <message :info.sync="info" v-if="itemMark===200"></message><!--消息-->
      <station-check :info.sync="info" v-if="itemMark===201"></station-check>
    </div>
  </div>
</template>
<script>
  import AnalysisEnum from '../../manager/enum/analysis-enum';
  import TableConfig from '../../manager/enum/tableConfig-enum';
  export default {
    components: {
      'vue-select2': require('../utility/vue-select2.vue'),
      'history-common-table': require('../project-situation-info-pages/history-common-table.vue'),
//      'brace': require('../project-situation-info-pages/history-brace-axial-force.vue'),
      'total-station': require('../project-situation-info-pages/history-total-station.vue'),
      'message': require('../project-situation-info-pages/history-message.vue'),
      'station-check': require('../project-situation-info-pages/history-total-station-coord-check.vue')
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
        itemMark: null,
        isRender: false, //控制v-if与页面更新
        dateCheck: false,
        pointCheck: false,
        pointGroupCheck: false,
        firstTime: true, //首次加载不触发watch
        calculateType: 1,//解算类型默认为0
        pointType: 1,//点类型默认为0
        startEndDate: {},
        currentTime: {},
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
                this.pointGroupCheck = false;
                this.dateCheck = false;
                this.itemMark = item.monitorTypeId;
                this.itemOption = AnalysisEnum.getItemMark(item.monitorTypeId);
                if (this.itemMark === 200 || this.itemMark === 201) { // 消息查询或者误差查询
                  this.isRender = true;
                } else {
                  this.$dispatch('monitorItem', item);
                  this.info.itemObj = item;
                  window.sessionUtility.setObj(window.sessionKeys.ITEMOBJ2, item);
                  this.info.itemOption = {
                    Url: this.itemOption.Url,
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
            return window.appContext.urls.getMonitorItemAndMsgQueryPage(this.projectId);
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
              this.$dispatch('monitorGroupItem', groupItem);
              this.info.pointGroupObj = _.map(data, (d) => {
                return d.obj;
              });
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.appContext.urls.selectItemRelMonitorPointGroup(this.info.itemObj.id);
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
            return window.appContext.urls.getRelPointOfItems(this.info.itemObj.id);
          }.bind(this)

        },
      };
    },
    watch: {
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
    created: function () {// 当前页面刷新
      this.$on('updateItem', function (data) {
        this.startEndDate = {};
        if (data && data.id) {
          this.info.itemObj = data;
          this.itemOption = AnalysisEnum.getItemMark(data.monitorTypeId);
          this.$refs.itemSelector.$emit('update', [{id: data.id, text: data.name, obj: data}]);
          this.itemMark = data.monitorTypeId;//= this.info.itemMark
        } else {
          this.info.itemObj = {};
          this.$refs.itemSelector.$emit('clear', true);
        }
        this.info.itemOption = {
          Url: this.itemOption.Url,
          calculateType: this.calculateType,
          pointType: this.pointType,
          mark: 1
        };
        this.initTableConfig();
      });
      this.$on('updatePointGroup', function (data) {
        if (data) {
          this.info.pointGroupObj = data;
          this.$refs.pointSelector.$emit('clear', true);
        } else {
          this.info.pointGroupObj = [];
        }
      });
      this.$on('updatePoint', function (data) {
        if (data && data.length > 0) {
          this.dateCheck = false;
          this.info.pointObj = data.slice(0, 1);
          this.$refs.pointSelector.$emit('clear', true);
        } else if (this.itemMark !== 200) {
          this.dateCheck = false;
          this.info.pointObj = [];
          this.$refs.pointSelector.$emit('clear', true);
        }
      });
    },
    mounted () {
      this.projectId = this.info.projectId = window.sessionUtility.getObj(window.sessionKeys.PROJECT).id;
      this.info = Object.assign({}, this.info);
      this.initDateRangePicker();
      this.initDateTime();
      this.initItemOption();
      this.initPointGroupOption();
      this.initPointOption();
    },
    methods: {
      initItemOption(){
        if (this.info.itemObj) {
          let item = this.info.itemObj;
          this.itemMark = item.monitorTypeId;//= this.info.itemMark
          this.itemOption = AnalysisEnum.getItemMark(item.monitorTypeId);
//          console.log(this.itemMark);
          this.monitorItems.initData.push({id: item.id, text: item.name, obj: item});
          this.initTableConfig();
          this.info.itemOption = {
            Url: this.itemOption.Url,
            calculateType: this.calculateType,
            pointType: this.pointType,
            mark: 1
          };
        }
        this.firstTime = false;
      },
      initTableConfig(){
        if (!this.info || !this.info.itemObj || !this.info.itemObj.id) {
          this.info.itemObj = window.sessionUtility.getObj(window.sessionKeys.ITEMOBJ2);
        }
        window.appContext.http.selectConfigNamesR(this.projectId, this.info.itemObj.id).then((response) => {
          let changeData = [], keepDecs = [], data = [];
          if (response.body && response.body.length > 0) {
            data = response.body;
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
            this.info.tableOption = changeData;
            this.info.keepDecs = keepDecs;
          }
          this.isRender = true;
          this.query();
        }, (response) => {
          toastr.error(response.body);
        });
      },
      initPointGroupOption(){
        this.firstTime = false;
      },
      initPointOption(){
        if (this.info.pointObj && this.info.pointObj.length > 0) {
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
        date.dateS = window.global.formatDate(objDate, 4);
        date.dateL = window.global.formatDate(objDate, 1);
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
          that.info.startEndDate.startDate.dateL = date.format('YYYY-MM-DD HH:mm:ss');
          that.info.startEndDate.startDate.dateS = date.format('YYYY-MM-DD');
          if (!that.dateCheck) that.dateCheck = true;
          that.toDate(that.info.startEndDate.startDate.dateS);
        });
        $("#dateSelect2").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          opens: 'center',
          maxDate: new Date(),
        }, function (date) {
          that.info.startEndDate.endDate.dateL = date.format('YYYY-MM-DD 23:59:59');
          that.info.startEndDate.endDate.dateS = date.format('YYYY-MM-DD');
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
        let that = this;
        $("#dateSelect2").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          opens: 'center',
          minDate: new Date(Date.parse(minDate)),//,
          maxDate: new Date(),
        }, function (date) {
          that.info.startEndDate.endDate.dateL = date.format('YYYY-MM-DD 23:59:59');
          that.info.startEndDate.endDate.dateS = date.format('YYYY-MM-DD');
          if (!that.dateCheck) {
            that.dateCheck = true;
          }
        });
      },
      query(){
        let mark = null, startDate = null, endDate = null, e = this.info;
        let pointNames, pointGroupName, allNames = [];
        if (this.pointCheck === false && this.dateCheck === false) mark = 1;
        if (this.pointCheck === true && this.dateCheck === false) mark = 2;
        if (this.pointCheck === false && this.dateCheck === true) mark = 3;
        if (this.pointCheck === true && this.dateCheck === true) mark = 4;
        switch (mark) {
          case 1://select all
            startDate = '1000-01-01 0:0:0';
            endDate = '9999-12-31 23:59:59';
            e.itemOption.pointNames = [];
//            e.itemOption.pointGroupName = [];
            /*后台的根据item查询写好后,此行可注释掉,用ItemId*/
//            e.itemOption.keepDecs = this.info.keepDec;
            break;
          case 2://ByPoint
            startDate = '1000-01-01 0:0:0';
            endDate = '9999-12-31 23:59:59';
            pointNames = _.map(e.pointObj, (d) => d.name);
            pointGroupName = _.map(e.pointGroupObj, (d) => d.name);
            e.itemOption.pointNames = pointNames.concat(pointGroupName);
            break;
          case 3://ByTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            e.itemOption.pointNames = [];
            break;
          case 4://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            pointNames = _.map(e.pointObj, (d) => d.name);
            pointGroupName = _.map(e.pointGroupObj, (d) => d.name);
            e.itemOption.pointNames = pointNames.concat(pointGroupName);
            break;
        }
        for (let i = 0; i < e.itemOption.pointNames.length; i++) {
          let a = e.itemOption.pointNames[i].replace(/\+/g, '%2B').replace(/\+/g, ' %20').replace(/\+/g, '%2F').replace(/\+/g, '%3F')
            .replace(/\+/g, '%25').replace(/\+/g, '%23').replace(/\+/g, '%26').replace(/\+/g, '%3D');
          allNames.push(a);
        }
        e.itemOption.mark = mark;
        this.$broadcast('filterTable', {
          Url: e.itemOption.Url,
          projectId: e.projectId,
          monitorItemId: e.itemObj.id,
          pointNames: allNames,
          pointGroupName: e.itemOption.pointGroupName,
          startDate: startDate,
          endDate: endDate,
          mark: e.itemOption.mark,
          calculateType: e.itemOption.calculateType, // 全站仪
          pointType: e.itemOption.pointType,// 全站仪
        });
      },
      queryAll(){
        let startDate = '1000-01-01 00:00:00', endDate = '9999-12-31 23:59:59', e = this.info;
        this.$broadcast('filterTable', {
          Url: e.itemOption.Url,
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
