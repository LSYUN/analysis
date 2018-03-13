<template>
  <div class="box box-warning">
    <!--  <div class="loading" v-if="relList1.length===0"><img src="../../../static/image/spinner_B.gif"></div>-->
    <div class="box-body" v-if="relList1.length>=0">
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
            <span class="input-group-addon">一级预警通知人员:</span>
            <vue-select2 :ajax=true :paging=false :multiple=true v-ref:first-selector
                         :ajax-url="accountList1.ajaxUrl"
                         :init-data="accountList1.initData"
                         :placeholder="accountList1.placeholder"
                         :evt-selected="accountList1.evtSelected"></vue-select2>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon">二级预警通知人员:</span>
            <vue-select2 :ajax=true :paging=false :multiple=true v-ref:second-selector
                         :ajax-url="accountList2.ajaxUrl"
                         :init-data="accountList2.initData"
                         :placeholder="accountList2.placeholder"
                         :evt-selected="accountList2.evtSelected"></vue-select2>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon">三级预警通知人员:</span>
            <vue-select2 :ajax=true :paging=false :multiple=true v-ref:third-selector
                         :ajax-url="accountList3.ajaxUrl"
                         :init-data="accountList3.initData"
                         :placeholder="accountList3.placeholder"
                         :evt-selected="accountList3.evtSelected"></vue-select2>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon">四级预警通知人员:</span>
            <vue-select2 :ajax=true :paging=false :multiple=true v-ref:four-selector
                         :ajax-url="accountList4.ajaxUrl"
                         :init-data="accountList4.initData"
                         :placeholder="accountList4.placeholder"
                         :evt-selected="accountList4.evtSelected"></vue-select2>
          </div>
        </div>
      </div>
    </div>
    <div class="note-wrapper">
      <label class="note">当只启用三级预警时，四级预警通知人员不需设置!</label>
    </div>
    <div class="box-footer" v-if="relList1.length>=0">
      <button type="button" class="btn btn-success btn-md" @click="confirm()">确认设置</button>
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
        relList1: [],
        relList2: [],
        relList3: [],
        accountList1: {
          initData: [],
          placeholder: '请选择人员',
          ajaxUrl: function () {
            return window.mainConfig.urls.getAccountOfOrganizationPage(this.account.id);
          }.bind(this),
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.relList1 = _.map(data, (ids) => ids.id);
            }else{
              this.relList1 =[];
            }
          }.bind(this)
        },
        accountList2: {
          initData: [],
          placeholder: '请选择人员',
          ajaxUrl: function () {
            return window.mainConfig.urls.getAccountOfOrganizationPage(this.account.id);
          }.bind(this),
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.relList2 = _.map(data, (ids) => ids.id);
            }else{
              this.relList2 =[];
            }
          }.bind(this)
        },
        accountList3: {
          initData: [],
          placeholder: '请选择人员',
          ajaxUrl: function () {
            return window.mainConfig.urls.getAccountOfOrganizationPage(this.account.id);
          }.bind(this),
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.relList3 = _.map(data, (ids) => ids.id);
            }else {
              this.relList3 =[];
            }
          }.bind(this)
        },
        accountList4: {
          initData: [],
          placeholder: '请选择人员',
          ajaxUrl: function () {
            return window.mainConfig.urls.getAccountOfOrganizationPage(this.account.id);
          }.bind(this),
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.relList4 = _.map(data, (ids) => ids.id);
            }else {
              this.relList4 =[];
            }
          }.bind(this)
        },
      };
    },
    attached () {
      let project = window.session.getObj(window.sessionKeys.PROJECT);
      this.account = window.session.getObj(window.sessionKeys.ACCOUNT);
      this.projectId = project.id;
      this.projectName = project.name;
      this.getRelAlarmAccount(this.projectId, 0);
    },
    methods: {
      getRelAlarmAccount(projectId, relType){
        window.mainConfig.http.getRelAlarmAccountList(projectId, relType).then((response) => {
          let data = response.data;
          let list = [];
          list[0] = data[0] ? data[0] : [];
          list[1] = data[1] ? data[1] : [];
          list[2] = data[2] ? data[2] : [];
          list[3] = data[3] ? data[3] : [];
          this.relList1 = _.map(list[0], (ids) => ids.id);  //relList1 一级人员 confirm中用
          this.relList2 = _.map(list[1], (ids) => ids.id);  //relList2 二级人员 confirm中用
          this.relList3 = _.map(list[2], (ids) => ids.id);  //relList3 三级人员 confirm中用
          this.relList4 = _.map(list[3], (ids) => ids.id);  //relList4 四级人员 confirm中用
          for (let i in list[0]) {
            this.accountList1.initData.push({id: list[0][i].id, text: list[0][i].name, obj: list[0][i]});
            this.$refs.firstSelector.$emit('update', [{id: list[0][i].id, text: list[0][i].name, obj: list[0][i]}]);
          }
          for (let i in list[1]) {
            this.accountList2.initData.push({id: list[1][i].id, text: list[1][i].name, obj: list[1][i]});
            this.$refs.secondSelector.$emit('update', [{id: list[1][i].id, text: list[1][i].name, obj: list[1][i]}]);
          }
          for (let i in list[2]) {
            this.accountList3.initData.push({id: list[2][i].id, text: list[2][i].name, obj: list[2][i]});
            this.$refs.thirdSelector.$emit('update', [{id: list[2][i].id, text: list[2][i].name, obj: list[2][i]}]);
          }
          for (let i in list[3]) {
            this.accountList4.initData.push({id: list[3][i].id, text: list[3][i].name, obj: list[3][i]});
            this.$refs.fourSelector.$emit('update', [{id: list[3][i].id, text: list[3][i].name, obj: list[3][i]}]);
          }
        }, (response) => {
          var div = document.createElement("div");
          div.setAttribute('id', 'loading');
          var img = document.createElement("img");
          img.src = "../../../static/image/spinner_B.gif";
          $('#loading').append(img);
          console.error(response);
        })
      },
      confirm () {
        let firstRankList = [], secondRankList = [], thirdRankList = [],fourRankList=[];
        firstRankList.push(this.relList1);
        secondRankList.push(this.relList2);
        thirdRankList.push(this.relList3);
        fourRankList.push(this.relList4);
        window.mainConfig.http.setRelAlarmAccount(this.projectId, 0, firstRankList, secondRankList, thirdRankList, fourRankList,null).then((response) => {
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
    .input-group-addon[_v-08f05d6c] {
      font-size: 12px;
    }
    .input-group-addon {
      padding: 6px 0;
    }
    .box-footer {
      text-align: center;
    }
  }

  .note-wrapper {
    width: inherit;
  }

  .note {
    display: block;
    text-align: center;
    font-size: inherit;
    border: 0;
    border-radius: 5px;
    color: #f39c12;
    background-color: rgba(255, 255, 0, 0.1);
  }
</style>

