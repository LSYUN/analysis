<template>
  <div id="chart"></div>
</template>
<script>
  export default {
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    watch: {
      info: function () {
        let info = this.info;
        console.log(this.info);
        this.touchTimes = 1;
        this.renderChart(info.url, info.mark, info.itemId, info.projectId, info.pointNames,
          info.startDate, info.endDate, info.attrValue, info.attrText, info.attrUnit);
      }
    },
    data () {
      return {
//        variety: 'waterLevelData',
        chart: {},
        setPointName: this.info.pointNames,            //用以判断查询类型的时候设置当前查询的点名
        isRender: false,
        seriesOptions: {},
        pageIndex: 1,
        touchTimes: 1,
      };
    },
    mounted () {
      let info = this.info;
      this.createChart();
      this.chart.showLoading("<img src='../static/image/spinner_B.gif'>");
      this.renderChart(info.url, info.mark, info.itemId, info.projectId, info.pointNames,
        info.startDate, info.endDate, info.attrValue, info.attrText, info.attrUnit);
    },
    methods: {
      /***
       * 初始化与更改chart
       */
      renderChart(variety, mark, itemId, projectId, pointNames, startTime, endTime, attrY, attrText, attrUnit, pageIndex){
        window.mainConfig.http.getMonitorItemData_R(variety, mark, itemId, projectId, pointNames, startTime, endTime, {
          syncNo: 1, pageIndex: pageIndex || 1, pageSize: 300
        }).then((response) => {
          if (response.data && response.data.dataList && response.data.dataList.length > 0) { // 判断返回内容是否有数据
            this.seriesOptions = this.getSeries(response.data.dataList, attrY);
            this.createChart(attrText, attrUnit, mark);
          } else {
            layer.msg('当前时间测点暂无数据');
            this.chart.hideLoading();
            return;
          }
        }, (response) => {
          toastr.error('通信失败');
        })
      },

      /***
       * 把后台数据转换成chart所需数据
       */
      getSeries(data, attrY){
        let map = {}, dest = [];
        if (data) {
          for (let i = 0,len =  data.length; i < len; i++) {
            let ai = data[i];
            if (!map[ai.pointName]) {
              dest.push({
                name: ai.pointName,
                data: [[Date.parse(ai.dtime), ai[attrY]]],
                marker: {
                  enabled: true
                }
              });
              map[ai.pointName] = ai;
            } else {
              for (let j = 0; j < dest.length; j++) {
                let dj = dest[j];
                if (dj.name === ai.pointName) {
                  dj.data.unshift([Date.parse(ai.dtime), ai[attrY]]);
                  break;
                }
              }
            }
          }
        }
        return {dest};
      },//getSeries

      /***
       * chart setting
       */
      createChart(attrText, attrUnit, mark) {
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
        let chartOptions = this.getOptions(attrText, attrUnit, mark);
        this.chart = Highcharts.stockChart('chart', chartOptions);
      },//createChart

      /***
       * 初始化与更改chart
       */
      getOptions(text, unit, mark){
        return {
          credits: {enabled: false},
          chart: {
            type: 'spline',
            plotBorderWidth: 0,//整幅图的边框粗
            marginLeft: 10,//整幅图的偏移量
            marginRight: 10,
          },
          title: {text: '水位监测', style: {color: '#7cb5ec', fontSize: '1.8em', fill: '#7cb5ec'}},
          subtitle: {
            text: mark === 1 ? '当前显示的是全部测点数据' : ''
          },
          colors: ['#80699B', '#DB843D', '#89A54E', '#3D96AE', '#4572A7', '#AA4643', '#92A8CD', '#A47D7C', '#B5CA92'],
          yAxis: {
            title: {
              text: text ? text + '(' + unit + ')' : '变化量(mm)',
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
//            split: true
          },
          scrollbar: {
            liveRedraw: true,
            barBackgroundColor: '#0474b5',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: '#0474b5',
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
          series: this.seriesOptions.dest,
        }
      },//getOptions

      afterSetExtremes(e){
        this.chart.xAxis[0].setExtremes(e.min, e.max, true, false);
        if (e.min <= e.dataMin) {
          if (e.min > Date.parse(this.info.startDate)) {
            if (this.touchTimes === 1) {
              this.touchTimes = this.touchTimes + 1;
              this.pageIndex = this.pageIndex + 1;
              this.chart.showLoading("<img src='../static/image/spinner_B.gif'>正在加载更早前数据");
              window.mainConfig.http.getMonitorItemData_R(this.info.url, this.info.mark, this.itemId, this.info.projectId, this.info.pointNames,
                this.info.startDate, this.info.endDate, {
                  syncNo: 1, pageIndex: this.pageIndex || 1, pageSize: 1000
                }).then((response) => {
                let seriesOptions = this.getSeries(response.data.dataList, this.info.attrValue);
                if (seriesOptions.dest.length === 0) {
                  layer.msg('已经加载全部数据');
                  this.chart.hideLoading();
                  return;
                }
                for (let i = 0,len =  this.chart.series.length / 2; i < len; i++) {
                  let oldX = (_.find(this.seriesOptions.dest, (series) => this.chart.series[i].name === series.name)).data,
                    newX = (_.find(seriesOptions.dest, (series) => this.chart.series[i].name === series.name)).data;
                  this.chart.series[i].setData(newX.concat(oldX));
                  this.chart.hideLoading();
                }
              }, (response) => {
                toastr.error('通信失败');
              })
//                }.bind(this)
//              });
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
  #chart {
    width: inherit;
    min-width: inherit;
    min-height: inherit;
  }
</style>
