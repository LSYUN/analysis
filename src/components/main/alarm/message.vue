<template>
  <div class="padding-default">
    <div class="box box-solid">
      <div class="box-body">
        <div class="form-group select2-bootstrap-prepend ">
          <div class="input-group">
            <label class="input-group-addon">选择工程:</label>
            <vue-select2 :ajax=true :multiple=false :paging=false v-ref:item-selector
                         :ajax-url="projectOptions.ajaxUrl"
                         :placeholder="projectOptions.placeholder"
                         :evt-selected="projectOptions.evtSelected"
                         :init-data="projectOptions.initData">
            </vue-select2>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="box box-solid">
        <div class="box-header">
          <h3 class="box-title">预警信息记录</h3>
        </div>
        <div class="box-body">
          <table id="example" cellpadding="0" cellspacing="0" border="0" width="100%"
                 style="position: relative;z-index: 1"
                 class="display nowrap">
            <thead>
            <tr>
              <th class="text-center">预警时间</th>
              <th class="text-center">预警等级</th>
              <th class="text-center">处理进度</th>
              <th class="text-center">预警状态</th>
              <th class="text-center">监测项</th>
              <th class="text-center">预警内容</th>
              <th class="text-center">处理人</th>
              <th class="text-center">确认人</th>
            </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../assets/css/pre-loading.scss';
  export default {
    data () {
      return {
        pathKey: 'alarmMessage',
        table: {},
        accountId: null,
        projectId: null,
        projectName: null,
        projectOptions: {
          initData: [],
          placeholder: '请选择工程',
          evtSelected: function (event, data) {
            this.projectId = data[0].id;
            this.table.ajax.url(window.mainConfig.url.getAlarmMessage(this.projectId)).load();
            this.loading = true;
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getProjectPage_U(this.accountId);
          }.bind(this),
        },
        alarmLevels: [
          {value: 0, text: '一级预警(最严重)'},
          {value: 1, text: '二级预警（较严重）'},
          {value: 2, text: '三级预警（一般严重）'},
          {value: 99, text: '无预警'}],
        resolveStatus: [
          {value: 0, text: '未处理'},
          {value: 1, text: '处理中'},
          {value: 2, text: '已完结'},
          {value: 99, text: '空'}],
        status: [
          {value: 0, text: '未确认预警'},
          {value: 1, text: '错误预警'},
          {value: 2, text: '真实预警'}],
      };
    },
    mounted () {
      this.accountId = window.session.getObj(window.sessionKeys.ACCOUNT).id;
//      this.initTable(this.projectId);
      this.initProjectOptions(this.accountId);
      this.changeResolveStatus();
      this.changeStatus();
    },
    methods: {
      /***
       * 初始化下拉框
       */
      initProjectOptions(accountId){
        window.mainConfig.http.getProjectPage_R(accountId).then((response) => {
          let projectInfo = response.data[0];
          if (projectInfo && projectInfo.id) {
            this.projectId = projectInfo.id;
            this.$refs.itemSelector.$emit('update', [{id: projectInfo.id, text: projectInfo.name, obj: projectInfo}]);
            this.loading = true;
            this.initTable(this.projectId);
          }
        }, (response) => {
          console.log(response);
        })
      },
      initTable () {
        let self = this;
        this.table = $('#example').DataTable({
          scrollX: true,
          showCheckbox: true,
          searching: false,
          ordering: false,
          deferRender: true,
//          select: {style: 'single', selector: 'td:nth-child(20)'},
          ajax: {
            url: window.mainConfig.url.getAlarmMessage(this.projectId),
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            dataFilter: function (data) {
              let json = JSON.parse(data);
              self.nameList = _.map(json, (j) => j.name);
              return JSON.stringify({data: json});
            }
          },
          dom: "<'col-sm-12'r><'col-sm-12't><'col-sm-2'l><'col-sm-4'i><'col-sm-6'p>",
          language: this.$store.state.dataTable.language,
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          columnDefs: [
            {
              render: (data,type,row) => {
                let d = _.find(self.alarmLevels, (d) => d.value === data);
                if(d.value===0){
                  return '<div style="background:red">'+d.text+'</div>'
                }else if(d.value===1){
                  return '<div style="background:orange">'+d.text+'</div>'
                } else if(d.value===2){
                  return '<div style="background:yellow">'+d.text+'</div>'
                }
                return d ? d.text : '';
              },
              targets:1
            },
            {
              render: (data,type,row) => {
                let d = _.find(self.resolveStatus, (d) => d.value === data);
                return '<div class="tooltips" style="color: #3399ff;cursor: pointer;text-align: center;font-weight: bold">' + (d ? d.text : "" ) +
                    '<span class="tooltipsText">修改 处理进度</span></div>';
              },
              targets:2
            },
            {
              render: (data,type,row) => {
                let d = _.find(self.status, (d) => d.value === data);
                return '<div class="tooltips" style="color: #3399ff;cursor: pointer;text-align: center;font-weight: bold">' + (d ? d.text : "" ) +
                    '<span class="tooltipsText">修改 预警状态</span></div>';
              },
              targets:3
            },
            {
              render:(data,type,row)=>{
//                console.log(data);
//                console.log(row);
                if(row.alarmLevel===0){
                  return '<div style="background:red">'+data+'</div>'
                }else if(row.alarmLevel===1){
                  return '<div style="background:orange">'+data+'</div>'
                } else if(row.alarmLevel===2){
                  return '<div style="background:yellow">'+data+'</div>'
                }
              },
              targets:5
            }
          ],
          data: null,
          columns: [
            {
              data: 'dTime'
            },
            {
              data: 'alarmLevel',
            },
            {
              data: 'resolveStatus',
            },
            {
              data: 'status',
            },
            {
              data: 'itemName'
            },
            {
              data: 'content',
            },
            {
              data:'handleName'
            },{
              data:'confirmName'
            }
          ],
        });
      },
      modify(info, callback){
        window.mainConfig.http.AlarmMessageModify(info).then((response) => {
          callback();
          toastr.success('修改成功');
        }), (response) => {
          console.log(response);
          toastr.error('修改失败');
        }
      },
      changeResolveStatus(){
        let self = this;
        $('#example ').on('click', 'td:nth-child(3)', function (p) {
          self.info = self.table.row(this).data();
          let wrapTop = '<div class="radioContain"><div class="radioWrapper">', wrapTail = '</div></div>', contain = '';
          let length = self.resolveStatus.length;
          for (let i = 0; i < length; i++) {
            let status = self.resolveStatus[i];
           if(status.value===2){
              self.info.confirmAccountId=self.accountId;
              self.info.handleTime=self.formatDate(new Date).dateL;
           }
            let checked = self.info.resolveStatus === status.value ? 'checked ' : '';
            contain = contain + '<input type="radio" class="radioResolve" name="radioResolve" id=' + 'resolve' + +status.value + ' value=' + status.value + ' ' + checked + '>' +
                '<label for=' + 'resolve' + +status.value + '>' + status.text + '</label>';
          }
          layer.open({
            title: '<h3 style="color: #3399ee;">处理进度</h3>'
            , area: '400px'
            , shade: 0.8
            , id: 'resolveStatus'
            , resize: false
            , closeBtn: 0
            , shadeClose: true
            , skin: 'yourclass'
            , btn: ['确定', '取消']
            , btnAlign: 'c'
            , moveType: 1 //拖拽模式，0或者1
            , content: wrapTop + contain + wrapTail
            , yes: function (layero) {
              let val = $("input[name=radioResolve]:checked").val();
              self.info.resolveStatus = val;
              self.modify(self.info, function () {
                layer.closeAll();
                self.table.ajax.reload();
              });
            }
          });
        })
      },
      changeStatus(){
        let self = this;
        $('#example ').on('click', 'td:nth-child(4)', function (p) {
          self.info = self.table.row(this).data();
          self.info.handleAccountId=self.accountId;
          self.info.confirmTime=self.formatDate(new Date).dateL;
          console.log(self.info);
          let wrapTop = '<div class="radioContain"><div class="radioWrapper">', wrapTail = '</div></div>', contain = '';
          let length = self.status.length;
          for (let i = 0; i < length; i++) {
            let status = self.status[i];
            let checked = self.info.status === status.value ? 'checked ' : '';
            contain = contain + '<input type="radio" class="radioStatus" name="radioStatus" id=' + 'status' + +status.value + ' value=' + status.value + ' ' + checked + '>' +
                '<label for=' + 'status' + +status.value + '>' + status.text + '</label>';
          }
          layer.open({
            title: '<h3 style="color: #3399ee;">预警状态</h3>'
            , area: '400px'
            , shade: 0.8
            , id: 'status'
            , resize: false
            , closeBtn: 0
            , shadeClose: true
            , skin: 'yourclass'
            , btn: ['确定', '取消']
            , btnAlign: 'c'
            , moveType: 1
            , content: wrapTop + contain + wrapTail
            , yes: function (layero) {
              let val = $("input[name=radioStatus]:checked").val();
              self.info.status = val;
              console.log(self.info);
              self.modify(self.info, function () {
                layer.closeAll();
                self.table.ajax.reload();
              });
            }
          });
        })
      },
      //转换的函数
      formatDate(objDate){
        let date = {};
        date.dateS = window.global.formatDate(objDate, 4);
        date.dateL = window.global.formatDate(objDate, 1);
        return date;
      },
    }
  };
</script>
<style lang="scss" scoped>
  .add-remove-button {
    min-width: 90px;
  }

  .btn-middle {
    margin-left: auto;
    margin-right: auto;
    display: inherit;
  }

  @media screen and(max-width: 768px) {
    .add-remove-button {
      padding: 10px;
    }
  }

  .min-height-fill {
    min-height: inherit;
  }

  .caption {
    color: #00acd6;
    font-size: 16px;
    text-align: center;
  }
</style>

