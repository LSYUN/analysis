<template>
  <div class="main">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <navigation-path :path-key=operation.pathKey></navigation-path>
    </section>
    <section class="content content-overflow">
      <h3 class="info-title">{{operation.title}}</h3>
      <div class="box box-info box-solid">
        <validator name="validation">
          <form role="form" novalidate>
            <div class="box-body">
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1">
                  <label for="inputName"><span class="span-necessary">*</span>工程名称</label>
                </div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <input type="text" class="form-control" v-model="info.name" v-validate:name="['required']"
                         id="inputName" placeholder="请设置">
                  <div class="errors vue-error-bottom">
                    <p v-if="$validation.name.dirty && $validation.name.required"> 请输入工程名称</p>
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1"><label><span class="span-necessary">*</span> 工程地址</label></div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <div class="row">
                    <div class="col-sm-10 div-margin-bottom">
                      <input type="text" class="form-control" v-model="info.address" id="address" placeholder="请设置"
                             v-validate:address="['required']"></div>
                    <div class="col-sm-2 div-margin-bottom btn-addon">
                      <button type="button" class="btn table-title-button" @click="loadSelects()">省市区</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1"><label><span class="span-necessary">*</span> 经纬度</label></div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <div class="row">
                    <div class="col-sm-5 div-margin-bottom">
                      <div class="input-group">
                        <span class="input-group-addon">经度</span>
                        <input type="number" id="lng" class="form-control" v-model="setLng"
                               placeholder="请设置" v-validate:lat="['required']">
                      </div>
                      <div class="errors vue-error-bottom">
                        <p v-if="$validation.lat.dirty && $validation.lat.required">请选择或输入经度</p>
                      </div>
                    </div>
                    <div class="col-sm-5 div-margin-bottom">
                      <div class="input-group">
                        <span class="input-group-addon">纬度</span>
                        <input type="number" id="lat" class="form-control" v-model="setLat"
                               placeholder="请设置" v-validate:lng="['required']">
                      </div>
                      <div class="errors vue-error-bottom">
                        <p v-if="$validation.lng.dirty && $validation.lng.required">请选择或输入纬度</p>
                      </div>
                    </div>
                    <div class="col-sm-2 div-margin-bottom btn-addon">
                      <button type="button" @click="loadMap()" class="btn table-title-button">经纬度</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1"><label><span class="span-necessary">*</span> 工程类型</label></div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <vue-select2 :ajax=false :multiple=false :paging=false v-ref:type-slt
                               :init-data="projectTypes.initData"
                               :placeholder="projectTypes.placeholder"
                               :evt-selected="projectTypes.evtSelected"
                               :local-data="projectTypes.localData"></vue-select2>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1"><label>&nbsp&nbsp监管单位</label></div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <vue-select2 :ajax=true :multiple=false :paging=false
                               :ajax-url="superOrgOptions.ajaxUrl"
                               :placeholder="superOrgOptions.placeholder"
                               :evt-selected="superOrgOptions.evtSelected"
                               :init-data="superOrgOptions.initData"
                               :result-add="superOrgOptions.resultAdd"></vue-select2>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1"><label><span class="span-necessary">*</span> 工程状态</label></div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <vue-select2 :ajax=false :multiple=false :paging=false v-ref:state-slt
                               :init-data="workStates.initData"
                               :placeholder="workStates.placeholder"
                               :evt-selected="workStates.evtSelected"
                               :local-data="workStates.localData"></vue-select2>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1"><label><span class="span-necessary">*</span> 创建日期</label></div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <div class="input-group date">
                    <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
                    <input type="text" class="form-control" id="date1" v-model="info.startDate" placeholder="请设置">
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1"><label><span class="span-necessary">*</span> 结束日期</label></div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <div class="input-group date">
                    <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
                    <input type="text" class="form-control" id="date2" v-model="info.endDate" placeholder="请设置">
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1"><label>&nbsp&nbsp&nbsp&nbsp备注</label></div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <textarea class="form-control" rows="3" v-model="info.remark"></textarea>
                </div>
              </div>
            </div>
            <div class="box-footer">
              <div class="btn-footer-wrapper">
                <button type="button" @click="confirm()" class="btn  btn-info">确定</button>
                <button type="button" @click="cancel()" class="btn  btn-info">取消</button>
              </div>
            </div>
          </form>
        </validator>
      </div>
    </section>
    <div class="mapPopUp">
      <div id="mapDiv" class="mapDiv">
        <div class="input-wrap">
          <div class="col-xs-6 form-group">
            <div class="input-group">
              <span class="input-group-addon">经度</span>
              <input type="number" id="nwe-lng" class="form-control" v-model="newLng">
            </div>
          </div>
          <div class="col-xs-6 form-group">
            <div class="input-group">
              <span class="input-group-addon">纬度</span>
              <input type="number" id="new-lat" class="form-control" v-model="newLat">
            </div>
          </div>
        </div>
        <div id="mapWrap" class="mapWrap"></div>
        <div class="footer-btn-wrapper btn-footer">
          <button type="button" class="btn  btn-info" @click="mapConfirm()">确定</button>
          <button type="button" class="btn  btn-info" @click="mapCancel()">取消</button>
        </div>
      </div>
    </div>
    <div class="selectPopUp">
      <div id="selectDiv" class="selectDiv">
        <h3 class="addressSelect">选择地址</h3>
        <div class="form-group currentAddress">
          <span class="selectedAddress" v-if="info.address">已设地址:&nbsp&nbsp&nbsp&nbsp{{info.address}}</span>
        </div>
        <div class="selectWrapper">
          <div class="col-sm-4 div-margin-bottom set-province">
            <vue-select2 :ajax=true :multiple="false" :paging="false"
                         :ajax-url="provinceOptions.ajaxUrl"
                         :placeholder="provinceOptions.placeholder"
                         :evt-selected="provinceOptions.evtSelected"
                         :init-data="provinceOptions.initData"></vue-select2>
          </div>
          <div class="col-sm-4 div-margin-bottom set-city">
            <vue-select2 :ajax=true :multiple="false" :paging="false"
                         :ajax-url="cityOptions.ajaxUrl"
                         :placeholder="cityOptions.placeholder"
                         :evt-selected="cityOptions.evtSelected"
                         :init-data="cityOptions.initData" v-ref:city-selector></vue-select2>
          </div>
          <div class="col-sm-4 div-margin-bottom set-country">
            <vue-select2 :ajax=true :multiple="false" :paging="false"
                         :ajax-url="countryOptions.ajaxUrl"
                         :placeholder="countryOptions.placeholder"
                         :evt-selected="countryOptions.evtSelected"
                         :init-data="countryOptions.initData" v-ref:country-selector></vue-select2>
          </div>
        </div>
        <div class="footer-btn-wrapper btn-footer">
          <button type="button" class="btn btn-info btn-address-conform" @click="selectConfirm()" disabled>确定</button>
          <button type="button" class="btn btn-info" @click="selectCancel()">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import GlobalEnum from '../../manager/enum/global-enum';
  export default {
    components: {
      'navigation-path': require('../utility/navigation-path.vue'),
      'vue-select2': require('../utility/vue-select2.vue')
    },
    props: {
      info: {
        type: Object,
        required: true
      },
    },
    data () {
      return {
        setLng: null,      //保存经度
        setLat: null,      //保存纬度
        newLng: null,      //记录地图中Mark的经度
        newLat: null,      //记录地图中Mark的纬度
        setAddress: null,  //记录mark所属的地区
        oldProvince: {},    //保存旧省信息
        oldCity: {},        //保存旧市信息
        oldCountry: {},     //保存旧区信息
        accountId: null,
        map: null,
        provinceId: null,
        provinceText: null,
        cityId: null,
        cityText: null,
        countryId: null,
        countryText: null,
        operations: {
          add: {
            title: '新增工程',
            pathKey: 'projectAdd',
            path: 'add',
            confirm: function (info, superId, superName) {
              window.appContext.http.projectAdd(info, superId, superName).then((response) => {
                this.$route.router.go({path: '/project/list'});
                toastr.info('添加成功!');
              }, (response) => {
                toastr.error('通信失败');
              });
            }.bind(this)
          },
          modify: {
            title: '修改工程',
            pathKey: 'projectModify',
            path: 'modify',
            confirm: function (info, superId, superName) {
              window.appContext.http.projectModify(info, superId, superName).then((response) => {
                this.$route.router.go({path: '/project/list'});
                toastr.info('修改成功!');
              }, (response) => {
                toastr.error('通信失败');
              });
            }.bind(this)
          }
        },
        provinceOptions: {
          initData: [],
          placeholder: '请选择所在省份',
          evtSelected: function (evt, data) {
            this.cityId = null;
            this.countryId = null;
            this.cityText = '';
            this.countryText = '';
            this.$refs.citySelector.$emit('clear', true);
            this.$refs.countrySelector.$emit('clear', true);
            if (data && data.length > 0) {
              this.provinceId = data[0].obj.coding;
              this.provinceText = data[0].obj.name;
              this.info.address = this.provinceText;
              this.info.lng = this.setLng = data[0].obj.lng;
              this.info.lat = this.setLat = data[0].obj.lat;
            } else {
              this.provinceId = null;
              this.provinceText = '';
              this.info.address = '';
              this.info.lng = this.setLng = null;
              this.info.lat = this.setLat = null;
            }
            this.$refs.citySelector.$emit('enabled');
            $('.btn-address-conform').attr('disabled',false);
          }.bind(this),
          ajaxUrl: function () {
            return window.appContext.urls.getProvincePage(0);
          }.bind(this)
        },
        cityOptions: {
          initData: [],
          placeholder: '请选择所在城市',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.countryId = null;
              this.countryText = '';
              this.$refs.countrySelector.$emit('clear', true);
              if (data && data.length > 0) {
                this.cityId = data[0].obj.coding;
                this.cityText = data[0].obj.name;
                this.info.cityCode = this.cityId;
                this.info.address = this.provinceText + this.cityText;
                this.info.lng = this.setLng = data[0].obj.lng;
                this.info.lat = this.setLat = data[0].obj.lat;
              }
            } else {
              this.cityId = null;
              this.cityText = '';
              this.info.cityCode = null;
              this.info.address = this.provinceText;
              this.info.lng = this.setLng = null;
              this.info.lat = this.setLat = null;
            }
            this.$refs.countrySelector.$emit('enabled');
          }.bind(this),
          ajaxUrl: function () {
            return window.appContext.urls.getCityOrCountryPage(this.provinceId);
          }.bind(this)
        },
        countryOptions: {
          initData: [],
          placeholder: '请选择所在城区',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.countryId = data[0].obj.coding;
              this.countryText = data[0].obj.name;
              this.info.cityCode = this.countryId;
              this.info.address = this.provinceText + this.cityText + this.countryText;
              this.info.lng = this.setLng = data[0].obj.lng;
              this.info.lat = this.setLat = data[0].obj.lat;
            } else {
              this.countryId = null;
              this.countryText = '';
              this.info.cityCode = null;
              this.info.address = this.provinceText + this.cityText;
              this.info.lng = this.setLng = null;
              this.info.lat = this.setLat = null;
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.appContext.urls.getCityOrCountryPage(this.cityId);
          }.bind(this)
        },
        superOrgOptions: {
          initData: [],
          placeholder: '请选择受监管单位',
          resultAdd: [{id: "null", name: '无',}],
          evtSelected: function (evt, data) {
            if (data && data.length > 0 && data[0].id !== "null") {
              this.info.superOrganization = data[0].obj;
            } else {
              this.info.superOrganization = {};
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.appContext.urls.getSuperOrganizationsPage(this.accountId);
          }.bind(this)
        },
        projectTypes: {
          initData: [],
          placeholder: '请选择工程类型',
          localData: GlobalEnum.projectTypes,
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.info.type = data[0].id;
            }
          }.bind(this)
        },
        workStates: {
          initData: [],
          placeholder: '请选择工程状态',
          localData: GlobalEnum.workStates,
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.info.workState = data[0].id;
            }
          }.bind(this)
        },
      }
    },
    computed: {
      operation () {
        let operation = _.find(this.operations, function (p) {
          return p.path === this.$route.params.operation;
        }.bind(this));
        return operation;
      }
    },
    mounted () {
      this.initDateRangePicker();
      this.accountId = window.sessionUtility.getObj(window.sessionKeys.ACCOUNT).id;
      if (this.info.hasOwnProperty('id') === false) {
        this.info.id = uuid.v4();
        this.info.address = '';
        this.info.createDate = this.getDate(new Date());
        this.info.organizationId = window.sessionUtility.getObj(window.sessionKeys.ACCOUNT).organizationId;
        this.info = Object.assign({}, this.info);
      } else if (this.info.hasOwnProperty('id') === true) {
        this.initSuperOrg(this.info.superOrganization);
        this.initProjectType(this.info.type);
        this.initWorkState(this.info.workState);
        this.setLng = this.info.lng;
        this.setLat = this.info.lat;
      }
    },
    methods: {
      initSuperOrg(superOrg){
        if (superOrg) {
          this.info.superOrganization = superOrg;
          this.superOrgOptions.initData.push({
            id: superOrg.id,
            text: superOrg.name,
            obj: superOrg
          });
        }
      },
      initProjectType(num){
        let data = _.find(GlobalEnum.projectTypes, (t) => t.value === num);
        if (data) {
          this.projectTypes.initData.push({
            id: data.value,
            text: data.text,
            obj: data
          })
        }
      },
      initWorkState(num){
        let data = _.find(GlobalEnum.workStates, (t) => t.value === num);
        if (data) {
          this.workStates.initData.push({
            id: data.value,
            text: data.text,
            obj: data
          })
        }
      },
      confirm () {
        if (this.$validation.valid === false) {
          toastr.info('格式错误,请填写完整');
          return;
        }
        if (this.info.type === '') {
          toastr.info('请选择工程类型');
          return;
        }
        if (this.info.workState === '') {
          toastr.info('请选择工程状态');
          return;
        }
        if (!this.info.address) {
          toastr.info('请选择完整的工程地址');
          return;
        }
        if (!this.info.createDate || !this.info.endDate) {
          this.info.createDate = this.getDate(new Date());
          this.info.endDate = this.getDate(new Date());
        }
        let info = {
          id: this.info.id,
          name: this.info.name,
          address: this.info.address,
          lng: this.setLng,
          lat: this.setLat,
          cityCode: this.info.cityCode,
          organizationId: this.info.organizationId,
          startDate: this.info.startDate,
          endDate: this.info.endDate,
          createDate: this.info.createDate,
          workState: parseInt(this.info.workState),
          remark: this.info.remark,
          enabled: true,
          type: parseInt(this.info.type),
        };
        let superId, superName;
        if (this.info.superOrganization && this.info.superOrganization.id) {
          superId = this.info.superOrganization.id;
          superName = this.info.superOrganization.name;
        } else {
          superId = null;
          superName = null;
        }
        this.operation.confirm(info, superId, superName);
      },
      cancel(){
        this.$route.router.go({path: '/project/list'});
      },
      loadMap(){
        $(".mapPopUp").fadeIn();
        let self = this;
        var center = new qq.maps.LatLng(self.setLng, self.setLat);
        if (self.setLng !== null && self.setLat !== null) {              //若已经设置过经纬度，改变展示地图的中心和mark的位置
          center = new qq.maps.LatLng(self.setLat, self.setLng);         //注意：LatLng(纬度，经度)；
          self.newLat = self.setLat;
          self.newLng = self.setLng;
        } else {
          center = new qq.maps.LatLng(23.166093, 113.455239);           //设置默认值
          self.newLat = 23.166093;
          self.newLng = 113.455239;
        }
        let map = new qq.maps.Map(document.getElementById('mapWrap'), { //挂载地图
          center: center,
          zoom: 13
        });
        let marker = new qq.maps.Marker({                              //设置Mark
          position: center,
          draggable: true,
          map: map
        });
        let citylocation = new qq.maps.CityService({
          complete: function (results) {
            self.setAddress = results.detail;                        //根据经纬度获取地区信息并赋给setAddress
          }
        });
        qq.maps.event.addListener(marker, 'dragging', function () {    //Mark拖动过程中记录经纬度，存储在newLng和newLat里
          self.newLat = marker.getPosition().lat;
          self.newLng = marker.getPosition().lng;
        });
        qq.maps.event.addListener(marker, 'dragend', function () {    //Mark拖动停止
          let latLng = new qq.maps.LatLng(self.newLat, self.newLng);
          citylocation.searchCityByLatLng(latLng);
        });
        let latLng = new qq.maps.LatLng(self.newLat, self.newLng);//直接获取一次地址信息，避免Mark未拖动值为空
        citylocation.searchCityByLatLng(latLng);
      },
      mapConfirm(){
        this.setLat = this.newLat;
        this.setLng = this.newLng;
        this.info.lng = this.setLng;
        this.info.lat = this.setLat;
        let addressArr = this.setAddress.detail.split(',');
        if (addressArr.length > 3) {
          this.provinceText = addressArr[2];
          this.cityText = addressArr[1];
          this.countryText = addressArr[0];
        } else {
          this.provinceText = addressArr[1];
          this.cityText = addressArr[1];
          this.countryText = addressArr[0];
        }
        this.info.address = this.provinceText + this.cityText + this.countryText;
        $('#address').html(this.info.address);
        $(".mapPopUp").fadeOut();
        this.$refs.citySelector.$emit('disabled');
        this.$refs.countrySelector.$emit('disabled');
      },
      mapCancel(){
        this.newLat = null;
        this.newLng = null;
        $(".mapPopUp").fadeOut();
      },
      loadSelects(){
        $('.selectPopUp').fadeIn();
        $('.btn-address-conform').attr('disabled',true);
        if (this.provinceId) {
          if (this.provinceText) $('.set-province .select2-selection__rendered').html(this.provinceText);
          if (this.cityText) $('.set-city .select2-selection__rendered').html(this.cityText);
          if (this.countryText) $('.set-country .select2-selection__rendered').html(this.countryText);
          this.oldProvince = {id: this.provinceId.slice(), text: this.provinceText.slice()};
          if (this.cityId) {
            this.oldCity = {id: this.cityId.slice(), text: this.cityText.slice()};
            if (this.countryId) {
              this.oldCountry = {id: this.countryId.slice(), text: this.countryText.slice()};
            }
          }
        }
      },
      selectConfirm(){
        this.info.address = this.provinceText + this.cityText + this.countryText;
        $('#address').html(this.info.address);
        $('.selectPopUp').fadeOut();
      },
      selectCancel(){
        this.provinceId = this.oldProvince.id;
        this.provinceText = this.oldProvince.text;
        this.cityId = this.oldCity.id;
        this.cityText = this.oldCity.text;
        this.countryText = this.oldCountry.text;
        $('.selectPopUp').fadeOut();
      },
      getDate(strDate){
        let objDate = new Date(strDate); //创建一个日期对象表示当前时间
        let year = objDate.getFullYear();   //四位数字年
        let month = objDate.getMonth() + 1;   //getMonth()返回的月份是从0开始的，还要加1
        let day = objDate.getDate();
        let hours = objDate.getHours();
        let minutes = objDate.getMinutes();
        let seconds = objDate.getSeconds();
        if (month < 10) {
          month = '0' + month;
        }
        if (date < 10) {
          day = '0' + date;
        }
        if (hours < 10) {
          hours = '0' + hours;
        }
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
        if (seconds < 10) {
          seconds = '0' + seconds;
        }
        let date = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        return date;
      },
      initDateRangePicker(){/*初始化日期控件*/
        $("#date1").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          locale: {
            firstDay: 1,
            applyLabel: '确认',
            cancelLabel: '取消',
            customRangeLabel: '自定义范围',
            format: 'YYYY-MM-DD 00:00:00',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          },
        });
        $("#date2").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          locale: {
            firstDay: 1,
            applyLabel: '确认',
            cancelLabel: '取消',
            customRangeLabel: '自定义范围',
            format: 'YYYY-MM-DD 23:59:59',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          },
        });
      },
    }
  };
</script>
<style lang="scss" scoped>
  .main {
    position: relative;
    width: 100%;
    height: 90vh;
  }

  .content {
    position: relative;
  }

  .btn-addon {
    padding-left: 0;
  }

  .btn-addon button {
    float: right;
    display: grid;
    font-size: 0.60em;
    padding: 6px 8px;
    vertical-align: bottom;
  }

  .mapPopUp, .selectPopUp {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
  }

  .mapDiv {
    position: absolute;
    top: 10%;
    left: 50%;
    width: 70vw;
    height: 80vh;
    padding: 10px;
    background-color: #fff;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0 3px 15px #fff;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%)
  }

  .selectDiv {
    position: absolute;
    top: 20%;
    left: 50%;
    width: 70vw;
    height: 40vh;
    padding: 10px;
    background-color: #fff;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0 3px 15px #fff;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%)
  }

  .addressSelect {
    font-size: 2em;
    text-align: center;
    color: #3399ee;
  }

  .currentAddress {
    font-family: "Microsoft JhengHei", "Microsoft MHei", sans-serif;
    text-align: center;
    margin: 15px auto;
    font-size: 1.2em;
    color: #3399ee;
    font-weight: bolder;
    height: 35px;
    line-height: 35px;
  }

  .selectWrapper {
    position: relative;
    width: 100%;
    top: 10%;
  }

  .footer-btn-wrapper {
    text-align: center;
    position: absolute;
    bottom: 10px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%)
  }

  .mapWrap {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 73%;
    border: 2px solid #5bc0de;
    border-radius: inherit;
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    .selectWrapper {
      top: 10%;
    }

    .footer-btn-wrapper button {
      font-size: 0.5em;
      padding: 3px 6px;
    }

    .btn-addon button {
      float: none;
      text-align: center;
      margin: 0 auto;
    }
  }
</style>

