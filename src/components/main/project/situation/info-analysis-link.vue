<template>
  <div class="box box-info box-solid div-margin-bottom">
    <div class="box-body">
      <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 wrap-padding">
        <div class="clearfix">
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 wrap-padding">
            <div class="input-group ">
              <label class="input-group-addon addon-label">监测项一</label>
              <vue-select2 :ajax=true :multiple=false :paging=false v-ref:item-selector1
                           :ajax-url="monitorItem1.ajaxUrl"
                           :init-data="monitorItem1.initData"
                           :placeholder="monitorItem1.placeholder"
                           :evt-selected="monitorItem1.evtSelected"></vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 wrap-padding">
            <div class="input-group">
              <label class="input-group-addon addon-label">测点一</label>
              <vue-select2 :ajax=true :multiple=false :paging=false v-ref:point-selector1
                           :ajax-url="monitorPoint1.ajaxUrl"
                           :init-data="monitorPoint1.initData"
                           :placeholder="monitorPoint1.placeholder"
                           :evt-selected="monitorPoint1.evtSelected">
              </vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 wrap-padding">
            <div class="input-group">
              <label class="input-group-addon addon-label">数据类型一</label>
              <vue-select2 :ajax=false :multiple=false :paging=false v-ref:attr-selector1
                           :init-data="attrValueOption1.initData"
                           :placeholder="attrValueOption1.placeholder"
                           :evt-selected="attrValueOption1.evtSelected"
                           :local-data="attrValueOption1.localData"></vue-select2>
            </div>
          </div>
        </div>
        <div class="">
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 wrap-padding">
            <div class="input-group ">
              <label class="input-group-addon addon-label">监测项二</label>
              <vue-select2 :ajax=true :multiple=false :paging=false v-ref:item-selector2
                           :ajax-url="monitorItem2.ajaxUrl"
                           :init-data="monitorItem2.initData"
                           :placeholder="monitorItem2.placeholder"
                           :evt-selected="monitorItem2.evtSelected"></vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 wrap-padding">
            <div class="input-group">
              <label class="input-group-addon addon-label">测点二</label>
              <vue-select2 :ajax=true :multiple=false :paging=false v-ref:point-selector2
                           :ajax-url="monitorPoint2.ajaxUrl"
                           :init-data="monitorPoint2.initData"
                           :placeholder="monitorPoint2.placeholder"
                           :evt-selected="monitorPoint2.evtSelected">
              </vue-select2>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 wrap-padding">
            <div class="input-group">
              <label class="input-group-addon addon-label">数据类型二</label>
              <vue-select2 :ajax=false :multiple=false :paging=false v-ref:attr-selector2
                           :init-data="attrValueOption2.initData"
                           :placeholder="attrValueOption2.placeholder"
                           :evt-selected="attrValueOption2.evtSelected"
                           :local-data="attrValueOption2.localData"></vue-select2>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding">
          <div class="input-group">
            <label class="input-group-addon addon-label">日期</label>
            <div><input class="daterangepicker form-control" id="dateSelect"/></div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 wrap-padding">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 wrap-padding">
          <button id="btnQuery" class="btn btn-info" v-on:click.capture="query()">查询</button>
        </div>
      </div>
    </div>
  </div>
  <div class="min-wrapper" v-if="chartExist">
    <div class="min-size">
      <img id="loading" src="/static/image/spinner_B.gif" class="chartImg"/>
      <div id="container"></div>
    </div>
  </div>
</template>
<script>
  import AnalysisEnum from '../../managers/enum/analysis-enum';
  export default {
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        projectId: {},
        chart: {},
        chartExist: true,
        itemOption1: {},//this.getItemMark(监测项一)
        itemOption2: {},//this.getItemMark(监测项二)
        attrOption1: [],//数据类型(监测项一) attrOption1[0] => attr1
        attrOption2: [],//数据类型(监测项二) attrOption2[0] => attr2
        attrValue1: null,//for <select1>
        attrValue2: null,//for <select2>
        attrText1: null,//for chart series show
        attrText2: null,//for chart series show
        startEndDate: {},//用于显示在控件中，this.info.startEndDate有局限性
        monitorItem1: {
          initData: [],
          placeholder: '请选择监测项',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              let item = data[0].obj;
              this.info.itemObj = item;
              this.$dispatch('monitorItem', item);
              this.itemOption1 = AnalysisEnum.getItemMark(item.monitorTypeId);
              let dataType = this.itemOption1.dataType;
              this.attrValue1 = dataType[0].value;
              this.attrText1 = dataType[0].text;
              this.attrUnit1 = dataType[0].unit;
              this.$refs.attrSelector1.$emit('changeLocal', dataType);
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorItemPage_U(this.projectId);
          }.bind(this)
        },
        monitorItem2: {
          initData: [],
          placeholder: '请选择监测项',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              let item = data[0].obj;
              this.info.itemObj2 = item;
              this.$dispatch('monitorItem2', item, false);
              this.itemOption2 = AnalysisEnum.getItemMark(item.monitorTypeId);
              let dataType = this.itemOption2.dataType;
              this.attrValue2 = dataType[0].value;
              this.attrText2 = dataType[0].text;
              this.attrUnit2 = dataType[0].unit;
              this.$refs.attrSelector2.$emit('changeLocal', dataType);
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorItemPage_U(this.projectId);
          }.bind(this)
        },
        pointObj: {},//新建一个对象, 防止污染父组件中的this.info,pointObj
        monitorPoint1: {
          initData: [],
          placeholder: '请选择监测点',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.pointObj = data[0].obj;
//              if (this.info.pointObj2 && this.info.pointObj2.id) {
//                $('#btnQuery').attr('disabled', false);
//              }
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getRelPointOfItems(this.info.itemObj.id);
          }.bind(this)
        },
        monitorPoint2: {
          initData: [],
          placeholder: '请选择监测点',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.info.pointObj2 = data[0].obj;
//              if (this.pointObj && this.pointObj.id) {
//                $('#btnQuery').attr('disabled', false);
//              }
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getRelPointOfItems(this.info.itemObj2.id);
          }.bind(this)
        },
        attrValueOption1: {
          initData: [],
          placeholder: '请选择数据类型',
          localData: [],
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.attrValue1 = data[0].id;
              this.attrText1 = data[0].text;
              this.attrUnit1 = data[0].obj.unit;
            }
          }.bind(this)
        },
        attrValueOption2: {
          initData: [],
          placeholder: '请选择数据类型',
          localData: [],
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.attrValue2 = data[0].id;
              this.attrText2 = data[0].text;
              this.attrUnit2 = data[0].obj.unit;
            }
          }.bind(this)
        },
      };
    },
    created: function () {
      this.$on('updateItem', function (data) {
        if (data) {
          this.info.itemObj = data;
          this.itemOption1 = AnalysisEnum.getItemMark(data.monitorTypeId);
          const dataType = this.itemOption1.dataType;
          this.attrValue1 = dataType[0].value;
          this.attrText1 = dataType[0].text;
          this.attrUnit1 = dataType[0].unit;
          this.$refs.itemSelector1.$emit('update', [{id: data.id, text: data.name, obj: data}]);
          this.$refs.attrSelector1.$emit('changeLocal', dataType);
        } else {
          this.info.itemObj = {};
          this.$refs.itemSelector1.clear(true);
        }
      });
      this.$on('updateItem2', function (data) {
        if (data) {
          this.info.itemObj2 = data;
          this.itemOption2 = AnalysisEnum.getItemMark(data.monitorTypeId);
          const dataType = this.itemOption2.dataType;
          this.attrValue2 = dataType[0].value;
          this.attrText2 = dataType[0].text;
          this.attrUnit2 = dataType[0].unit;
          this.$refs.itemSelector2.$emit('update', [{id: data.id, text: data.name, obj: data}]);
          this.$refs.attrSelector2.$emit('changeLocal', dataType);
        } else {
          this.info.itemObj = {};
          this.$refs.itemSelector2.clear(true);
        }
      });
      this.$on('updatePoint', function (data) {
        if (data && data.length > 0) {  //这里的data就是父组件中的this.info,pointObj
          this.info.pointObj = data.slice(0, 1);
          this.pointObj = data[0];
          this.$refs.pointSelector1.clear(true);
          this.$refs.pointSelector1.$emit('update', [{
            id: this.pointObj.id,
            text: this.pointObj.name,
            obj: this.pointObj
          }]);
        } else {
          this.pointObj = {};
          this.$refs.pointSelector1.clear(true);
        }
        this.isRender = true;
      }.bind(this));
      this.$on('updatePoint2', function (data, autoReq) {
        if (data) {
          this.$refs.pointSelector2.clear(true);
          this.$refs.pointSelector2.$emit('update', [{id: data.id, text: data.name, obj: data}]);
          if (autoReq) {
            let times = 50;
            let interval = setInterval(function () {
              times--;
              if (this.pointObj && this.pointObj.id) {
                this.info.pointObj2 = data;
                this.getChartData(this.info.itemObj, this.info.itemObj2, this.pointObj, this.info.pointObj2,
                  this.itemOption1.url, this.itemOption2.url, this.attrValue1, this.attrValue2, this.attrText1, this.attrText2, this.attrUnit1, this.attrUnit2);
                clearInterval(interval);
              } else if (times <= 0) {
                clearInterval(interval);
              }
            }.bind(this), 500);
          }
        } else {
          this.info.pointObj2 = {};
          this.$refs.pointSelector2.clear(true);
        }
      });
    },
    mounted () {
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
      this.info = Object.assign({}, this.info);
      this.initDateRangePicker(this.info.startEndDate);
      this.initDateTime();
      this.initItemOption();
    },
    methods: {
      initItemOption(){
        if (this.info.itemObj) {//监测项一
          let item = this.info.itemObj;
          this.itemOption1 = AnalysisEnum.getItemMark(item.monitorTypeId);
          const DataType1 = this.itemOption1.dataType;
          this.attrValue1 = DataType1[0].value;
          this.attrText1 = DataType1[0].text;
          this.attrUnit1 = DataType1[0].unit;
          this.monitorItem1.initData.push({id: item.id, text: item.name, obj: item});  //*渲染 监测项 下拉框*
          setTimeout(function () {
            this.$refs.attrSelector1.$emit('changeLocal', DataType1);          //*渲染 数据类型 下拉框*
          }.bind(this), 500);

          if (this.info.itemObj2) {//监测项二
            item = this.info.itemObj2;
            this.itemOption2 = AnalysisEnum.getItemMark(item.monitorTypeId);
            const DataType2 = this.itemOption2.dataType;
            this.attrValue2 = DataType2[0].value;
            this.attrText2 = DataType2[0].text;
            this.attrUnit2 = DataType2[0].unit;
            this.monitorItem2.initData.push({id: item.id, text: item.name, obj: item});
            setTimeout(function () {
              this.$refs.attrSelector2.$emit('changeLocal', DataType2);          //*渲染 数据类型 下拉框*
            }.bind(this), 500);
          }
          this.initPointOption();
        }
      },
      initPointOption(){
        if (this.info.pointObj && this.info.pointObj.length > 0) {//监测项一的第一个监测点
          this.pointObj = this.info.pointObj[0];
          this.monitorPoint1.initData.push({id: this.pointObj.id, text: this.pointObj.name, obj: this.pointObj});
        }
        if (this.info.pointObj2) {//监测项二的第一个监测点
          let point = this.info.pointObj2;
          this.monitorPoint2.initData.push({id: point.id, text: point.name, obj: point});
          /*渲染 测点 下拉框*/
          /*初始化查询*/
          this.getChartData(this.info.itemObj, this.info.itemObj2, this.pointObj, this.info.pointObj2,
            this.itemOption1.url, this.itemOption2.url, this.attrValue1, this.attrValue2, this.attrText1, this.attrText2, this.attrUnit1, this.attrUnit2);
        }
      },
      initDateRangePicker(startEndDate){
        let that = this;
        $("#dateSelect").daterangepicker({
          opens: "left",
          timePicker24Hour: true,
          timePickerIncrement: 1,
//          startDate: startEndDate.startDate.dateS,
//          endDate: startEndDate.endDate.dateS,
          dateLimit: {'months': 1},
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
          that.startEndDate.startDate.dateL = start.format('YYYY-MM-DD HH:mm:ss');
          that.startEndDate.startDate.dateS = start.format('YYYY-MM-DD');
          that.startEndDate.endDate.dateL = end.format('YYYY-MM-DD HH:mm:ss');
          that.startEndDate.endDate.dateS = end.format('YYYY-MM-DD');
          that.dateSelect = true;
        });
        $('#dateSelect').on('cancel.daterangepicker', function (ev, picker) {
          $("#dateSelect").val('请选择日期');
        });
      },
      initDateTime(){
        if (!this.info.startEndDate) {
          this.info.startEndDate = this.getDefaultTime();
//          this.info.startEndDate.startDate.dateL = '1000-01-01 00:00:00';
//          this.info.startEndDate.endDate.dateL = "9999-12-31 23:59:59";
        }
//        else if (this.info.dateCheck) {}
        this.startEndDate = this.info.startEndDate;
        if (!this.startEndDate.startDate) {
          $("#dateSelect").val('请选择日期');
        } else {
          $("#dateSelect").data('daterangepicker').setStartDate(this.startEndDate.startDate.dateS);
          $("#dateSelect").data('daterangepicker').setEndDate(this.startEndDate.endDate.dateS);
        }
      },
      getDefaultTime(){/*获取最近一万点时间段*/
        let startEndDate = {};
        let eDate = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
        let sDate = new Date(eDate.getTime() - 10 * 24 * 60 * 60 * 1000 + 1000);//10日
        startEndDate.startDate = this.formatDate(sDate);
        startEndDate.endDate = this.formatDate(eDate);
        return startEndDate;
      },
      getChartData(itemObj1, itemObj2, pointObj1, pointObj2, Url1, Url2, attrValue1, attrValue2, attrText1, attrText2, attrUnit1, attrUnit2){
        if (itemObj1) {
          if (Url1 && Url2 && attrValue1 && attrValue2) {
            let value1 = null, value2 = null//数据类型
              , text1 = null, text2 = null//显示所需
              , unit1 = null, unit2 = null//单位
              , largeItem = {}, smallItem = {}//this.info.itemObj
              , largePoint = {}, smallPoint = {}//this.info.pointObj
              , largeList = [], smallList = []//dataList1与dataList2比较后的数据
              , largeSeries = [], smallSeries = []//处理后的数据集，用于chart
              , largeType = null, smallType = null
              , dataList1 = [], dataList2 = [];//异步请求返回的数据
            let itemType1 = itemObj1.monitorTypeId;
            let itemType2 = itemObj2.monitorTypeId;
            let pointName1 = encodeURIComponent(pointObj1.name);
            let pointName2 = encodeURIComponent(pointObj2.name);
            window.mainConfig.http.getMonitorItemData_R(Url1, 2, itemObj1.id, this.projectId, pointName1,
              this.info.startEndDate.startDate.dateL, this.info.startEndDate.endDate.dateL, {
                syncNo: 1, pageIndex: 1, pageSize: 1000
              }, itemType1).then((response) => {
              dataList1 = response.data.dataList;
              window.mainConfig.http.getMonitorItemData_R(Url2, 2, itemObj2.id, this.projectId, pointName2,
                this.info.startEndDate.startDate.dateL, this.info.startEndDate.endDate.dateL, {
                  syncNo: 1, pageIndex: 1, pageSize: 1000
                }, itemType2).then((response) => {
                dataList2 = response.data.dataList;
                if (dataList1.length >= dataList2.length) {
                  largeList = dataList1;
                  smallList = dataList2;
                  largeItem = itemObj1;
                  smallItem = itemObj2;
                  largePoint = pointObj1;
                  smallPoint = pointObj2;
                  largeType = itemType1;
                  smallType = itemType2;
                  value1 = attrValue1;
                  value2 = attrValue2;
                  text1 = attrText1;
                  text2 = attrText2;
                  unit1 = attrUnit1;
                  unit2 = attrUnit2;
                } else {
                  largeList = dataList2;
                  smallList = dataList1;
                  largeItem = itemObj2;
                  smallItem = itemObj1;
                  largePoint = pointObj2;
                  smallPoint = pointObj1;
                  largeType = itemType2;
                  smallType = itemType1;
                  value1 = attrValue2;
                  value2 = attrValue1;
                  text1 = attrText2;
                  text2 = attrText1;
                  unit1 = attrUnit2;
                  unit2 = attrUnit1;
                }
                largeList.sort(function (a, b) {
                  return new Date(a.dtime || a.dateTime) - new Date(b.dtime || b.dateTime);
                });
                smallList.sort(function (a, b) {
                  return new Date(a.dtime || a.dateTime) - new Date(b.dtime || b.dateTime);
                });
                largeSeries = _.map(largeList, function (list1) {
                  let value = list1[value1];
                  if (largeType === 20) value = value * 1000;
                  return [Date.parse(list1.dtime || list1.dateTime), value];
                });
                smallSeries = _.map(smallList, function (list2) {
                  let value = list2[value2];
                  if (largeType === 20) value = value * 1000;
                  return [Date.parse(list2.dtime || list2.dateTime), value];
                });
                this.createChart(largeItem, smallItem, largePoint, smallPoint, text1, text2, unit1, unit2, largeSeries, smallSeries);
              }, (response) => {
                toastr.error('通信失败');
              });
            }, (response) => {
              toastr.error('通信失败');
            });
          } else {
            toastr.info('该监测项暂无数据分析功能');
            if (this.chart.chartHeight) this.chart.destroy();
            $('#loading').attr('src', 'static/image/data-empty-200.jpg');
          }
        }
      },
      createChart(largeItem, smallItem, largePoint, smallPoint, attrText1, attrText2, attrUnit1, attrUnit2, largeSeries, smallSeries) {
        Highcharts.getOptions().colors = ['#ff8532', '#4eb43a'];
        Highcharts.setOptions({
          global: {useUTC: false},
          lang: {
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            rangeSelectorFrom: '从',
            rangeSelectorTo: '到'
          }
        });
        if (largeItem && smallItem && attrText1 && attrText2 && largeSeries && smallSeries) {
          this.chart = Highcharts.stockChart('container', {
            credits: {enabled: false},
            lang: {
              rangeSelectorZoom: '',
              months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
              shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            },
            chart: {
              plotBorderColor: 'rgba(0,0,225,0.1)',
              plotBorderWidth: 2,//整幅图的边框粗
              marginLeft: 100,//整幅图的偏移量
              marginRight: 100
            },
            title: {
              text: largeItem.name + '  与  ' + smallItem.name + ' 对比图',
              align: 'center',//标题在图首的位置：左中右
              margin: 1,//标题和图表区之间的边距
              style: {
                color: '#3595cc',
                fontWeight: 'bold',
                fontSize: '20px'
              },
              widthAdjust: -200,//调整title宽度，通常给打印button留位置
            },
            xAxis: {
              title: {
                text: '时间',
                align: 'high'
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
            },
            yAxis: [
              { // Primary yAxis 左Y轴
                labels: {
                  format: '{value} ' + attrUnit1,
                  lineWidth: 1,
                  style: {
                    color: Highcharts.getOptions().colors[0]
                  }
                },
                title: {
                  align: 'high',
                  textAlign: 'left',
                  margin: 0,
                  offset: 0,
                  rotation: 0,
                  x: -50,
                  y: -3,
                  text: /* largeItem.name + '-' +*/ largePoint.name,
                  style: {
                    color: Highcharts.getOptions().colors[0],
                    fontSize: 14,
                  }
                },
                opposite: false,
              },
              { // Secondary yAxis 右Y轴
                title: {
                  align: 'high',
                  textAlign: 'right',
                  margin: 0,
                  offset: 0,
                  rotation: 0,
                  x: 50,
                  y: -3,
                  text: /*smallItem.name + '-' +*/ smallPoint.name,
                  style: {
                    color: Highcharts.getOptions().colors[1],
                    fontSize: 14,
                  }
                },
                labels: {
                  format: '{value} ' + attrUnit2,
                  lineWidth: 1,
                  style: {
                    color: Highcharts.getOptions().colors[1]
                  }
                },
                opposite: true,
              }],
            series: [
              {
                type: 'spline',
                name: largeItem.name + '-' + largePoint.name + '-' + attrText1,
                data: largeSeries,
                marker: {
                  enabled: true,
                },
              }, {
                type: 'spline',
                name: smallItem.name + '-' + smallPoint.name + '-' + attrText2,
                data: smallSeries,
                yAxis: 1,
                marker: {
                  enabled: true,
                },
              }],
//                    colors: ['#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
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
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
              valueDecimals: 3,
              split: true
            },
            scrollbar: {
              liveRedraw: true,
              barBackgroundColor: '#ff8532', //滚动条
              barBorderRadius: 7,
              barBorderWidth: 0,
              buttonBackgroundColor: '#f1a838', //圆形按钮
              buttonBorderWidth: 0,
              buttonBorderRadius: 7,
              trackBackgroundColor: 'rgba(08,250,03,0.1)',
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
              buttons: [
                {
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
                width: 30,
                fill: 'none',
                stroke: 'none',
                'stroke-width': 0,
                r: 8,
                style: {
                  color: '#089903',
                  fontWeight: 'bold'
                },
                states: {
                  hover: {},
                  select: {
                    fill: '#089903',
                    style: {
                      color: 'white'
                    }
                  }
                  // disabled: { ... }
                }
              },
              inputEnabled: true,
              selected: 0
            },
          });
        }
      },//createChart
      query(){
        if (!this.pointObj || !this.pointObj.id) {
          toastr.warning('请选择测点');
          return;
        }
        this.chartExist = true;
//        this.chart = Highcharts.stockChart('container');
//        this.chart.showLoading("<img src='../static/image/processing.gif'>  载入中...");
        this.getChartData(this.info.itemObj, this.info.itemObj2, this.pointObj, this.info.pointObj2,
          this.itemOption1.url, this.itemOption2.url, this.attrValue1, this.attrValue2, this.attrText1, this.attrText2, this.attrUnit1, this.attrUnit2);
      },
      formatDate(objDate){
        let date = {},
          year = objDate.getFullYear(),
          month = objDate.getMonth() + 1,
          day = objDate.getDate(),
          hour = ('0' + objDate.getHours()).slice(-2),
          minute = ('0' + objDate.getMinutes()).slice(-2),
          second = ('0' + objDate.getSeconds()).slice(-2);
        if (month.toString().length === 1) month = '0' + month;
        if (day.toString().length === 1) day = '0' + day;
        date.dateS = year + '-' + month + '-' + day;
        date.dateL = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return date;
      },
    }//methods
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
    border: 1px solid rgba(61, 155, 179, 0.56);
    border-radius: 5px;
    /*overflow-x: auto;*/
  }

  .min-size {
    width: inherit;
    /*min-width: 550px;*/
  }

  .chartImg {
    position: absolute;
    margin-left: 35vw;
    transform: translate(0, 80%);
  }

  #container {
    min-width: 400px;
  }

  .btn-info {
    float: right;
  }

  @media screen and(max-width: 768px) {
    .btn-info {
      margin-left: auto;
      margin-right: auto;
      display: inherit;
      float: right;
    }

    .min-wrapper {
      overflow-x: auto;
    }
  }
</style>

