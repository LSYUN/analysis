<template>
  <div>
    <div id="waterChart"></div>
    <div v-show="seriesOptions.showList">
      <div class="form-group">
        <div class="input-group horizon-align" v-if="pageIndexes.length>0">
          <div class="col-xs-3">
            <button class="btn btn-sm btn-warning" id="btnMinus" @click="pageChange(1)" v-if="pageIndex>0">上一页
            </button>
          </div>
          <div class="col-xs-6">
            <select class="form-control" v-model="pageIndex" style="min-width: 120px">
              <option v-for="option in pageIndexes" :selected="option.value === pageIndex ? true : false"
                      :value="option.value">{{ option.text }}
              </option>
            </select>
          </div>
          <div class="col-xs-3">
            <button class="btn btn-sm btn-warning" id="btnPlus" @click="pageChange(2)"
                    v-if="seriesOptions.showList && (pageIndex<seriesOptions.showList[0].data.length-1)">下一页
            </button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group horizon-align">
          <input type="radio" class="radio" name="showType" v-model="showType" id="hour" value="1">
          <label for="hour">查询全部</label>
          <input type="radio" class="radio" name="showType" v-model="showType" id="day" value="2" checked>
          <label for="day">按天查询</label>
          <input type="radio" class="radio" name="showType" v-model="showType" id="month" value="3">
          <label for="month">按月查询</label>
          <input type="radio" class="radio" name="showType" v-model="showType" id="year" value="4">
          <label for="year">按年查询</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {//雨量计 降雨量 5
    components: {},
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        variety: 'ombrometerData',
        chart: {},
        seriesOptions: [],
        showType: null,
        pageIndex: 0,
        pageIndexes: []
      };
    },
    watch: {
      pageIndex: function (pageIndex) {
        if (pageIndex !== null && typeof pageIndex === 'number') {
          let options = this.getCategories(this.showType, this.seriesOptions.showList, pageIndex);
          if (options && options.series) {
            this.chart.series[0].setData(options.series.data);
          }
        }
      },
    },
    created: function () {
      this.$on('filterChart', function (e) {
        this.chart.showLoading("<img src='../static/image/spinner_B.gif'>");
        let itemObj = e.itemObj;
        let itemOption = e.itemOption;
        let endDate = new Date(this.info.startEndDate.endDate.dateL).getFullYear() + '-12-31 23:59:59';
        let startDate = this.getAYearTime(endDate).dateL;
        this.filterChart(e.Url, e.mark, e.monitorItemId, e.projectId, e.pointNames, startDate, e.endDate,this.showType);
      });
    },
    mounted () {
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
      let e = this.info;
      let startDate = e.startEndDate.startDate.dateL;
      let endDate = e.startEndDate.endDate.dateL;;
      let pointNameList = this.info.pointNameList;
      this.filterChart(e.itemOption.Url, e.itemOption.mark, e.itemObj.id,e.projectId, e.itemOption.pointNames,
          startDate, endDate,this.showType);
//      this.createChart(false);
//      this.filterByPointAndTime(this.info.itemOption.Url, this.projectId, pointNameList, startDate, endDate);
      this.changeChart();
    },
    methods: {
      filterChart(variety,urlType, monitorItemId, projectId, pointNames, startTime, endTime,showType){
        window.mainConfig.http.getMonitorItemData_R(variety, urlType,  monitorItemId,projectId, pointNames, startTime, endTime, {
          syncNo: 1, pageIndex: 1, pageSize: 10000
        }).then((response) => {
//          console.log(response);
          this.renderChart(response.data.dataList);
        }, (response) => {
          toastr.error('通信失败');
        })
      },
      filterChartByPoint(pointName, projectId, showType){
        window.mainConfig.http.getDataByPoint_R(this.variety, pointName, projectId, {
          syncNo: 1, pageIndex: 1, pageSize: 1000
        }).then((response) => {
//          this.jsonData = response.data.dataList;
          this.seriesOptions = this.getSeriesOptions(response.data.dataList);
          let options = this.getCategories(showType, this.seriesOptions.showList, this.pageIndex);
          if (options && options.series) {
            this.createChart(false, [options.series], options.categories);
          }
        }, (response) => {
          toastr.error('通信失败');
        })
      },//initWaterChart
      renderChart(dataList){
        if ((dataList).length > 0) {
          this.seriesOptions = this.getSeriesOptions(dataList);
          if (this.seriesOptions && (this.seriesOptions.showList).length > 0) {
            let options = this.getCategories(this.showType, this.seriesOptions.showList, this.pageIndex);
            if (options && options.series) {
              let indexes = [];
              this.createChart(false, [options.series], options.categories);
              _.each(this.seriesOptions.showList[0].until, (value, key) => {
                indexes.push({value: key, text: value});
              });
              this.pageIndexes = indexes;
            } else {
              this.pageIndexes = [];
            }
          }
        } else {
          this.createChart(false, [], []);
        }
      },
      getSeriesOptions(data){
        if (data && data.length > 0) {
          let map = {}, listAll = [], listDay = [], listMonth = [], listYear = [], showList = [],
              hourForDay = [], dayForMonth = [], monthForYear = [];
          for (let i in data) {
            let ai = data[i];
            let untilHour = (ai.dtime).slice(0, 13),
                untilDay = (ai.dtime).slice(0, 10),
                untilMonth = (ai.dtime).slice(0, 7),
                untilYear = (ai.dtime).slice(0, 4);
            if (!map[ai.pointName]) {
              hourForDay.push(untilHour);
              dayForMonth.push(untilDay);
              monthForYear.push(untilMonth);
              map[ai.pointName] = ai;
              listAll.push({
                type: 'column',
                name: ai.pointName,
                data: [[Date.parse(ai.dtime), ai['valueHour']]]
              });
              listDay.push({
                type: 'column',
                name: ai.pointName,
                data: [[[parseInt(untilHour.slice(-2)), ai['valueHour']]]],
                until: [untilDay]
              });
              listMonth.push({
                type: 'column',
                name: ai.pointName,
                data: [[[parseInt(untilDay.slice(-2)), ai['valueDay']]]],
                until: [untilMonth]
              });
              listYear.push({
                type: 'column',
                name: ai.pointName,
                data: [[[parseInt(untilMonth.slice(-2)), ai['valueMonth']]]],
                until: [untilYear]
              });
            } else {
              for (let j in listAll) {
                let jAll = listAll[j], jDay = listDay[j], jMonth = listMonth[j], jYear = listYear[j];
                if (ai.pointName === jDay.name) {
                  jAll.data.unshift([Date.parse(ai.dtime), ai['valueHour']]);
                  if (hourForDay.indexOf(untilHour) === -1) {//过滤出小时内最后的那个对象
                    hourForDay.push(untilHour);
                    if (_.contains(jDay.until, untilDay))
                      (jDay.data[jDay.data.length - 1]).unshift([parseInt(untilHour.slice(-2)), ai['valueHour']]);
                    else {
                      jDay.until.push(untilDay);
                      jDay.data.push([[parseInt(untilHour.slice(-2)), ai['valueHour']]]);
                    }
                  }
                  if (dayForMonth.indexOf(untilDay) === -1) {
                    dayForMonth.push(untilDay);
                    if (_.contains(jMonth.until, untilMonth))
                      jMonth.data[jMonth.data.length - 1].unshift([parseInt(untilDay.slice(-2)), ai['valueDay']]);
                    else {
                      jMonth.until.push(untilMonth);
                      jMonth.data.push([[parseInt(untilDay.slice(-2)), ai['valueDay']]]);
                    }
                  }
                  if (monthForYear.indexOf(untilMonth) === -1) {
                    monthForYear.push(untilMonth);
                    if (_.contains(jYear.until, untilYear))
                      jYear.data[jYear.data.length - 1].unshift([parseInt(untilMonth.slice(-2)), ai['valueMonth']]);
                    else {
                      jYear.until.push(untilYear);
                      jYear.data.push([[parseInt(untilMonth.slice(-2)), ai['valueMonth']]]);
                    }
                  }
                }
              }
            }
          }
          if (listDay.length > 0) showList = listDay.slice();
//        console.log({listAll, listDay, listMonth, listYear, showList});
          return {listAll, listDay, listMonth, listYear, showList};
        } else {
          console.log('data is null');
        }
      },//getSeriesOptions
      getCategories(showType, showList, pageIndex) {
//        console.log(showType);
//        console.log(typeof showList, showList.length, showList && showList.length > 0);
        if (showList && showList.length > 0) {
          let categories, series = {name: showList[0].name, data: []}, startIndex, endIndex, j = 0;
          let year = parseInt(showList[0].until[0].slice(4));
          let month = parseInt(showList[0].until[0].slice(-2));
          switch (showType) {
            case '1':
              break;
            case '2':
              categories = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
                '18', '19', '20', '21', '22', '23'];
              startIndex = 0;
              endIndex = categories.length;
              break;
            case '3':
              let temp = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
                '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
              if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) categories = temp;
              if (month === 4 || month === 6 || month === 9 || month === 11) categories = temp.slice(0, 30);
              if (month === 2) {
                if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) categories = temp.slice(0, 29);
                else  categories = temp.slice(0, 28);
              }
              startIndex = 1;
              endIndex = categories.length;
              break;
            case '4':
              categories = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
              startIndex = 1;
              endIndex = categories.length;
              break;
          }
          for (let i = 0, len = endIndex; i < len; i++) {
            if (showList[0].data[pageIndex][j]) {
              if (startIndex === showList[0].data[pageIndex][j][0]) {
                series.data.push([i, showList[0].data[pageIndex][j][1]]);
                j++;
              }
              else series.data.push([i, 0]);
            } else series.data.push([i, 0]);
            startIndex++;
          }
          return {categories, series};
        }
      },
      createChart(all, series, categories) {
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
        if (all) {
          this.chart = Highcharts.stockChart('waterChart', {
            credits: {enabled: false},
            chart: {
              plotBorderWidth: 0,//整幅图的边框粗
              marginLeft: 50,//整幅图的偏移量
              marginRight: 20,
            },
            title: {
              text: '降雨量',
              align: 'center',//标题在图首的位置：左中右
              margin: 1,//标题和图表区之间的边距
              widthAdjust: -200,//调整title宽度，通常给打印button留位置},
              style: {
                color: '#00a65a',
                fontWeight: 'bold'
              },
            },
            yAxis: {
              title: {
                text: '雨量数据(mm)',
                align: 'high',
                textAlign: 'low',
                offset: 0,
                rotation: 0,
                x: -40,
                y: -5,
                style: {
                  color: Highcharts.getOptions().colors[0],
                  fontSize: 14,
                }
              },
              alternateGridColor: 'rgba(253, 255, 213,0.2)',
              lineWidth: 2,
              tickWidth: 1,
              opposite: false,
            },
            xAxis: {
              title: {
                text: '时间',
                align: 'high'
              },
              dateTimeLabelFormats: {
                second: '%Y-%m-%d<br/>%H:%M:%S',
                minute: '%Y-%m-%d<br/>%H:%M',
                hour: '%Y-%m-%d<br/>%H:%M',
                day: '%Y<br/>%m-%d',
//              week: '%Y<br/>%m-%d',
                month: '%Y-%m',
                year: '%Y'
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
              shared: true,
              useHTML: true,
              headerFormat: '<small>{point.key}</small><table>',
              pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
              '<td style="text-align: right"><b>{point.y} mm</b></td></tr>',
              footerFormat: '</table>',
              valueDecimals: 2,
//            split: true
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
//          colors: ['#91e8e1', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b'],
            series: this.seriesOptions.listAll,
            navigation: {
              buttonOptions: {
                theme: {
                  'stroke-width': 2,
                  stroke: 'pink',
                  r: 5,
                  states: {
                    hover: {
                      fill: 'pink'
                    },
                    select: {
                      stroke: '#cdcc15',
                      fill: '#cdcc15'
                    }
                  }
                }
              },
              menuItemStyle: {
                fontWeight: 'normal',
                background: 'none'
              },
              menuItemHoverStyle: {
                fontWeight: 'bold',
                background: 'none',
                color: '#cdcc15'
              }
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
          });
//          this.chart.showLoading("<img src='../static/image/spinner_B.gif'>");
        } else {
          this.chart = Highcharts.chart('waterChart', {
            credits: {enabled: false},
            chart: {
              type: 'column',
              zoomType: 'x'
            },
            subtitle: {
              text: series.length > 0 ? ( document.ontouchstart === undefined ? '鼠标拖动可以进行缩放' : '手势操作进行缩放') : '',
            },
            title: {
              text: '降雨量 数据分析',
//              align: 'center',//标题在图首的位置：左中右
//              margin: 1,//标题和图表区之间的边距
//              widthAdjust: -200,//调整title宽度，通常给打印button留位置},
              style: {
                color: '#00a65a',
                fontWeight: 'bold'
              },
            },
            xAxis: {
              title: {
                text: '时间',
                align: 'high'
              },
              categories: categories,
            },
            yAxis: {
              title: {
                text: '雨量数据(mm)',
                align: 'high',
                offset: 0,
                rotation: 0,
                y: -10,
//                textAlign: 'low',
//                offset: 0,
//                x: 40,
                style: {
                  color: Highcharts.getOptions().colors[0],
                  fontSize: 14,
                }
              },
              alternateGridColor: 'rgba(253, 255, 213,0.2)',
              lineWidth: 2,
              tickWidth: 1,
              opposite: false,
              plotLines: [{
                value: 0,
                width: 0,
                color: '#808080'
              }]
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
              align: 'right',
              verticalAlign: 'middle',
              borderWidth: 0
            },
            series: series,
//            series: [{
//              name: component.seriesOptions.listYear[0].name,
//              data: component.seriesOptions.listYear[0].data[0]
//            }]
          });
        }
      },//createChart
      changeChart(){
        let component = this;
        $("input[name=showType]").on('click', function (e) {
          let showType = $("input[name=showType]:checked").val();
          if (showType === '1') {
            component.createChart(true);
          } else {
            switch (showType) {
              case '2':
                component.seriesOptions.showList = (component.seriesOptions.listDay).slice();
                break;
              case '3':
                component.seriesOptions.showList = (component.seriesOptions.listMonth).slice();
                break;
              case '4':
                component.seriesOptions.showList = (component.seriesOptions.listYear).slice();
                break;
            }
            component.pageIndex = '0';//should be a number,string here for except watcher
            if (component.seriesOptions.showList) {
              let options = component.getCategories(showType, component.seriesOptions.showList, parseInt(component.pageIndex));
              if (options && options.series) {
                let indexes = [];
                component.createChart(false, [options.series], options.categories);
                _.each(component.seriesOptions.showList[0].until, (value, key) => {
                  indexes.push({value: key, text: value});
                });
                component.pageIndexes = indexes;
              } else {
                component.pageIndexes = [];
              }
            }
          }
        });
      },
      pageChange(status){
        status === 1 ? this.pageIndex-- : this.pageIndex++;
      },
      getAYearTime(endDate){
        let unixTime = new Date(endDate);
        let startDate = new Date(unixTime.getTime() - 365 * 24 * 60 * 60 * 1000 + 1000);//一年
        let date = {},
            year = startDate.getFullYear(),
            month = startDate.getMonth() + 1,
            day = startDate.getDate(),
            hour = ('0' + startDate.getHours()).slice(-2),
            minute = ('0' + startDate.getMinutes()).slice(-2),
            second = ('0' + startDate.getSeconds()).slice(-2);
        if (month.toString().length === 1) month = '0' + month;
        if (day.toString().length === 1) day = '0' + day;
        date.dateS = year + '-' + month + '-' + day;
        date.dateL = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return date;

      },
    }//methods
  }
</script>

<style lang="scss" scoped>
  input[type=radio] {
    display: none;
    margin: 10px;
  }

  input[type=radio] + label {
    font-size: 14px;
    display: inline-block;
    margin: -2px;
    padding: 8px 12px;
    color: rgb(254, 243, 255);
    background-color: #7cb5ec;
    border-color: #ddd;
    border-radius: 4px;
  }

  input[type=radio]:checked + label {
    color: #e7e7e7;
    font-size: 14px;
    background: none #00a65a;
    /*background-color:;*/
  }

  .horizon-align {
    margin-left: auto;
    margin-right: auto;
  }
</style>

