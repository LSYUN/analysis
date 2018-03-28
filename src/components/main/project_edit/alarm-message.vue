<template>
  <div class="box box-warning">
   <!-- <div class="loading" v-if="relList.length===0"><img src="../../../static/image/spinner_B.gif"></div>-->
    <div class="box-body" v-if="relList.length>=0">
      <div class="col-sm-12">
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon">项目名称:</span>
            <input type="text" class="form-control" v-model="projectName" placeholder="项目名称" readonly>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon">通知人员:</span>
            <vue-select2 :ajax=true :paging=false :multiple=true v-ref:first-selector
                         :ajax-url="accountList.ajaxUrl"
                         :init-data="accountList.initData"
                         :placeholder="accountList.placeholder"
                         :evt-selected="accountList.evtSelected"></vue-select2>
          </div>
        </div>
      </div>
    </div>
    <div class="box-footer" v-if="relList.length>0">
      <div class="col-sm-offset-5 col-sm-4">
        <button type="button" class="btn btn-success btn-md" @click="confirm()">确认设置</button>
      </div>
    </div>
  </div>
</template>
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
        account: {},
        projectId: null,
        projectName: null,
        relList: [],
        accountList: {
          initData: [],
          placeholder: '请选择人员',
          ajaxUrl: function () {
            return window.mainConfig.url.getAccountOfOrganizationPage(this.account.id);
          }.bind(this),
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.relList = _.map(data, (ids) => ids.id);
            }else{
              this.relList=[];
            }
          }.bind(this)
        },
      };
    },
    mounted () {
      this.account = window.session.getObj(window.sessionKeys.ACCOUNT);
      let project = window.session.getObj(window.sessionKeys.PROJECT);
      this.projectId = project.id;
      this.projectName = project.name;
      this.getRelAlarmAccount(this.projectId, 1);
    },
    methods: {
      getRelAlarmAccount(projectId, relType){
        window.mainConfig.http.getRelAlarmAccountList(projectId, relType).then((response) => {
          let data = response.data[4];
          this.relList = _.map(data, (ids) => ids.id);     //relList 消息人员 confirm中用
          for (let i in data) {
            this.accountList.initData.push({id: data[i].id, text: data[i].name, obj: data[i]});
            this.$refs.firstSelector.$emit('update', [{id:data[i].id, text: data[i].name, obj: data[i]}]);
          }
        }, (response) => {
          var div = document.createElement("div");
          div.setAttribute('id','loading');
          var img = document.createElement("img");
          img.src = "../../../static/image/spinner_B.gif";
          $('#loading').append(img);
          console.error(response);
        })
      },
      confirm () {
        let rankList = [];
        rankList.push(this.relList);
        window.mainConfig.http.setRelAlarmAccount(this.projectId, 1, null, null,null, null, rankList).then((response) => {
          toastr.success('设置成功');
        }, (response) => {
          toastr.error('设置失败');
        })
      },
    }
  };
</script>
<style lang="scss" scoped>
  .box.box-warning {
    position: relative;
    width: 100%;
    height: 55vh;
  }

  .loading {
    width: inherit;
    height: inherit;
    text-align: center;
    margin-top: 25%;
  }
  .input-group-addon {
    font-size: 18px;
    color: #1b9bff;
    border: 0;
    font-weight: 700;
    background-color: transparent;
  }

  .box-footer {
    width: inherit;
    position: absolute;
    bottom: 10px;
    display: grid;
  }

  .box-footer > button {
    margin: 0 auto;
  }
  @media screen and (max-width: 768px) {
    .input-group-addon[_v-70126562]{
      font-size: 12px;
    }
    .input-group-addon{
      padding:6px 0;
    }
    .box-footer{
      text-align: center;
    }
  }
</style>

