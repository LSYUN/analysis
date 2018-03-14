<template>
  <section class="content content-overflow">
    <button id="test" type="button">test</button>
    <div class="box">
      <div class="box-header">
        <h3 class="box-title">工程信息</h3>
        <span class="table-title-span">
            <button type="button" @click="add()" class="btn table-title-button" title="添加工程">
              <i class="iconfont icon-add"></i>
            </button>
          </span>
      </div>
      <div class="box-body">
        <table cellpadding="0" cellspacing="0" border="0" class="display much-column table pointer max-width"
               id="example" width="100%">
          <thead>
          <tr>
            <th class="text-center" rowspan="2">工程名称</th>
            <th class="text-center" rowspan="2">工程地址</th>
            <th class="text-center" rowspan="2">工程类别</th>
            <th class="text-center" rowspan="2">所属单位</th>
            <th class="text-center" rowspan="2">工程状态</th>
            <th class="text-center" rowspan="2">备注</th>
            <th class="text-center" colspan="3">操作</th>
          </tr>
          <tr>
            <th class="secondHead">详细</th>
            <th class="secondHead">编辑</th>
            <th class="secondHead">删除</th>
          </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script>
  import GlobalEnum from '../../../managers/enum/global-enum';
  import * as tableConfig from "../../../managers/configs/dataTable.js"
  export default {
    data () {
      return {
        pathKey: 'projectList',
        table: {},
        account: null,
        projectTypes: GlobalEnum.projectTypes,
        workStates: GlobalEnum.workStates,
        organizationList: [],
      };
    },
    mounted () {
      let account = window.session.getObj(window.sessionKeys.ACCOUNT);
      if (account) {
        this.account = account.id;
        this.initTable(this.account);
        this.modify();
        this.delete();
        this.edit();
        this.organizationList = window.session.getObj(window.sessionKeys.ORGANIZATIONS);
        if (this.organizationList === null || !this.organizationList) {
          this.$router.push({path: '/login'});
        }
      } else {
        this.$router.push({path: '/login'});
      }
    },
    methods: {
      initTable (account) {
        this.table = $('#example').DataTable({
          scrollX: true,
          showCheckbox: true,
          processing: true,
          searching: true,
          ordering: false,
          deferRender: true,
          iDisplayLength: 10,
          lengthMenu: [[10, 15, 25, 50], [10, 15, 25, 50]],
          ajax: {
            url: window.mainConfig.url.getProjectPage_U(account),
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
          select: {style: 'os', selector: 'td:not(:nth-child(7),:nth-child(8),:nth-child(9))'},
          language: tableConfig.LANGUAGE,
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                return `<span style="font-size:0.75em" >${data}</span>`
              }.bind(this),
              targets: 1
            },
            {
              render: function (data, type, row) {
                const view = _.find(this.projectTypes, function (type) {
                  return type.value === data;
                });
                if (!view || !view.text) {
                  return '';
                }
                return view.text;
              }.bind(this),
              targets: 2
            },
            {
              render: function (data, type, row) {
                const view = _.find(this.organizationList, function (type) {
                  return type.id === data;
                });
                if (!view || !view.name) {
                  return '';
                }
                return view.name;
              }.bind(this),
              targets: 3
            },
            {
              render: function (data, type, row) {
                const view = _.find(this.workStates, function (type) {
                  return type.value === data;
                });
                if (!view || !view.text) {
                  return '';
                }
                return view.text;
              }.bind(this),
              targets: 4
            },
            {
              render: function (data, type, row, meta) {
                return '<button type="button" class="btn btn-info"><i class="iconfont icon-xiangxi"></i></button>';
              },
              targets: 6
            },
            {
              render: function (data, type, row, meta) {
                return '<button type="button" class="btn btn-success"><i class="iconfont icon-xiugai1"></i></button>';
              },
              targets: 7
            },
            {
              render: function (data, type, row, meta) {
                return '<button type="button" class="btn btn-danger"><i class="iconfont icon-shanchu"></i></button>';
              },
              targets: 8
            }
          ],
          data: null,
          columns: [

            {
              data: 'name'
            },
            {
              data: 'address'
            },
            {
              data: 'type'
            },
            {
              data: 'organizationId'
            },
            {
              data: 'workState'
            },
            {
              data: 'remark'
            },
            {
              data: null
            },
            {
              data: null
            },
            {
              data: null
            },
          ]
        });
      },
      add () {
        let info = {};
        this.$store.commit('update', info);
        this.$router.push({path: '/project/info/add'});
      },
      modify(){
        const _this = this;
        $('#example tbody').on('click', 'td:nth-child(7)', function (p) {
          _this.$store.commit('update', _this.table.row(this).data());
          _this.$router.push({path: '/project/info/modify'});
        });
      },
      edit(){
        const _this = this;
        $('#example tbody').on('click', 'td:nth-child(8)', function (p) {
          let info = _this.table.row(this).data();
          window.session.setObj(window.sessionKeys.PROJECT, info);
          _this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
          _this.$router.push({path: '/project/edit/itemList'});
        });
      },
      delete () {
        const _this = this;
        $('#example tbody').on('click', 'td:nth-child(9)', function (p) {
          const oneId = _.map(_this.table.rows(this).data(), (p) => p.id);
          layer.open({
            icon: 3,
            title: '<h4 style="color: #4898d5;font-weight: bold">删除项目</h4>',
            content: '<div style="color: #c39e00;font-size: 1.1em;">您确定删除此项目吗?</div>',
            btn: ['确定', '取消'],
            yes: function (index, layero) {
              window.mainConfig.http.projectDelete(JSON.stringify(oneId)).then((response) => {
                _this.table.ajax.reload();
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
    },
  };
</script>
<style lang="scss" scoped>
  /*.box {*/
  /*padding: 0;*/
  /*border: 0;*/
  /*-webkit-box-shadow: 0 2px 3px hsla(0, 0%, 4%, .1), 0 0 0 1px hsla(0, 0%, 4%, .1);*/
  /*-moz-box-shadow: 0 2px 3px hsla(0, 0%, 4%, .1), 0 0 0 1px hsla(0, 0%, 4%, .1);*/
  /*box-shadow: 0 2px 3px hsla(0, 0%, 4%, .1), 0 0 0 1px hsla(0, 0%, 4%, .1);*/
  /*}*/

  /*.box-header {*/
  /*text-align: center;*/
  /*font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;*/
  /*padding-top: 15px;*/
  /*}*/

  /*.box-header h3 {*/
  /*font-weight: bolder;*/
  /*transform: translateX(50%);*/
  /*}*/

  /*.box-header span button {*/
  /*float: right;*/
  /*}*/

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
