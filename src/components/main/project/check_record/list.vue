<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <navigation-path :path-key="pathKey"></navigation-path>
    </section>
    <!--<section class="content content-overflow">-->
      <!--<div class="box box-solid">-->
    <div class="padding-default">
      <div class="box box-solid">
        <div class="box-header">
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
      <!--</div>-->
      <div class="box box-solid">
      <div class="box-header">
        <h3 class="box-title">巡查记录登记</h3>
        <span class="table-title-span">
            <button type="button" @click="addInfo()" class="btn table-title-button">
              <i class="iconfont icon-add"></i> 新增
            </button>
        </span>
      </div>
      <div class="box-body">
        <table cellpadding="0" cellspacing="0" border="0" class="display muchColumn table" id="example" width="100%">
          <thead>
          <tr>
            <th class="text-center" rowspan="2"></th>
            <th class="text-center" rowspan="2">项目名称</th>
            <th class="text-center" rowspan="2">巡检员</th>
            <th class="text-center" rowspan="2">巡检记录</th>
            <th class="text-center" rowspan="2">巡检时间</th>
            <th class="text-center" rowspan="2">项目进度</th>
            <th class="text-center" rowspan="2">天气</th>
            <th class="text-center" colspan="2" style="width: 180px;">操作</th>
          </tr>
          <tr>
            <th class="secondHead">修改</th>
            <th class="secondHead">删除</th>
          </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    <!--</section>-->
  </div>
    </div>
  </div>
  <!--<img src='' id="img">-->
</template>
<script>
  export default {
    props: {
      info: {
        type: Object,
        required: true
      },
//      project: {
//        type: Object,
//        required: true
//      }
    },
    data () {
      return {
        pathKey: 'checkRecordList',
        table: {},
        accountId: null,
        permission: null,
        allProjects: [],
        theProject: {},
        weathers: [
          {value: 0, text: '晴'},
          {value: 1, text: '多云'},
          {value: 2, text: '阴'},
          {value: 6, text: '阵雨'},
          {value: 3, text: '小雨'},
          {value: 4, text: '中雨'},
          {value: 5, text: '大雨'}],
        projectOptions:{
          initData: [],
          placeholder:'请选择工程',
          evtSelected: function (event, data) {
            this.projectId = data[0].id;
            this.table.ajax.url(window.appContext.urls.getCheckRecordPage(this.projectId)).load();
//            this.loading = true;
          }.bind(this),
          ajaxUrl: function () {
            return window.appContext.urls.getProjectPage_U(this.accountId);
          }.bind(this)
        },
      };
    },
    components: {
      'navigation-path': require('../utility/navigation-path.vue'),
      'vue-select2': require('../utility/vue-select2.vue'),
    },
    mounted () {
      this.accountId = window.sessionUtility.getObj(window.sessionKeys.ACCOUNT).id;
      this.permission = window.sessionUtility.getObj(window.sessionKeys.PERMISSION);
//      this.projectId = window.sessionUtility.getObj(window.sessionKeys.PROJECT).id;
      this.getAllProjects(this.accountId);
      this.modifyInfo();
      this.deleteInfo();
      this.initTableDetail();
//      this.checkRecordSelected();
    },
    methods: {
      getAllProjects(accountId){
        window.appContext.http.getProjectPage_R(accountId).then((response) => {
          var data = response.body;
          let projectInfo = response.body[0];
          this.projectId = projectInfo.id;
          this.$refs.itemSelector.$emit('update', [{id: projectInfo.id, text: projectInfo.name, obj: projectInfo}]);
          this.allProjects = data;
//          this.loading = true;
          this.initTable(this.projectId);
        }, (response) => {
          toastr.error('通信失败');
        })
      },
      initTable () {
        var component = this;
        this.table = $('#example').DataTable({
          scrollX: true,
          showCheckbox: true,
          processing: true,
//                    serverSide: true,
          searching: false,
          ordering: true,
          order: [[1, 'asc']],
          deferRender: true,
          ajax: {
            url: window.appContext.urls.getCheckRecordPage(this.projectId),
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
          select: {style: 'single', selector: 'td:not(:nth-child(8),:nth-child(9))'},
          language: this.$store.state.dataTable.language,
          dom: 'frtip',
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
          },
          columnDefs: [
            {
              className: 'control',
              render: function (data, type, row) {
                return '';
              },
              orderable: false,
              targets: 0
            },
            {
              render: function (data, type, row) {
                const view = _.find(this.allProjects, function (type) {
                  return type.id === data;
                });
                component.theProject = view;
                if (!view || !view.name) {
                  return '';
                }
                return view.name;
              }.bind(this),
              targets: 1
            },
            {
              render: function (data, type, row) {
                const view = data.substring(0, 10);
                if (!view) {
                  return '';
                }
                return view;
              }.bind(this),
              targets: 4
            },
            {
              render: function (data, type, row) {
                const view = _.find(this.weathers, function (type) {
                  return type.value === data;
                });
                if (!view || !view.text) {
                  return '';
                }
                return view.text;

              }.bind(this),
              targets: 6
            },
            {
              render: function (data, type, row) {
                return '<button type="button" class="btn btn-info"><i class="iconfont icon-xiangxi"></i></button>';
              },
              targets: 7
            },
            {
              render: function (data, type, row) {
                return '<button type="button" class="btn btn-danger"><i class="iconfont icon-shanchu"></i></button>';
              },
              targets: 8
            },
          ],
          data: null,
          columns: [
            {
              className: 'details-control',
              orderable: false,
              data: null,
              defaultContent: ''
            },
            {
              data: 'projectId'
            },
            {
              data: 'personName'
            },
            {
              data: 'content'
            },
            {
              data: 'recordDate'
            },
            {
              data: 'schedule'
            },
            {
              data: 'weather'
            },
            {
              data: null
            }
          ]
        });
      },
      addInfo () {
        this.info = {};
        this.$route.router.go({path: '/project/checkRecordInfo/add'});
      },
      modifyInfo(){
        const component = this;
        $('#example tbody').on('click', 'td:nth-child(8)', function (p) {
          component.info = component.table.row(this).data();
          component.info.project = component.theProject;
          component.$route.router.go({path: '/project/checkRecordInfo/modify'});
        });
      },
      deleteInfo () {
        const component = this;
        $('#example tbody').on('click', 'td:nth-child(9)', function (p) {
          const oneId = _.map(component.table.rows(this).data(), (p) => p.id);
          layer.open({
            icon: 3,
            title: '<h4 style="color: #4898d5;font-weight: bold">删除巡检记录</h4>',
            content: '<div style="color: #c39e00;font-size: 1.1em;">您确定删除此巡检记录吗?</div>',
            btn: ['确定', '取消'],
            yes: function (index, layero) {
              window.appContext.http.CheckRecordDelete(JSON.stringify(oneId)).then((response) => {
                component.table.ajax.reload();
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
      initTableDetail () {
        const component = this;
        $('#example tbody').on('click', 'td.details-control', function () {
          const tr = $(this).closest('tr');
          const row = component.table.row(tr);
          if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
          } else {
            row.child(component.tableDetail(row.data())).show();
            tr.addClass('shown');
          }
        });
      },
      tableDetail (data) {
        let imgUrl = window.appContext.urls.getCheckRecordPicture(data.id);
        return '<div class="pin">' +
          '<div class="col-xs-1"><p>图片详情:</p></div>' +
          '<div class="box col-xs-10">' +
          '<img src="' +
          imgUrl +
          '"' +
          '>' +
          '</div>'
      },
    }
  };
</script>
<style lang="scss" scoped>
  .box-footer .btn {
    margin-bottom: 10px;
  }
</style>
