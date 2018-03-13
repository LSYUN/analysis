<template>
  <div>
    <section class="content content-overflow">
      <div class="box box-solid">
        <div class="box-header">
          <h3 class="box-title">系统文件</h3>
          <span class="table-title-span" v-permission-type="0">
            <button class="btn table-title-button" @click="showModal(1)"><i
                class="iconfont icon-xitong"></i> 上传</button>
          </span>
        </div>
        <div class="box-body">
          <table cellpadding="0" cellspacing="0" border="0" class="display much-column table" id="system" width="100%">
            <thead>
            <tr>
              <th class="text-center" rowspan="2">文件名</th>
              <th class="text-center" rowspan="2">文件类型</th>
              <th class="text-center" rowspan="2">上传时间</th>
              <th class="text-center" colspan="2" style="width: 180px;">操作</th>
            </tr>
            <tr>
              <th class="secondHead">下载</th>
              <th class="secondHead">删除</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
        <hr align="center"/>
        <div class="box-header">
          <h3 class="box-title">机构文件</h3>
          <span class="table-title-span">
            <button class="btn table-title-button" @click="showModal(2)"><i
                class="iconfont icon-jigou1"></i> 上传</button>
          </span>
        </div>
        <div class="box-body">
          <table cellpadding="0" cellspacing="0" border="0" class="display much-column table" id="organization"
                 width="100%">
            <thead>
            <tr>
              <th class="text-center" rowspan="2">文件名</th>
              <th class="text-center" rowspan="2">文件类型</th>
              <th class="text-center" rowspan="2">上传时间</th>
              <th class="text-center" colspan="2" style="width: 180px;">操作</th>
            </tr>
            <tr>
              <th class="secondHead">下载</th>
              <th class="secondHead">删除</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
        <hr align="center"/>
        <div id="reportExclu">
          <div class="box-header">
            <h3 class="box-title">报表模板</h3>
            <span class="table-title-span">
              <div class="form-group select2-bootstrap-prepend col-sm-8 col-lg-10">
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
            </span>
            <span class="table-title-span" style="margin-top:-45px;">
              <button class="btn table-title-button" @click="upLoader()"><i class="iconfont icon-jigou1"></i> 上传</button>
            </span>
          </div>
          <div class="box-body">
          <table cellpadding="0" cellspacing="0" border="0" class="display much-column table" id="report" width="100%">
            <thead>
            <tr>
              <th class="text-center" rowspan="2">文件名</th>
              <th class="text-center" rowspan="2">文件类型</th>
              <th class="text-center" rowspan="2">上传时间</th>
              <th class="text-center" colspan="2" style="width: 180px;">操作</th>
            </tr>
            <tr>
              <th class="secondHead">下载</th>
              <th class="secondHead">删除</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
        </div>
        <!-- /.box-body -->
      </div>
    </section>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
       data-backdrop="static">
    <div class="modal-dialog modal-dialog-alt">
      <div class="modal-content modal-content-alt ">
        <div class="modal-header"><h4 class="modal-title" id="myModalLabel"></h4></div>
        <div class="modal-body">
          <form role="form" novalidate enctype="multipart/form-data" id="uploadForm" method="post" name="uploadForm">
            <div class="form-group">
              <input id="file" class="file" type="file" name="file">
            </div>
            <div class="form-group" style="display: none">
              <input id="projectId" name="projectId">
              <input id="classification" name="classification">
              <input id="rank" name="rank">
              <input id="refId" name="refId">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success btn-upload" @click="upLoadFile()" disabled>确定上传</button>
          <button class="btn btn-info" data-dismiss="modal">关闭</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal -->
  </div>
  <div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
       data-backdrop="static">
    <div class="modal-dialog modal-dialog-alt">
      <div class="modal-content modal-content-alt ">
        <div class="modal-header"><h4 class="modal-title">报表模板上传</h4></div>
        <div class="modal-body">
          <form role="form" novalidate enctype="multipart/form-data" id="uploadReportForm" method="post"
                name="uploadReportForm">
            <div class="col-sm-4 div-margin-bottom">
              <div class="input-group">
                <label class="input-group-addon addon-label" for="reportType">报表类型:</label>
                <vue-select2 :ajax=false :paging=false :multiple=false v-ref:report-slt id="reportType"
                             :init-data="zoneOptions.initData"
                             :local-data="zoneOptions.localData"
                             :placeholder="zoneOptions.placeholder"
                             :evt-selected="zoneOptions.evtSelected"></vue-select2>
              </div>
            </div>
            <div class="form-group">
              <input id="file1" class="file" type="file" name="file">
            </div>
            <div class="form-group" style="display: none">
              <input id="projectId1" name="projectId">
              <input id="classification1" name="classification">
              <input id="rank1" name="rank">
              <input id="refId1" name="refId">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success btn-upload" @click="upLoadFile1()" disabled>确定上传</button>
          <button class="btn btn-info" data-dismiss="modal">关闭</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal -->
  </div>
</template>
<script>
  export default {
    props: {
      info: {
        type: Object,
        required: true
      },
      address: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        pathKey: 'document',
        symTable: {},
        orgTable: {},
        account: {},
        permission: null,
        orgId: null,
        formDataInfo: new FormData(),
        url: null,
        type: null,
        projectOptions: {
          initData: [],
          placeholder: '请选择项目',
          evtSelected: function (event, data) {
            this.projectId = data[0].id;
            let projectInfo = data[0].obj;
            this.$refs.itemSelector.$emit('update', [{id: projectInfo.id, text: projectInfo.name, obj: projectInfo}]);
            this.reportTable.ajax.url(window.mainConfig.url.getProjectReportTemplate(this.projectId)).load();
//            this.loading = true;
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getProjectPage_U(this.account.id);
          }.bind(this),
        },
        zoneOptions: {
          initData: [],
          placeholder: '报表类型',
          evtSelected: function (evt, data) {
            if (data && data[0]) {
              $('#classification1').val(data[0].id);
            }
          }.bind(this),
          localData: [{id: 3, text: '日报表'}, /* {id: 2, text: '月报表'}, {id: 3, text: '年报表'}*/]
        },
      };
    },
    mounted () {
      const self = this;
      this.account = window.session.getObj(window.sessionKeys.ACCOUNT);
      this.permission = this.account.permissionType;
      this.orgId = this.account.organizationId;
      this.initSymFileTable();
      this.initOrgFileTable(this.orgId);
      if (this.account.roleId !== '0') {
        $('#reportExclu').hide();
      }
      this.initProject(this.account.id);
      this.downloadFile();
      this.deleteInfo();
      this.initFileinput();
      $('#myModal').on('hidden.bs.modal', function () {
        self.modalClose();
      });
      $('#myModal1').on('hidden.bs.modal', function () {
        self.modalClose();
      });
    },
    methods: {
      initSymFileTable () {
        let self = this;
        this.symTable = $('#system').DataTable({
          scrollX: true,
          scrollY: '50%',
          bScrollCollapse: true,
          showCheckbox: true,
          processing: true,
//          serverSide: true,
          searching: false,
          ordering: false,
          deferRender: true,
          ajax: {
            url: window.mainConfig.url.getSystemFileList(),
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
          language: this.$store.state.dataTable.language,
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return '<a href="#" class="btn btn-success aDownload"><i class="iconfont icon-xiazai"></i></a>';
              },
              targets: 3
            },
            {
              render: function (data, type, row) {
                return '<button type="button" class="btn btn-danger"><i class="iconfont icon-shanchu"></i></button>';
              },
              targets: 4
            },
          ],
          data: null,
          columns: [
            {
              data: 'name'
            },
            {
              data: 'fileExtensions'
            },
            {
              data: 'uploadTime'
            },
            {
              data: null
            },
            {
              data: null,
              visible: (self.permission & parseInt(0, 2)) === self.permission
            }
          ]
        });
      },
      initOrgFileTable(orgId){
        this.orgTable = $('#organization').DataTable({
          scrollX: true,
          scrollY: '50%',
          bScrollCollapse: true,
          showCheckbox: true,
          processing: true,
//          serverSide: true,
          searching: false,
          ordering: false,
          deferRender: true,
          ajax: {
            url: window.mainConfig.url.getOrganizationFileList(orgId),
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
          language: this.$store.state.dataTable.language,
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return '<a href="#" class="btn btn-success aDownload"><i class="iconfont icon-xiazai"></i></a>';
              },
              targets: 3
            },
            {
              render: function (data, type, row) {
                return '<button type="button" class="btn btn-danger"><i class="iconfont icon-shanchu"></i></button>';
              },
              targets: 4
            },
//            {
//              render: function (data, type, row) {
//                return '<div class="table-cell-btn-wrapper"><div class="table-cell-btn-wrapper2">' +
//                  '<div class="table-cell-btn-wrapper3">' +
//                  '<a  href="#"  class="btn btn-success btn-table-cell aDownload">下载</a>' +
//                  '</div>' +
//                  '<div class="table-cell-btn-wrapper3">' +
//                  '<button type="button" class="btn btn-warning btn-table-cell">删除</button>' +
//                  '</div></div></div>';
//              },
//              targets: 3
//            }
          ],
          data: null,
          columns: [
            {
              data: 'name'
            },
            {
              data: 'fileExtensions'
            },
            {
              data: 'uploadTime'
            },
            {
              data: null
            }
          ]
        });
      },
      initReportTable(projectId){
        this.reportTable = $('#report').DataTable({
          scrollX: true,
          scrollY: '50%',
          bScrollCollapse: true,
          showCheckbox: true,
          processing: true,
//          serverSide: true,
          searching: false,
          ordering: false,
          deferRender: true,
          ajax: {
            url: window.mainConfig.url.getProjectReportTemplate(projectId),
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
          language: this.$store.state.dataTable.language,
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return '<a href="#" class="btn btn-success aDownload"><i class="iconfont icon-xiazai"></i></a>';
              },
              targets: 3
            },
            {
              render: function (data, type, row) {
                return '<button type="button" class="btn btn-danger"><i class="iconfont icon-shanchu"></i></button>';
              },
              targets: 4
            },
//            {
//              render: function (data, type, row) {
//                return '<div class="table-cell-btn-wrapper"><div class="table-cell-btn-wrapper2">' +
//                  '<div class="table-cell-btn-wrapper3">' +
//                  '<a  href="#"  class="btn btn-success btn-table-cell aDownload">下载</a>' +
//                  '</div>' +
//                  '<div class="table-cell-btn-wrapper3">' +
//                  '<button type="button" class="btn btn-warning btn-table-cell">删除</button>' +
//                  '</div></div></div>';
//              },
//              targets: 3
//            }
          ],
          data: null,
          columns: [
            {
              data: 'name'
            },
            {
              data: 'fileExtensions'
            },
            {
              data: 'uploadTime'
            },
            {
              data: null
            }
          ]
        });
      },
      showModal(type){
        this.type = type;
        $('#myModal').modal('toggle');
        $('#myModal #myModalLabel').text(parseInt(type) === 1 ? '系统文件上传' : '机构文件上传');
      },
      upLoadFile () {
        const self = this;
        this.initUploadForm();
        this.formDataInfo = new FormData($("#uploadForm")[0]);
        if (this.formDataInfo) {
          let api = this.type === 1 ?
              window.mainConfig.http.uploadSystemFile(this.formDataInfo) :
              window.mainConfig.http.uploadOrganizationFile(this.formDataInfo, this.orgId);
          let table = this.type === 1 ? self.symTable : self.orgTable;
          api.then((response) => {
                toastr.info("上传成功！");
                $('#myModal').modal('toggle');
                $('#file').fileinput('clear');
                table.ajax.reload();
              },
              (response) => {
                console.log(response);
                toastr.error("上传失败！请重新上传！")
              })
        }
      },

      details(){
        const self = this;
        $('#system tbody').on('click', 'tr', function (p) {
          if (p.target.textContent === '查看') {
            self.$router.push({path: '/document/details'});
          }
        });
      },
      downloadFile(){
        const self = this;
        $('#system tbody').on('click', 'td:nth-child(4)', function (p) {
          let data = self.symTable.row(this).data();
          let url = window.mainConfig.url.downloadFiles(data.id, data.name, data.refId, data.fileExtensions,
              self.enumRank(data.fileRank), self.enumClassification(data.fileClassification));
//          console.log(url);
          $('.aDownload').attr("href", url);
        });
        $('#organization tbody').on('click', 'td:nth-child(4)', function (p) {
          let data = self.orgTable.row(this).data();
          let url = window.mainConfig.url.downloadFiles(data.id, data.name, data.refId, data.fileExtensions,
              self.enumRank(data.fileRank), self.enumClassification(data.fileClassification));
          $('.aDownload').attr("href", url);
        });
      },
      deleteInfo () {
        const self = this;
        $('#system tbody').on('click', 'td:nth-child(5)', function (p) {
          let info = self.symTable.rows(this).data()[0];
          layer.open({
            icon: 3,
            title: '<h4 style="color: #4898d5;font-weight: bold">删除文件</h4>',
            content: '<div style="color: #c39e00;font-size: 1.1em;">您确定删除此系统文件吗?</div>',
            btn: ['确定', '取消'],
            yes: function (index, layero) {
              window.mainConfig.http.fileInfoDelete(info).then((response) => {
                self.symTable.ajax.reload();
                toastr.success('已删除');
              }, (response) => {
                toastr.error('通信失败');
              });
              layer.close(index);
            },
            btn1: function (index, layero) {
              layer.close(index);
            },
          });
        });
        $('#organization tbody').on('click', 'td:nth-child(5)', function (p) {
          let info = self.orgTable.rows(this).data()[0];
          layer.open({
            icon: 3,
            title: '<h4 style="color: #4898d5;font-weight: bold">删除文件</h4>',
            content: '<div style="color: #c39e00;font-size: 1.1em;">您确定删除此机构文件吗?</div>',
            btn: ['确定', '取消'],
            yes: function (index, layero) {
              window.mainConfig.http.fileInfoDelete(info).then((response) => {
                self.orgTable.ajax.reload();
                toastr.success('已删除');
              }, (response) => {
                toastr.error('通信失败');
              });
              layer.close(index);
            },
            btn1: function (index, layero) {
              layer.close(index);
            },
          });
        })
      },
      modalClose(){
        this.$dispatch('close');
      },
      initUploadForm(){
        $('#projectId').val(null);
        $('#classification').val('monitorScheme');
        $('#rank').val('SYSTEM');
        $('#refId').val(null);
      },
      initUploadReportForm(){
        $('#projectId1').val(this.projectId);
        $('#classification1').val('3');
        $('#rank1').val('PROJECT');
        $('#refId1').val(this.projectId);
      },
      initFileinput(){
        //初始化fileinput控件
        $('#file').fileinput({
          language: 'zh', //设置语言
          maxFileCount: 1,
          enctype: 'multipart/form-data',
          textEncoding: 'UTF-8',
          showUpload: false, //是否显示上传按钮
          showCaption: false,//是否显示标题
          browseClass: "btn btn-info", //按钮样式
          previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
//                allowedFileExtensions : ['doc', 'txt','pdf'],//接收的文件后缀,
        });
        $("#file").on('change', function (e) {
          $('.btn-upload').removeAttr('disabled');
        });
        $('#file').on('fileclear', function (e) {
          $('.btn-upload').attr('disabled', true);
        });
        $('#file1').fileinput({
          language: 'zh', //设置语言
          maxFileCount: 1,
          enctype: 'multipart/form-data',
          textEncoding: 'UTF-8',
          showUpload: false, //是否显示上传按钮
          showCaption: false,//是否显示标题
          browseClass: "btn btn-info", //按钮样式
          previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
//                allowedFileExtensions : ['doc', 'txt','pdf'],//接收的文件后缀,
        });
        $("#file1").on('change', function (e) {
          $('.btn-upload').removeAttr('disabled');
        });
        $('#file1').on('fileclear', function (e) {
          $('.btn-upload').attr('disabled', true);
        });
      },
      enumRank(type){
        switch (type) {
          case 'SYSTEM':
            return 0;
          case 'PROJECT':
            return 1;
          case 'MONITOR_ITEM':
            return 2;
          case 'MONITOR_POINT':
            return 3;
          case 'DEVICE_SENSOR':
            return 4;
          case 'ORGANIZATION':
            return 5;
          case 'IMC_PROJECT':
            return 6;
        }
      },
      enumClassification(type){
        switch (type) {
          case 'MONITOR_SCHEME':
            return 0;
          case 'PROJECT_MAP':
            return 1;
          case 'CHECK_MAP':
            return 2;
          case 'REPORT_FORMS':
            return 3;
          case 'BATCH_CONFIG':
            return 4;
          case 'TECHNICAL_DOC':
            return 5;
        }
      },
      upLoader(){
        $('#myModal1').modal('toggle');
      },
      initProject(accountId){
        window.mainConfig.http.getProjectPage_R(accountId).then((response) => {
          let projectInfo = response.data[0];
          if (projectInfo && projectInfo.id) {
            this.projectId = projectInfo.id;
            this.$refs.itemSelector.$emit('update', [{id: projectInfo.id, text: projectInfo.name, obj: projectInfo}]);
            this.loading = true;
            this.initReportTable(this.projectId);
          }
        }, (response) => {
          console.log(response);
        })
      },
      upLoadFile1(){
        this.initUploadReportForm();
        let formDataInfo = new FormData($("#uploadReportForm")[0]);
        console.log(formDataInfo);
        window.mainConfig.http.uploadProjectReportTemplate(this.projectId, 3, formDataInfo).then((response) => {
          toastr.info('上传成功!');
          $('#myModal1').modal('toggle');
          $('#file1').fileinput('clear');
          this.reportTable.ajax.reload();
        }, (response) => {
          toastr.error('上传失败!');
          toastr.error(response.data);
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .box-header {
    text-align: center;
  }

  .box-header .box-title {
    color: #3399ee;
    font: normal 600 1.5em Microsoft YaHei, Helvitica, Verdana, Arial, san-serif caption;
  }

  .modal-title {
    text-align: center;
    color: #3399ee;
    font: normal 600 1.4em Helvitica, Verdana, Arial, san-serif caption;
  }

  .modal .modal-body .form-group label {
    font-size: 1.1em;
    color: rgba(51, 153, 238, 0.8);
  }

  hr {
    width: 95%;
    height: 3px;
    background-color: rgba(51, 153, 238, 0.7);
    margin-top: 2.5em;
    margin-bottom: 2.5em;
  }

  .box.box-solid > .box-header .btn:hover {
    background: #ffffff;
    color: #00acd6;
    font-weight: 800;
    text-shadow: none;
    border: 1px solid #00acd6;
  }

  .select2-bootstrap-prepend {

  }
</style>
