<template>
  <div class="box-wrapper">
    <ul class="tabs">
      <li>
        <input type="radio" name="tabs" id="tab1" checked/><!--"-->
        <label for="tab1">趋势分析</label>
        <div id="tab-content1" class="tab-content">
          <div id="chartTrend"></div>
        </div>
      </li>
      <li>
        <input type="radio" name="tabs" id="tab2"/>
        <label for="tab2">周期分析</label>
        <div id="tab-content2" class="tab-content">
          <div class="period-wrapper" v-if="periodOption && periodOption.length>0">
            <span>选择周期:</span>
            <select v-model="periodNO">
              <option v-for="option in periodOption" :value="option.id">{{option.text}}</option>
            </select>
          </div>
          <div id="chartPeriod"></div>
        </div>
      </li>
      <span>
        <input type="radio" class="radio" name="attrY" v-model="attrY" id="acc" value="accumulation">
        <label for="acc">累计变化量</label>
      </span>
      <span>
        <input type="radio" class="radio" name="attrY" v-model="attrY" id="sing" value="gap" checked>
        <label for="sing">本次变化量</label>
      </span>
    </ul>
  </div>
</template>
<script>
  export default {
    components: {
      'vue-select2': require('../utility/vue-select2.vue'),
    },
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        chartTrend: {},
        chartPeriod: {},
        attrY: 'gap',
        trendSeries: {},
        periodSeries: {},
        dataList: [],
        pageIndex: 1,
        finish: false,
        periodNO: null,
        periodOption: [],
        chartOptions: {
          credits: {enabled: false},
          chart: {
            type: 'spline',
            plotBorderWidth: 0,//整幅图的边框粗
            marginLeft: 10,//整幅图的偏移量
            marginRight: 10,
          },
          title: {
            text: '',
            style: {color: Highcharts.getOptions().colors[0], fontSize: '1.8em',}
          },
          legend: {
            enabled: true,
            align: 'right',
            backgroundColor: '#FCFFC5',
            borderColor: '#fcddc5',
            borderWidth: 1,
            borderRadius: 5,
            layout: 'vertical',
            verticalAlign: 'top',
            y: 100,
            shadow: true
          },
          colors: ['#80699B', '#DB843D', '#89A54E', '#3D96AE', '#4572A7', '#AA4643', '#92A8CD', '#A47D7C', '#B5CA92'],
          yAxis: {
            title: {
              text: '变化量(mm)',
              align: 'high',
              textAlign: 'low',
              offset: -20,
              rotation: 0,
              y: 0,
              style: {color: Highcharts.getOptions().colors[0], fontSize: '1em'},
            },
            lineWidth: 2,
            tickWidth: 1,
            opposite: false,
          },
          xAxis: {
            title: {text: '时间', align: 'high'},
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
            events: {afterSetExtremes: this.afterSetExtremes},
          },
          plotOptions: {
            series: {showInNavigator: true},
            spline: {
              marker: {enabled: true}
            }
          },
          tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
            valueDecimals: 3,
            shared: true
          },
          scrollbar: {
            liveRedraw: true,
            barBackgroundColor: '#41a3cc',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: '#41a3cc',
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
          series: [],
        },
      };
    },
    watch: {
      periodNO: function (e) {
        if (e !== null && typeof e === 'number') {
          if (this.chartPeriod && this.chartPeriod.series) {
            let series = this.periodSeries.series[e];
            this.chartPeriod.series[0].setData(series[0].data);
            this.chartPeriod.series[1].setData(series[1].data);
            this.chartPeriod.series[2].setData(series[2].data);
          }
        }
      }
    },
    created: function () {
      this.$on('filterChart', function (e) {
        this.finish = false;
        this.info.itemOption = e;
        this.chartTrend.showLoading("<img src='../static/image/spinner_B.gif'>");
        this.filterChart(e.Url, e.mark, e.projectId, e.itemId, e.pointNames, e.calculateType, e.pointType, e.startDate, e.endDate);
      });
      this.$on('updateChart', function (obj) {
        if (this.chartTrend.series && this.chartTrend.series.length > 0 && obj) {
          for (let i = 0; i < this.chartTrend.series.length - 2; i++) {
            if (this.chartTrend.series[i].name === obj.PointName)
              this.chartTrend.series[i].addPoint([Date.parse(obj.DTime), obj[this.attrY + 'East']], true, false);
          }
        }
      });
    },
    mounted () {
      Highcharts.setOptions({
        global: {
          useUTC: false,
          lang: {
            contextButtonTitle: '图表导出菜单',
            printChart: '打印图表',
            downloadJPEG: '导出 JPEG',
            downloadPDF: '导出 PDF',
            downloadPNG: '导出 PNG',
            downloadSVG: '导出 SVG',
            drillUpText: "返回 {series.name}",
            loading: '加载中...',
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            rangeSelectorZoom: "范围",
            rangeSelectorFrom: '从',
            rangeSelectorTo: '到',
            noData: "没有数据啦",
            numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],
            resetZoom: '重置缩放比例',
            resetZoomTitle: '重置为原始大小',
            decimalPoint: '.',
            thousandsSep: ',',
          },
        },
      });
      this.projectId = window.sessionUtility.getObj(window.sessionKeys.PROJECT).id;
      this.createTrendChart();
      this.chartTrend.showLoading("<img src='../static/image/spinner_B.gif'>");
      let e = this.info;
      let startDate = e.startEndDate.startDate.dateL;
      let endDate = e.startEndDate.endDate.dateL;
      this.filterChart(e.itemOption.Url, e.itemOption.mark, e.projectId, e.itemObj.id, e.pointObj[0].name, e.itemOption.calculateType,
        e.itemOption.pointType, startDate, endDate);
      this.loadPeriodChart(e.itemOption.Url, 1, e.projectId, e.itemObj.id, e.pointObj[0].name, e.itemOption.calculateType,
        e.itemOption.pointType, startDate, endDate);
      this.changeChart();
    },
    methods: {
      filterChart(variety, urlType, projectId, monitorItemId, pointName, calculatingType, pointType, startTime, endTime){
        this.pageIndex = 1;
        window.mainConfig.http.getMeasureData(variety, urlType, projectId, monitorItemId, pointName, calculatingType, pointType, startTime, endTime, {
          syncNo: 1, pageIndex: 1, pageSize: 300
        }).then((response) => {
          if (response.data && response.data.dataList) {
            this.dataList = response.data.dataList;
            if (this.dataList && this.dataList.length > 0) {
              this.trendSeries = this.getTrendSeries(this.dataList, this.attrY);
              this.createTrendChart(this.trendSeries);
            } else {
              this.chartTrend.showLoading("<img src='../static/image/data-empty-200.jpg'>");
              layer.msg('当前条件下暂无数据');
              this.chartTrend.hideLoading();
            }
          }
        }, (response) => {
          toastr.error('通信失败');
        })
      },
      loadPeriodChart(variety, urlType, projectId, monitorItemId, pointName, calculatingType, pointType, startTime, endTime){
        console.log();
        let self = this;
        let tab2 = document.getElementById('tab2');
        tab2.addEventListener('click', function (e) {
          self.pageIndex = 1;
          window.mainConfig.http.getMeasureData(variety, urlType, projectId, monitorItemId, pointName, calculatingType, pointType, startTime, endTime, {
            syncNo: 1, pageIndex: 1, pageSize: 300
          }).then((response) => {
            if (response.data && response.data.dataList) {
              self.dataList = response.data.dataList;
              if (self.dataList && self.dataList.length > 0) {
                self.periodSeries = self.getPeriodSeries(self.dataList, self.attrY);
                self.periodOption = self.periodSeries.periodList;
                self.periodNO = (self.periodOption[0].id).toString();
                self.createPeriodChart(self.periodSeries, self.periodNO);
              } else {
                self.chartPeriod.showLoading("<img src='../static/image/data-empty-200.jpg'>");
                layer.msg('当前条件下暂无数据');
                self.chartPeriod.hideLoading();
              }
            }
          }, (response) => {
            toastr.error('通信失败');
          })
        });
      },
      /*数据集需先时间倒叙排列,否则需自行倒叙*/
      getTrendSeries(data, attrY){
        let map = {}, seriesE = [], seriesN = [], seriesH = [], attrX = 'dateTime';
        if (data) {
          let ai = [];
          for (let i = 0; i < data.length; i++) {
            ai = data[i];
            if (!map[ai.pointName]) {
              seriesE.push({
                name: ai.pointName,
                data: [[Date.parse(ai[attrX]), ai[attrY + 'East'] * 1000]],
              });
              seriesN.push({
                name: ai.pointName,
                data: [[Date.parse(ai[attrX]), ai[attrY + 'North'] * 1000]],
              });
              seriesH.push({
                name: ai.pointName,
                data: [[Date.parse(ai[attrX]), ai[attrY + 'Height'] * 1000]],
              });
              map[ai.pointName] = ai;
            } else {
              _.each(seriesE, (d) => {
                if (d.name === ai.pointName) d.data.unshift([Date.parse(ai[attrX]), ai[attrY + 'East'] * 1000]);
              });
              _.each(seriesN, (d) => {
                if (d.name === ai.pointName) d.data.unshift([Date.parse(ai[attrX]), ai[attrY + 'North'] * 1000]);
              });
              _.each(seriesH, (d) => {
                if (d.name === ai.pointName) d.data.unshift([Date.parse(ai[attrX]), ai[attrY + 'Height'] * 1000]);
              });
            }
          }
          _.each(seriesE, (d) => d.data.sort((a, b) => a[0] - b[0]));
          _.each(seriesN, (d) => d.data.sort((a, b) => a[0] - b[0]));
          _.each(seriesH, (d) => d.data.sort((a, b) => a[0] - b[0]));
        }
        return {seriesE, seriesN, seriesH};
      },
      createTrendChart(trendSeries) {
        this.chartOptions.title.text = '全站仪 趋势分析';
        let setNewSeries = [];
        $.each(trendSeries, (index, ele) => {
          if (index === 'seriesE') {
            index = 'E';
          } else if (index === 'seriesH') {
            index = 'H';
          } else if (index === 'seriesN') {
            index = 'N';
          }
          $.each(ele, (i, n) => {         // 遍历每一项，以实现多点查询同时显示
            setNewSeries.push({
              name: '∆ ' + index + ': ' + n.name,
              data: n.data
            })
          })
        });
        if (trendSeries) this.chartOptions.series = setNewSeries;
        this.chartTrend = Highcharts.stockChart('chartTrend', this.chartOptions);
      },//createTrendChart
      getPeriodSeries(data, attrY){
        if (data) {
          let series = [], map = [], periodList = [], categories = [];
          for (let i = 0; i < data.length; i++) {
            let ai = data[i];
            if (!map[ai.periodNO]) {
              periodList.push({id: ai.periodNO, text: ai.periodNO});
              categories[ai.periodNO] = [ai.pointName];
              series[ai.periodNO] = [{
                name: '东坐标',
                data: [[ai.pointName, ai[attrY + 'East']]],
              }, {
                name: '北坐标',
                data: [[ai.pointName, ai[attrY + 'North']]],
              }, {
                name: '高程',
                data: [[ai.pointName, ai[attrY + 'Height']]],
              }];
              map[ai.periodNO] = ai;
            } else {
              series[ai.periodNO][0].data.push([ai.pointName, ai[attrY + 'East'] * 1000]);
              series[ai.periodNO][1].data.push([ai.pointName, ai[attrY + 'North'] * 1000]);
              series[ai.periodNO][2].data.push([ai.pointName, ai[attrY + 'Height'] * 1000]);
              categories[ai.periodNO].push(ai.pointName);
            }
          }
          return {series, categories, periodList};
        }
      },
      createPeriodChart(periodSeries, periodNO){
        if (typeof periodNO === "string") periodNO = parseInt(periodNO);
        this.chartPeriod = Highcharts.chart('chartPeriod', {
          credits: {enabled: false},
          colors: ['#8085e9', '#e4d354', '#2b908f', '#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#f15c80', '#f45b5b', '#91e8e1'],
          chart: {type: 'spline', zoomType: 'x'},
          subtitle: {
            text: (periodSeries.series && periodSeries.series.length > 0) ?
              (document.ontouchstart === undefined ? '鼠标拖动可以进行缩放' : '手势操作进行缩放') : '',
          },
          title: {
            text: '全站仪 周期分析',
            style: {color: Highcharts.getOptions().colors[0], fontSize: '1.8em',}
          },
          xAxis: {
            title: {text: '点名', align: 'high'},
            categories: periodSeries.categories[periodNO],
          },
          yAxis: {
            title: {
              text: '变化量(mm)',
              align: 'high',
              offset: 0,
              rotation: 0,
              y: -10,
              style: {color: Highcharts.getOptions().colors[0], fontSize: '1em'}
            },
            alternateGridColor: 'rgba(253, 255, 213,0.2)',
            lineWidth: 2,
            tickWidth: 1,
            opposite: false,
            plotLines: [{value: 0, width: 0, color: '#808080'}]
          },
          tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<small>{point.key}</small><table>',
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y} mm</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2,
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
          legend: {
            layout: 'vertical',
            backgroundColor: '#FFFFFF',
            floating: true,
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: 0,
            labelFormatter: function () {
              return this.name;
            }
          },
          series: periodSeries.series[periodNO],
        });
      },
      /*本次与累计转换*/
      changeChart(){
        let self = this;
        $("input[name=attrY]").on('click', function (e) {
          let attrY = $("input[name=attrY]:checked").val();
          if (self.dataList && self.dataList.length > 0) {
            self.trendSeries = self.getTrendSeries(self.dataList, attrY);
            self.createTrendChart(self.trendSeries);
            self.periodSeries = self.getPeriodSeries(self.dataList, attrY);
            self.periodOption = self.periodSeries.periodList;
            self.periodNO = (self.periodOption[0].id).toString();
            self.createPeriodChart(self.periodSeries, self.periodNO);
          } else {
            self.chartTrend.showLoading("<img src='../static/image/data-empty-200.jpg'>");
            layer.msg('当前条件下暂无数据');
            self.chartTrend.hideLoading();
            self.chartPeriod.showLoading("<img src='../static/image/data-empty-200.jpg'>");
            layer.msg('当前条件下暂无数据');
            self.chartPeriod.hideLoading();
          }
        });
      }, //changeChart
      afterSetExtremes(e){
        try {
          this.chartTrend.xAxis[0].setExtremes(e.min, e.max, true, false);
          if (e.min <= e.dataMin) {
            if (e.min > Date.parse(this.info.startEndDate.startDate.dateL)) {
              if (!this.finish) {
                this.pageIndex = this.pageIndex + 1;
                this.chartTrend.showLoading("<img src='../static/image/spinner_G.gif'>正在加载更早前数据");
                let itemOption = this.info.itemOption;
                window.mainConfig.http.getMeasureData(itemOption.Url, itemOption.mark, this.info.projectId, this.info.itemObj.id,
                  itemOption.pointNames, itemOption.calculateType, itemOption.pointType, this.info.startEndDate.startDate.dateL,
                  this.info.startEndDate.endDate.dateL, {
                    syncNo: 1,
                    pageIndex: this.pageIndex,
                    pageSize: 300
                  }).then((response) => {
                    if (response.data && response.data.dataList) {
                      let dataList = response.data.dataList;
                      if (dataList && dataList.length > 0) {
                        let concatList = dataList.concat(this.dataList);
                        let concatSeries = this.getTrendSeries(concatList, this.attrY);
                        if (concatSeries.seriesE && concatSeries.seriesE.length > 0) {
                          updateSeries(this.chartTrend, concatSeries.seriesE);
                        }
                        function updateSeries(chart, series) {
                          let theSeries = {}, i = 1, j = 0, chartSeries = '';
                          for (; i < series.length; i++) {
                            theSeries = {};
                            for (; j < chart.series.length; j++) {
                              chartSeries = chart.series[j].name.split(/\s{1,}/);
                              chartSeries = chartSeries[chartSeries.length - 1];
                              if (series[i].name === chartSeries) {
                                theSeries = chart.series[j];
                                break;
                              }
                            }
                            if (theSeries && theSeries.name) {
                              chart.series[i].setData(series[i].data);
                            } else {
                              chart.addSeries({ // 原本没有该点
                                name: series[i].name,
                                data: series[i].data,
                              })
                            }
                          }
                        }
                      } else {
                        this.finish = true;
                        layer.open({icon: 1, content: '当前时间全部已加载完毕'});
                      }
                      this.chartTrend.hideLoading();
                    }
                  },
                  (response) => {
                    toastr.error('通信失败');
                  })
              }
            }
            else {
              console.log('超出范围了');
              toastr.warning('超出范围了,请查询更早的时间段');
            }
          }
        } catch
          (e) {
          console.error(e);
        }

      },
      formatDate(objDate){
        let year = objDate.getFullYear();
        let month = objDate.getMonth() + 1;
        let day = objDate.getDate();
        let hour = objDate.getHours();
        let minute = objDate.getMinutes();
        let second = objDate.getSeconds();
        if (month.toString().length === 1) {
          month = '0' + month;
        }
        if (day.toString().length === 1) {
          day = '0' + day;
        }
        if (hour.toString().length === 1) {
          hour = '0' + hour;
        }
        if (minute.toString().length === 1) {
          minute = '0' + minute;
        }
        if (second.toString().length === 1) {
          second = '0' + second;
        }
        let dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return dateTime;
      }
    }//methods

  }
</script>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .box-wrapper {
    min-height: 50vh;
    overflow-y: auto;
    font-size: inherit;
    box-sizing: border-box;
  }

  .tabs {
    width: 99.7%;
    float: left;
    list-style: none;
    position: relative;
    margin: 1px 1px 0 1px;
    text-align: center;
  }

  .tabs li {
    float: left;
    display: block;
    width: 20%;
  }

  .tabs li > input[name="tabs"] {
    display: none;
  }

  .tabs li > label {
    display: block;
    padding: 10px 15px;
    border-radius: 5px 5px 0 0;
    font-size: 1.2em;
    color: #FFFFFF;
    font-weight: normal;
    text-transform: uppercase;
    background: rgba(0, 192, 239, 0.5);
    cursor: pointer;
    position: relative;
    top: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .tabs li > label:hover {
    background: #00c0ef;
  }

  .tab-content {
    width: 100%;
    z-index: 2;
    display: none;
    overflow: hidden;
    font-size: 17px;
    line-height: 25px;
    position: absolute;
    left: 0;
    background: #FFFFFF;
  }

  .tabs [id^="tab"]:checked + label {
    top: 0;
    padding-top: 13px;
    background: #00c0ef;
  }

  .tabs [id^="tab"]:checked ~ [id^="tab-content"] {
    display: block;
  }

  .tabs > span > input[name="attrY"] {
    display: none;
  }

  .tabs > span {
    float: right;
    display: block;
    width: 15%;
  }

  .tabs > span > label {
    display: block;
    padding: 10px 15px;
    border-radius: 20px;
    font-size: 1.0em;
    color: #FFFFFF;
    font-weight: normal;
    text-transform: uppercase;
    background: rgba(141, 14, 239, 0.50);
    cursor: pointer;
    position: relative;
    top: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .tabs > span > label:hover {
    background: rgb(141, 14, 239);
  }

  .tabs [name^="attrY"]:checked + label {
    top: 0;
    padding-top: 13px;
    background: rgb(141, 14, 239);
  }

  #app .box-header.with-border {
    border-bottom: 1px solid #00a65a;
  }

</style>

