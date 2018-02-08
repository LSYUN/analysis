<template>
  <div class="box box-solid">
    <div class="box-header">
      <h3 class="box-title">自定义查询与输出</h3>
      <span class="table-title-span">
      <button type="button" @click="saveInfo()" class="btn table-title-button">
      <i class="iconfont icon-save"></i> 批量保存
      </button>
      </span>
      <span class="table-title-span">
      <button type="button" @click="EditInfo()" class="btn table-title-button">
      <i class="iconfont icon-BatchEdit"></i> 批量编辑
      </button>
      </span>
      <span class="table-title-span">
      <button type="button" @click="updateInfo()" class="btn table-title-button">
      <i class="iconfont icon-BatchEdit"></i> 恢复为默认值
      </button>
      </span>
    </div>
    <div class="box-body">
      <table cellpadding="0" cellspacing="0" border="0" class="display muchColumn table pointer" id="example"
             width="100%">
        <thead>
        <tr>
          <th class="text-center">系统定义标题</th>
          <th class="text-center">查询显示标题</th>
          <th class="text-center">是否显示</th>
          <th class="text-center">报表输出标题</th>
          <th class="text-center">是否输出</th>
          <th class="text-center">简报输出标题</th>
          <th class="text-center">是否输出</th>
          <th class="text-center">保留小数位</th>
          <th class="text-center">单位换算</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import TableConfig from '../../manager/enum/tableConfig-enum';
  export default{
    components: {
//      'navigation-path': require('../utility/navigation-path.vue'),
    },
    props: {
      info: {
        type: Object,
        required: true
      },
      itemObj: {
        type: Object,
        required: false
      }
    },
    data (){
      return {
        projectId: null,
        monitorItemId: null,
        table: {},
      }
    },
    created: function () {
    },
    attached(){
      this.projectId = window.sessionUtility.getObj(window.sessionKeys.PROJECT).id;
      if (!this.info || !this.info.itemObj || !this.info.itemObj.id) {
        this.info.itemObj = window.sessionUtility.getObj(window.sessionKeys.ITEMOBJ);
      }
      this.initTable(this.projectId, this.info.itemObj.id);
      this.initEdit();
      this.initSave();
    },
    methods: {
      initTable (projectId, monitorItemId) {
        let that = this;
        this.table = $('#example').DataTable({
          scrollX: true,
          scrollY: '75vh',
          bScrollCollapse: true,
          showCheckbox: true,
          processing: true,
//          serverSide: true,
          searching: true,
          ordering: false,
          deferRender: true,
          iDisplayLength: 100,
          lengthMenu: [[10, 15, 25, 50], [10, 15, 25, 50]],
          select: {style: 'single', selector: 'td:not(:nth-child(3),:nth-child(5),:nth-child(7))'},
          ajax: {
            url: window.appContext.urls.selectConfigNamesU(projectId, monitorItemId),
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            dataFilter: function (data) {
              if (data === '') {
                data = JSON.stringify(TableConfig.getTableConfig(parseInt(that.info.itemObj.monitorTypeId)));
              }
              let json = JSON.parse(data);
              return JSON.stringify({
                data: json
              });
            }
          },
          language: this.$store.state.dataTable.language,
          createdRow: function (row, data, index) {
            $('td', row, index).addClass('text-center');
          },
          columnDefs: [
            {
              render: function (data, type, row) {
                if (data) {
                  return '<input type="checkbox" class="editor-active1" checked="checked">';
                } else {
                  return '<input type="checkbox" class="editor-active1">';
                }
                return data;
              },
              className: "dt-body-center1",
              targets: 2
            },
            {
              render: function (data, type, row) {
                if (data) {
                  return '<input type="checkbox" class="editor-active2" checked="checked">';
                } else {
                  return '<input type="checkbox" class="editor-active2">';
                }
                return data;
              },
              className: "dt-body-center2",
              targets: 4
            },
            {
              render: function (data, type, row) {
                if (data) {
                  return '<input type="checkbox" class="editor-active3" checked="checked">';
                } else {
                  return '<input type="checkbox" class="editor-active3">';
                }
                return data;
              },
              className: "dt-body-center3",
              targets: 6
            },
            {
              render: function (data, type, row) {
                return '<button type="button" class="edit-btn btn btn-info">编辑</button>';
              },
              targets: 9
            }
          ],
          data: null,
          columns: [
            {
              data: 'defaultTitle'
            },
            {
              data: 'historyTitle'
            },
            {
              data: 'visibility'
            },
            {
              data: 'reportTitle'
            },
            {
              data: 'export'
            },
            {
              data: 'infoTitle'
            },
            {
              data: 'send'
            },
            {
              data: 'keepDec'
            },
            {
              data: 'conversion'
            },
            {
              data: null
            }
          ],
        });
      },
      initEdit(){
        let that = this;
        $("#example tbody").on("click", ".edit-btn", function () {
          window.appContext.http.selectConfigNamesR(that.projectId, that.info.itemObj.id).then((response) => {
            let datas = response.body;
//            console.log(datas);
            let index = $(this).parent().parent().index();
//            console.log(index);
//            console.log(datas[index].visibility);
            if (datas[index].visibility) {
              $('.check1').attr('checked', true);
            } else if (datas[index].visibility === false) {
              $('.check1').attr('checked', false);
            }

          }, (response) => {
            toastr.error(response.body);
          });
          var tds = $(this).parents("tr").children();
          $.each(tds, function (i, val) {
            var jqob = $(val);
            if (i < 1 || jqob.has('button').length) {
              return true;
            }//跳过第1项 序号,按钮
            if (jqob.hasClass('dt-body-center1')) {
//              var put = $("<input type='checkbox' id='checkBox1' class='check1' disabled='disabled'>");
//              console.log(put);
            } else if (jqob.hasClass('dt-body-center2')) {
//              var put = $("<input type='checkbox' id='checkBox2' class='check2' disabled='disabled'>");
            } else if (jqob.hasClass('dt-body-center3')) {
//              var put = $("<input type='checkbox' id='checkBox3' class='check3' disabled='disabled'>");
            } else {
              var txt = jqob.text();
              var put = $("<input type='text'>");
              put.val(txt);
            }
            jqob.html(put);
          });
          $(this).html("确定");
          $(this).toggleClass("edit-btn");
          $(this).toggleClass("save-btn");
        });
//        console.log(this.json);
      },
      initSave(){
        let that = this;
        $("#example tbody").on("click", ".save-btn", function () {
          var row = that.table.row($(this).parents("tr"));
//          console.log(row);
          var tds = $(this).parents("tr").children();
          //这里是遍历编辑了的每一行的td，并将更新了的值更新到表格中
          $.each(tds, function (i, val) {
            var jqob = $(val);
            //把input变为字符串
            if (!jqob.has('button').length) {
              var txt = jqob.children("input[type='text']").val();
              jqob.html(txt);
              that.table.cell(jqob).data(txt);//修改DataTables对象的数据
            }
          });
          let data = row.data();
          $(this).html("编辑");
          $(this).toggleClass("edit-btn");
          $(this).toggleClass("save-btn");
        });
      },
      EditInfo(){
        $(".edit-btn").click();
      },
      saveInfo(){
        var alldata = $('#example').dataTable().fnGetData();//得到页面中所有对象
//        console.log(alldata);
        let lengths = $('.editor-active1').length;
        for (let i = 0; i < lengths; i++) {
          let trs = $('#example tbody').children()[i];
          let td = $(trs).children()[2];
          let td2 = $(trs).children()[4];
          let td4 = $(trs).children()[6];
          let input = $(td).children();
          let input2 = $(td2).children();
          let input4 = $(td4).children();
          if (input[0].checked) {
            alldata[i].visibility = true;
          } else {
            alldata[i].visibility = false;
          }
          if (input2[0].checked) {
            alldata[i].export = true;
          } else {
            alldata[i].export = false;
          }
          if (input4[0].checked) {
            alldata[i].send = true;
          } else {
            alldata[i].send = false;
          }
        }
        $(".save-btn").click();
        let showConf = {
          projectId: this.info.itemObj.projectId,
          monitorItemId: this.info.itemObj.id,
          json: JSON.stringify(alldata)
        };
//        console.log(showConf.json);
        window.appContext.http.getMonitorItemShowConf(showConf).then((response) => {
          toastr.success('保存成功!');
        }, (response) => {
//          console.log(response);
          toastr.error('通信失败');
        });
      },
      updateInfo(){
        let allData = TableConfig.getTableConfig(parseInt(this.info.itemObj.monitorTypeId));
        let showConf = {
          projectId: this.info.itemObj.projectId,
          monitorItemId: this.info.itemObj.id,
          json: JSON.stringify(allData)
        };
//        console.log(showConf.json);
        window.appContext.http.getMonitorItemShowConf(showConf).then((response) => {
          toastr.success('数据更新成功!');
//          window.appContext.http.selectConfigNames(showConf).then((response) => {
//            console.log(showConf);
//          }, (response) => {
//            console.log(response);
//            toastr.error('通信失败');
//          });
        }, (response) => {
          console.log(response);
          toastr.error('通信失败');
        });
      }
    }
  }
</script>