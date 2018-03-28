<template>
  <div>
    <section class="content content-overflow">
      <h4 class="info-title">{{operation.title}}</h4>
      <div class="box box-solid">
        <validator name="validation">
          <form role="form" novalidate enctype="multipart/form-data" id="uploadForm" method="post" name="uploadForm">
            <div class="box-body">
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label><span class="span-necessary">*</span> 所属项目</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <vue-select2 :ajax=true :multiple="false" :paging="false"
                               :init-data="projectOptions.initData"
                               :ajax-url="projectOptions.ajaxUrl"
                               :placeholder="projectOptions.placeholder"
                               :evt-selected="projectOptions.evtSelected"></vue-select2>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label for="inputName"><span class="span-necessary">*</span> 巡检员:</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <input type="text" class="form-control" v-model="info.personName" name="personName"
                         v-validate:login-name="['required']" id="inputName" placeholder="请设置巡检员">
                  <div class="errors vue-error-bottom">
                    <p v-if="$validation.loginName.dirty && $validation.loginName.required">
                      请设置巡检员</p>
                  </div>
                </div>
              </div>

              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label><span class="span-necessary">&nbsp&nbsp</span> 天气</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <select class="form-control" v-model="info.weather" name="weather">
                    <option value="" v-bind:selected="!info.weather" disabled>请选择天气</option>
                    <option v-for="option in weathers" :value="option.value"
                            :selected="option.value == weather ? true : false">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label for="projectSchedule"><span class="span-necessary">*</span> 工程进度:</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <input type="text" class="form-control" v-model="info.schedule" name="schedule"
                         v-validate:project-schedule="['required']" id="projectSchedule" placeholder="请设置工程进度">
                  <div class="errors vue-error-bottom">
                    <p v-if="$validation.projectSchedule.dirty && $validation.projectSchedule.required">请设置工程进度</p>
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label for="recordContent"><span class="span-necessary">*</span> 巡检记录:</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <textarea type="text" class="form-control" v-model="info.content" name="content" style="height: 10vh"
                            v-validate:record-content="['required']" id="recordContent" placeholder="请设置巡检记录"></textarea>
                  <div class="errors vue-error-bottom">
                    <p v-if="$validation.recordContent.dirty && $validation.recordContent.required"> 请设置巡检记录</p>
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-4 col-sm-2 col-lg-1">
                  <label>上传巡检图片</label>
                </div>
                <div class="col-xs-8 col-sm-10 col-lg-11">
                  <!--<textarea v-model=""></textarea>-->
                  <input accept="image/*" id="file" type="file" name="file">
                </div>
              </div>
            </div>
            <div>
              <input name="id" v-model="info.id" style="display: none">
              <input name="projectId" v-model="info.projectId" style="display: none">
            </div>
            <div class="box-footer">
              <div class="btn-footer-wrapper">
                <button type="button" @click="confirm()" class="btn btn-info">确定</button>
                <button type="button" @click="cancel()" class="btn btn-info">取消</button>
              </div>
            </div>
          </form>
        </validator>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    props: {
      info: {
        type: Object,
        required: true
      },
    },
    data () {
      return {
//        formDataInfo: new FormData(),
        formDataInfo: [],
        account: null,
        operations: {
          add: {
            title: '新增巡检记录',
            pathKey: 'checkRecordAdd',
            path: 'add',
            confirm: function (info) {
//              console.log(info);
              const component = this;
//                            // 检查文件大小,前端拦截
//                            var oFile=document.getElementById("file").files;
//                            if (oFile[0].size > 2500*1024) {
//                                toastr.info('图片太大!');
//                                return;
//                            }
              component.formDataInfo = new FormData($("#uploadForm")[0]);
//              console.log(component.formDataInfo.entries);
//                            let reDate =component.formDataInfo.entries[3];
//                            console.log(reDate[1]);
//                            component.formDataInfo.entries[3]=["recordDate",component.getDate(reDate[1])]
              window.mainConfig.http.checkRecordAdd( component.formDataInfo).then((response) => {
                toastr.info('添加成功!');
                this.$router.push({path: '/project/checkRecord'});
              }, (response) => {
                toastr.error(response.data);
              });
            }.bind(this)
          },
          modify: {
            title: '修改巡检记录',
            pathKey: 'checkRecordModify',
            path: 'modify',
            confirm: function (info) {
              const component = this;
              component.formDataInfo = new FormData($("#uploadForm")[0]);
              window.mainConfig.http.CheckRecordModify( component.formDataInfo).then((response) => {
                console.log(response);

                this.$router.push({path: '/project/checkRecord'});
                toastr.info('修改成功!');
              }, (response) => {
                toastr.error(response.data);
              });
            }.bind(this)
          }
        },
        weathers: [
          {value: 0, text: '晴'},
          {value: 1, text: '多云'},
          {value: 2, text: '阴'},
          {value: 6, text: '阵雨'},
          {value: 3, text: '小雨'},
          {value: 4, text: '中雨'},
          {value: 5, text: '大雨'}
        ],
        projectOptions: {
          initData: [],
          placeholder: '请选择所属项目',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.info.projectId = data[0].id;
//              document.getElementById("projectId").value = data[0].id;
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getProjectPage_U(this.account);
          }.bind(this)
        },
      };
    },
    computed: {
      operation () {
        var operation = _.find(this.operations, function (p) {
          return p.path === this.$route.params.operation;
        }.bind(this));
        return operation;
      }
    },
    mounted () {
      this.account = window.session.getObj(window.sessionKeys.ACCOUNT).id;
      if (this.info.hasOwnProperty('id') === true) {
        let data = this.info.project;
        this.projectOptions.initData.push({
          id: data.id,
          text: data.name,
          obj: data
        });
        window.mainConfig.http.CheckRecordPicture(this.info.id).then((response) => {
          console.log(response);
        })
      } else {
        this.info.id = uuid.v4();
      }
      //初始化日期控件
//      $('.datepicker').datetimepicker({
//        locale: 'zh-cn',
//        format: 'YYYY-MM-DD HH:mm:ss'
//      });
      //初始化fileinput控件
      $('#file').fileinput({
        language: 'zh', //设置语言
        allowedFileExtensions: ['jpg', 'png', 'gif'],//接收的文件后缀,
        maxFileCount: 1,
        enctype: 'multipart/form-data',
        showUpload: true, //是否显示上传按钮
        showCaption: false,//是否显示标题
        browseClass: "btn btn-primary", //按钮样式
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
      });
    },
    methods: {
      confirm () {
        if (this.$validation.valid === false) {
          toastr.info('格式错误,请填写完整!');
          return;
        }
        this.operation.confirm(this.info);
      },
      cancel(){
        this.$router.push({path: '/project/checkRecord'});
      },

      initProjectOptions(){
        if (this.info.hasOwnProperty('id') === true) {
//          console.log(this.info);
          this.projectOptions.initData.push({
            id: this.project.id,
            text: this.project.name,
            obj: this.project,
          })
        } else {
          this.info.id = uuid.v4();
        }
      }
    }
  };
</script>
<style>
  /*.file {*/
  /*position:absolute;*/
  /*top:20px;*/
  /*right:300px;*/
  /*top:0;*/
  /*right:73px;*/
  /*width:0px;*/
  /*height:30px;*/
  /*filter:alpha(opacity=0);*/
  /*-moz-opacity:0;opacity:0;*/
  /*}*/
.box-footer .btn{
  margin-bottom: 10px;
}
</style>

