<template>
  <div>
    <section class="content-header">
      <navigation-path :path-key="pathKey"></navigation-path>
    </section>
    <section class="content content-overflow">
      <div class="box box-solid">
        <div class="box-header">
          <span style="display:block;float:left;color: #3399ee;font-size:14px;font-weight:bold;">{{projectName}}</span>
          <h3 class="box-title">IMC(服务器)管理</h3>
        </div>
        <div class="box-body">
          <table id="example" cellpadding="0" cellspacing="0" border="0" class="display table pointer muchColumn"
                 width="100%">
            <thead>
            <tr>
              <th rowspan="2" class="text-center" style="width:15px"></th>
              <th rowspan="2" class="text-center">编号</th>
              <th rowspan="2" class="text-center">名称</th>
              <!--  <th rowspan="2" class="text-center">类型</th>-->
              <th rowspan="2" class="text-center">备注</th>
              <th rowspan="2" class="text-center">在线状态</th>
              <th colspan="2" class="text-center">操作</th>
            </tr>
            <tr>
              <th class="text-center td-btn">查看</th>
              <!-- <th class="text-center td-btn">重启</th>-->
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
  .td-btn {
    width: 10px
  }

  @media screen and (max-width: 768px) {
    #app .example_filter {
      float: none;;
      text-align: center;
    }

    #app .dataTables_wrapper .dataTables_filter {
      float: none;;
      text-align: center;
    }
  }
</style>
<script>
  export default {
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        pathKey: 'watchdogEdit',
        table: {},
//        pathKey: 'watchdog',
        account: null,
        organizationId: null,
        projectName: null,
        imcId: null,
        concurrentIMCList: null,
        types: [
          {value: 0, text: '服务器'},
          {value: 1, text: 'IMC'}
        ]
      };
    },
    components: {
      'navigation-path': require('../../utility/navigation-path.vue'),
    },
    mounted () {
      this.account = window.sessionUtility.getObj(window.sessionKeys.ACCOUNT);
      this.project = window.sessionUtility.getObj(window.sessionKeys.PROJECT);
      this.projectName = this.project.name;
      this.organizationId = this.account.organizationId;
      this.initTable();
      this.IMCSelected();
      this.trClick();
      window.appContext.http.getConcurrentIMCList().then((response) => {
        this.concurrentIMCList = response.body;
      }, (response) => {
        toastr.error('通信失败');
      });
    },
    methods: {
      initTable () {
        let component = this;
        this.table = $('#example').DataTable({
          scrollX: true,
          scrollY: '48vh',
          bScrollCollapse: true,
          showCheckbox: true,
          processing: true,
          searching: true,
          ordering: false,
          deferRender: true,
          ajax: {
            url: window.appContext.urls.getIMCListByProject(this.project.id),
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            dataFilter: function (data) {
              let json = JSON.parse(data);
              return JSON.stringify({
                data: json
              });
            }
          },
          dom: "<'row'<'col-md-6'B><'col-md-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-6'i><'col-sm-6'p>>",
          buttons: [
          ],
          language: this.$store.state.dataTable.language,
          select: {style: 'os', selector: 'td:not(:last-child)'},
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return '';
              },
              className: 'select-checkbox margin-middle',
              targets: 0
            },
            {
              render: function (data) {
                if (data) return "<div class='td-max-length'>" + data + "</div>";
                else return null;
              },
              targets: 3
            },
            {
              render: function (data, type, row) {
                let time = null;
                let status = _.find(this.concurrentIMCList, (list, key) => {
                  if (list === data) {
                    time = key.substring(0, 19);
                    return list;
                  }
                });
                if (status)return '<div style="color:#00acd6;max-width: 200px;white-space: normal">在线(上线时间:' + time + ')</div>';
                else  return '<div style="color: rgba(0,0,0,0.48);">离线</div>';
              }.bind(this),
              targets: 4
            },
            {
              render: function (data, type, row) {
                let status1 = _.find(this.concurrentIMCList, (list, key) => {
                  if (list === data) {
                    return true;
                  }
                });
                if (status1)return '<button type="button" class="btn btn-info btn-xs table-button fa fa-gear">查看</button>';
                else return '<button type="button" class="btn btn-info btn-xs table-button fa fa-gear" disabled="disabled">查看</button>';
              }.bind(this),
              targets: 5
            },
          ],
          data: null,
          columns: [
            {
              data: null
            },
            {
              data: 'imcno'
            },
            {
              data: 'name'
            },
//            {
//              data: 'type'
//            },
            {
              data: 'remark'
            },
            {
              data: 'imcno'
            },
            {
              data: 'imcno'
            },
          ]
        });
      },

      IMCSelected () {
        const component = this;
        $('#example tbody ').on('click', 'tr', function () {
          var data = component.table.row(this).data();
          if (!data) {
            toastr.error('请选择一个IMC!');
            return;
          }
          component.imcId = data.id;
        })
      },
      trClick(){
        const component = this;
        $('#example tbody').on('click', 'tr', function (p) {
          var data = component.table.row(this).data();
          if (p.target.textContent === '查看') {
            window.sessionUtility.setObj(window.sessionKeys.IMC, data);
            component.$route.router.go({path: '/watchdog/imcEdit/sctList'});
          }
          if (p.target.textContent === '重启') {
            if (data.type === 0) {
              toastr.info("服务器不能重启！");
              return;
            }
            BootstrapDialog.show({
              title: '提示信息',
              message: '重启IMC需要耗费一到两分钟，稍后请刷新页面并注意IMC上线时间是否改变，从而判断重启是否成功！',
              buttons: [{
                label: '确定重启',
                action: function (dialog) {
                  window.appContext.http.restartIMC(data.imcno).then((respond) => {
                    if (respond.body.ERRORCODE === '0') {
                      toastr.success("重启指令发送成功");
                      window.location.reload();
                    } else if (respond.body.ERRORCODE === '1') {
                      toastr.error("重启指令发送失败");
                    } else {
                      toastr.error("IMC不在线")
                    }
                  }, (respond) => {

                  }).bind(this);
                  dialog.close();
                }
              }, {
                label: '取消',
                action: function (dialog) {
                  dialog.close();
                }
              }]
            });


          }
        });
      },
    }
  };
</script>
