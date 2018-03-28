<template>
  <div id="exampleChart"></div>
</template>
<script>
  export default {
    components: {},
    props: {
      paging: {
        type: Boolean
      },
      totalTitle: {//标题
        type: String
      },
      xTitle: {//x轴
        type: String
      },
      yTitle: {//y轴
        type: String
      },
      ajaxData: {//数据源
        type: Array
      },
    },
    data () {
      return {
        chart: {},
      };
    },
    created: function () {
      this.$on('addPoint', function (name,arr) {
        console.log(name);
        if (this.chart.series && this.chart.series.length > 0 && name) {
          for (let i = 0, len = this.chart.series.length - 1; i < len; i++) {
            if (this.chart.series[i].name === name)
              this.chart.series[i].addPoint(arr, true, false);
          }
        }
      });
    },
    mounted () {
      this.createChart();
    },
    methods: {
      createChart() {
        let seriesArray = [];
        if (this.ajaxData) {
          for (let i in this.ajaxData) {
            seriesArray.push({
              data: this.ajaxData[i].data,
              name: this.ajaxData[i].name,
              marker: {
                enabled: true
              }
            })
          }
        }
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
        this.chart = Highcharts.stockChart('exampleChart', {
          credits: {
            enabled: false
          },
          chart: {
            height: (9 / 16 * 100) + '%' // 16:9 ratio
          },
          colors: ['#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
          title: {
            text: this.totalTitle || '曲线分析图',
            align: 'center',//标题在图首的位置：左中右
            margin: 1,//标题和图表区之间的边距
            style: {
              color: '#00a65a',
              fontWeight: 'bold'
            },
            widthAdjust: -200,//调整title宽度，通常给打印button留位置
          },
          yAxis: {
            title: {
              text: this.yTitle || 'value',
              align: 'high',//Y轴标题位置
              textAlign: 'high',
              offset: 0,
              rotation: 0,
              x: -40,
              y: -5,
              style: {
//                color: Highcharts.getOptions().colors[0],
                fontSize: 14,
              }
            },
            lineWidth: 2,
            tickWidth: 1,
            opposite: false,
          },
          xAxis: {
            title: {
              text: this.xTitle || '时间',
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
            valueDecimals: 2,
            split: true
          },
          scrollbar: {
            liveRedraw: true,
            barBackgroundColor: '#089903',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: '#089903',
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
            inputDateFormat: '%Y-%m-%d',
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
          series: seriesArray
        });
      },
      afterSetExtremes(e) {
        var chart = Highcharts.charts[0];
//        chart.showLoading('Loading data from server...');
      },
    }//methods
  }
</script>
<style lang="scss" scoped>
</style>

