<template>
  <div class="box box-info box-solid">
    <div class="box-body">
      <table cellpadding="0" cellspacing="0" border="0" class="display nowrap table" width="100%" id="realTime"
             style="max-height: 25vh">
        <thead>
        <tr>
          <!--<th class="text-center" style="width:15px"></th>-->
          <th class="text-center">名称</th>
          <th class="text-center">时间</th>
          <th class="text-center">详细信息</th>
          <th class="text-center">备注</th>
        </tr>
        </thead>
      </table>
    </div>
  </div>
  <div class="box box-info box-solid">
    <div class="box-body">
      <label class="chat-msg-addon">消息提醒：</label>
      <div class="chat-msg" id="chat">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      'vue-select2': require('../utility/vue-select2.vue'),
    },
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        realTimeTable: {},
        realMsg: {},
        projectId: null,
        monitorItemId: null,
      };
    },
    watch: {
      realMsg: function () {
        try {
          console.log('实时数据已变化，已更新表格');
          if (this.realTimeTable.rows().data().length <= 0) return;
          let monitorItemIdMonitorName = this.realMsg.projectId + '_' + this.realMsg.pointName;
          let point = $($.parseHTML('#' + monitorItemIdMonitorName))[0];
          if (point.length) {
            $('#realTime').dataTable().fnUpdate(this.realMsg.dTime, point, 1, false, false);
            $('#realTime').dataTable().fnUpdate(this.realMsg.details, point, 2, false, false);
            $('#realTime').dataTable().fnUpdate(this.realMsg.remark, point, 3, false, false);
          } else {
            this.realTimeTable.row.add(this.realMsg).draw();
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
    mounted () {
      this.projectId = window.sessionUtility.getObj(window.sessionKeys.PROJECT).id;
      this.initRealTimeTable(this.projectId);
      this.webSocket();
    },
    methods: {
      initRealTimeTable(Id){
        this.realTimeTable = $('#realTime').DataTable({
          scrollX: true,
          scrollY: '50vh',
          bScrollCollapse: true,
          showCheckbox: true,
          processing: true,
          searching: false,
          ordering: false,
          deferRender: true,
          paging: false,
          info: false,
          ajax: {
            url: window.appContext.urls.getRealTimePageByProject(Id),
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            dataFilter: function (data) {
              let json = JSON.parse(data);
//              console.log(json);
              return JSON.stringify({
                data: json
              });
            }
          },
          language: this.$store.state.dataTable.language,
          createdRow: function (row, data, index) {
            $('td', row).addClass('text-center');
            let monitorItemIdMonitorName = data.projectId + '_' + data.pointName;
            $(row).eq(0).attr('id', monitorItemIdMonitorName);
          },
          data: null,
          columns: [
            {
              data: 'pointName'
            },
            {
              data: 'dTime'
            },
            {
              data: 'details'
            },
            {
              data: 'remark'
            },
          ]
        });
      },
      webSocket(){
        if (window.WebSocket) {
          //更改WebSocket的projectId
          let encodeURIStr = window.appContext.wsUrls.getRealDataWebSockPage(this.projectId);
          let webSocket = new WebSocket(encodeURI(encodeURIStr));
          webSocket.onopen = function (evt) {
            //链接建立
//         toastr.success('&nbsp;&nbsp;连接建立');
            console.info('链接建立');
            window.onbeforeunload = function () {
//          console.info("Is the refresh ");
              webSocket.close();
            }
          };
          webSocket.onerror = function () {
            //连接失败
            toastr.error('连接发生错误');
          };
          webSocket.onclose = function () {
            //连接断开
//          toastr.warning('&nbsp;&nbsp;连接断开');
          };
          webSocket.onmessage = function (msg) {
            //消息接收
//            console.log(msg);
            if (window.location.hash !== '#!/project/situationInfo/realTime') {
              webSocket.close();
              return;
            }
            let jsonData = JSON.parse(msg.data);
            if (jsonData.commandKey === 'MessageInfo') {
              let data = JSON.parse(jsonData.dict.MessageBody);
              let message = this.getColor(data.messageLevel, data.messageBody);
              let br = document.createElement('br');
              $('#chat').append(message);
              $('#chat').append(br);
              $('#chat').animate({scrollTop: $(document).height()});
            }
            else if (jsonData.commandKey === 'RealtimeData') {
              this.realMsg = JSON.parse(jsonData.dict.RealtimeData);
//              console.info(data);
//              console.info('this.realMsg:' + this.realMsg.details);
            }
          }.bind(this);
        }
        else {
          console.info('该浏览器不能接收消息');
          //$.messager.alert('提示',"该浏览器不支持下单提醒。<br/>建议使用高版本的浏览器，<br/>如 IE10、火狐 、谷歌  、搜狗等");
        }
      },
      getColor(messageLevel, msg){
        let label = document.createElement('label');
        label.innerText = msg;
        let message = label;
        switch (messageLevel) {
          case 0://默认消息
            label.style.fontWeight = 'normal';
            break;
          case 1://一般消息
            label.style.fontWeight = 'normal';
            label.style.color = '#01502C';
            break;
          case 2://跟踪消息
            label.style.fontWeight = 'normal';
            label.style.color = '#CDD004';
            break;
          case 3://警告消息
            label.style.fontWeight = 'normal';
            label.style.color = '#FF1C00';
            break;
          case 4://错误消息
            label.style.fontWeight = 'normal';
            label.style.color = '#FF1C00';
            break;
          default:
            label.style.fontWeight = 'normal';
            label.style.color = '#979797';
        }
        return message.outerHTML;
      },

      rowSelection(){
        $('#example tbody').on('click', 'tr', function () {
          let id = this.id;
          let index = $.inArray(id, selected);
          if (index === -1) {
            selected.push(id);
          } else {
            selected.splice(index, 1);
          }
          $(this).toggleClass('selected');
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .box.box-solid.box-info {
    border: 1px solid rgba(0, 204, 255, 0.51);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    box-shadow: 0 0 3px rgba(0, 207, 255, 0.67);
  }

  .chat-msg-addon label {
    color: #009dcb;
  }

  .chat-msg {
    height: 150px;
    min-height: 100px;
    border: transparent;
    overflow: auto;
    position: relative;
  }

</style>

