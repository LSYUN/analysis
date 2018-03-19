<template>
  <div>
    <section class="content content-overflow layui-anim layui-anim-up">
      <div class="box box-solid">
        <div class="box-header">
          <h3 class="box-title no-btn-title">工程完整报表</h3>
        </div>
      </div>
      <div class="box-body">
        <div class="selection">
          <div class="row">
            <div class="col-sm-6 div-margin-bottom">
              <div class="input-group">
                <label class="input-group-addon addon-label" for="project">工程名称:</label>
                <vue-select2 :ajax="true" :paging="false" :multiple="false" v-ref:project-slt id="project"
                             :ajax-url="projectOptions.ajaxUrl"
                             :placeholder="projectOptions.placeholder"
                             :evt-selected="projectOptions.evtSelected"
                             :init-data="projectOptions.initData"></vue-select2>
              </div>
            </div>
            <div class="col-sm-6 div-margin-bottom">
              <div class="input-group">
                <label class="input-group-addon addon-label" for="reportType">报表类型:</label>
                <vue-select2 :ajax=false :paging=false :multiple=false v-ref:report-slt id="reportType"
                             :init-data="reportFormTypeOptions.initData"
                             :local-data="reportFormTypeOptions.localData"
                             :placeholder="reportFormTypeOptions.placeholder"
                             :evt-selected="reportFormTypeOptions.evtSelected"></vue-select2>
              </div>
            </div>
            <div class="col-sm-6 div-margin-bottom">
              <div class="input-group">
                <label class="input-group-addon addon-label" for="startTime">开始时间:</label>
                <input type="text" class="form-control daterangepicker" id="startTime" v-model="startTime" placeholder="请选择日期">
              </div>
            </div>
            <div class="col-sm-6 div-margin-bottom">
              <div class="input-group">
                <label class="input-group-addon addon-label" for="endTime">结束时间:</label>
                <input type="text" class="form-control daterangepicker" id="endTime" v-model="endTime" placeholder="请选择日期">
              </div>
            </div>
          </div>
        </div>
        <div class="box-body">
          <div class="box-header">
            <h4 style=" color: #3595CC;font-size: 1.3em;font-weight: bold;margin-left: -5px;float: left">全站仪位移监测:</h4>
          </div>
          <div class="row">
            <div class="col-sm-4 div-margin-bottom">
              <div class="input-group">
                <label class="input-group-addon addon-label">本次测量周期:</label>
                <vue-select2 :ajax="true" :paging="false" :multiple="false" v-ref:period-slt
                             :ajax-url="periodOptions.ajaxUrl"
                             :placeholder="periodOptions.placeholder"
                             :evt-selected="periodOptions.evtSelected"
                             :init-data="periodOptions.initData"></vue-select2>
              </div>
            </div>
            <div class="col-sm-4 div-margin-bottom">
              <div class="input-group">
                <label class="input-group-addon addon-label">上次测量周期:</label>
                <vue-select2 :ajax="true" :paging="false" :multiple="false" v-ref:reference-slt
                             :ajax-url="referencePeriodOptions.ajaxUrl"
                             :placeholder="referencePeriodOptions.placeholder"
                             :evt-selected="referencePeriodOptions.evtSelected"
                             :init-data="referencePeriodOptions.initData"></vue-select2>
              </div>
            </div>
            <div class="col-md-offset-9 center-grid btn-container">
              <button id="btn-query" class="btn table-title-button " @click="exportExcel()">
                <i class="iconfont icon-icon "></i>生成报表
              </button>
            </div>
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
    data() {
      return {
        pathKey: 'wholeReport',
        info: {},
        accountId: null,
        projectId: null,
        projectName: null,
        startDate: null,
        endDate: null,
        reportFormType: 0,
        reportFormTypeOptions: {
          initData: [],
          placeholder: '报表类型',
          evtSelected: function (evt, data) {
            if (data && data[0]) {
              this.reportFormType = data[0].id;
            }
          }.bind(this),
          localData: [{id: 0, text: '日报表'}, /* {id: 1, text: '阶段性报表'}, {id: 2, text: '总结报表'}*/]
        },
        projectOptions: {
          initData: [],
          placeholder: '工程选择',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              let d = data[0];
              this.projectId = d.id;
              this.projectName = d.text;
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getProjectPage_U(this.accountId);
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
        },
        periodOptions: {
          initData: [],
          placeholder: '本次测量周期',
          evtSelected: function (evt, data) {
            this.totalStationPeriodNo = data[0].obj.name;
          }.bind(this),
          ajaxUrl: function () {
            this.startTime = $('#startTime').val();
            this.endTime = $('#endTime').val();
            if (this.projectId === null) {
              toastr.warning('请先选择工程');
              return;
            }
            return window.mainConfig.url.getPeriodNoByProjectIdAndTime(this.projectId, this.startTime, this.endTime);
          }.bind(this)
        },
        referencePeriodOptions: {
          initData: [],
          placeholder: '上次周期选择',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.referencePeriodNo = data[0].obj.name;
            }
          }.bind(this),
          ajaxUrl: function () {
            this.startTime = $('#startTime').val();
            this.endTime = $('#endTime').val();
            if (this.projectId === null) {
              toastr.warning('请先选择项目');
              return;
            }
            return window.mainConfig.url.getLastPeriodNoByProjectIdAndTime(this.projectId, this.startTime, this.endTime);
          }.bind(this)
        },
      };
    },
    mounted() {
      this.accountId = window.session.getObj(window.sessionKeys.ACCOUNT).id;
      this.initDatePicker();
      this.initAllSelects();
    },
    methods: {
      /*构建reportData对象, 给后台生成Excel*/
      exportExcel() {
        if (parseInt(this.totalStationPeriodNo) <= parseInt(this.referencePeriodNo)) {
          toastr.warning('当前测量周期应大于上一测量周期，请重新选择');
          return;
        }
        let startTime = $('#startTime').val(), endTime = $('#endTime').val();
        let options = {
          url: window.mainConfig.url.createReportData(), //请求的url
          data: {//要发送的数据
            reportFormType: this.reportFormType,
            projectId: this.projectId,
            projectName: encodeURI(this.projectName),
            startTime: startTime,
            endTime: endTime,
            totalStationPeriodNo: this.totalStationPeriodNo,
            referencePeriodNo: this.referencePeriodNo
          },
        };
        let config = $.extend(true, {method: 'post'}, options);
        let $iframe = $('<iframe id="down-file-iframe" />');
        let $form = $('<form target="down-file-iframe" method="' + config.method + '" />');
        $form.attr('action', config.url);
        for (let key in config.data) {
          $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />');
        }
        $iframe.append($form);
        $(document.body).append($iframe);
        $form[0].submit();
        $iframe.remove();
      },

      /*c初始化下拉框*/
      initAllSelects() {
        window.mainConfig.http.getProjectPage_R(this.accountId).then((response) => {
          let project = response.data[0];
          if (project && project.id) {
            this.projectId = project.id;
            this.projectName = project.name;
            this.$refs.projectSlt.$emit('update', [{id: project.id, text: project.name, obj: project}]);
            //获取周期
            this.startTime = $('#startTime').val();
            this.endTime = $('#endTime').val();
            window.mainConfig.http.getThisPeriodNo(this.projectId, this.startTime, this.endTime).then((response) => {
              let period = response.data[0];
              if (period && period.id) {
                this.totalStationPeriodNo = period.name;
                this.$refs.periodSlt.$emit('update', [{id: period.id, text: period.name, obj: period}]);

              }
            }, (response) => {
              console.log(response);
            });
            window.mainConfig.http.getLastPeriodNo(this.projectId, this.startTime, this.endTime).then((response) => {
              let period = response.data[0];
              if (period && period.id) {
                this.referencePeriodNo = period.name;
                this.$refs.referenceSlt.$emit('update', [{id: period.id, text: period.name, obj: period}]);

              }
            }, (response) => {
              console.log(response);
            });
          }
        }, (response) => {
          console.log(response);
        })
      },


      /*初始化日期控件*/
      initDatePicker() {
        let self = this, flashColor = 'rgb(173, 235, 251)';
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
          yesterday = window.globalTool.getAnotherDate(now, -(self.getDays(self.reportFormType, now, false)), 1);
        $('#startTime').daterangepicker($.extend(true, options, {startDate: yesterday}), function (date) {
//          this.startDate = $('#startTime').val();
          let days = self.getDays(self.reportFormType, date, false);
          let endLocal = window.globalTool.getAnotherDate(date, +days, 1);
          $('#endTime').val(endLocal).flash(flashColor, 1000);
          $('#startTime').flash(flashColor, 1000);
        });
        $('#endTime').daterangepicker($.extend(true, options, {startDate: now}), function (date) {
//          this.endDate = $('#endTime').val();
          let days = self.getDays(self.reportFormType, date, true);
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
      getDays(zone, date, minus) {
        let millisecond = 24 * 60 * 60 * 1000;
        switch (parseInt(zone)) {
          case 0:
            return millisecond;
          case 1:
            return window.globalTool.daysOfMonth(date, minus) * millisecond;
          case 2:
            return window.globalTool.daysOfYear(date) * millisecond;
        }
      },

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
    font-size: 1.5rem;
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

  .report-detail .tab-box a.btnSaveSheet {
    cursor: pointer;
    float: right;
    color: #ffffff;
    padding: 5px 12px;
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
