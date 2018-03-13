<template>
  <div>
    <button id="test" type="button">info</button>
    <section class="content content-overflow">
      <h3 class="dt-form-title">{{operation.title}}</h3>
      <form role="form" class="form-horizontal">
        <div class="form-group">
          <label for="name" class="col-xs-12 col-sm-3 control-label">工程名称 *</label>
          <div class="col-xs-12 col-sm-7 row">
            <p class="control has-icon has-icon-right">
              <input name="name" id="name" v-model="info.name" type="text" class="dt-input" placeholder="请设置"
                     v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('name') }">
              <i v-show="errors.has('name')" class="fa fa-warning"></i>
              <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
            </p>
          </div>
        </div>
        <div class="form-group">
          <label for="ads" class="col-xs-12 col-sm-3 control-label">工程地址*</label>
          <div class="col-xs-12 col-sm-8 row">
            <div class="col-xs-10 col-no-padding">
              <p class="control has-icon has-icon-right">
                <input id="ads" v-model="info.address" type="text" class="dt-input" placeholder="请设置"
                       name="ads" v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('ads') }">
                <i v-show="errors.has('ads')" class="fa fa-warning"></i>
                <span v-show="errors.has('ads')" class="help is-danger">{{ errors.first('ads') }}</span>
              </p>
            </div>
            <div class="col-xs-2 col-no-padding btn-addon">
              <button type="button" @click="addressLoad()" class="btn btn-success">选择</button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="lng" class="col-xs-12 col-sm-3 control-label">经纬度*</label>
          <div class="col-xs-12 col-sm-8 row">
            <div class="col-sm-5 col-no-padding">
              <div class="input-group">
                <span class="input-group-addon">经度</span>
                <p class="control has-icon has-icon-right margin-bottom-0">
                  <input name="lng" id="lng" v-model="info.lng" type="number" class="dt-input" placeholder="请设置"
                         v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('lng') }">
                  <i v-show="errors.has('lng')" class="fa fa-warning"></i>
                  <span v-show="errors.has('lng')" class="help is-danger">{{ errors.first('lng') }}</span>
                </p>
              </div>
            </div>
            <div class="col-sm-5 col-no-padding">
              <div class="input-group">
                <span class="input-group-addon">纬度</span>
                <p class="control has-icon has-icon-right margin-bottom-0">
                  <input name="lat" id="lat" v-model="info.lat" type="number" class="dt-input" placeholder="请设置"
                         v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('lat') }">
                  <i v-show="errors.has('lat')" class="fa fa-warning"></i>
                  <span v-show="errors.has('lat')" class="help is-danger">{{ errors.first('lat') }}</span>
                </p>
              </div>
            </div>
            <div class="col-sm-2 col-no-padding btn-addon">
              <button type="button" @click="mapLoad()" class="btn btn-success">经纬度</button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-12 col-sm-3 control-label">监管单位 </label>
          <div class="col-xs-12 col-sm-7 row">
            <vue-select2 :ajax=true :multiple=false :paging=false ref="superOrg"
                         :ajax-url="superOrgOptions.ajaxUrl"
                         :placeholder="superOrgOptions.placeholder"
                         :evt-selected="superOrgOptions.evtSelected"
                         :init-data="superOrgOptions.initData"
                         :result-add="superOrgOptions.resultAdd"></vue-select2>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-12 col-sm-3 control-label">工程类型*</label>
          <div class="col-xs-12 col-sm-7 row">
            <vue-select2 :ajax=false :multiple=false :paging=false ref="type"
                         :init-data="projectTypes.initData"
                         :placeholder="projectTypes.placeholder"
                         :evt-selected="projectTypes.evtSelected"
                         :local-data="projectTypes.localData"></vue-select2>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-12 col-sm-3 control-label">工程状态*</label>
          <div class="col-xs-12 col-sm-7 row">
            <vue-select2 :ajax=false :multiple=false :paging=false ref="workState"
                         :init-data="workStates.initData"
                         :placeholder="workStates.placeholder"
                         :evt-selected="workStates.evtSelected"
                         :local-data="workStates.localData"></vue-select2>
          </div>
        </div>
        <div class="form-group">
          <label for="start" class="col-xs-12 col-sm-3 control-label">创建日期*</label>
          <div class="col-xs-12 col-sm-7 row">
            <p class="control has-icon has-icon-right">
              <i class="fa fa-calendar"></i>
              <input name="start" id="start" type="text" class="dt-input" placeholder="请设置"
                     v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('start') }">
              <i v-show="errors.has('start')" class="fa fa-warning"></i>
              <span v-show="errors.has('start')" class="help is-danger">{{ errors.first('start') }}</span>
            </p>
          </div>
        </div>
        <div class="form-group">
          <label for="end" class="col-xs-12 col-sm-3 control-label">结束日期*</label>
          <div class="col-xs-12 col-sm-7 row">
            <p class="control has-icon has-icon-right">
              <i class="fa fa-calendar"></i>
              <input name="end" id="end" type="text" class="dt-input" placeholder="请设置"
                     v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('end') }">
              <i v-show="errors.has('end')" class="fa fa-warning"></i>
              <span v-show="errors.has('end')" class="help is-danger">{{ errors.first('end') }}</span>
            </p>
          </div>
        </div>
        <div class="form-group">
          <label for="remark" class="col-xs-12 col-sm-3 control-label">备注</label>
          <div class="col-xs-12 col-sm-7 row">
            <p class="control has-icon has-icon-right">
              <input name="remark" id="remark" v-model="info.remark" type="text" class="dt-input" placeholder="选填"
                     :class="{'input': true}">
            </p>
          </div>
        </div>
        <div class="form-group  center-grid">
          <div class="center-margin">
            <button type="button" @click="confirm()" class="btn btn-success"><i class="fa fa-check"></i>确定</button>
            <button type="button" @click="cancel()" class="btn btn-default">取消</button>
          </div>
        </div>
      </form>
    </section>
    <div class="address-popup">
      <div class="address-wrap">
        <div class="form-group current-address">
          <span v-if="info.address">已设地址:&nbsp&nbsp&nbsp&nbsp{{info.address}}</span>
        </div>
        <div class="select-wrap">
          <div class="form-group max-width-300 set-province">
            <vue-select2 :ajax=true :multiple="false" :paging="false"
                         :ajax-url="provinceOptions.ajaxUrl"
                         :placeholder="provinceOptions.placeholder"
                         :evt-selected="provinceOptions.evtSelected"
                         :init-data="provinceOptions.initData"></vue-select2>
          </div>
          <div class="max-width-300 form-group set-city">
            <vue-select2 :ajax=true :multiple="false" :paging="false"
                         :ajax-url="cityOptions.ajaxUrl"
                         :placeholder="cityOptions.placeholder"
                         :evt-selected="cityOptions.evtSelected"
                         :init-data="cityOptions.initData" ref="city"></vue-select2>
          </div>
          <div class="max-width-300 form-group set-country">
            <vue-select2 :ajax=true :multiple="false" :paging="false"
                         :ajax-url="countryOptions.ajaxUrl"
                         :placeholder="countryOptions.placeholder"
                         :evt-selected="countryOptions.evtSelected"
                         :init-data="countryOptions.initData" ref="country"></vue-select2>
          </div>
        </div>
        <div class="footer-btn-wrapper btn-footer">
          <button type="button" class="btn btn-info btn-address-conform" @click="addressConfirm()" disabled>确定</button>
          <button type="button" class="btn btn-info" @click="addressCancel()">取消</button>
        </div>
      </div>
    </div>
    <div class="map-popup">
      <div class="map-wrap">
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
  </div>
</template>
<script>
  import GlobalEnum from '../../../managers/enum/global-enum';
  import * as tableConfig from "../../../managers/configs/dataTable.js"
  export default {
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
              window.mainConfig.http.projectAdd(info, superId, superName).then((response) => {
                this.$router.push({path: '/project/list'});
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
              window.mainConfig.http.projectModify(info, superId, superName).then((response) => {
                this.$router.push({path: '/project/list'});
                toastr.info('修改成功!');
              }, (response) => {
                toastr.error('通信失败');
              });
            }.bind(this)
          }
        },
        provinceOptions: {
          initData: [],
          placeholder: '省份',
          evtSelected: function (evt, data) {
            this.cityId = null;
            this.countryId = null;
            this.cityText = '';
            this.countryText = '';
            this.$refs.city.clear(true);
            this.$refs.country.clear(true);
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
            this.$refs.city.enable();
            $('.btn-address-conform').attr('disabled', false);
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getProvincePage(0);
          }.bind(this)
        },
        cityOptions: {
          initData: [],
          placeholder: '城市',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.countryId = null;
              this.countryText = '';
              this.$refs.country.clear(true);
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
            this.$refs.country.enable();
            $('.btn-address-conform').attr('disabled', false);
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getCityOrCountryPage(this.provinceId);
          }.bind(this)
        },
        countryOptions: {
          initData: [],
          placeholder: '城区/乡镇',
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
            $('.btn-address-conform').attr('disabled', false);
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getCityOrCountryPage(this.cityId);
          }.bind(this)
        },
        superOrgOptions: {
          initData: [],
          placeholder: '请选择受监管单位',
          resultAdd: [{id: 'null', name: '无'}],
          evtSelected: function (evt, data) {
            if (data && data.length > 0 && data[0].id !== 'null') {
              this.info.superOrganization = data[0].obj;
            } else {
              this.info.superOrganization = {};
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getSuperOrganizationsPage(this.accountId);
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
      };
    },
    computed: {
      info(){
        return this.$store.getters.info;
      },
      operation () {
        let operation = _.find(this.operations, function (p) {
          return p.path === this.$route.params.operation;
        }.bind(this));
        return operation;
      }
    },
    mounted () {
      this.accountId = window.session.getObj(window.sessionKeys.ACCOUNT).id;
      if (!this.info || !this.info.id) {
        this.info.id = uuid.v4();
        this.info.address = '';
        this.info.createDate = window.globalTool.formatDate(new Date());
        this.info.organizationId = window.session.getObj(window.sessionKeys.ACCOUNT).organizationId;
      } else if (this.info && this.info.id) {
        this.setLng = this.info.lng;
        this.setLat = this.info.lat;
      } else {
        console.error('自定义错误: Here is mistake with info Object');
      }
      this.initDateRangePicker();
      this.initSuperOrg(this.info.superOrganization);
      this.initProjectType(this.info.type);
      this.initWorkState(this.info.workState);
      this.hidePopup();
    },
    methods: {
      initSuperOrg(superOrg){
        if (superOrg && superOrg.id) {
          this.$refs.superOrg.update([superOrg]);
        }
        else {
          this.$refs.superOrg.update([{id: 'null', name: '无'}])
        }
      },
      initProjectType(num){
        let data = _.find(GlobalEnum.projectTypes, (t) => t.value === num);
        if (data) this.$refs.type.initLocal([data]);
      },
      initWorkState(num){
        let data = _.find(GlobalEnum.workStates, (t) => t.value === num);
        if (data) this.$refs.workState.initLocal([data]);
      },
      confirm () {
        this.$validator.validateAll().then((result) => {
          if (!result) {
            toastr.warning('格式错误,请填写完整');
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
            this.info.createDate = window.globalTool.formatDate(new Date());
            this.info.endDate = window.globalTool.formatDate(new Date());
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
        });
      },
      cancel(){
        this.$router.push({path: '/project/list'});
      },
      mapLoad(){
        $(".map-popup").fadeIn();
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
        $('#ads').val(this.info.address);
        $(".map-popup").fadeOut();
      },
      mapCancel(){
        this.newLat = null;
        this.newLng = null;
        $(".map-popup").fadeOut();
      },
      addressLoad(){
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
        } else {
          this.$refs.city.disable();
          this.$refs.country.disable();
        }
        $('.address-popup').fadeIn();
      },
      addressConfirm(){
        this.info.address = this.provinceText + this.cityText + this.countryText;
        $('#ads').val(this.info.address);
        $('.address-popup').fadeOut();
      },
      addressCancel(){
        this.provinceId = this.oldProvince.id;
        this.provinceText = this.oldProvince.text || "";
        this.cityId = this.oldCity.id;
        this.cityText = this.oldCity.text || "";
        this.countryText = this.oldCountry.text || "";
        $('.address-popup').fadeOut();
      },
      hidePopup(){
        const _this = this;
        $('.address-popup,.map-popup').click(function () {
          _this.mapCancel();
          _this.addressCancel();
        });
        $('.address-popup .address-wrap,.map-popup .map-wrap').click(function (e) {
          e.stopPropagation();
        })
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
        const _this = this;
        $("#start").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          startDate: _this.info.startDate,
          locale: {
            firstDay: 1,
            applyLabel: '确认',
            cancelLabel: '取消',
            customRangeLabel: '自定义范围',
            format: 'YYYY-MM-DD',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          },
        }, function (date) {
          _this.info.startDate = _this.getDate(date);
        });
        $("#end").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          startDate: _this.info.endDate,
          locale: {
            firstDay: 1,
            applyLabel: '确认',
            cancelLabel: '取消',
            customRangeLabel: '自定义范围',
            format: 'YYYY-MM-DD',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          },
        }, function (date) {
          _this.info.endDate = _this.getDate(date);
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .main {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .content {
    position: relative;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .control-label {
    padding-top: 0;
  }

  @media screen and(max-width: 768px) {
    .control-label {
      text-align: left;
    }
  }

  .col-no-padding {
    padding-right: 0;
    padding-left: 0;
  }

  input {
    background: transparent;
  }

  label {
    text-align: right;
    margin-top: 5px;
    white-space: nowrap;
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
  }

  .input-group-addon {
    width: 1%;
    padding: 5px 12px;
    font-size: inherit;
    font-weight: 700;
    line-height: 1;
    color: #555;
    text-align: center;
    display: table-cell;
    white-space: nowrap;
    vertical-align: middle;
    background: transparent;
    border: 0;
    border-radius: 0;
  }

  p.margin-bottom-0 { /* 消除 p 标签原有margin-bottom:10px*/
    margin-bottom: 0;
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

  .map-popup, .address-popup {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
  }

  /*@media screen and (max-width: 768px) {*/
  /*.map-popup, .address-popup {*/
  /*width: 50%;*/
  /*}*/
  /*}*/

  .map-wrap {
    position: absolute;
    top: 7%;
    left: 50%;
    width: 80%;
    height: 50%;
    padding: 10px;
    background-color: #fff;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0 3px 15px #fff;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%)
  }

  .address-wrap {
    position: absolute;
    top: 20%;
    left: 50%;
    width: 500px;
    height: 300px;
    padding: 10px;
    background-color: #fff;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0 3px 15px #fff;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%)
  }

  .max-width-300 {
    max-width: 500px;
    min-width: 300px;
    margin: 0 auto 15px auto;
  }

  .addressSelect {
    font-size: 2em;
    text-align: center;
    color: #3399ee;
  }

  .current-address {
    font-family: "Microsoft JhengHei", "Microsoft MHei", sans-serif;
    text-align: center;
    margin: 15px auto;
    font-size: 1.2em;
    color: #3399ee;
    font-weight: bolder;
    height: 35px;
    line-height: 35px;
  }

  .select-wrap {
    position: relative;
    width: 100%;
    top: 10%;
    display: grid;
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
    .select-wrap {
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
