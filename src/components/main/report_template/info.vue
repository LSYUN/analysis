<template>
  <div class="main">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <navigation-path :path-key=operation.pathKey></navigation-path>
    </section>
    <section class="content content-overflow">
      <h4 class="info-title">{{operation.title}}</h4>
      <div class="box box-info box-solid">
        <validator name="validation">
          <form role="form" novalidate>
            <div class="box-body">
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1"><label for="inputName"><span class="span-necessary">*</span>
                  机构名称:</label></div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <input type="text" class="form-control" v-model="info.name" v-validate:login-name="['required']"
                         id="inputName" placeholder="请设置机构名称">
                  <div class="errors vue-error-bottom">
                    <p v-if="$validation.loginName.dirty && $validation.loginName.required">
                      请设置机构名称</p>
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1"><label><span class="span-necessary">*</span> 机构类型:</label></div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <select class="form-control" v-model="info.organizationType">
                    <option value="" title="请选择机构类型" v-bind:selected="!info.organizationType" disabled>请选择机构类型</option>
                    <option v-for="option in organizationTypes" :value="option.value"
                            :selected="option.value === info.organizationType ? true : false">{{ option.text }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1"><label><span class="span-necessary">*</span> 机构地址:</label></div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <div class="row">
                    <div class="col-sm-10 div-margin-bottom">
                      <input type="text" class="form-control" v-model="info.address" id="address" placeholder="请设置"
                             v-validate:address="['required']"></div>
                    <div class="col-sm-2 div-margin-bottom btn-addon">
                      <button class="btn table-title-button" @click="loadSelects()">省市区</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1"><label><span class="span-necessary">*</span> 经纬度:</label></div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <div class="row">
                    <div class="col-sm-5 div-margin-bottom">
                      <div class="input-group">
                        <span class="input-group-addon">经度</span>
                        <input type="number" id="lng" class="form-control" v-model="setLng"
                               placeholder="请设置" v-validate:lat="['required']">
                      </div>
                      <div class="errors vue-error-bottom">
                        <p v-if="$validation.lat.dirty && $validation.lat.required">
                          请选择或输入经度</p>
                      </div>
                    </div>
                    <div class="col-sm-5 div-margin-bottom">
                      <div class="input-group">
                        <span class="input-group-addon">纬度</span>
                        <input type="number" id="lat" class="form-control" v-model="setLat"
                               placeholder="请设置" v-validate:lng="['required']">
                      </div>
                      <div class="errors vue-error-bottom">
                        <p v-if="$validation.lng.dirty && $validation.lng.required">
                          请选择或输入纬度</p>
                      </div>
                    </div>
                    <div class="col-sm-2 div-margin-bottom btn-addon">
                      <button type="button" @click="loadMap()" class="btn table-title-button">经纬度</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="div-margin-bottom">
                <div class="col-xs-3 col-sm-2 col-lg-1"><label>&nbsp&nbsp&nbsp&nbsp备注</label></div>
                <div class="col-xs-9 col-sm-10 col-lg-11">
                  <textarea class="form-control" rows="3" v-model="info.remark" placeholder=""></textarea>
                </div>
              </div>
            </div>
            <div class="box-footer">
              <div class="btn-footer-wrapper">
                <button type="button" @click="confirm()" class="btn btn-info btn-foot">确定</button>
                <button type="button" @click="cancel()" class="btn btn-info btn-foot">取消</button>
              </div>
            </div>
          </form>
        </validator>
      </div>
    </section>
    <div class="mapPopUp">
      <div id="mapDiv" class="mapDiv">
        <div class="input-wrap">
          <div class="col-xs-6 div-margin-bottom">
            <div class="input-group">
              <span class="input-group-addon">经度</span>
              <input type="number" id="nwe-lng" class="form-control" v-model="newLng">
            </div>
          </div>
          <div class="col-xs-6 div-margin-bottom">
            <div class="input-group">
              <span class="input-group-addon">纬度</span>
              <input type="number" id="new-lat" class="form-control" v-model="newLat">
            </div>
          </div>
        </div>
        <div id="mapWrap" class="mapWrap"></div>
        <div class="box-footer">
          <div class="btn-footer-wrapper">
            <button type="button" class="btn  btn-info" @click="mapConfirm()">确定</button>
            <button type="button" class="btn  btn-info" @click="mapCancel()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="selectPopUp">
      <div id="selectDiv" class="selectDiv">
        <h3 class="addressSelect">选择地址</h3>
        <div class="form-group currentAddress">
          <span class="selectedAddress" v-show="info.address">已设地址:&nbsp&nbsp&nbsp&nbsp{{info.address}}</span>
        </div>
        <div class="selectWrapper">
          <div class="col-sm-4 div-margin-bottom set-province">
            <vue-select2
                :ajax=true :multiple="false" :paging="false"
                :ajax-url="provinceOptions.ajaxUrl"
                :placeholder="provinceOptions.placeholder"
                :evt-selected="provinceOptions.evtSelected"
                :init-data="provinceOptions.initData"></vue-select2>
          </div>
          <div class="col-sm-4 div-margin-bottom">
            <vue-select2 class="set-city" :ajax=true :multiple="false" :paging="false"
                         :ajax-url="cityOptions.ajaxUrl"
                         :placeholder="cityOptions.placeholder"
                         :evt-selected="cityOptions.evtSelected"
                         :init-data="cityOptions.initData" v-ref:city-selector></vue-select2>
          </div>
          <div class="col-sm-4 div-margin-bottom set-country">
            <vue-select2 class="set-country" :ajax=true :multiple="false" :paging="false"
                         :ajax-url="countryOptions.ajaxUrl"
                         :placeholder="countryOptions.placeholder"
                         :evt-selected="countryOptions.evtSelected"
                         :evt-selected="countryOptions.evtSelected"
                         :init-data="countryOptions.initData"
                         v-ref:country-selector></vue-select2>
          </div>
        </div>
        <div class="box-footer">
          <div class="btn-footer-wrapper">
            <button type="button" class="btn  btn-info" @click="selectConfirm()" style="margin-top:110px;">确定</button>
            <button type="button" class="btn  btn-info" @click="selectCancel()"  style="margin-top:110px;">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      'navigation-path': require('../utility/navigation-path.vue'),
      'vue-select2': require('../utility/vue-select2.vue')
    },
    props: {
      info: {
        type: Object,
        required: true
      }
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
        provinceId: null,
        provinceText: null,
        cityId: null,
        cityText: null,
        countryId: null,
        countryText: null,
        operations: {
          add: {
            title: '新增机构',
            pathKey: 'organizationAdd',
            path: 'add',
            confirm: function (info) {
              window.appContext.http.organizationAdd(info).then((response) => {
                this.$route.router.go({path: '/organization/list'});
                toastr.success('添加成功!');
              }, (response) => {
                toastr.error(response.body);
              });
            }.bind(this)
          },
          modify: {
            title: '修改机构',
            pathKey: 'organizationModify',
            path: 'modify',
            confirm: function (info) {
              window.appContext.http.organizationModify(info).then((response) => {
                this.$route.router.go({path: '/organization/list'});
                toastr.success('修改成功!');
              }, (response) => {
                toastr.error(response.body);
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
//              this.info.address = this.provinceText;
              this.info.lng = this.setLng = data[0].obj.lng;
              this.info.lat = this.setLat = data[0].obj.lat;
            } else {
              this.provinceId = null;
              this.provinceText = '';
//              this.info.address = '';
              this.info.lng = this.setLng = null;
              this.info.lat = this.setLat = null;
            }
            this.$refs.citySelector.$emit('enabled');
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
//                this.info.address = this.provinceText + this.cityText;
                this.info.lng = this.setLng = data[0].obj.lng;
                this.info.lat = this.setLat = data[0].obj.lat;
              }
            } else {
              this.cityId = null;
              this.cityText = '';
              this.info.cityCode = null;
//              this.info.address = this.provinceText;
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
//              this.info.address = this.provinceText + this.cityText + this.countryText;
              this.info.lng = this.setLng = data[0].obj.lng;
              this.info.lat = this.setLat = data[0].obj.lat;
            } else {
              this.countryId = null;
              this.countryText = '';
              this.info.cityCode = null;
//              this.info.address = this.provinceText + this.cityText;
              this.info.lng = this.setLng = null;
              this.info.lat = this.setLat = null;
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.appContext.urls.getCityOrCountryPage(this.cityId);
          }.bind(this)
        },
        organizationTypes: [
          {value: 1, text: '监测单位'}, {value: 4, text: '监管单位'}
        ]
      };
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
      if (this.info.hasOwnProperty('id') === false) {
        this.info.id = uuid.v4();
        this.info.address = '';
        this.info = Object.assign({}, this.info);
      }
      else {
        this.setLng = this.info.lng;
        this.setLat = this.info.lat;
//        if (this.info.cityList && this.info.cityList.length > 0) {
//          this.initAddressInfo(this.info.cityList);
//        } else {
//          toastr.warning('还未设置机构地址！');
//        }
      }
    },
    methods: {
      confirm () {
        if (this.$validation.valid === false) {
          toastr.info('格式错误,请填写完整!');
          return;
        }
        if (this.provinceText === null || this.cityText === null) {
          toastr.info('请选择完整的工程地址');
          return;
        } else {
          this.info.address = this.provinceText + this.cityText + this.countryText;
        }
        let info = {};
        info.id = this.info.id;
        info.name = this.info.name;
        info.address = this.info.address;
        info.cityCode = this.info.cityCode;
        info.lat = this.setLat;
        info.lng = this.setLng;
        info.isEnabled = 1;
        info.organizationType = this.info.organizationType;
        info.remark = this.info.remark;
        this.operation.confirm(info);
      },
      cancel(){
        this.$route.router.go({path: '/organization/list'});
      },
      loadMap(){
        $('.mapPopUp').fadeIn();
        let _self = this;
        var center = center = new qq.maps.LatLng(_self.setLng, _self.setLat);
        if (_self.setLng != null && _self.setLat != null) {              //若已经设置过经纬度，改变展示地图的中心和mark的位置
          center = new qq.maps.LatLng(_self.setLat, _self.setLng);       //注意：LatLng(纬度，经度)；
          _self.newLat = _self.setLat;
          _self.newLng = _self.setLng;
        } else {
          center = new qq.maps.LatLng(23.166093, 113.455239);           //设置默认值
          _self.newLat = 23.166093;
          _self.newLng = 113.455239;
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
            _self.setAddress = results.detail;                        //根据经纬度获取地区信息并赋给setAddress
          }
        });
        qq.maps.event.addListener(marker, 'dragging', function () {    //Mark拖动过程中记录经纬度，存储在newLng和newLat里
          _self.newLat = marker.getPosition().lat;
          _self.newLng = marker.getPosition().lng;
        });
        qq.maps.event.addListener(marker, 'dragend', function () {    //Mark拖动停止
          let latLng = new qq.maps.LatLng(_self.newLat, _self.newLng);
          citylocation.searchCityByLatLng(latLng);
        });
        let latLng = new qq.maps.LatLng(_self.newLat, _self.newLng);//直接获取一次地址信息，避免Mark未拖动值为空
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
        $('.mapPopUp').fadeOut();
        this.$refs.citySelector.$emit('disabled');
        this.$refs.countrySelector.$emit('disabled');
      },
      mapCancel(){
        this.newLat = null;
        this.newLng = null;
        $('.mapPopUp').fadeOut();
      },
      loadSelects(){
        $('.selectPopUp').fadeIn();
        $('.set-province.select2-selection__rendered').html(this.provinceText);
        $('.set-city.select2-selection__rendered').html(this.cityText);
        $('.set-country.select2-selection__rendered').html(this.countryText);
        if (this.provinceId) {
          this.oldProvince = {id: this.provinceId.slice(0, -1), text: this.provinceText.slice(0, -1)};
          if (this.cityId) {
            this.oldCity = {id: this.cityId.slice(0, -1), text: this.cityText.slice(0, -1)};
            if (this.countryId) {
              this.oldCountry = {id: this.countryId.slice(0, -1), text: this.countryText.slice(0, -1)};
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
      initAddressInfo(cityList){
        if (cityList && cityList.length > 0) {
          let province = cityList[0];
          let city = cityList[1];
          let country = cityList[2];
          if (province) {
            this.provinceId = province.coding;
            this.provinceText = province.name;
            this.info.address = this.provinceText;
            this.provinceOptions.initData.push({
              id: province.id,
              text: province.name,
              obj: province
            });
            if (city) {
              this.cityId = city.coding;
              this.cityText = city.name;
              this.info.address = this.provinceText + this.cityText;
              this.cityOptions.initData.push({
                id: city.id,
                text: city.name,
                obj: city
              });
              if (country) {
                this.countryText = country.name;
                this.info.address = this.provinceText + this.cityText + this.countryText;
                this.countryOptions.initData.push({
                  id: country.id,
                  text: country.name,
                  obj: country
                });
              }
            }
          } else {
            toastr.info('工程地址未能识别,请重新设置');
          }
        }
      }
    }
  };
</script>
<style scoped>
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

  .selectWrapper {
    position: relative;
    width: 100%;
    top: 20%;
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

  .currentAddress {
    font-family: "Microsoft JhengHei", "Microsoft MHei", sans-serif;
    text-align: center;
    margin: 0 auto;
    font-size: 1.2em;
    color: #15a417;
    font-weight: bolder;
  }

  @media (max-width: 768px) {
    .selectWrapper {
      top: 10%;
    }

    .box-footer .btn-footer-wrapper button {
      margin: 5px 15px;
      margin-top: 110px;
      margin-right: 15px;
      margin-left: 15px;
      /* margin-bottom: 10px; */
      margin-top: 110px;
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

  #app .col-sm-4 {
    margin-bottom: 5px;
  }
</style>

