<template>
  <div class="box-wrapper">
    <ul class="nav nav-tabs" id="myTab">
      <li class="active"><a href="#first" data-toggle="tab" id="tab1">方式一</a></li>
      <li><a href="#second" data-toggle="tab" id="tab2">方式二</a></li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane active" id="first">
        <div id="chart"></div>
      </div>
      <div class="tab-pane" id="second">
        <div class="time-wrapper" v-if="timeOption && timeOption.length>0">
          <span>选择时间:</span>
          <select v-model="dTime">
            <option v-for="option in timeOption" :value="option.id">{{option.text}}</option>
          </select>
        </div>
        <div id="secondChart"></div>
      </div>
    </div>
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
        variety: 'inDisplacementData',
        chart: {},
        secondChart: {},
        dTime: null,
        timeOption: [],
        setPointName: this.info.pointNameList,            //用以判断查询类型的时候设置当前查询的点名
        isRender: false,
        seriesOptions: {},
        pageIndex: 1,
        touchTimes: null,
      };
    },
    watch: {
      dTime: function (e) {
        if (e !== null && e === this.getTimeSeries(this.dataList).timeList[0].id) {
        } else {
          $('#secondChart').text('');
          let series = this.timeSeries.series[e];
          this.reDraw(series[0].data);
        }
      }
    },
    created: function () {
      this.$on('filterChart', function (e) {
        this.chart.showLoading("<img src='../static/image/spinner_B.gif'>");
        if(e.mark>=5){
          let self=this;
          self.pageIndex = 1;
          window.mainConfig.http.getMonitorGroupIdData_R(e.Url, e.mark,e.monitorGroupId, e.projectId, e.startDate,
              e.endDate, {syncNo: 1, pageIndex: 1, pageSize: 1000}).then((response) => {
            if (response.data && response.data.dataList) {
              self.dataList = response.data.dataList;
              if (self.dataList && self.dataList.length > 0) {
//                self.inDisSeries = self.getInDisdSeries(self.dataList);
                self.timeSeries = self.getTimeSeries(self.dataList);
                self.timeOption = self.timeSeries.timeList;
                self.dTime = (self.timeOption[0].id).toString();
//                self.createInDisdChart(self.inDisSeries);
//                layer.msg('正在加载请稍后.....');
                $('#secondChart').text('');
                self.coverDepthPicture(self.dataList, self.dTime);
              } else {
                self.chartPeriod.showLoading("<img src='../static/image/data-empty-200.jpg'>");
                layer.msg('当前条件下暂无数据');
                self.secondChart.hideLoading();
              }
            }
          }, (response) => {
            toastr.error('通信失败');
          })
        }else{
          this.filterChart(e.Url, e.mark, e.monitorItemId, e.projectId, e.pointNames,e.startDate, e.endDate, e.attrValue, e.attrText, e.attrUnit);
        }
      });
      this.$on('updateChart', function (obj) {
        let setAttr = window.globalTool.setUpperCase(this.info.itemOption.attrValue);// 将获取到的显示类型属性首字母转大写
        if (this.chart.series && this.chart.series.length > 0 && obj) {
          for (let i = 0, len = this.chart.series.length; i < len; i++) {
            if (this.chart.series[i].name === obj.PointName)
              this.chart.series[i].addPoint([Date.parse(obj.DTime), obj[setAttr]], true, false);
          }
        }
      });
    },
    mounted () {
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
      this.createChart();
      this.chart.showLoading("<img src='../static/image/spinner_B.gif'>");
      let e = this.info;
      let startDate = e.startEndDate.startDate.dateL;
      let endDate = e.startEndDate.endDate.dateL;
      this.loadInDisdChart(this.info.itemOption.Url, 5, this.info.pointGroupObj[0].id, this.info.projectId,
          startDate, endDate);
      this.filterChart(e.itemOption.Url, e.itemOption.mark, e.itemObj.id, e.projectId, e.itemOption.pointNames,
        startDate, endDate, e.itemOption.attrValue, e.itemOption.attrText, e.itemOption.attrUnit);
      this.windowResize();
      $('#toggleHide').hide();
    },
    methods: {
      filterChart(variety, urlType, monitorItemId, projectId, pointNames, startTime, endTime, attrY, attrText, attrUnit, pageIndex){
        window.mainConfig.http.getMonitorItemData_R(variety, urlType, monitorItemId, projectId, pointNames, startTime, endTime, {
          syncNo: 1, pageIndex: pageIndex || 1, pageSize: 300
        }).then((response) => {
          if (response.data && response.data.dataList && response.data.dataList.length > 0) { // 判断返回内容是否有数据
            this.seriesOptions = this.getSeriesOptions(response.data.dataList, attrY);
            this.createChart();
          } else {
            layer.msg('当前时间测点暂无数据');
            this.chart.hideLoading();
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
        let map = {}, dest = [];
        if (data) {
          for (let i = 0, len = data.length; i < len; i++) {
            let ai = data[i];
            if (!map[ai.pointName]) {
              dest.push({ //Date.parse(ai.dtime)
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
      },//getSeriesOptions
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
        this.chart = Highcharts.stockChart('chart', this.getChartOptions(this.info.itemOption.attrText, this.info.itemOption.attrUnit, this.info.itemOption.mark));
      },//createChart
      afterSetExtremes(e){
        this.touchTimes = 1;
        this.chart.xAxis[0].setExtremes(e.min, e.max, true, false);
        if (e.min <= e.dataMin) {
          if (e.min > Date.parse(this.info.startEndDate.startDate.dateL)) {
            if (this.touchTimes === 1) {
              this.touchTimes = this.touchTimes + 1;
              this.pageIndex = this.pageIndex + 1;
              this.chart.showLoading("<img src='../static/image/spinner_B.gif'>正在加载更早前数据");
              window.mainConfig.http.getDataByPointAndTime_R(this.info.itemOption.Url, this.info.projectId, this.setPointName,
                this.info.startEndDate.startDate.dateL, this.info.startEndDate.endDate.dateL, {
                  syncNo: 1, pageIndex: this.pageIndex || 1, pageSize: 1000
                }).then((response) => {
                let seriesOptions = this.getSeriesOptions(response.data.dataList, this.info.itemOption.attrValue);
                if (seriesOptions.dest.length === 0) {
                  layer.msg('已经加载全部数据');
                  this.chart.hideLoading();
                  return;
                }
                for (let i = 0, len = this.chart.series.length / 2; i < len; i++) {
                  let oldX = (_.find(this.seriesOptions.dest, (series) => this.chart.series[i].name === series.name)).data,
                    newX = (_.find(seriesOptions.dest, (series) => this.chart.series[i].name === series.name)).data;
                  this.chart.series[i].setData(newX.concat(oldX));
                  this.chart.hideLoading();
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
      loadInDisdChart(variety,mark, monitorGroupId, projectId, startTime, endTime){
        let self = this;
        let tab2 = document.getElementById('tab2');
        let tab1 = document.getElementById('tab1');
        tab2.addEventListener('click', function (e) {
          $('#toggleShow').hide();
          $('#showTypes').hide();
          $('#toggleHide').show();
          self.pageIndex = 1;
          window.mainConfig.http.getMonitorGroupIdData_R(variety, mark,monitorGroupId, projectId, startTime,
            endTime, {syncNo: 1, pageIndex: 1, pageSize: 1000}).then((response) => {
            if (response.data && response.data.dataList) {
              self.dataList = response.data.dataList;
              if (self.dataList && self.dataList.length > 0) {
//                self.inDisSeries = self.getInDisdSeries(self.dataList);
                self.timeSeries = self.getTimeSeries(self.dataList);
                self.timeOption = self.timeSeries.timeList;
                self.dTime = (self.timeOption[0].id).toString();
//                self.createInDisdChart(self.inDisSeries);
//                layer.msg('正在加载请稍后.....');
                $('#secondChart').text('');
                self.coverDepthPicture(self.dataList, self.dTime);
              } else {
                self.chartPeriod.showLoading("<img src='../static/image/data-empty-200.jpg'>");
                layer.msg('当前条件下暂无数据');
                self.secondChart.hideLoading();
              }
            }
          }, (response) => {
            toastr.error('通信失败');
          })
        });
        tab1.addEventListener('click', function (e) {
          $('#toggleShow').show();
          $('#toggleHide').hide();
          $('#showTypes').show();
        });
      },
      getTimeSeries(data){
        if (data) {
          let series = [], map = [], timeList = [], result = [];
          for (let i = 0, len = data.length; i < len; i++) {
            let ai = data[i];
            if (!map[ai.dtime]) {
              timeList.push({id: ai.dtime, text: ai.dtime});
              result[ai.dtime] = [ai.pointName];
              series[ai.dtime] = [{
                name: '深度',
                data: [[ai.pointName, ai['depth'], ai['accumulationOffsetX']]],
              }];
              map[ai.dtime] = ai;
            } else {
              series[ai.dtime][0].data.push([ai.pointName, ai['depth'], ai['accumulationOffsetX']]);
              result[ai.dtime].push(ai.pointName);
            }
          }
          return {series, result, timeList};
        }
      },
      coverDepthPicture(data, dTime){
        var wrapChartWidth = document.getElementById('secondChart').clientWidth;
        if (data) {
          if (data.length > 0) {
            var valueOffListMax = new Array();
            var deptListMax = new Array();

            var obj = {};
            for (var i in data) {
              if (!obj.hasOwnProperty(data[i]['dtime'])) obj[data[i]['dtime']] = [];
              obj[data[i]['dtime']].push(data[i]);
            }
            var keyArr = Object.keys(obj);
            var result = [], results = [];
            for (var i in keyArr) {
              result.push({
                time: keyArr[i],
                archives: obj[keyArr[i]]
              })
            }
//            console.log(result);
            function compare(property) {
              return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
              }
            }

            for (let i = 0, len = result.length; i < len; i++) {
              if (dTime === result[i].time) {
                var results = result[i].archives;
              }
            }
            for (let i = 0, len = data.length; i < len; i++) {
              let datas = data[i].accumulationOffsetX;
              valueOffListMax[i] = datas;
              let dataList = data[i].depth;
              deptListMax[i] = dataList;
            }
            let maxX = d3.max(valueOffListMax);
            let minX = d3.min(valueOffListMax);
            let minDept = d3.min(deptListMax);
            let maxDept = d3.max(deptListMax);
            var str = '内部分层位移曲线图',
              xData = [],
              xLengths = [];
//            console.log(results.sort(compare('depth')));
            for (let i = 0, len = results.sort(compare('depth')).length; i < len; i++) {
              xData.push({name: results[i].pointName, x: results[i].accumulationOffsetX, y: results[i].depth});
            }
//            console.log(xData);
            for (let i = Math.floor(minX), len = Math.ceil(maxX); i < len; i++) {
              xLengths.push(i);
            }
            //创建画布
            var svg = d3.select('#secondChart').append('svg')
              .attr('width', wrapChartWidth).attr('height', '600')
              .style('margin-top', '-30px');
            var margin = {top: 60, bottom: 20, left: 30, right: 270},
              width = +svg.attr("width") - margin.left - margin.right,
              height = +svg.attr("height") - margin.top - margin.bottom;
            //建轴线比例尺
            var xScale = d3.scaleLinear().domain([Math.floor(minX), Math.ceil(maxX)]).range([Math.floor(minX), width]),
              yScale = d3.scaleLinear().domain([Math.floor(minDept), Math.ceil(maxDept)]).range([Math.floor(minDept), height]);
            //创建x和y的生成函数
            var xAxis = d3.axisTop(xScale)
              .ticks(xLengths.length - 1)
              .tickFormat(formatTick)
              .tickSize(-height);//对指定刻度进行转换
            var yAxis = d3.axisLeft(yScale)
              .tickSize(-width);
            //5.创建xy轴
            var g = svg.append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .style('margin-top', '-30px');
            //创建x轴
            g.append("g").attr("class", "axis--x").attr("transform", "translate(0," + yScale(0) + ")")
              .call(xAxis)
              .attr("text-anchor", "middle")
              .attr('transform', 'translate(' + (width / xLengths.length) / 120 + ',' + minDept + ')');

            //创建y轴
            g.append("g").attr("class", "axis--y")
              .call(yAxis)
              .append("text")
              .text('深度')
              .attr('transform', 'translate(0,' + height + ')');
            //图标题
            d3.select(".axis--y")
              .append("text")
              .attr("y", -35)
              .attr("x", '34vw')
              .attr("text-anchor", "start")
              .attr("font-size", "2em")
              .attr('font-weight', 'bold')
              .attr("fill", "#7CB5EC")
              .text(str)
              .attr('text-align', 'center');
            //6.开始画曲线
            var path = g.append("g").attr("class", "path");
            var positive_g = path.append('g');
            positive_g.call(createLine, xData, "line positive");
            //画曲线上的正方形
            positive_g.call(createSymbol, xData, "circle", d3.symbolCircle);

            //1.画红色图例
            var legend = g.append('g').attr('class', 'legend').attr('transform', 'translate(' + (40) + ',' + (-height / 2) + ')');
            var circle = legend.append('g').attr('class', 'circle-cir');
            circle.call(addDiscrible, "位移", -260);
            circle.call(addDiscribleTwo, "深度", 276);

            //添加图例的文字
            function addDiscrible(container, str, num) {
              container
                .append("text")
                .attr("font-size", "14px")
                .attr("fill", "#000")
                .attr('transform', 'translate(' + ( width - 30 ) + ',' + (height + num) + ')')
                .text(str);
            }

            function addDiscribleTwo(container, str, num) {
              container
                .append("text")
                .attr("font-size", "14px")
                .attr("fill", "#000")
                .attr('transform', 'translate(-50,' + (height + num) + ')')
                .text(str);
            }

            //创建节点上的符号
            function createSymbol(container, datas, className, symbols) {
              container
                .selectAll("." + className)
                .data(datas)
                .enter()
                .append("path")
                .attr("d", d3.symbol().type(symbols))
                .attr("class", className)
                .attr('transform', function (d) {
                  return 'translate(' + xScale(d.x) + ',' + yScale(d.y) + ')';
                })
                .on("click", function (d) {
                  d3.select("#tooltip").remove();
                  var x = d3.event.pageX - 160;
                  var y = d3.event.pageY - 400;
                  path.append("text")
                    .attr("id", "tooltip")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-setif")
                    .attr("font-size", "14px")
                    .attr("fill", "black")
                    .attr('position', 'absolute')
                    .text(d.name + '\r\n' + '累积位移:' + d.x.toFixed(2) + 'mm,深度:' + d.y.toFixed(2) + 'm')
                });
            }

            //创建曲线
            function createLine(container, datas, className) {
              var line = d3.line()
                .x(function (d) {
                  return xScale(d.x);
                })
                .y(function (d) {
                  return yScale(d.y);
                });
              container
                .append("path")
                .datum(datas)
                .attr("class", className)
                .attr("d", line);
            }

            //取每个刻度对应的日期
            function formatTick(d, i) {
              return xLengths[i];
            }
          }
        }
      },
      //重绘
      reDraw(results){
        var wrapChartWidth = document.getElementById('secondChart').clientWidth;

        function compare(property) {
          return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
          }
        }

        var str = '内部分层位移曲线图',
          xData = [],
          xLengths = [];
        var valueOffListMax = new Array();
        var deptListMax = new Array();
//        console.log(results.sort(compare(1)));
        for (let i = 0, len = results.sort(compare(1)).length; i < len; i++) {
          xData.push({name: results[i][0], x: results[i][2], y: results[i][1]});
          let datas = results[i][2];
          valueOffListMax[i] = datas;
          let dataList = results[i][1];
          deptListMax[i] = dataList;
        }
        let minX = d3.min(valueOffListMax) - 1;
        let maxX = d3.max(valueOffListMax) + 1;
        let minDept = d3.min(deptListMax);
        let maxDept = d3.max(deptListMax);
        for (let i = Math.floor(minX); i <= Math.ceil(maxX) i < len;
        i++
      )
        {
          xLengths.push(i);
        }
        //创建画布
        var svg = d3.select('#secondChart').append('svg')
          .attr('width', wrapChartWidth).attr('height', '600')
          .style('margin-top', '-30px');
        var margin = {top: 60, bottom: 20, left: 30, right: 270},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;
        //建轴线比例尺
        var xScale = d3.scaleLinear().domain([Math.floor(minX), Math.ceil(maxX)]).range([Math.floor(minX), width]),
          yScale = d3.scaleLinear().domain([Math.floor(minDept), Math.ceil(maxDept)]).range([Math.floor(minDept), height]);
        //创建x和y的生成函数
        var xAxis = d3.axisTop(xScale)
          .ticks(xLengths.length - 1) //指定刻度
          .tickFormat(formatTick)
          .tickSize(-height);//对指定刻度进行转换
        var yAxis = d3.axisLeft(yScale)
          .tickSize(-width);
        //5.创建xy轴
        var g = svg.append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        //创建x轴
        g.append("g").attr("class", "axis--x").attr("transform", "translate(0," + yScale(0) + ")")
          .call(xAxis)
          .attr("text-anchor", "middle")
          .attr('transform', 'translate(' + (width / xLengths.length) / 120 + ',' + minDept + ')');

        //创建y轴
        g.append("g").attr("class", "axis--y")
          .call(yAxis)
          .append("text")
          .text('深度')
          .attr('transform', 'translate(0,' + height + ')');

        //图标题
        d3.select(".axis--y")
          .append("text")
          .attr("y", -35)
          .attr("x", '36vw')
          .attr("text-anchor", "start")
          .attr("font-size", "1.8em")
          .attr("fill", "#7CB5EC")
          .text(str)
          .attr('font-weight', 'bold')
          .attr('text-align', 'center');
        //6.开始画曲线
        var path = g.append("g").attr("class", "path");
        var positive_g = path.append('g');
        positive_g.call(createLine, xData, "line positive");
        //画曲线上的圆点
        positive_g.call(createSymbol, xData, "circle", d3.symbolCircle);

        //1.画红色图例
        var legend = g.append('g').attr('class', 'legend').attr('transform', 'translate(' + (40) + ',' + (-height / 2) + ')');
        var circle = legend.append('g').attr('class', 'circle-cir');
        circle.call(addDiscrible, "位移", -260);
        circle.call(addDiscribleTwo, "深度", 280);

        //添加图例的文字
        function addDiscrible(container, str, num) {
          container
            .append("text")
            .attr("font-size", "14px")
            .attr("fill", "#000")
            .attr('transform', 'translate(' + ( width - 30 ) + ',' + (height + num) + ')')
            .text(str);
        }

        function addDiscribleTwo(container, str, num) {
          container
            .append("text")
            .attr("font-size", "14px")
            .attr("fill", "#000")
            .attr('transform', 'translate(-50,' + (height + num) + ')')
            .text(str);
        }

        //创建节点上的符号
        function createSymbol(container, datas, className, symbols) {
          container
            .selectAll("." + className)
            .data(datas)
            .enter()
            .append("path")
            .attr("d", d3.symbol().type(symbols))
            .attr("class", className)
            .attr('transform', function (d) {
              return 'translate(' + xScale(d.x) + ',' + yScale(d.y) + ')';
            })
            .on("click", function (d) {
              d3.select("#tooltip").remove();
              var x = d3.event.pageX - 160;
              var y = d3.event.pageY - 400;
              path.append("text")
                .attr("id", "tooltip")
                .attr("x", x)
                .attr("y", y)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-setif")
                .attr("font-size", "14px")
                .attr("fill", "black")
                .attr('position', 'absolute')
                .text(d.name + '\r\n' + '累积位移:' + d.x.toFixed(2) + 'mm,深度:' + d.y.toFixed(2) + 'm')
            });
        }

        //创建曲线
        function createLine(container, datas, className) {
          var line = d3.line()
            .x(function (d) {
              return xScale(d.x);
            })
            .y(function (d) {
              return yScale(d.y);
            });
          container
            .append("path")
            .datum(datas)
            .attr("class", className)
            .attr("d", line);
        }

        //取每个刻度对应的日期
        function formatTick(d, i) {
          return xLengths[i];
        }
      },
      windowResize () {
        $(window).resize(function () {
          const interval = setInterval(function () {
            this.wrapChartWidth = document.getElementById('secondChart').clientWidth;
            let series = this.timeSeries.series[this.getTimeSeries(this.dataList).timeList[0].id];
            $('#secondChart').text('');
            function compare(property) {
              return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
              }
            }

            var str = '内部分层位移曲线图',
              xData = [],
              xLengths = [];
            var valueOffListMax = new Array();
            var deptListMax = new Array();
            for (let i = 0, len = series[0].data.sort(compare(1)).length; i < len; i++) {
              xData.push({name: series[0].data[i][0], x: series[0].data[i][2], y: series[0].data[i][1]});
              let datas = series[0].data[i][2];
              valueOffListMax[i] = datas;
              let dataList = series[0].data[i][1];
              deptListMax[i] = dataList;
            }
//            console.log(series[0].data.sort(compare(1)));
            let minX = d3.min(valueOffListMax) - 1;
            let maxX = d3.max(valueOffListMax) + 1;
            let minDept = d3.min(deptListMax);
            let maxDept = d3.max(deptListMax);
            for (let i = Math.floor(minX); i <= Math.ceil(maxX) i < len;
            i++
            )
            {
              xLengths.push(i);
            }
            //创建画布
            var svg = d3.select('#secondChart').append('svg')
              .attr('width', this.wrapChartWidth).attr('height', '600')
              .style('margin-top', '-30px');
            var margin = {top: 60, bottom: 20, left: 30, right: 270},
              width = +svg.attr("width") - margin.left - margin.right,
              height = +svg.attr("height") - margin.top - margin.bottom;
            //建轴线比例尺
            var xScale = d3.scaleLinear().domain([Math.floor(minX), Math.ceil(maxX)]).range([Math.floor(minX), width]),
              yScale = d3.scaleLinear().domain([Math.floor(minDept), Math.ceil(maxDept)]).range([Math.floor(minDept), height]);
            //创建x和y的生成函数
            var xAxis = d3.axisTop(xScale)
              .ticks(xLengths.length - 1)
              .tickFormat(formatTick)
              .tickSize(-height);//对指定刻度进行转换
            var yAxis = d3.axisLeft(yScale)
              .tickSize(-width);
            //5.创建xy轴
            var g = svg.append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            //创建x轴
            g.append("g").attr("class", "axis--x").attr("transform", "translate(0," + yScale(0) + ")")
              .call(xAxis)
              .attr("text-anchor", "middle")
              .attr('transform', 'translate(' + (width / xLengths.length) / 120 + ',' + minDept + ')');//oneCoord * 4 + margin.left + padding

            //创建y轴
            g.append("g").attr("class", "axis--y")
              .call(yAxis)
              .append("text")
              .text('深度')
              .attr('transform', 'translate(0,' + height + ')');

            //图标题
            d3.select(".axis--y")
              .append("text")
              .attr("y", -35)
              .attr("x", '36vw')
              .attr("text-anchor", "start")
              .attr("font-size", "1.8em")
              .attr("fill", "#7CB5EC")
              .text(str)
              .attr('font-weight', 'bold')
              .attr('text-align', 'center');
            //6.开始画曲线
            var path = g.append("g").attr("class", "path");
            var positive_g = path.append('g');
            positive_g.call(createLine, xData, "line positive");
            //画曲线上的圆点
            positive_g.call(createSymbol, xData, "circle", d3.symbolCircle);

            //1.画红色图例
            var legend = g.append('g').attr('class', 'legend').attr('transform', 'translate(' + (40) + ',' + (-height / 2) + ')');
            var circle = legend.append('g').attr('class', 'circle-cir');
            circle.call(addDiscrible, "位移", -260);
            circle.call(addDiscribleTwo, "深度", 280);

            //添加图例的文字
            function addDiscrible(container, str, num) {
              container
                .append("text")
                .attr("font-size", "14px")
                .attr("fill", "#000")
                .attr('transform', 'translate(' + ( width - 30 ) + ',' + (height + num) + ')')
                .text(str);
            }

            function addDiscribleTwo(container, str, num) {
              container
                .append("text")
                .attr("font-size", "14px")
                .attr("fill", "#000")
                .attr('transform', 'translate(-50,' + (height + num) + ')')
                .text(str);
            }

            //创建节点上的符号
            function createSymbol(container, datas, className, symbols) {
              container
                .selectAll("." + className)
                .data(datas)
                .enter()
                .append("path")
                .attr("d", d3.symbol().type(symbols))
                .attr("class", className)
                .attr('transform', function (d) {
                  return 'translate(' + xScale(d.x) + ',' + yScale(d.y) + ')';
                })
                .on("click", function (d) {
                  d3.select("#tooltip").remove();
                  var x = d3.event.pageX - 160;
                  var y = d3.event.pageY - 400;
                  path.append("text")
                    .attr("id", "tooltip")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-setif")
                    .attr("font-size", "14px")
                    .attr("fill", "black")
                    .attr('position', 'absolute')
                    .text(d.name + '\r\n' + '累积位移:' + d.x.toFixed(2) + 'mm,深度:' + d.y.toFixed(2) + 'm')
                });
            }

            //创建曲线
            function createLine(container, datas, className) {
              var line = d3.line()
                .x(function (d) {
                  return xScale(d.x);
                })
                .y(function (d) {
                  return yScale(d.y);
                });
              container
                .append("path")
                .datum(datas)
                .attr("class", className)
                .attr("d", line);
            }

            //取每个刻度对应的日期
            function formatTick(d, i) {
              return xLengths[i];
            }

            clearInterval(interval);
          }.bind(this), 200);
        }.bind(this));
      },
      getChartOptions(text, unit, mark){
        return {
          credits: {enabled: false},
          chart: {
            type: 'spline',
            plotBorderWidth: 0,//整幅图的边框粗
            marginLeft: 10,//整幅图的偏移量
            marginRight: 10,
          },
          title: {text: '内部位移监测', style: {color: '#7cb5ec', fontSize: '1.8em', fill: '#7cb5ec'}},
          subtitle: {
            text: mark == 1 ? '当前显示的是全部测点数据' : ''
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
      }
    }//methods
  }
</script>

<style lang="scss" scoped>
  #secondChart {
    background: white;
    width: 100%;
    height: auto;
    position: relative;
  }

  .time-wrapper {
    font-size: 1.01em;
    color: #1e90ff;
    font-weight: 700;
    text-align: right;
    height: 50px;
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
    background: white;
  }

  .time-wrapper > select {
    width: 160px;
    text-align: right;
    display: inline-block;
    max-height: 100px;
    border: 1px #1e90ff solid;
    border-radius: 5px;
  }
</style>

