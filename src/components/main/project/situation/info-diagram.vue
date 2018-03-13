<template>
  <!-- modal for adding MonitorPoint-->
  <div id="modal" class="modal fade" id="exampleModal" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
          <h3 class="modal-title" id="exampleModalLabel" style="text-align: center;color:#0090b5 ">监测点点位的添加</h3>
        </div>
        <div class="modal-body">
          <form role="form" novalidate enctype="multipart/form-data" id="dataForm" method="post" name="dataForm">
            <div class="form-group select2-bootstrap-prepend">
              <div class="input-group " style="margin-bottom: 20px">
                <label class="input-group-addon addon-label">监测项</label>
                <vue-select2 :ajax=true :paging=false :iscode=false :multiple=false
                             v-ref:item-selector
                             :ajax-url="monitorItems.ajaxUrl"
                             :init-data="monitorItems.initData"
                             :placeholder="monitorItems.placeholder"
                             :evt-selected="monitorItems.evtSelected">

                </vue-select2>
              </div>
              <div class="input-group">
                <label class="input-group-addon addon-label">测点</label>
                <vue-select2 :ajax=true :paging=false :iscode=false :multiple=false
                             v-ref:point-selector
                             :ajax-url="monitorPoints.ajaxUrl"
                             :init-data="monitorPoints.initData"
                             :placeholder="monitorPoints.placeholder"
                             :evt-selected="monitorPoints.evtSelected">
                </vue-select2>
              </div>
              <!--<input name="monitorItem" id="monitorItem" style="visibility: hidden">-->
              <!--<input name="monitorPoint" id="monitorPoint" style="visibility: hidden">-->
              <input name="vdata" id="vdata" style="visibility: hidden">
            </div>
            <!--<div class="form-group">-->
            <!--<label  class="control-label">经度:</label>-->
            <!--<input v-model="pro.lng"  type="text" class="form-control" id="lng">-->

            <!--</div>-->
            <!--<div class="form-group">-->
            <!--<label class="control-label">纬度:</label>-->
            <!--<input v-model="pro.lat" type="text" class="form-control" id="lat">-->
            <!--</div>-->
            <div class="modal-footer">
              <button id="save" type="button" class="btn btn-primary" @click="saveData()">保存</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!--<div id="popup"></div>-->
  <!--div for projectMap-->

  <div style="height: 2vh"></div>
  <div>
    <div class="box box-warning">
      <div class="box-body">
        <div class="row" style="height: 72vh">
          <div class=" col-xs-11 col-md-12 col-lg-11 ">
            <div id="map" class="map" style=" width:100%;height: 72vh;position: absolute;"></div>
            <div id='map1' style=" width:100%;height: 70vh;position: absolute;display: none">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"></div>
  </div>
 <div>
   <button id="removePoint" class="btn btn-info" style="margin-left: 10px" @click ="showButton()"><i class="fa fa-edit"></i>操作/隐藏</button>
 </div>
  <div style="display: none; margin-top: 5px" id="operation">
    <button id="addPoint" class="btn btn-info" style="margin-left: 10px" @click="addPoint()"><i class="fa fa-map-marker"></i> 添加测点</button>
    <button id="removePicture" class="btn btn-info" @click=removePicture()><i class="fa fa-trash"></i>删除地图</button>
    <button id="export-png" class="btn btn-info"><i class="fa fa-print"></i>打印地图</button>
    <span class="hidden-sm hidden-xs" id="coor" style="float: right">注：可鼠标拖动点修改测点位置</span>
  <div style="text-align: center">
    <div class="row" style="height: 5vh"></div>
    <label id="message">支持.jpg、.jpeg格式的图片，暂不支持.dwg等CAD格式的图片(图片大小 < 2500 * 1024)</label>
    <div id="loading" style="display: none;">正在上传.....</div>
    <form enctype="multipart/form-data" id="uploadForm" method="post" name="uploadForm">
      <div class="box-footer">
        <input id="file" type="file" name="file" style="" accept="image/*" class="col-md-5">
        <input id="projectId" name="projectId" v-model="projectId" style="display: none">
        <div class="row" style="height: 5vh"></div>
        <input type="button" value="上传" @click="doUpload()" class="btn btn-block btn-info">
      </div>
    </form>
  </div>
  </div>
</template>
<script>
  export default {
    props: {
      info: {
        type: Object,
        required: true
      },
    },
    data () {
      return {
        formDataInfo: new FormData(),
        canRequest: true,
        app: {},
        relId: null,
        monitorItemId: null,
        monitorPointId: null,
        monitorPointName: null,
        extent: null,
        projection: null,
        myMap: null,
        projectId: null,
        geoJsonObject: null,
        markerSource: null,
        currentPointCoord: null,
        formData: null,
        vectorLayer: null,
        lng: null,
        lat: null,
        geoJson: null,
        center: [],
        vector: null,
        monitorItems: {
          initData: [],
          placeholder: '请选择监测项',
          evtSelected: function (evt, data) {
            if (data && data.length > 0) {
              this.monitorItemId = data[0].id;
              $('#monitorItem').val(this.monitorItemId);
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getMonitorItemPage_U(this.projectId);
          }.bind(this)
        },
        monitorPoints: {
          initData: [],
          placeholder: '请选择监测点',
          evtSelected: function (evt, data) { //点选了某个选项之后会触发的回调函数
            if (data && data.length > 0) {
              this.monitorPointId = data[0].id;
              this.monitorPointName = data[0].text;
              $('#monitorPoint').val(this.monitorPointId);
            }
          }.bind(this),
          ajaxUrl: function () {
            return window.mainConfig.url.getRelPointOfItems(this.monitorItemId);
          }.bind(this)
        },
      };
    },
    computed: {
      operation () {
        var operation = _.find(this.operations, function (p) {
          return p.path === "add";
        }.bind(this));
        return operation;
      }
    },
    mounted () {
      this.projectId = window.session.getObj(window.sessionKeys.PROJECT).id;
      this.initMap();

      var monitorItemId='ok';

      this.monitorItemId='ok';

      window.monitorPointId='ok';
//      this.dragPoint();
//      this.initOL();
    },
    methods: {
      initMap() {
        let self = this;
        var geoJson = {
          'type': 'FeatureCollection',
          'crs': {
            'type': 'name',
            'properties': {
              'name': 'EPSG:4326'
            }
          },
          'features': []
        };
        window.mainConfig.http.getItemPointParams(this.projectId).then((response) => {
          let responseData = response.data;
          for (let i = 0, len = responseData.length; i < len; i++) {
            let coordinates = JSON.parse(responseData[i].pointParam).coordinate;
            let geoObj = {
              'type': "Feature",
              'id': [responseData[i].projectId, responseData[i].monitorItemId, responseData[i].monitorPointName],
              'geometry': {
                'type': "Point",
                'coordinates': coordinates
              }
            };
            geoJson.features.push(geoObj);
          }
          this.markerSource = new ol.source.Vector({ //矢量源
            projection: 'EPSG:4326',
            features: (new ol.format.GeoJSON()).readFeatures(geoJson),
          });
          initOL(this.markerSource);
        }, (response) => {
          console.error(response);
        });
        function initOL(markerSource) {
          //监测点点位的移动
          self.app.Drag = function () {
            ol.interaction.Pointer.call(this, {
              handleDownEvent: self.app.Drag.prototype.handleDownEvent,
              handleDragEvent: self.app.Drag.prototype.handleDragEvent,
              handleMoveEvent: self.app.Drag.prototype.handleMoveEvent,
              handleUpEvent: self.app.Drag.prototype.handleUpEvent,
              handleUpEvent: self.app.Drag.prototype.handleDoneEvent
            });
            this.coordinate_ = null;
            this.cursor_ = 'pointer';
            this.feature_ = null;
            this.previousCursor_ = undefined;
          };
          ol.inherits(self.app.Drag, ol.interaction.Pointer);
          self.app.Drag.prototype.handleMoveEvent = function (evt) { //鼠标在图上移动触发 拖动底图时也会触发
            if (this.cursor_) {
              var map = evt.map;
              var feature = map.forEachFeatureAtPixel(evt.pixel,
                  function (feature) {
                    return feature;
                  });
              var element = evt.map.getTargetElement();
              if (feature) {
                if (element.style.cursor !== this.cursor_) {
                  this.previousCursor_ = element.style.cursor;
                  element.style.cursor = this.cursor_;
                }
              } else if (this.previousCursor_ !== undefined) {
                element.style.cursor = this.previousCursor_;
                this.previousCursor_ = undefined;
              }
            }
          };
          self.app.Drag.prototype.handleDownEvent = function (evt) { //点击鼠标左键触发
            var map = evt.map;
            var feature = map.forEachFeatureAtPixel(evt.pixel,
                function (feature) {
                  return feature;
                });

            if (feature) {
              this.coordinate_ = evt.coordinate;
              this.feature_ = feature;
            }

            return !!feature;
          };

          self.app.Drag.prototype.handleDragEvent = function (evt) { //鼠标拖动点时触发
            var deltaX = evt.coordinate[0] - this.coordinate_[0];
            var deltaY = evt.coordinate[1] - this.coordinate_[1];

            var geometry = this.feature_.getGeometry();
            geometry.translate(deltaX, deltaY);
            this.coordinate_[0] = evt.coordinate[0];
            this.coordinate_[1] = evt.coordinate[1];
            $('.ol-popup').hide();
            self.canRequest = false;
          };
          self.app.Drag.prototype.handleUpEvent = function () {
            this.coordinate_ = null;
            this.feature_ = null;
            return false;
          };

          self.app.Drag.prototype.handleDoneEvent = function (evt) { //鼠标拖动结束（放开鼠标键）后触发
            $('#modal').modal('show');
            $('.ol-popup').hide();
            self.canRequest = false;
            self.currentPointCoord = evt.coordinate;
            $('#vdata').val(JSON.stringify({coordinate: self.currentPointCoord}));
          };

          var vectorLayer = new ol.layer.Vector({ //创建矢量图层
            source: markerSource,  //放入矢量源
            style: new ol.style.Style({
              fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.7)'
              }),
              stroke: new ol.style.Stroke({
                color: '#0099ff',
                width: 2
              }),
              image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                  color: '#0099ff'
                })
              })
//            image: new ol.style.Icon(({
//              anchor:[0.5,0.96],
//              crossOrigin:'anonymous',
//              src: './static/image/pointOnline.jpg',
//            }))
            })
          });
          var extent = [0, 0, 930, 600];
          var projection = new ol.proj.Projection({
            code: 'xkcd-image',
            units: 'pixels',
            extent: extent
          });

          self.myMap = new ol.Map({
            interactions: ol.interaction.defaults().extend([new self.app.Drag()]),
            layers: [
              new ol.layer.Image({
                source: new ol.source.ImageStatic({
//                url: './static/image/sidebar-5.jpg',//这里添加静态图片的地址
                  url: window.mainConfig.url.getProjectMap(self.projectId),
                  projection: projection,
                  imageExtent: extent
                })
              }),
            ],
            logo: false,
            target: 'map',
            view: new ol.View({
              projection: projection,
              center: ol.extent.getCenter(extent),
              zoom: 2,
              minZoom: 1,
              maxZoom: 8
            }),
          });

          self.myMap.addLayer(vectorLayer);
          //项目地图刷新
          function refreshMap(mapDiv) {
            self.myMap.setTarget(mapDiv);
            self.myMap.updateSize();
          }

          //项目地图的打印
          $('#export-png').click(function () {
            var oldHtml = document.body.innerHTML;
            var printHtml = document.getElementById('map1').outerHTML;
            document.body.innerHTML = printHtml;
            var printDiv = document.getElementById('map1');
            printDiv.style.display = 'block';
            setTimeout(() => {
              refreshMap("map1");
              window.print();
              document.body.innerHTML = oldHtml;
              setTimeout(() => {
                document.getElementById("map").innerHTML = "";
                refreshMap("map");
              })
            }, 100);
          });

          var popup = new ol.Overlay({
            element: document.getElementById('popup'),
          });

          //鼠标移动到测点上显示测线实时数据
          self.myMap.on('pointermove', function (e) {
//            var format = e.coordinate;
//            $('#coor').html('经度:' + format[0].toFixed(4) + ' &nbsp纬度:' + format[1].toFixed(4));//鼠标移动实时显示坐标信息
            var pixel = self.myMap.getEventPixel(e.originalEvent);
            var feature = self.myMap.forEachFeatureAtPixel(pixel, function (feature) {
              return feature;
            });
            if (feature) {
              if (self.canRequest) {
                var ids = feature.getId('id');
                self.projectId = ids[0];
                let monitorItemId = ids[1];
                let monitorPointName = ids[2];
                self.canRequest = false;
                window.mainConfig.http.getDetailsInfo(self.projectId, monitorPointName, monitorItemId).then((response) => {
                  var info = response.dataText;
//                  console.log(info);
                  $('.ol-popup').show();
                  popup.setPosition(e.coordinate);
                  self.myMap.addOverlay(popup);
                  var element = popup.getElement();
                  let piece = info.split(/,|;/);
                  let divs = '<div class="overlay">' + monitorPointName + ' :</div>';
                  for (let i = 0; i < piece.length; i++) {
                    divs = divs + '<div class="overlay">' + piece[i] + '</div>'
                  }
                  if (piece.length <= 0) divs = '<div class="overlay">暂无消息</div>';
                  $(element).html(divs);
                });
              }
            } else {
              $('.ol-popup').hide();
              self.canRequest = true;
            }
          });
        }
      },

      //添加点
      addPoint(){
        let self = this;
        console.log(this.myMap);
        this.myMap.on('click', function (e) {
          self.currentPointCoord = e.coordinate;
          $('#vdata').val(JSON.stringify({coordinate: self.currentPointCoord}));
          $('#modal').modal();                     // 以默认值初始化
          $('#modal').modal({keyboard: false});   // initialized with no keyboard
          $('#modal').modal('show');               // 初始化后立即调用 show 方法
        })
      },

      //保存数据到后台
      saveData(){
        let self = this;
        var markerFeature = new ol.Feature({
          geometry: new ol.geom.Point(self.currentPointCoord),
        });
        this.markerSource.addFeature(markerFeature);
        this.markerSource.refresh();
        this.formData = new FormData($("#dataForm")[0]);

        window.mainConfig.http.setItemPointParams(this.formData, this.monitorItemId, this.monitorPointId).then((response) => {
          $('#modal').modal('hide');
//          $("#operation").hide();
          this.initMap();
          if (response.data && response.data.errcode) {
            if (response.data.errcode !== 0) {
              toastr.error(response.data.meesage);
            } else {
              toastr.success(response.data.meesage);
            }
          }
        }, (response) => {
          toastr.error('通信失败');
        });

      },


      //上传图片
      doUpload() {
//        const component = this;
        // 检查文件大小,前端拦截
        var oFile = document.getElementById("file").files;
        if (oFile == null || oFile.length == 0) {
          toastr.info('请先选择需要上传的图片，再点击上传！');
          return;
        }
        if (oFile[0].size > 2500 * 1024) {
          toastr.info('图片太大!');
          return;
        }
        $('#loading').show();
        this.formDataInfo = new FormData($("#uploadForm")[0]);
//          formData.append("projectId", this.projectId);
        window.mainConfig.http.uploadProjectMap(this.formDataInfo, this.projectId).then((response) => {
              $('#loading').hide();
              $('#message').hide();
              document.getElementById("map").innerHTML = "";
              this.initMap();
              toastr.info('上传成功!');
            },
        );
      },

      //删除上传的项目图片
      removePicture() {
        const self = this;
        layer.open({
          icon: 3,
          title: '<h4 style="color: #4898d5;font-weight: bold">删除项目地图</h4>',
          content: '<div style="color: #c39e00;font-size: 1.1em;">您确定删除此项目地图吗?</div>',
          btn: ['确定', '取消'],
          yes: function (index, layero) {
            window.mainConfig.http.deleteProjectMap(self.projectId).then((response) => {
              document.getElementById("map").innerHTML = "";
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
      },
      //隐藏按钮信息
      showButton(){
        $("#operation").toggle();
//        $("#operation").show();
      }
    }
  };
</script>

<style lang="scss" scoped>
  html, body {
    height: 99%;
    width: 99%;
  }

  #map {
    width: 100%;
    /*height: 60vh;*/
    border: none;
    margin: 15px 0px 0px 15px;
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
  }

  .modal {
    text-align: center;
    color: #0090b5;
  }

  @import url(https://fonts.googleapis.com/css?family=Open+Sans);
  html,
  body,
  body {
    font: 1em/1.5 "Open Sans", Helvetica, Arial, sans-serif;
    color: #222;
    font-weight: 400;
  }

  .ol-control button {
    background-color: rgba(40, 40, 40, 0.8) !important;
  }

  .ol-control button:hover {
    background-color: rgba(40, 40, 40, 1) !important;
  }

  .ol-popup {
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
  }

  .ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }

  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }

  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
  }

  .ol-popup-closer:after {
    content: "✖";
  }
</style>


