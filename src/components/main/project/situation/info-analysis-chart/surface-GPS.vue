<template>
  <div class="box-wrapper">
    <div id="chartX"></div>
    <div id="chartY"></div>
    <div id="chartZ"></div>
  </div>
</template>
<script>
  export default {
    components: {},
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
//        variety: 'GpsData',
        chartX: {},
        chartY: {},
        chartZ: {},
        seriesOptions: {},
        pageIndex: 1,
        touchTimes: null,
        chartOptions: {
          credits: {enabled: false},
          chart: {
            type:'spline',
            plotBorderWidth: 0,//整幅图的边框粗
            marginLeft: 10,//整幅图的偏移量
            marginRight: 10,
          },
          title: {text: '',style:{color:'#7cb5ec',fontSize:'1.8em',fill:'#7cb5ec'}},
          colors: ['#80699B', '#DB843D', '#89A54E', '#3D96AE', '#4572A7', '#AA4643', '#92A8CD', '#A47D7C', '#B5CA92'],
          yAxis: {
            title: {
              text: '累计变化量(mm)',
              align: 'high',
              textAlign: 'low',
              offset: -20,
              rotation: 0,
              y: 0
            },
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
            valueSuffix: 'mm',
            valueDecimals: 2,
//            split: true
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
          series: {},
        },
      };
    },

    created: function () {
      this.$on('filterChart', function (e) {
        this.chartX.showLoading("<img src='../static/image/spinner_B.gif'>");
        this.chartY.showLoading("<img src='../static/image/spinner_B.gif'>");
        this.chartZ.showLoading("<img src='../static/image/spinner_B.gif'>");
        this.filterChart(e.Url, e.mark, e.monitorItemId, e.projectId, e.pointNames, e.startDate, e.endDate,e.attrValue);
      });
      this.$on('updateChart', function (obj) {
        if (this.chartX.series && this.chartX.series.length > 0 && obj) {
          for (let i = 0, len = this.chartX.series.length - 2;i < len; i++) {
            console.log(obj.PointName);
            if (this.chartX.series[i].name === obj.PointName)
              this.chartX.series[i].addPoint([Date.parse(obj.DTime), obj.SmoothX], true, false);
            if (this.chartY.series[i].name === obj.PointName)
              this.chartY.series[i].addPoint([Date.parse(obj.DTime), obj.SmoothY], true, false);
            if (this.chartZ.series[i].name === obj.PointName)
              this.chartZ.series[i].addPoint([Date.parse(obj.DTime), obj.SmoothZ], true, false);
          }
        }
      });
    },
    mounted () {
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
      this.createChart();
      this.chartX.showLoading("<img src='../static/image/spinner_B.gif'>");
      this.chartY.showLoading("<img src='../static/image/spinner_B.gif'>");
      this.chartZ.showLoading("<img src='../static/image/spinner_B.gif'>");
      let e = this.info;
      let startDate = e.startEndDate.startDate.dateL;
      let endDate = e.startEndDate.endDate.dateL;
      this.filterChart(e.itemOption.Url, e.itemOption.mark, e.itemObj.id,e.projectId, e.itemOption.pointNames,
          startDate, endDate,e.itemOption.attrValue);
    },
    methods: {
      filterChart(variety,urlType, monitorItemId, projectId, pointNames, startTime, endTime,attrY,pageIndex){
        this.pageIndex = 1;
        window.mainConfig.http.getMonitorItemData_R(variety, urlType,  monitorItemId,projectId, pointNames, startTime, endTime, {
          syncNo: 1, pageIndex: 1, pageSize: 300
        }).then((response) => {
          if (response.data && response.data.dataList) {
            this.dataList = response.data.dataList;
            if (this.dataList && this.dataList.length > 0) {
              this.seriesOptions = this.getSeriesOptions(this.dataList, this.attrY);
              this.createChart();
            } else {
//              this.chart.showLoading("<img src='../static/image/data-empty-200.jpg'>");
//              layer.msg('当前条件下暂无数据');
//              this.chart.hideLoading();
              layer.msg('当前时间测点暂无数据');
              this.chart.hideLoading();
              return;
            }
          }
        }, (response) => {
          toastr.error('通信失败');
        })
      },
      filterChartByPoint(pointName, projectId){
        window.mainConfig.http.getDataByPoint_R(this.variety, pointName, projectId, {
          syncNo: 1, pageIndex: 1, pageSize: 300
        }).then((response) => {
          this.seriesOptions = this.getSeriesOptions(response.data.dataList);
          this.createChart();
        }, (response) => {
          toastr.error('通信失败');
        })
      },
      getSeriesOptions(data, attrY){
        let map = {}, seriesX = [], seriesY = [], seriesZ = [];
        if (data) {
          let ai = [];
          for (let i = 0, len = data.length;i < len; i++) {
            ai = data[i];
            if (!map[ai.pointName]) {
              seriesX.push({
                name: ai.pointName,
                data: [[Date.parse(ai.dtime), ai.smoothX]],
                marker: {enabled: true},
              });
              seriesY.push({
                name: ai.pointName,
                data: [[Date.parse(ai.dtime), ai.smoothY]],
                marker: {enabled: true},
              });
              seriesZ.push({
                name: ai.pointName,
                data: [[Date.parse(ai.dtime), ai.smoothZ]],
                marker: {enabled: true},
              });
              map[ai.pointName] = ai;
            } else {
              _.each(seriesX, (d) => {
                if (d.name === ai.pointName) d.data.unshift([Date.parse(ai.dtime), ai.smoothX]);
              });
              _.each(seriesY, (d) => {
                if (d.name === ai.pointName) d.data.unshift([Date.parse(ai.dtime), ai.smoothY]);
              });
              _.each(seriesZ, (d) => {
                if (d.name === ai.pointName) d.data.unshift([Date.parse(ai.dtime), ai.smoothZ]);
              });
            }
          }
        }
        return {seriesX, seriesY, seriesZ};
      },
      createChart() {
        Highcharts.setOptions({
          global: {useUTC: false},
          lang: {
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            rangeSelectorZoom: "范围",
            rangeSelectorFrom: '从',
            rangeSelectorTo: '到',
            printChart: '打印图表',
            downloadJPEG: '导出 JPEG',
            downloadPDF: '导出 PDF',
            downloadPNG: '导出 PNG',
            downloadSVG: '导出 SVG'
          }
        });
        this.chartOptions.title.text = 'X轴';
        this.chartOptions.series = this.seriesOptions.seriesX;
        this.chartX = Highcharts.stockChart('chartX', this.chartOptions);
        this.chartOptions.title.text = 'Y轴';
        this.chartOptions.series = this.seriesOptions.seriesY;
        this.chartY = Highcharts.stockChart('chartY', this.chartOptions);
        this.chartOptions.title.text = 'Z轴';
        this.chartOptions.series = this.seriesOptions.seriesZ;
        this.chartZ = Highcharts.stockChart('chartZ', this.chartOptions);
      },//createChart
      afterSetExtremes(e){
        this.touchTimes = 1;
        this.chartX.xAxis[0].setExtremes(e.min, e.max, true, false);
        this.chartY.xAxis[0].setExtremes(e.min, e.max, true, false);
        this.chartZ.xAxis[0].setExtremes(e.min, e.max, true, false);
        if (e.min <= e.dataMin) {
          if (e.min > Date.parse(this.info.startEndDate.startDate.dateL)) {
            if (this.touchTimes === 1) {
              this.touchTimes = this.touchTimes + 1;
              this.pageIndex = this.pageIndex + 1;
              this.chartX.showLoading("<img src='../static/image/spinner_B.gif'>正在加载更早前数据");
              this.chartY.showLoading("<img src='../static/image/spinner_B.gif'>正在加载更早前数据");
              this.chartZ.showLoading("<img src='../static/image/spinner_B.gif'>正在加载更早前数据");
              window.mainConfig.http.getMonitorItemData_R(this.info.itemOption.Url, this.info.itemOption.mark,this.info.itemObj.id, this.info.projectId, this.info.itemOption.pointNames,
                  this.info.startEndDate.startDate.dateL, this.info.startEndDate.endDate.dateL, {
                    syncNo: 1, pageIndex: this.pageIndex || 1, pageSize: 1000
                  }).then((response) => {
                let seriesOptions = this.getSeriesOptions(response.data.dataList);
                for (let i = 0, len = this.chartX.series.length / 2;i < len; i++) {
                  let oldX = (_.find(this.seriesOptions.seriesX, (series) => this.chartX.series[i].name === series.name)).data,
                      newX = (_.find(seriesOptions.seriesX, (series) => this.chartX.series[i].name === series.name)).data;
                  let oldY = (_.find(this.seriesOptions.seriesY, (series) => this.chartY.series[i].name === series.name)).data,
                      newY = (_.find(seriesOptions.seriesY, (series) => this.chartY.series[i].name === series.name)).data;
                  let oldZ = (_.find(this.seriesOptions.seriesZ, (series) => this.chartZ.series[i].name === series.name)).data,
                      newZ = (_.find(seriesOptions.seriesZ, (series) => this.chartZ.series[i].name === series.name)).data;
                  this.chartX.series[i].setData(newX.concat(oldX));
                  this.chartY.series[i].setData(newY.concat(oldY));
                  this.chartZ.series[i].setData(newZ.concat(oldZ));
                  this.chartX.hideLoading();
                  this.chartY.hideLoading();
                  this.chartZ.hideLoading();
                }
              }, (response) => {
                toastr.error('通信失败');
              })
            }
          } else {
            console.log('超出范围了');
            toastr.warning('超出范围了');
          }
        }

      },
    }//methods
  }
</script>

<style lang="scss" scoped>
  .box-wrapper {
    height: 73vh;
    overflow-y: scroll;
  }

  .box-margin {
    margin-bottom: 0;
  }
</style>

