<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
    <section class="content content-overflow layui-anim layui-anim-up">
      <div class="box box-solid">
        <div class="box-header">
          <h3 class="box-title no-btn-title">监测项目报表</h3>
        </div>
      </div>
      <div class="box-body">
        <div class="selection">
          <div class="row">
            <div class="col-sm-4 div-margin-bottom">
              <div class="input-group">
                <label class="input-group-addon addon-label" for="project">工程名称:</label>
                <vue-select2 :ajax="true" :paging="false" :multiple="false" v-ref:project-slt id="project"
                             :ajax-url="projectOptions.ajaxUrl"
                             :placeholder="projectOptions.placeholder"
                             :evt-selected="projectOptions.evtSelected"
                             :init-data="projectOptions.initData"></vue-select2>
              </div>
            </div>
            <div class="col-sm-4 div-margin-bottom">
              <div class="input-group">
                <label class="input-group-addon addon-label" for="monitorItem">&nbsp&nbsp监测项:&nbsp</label>
                <vue-select2 :ajax=true :paging=false :multiple=false v-ref:item-slt id="monitorItem"
                             :ajax-url="monitorItems.ajaxUrl"
                             :init-data="monitorItems.initData"
                             :placeholder="monitorItems.placeholder"
                             :evt-selected="monitorItems.evtSelected"></vue-select2>
              </div>
            </div>
            <!--<div class="col-sm-4 div-margin-bottom">-->
            <!--<div class="input-group">-->
            <!--<label for="attrType" class="input-group-addon addon-label">数据类型</label>-->
            <!--<vue-select2 :ajax=false :paging=false :multiple=false v-ref:attr-slt id="attrType"-->
            <!--:init-data="attrOptions.initData"-->
            <!--:local-data="attrOptions.localData"-->
            <!--:placeholder="attrOptions.placeholder"-->
            <!--:evt-selected="attrOptions.evtSelected"></vue-select2>-->
            <!--</div>-->
            <!--</div>-->
            <div class="col-sm-4 div-margin-bottom">
              <div class="input-group">
                <label class="input-group-addon addon-label" for="reportType">报表类型:</label>
                <vue-select2 :ajax=false :paging=false :multiple=false v-ref:report-slt id="reportType"
                             :init-data="typeOptions.initData"
                             :local-data="typeOptions.localData"
                             :placeholder="typeOptions.placeholder"
                             :evt-selected="typeOptions.evtSelected"></vue-select2>
              </div>
            </div>
            <div class="col-sm-5 col-md-4 div-margin-bottom">
              <div class="input-group">
                <label class="input-group-addon addon-label" for="startTime">开始时间:</label>
                <input type="text" class="form-control daterangepicker" id="startTime" placeholder="请选择日期">
              </div>
            </div>
            <div class="col-sm-5 col-md-4 div-margin-bottom">
              <div class="input-group">
                <label class="input-group-addon addon-label" for="endTime">结束时间:</label>
                <input type="text" class="form-control daterangepicker" id="endTime" placeholder="请选择日期">
              </div>
            </div>
            <div class="col-sm-12 col-md-2 center-grid btn-container">
              <div class="center-margin">
                <button id="btn-query" class="btn table-title-button" @click="getQueryData()">
                  <i class="iconfont icon-icon"></i>查询
                </button>
                <button id="btn-export" v-if="savedCount!=0 && (savedCount == infos.length)"
                        class="btn table-title-button" @click="exportExcel()"><i class="iconfont icon-xiazai"></i>导出
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="report-detail">
          <div class="tab-box">
            <span v-for="i in infos" v-on:click="changeView($index)" :class="currentView==$index ? 'curr' : ''">{{ i.sheetName }}
              <button @click="deleteSheet($index)" class="btn-delete-sheet">&times;</button>
            </span>
            <a v-on:click="saveSheet(`sheet${infos.length + 1}`, `con${infos.length + 1}`)" class="btnSaveSheet"
               id="btnSaveSheet">保存表单</a>
            <a v-on:click="clearSheet()" class="btnClearSheet" id="btnClearSheet">清空所有表单</a>
          </div>
          <div class="con-box">
            <section class="content">
              <div class="reportTitle"><input id="rpTitle"></div>
              <div class="reportHead">
                <div class="div-margin-bottom">
                  <div class="col-xs-6 col-sm-5 col-md-5 col-lg-5">
                    <div class="input-group">
                      <label class="rpHead1 input-group-addon" for="rpHeadId1">工程名称</label>
                      <input type="text" class="rpHead1" id="rpHeadId1"/>
                    </div>
                  </div>
                  <div class="col-xs-6 col-sm-5 col-md-5 col-lg-5">
                    <div class="input-group">
                      <label class="rpHead2 input-group-addon" for="rpHeadId2">监测项</label>
                      <input type="text" class="rpHead2" id="rpHeadId2"/>
                    </div>
                  </div>
                  <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4">
                    <div class="input-group">
                      <label class="rpHead3 input-group-addon" for="rpHeadId3">报表编号</label>
                      <input type="text" class="rpHead3" id="rpHeadId3"/>
                    </div>
                  </div>
                  <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
                    <div class="input-group">
                      <label class="rpHead4 input-group-addon" for="rpHeadId4">天气</label>
                      <input type="text" class="rpHead4" id="rpHeadId4"/>
                    </div>
                  </div>
                </div>
                <div class="div-margin-bottom">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="input-group">
                      <label class="rpHead5 input-group-addon" for="rpHeadId5">本次监测时间</label>
                      <input type="text" id="rpHeadId5" class="rpHead4 thisLastTime">
                    </div>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="input-group">
                      <label class="rpHead6 input-group-addon" for="rpHeadId6">上次监测时间</label>
                      <input type="text" id="rpHeadId6" class="rpHead5 thisLastTime ">
                    </div>
                  </div>
                </div>
              </div>
              <div class="reportMain">
                <table id="dataTable" border="0" class="display much-column table pointer" width="100%"></table>
                <div id="chart"></div>
                <div class="tail">
                  <textarea class="conclusion1" placeholder="施工工况">施工工况:  </textarea>
                  <textarea class="conclusion2" placeholder="监测结论及建议">监测结论及建议:  </textarea>
                </div>
              </div>
              <div class="reportFoot">
                <div class="div-margin-bottom">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="input-group">
                      <label class="rpFoot1 input-group-addon" for="rpFootId1">现场监测人</label>
                      <input type="text" class="rpFoot1" id="rpFootId1"/>
                    </div>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="input-group">
                      <label class="rpFoot2 input-group-addon" for="rpFootId2">计算人</label>
                      <input type="text" class="rpFoot2" id="rpFootId2"/>
                    </div>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="input-group">
                      <label class="rpFoot3 input-group-addon" for="rpFootId3">校核人</label>
                      <input type="text" class="rpFoot3" id="rpFootId3"/>
                    </div>
                  </div>
                </div>
                <div class="div-margin-bottom">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                    <div class="input-group">
                      <label class="rpFoot3 input-group-addon" for="rpFootId4">监测项目负责人</label>
                      <input type="text" class="rpFoot4" id="rpFootId4"/>
                    </div>
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="input-group">
                      <label class="rpFoot5 input-group-addon" for="rpFootId5">检测单位</label>
                      <input type="text" class="rpFoot5" id="rpFootId5"/>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import GlobalEnum from '../../managers/enum/global-enum';
  import ReportEnum from '../../managers/enum/report-enum';
  import LayerExtend from '../../../static/plugins/layui/extend/layui.ext';
  import AnalysisEnum from '../../managers/enum/analysis-enum';
  import TableConfig from '../../managers/enum/tableConfig-enum';
  export default {
    data () {
      return {
        pathKey: 'itemReport',
        info: {},
        infos: [],
        dataTable: {},
        chart: {},
        accountId: null,
        projectId: null,
        projectName: null,
        monitorItemId: null,
        monitorItemName: null,
        monitorTypeId: null,
        monitorTypeName: null,
        startDate: null,
        endDate: null,
        alarmClass: '一级',
        controlAcc: 0.00,
        controlRate: 0.00,
        itemOption: {},  //AnalysisEnum.getItemMark(Name,dataType)
        attrOption: [],  //itemOption.dataType
        attrValue: null,//itemOption.dataType.value
        attrText: null, //itemOption.dataType.text
        attrUnit: null, //itemOption.dataType.unit
        currentView: 0,
        reportOption: {},
        canAddSheet: true,//是否允许添加表单
        savedCount: 0,   //保存表单数
        type: {},
        typeOptions: {
          initData: [],
          placeholder: '报表类型',
          evtSelected: function (evt, data) {
            if (data && data[0]) {
              this.type = data[0].obj;
            }
          }.bind(this),
          localData: [{id: 1, text: '日报表'}/*, {id: 2, text: '周报表'}, {id: 3, text: '月报表'}, {id: 4, text: '年报表'}*/]
        },
        projectOptions: {
          initData: [],
          placeholder: '工程选择',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              let d = data[0];
              this.projectId = d.id;
              this.projectName = d.text;
              this.attrValue = null;                  //清空显示类型
              this.attrUnit = null;                  //清空单位
              this.initItemSelect(this.projectId);  //更新监测项选项
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
              this.prepareCondition(data[0].obj);
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorItemPage_U(this.projectId);
          }.bind(this)
        },
        attrOptions: {
          initData: [],
          placeholder: '数据类型',
          evtSelected: function (evt, data) {
            if (data && data[0]) {
              let obj = data[0];
              this.attrValue = obj.id;
              this.attrText = obj.text;
              this.attrUnit = obj.unit ? obj.init : '';
              this.reportOption = ReportEnum.getReportConfig(this.monitorTypeId, this.attrValue);
            }
          }.bind(this),
          localData: []
        }
      };
    },
    mounted () {
      this.accountId = window.session.getObj(window.sessionKeys.ACCOUNT).id;
      this.lsyTest2();
      this.initDatePicker();
//      this.initProjectSelect();
      this.info = this.infos[this.currentView];
    },
    methods: {
      lsyTest2(){
        var xmlHttp;
        if (window.XMLHttpRequest) {
          xmlHttp = new XMLHttpRequest();
        } else {
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlHttp !== null) {
          xmlHttp.open('get', 'http://localhost:8201/api/lsy/test', true);
          xmlHttp.send();
          xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
              if (xmlHttp.status === 200) {
                console.log(xmlHttp.responseText);
              } else {
                console.log(xmlHttp);
              }
            }
          }
        }
      },
      lsyTest(){
        window.mainConfig.http.lsyTest().then((response) => {
          console.log(response);
        });
        $.ajax({
          url: "http://localhost:8201/api/lsy/test",
          type: "get",
          contentType: "application/x-www-form-urlencoded",
          dataFilter: function (a, b, c) {
            console.log(a, b, c);
          },
          success: function (a, b, c) {
            console.log(a, b, c);
          },
          error: function (err) {
            console.log(err);
          }
        })
      },
      /*c初始化下拉框*/
      initProjectSelect() {
        window.mainConfig.http.getProjectPage_R(this.accountId).then((response) => {
          let project = response.data[0];
          if (project && project.id) {
            this.projectId = project.id;
            this.projectName = project.name;
            this.$refs.projectSlt.$emit('update', [{id: project.id, text: project.name, obj: project}]);
            this.initItemSelect(this.projectId);
          }
        }, (response) => {
          toastr.error('通信失败');
          console.log(response);
        })
      },
      initItemSelect(projectId){
        window.mainConfig.http.getMonitorItemPage_R(projectId).then((response) => {
          let item = response.data[0];
          if (item && item.id) {
            this.$refs.itemSlt.$emit('update', [{id: item.id, text: item.name, obj: item}]);
            this.prepareCondition(item);
          }
        }, (response) => {
          toastr.error('通信失败');
          console.log(response);
        });
      },

      prepareCondition(itemObj){
        this.monitorItemId = itemObj.id;
        this.monitorItemName = itemObj.name;
        this.monitorTypeId = itemObj.monitorTypeId;
        this.monitorTypeName = ((GlobalEnum.monitorTypes).find(t => parseInt(t.value) === parseInt(this.monitorTypeId))).text;
        this.itemOption = AnalysisEnum.getItemMark(this.monitorTypeId);
        this.attrOption = this.itemOption.dataType;                     //获取数据类型来源
        this.attrValue = this.attrOption[0].value;
        this.attrText = this.attrOption[0].text;
        this.attrUnit = this.attrOption[0].unit;                        //重置单位
        let tempOption = {};
        tempOption.tableHead = [];
        tempOption.dataFixed = [];
        tempOption.conversion = [];
        this.reportOption = ReportEnum.getReportConfig(this.monitorTypeId, this.attrValue);
        if (this.monitorTypeId !== 20) {  // && this.monitorTypeId !== 7 排除全站仪 与 GPS, 导出数据与历史数据不同
          window.mainConfig.http.selectConfigNamesR(this.projectId, this.monitorItemId).then((response) => {
            if (response && response.data) {
              let data = response.data;
              $.each(data, (i, obj) => {
                if (obj.export) {
                  tempOption.tableHead.push([obj.property, obj.reportTitle]);
                  tempOption.dataFixed.push(this.toNumber(obj.keepDec, null));
                  tempOption.conversion.push(this.toNumber(obj.conversion, 1));
                }
              });
              if (tempOption.tableHead.length <= 0) {  //如果用户没有配置过'自定义查询与输出'
                toastr.options.timeOut = '5000';
                toastr.info('当前报表模板使用默认模板 o(╥﹏╥)o 若需自定义请到"工程信息登记"配置');
                if (this.monitorTypeId !== 20) data = TableConfig.getTableConfig(parseInt(this.monitorTypeId));
                $.each(data, (i, obj) => {
                  if (obj.export) {
                    tempOption.tableHead.push([obj.property, obj.reportTitle]);
                    tempOption.dataFixed.push(this.toNumber(obj.keepDec, null));
                    tempOption.conversion.push(this.toNumber(obj.conversion, 1));
                  }
                });
              }
            }//end if response && response.data
            this.reportOption = $.extend(ReportEnum.getReportConfig(this.monitorTypeId, this.attrValue), tempOption);
          }, (response) => {
            toastr.error('获取自定义显示失败,当前使用默认配置');
          });
        } else { //全站仪 与 GPS
          toastr.info('全站仪监测报表使用规范模板');
//          this.reportOption = ReportEnum.getReportConfig(this.monitorTypeId, this.attrValue);
          let tableHead = this.reportOption.tableHead;
          let tableDesc = this.reportOption.tableDesc;
          if (!tableHead || tableHead.length <= 0 || (tableDesc.length > 0 && tableHead.length !== tableDesc.length)) {
            console.error('"report option" is setting incorrectly');
            return;
          }
          tempOption.tableHead = tableHead;
          $.each(tableDesc, (i, obj) => {
            tempOption.dataFixed.push(this.toNumber((obj && obj[0]) ? obj[0] : null, null));
            tempOption.conversion.push(this.toNumber((obj && obj[1]) ? obj[1] : 1, 1));
          });
          this.reportOption = $.extend(this.reportOption, tempOption);
        }
      },

      /*'查询'按钮, 获取后台数据,初始化table与chart*/
      getQueryData(){
        if (!this.projectId) {
          toastr.warning('请选择需要导出的工程');
          return;
        }
        if (!this.monitorItemId) {
          toastr.warning('请选择需要导出的监测项');
          return;
        }
        let startTime = $('#startTime').val(), endTime = $('#endTime').val();
        if (!startTime || !endTime) {
          toastr.warning('请选择合适的时间范围');
          return;
        }
        LayerExtend.showLoadLayer();
        window.mainConfig.http.getAlarmParamList(this.monitorItemId, '', 0).then((response) => {  //获取设置的限差数据
          let data = response.data[0];
          if (data) {
            try {
              let param = JSON.parse(data.prms);
              this.controlAcc = param && param.controlAccumulation ? param.controlAccumulation : 0.00;
              this.controlRate = param && param.controlRate ? param.controlRate : 0.00;
            } catch (e) {
              console.error('json转换失败: ' + e);
            }
          }
          getReportData(this.controlAcc, this.controlRate, this.alarmClass, this.type.id);
        }, (response) => {
          toastr.warning('预警值获取失败');
          console.error('预警值获取失败: ' + response);
          getReportData(this.controlAcc, this.controlRate, " ", this.type.id);
        });
        let self = this;

        function getReportData(controlValueAcc, controlValueRate, alarmClass, type) {
          window.mainConfig.http.getReportDataList(self.projectId, self.monitorItemId, self.monitorTypeId, startTime, endTime,
            controlValueAcc, controlValueRate, alarmClass, type,
            {syncNo: 1, pageIndex: 1, pageSize: 100000}).then((response) => {
            try {
              self.addOrModifySheet(response.data);
            } catch (e) {
              console.error(e)
            }
            LayerExtend.closeLayer();
          }, (response) => {
            toastr.error('通信失败');
            console.log(response);
          });
        }
      },

      /*添加工作表*/
      addOrModifySheet(dataList){
        let report = {};
        let tableHead = this.clone(this.reportOption.tableHead);
        let dataFixed = this.clone(this.reportOption.dataFixed);    //保留小数点
        let conversion = this.clone(this.reportOption.conversion);  //单位转换
        let chart = this.clone(this.reportOption.chart);
        let sheetName = this.clone(this.reportOption.sheetName || []);
        (this.savedCount !== this.infos.length ) && (this.infos = this.infos.slice(0, this.savedCount));
        for (let i = 0, len = dataList.length; i < len; i++) {
          let data = dataList[i];
          report.projectId = this.projectId;
          report.monitorItemId = this.monitorItemId;
          report.monitorTypeId = this.monitorTypeId;
          report.startDate = this.clone($('#startTime').val());
          report.endDate = this.clone($('#endTime').val());
          report.alarmClass = this.alarmClass;
          report.controlValueAcc = this.controlAcc;                       //控制值
          report.controlValueRate = this.controlRate;                     //控制速率
          report.tableOption = this.getTableSetting(tableHead, dataFixed, conversion);   //用于dataTable
          report.tableOption.data = data;                                  //用于dataTable
          report.chartOption = {axis: [], series: []};                     //用于highChart
          report.sheetTitle = this.projectName + this.monitorTypeName + this.type.text;    //表头
          report.sheetName = (this.monitorItemName === sheetName[i].ch) ? this.monitorItemName : this.monitorItemName + sheetName[i].ch;//工作表名
          report.remark = sheetName[i].en;                                //用于全站仪后台区分plane&&height,GSP 区分X,Y,Z查询
          report.tableHead = tableHead;                                   //传后台
          report.sheetHead = [this.projectName, this.monitorItemName, '', '', report.endDate, report.startDate];  //表头六个input
          report.sheetFoot = this.getValue($("input[class^='rpFoot']"), 'value');//表脚
          report.sheetMainFoot = this.getValue($("textarea[class^='conclusion']"), 'value');//表结论
          report.dataFixed = dataFixed;                                   //保留小数点后n位
          report.conversion = conversion;
          report.type = this.type.id;
          if (!(report.tableOption.columns && report.tableOption.columns.length > 0)) {     //没有造出table columns, dataTable 无法生成
            console.error('no table column, something wrong with table data generating');
            toastr.error('something wrong with table data generating');
            return;
          }
          if (chart.length > 0) {                 //处理图表
            report.chartOption.axis = [chart[0]]; //时间作为X轴
            if (chart.length > 1) {              //除了时间以外的字段
              for (let i = 1; i < chart.length; i < len;
              i++
            )
              {
                report.chartOption.axis.push([this.attrValue + chart[i][0], this.attrText + chart[i][1], this.attrUnit]);
              }
            } else {
              report.chartOption.axis.push([this.attrValue, this.attrText, this.attrUnit]);//属性, 属性中文, 单位
            }
          }
          report.chartOption.series = this.getChartData(report.tableOption.data, report.chartOption.axis); //用于highChart [{series, text, unit}]
          this.infos.push(Info(report));
        } // END dataList FOR
        let info = this.infos[this.currentView]; //设置当前显示报表对象
        $('.report-detail').fadeIn();
        this.clearInputs(info);            //显示填空值
        this.initTable(info.sheetMain.table);     //显示表格
        this.initChart(info.sheetMain.chart.series);  //显示图表
        layer.tips('保存表单', '#btnSaveSheet', {tips: [1, '#3595CC'], time: 3000});
        function Info(i) {
          let obj = {
            sheetName: i.sheetName,
            sheetTitle: i.sheetTitle,
            sheetHead: i.sheetHead,
            sheetMain: {
              table: {
                columns: i.tableOption.columns,       //dataTable用
                data: i.tableOption.data,             //dataTable用
                columnDefs: i.tableOption.columnDefs, //dataTable用
                head: i.tableHead,                    //传后台,区分不同监测类型用
                dataFixed: i.dataFixed,               //保留小数点后n位
                conversion: i.conversion              //单位转换
              },
              chart: {                  //传后台,区分不同监测类型用 //[{series, text, unit}]
                series: i.chartOption.axis,
                axis: i.chartOption.series
              },
              foot: i.sheetMainFoot                   //报表总结
            },
            sheetFoot: i.sheetFoot,                   //报表脚
            projectId: i.projectId,
            monitorItemId: i.monitorItemId,
            monitorTypeId: i.monitorTypeId,
            startDate: i.startDate,
            endDate: i.endDate,
            controlValueAcc: i.controlValueAcc,
            controlValueRate: i.controlValueRate,
            alarmClass: i.alarmClass,
            remark: i.remark,
            type: i.type
          };
          return obj;
        }
      },

      /*初始化table*/
      initTable(options){
        let setting = {
          scrollX: true,
          scrollY: '75vh',
          bScrollCollapse: true,
          retrieve: true,
          showCheckbox: true,
          processing: true,
          searching: false,
          ordering: false,
          deferRender: true,
          iDisplayLength: 10,
          lengthMenu: [[10, 15, 25, 50], [10, 15, 25, 50]],
          select: {style: 'single', selector: 'td:not(:nth-child(6))'},
          language: this.$store.state.dataTable.language,
          dom: 'tipr',
          createdRow: (row, data, index) => $('td', row).addClass('text-center'),
          data: options.data || [],
          columns: options.columns,
          columnDefs: options.columnDefs
        };
        this.dataTable = $("#dataTable").dataTable(setting);
        this.dataTable.fnDestroy();
        $('#dataTable').empty();
        this.dataTable = $('#dataTable').dataTable(setting);
      },

      /*初始化chart*/
      initChart(chartSeries){
        for (let i = 0, len = chartSeries.length; i < len; i++) {
          let chartId = 'chart' + i;
          let text = chartSeries[i].text, unit = chartSeries[i].unit, series = chartSeries[i].series;
          if ($('#' + chartId).length <= 0) {
            $('#chart').append('<div id="' + chartId + '"></div>');
            $('#chart').append('<hr height="3">');
          }
          new Highcharts.stockChart(chartId, this.getChartOptions(series, text, unit));
        }
      },

      /*构建reportData对象, 给后台生成Excel*/
      exportExcel(){
        let infos = this.clone(this.infos);
        let report = [];
        let reportName = infos[0].sheetHead[0];
        console.log(infos);
        let type = infos[0].type;
        let typeText = '';
        for (let i = 0, len = infos.length; i < len; i++) {
          let info = infos[i];
          if (reportName.indexOf(info.sheetHead[0]) === -1) reportName = reportName + '-' + info.sheetHead[0];
          if (type.toString().indexOf(info.type.toString()) !== -1) typeText = _.find(this.typeOptions.localData, (d) => d.id === type).text;
          report.push({
            name: info.sheetName,
            title: info.sheetTitle,
            head: this.domToString($("label[class^='rpHead']"), info.sheetHead, info.sheetName),   //label与input
            tableC: this.getValue(info.sheetMain.table.head, 1),
            tableE: this.getValue(info.sheetMain.table.head, 0),
            chart: this.getValue(info.sheetMain.chart.axis, 0),
            conclusion: this.domToString($("[class^='conclusion']"), info.sheetMain.foot, info.sheetName),
            foot: this.domToString($("label[class^='rpFoot']"), info.sheetFoot, info.sheetName),
            projectId: info.projectId,
            monitorItemId: info.monitorItemId,
            monitorTypeId: parseInt(info.monitorTypeId),
            startDate: info.startDate,
            endDate: info.endDate,
            alarmClass: info.alarmClass,
            controlValueAcc: info.controlValueAcc,
            controlValueRate: info.controlValueRate,
            remark: info.remark,                        //'全站仪'必须, 可取值:plane,height
            dataFixed: this.clone(info.sheetMain.table.dataFixed),       //保留小数点后n位
            conversion: this.clone(info.sheetMain.table.conversion),
            type: info.type,
          })
        }
        reportName = reportName + '监测 ' + typeText + window.globalTool.formatDate(new Date(), 4);
        reportName = prompt('报表名称', reportName);
        if (!reportName) return;  //取消下载
        let stringReport = encodeURI(JSON.stringify(report));
        let fileName = encodeURI(reportName);
        let options = {
          url: window.mainConfig.url.getReportExport(), //请求的url
          data: {//要发送的数据
            reportSheetJson: stringReport,
            fileName: fileName
          },
        };
        let config = $.extend(true, {method: 'post'}, options);
        let $iframe = $('<iframe id="down-file-iframe" />');
        let $form = $('<form target="down-file-iframe" method="' + config.method + '" />');
//        $form.attr('target', '_self');
        $form.attr('action', config.url);
        for (let key in config.data)  $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />');
        $iframe.append($form);
        $(document.body).append($iframe);
        $form[0].submit();
        $iframe.remove();
      },

      /*整理出DataTable数据*/
      getTableSetting(tableHead, dataFixed, conversion){
        let columns = [], columnDefs = [];
        try {
          if (!tableHead || tableHead.length <= 0 || (dataFixed.length > 0 && tableHead.length !== dataFixed.length)) {
            console.error('"report option" is setting incorrectly');
            return;
          }
          for (let k = 0; k < tableHead.length; k++) {
            let head = tableHead[k];
            let fixed = dataFixed[k];
            let conver = conversion[k];
            columns.push({data: head[0], title: head[1]});//columns
            if (fixed) {
              let fixedType = typeof fixed;
              switch (fixedType) {
                case 'function':
                  columnDefs.push({render: fixed});//columnDefs
                  break;
                case 'number':
                  columnDefs.push({
                    render: function (data, type) {
                      return (data && (typeof data === 'number')) ? (data * conver).toFixed(fixed) : data;
                    },
                    targets: k
                  });
                  break;
                default:
                  columnDefs.push({});
                  break;
              }
            }
          }
        } catch (e) {
          console.error('myFault: ' + e);
        }
        return {columns, columnDefs};                 //分别用于DataTable 的columns, data, columnDefs
      },

      /*整理出highChart数据*/
      getChartData(data, axis){
        let map = {}, chartSeries = [], eachSeries = [];
        if (data && data.length > 0) {
          for (let k = 1; k < axis.length; k++) {
            for (let i = 0, len = data.length; i < len; i++) {
              let ai = data[i];
              if (!map[ai.pointName]) {
                eachSeries.push({
                  name: ai.pointName,
                  data: [[Date.parse(ai[axis[0][0]]), ai[axis[k][0]]]],
                  marker: {
                    enabled: true
                  }
                });
                map[ai.pointName] = ai;
              } else {
                for (let j = 0; j < eachSeries.length; j++) {
                  let dj = eachSeries[j];
                  if (dj.name === ai.pointName) {
                    dj.data.unshift([Date.parse(ai[axis[0][0]]), ai[axis[k][0]]]);
                    break;
                  }
                }
              }
            }
            chartSeries.push({series: eachSeries, text: axis[k][1], unit: axis[k][2]});
            eachSeries = [];
            map = {};
          }
        }
        return chartSeries;
      },

      /*整理出highChart option*/
      getChartOptions(series, text, unit){
        return {
          credits: {enabled: false},
          chart: {
            type: 'spline',
            plotBorderWidth: 0,//整幅图的边框粗
            marginLeft: 10,//整幅图的偏移量
            marginRight: 10,
          },
          title: {text: text, style: {color: '#7cb5ec', fontSize: '1.8em', fill: '#7cb5ec'}},
          colors: ['#80699B', '#DB843D', '#89A54E', '#3D96AE', '#4572A7', '#AA4643', '#92A8CD', '#A47D7C', '#B5CA92'],
          yAxis: {
            title: {
              text: text ? text : '变化量(mm)',
              align: 'high',
              textAlign: 'low',
              offset: -20,
              rotation: 0,
              y: 0
            },
            labels: {
              align: 'right',
              x: 3,
              y: -2,
              style: {
                fontSize: '0.6em',
                fontWeight: 'bold'
              }
            },
//            top: '-25%',
//            height: '165%',
            offset: 0,
            lineWidth: 2,
            tickWidth: 1,
            opposite: false,
          },
          xAxis: {
            title: {
              text: '时间', align: 'high'
            },
            type: 'datetime',
            dateTimeLabelFormats: {
              second: '%Y-%m-%d<br/>%H:%M:%S',
              minute: '%Y-%m-%d<br/>%H:%M',
              hour: '%Y-%m-%d<br/>%H:%M',
              day: '%Y<br/>%m-%d',
              week: '%Y<br/>%m-%d',
              month: '%Y-%m',
              year: '%Y'
            },
            events: {
              afterSetExtremes: this.afterSetExtremes
            },
          },
          plotOptions: {
            series: {
              showInNavigator: true
            },
            spline: {
              marker: {
                enabled: true
              }
            }
          },
          tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
            valueSuffix: unit ? unit : 'mm',
            valueDecimals: 2,
            split: true
          },
          scrollbar: {
            liveRedraw: true,
            barBackgroundColor: '#0474b5',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: 'rgba(21,154,250,0.4)',
            buttonBorderWidth: 0,
            buttonBorderRadius: 7,
            trackBackgroundColor: 'rgba(21,154,250,0.4)',
            trackBorderWidth: 1,
            trackBorderRadius: 8,
            trackBorderColor: '#CCC'
          },
          navigator: {
            series: {type: 'spline', lineWidth: 1, fillOpacity: 0.05, color: 'rgba(121,154,250,0.9)',},
            xAxis: {
              labels: {
                style: {
                  color: Highcharts.getOptions().colors[0]
                },
                formatter: function () {
                  return window.globalTool.formatDate(this.value, 4);
                }
              }
            }
          },
          rangeSelector: {
            inputDateFormat: '%Y-%m-%d',
            buttons: [
              {
                type: 'hour',
                count: 1,
                text: '时'
              }, {
                type: 'day',
                count: 1,
                text: '天',
              }, {
                type: 'week',
                count: 1,
                text: '周',
              }, {
                type: 'month',
                count: 1,
                text: '月',
              }, {
                type: 'year',
                count: 1,
                text: '年',
              }, {
                type: 'all',
                count: -1,
                text: '全部',
              }],
            buttonTheme: {
              width: 30
            },
            inputEnabled: true,
            selected: 0
          },
          series: series,
        }
      },

      /*新建工作表时清空填空值或赋默认值*/
      clearInputs(report){
        $("input[class^='rpHead']").val('');
        $("input[class^='rpFoot']").val('');
        $(".conclusion1").val('施工工况: ');
        $(".conclusion2").val('监测结论及建议:  ');
        $('#rpTitle').val(report.sheetTitle);//设置报表标题
        $.each(report.sheetHead, (idx, head) => $('#rpHeadId' + (parseInt(idx) + 1)).val(head));
      },

      /*保存并允许保存工作表*/
      saveSheet (title, content) {
        this.savedCount = this.infos.length;
        this.inputsToInfo();
        LayerExtend.showTipsLayer('保存成功 !');
        $('.btn-container').removeClass('col-md-2').addClass('col-md-4');
      },

      /*删除表单*/
      deleteSheet(index){
        this.infos.splice(index, 1);
        this.currentView = this.infos.length - 1;
        this.changeView(this.currentView);
      },

      /*清空表单*/
      clearSheet(){
        this.infos = [];
        this.currentView = 0;
        $('.report-detail').fadeOut();
      },

      /*切换页面内容*/
      changeView(index){
        this.inputsToInfo();
        this.currentView = index;
        this.initTable(this.infos[index].sheetMain.table);
        this.initChart(this.infos[index].sheetMain.chart);
        this.infoToInputs();
      },

      /*获取input的值生成集合*/
      getValue(elements, value){
        return _.map(elements, (e) => e[value]);
      },

      /*把input中的值赋值给info*/
      inputsToInfo(){
        this.canAddSheet = true;
        let info = this.infos[this.currentView];
        info.sheetHead = this.getValue($("input[class^='rpHead']"), 'value');
        info.sheetFoot = this.getValue($("input[class^='rpFoot']"), 'value');
        info.sheetMain.foot = this.getValue($("textarea[class^='conclusion']"), 'value');
      },

      /*把infos中的值赋给input*/
      infoToInputs(){
        let info = this.infos[this.currentView],
          headDoms = $("input[class^='rpHead']"),
          footDoms = $("input[class^='rpFoot']"),
          tableFootDoms = $("textarea[class^='conclusion']");
        $('#rpTitle').val(info.sheetTitle);
        /*表标题*/
        //doms长度一定与对应的info长度一直,否则报错
        if (info.sheetHead && headDoms.length > 0)        /*表头信息*/
          for (let i = 0, len = info.sheetHead.length; i < len; i++)
            headDoms[i].value = info.sheetHead[i];
        if (info.sheetFoot && footDoms.length > 0)        /*表脚信息*/
          for (let i = 0, len = info.sheetFoot.length; i < len; i++)
            footDoms[i].value = info.sheetFoot[i];
        if (info.sheetMain.foot && tableFootDoms.length > 0)        /*总结信息*/
          for (let i = 0, len = info.sheetMain.foot.length; i < len; i++)
            tableFootDoms[i].value = info.sheetMain.foot[i];
      },

      /*拼接字符串*/
      domToString(elements, array, sheetName){
        let doms = elements;
        let text, tempString = '', res = [];
        if (doms.length !== array.length) {
          console.error(sheetName + ' 键值数不对应');
          return;
        }
    for (let i = 0, len = doms.length; i < len; i++) {
          let dom = doms[i];
          let tagName = dom.tagName.toLowerCase();
          if (tagName === 'label') {
            text = dom.innerText;
            if (text !== null) {
              tempString = text + ':' + array[i];
              res.push(tempString);
            }
          }
          if (tagName === 'textarea') {
            res.push(array[i]);
          }
        }
        return res;
      },

      /*拼接字符串 键值对*/
      getInputString(elements){
        let doms = elements;
        let text, value, tempObj = {}, res = [];
    for (let i = 0, len = doms.length; i < len; i++) {
          let dom = doms[i];
          let tagName = dom.tagName.toLowerCase();
          if (tagName === 'label') {
            text = dom.innerText;
          } else if (tagName === 'input') {
            value = dom.value || ' ';
          }
          if (text !== null && value !== null) {
            Object.defineProperty(tempObj, text, {
              configurable: true,
              writable: true,
              enumerable: true,
              value: value
            });
            value = null;
            if ((i + 1) % 3 === 0 || i === doms.length - 1) {
              res.push(JSON.stringify(tempObj));
              tempObj = {};
            }
          }
        }
        return res;
      },

      /*获取填空值 返回填空值数组 或填空值字符串 没用*/
      getInputValues(elements){
        let doms = elements, res;
        if (doms instanceof Array) {
          for (let i = 0, len = doms.length; i < len; i++) {
            res.push(doms[i].value || ' ');
          }
          return res;
        } else return doms.value;
      },

      /*copy*/
      clone(obj) {
        var copy;
        switch (typeof obj) {
          case 'number':
          case 'string':
          case 'boolean':
            copy = obj;
            break;
          case 'object':
            if (obj === null) {
              copy = null
            } else if (toString.apply(obj) === '[object Array]') {
              copy = [];
              for (let i in obj) {
                copy.push(this.clone(obj[i]))
              }
            } else {
              copy = {};
              for (let j in obj) {
                copy[j] = this.clone(obj[j]);
              }
            }
            break;
          default:
            copy = obj;
            break;
        }
        return copy;
      },

      /*初始化日期控件*/
      initDatePicker(){
        let self = this, flashColor = 'rgb(173, 235, 251)';
        this.type = {id: 1, text: '日报表'};
        let options = {
          singleDatePicker: true,
          showDropdowns: true,
          timePicker24Hour: true, //24小时制
          timePickerIncrement: 1,
          timePicker: true,       //时分秒选择
          timePickerSeconds: true,//有无秒数
          linkedCalendars: true,
          cancelClass: "btn-warning",
          locale: {
            firstDay: 1,
            applyLabel: '确认',
            cancelLabel: '取消',
            customRangeLabel: '自定义范围',
            format: 'YYYY-MM-DD  HH:mm:ss',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          },
        };
        jQuery.fn.flash = function (color, duration) {
          let current = this.css('backgroundColor');
          let _this = this;
          this.css("backgroundColor", color);
          setTimeout(function () {
            _this.css("backgroundColor", current);
          }, duration);
        };
        let now = new Date(),
          yesterday = window.globalTool.getAnotherDate(now, -( self.getMillisecond(self.type.id, now, false)), 1);
        $('#startTime').daterangepicker($.extend(true, options, {startDate: yesterday}), function (date) {
          let days = self.getMillisecond(self.type.id, date, false);
          let endLocal = window.globalTool.getAnotherDate(date, +days, 1);
          $('#endTime').val(endLocal).flash(flashColor, 1000);
          $('#startTime').flash(flashColor, 1000);
        });
        $('#endTime').daterangepicker($.extend(true, options, {startDate: now}), function (date) {
          let days = self.getMillisecond(self.type.id, date, true);
          let startLocal = window.globalTool.getAnotherDate(date, -days, 1);
          $('#startTime').val(startLocal).flash(flashColor, 1000);
          $('#endTime').flash(flashColor, 1000);
        });
        $(".thisLastTime").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          timePicker24Hour: true, //24小时制
          timePickerIncrement: 1,
          timePicker: true,       //时分秒选择
          timePickerSeconds: false,//有无秒数
          locale: {
            format: 'YYYY-MM-DD HH:mm',//日期格式化
            firstDay: 1,
            applyLabel: '确认',    //中文化
            cancelLabel: '取消',   //中文化
            customRangeLabel: '自定义范围',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          },
        }, function (start, end) {
        })
      },

      /*计算天数*/
      getMillisecond(type, date, minus){
        let millisecond = 24 * 60 * 60 * 1000;
        switch (parseInt(type)) {
          case 1:
            return millisecond;
          case 2:
            return window.globalTool.daysOfWeek() * millisecond;
          case 3:
            return window.globalTool.daysOfMonth(date, minus) * millisecond;
          case 4:
            return window.globalTool.daysOfYear(date) * millisecond;
        }
      },

      /*如果是全站仪监测,需要选择解算类型与点类型*/
      getTotalStationParam(type){
        if (parseInt(type) === 20) {
          let self = this;
          layer.open({
            title: '<h4 style="color: #4898d5;font-weight: bold">全站仪查询条件</h4>',
            content: '<div class="totalStationPop">' +
            '<div class="input-group">' +
            '  <label for="pointType" class="input-group-addon addon-label">测点类型</label>' +
            '  <select id="pointType" class="form-control type-select" id="pointType">' +
            '    <option value=0>控制点</option>' +
            '    <option value=1 selected="selected">监测点</option>' +
            '  </select>' +
            '</div>' +
            '<div class="input-group">' +
            '  <label for="dataType" class="input-group-addon addon-label">数据类型</label>' +
            '  <select id="dataType" class="form-control type-select" id="calculatingType">' +
            '    <option value=0>极坐标数据</option>' +
            '    <option value=1 selected="selected">解算数据</option>' +
            '  </select>' +
            '</div>' +
            '</div>',
            btn: ['确定', '取消'],
            yes: function (index, layero) {
              self.calculatingType = $('#dataType').val();
              self.pointType = $('#pointType').val();
              layer.close(index);
            },
            btn1: function (index, layero) {
              layer.close(index);
            },
          });
        }
      },

      /*parseInt*/
      toNumber(data, replace){
        let res = null;
        if (data) {
          res = (typeof data === 'number' || typeof data === "string") ? parseInt(data) : replace;
        } else {
          res = replace;
        }
        return res;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9,
  .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9,
  .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9,
  .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
    position: relative;
    min-height: 1px;
    padding-right: 5px;
    padding-left: 5px;
  }

  .content {
    padding: 0;
    min-height: 0;
    background-color: #ffffff;
    margin-left: 15px;
    margin-right: 15px;
  }

  .content .row {
    margin-right: 0;
    margin-left: 0;
  }

  .report-detail {
    display: none;
    background-color: transparent;
    padding: 5px 0;
  }

  .report-detail .tab-box {
    font-size: 1em;
    min-height: 36px;
  }

  .report-detail .tab-box span {
    position: relative;
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid rgba(53, 149, 204, 0.51);
    border-radius: 6px 6px 0 0;
    font-size: inherit;
    text-align: center;
    cursor: pointer;
    color: #3595CC;
  }

  .report-detail .tab-box span .btn-delete-sheet {
    position: relative;
    right: -0.2em;
    font-size: 1.1em;
    border: 0 solid #3595CC;
    background-color: transparent;
  }

  .report-detail .tab-box a.btnSaveSheet, a.btnClearSheet {
    display: block;
    cursor: pointer;
    float: right;
    color: #ffffff;
    padding: 5px 12px;
    margin: 0 5px;
    font-size: inherit;
    border-radius: 5px;
    background-color: #3595CC;
  }

  .con-box {
    border: 1px dotted #3595CC;
    margin-top: -1px;
    padding: 10px;
  }

  .reportTitle {
    font-size: 1.5em;
    font-weight: bolder;
    text-align: center;
    min-height: 40px;
  }

  .reportTitle input {
    border: none #FFFFFF;
    background: transparent;
    text-align: center;
    width: 100%;
    margin-bottom: 5px;
    /*outline: none;*/
  }

  .reportHead input,
  .reportFoot input {
    border: none #FFFFFF;
    border-bottom: #777777 solid 1px;
    background: transparent;
    outline: none;
    width: 15vw;
    text-align: center;
    min-width: 70px;
  }

  .input-group-addon {
    color: #000;
    border-color: transparent;
    background-color: transparent;
    font-size: 1.1em;
    font-weight: 500;
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
    padding: 6px 6px 6px 12px;
  }

  .reportHead label,
  .reportFoot label {
    margin-left: 10px;
    margin-right: 5px;
    background: #ffffff;
  }

  .thisLastTime {
    border: none #FFFFFF;
    border-bottom: #777777 solid 1px;
    background: transparent;
    outline: none;
    width: 15vw;
    text-align: center;
    padding: 1px;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }

  .reportHead input.year {
    width: 50px;
  }

  .reportHead input.time {
    width: 28px;
  }

  .reportMain {
    min-height: 20vh;
  }

  table {
    border: 1px solid #939393;
  }

  textarea {
    resize: none;
    outline: none;
    width: 95%;
    padding: 20px;
    margin: 0 20px;
    font-size: 1em;
    font-weight: bolder;
    border-radius: 2px;
    background-color: transparent;
  }

  @media (max-width: 768px) {
    .reportHead #rpHeadId1 {
      width: 90%;
    }
  }

  @media (max-width: 550px) {
    .report-detail .tab-box span {
      width: 75px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      padding: 5px 7px;
    }

    .report-detail .tab-box span .btn-delete-sheet {
      position: absolute;
      float: right;
      right: 0.05em;
      font-size: 1.2em;
    }

    .report-detail .tab-box a.btnSaveSheet, a.btnClearSheet {
      margin: 0 3px;
    }
  }

  .highlight {
    background-color: transparent;
    animation: highlight 3s;
    animation-iteration-count: 1;
  }

  @keyframes highlight {
    0% {
      background-color: transparent;
    }
    25% {
      background-color: #eea236;
    }
    50% {
      background-color: #eea236;
    }
    100% {
      background-color: transparent;
    }

  }
</style>
