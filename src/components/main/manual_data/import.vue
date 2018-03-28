<template>
    <section class="content content-overflow">
      <div class="box box-solid">
        <div class="box-header">
          <h3 class="box-title no-btn-title">人工数据导入</h3>
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
                <label class="input-group-addon addon-label" for="monitorItem">&nbsp&nbsp监测项:&nbsp</label>
                <vue-select2 :ajax=true :paging=false :multiple=false v-ref:item-slt id="monitorItem"
                             :ajax-url="monitorItems.ajaxUrl"
                             :init-data="monitorItems.initData"
                             :placeholder="monitorItems.placeholder"
                             :evt-selected="monitorItems.evtSelected"></vue-select2>
              </div>
            </div>
            <div class="col-sm-12 div-margin-bottom">

              <div class="box box-info box-solid">
                <div class="box-body">
                  <form role="form" novalidate enctype="multipart/form-data" id="uploadForm" method="post"
                        name="uploadForm">
                    <div class="form-group">
                      <div class="file-wrapper">
                        <label class="input-group-addon">人工数据导入</label>
                        <input accept=".xls,.xlsx" id="file" class="file form-control" type="file" name="file"
                               onchange="checkFile(this)">
                      </div>
                      <input id="imcId" name="imcId" style="display: none">
                      <input id="projectId" name="projectId" style="display: none">
                      <input id="projectName" name="projectName" style="display: none">
                    </div>
                  </form>
                </div>
                <div class="box-footer">
                  <div class="btn-footer-wrapper">
                    <button type="button" @click="upLoadFile()" class="btn btn-success"><i
                      class="iconfont icon-confirm"></i>确定
                    </button>
                    <button type="button" @click="cancel()" class="btn btn-info"><i
                      class="iconfont icon-cancel"></i>取消
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import  '../../../../assets/css/pre-file-input.scss';
  export default {
    props: {
      info: {
        type: Object,
        required: true
      },
    },
    data () {
      return {
        pathKey: 'manualDataImport',
        table: {},
        account: null,
        projectId: null,
        monitorItemId: null,
        projectOptions: {
          initData: [],
          placeholder: '工程选择',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.projectId = data[0].id;
              this.$refs.itemSlt.clear(true);      //清空监测项
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getProjectPage_U(this.accountId);
          }.bind(this)
        },
        monitorItems: {
          initData: [],
          placeholder: '监测项选择',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.monitorItemId = data[0].id;

            }
          }.bind(this),
          ajaxUrl: function () {
//            return window.mainConfig.url.getMonitorItemPage(this.projectId);
            return window.mainConfig.url.uploadDataByHand(this.projectId);
          }.bind(this)
        },
      };
    },
    mounted () {
      this.accountId = window.session.getObj(window.sessionKeys.ACCOUNT).id;
      this.initFileInput();
      const self = this;
      window.checkFile = function (obj) {
        self.checkFile(obj);
      };
    },
    methods: {
      initFileInput() {
        //初始化fileinput控件
        $('#file').fileinput({
          maxFileCount: 1,
          enctype: 'multipart/form-data',
          textEncoding: 'UTF-8',
          showUpload: false, //是否显示上传按钮
          showCaption: false,//是否显示标题
          browseClass: "btn btn-size", //按钮样式
          previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
//                allowedFileExtensions : ['doc', 'txt','pdf'],//接收的文件后缀,
        });
      },
      checkFile(obj){
        if (!obj) return;
        let photoExt = obj.value.substr(obj.value.lastIndexOf(".")).toLowerCase();//获得文件后缀名
        if (photoExt !== '.xls' && photoExt !== '.xlsx') {
          obj.value = null;
          toastr.error("上传文件格式为.xls或者.xlsx!");
          return false;
        }
        let fileSize = 0;
        let isIE = /msie/i.test(navigator.userAgent) && !window.opera;
        if (isIE && !obj.files) {
          let filePath = obj.value;
          let fileSystem = new ActiveXObject("Scripting.FileSystemObject");
          let file = fileSystem.GetFile(filePath);
          fileSize = file.Size;
        } else {
          fileSize = obj.files[0].size;
        }
//        console.log(fileSize);
        if (fileSize >= 5 * 1024 * 1024 * 1024) {//
          obj.value = null;
          toastr.error("文件最大为5MB，请选择文件!");
          return false;
        }
      },
      upLoadFile() {
        $('#projectId').val(this.projectId);
        this.formDataInfo = new FormData($("#uploadForm")[0]);
        let opacity = '<div style="width:100%;height: 100%;" class="opacity-wrapper">' +
          '<div style="width: inherit;height: inherit;z-index: 10;opacity: 0.7;background-color: #787878;position: absolute;top: 0;"></div>' +
          '<img src="../../../static/image/ellipsis2.gif" style="z-index: 11;position: absolute;top:50%;left: 50%;margin-top: -100px ;"/></div>';
        $('.section-wrapper').append(opacity);
          window.mainConfig.http.uploadByHand(this.formDataInfo,this.projectId,this.monitorItemId).then((response) => {
                $('.opacity-wrapper').remove();
                if (response.data.MESSAGE==='success') {
                  toastr.success('上传成功!');
                }else{
                  toastr.warning(response.data.MESSAGE);
                }
              },
              (response) => {
                $('.opacity-wrapper').remove();
                toastr.error("上传失败！请重新上传！")
              })
      },
    },
  };
</script>
<style lang="scss" scoped>
  .content {
    padding: 0;
    background-color: #ffffff;
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 10px;
    height: 50%;
  }

  .content .box-solid {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .content .row {
    margin-right: 0;
    margin-left: 0;
  }

  .div-margin-bottom {
    margin-bottom: 13px;
  }

  @media screen and(max-width: 768px) {
    #app .modal .modal-dialog {
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
    }
  }
</style>
