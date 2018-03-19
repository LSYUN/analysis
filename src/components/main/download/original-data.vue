<template>
  <div>
    <div class="box box-info box-solid div-margin-bottom">
      <div class="box-body">
        <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 wrap-padding">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding">
            <div class="input-group ">
              <label class="input-group-addon addon-label" for="project">工程名称</label>
              <vue-select2 :ajax="true" :paging="false" :multiple="false" v-ref:project-slt id="project"
                           :ajax-url="projectOptions.ajaxUrl"
                           :placeholder="projectOptions.placeholder"
                           :evt-selected="projectOptions.evtSelected"
                           :init-data="projectOptions.initData"></vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding">
            <div class="input-group ">
              <label class="input-group-addon addon-label" for="monitorItem">监测项</label>
              <vue-select2 :ajax=true :paging=false :multiple=false v-ref:item-slt id="monitorItem"
                           :ajax-url="monitorItems.ajaxUrl"
                           :init-data="monitorItems.initData"
                           :placeholder="monitorItems.placeholder"
                           :evt-selected="monitorItems.evtSelected"></vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding">
            <div class="input-group">
              <span class="input-group-addon"><input type="checkbox" v-model="dateSelect"></span>
              <label class="input-group-addon addon-label">日期</label>
              <!--<input class="daterangepicker form-control" id="historyDateSelect" placeholder="请选择日期">-->
              <span>
                <div class="col-xs-6" style="padding-right: 0;padding-left: 0;">
                <input id="historyDateSelect1" class="form-control  datepicker" placeholder="请输入开始时间" style="text-align: center;">
                </div>
                <div class="col-xs-6" style="padding-right: 0;padding-left: 0;">
                <input id="historyDateSelect2" class="form-control datepicker" placeholder="请输入结束时间" style="text-align: center;">
                </div>
              </span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding" v-if="itemMark===3&& isRender">
            <div class="input-group">
              <span class="input-group-addon"><input type="checkbox" id="pointGroup" v-model="pointGroupSelect"></span>
              <label for="pointGroup" class="input-group-addon addon-label checkbox" style="*margin-top: 1px;">测点点组</label>
              <vue-select2 :ajax=true :paging=false :multiple=true v-ref:point-group-selector
                           :ajax-url="monitorPointGroups.ajaxUrl"
                           :init-data="monitorPointGroups.initData"
                           :placeholder="monitorPointGroups.placeholder"
                           :evt-selected="monitorPointGroups.evtSelected">
              </vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding" v-if="itemMark !==200"
               v-show="itemMark !==16">
            <div class="input-group">
              <span class="input-group-addon"><input type="checkbox" id="point" v-model="pointSelect"></span>
              <label class="input-group-addon addon-label" for="point">测点</label>
              <vue-select2 :ajax=true :paging=false :multiple=true :allow-clear=true v-ref:point-selector
                           :ajax-url="monitorPoints.ajaxUrl"
                           :init-data="monitorPoints.initData"
                           :placeholder="monitorPoints.placeholder"
                           :evt-selected="monitorPoints.evtSelected">
              </vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding" v-if="itemMark===20 && isRender">
            <div class="input-group" style="line-height:35px;">
              <label class="input-group-addon addon-label">数据类型</label>
              <select class="form-control type-select" v-model="calculateType">
                <option value="0">极坐标数据</option>
                <option value="1" selected>解算数据</option>
              </select>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 wrap-padding" v-if="itemMark===20 && isRender">
            <div class="input-group">
              <label class="input-group-addon addon-label">测点类型</label>
              <select class="form-control type-select" v-model="pointType">
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
  </div>
</template>
<script>
  import ReportEnum from '../../managers/enum/report-enum';
  import GlobalEnum from '../../managers/enum/global-enum';
  import LayerExtend from '../../../static/plugins/layui/extend/layui.ext';
  import AnalysisEnum from '../../managers/enum/analysis-enum';
  import TableConfig from '../../managers/enum/tableConfig-enum';
  export default {
    components: {
      'history-common-table': require('../project-situation-info-pages/history-common-table.vue'),
//      'brace': require('../project-situation-info-pages/history-brace-axial-force.vue'),
      'total-station': require('../project-situation-info-pages/history-total-station.vue'),
      'message': require('../project-situation-info-pages/history-message.vue'),
      'station-check': require('../project-situation-info-pages/history-total-station-coord-check.vue'),
    },
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        pathKey: 'originalData',
        accountId: null,
        infos: [],
        dataTable: {},
        projectId: {},
        projectName: null,
        monitorItemId: null,
        monitorItemName: null,
        monitorTypeId: null,
        monitorTypeName: null,
        itemOption: {},  //AnalysisEnum.getItemMark(Name,dataType)
        attrOption: [],  //itemOption.dataType
        attrValue: null,//itemOption.dataType.value
        attrText: null, //itemOption.dataType.text
        attrUnit: null, //itemOption.dataType.unit
        itemMark: null,
        isRender: false, //控制v-if与页面更新
        dateSelect: false,
//        dateSelect: true,
        pointSelect: false,
        pointGroupSelect: false,
        firstTime: true, //首次加载不触发watch
        calculateType: 1,//解算类型默认为0
        pointType: 1,//点类型默认为0
        startEndDate: {},
        currentTime: {},
        projectOptions: {
          initData: [],
          placeholder: '工程选择',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              let d = data[0];
              window.session.setObj(window.sessionKeys.PROJECT, d.obj);
              this.projectId = d.id;
              this.projectName = d.text;
              this.info.projectId = d.id;
              this.$refs.itemSlt.clear(true);      //清空监测项
//              this.$refs.attrSlt.$emit('clear');      //清空数据类型
//              this.$refs.attrSlt.$emit('changeLocal', []);//清空数据类型
              this.attrValue = null;                  //清空显示类型
              this.attrUnit = null;                  //清空单位
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getProjectPage_U(this.accountId);
          }.bind(this)
        },
        monitorItems: {
          initData: [],
          placeholder: '监测项选择',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              let item = data[0].obj;
              if (item) {
                this.isRender = false;
                this.pointSelect = false;
                this.pointGroupSelect = false;
                this.dateSelect = false;
                this.itemMark = item.monitorTypeId;
                this.itemOption = AnalysisEnum.getItemMark(item.monitorTypeId);
                if (this.itemMark === 200 || this.itemMark === 201) { // 消息查询或者误差查询
                  this.isRender = true;
                } else {
                  this.$dispatch('monitorItem', item);
                  this.info.itemObj = item;
                  window.session.setObj(window.sessionKeys.ITEMOBJ2, item);
                  this.initTableConfig();
                  if (this.itemMark === 16) {
                    this.info.itemOption = {
                      url: this.itemOption.url,
                      calculateType: this.calculateType,
                      pointType: this.pointType,
                      mark: 5
                    };
                  } else {
                    this.info.itemOption = {
                      url: this.itemOption.url,
                      calculateType: this.calculateType,
                      pointType: this.pointType,
                      mark: 1
                    };
                  }

                }
//                this.isRender = true;
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
//            console.log(data);
            if (data && data.length > 0) {
              this.pointGroupSelect = true;
              this.isRender = true;
              let groupItem = data[0].obj;
              this.info.pointGroupObj = groupItem;
              this.$dispatch('monitorGroupItem', groupItem);
              this.info.pointGroupObj = _.map(data, (d) => {
//                console.log(d);
                return d.obj;
              });
//              console.log(groupItem);
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
              this.pointSelect = true;
              this.info.pointObj = _.map(data, (d) => {
//                console.log(d);
                return d.obj;
              });
            }
          }.bind(this),
          ajaxUrl: function () {
//            return window.mainConfig.url.getRelPointOfItems(this.info.itemObj.id);
//            if (this.info.pointGroupObj && this.info.pointGroupObj.length > 0) {
//              return window.mainConfig.url.selectByGroupIdPoint(this.info.pointGroupObj.id);
//            } else {
            return window.mainConfig.url.getRelPointOfItems(this.info.itemObj.id);
//            }
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
    },
    created: function () {// 当前页面刷新
      this.$on('updateItem', function (data) {
//        console.log(data.id);
        if (data && data.id) {
          this.info.itemObj = data;
          this.itemOption = AnalysisEnum.getItemMark(data.monitorTypeId);
          this.$refs.itemSelector.$emit('update', [{id: data.id, text: data.name, obj: data}]);
          this.itemMark = data.monitorTypeId;//= this.info.itemMark
          this.initTableConfig();
//          this.isRender = true;
//          if (!this.info.pointNameList) { //异步原因,获取延迟
//            let interval = setInterval(function () {
//              if (this.info.itemObj.id) {
//                this.itemMark = data.monitorTypeId;
//                clearInterval(interval);
//              }
//            }.bind(this), 200);
//          }
        } else {
          this.info.itemObj = {};
          this.$refs.itemSelector.clear(true);
          this.startEndDate = this.info.startEndDate = this.getDefaultTime();
//          console.log(this.info.startEndDate.dateL);
          if (!this.info.startEndDate.dateL) {
            this.info.startEndDate.startDate.dateL = '1000-01-01 00:00:00';
            this.info.startEndDate.endDate.dateL = "9999-12-31 23:59:59";
          }
        }
        this.info.itemOption = {
          url: this.itemOption.url,
          calculateType: this.calculateType,
          pointType: this.pointType,
          mark: 1
        }
//        console.log(this.info.itemOption);
      });
      this.$on('updatePointGroup', function (data) {
        if (data) {
          this.info.pointGroupObj = data;
//         })
          this.$refs.pointSelector.clear(true);
        } else {
          this.info.pointGroupObj = {};
        }
      });
      this.$on('updatePoint', function (data) {
        if (data && data.length > 0) {
          this.dateSelect = false;
          this.info.pointObj = data.slice(0, 1);
          this.$refs.pointSelector.clear(true);
        } else if (this.itemMark !== 200) {
          this.dateSelect = false;
          this.info.pointObj = [];
          this.$refs.pointSelector.clear(true);
        }
//        this.isRender = true;
      });
    },
    mounted () {
//      console.log(this.info);
      this.accountId = window.session.getObj(window.sessionKeys.ACCOUNT).id;
//      this.info.projectId = window.session.getObj(window.sessionKeys.PROJECT);
      this.info = Object.assign({}, this.info);
      if (!this.info.startEndDate) {
        this.startEndDate = this.info.startEndDate = this.getDefaultTime();
        if (!this.info.startEndDate.dateL) {
          this.info.startEndDate.startDate.dateL = '1000-01-01 00:00:00';
          this.info.startEndDate.endDate.dateL = "9999-12-31 23:59:59";
        }
      } else {
        this.startEndDate = this.info.startEndDate;
      }
      this.initDateRangePicker();
      $("#historyDateSelect").val('请选择日期');
      $("#historyDateSelect1").val('开始日期');
      $("#historyDateSelect2").val('结束日期');
      this.initItemOption();
      this.initPointGropOption();
      this.initPointOption();
//      this.info.itemOption.mark =1;
//      this.isRender = true;//控制子页面的转换，刷新highChart
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
            url: this.itemOption.url,
            calculateType: this.calculateType,
            pointType: this.pointType,
            mark: 1
          };
        }
        this.firstTime = false;
      },
      initTableConfig(){
        if (!this.info || !this.info.itemObj || !this.info.itemObj.id) {
          this.info.itemObj = window.session.getObj(window.sessionKeys.ITEMOBJ2);
        }
//        console.log(this.info.itemObj.id);
        window.mainConfig.http.selectConfigNamesR(this.projectId, this.info.itemObj.id).then((response) => {
          let changeData = [], keepDecs = [];
          let data = response.data;
//          console.log(data);
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
        }, (response) => {
          toastr.error(response.data);
        });
      },
      initPointGropOption(){
        if (this.info.pointGroupObj) {
//          let pointGroup = this.info.pointGroupObj;
//          this.monitorPointGroups.initData.push({id: pointGroup.id, text: pointGroup.name, obj: pointGroup})
//          this.isRender = true;
        }
        this.firstTime = false;
      },
      initPointOption(){
        if (this.info.pointObj && this.info.pointObj.length > 0) {
          this.dateSelect = false;
//          let point = this.info.pointObj;
//          console.log(point);
//          this.monitorPoints.initData.push({id: point[0].id, text: point[0].name, obj: point[0]});   //只显示一个测点
//          this.isRender = true;
        }
      },
      getDefaultTime(){/*获取最近一万点时间段*/
        let eDate = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);//这是获取当前时间
        let sDate = new Date(eDate.getTime() - 10 * 24 * 60 * 60 * 1000 + 1000);//当前时间的前10日
        this.startEndDate.startDate = this.formatDate(sDate);//转换成日期格式
        this.startEndDate.endDate = this.formatDate(eDate);
        return this.startEndDate;
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
        let component = this;
        $("#historyDateSelect").daterangepicker({
          opens: "left",
//          startDate: startEndDate.startDate.dateS,
//          endDate: startEndDate.endDate.dateS,
          timePicker24Hour: true,
          timePickerIncrement: 1,
          locale: {
            firstDay: 1,
            applyLabel: '确认',
            cancelLabel: '取消',
            customRangeLabel: '自定义范围',
            format: 'YYYY-MM-DD',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          },
        }, function (start, end) {
          component.startEndDate.startDate.dateL = start.format('YYYY-MM-DD HH:mm:ss');//用于url请求
          component.startEndDate.endDate.dateL = end.format('YYYY-MM-DD HH:mm:ss');    //用于url请求
          component.startEndDate.startDate.dateS = start.format('YYYY-MM-DD');        //用于日期显示
          component.startEndDate.endDate.dateS = end.format('YYYY-MM-DD');            //用于日期显示
          component.dateSelect = true;
        });
        $("#historyDateSelect1").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          opens: 'center',
          maxDate: new Date(),
        }, function (date) {
          component.info.startEndDate.startDate.dateL = date.format('YYYY-MM-DD HH:mm:ss');
          component.info.startEndDate.startDate.dateS = date.format('YYYY-MM-DD');
          if (!component.dateSelect) {
            component.dateSelect = true;
          }
          component.toDate(component.info.startEndDate.startDate.dateS);
        });
        $("#historyDateSelect2").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          opens: 'center',
          maxDate: new Date(),
        }, function (date) {
          component.info.startEndDate.endDate.dateL = date.format('YYYY-MM-DD 23:59:59');
          component.info.startEndDate.endDate.dateS = date.format('YYYY-MM-DD');
          if (!component.dateSelect) {
            component.dateSelect = true;
          }
        });
      },
      toDate(minDate){
        let component = this;
        $("#historyDateSelect2").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          opens: 'center',
          minDate: new Date(Date.parse(minDate)),//,
          maxDate: new Date(),
        }, function (date) {
          component.info.startEndDate.endDate.dateL = date.format('YYYY-MM-DD 23:59:59');
          component.info.startEndDate.endDate.dateS = date.format('YYYY-MM-DD');
          if (!component.dateSelect) {
            component.dateSelect = true;
          }
        });
      },
      query(){
        let mark = null, startDate = null, endDate = null, pointNamesB = null, pointGroupNameB = null, e = this.info;
        if (this.pointSelect === false && this.dateSelect === false) mark = 1;
        if (this.pointSelect === true && this.dateSelect === false) mark = 2;
        if (this.pointSelect === false && this.dateSelect === true) mark = 3;
        if (this.pointSelect === true && this.dateSelect === true) mark = 4;
        if (this.pointSelect === false && this.dateSelect === false && this.pointGroupSelect === false && this.itemMark === 3) mark = 5;
        if (this.pointSelect === true && this.dateSelect === false && this.pointGroupSelect === false && this.itemMark === 3) mark = 6;
        if (this.pointSelect === false && this.dateSelect === true && this.pointGroupSelect === false && this.itemMark === 3) mark = 7;
        if (this.pointSelect === false && this.dateSelect === false && this.pointGroupSelect === true && this.itemMark === 3) mark = 8;
        if (this.pointSelect === true && this.dateSelect === false && this.pointGroupSelect === true && this.itemMark === 3) mark = 9;
        if (this.pointSelect === true && this.dateSelect === true && this.pointGroupSelect === true && this.itemMark === 3) mark = 10;
        switch (mark) {
          case 1://select all
            startDate = '1000-01-01 00:00:00';
            endDate = '9999-12-31 23:59:59';
//            e.itemOption.pointNames = _.map(e.pointObj, (d) => (d.name));
            e.monitorItemId = e.itemObj.id;
            e.itemOption.pointNames = [];
//            e.itemOption.pointGroupName = [];
            /*后台的根据item查询写好后,此行可注释掉,用ItemId*/
//            pointNameList = e.pointNameList; //检测项下的所有测点的集合
//            e.itemOption.keepDecs = this.info.keepDec;
            break;
          case 2://ByPoint
            startDate = '1000-01-01 00:00:00';
            endDate = '9999-12-31 23:59:59';
            e.itemOption.pointNames = _.map(e.pointObj, function (d) {
              return (d.name);
            });
//            e.itemOption.pointGroupName = [];
            break;
          case 3://ByTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            e.itemOption.pointNames = [];
//            e.itemOption.pointGroupName = [];
            /*后台的根据item查询写好后,此行可注释掉,用ItemId*/
            break;
          case 4://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            e.itemOption.pointNames = _.map(e.pointObj, (d) => (d.name));
//            e.itemOption.pointGroupName = _.map(e.pointGroupObj, (d) => (d.name));
//            e.itemOption.tableOption = this.info.tableOption;
            break;
          case 5://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            e.itemOption.pointNames = [];
//            e.itemOption.pointGroupName = [];
            break;
          case 6://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            pointNamesB = _.map(e.pointObj, (d) => (d.name));
//            pointGroupNameB = _.map(e.pointGroupObj, (d) => (d.name));
            pointGroupNameB = [];
            e.itemOption.pointNames = pointNamesB.concat(pointGroupNameB);
//            e.itemOption.pointNames = [];
            break;
          case 7://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
            e.itemOption.pointNames = [];
//            e.itemOption.pointGroupName = [];
//            e.itemOption.tableOption = this.info.tableOption;
            break;
          case 8://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
//            e.itemOption.pointNames = [];
            pointNamesB = [];
            pointGroupNameB = _.map(e.pointGroupObj, (d) => (d.name));
            e.itemOption.pointNames = pointGroupNameB.concat(pointNamesB);
            break;
          case 9://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
//            e.itemOption.pointNames = [];
            pointNamesB = _.map(e.pointObj, (d) => (d.name));
            pointGroupNameB = _.map(e.pointGroupObj, (d) => (d.name));
            e.itemOption.pointNames = pointNamesB.concat(pointGroupNameB);
            break;
          case 10://ByPointAndTime
            startDate = e.startEndDate.startDate.dateL;
            endDate = e.startEndDate.endDate.dateL;
//            e.itemOption.pointNames = [];
            pointNamesB = _.map(e.pointObj, (d) => (d.name));
            pointGroupNameB = _.map(e.pointGroupObj, (d) => (d.name));
            e.itemOption.pointNames = pointNamesB.concat(pointGroupNameB);
            break;
        }
        this.info.itemOption.mark = mark;
        let pointNames = [];
        for (let i = 0; i < e.itemOption.pointNames.length; i++) {
          let a = e.itemOption.pointNames[i].replace(/\+/g, '%2B').replace(/\+/g, ' %20').replace(/\+/g, '%2F').replace(/\+/g, '%3F')
              .replace(/\+/g, '%25').replace(/\+/g, '%23').replace(/\+/g, '%26').replace(/\+/g, '%3D');
          pointNames.push(a);
        }
        this.$broadcast('filterTable', {
          url: e.itemOption.url,
          projectId: e.projectId,
          monitorItemId: e.itemObj.id,
          pointNames: pointNames,
//          commName:e.itemOption.commName,
          pointGroupName: e.itemOption.pointGroupName,
          startDate: startDate,
          endDate: endDate,
          mark: e.itemOption.mark,
          calculateType: e.itemOption.calculateType, // 全站仪
          pointType: e.itemOption.pointType,// 全站仪
        });
      },
      queryAll(){
        let startDate = null, endDate = null, e = this.info;
        startDate = '1000-01-01 00:00:00';
        endDate = '9999-12-31 23:59:59';
        this.$broadcast('filterTable', {
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
  /*"监测项"选框*/
  .input-group-addon {
    border: solid rgba(61, 155, 179, 0.56);
    border-width: 1px 0 1px 1px;
    border-radius: 5px 0 0 5px;
  }

  .addon-label {
    color: #00aadd;
    font-weight: 900;
    font-size: 1.105em;
  }

  .input-group select {
    border-radius: 0 5px 5px 0;
    border: solid rgba(61, 155, 179, 0.56) 1px;
    color: #00aadd;
    font-size: 14px;
  }

  .daterangepicker {
    position: initial;
    border-radius: 5px;
    border: solid rgba(61, 155, 179, 0.56) 1px;
    color: #00aadd;
    /*margin-top: 0;*/
  }

  .wrap-padding {
    padding: 2px;
  }

  .min-wrapper {
    width: inherit;
    min-height: 50vh;
    border: 1px solid rgba(0, 192, 239, 0.3);
    border-radius: 5px;
    box-shadow: rgba(0, 192, 239, 0.5);
    /*overflow-x: scroll;*/
  }

  .min-size {
    width: inherit;
    padding: 5px;
    /*min-width: 550px;*/
  }

  .btn-info {
    width: 80px;
    float: right;
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
