<template>
  <div class="box box-warning">
    <div class="box-body">
      <div class="div-margin-bottom">
        <div class="col-xs-3 col-sm-2"><label>监测项:</label></div>
        <div class="col-xs-9 col-sm-7">
          <vue-select2 :ajax=true :multiple=false :paging=false v-ref:item-selector
                       :ajax-url="monitorItems.ajaxUrl"
                       :init-data="monitorItems.initData"
                       :placeholder="monitorItems.placeholder"
                       :evt-selected="monitorItems.evtSelected">
          </vue-select2>
        </div>
      </div>
      <div class="div-margin-bottom">
        <div class="col-xs-3 col-sm-2"><label>时间点选择:</label></div>
        <div class="col-xs-9 col-sm-7">
          <div class="input-group">
            <i class="input-group-addon glyphicon glyphicon-time"></i>
            <input type="text" class="form-control timepicker" id="timePoint">
          </div>
        </div>
        <div class="col-xs-12 col-sm-3 center-grid">
          <button type="button" @click="addTime()" class="btn-size">添加</button>
        </div>
      </div>
      <div class="div-margin-bottom">
        <div class="col-xs-3 col-sm-2"><label>已选择时间点:</label></div>
        <div class="col-xs-9 col-sm-7" id="val">
          <vue-select2 :ajax=false :multiple=true :paging=false v-ref:selected-selector
                       :init-data="selectedTimes.initData"
                       :placeholder="selectedTimes.placeholder"
                       :evt-selected="selectedTimes.evtSelected">
          </vue-select2>
        </div>
      </div>
      <div class="div-margin-bottom">
        <div class="col-xs-3 col-sm-2"><label>是否启用:</label></div>
        <div class="col-xs-9 col-sm-7">
          <!--<vue-select2 :ajax=false :paging=false :multiple=false v-ref:time-selector-->
          <!--:init-data="zoneOptions.initData"-->
          <!--:local-data="zoneOptions.localData"-->
          <!--:placeholder="zoneOptions.placeholder"-->
          <!--:evt-selected="zoneOptions.evtSelected">-->
          <!--</vue-select2>-->
          <select class="form-control" v-model="itemParam.isEnable" name="isEnable" id="isEnable">
            <!--<option value="" v-bind:selected="!isEnable" disabled>请选择是否启用</option>-->
            <option v-for="option in options" :value="option.value"
                    :selected="option.value == itemParam.isEnable ? true : false">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="box-footer">
      <div class="btn-footer-wrapper">
        <button type="button" class="btn btn-success btn-foot btn-md " @click="confirm()">确认设置</button>
        <button type="button" @click="deleteById()" class="btn btn-info btn-foot" id="deleteBtn">删除</button>
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
        monitorItemId: null,
        monitorItems: {
          initData: [],
          placeholder: '请选择监测项',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.monitorItemId = data[0].id;
              this.initNecessaryPeriod(this.monitorItemId);
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorItemPage_U(this.projectId);
          }.bind(this)
        },
        selectedTimes: {
          initData: [],
          placeholder: '空',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.itemParam.vData = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].text) {
                  this.itemParam.vData.push(data[i].text);
                }
              }
            } else {
              this.itemParam.vData = [];
            }
          }.bind(this),
          ajaxUrl: function (data) {
            return window.mainConfig.url.getVdataByMonitorItemId(this.monitorItemId);
          }.bind(this)
        },
        options: [{value: 0, text: '不启用'}, {value: 1, text: '启用'}],
        zoneOptions: {
          placeholder: '是否启用',
          evtSelected: function (evt, data) {
            if (data && data[0]) {
              this.isEnable = data[0].id;
            }
          }.bind(this),
          localData: [{id: 0, text: '不启用'}, {id: 1, text: '启用'}],
          initData: this.isEnable,
        },
        itemParam: {},
        vData: [],
      };
    },
    mounted () {
      this.initTimepicker();
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
      let component = this;
      let interval = setInterval(() => {
        let item = component.info.itemObj;
        if (item) {
          component.monitorItemId = item.id;
          component.$refs.itemSelector.$emit('update', [{id: item.id, text: item.name, obj: item}]);
          component.initNecessaryPeriod(component.monitorItemId);
          clearInterval(interval);
        }
      }, 200);
//      $('#isEnable').change(function (e) {
//        $('#isEnable').addClass('selectChanged');
//      })
    },
    methods: {
      initNecessaryPeriod(monitorItemId){
        window.mainConfig.http.getParamById(monitorItemId).then((response) => {
          let data = response.data[0];
          if (!$.isEmptyObject(data)) {
            this.itemParam.id = data.id;
            this.itemParam.monitorItemId = data.monitorItemId;
            this.itemParam.isEnable = data.isEnable;
            let temp = JSON.parse(data.vData);
            this.itemParam.vData = (temp && temp.length > 0) ? temp : [];
            this.$refs.selectedSelector.clear(true);
            this.$refs.selectedSelector.$emit('update', this.itemParam.vData, true);
            $('#isEnable').val(this.itemParam.isEnable);
            $('#deleteBtn').attr('disabled',false);
          } else {
            this.itemParam = {
              vData: []
            };
            this.$refs.selectedSelector.clear(true);
            this.$refs.selectedSelector.$emit('change');
            $('#isEnable').val('0');
            $('#deleteBtn').attr('disabled','disabled');

          }

        }, (response) => {
          toastr.error('通信失败');
        });
      },
      confirm () {
        let info = {};
        if (this.itemParam.hasOwnProperty('id')) {
          info.id = this.itemParam.id;
          info.monitorItemId = this.itemParam.monitorItemId;
          info.key = 'NessaryPeriod';
          if (this.itemParam.vData.length > 0) {
            info.isEnable = this.itemParam.isEnable;
            info.vData = JSON.stringify(this.itemParam.vData);
          } else {
            info.vData = '';
            $('#isEnable').val(0);
            info.isEnable = $('#isEnable').val();
            toastr.warning('时间点设置为空，不能启用该配置');
          }
          window.mainConfig.http.insertOrUpdate(info).then((response) => {
            if (response.status === 200) {
              toastr.info('修改成功!');
            } else {
              toastr.error(response.data.MESSAGE);
            }
          }, (response) => {
            toastr.error('通信失败');
          });
        } else {
          info.id = uuid.v4();
          info.monitorItemId = this.monitorItemId;
          info.key = 'NessaryPeriod';
          info.isEnable = this.itemParam.isEnable;
          info.vData = JSON.stringify(this.itemParam.vData);
          window.mainConfig.http.insertOrUpdate(info).then((response) => {
            if (response.status === 200) {
              toastr.info('添加成功!');
              $('#deleteBtn').attr('disabled',false);
            } else {
              toastr.error(response.data.MESSAGE);
            }
          }, (response) => {
            toastr.error('通信失败');
          });
        }
      },
      initTimepicker () {
        $('.timepicker').timepicker({
          minuteStep: 1,
          showMeridian: false,
          icons: {
            up: 'glyphicon glyphicon-chevron-up',
            down: 'glyphicon glyphicon-chevron-down'
          },
//          showInputs: false
        });
      },
      addTime(){
        var val = $('#timePoint').val();
//        let repeat = false;
        if (this.itemParam.vData && this.itemParam.vData.length > 0) {
          for (let i = 0; i < this.itemParam.vData.length; i++) {
            if (this.itemParam.vData[i] === val) {
              toastr.warning('添加的时间段重复!');
//            repeat = true;
              return;
            }
          }
        }
        this.itemParam.vData.push(val);
        this.$refs.selectedSelector.clear(true);
        this.$refs.selectedSelector.$emit('update', this.itemParam.vData, true);
//        if (!repeat) {
//        }
      },
      deleteById(){
        if (this.itemParam.id) {
          window.mainConfig.http.deleteById(this.itemParam.id).then((response) => {
            let self = this;
            layer.open({
              icon: 3,
              title: '<h4 style="color: #4898d5;font-weight: bold">删除周期配置</h4>',
              content: '<div style="color: #c39e00;font-size: 1.1em;">您确定删除此周期配置吗?</div>',
              btn: ['确定', '取消'],
              yes: function (index, layero) {
                self.itemParam.param = {};
                toastr.success('周期配置删除成功');
                self.initNecessaryPeriod(self.monitorItemId);
                layer.close(index);
              },
              btn1: function (index, layero) {
                layer.close(index);
              },
            });
          }, (response) => {
            console.log(response);
          })
        } else {
          console.log('no id');
        }
      },
    }
  };
</script>
<style lang="scss" scoped>
  @media screen and(max-width: 768px) {
    .box-footer .btn {
      margin-bottom: 10px;
    }
  }

  .btn-size {
    color: #00c0ef;
    font-size: 1.1em;
    font-weight: bolder;
    border: 1px #00c0ef solid;
    border-radius: 5px;
    background: transparent;
    width: 100%;
    min-width: 50px;
    max-width: 120px;
    height: 100%;
    padding: 4px;
    margin: auto;
  }

  .btn-size:hover {
    color: #ffffff;
    border: 2px #00c0ef solid;
    box-shadow: 0 0 1px 1px #00c0ef;
    background: -moz-linear-gradient(left, red, orange, yellow, green, blue, indigo, violet);
    background: -webkit-linear-gradient(left, red, orange, yellow, green, blue, indigo, violet);
    background: -ms-linear-gradient(left, red, orange, yellow, green, blue, indigo, violet);
    background: -o-linear-gradient(left, red, orange, yellow, green, blue, indigo, violet);
    background: linear-gradient(to bottom, #00c0ef, #00b6e2);
  }

  .input-group-addon {
    position: relative;
    top: 0;
    padding: 5px 12px 6px 12px;
  }

  .input-group, .timepicker {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 35px;
  }

  .timepicker:hover {
    color: inherit;
    border-color: inherit;
  }

  .timepicker:hover {
    border: 1px #0096c1 solid;
  }

  .selectChanged {
    color: #00c0f1;
  }
</style>

