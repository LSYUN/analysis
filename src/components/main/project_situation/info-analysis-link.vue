<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
    <div class="box box-info box-solid div-margin-bottom">
      <div class="box-body">
        <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 wrap-padding">
          <div class="clearfix">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 wrap-padding">
              <div class="input-group ">
                <label class="input-group-addon addon-label">监测项一</label>
                <vue-select2 :ajax=true :multiple=false :paging=false ref="itemSlt1"
                             :ajax-url="itemOption1.ajaxUrl"
                             :init-data="itemOption1.initData"
                             :placeholder="itemOption1.placeholder"
                             :evt-selected="itemOption1.evtSelected"></vue-select2>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 wrap-padding">
              <div class="input-group">
                <label class="input-group-addon addon-label">测点一</label>
                <vue-select2 :ajax=true :multiple=false :paging=false ref="pointSlt1"
                             :ajax-url="pointOption1.ajaxUrl"
                             :init-data="pointOption1.initData"
                             :placeholder="pointOption1.placeholder"
                             :evt-selected="pointOption1.evtSelected">
                </vue-select2>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 wrap-padding">
              <div class="input-group">
                <label class="input-group-addon addon-label">数据类型一</label>
                <vue-select2 :ajax=false :multiple=false :paging=false ref="attrSlt1"
                             :init-data="attrOption1.initData"
                             :placeholder="attrOption1.placeholder"
                             :evt-selected="attrOption1.evtSelected"
                             :local-data="attrOption1.localData"></vue-select2>
              </div>
            </div>
          </div>
          <div class="">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 wrap-padding">
              <div class="input-group ">
                <label class="input-group-addon addon-label">监测项二</label>
                <vue-select2 :ajax=true :multiple=false :paging=false ref="itemSlt2"
                             :ajax-url="itemOption2.ajaxUrl"
                             :init-data="itemOption2.initData"
                             :placeholder="itemOption2.placeholder"
                             :evt-selected="itemOption2.evtSelected"></vue-select2>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 wrap-padding">
              <div class="input-group">
                <label class="input-group-addon addon-label">测点二</label>
                <vue-select2 :ajax=true :multiple=false :paging=false ref="pointSlt2"
                             :ajax-url="pointOption2.ajaxUrl"
                             :init-data="pointOption2.initData"
                             :placeholder="pointOption2.placeholder"
                             :evt-selected="pointOption2.evtSelected">
                </vue-select2>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 wrap-padding">
              <div class="input-group">
                <label class="input-group-addon addon-label">数据类型二</label>
                <vue-select2 :ajax=false :multiple=false :paging=false ref="attrSlt2"
                             :init-data="attrOption2.initData"
                             :placeholder="attrOption2.placeholder"
                             :evt-selected="attrOption2.evtSelected"
                             :local-data="attrOption2.localData"></vue-select2>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrap-padding">
            <div class="input-group">
              <label class="input-group-addon addon-label">日期</label>
              <span>
                <div class="col-xs-6 picker-wrapper">
                  <input id="dateSelect1" class="form-control daterangepicker" placeholder="请选择开始时间">
                </div>
                <div class="col-xs-6 picker-wrapper">
                  <input id="dateSelect2" class="form-control daterangepicker" placeholder="请选择结束时间">
                </div>
              </span>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 wrap-padding">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 wrap-padding">
            <button class="btn btn-info" v-on:click.capture="query()">查询</button>
          </div>
        </div>
      </div>
    </div>
    <div class="min-wrapper" v-if="chartExist">
      <div class="min-size">
        <!--<img id="loading" src="/static/image/spinner_B.gif" class="chartImg"/>-->
        <div id="container"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import AnalysisEnum from '../../../managers/enum/analysis-enum';
  export default {
    computed: {
      itemObj1: {
        set: function (obj) {
          if (obj && obj.hasOwnProperty('id')) this.$store.dispatch('setItemObj1', obj);
        },
        get: function () {
          return this.$store.getters.getItemObj1;
        }
      },
      itemObj2: {
        set: function (obj) {
          if (obj && obj.hasOwnProperty('id')) this.$store.dispatch('setItemObj2', obj);
        },
        get: function () {
          return this.$store.getters.getItemObj2;
        }
      },
      groupObj: {
        set: function (obj) {
          if (obj && obj.hasOwnProperty('id')) this.$store.dispatch('setItemObj2', obj);
        },
        get: function () {
          return this.$store.getters.getItemObj2;
        }
      },
      pointObj1: {
        set: function (obj) {
          if (obj && obj.hasOwnProperty('id')) this.$store.dispatch('setPointObj1', obj);
        },
        get: function () {
          return this.$store.getters.getPointObj1;
        }
      },
      pointObj2: {
        set: function (obj) {
          if (obj && obj.hasOwnProperty('id')) this.$store.dispatch('setPointObj2', obj);
        },
        get: function () {
          return this.$store.getters.getPointObj2;
        }
      },
      startDate: {
        set: function (obj) {
          this.$store.dispatch('setStartDate', obj);
        },
        get: function () {
          return this.$store.getters.getStartDate || '1000-01-01 00:00:00';
        }
      },
      endDate: {
        set: function (obj) {
          this.$store.dispatch('setEndDate', obj);
        },
        get: function () {
          return this.$store.getters.getEndDate || '9999-12-31 23:59:59';
        }
      },
    },
    data () {
      return {
        projectId: {},
        chart: {},
        chartExist: true,
        url1: {},//第一个监测项url
        url2: {},//第二个监测项url
        attrValue1: null,//数据类型(后台对应字段)
        attrValue2: null,//数据类型(后台对应字段)
        attrText1: null,//数据类型(中文,显示)
        attrText2: null,//数据类型(中文,显示)
        attrUnit1: null,//数据类型(单位,显示)
        attrUnit2: null,//数据类型(单位,显示)
        itemOption1: {
          initData: [],
          placeholder: '请选择监测项',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              let item = data[0].obj;
              this.itemObj1 = item;
              let itemOption = AnalysisEnum.getItemMark(item.monitorTypeId);
              let dataType = itemOption.dataType;
              this.attrValue1 = dataType[0].value;
              this.attrText1 = dataType[0].text;
              this.attrUnit1 = dataType[0].unit;
              this.$refs.attrSlt1.changeLocal(dataType);  //更新"数据类型一"框
              this.updatePointByItem(item.id, this.pointObj1, this.$refs.pointSlt1);
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorItemPage_U(this.projectId);
          }.bind(this)
        },
        itemOption2: {
          initData: [],
          placeholder: '请选择监测项',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              let item = data[0].obj;
              this.itemObj2 = item;
              let itemOption = AnalysisEnum.getItemMark(item.monitorTypeId);
              let dataType = itemOption.dataType;
              this.attrValue2 = dataType[0].value;
              this.attrText2 = dataType[0].text;
              this.attrUnit2 = dataType[0].unit;
              this.$refs.attrSlt2.changeLocal(dataType);   //更新"数据类型一"框
              this.updatePointByItem(item.id, this.pointObj2, this.$refs.pointSlt2);
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorItemPage_U(this.projectId);
          }.bind(this)
        },
        pointOption1: {
          initData: [],
          placeholder: '请选择监测点',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.pointObj1 = data.map(d => (d && d.hasOwnProperty('obj')) && d.obj);
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getRelPointOfItems(this.itemObj1.id);
          }.bind(this)
        },
        pointOption2: {
          initData: [],
          placeholder: '请选择监测点',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.pointObj2 = data.map(d => (d && d.hasOwnProperty('obj')) && d.obj);
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getRelPointOfItems(this.itemObj2.id);
          }.bind(this)
        },
        attrOption1: {
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
        attrOption2: {
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
                this.getChartData(this.itemObj1, this.itemObj2, this.pointObj1, this.pointObj2, this.url1, this.url2,
                  this.attrValue1, this.attrValue2, this.attrText1, this.attrText2, this.attrUnit1, this.attrUnit2);
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
      this.initDatePicker();
      this.initItemOption();
      this.initPointOption();
    },
    methods: {
      /***
       * 初始化监测项选项, this.itemObj1 自动从 store 中获取
       */
      initItemOption(){
        if (this.itemObj1 && this.itemObj1.hasOwnProperty('id')) {
          let item1 = Object.assign({}, this.itemObj1);
          let item2 = Object.assign({}, this.itemObj2);
          let option1 = AnalysisEnum.getItemMark(item1.monitorTypeId);
          let option2 = AnalysisEnum.getItemMark(item2.monitorTypeId);
          let dataType1 = option1.dataType;
          let dataType2 = option2.dataType;
          this.url1 = option1.url;
          this.url2 = option2.url;
          this.attrValue1 = dataType1[0].value;
          this.attrValue2 = dataType2[0].value;
          this.attrText1 = dataType1[0].text;
          this.attrText2 = dataType2[0].text;
          this.attrUnit1 = dataType1[0].unit;
          this.attrUnit2 = dataType2[0].unit;
          if (this.$refs.itemSlt1) this.$refs.itemSlt1.update([{id: item1.id, text: item1.name, obj: item1}]);
          if (this.$refs.itemSlt2) this.$refs.itemSlt2.update([{id: item2.id, text: item2.name, obj: item2}]);
          if (this.$refs.attrSlt1) this.$refs.attrSlt1.changeLocal(dataType1);
          if (this.$refs.attrSlt2) this.$refs.attrSlt2.changeLocal(dataType2);
        }
      },

      /***
       * 初始化点组选项
       */
      initPointOption(){
        let point1 = Object.assign({}, this.pointObj1[0]);
        let point2 = Object.assign({}, this.pointObj2[0]);
        if (this.$refs.pointSlt1) this.$refs.pointSlt1.update([{id: point1.id, text: point1.name, obj: point1}]);
        if (this.$refs.pointSlt2) this.$refs.pointSlt2.update([{id: point2.id, text: point2.name, obj: point2}]);
      },

      updatePointByItem(itemId, obj, refs){
        window.mainConfig.http.getFirstPointOfItem(itemId).then((response) => {
          let option = response.data;
          if (option && option.length > 0) {
            obj = option;
            if (refs) refs.update([{id: option[0].id, text: option[0].name, obj: option[0]}]);
          } else {
            obj = [];
            if (refs) refs.update([{id: null, text: '无数据'}]);
          }
        }, (response) => {
          toastr.error('通信失败');
        });
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
        $("#dateSelect1").daterangepicker(option)
          .on('apply.daterangepicker', function (ev, date) {  //'应用'按钮回调函数
            //确保开始时间与借宿时间都有值才勾选复选框
            if (!_this.dateCheckD && _this.endDate && typeof _this.endDate === 'string') _this.dateCheckD = true;
            _this.startDate = date.startDate.format('YYYY-MM-DD HH:mm:ss');
          })
          .on('cancel.daterangepicker', function () {  //'取消'按钮回调函数
            $("#dateSelect1").val(start);
            _this.dateCheckD = false;
            _this.startDate = '';
          })
          .val(start); //初始值

        $("#dateSelect2").daterangepicker(option)
          .on('apply.daterangepicker', function (ev, date) {
            if (!_this.dateCheckD && _this.startDate && typeof _this.startDate === 'string') _this.dateCheckD = true;
            _this.endDate = date.startDate.format('YYYY-MM-DD HH:mm:ss');
            (_this.startDate === date.startDate.format('YYYY-MM-DD HH:mm:ss')) && (_this.endDate = date.startDate.format('YYYY-MM-DD 23:59:59'));
          })
          .on('cancel.daterangepicker', function () {
            $("#dateSelect2").val(end);
            _this.dateCheckD = false;
            _this.endDate = '';
          })
          .val(end);
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
      getChartData(itemObj1, itemObj2, pointObj1, pointObj2, url1, url2, attrValue1, attrValue2, attrText1, attrText2, attrUnit1, attrUnit2){
        if (itemObj1) {
          if (url1 && url2 && attrValue1 && attrValue2) {
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
            window.mainConfig.http.getMonitorItemData_R(url1, 2, itemObj1.id, this.projectId, pointName1,
              this.startDate, this.endDate, {
                syncNo: 1, pageIndex: 1, pageSize: 1000
              }, itemType1).then((res1) => {
              dataList1 = res1.data.dataList;
              window.mainConfig.http.getMonitorItemData_R(url2, 2, itemObj2.id, this.projectId, pointName2,
                this.startDate, this.endDate, {
                  syncNo: 1, pageIndex: 1, pageSize: 1000
                }, itemType2).then((res2) => {
                dataList2 = res2.data.dataList;
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
//            $('#loading').attr('src', 'static/image/data-empty-200.jpg');
          }
        }
        else {
          toastr.error('缺少监测项');
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
        if (!this.pointObj1 || !this.pointObj1.length || !this.pointObj1.length > 0) {
          toastr.warning('请选择测点');
          return;
        }
        this.chartExist = true;
//        this.chart = Highcharts.stockChart('container');
//        this.chart.showLoading("<img src='../static/image/processing.gif'>  载入中...");
        this.getChartData(this.itemObj1, this.itemObj2, this.pointObj1[0], this.pointObj2[0], this.url1, this.url2,
          this.attrValue1, this.attrValue2, this.attrText1, this.attrText2, this.attrUnit1, this.attrUnit2);
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

