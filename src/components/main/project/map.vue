<template>
  <div class="map-wrap">
    <div id="mapDiv"></div>
    <!--<right-sidebar :info.sync="info"></right-sidebar>-->
  </div>
</template>
<script>
  import rightSidebar from "../../utility/right-sidebar.vue";
  export default {
    components: {
      'right-sidebar': rightSidebar
    },
//    props: {
//      info: {
//        type: Object,
//        required: true
//      }
//    },
    data () {
      return {
        map: null,
        account: null,
        timer: null,//悬停的计时器。
        lnglats: [],//点数据。
        customerWinInfo: null,//鼠标移动上去显示的信息窗口
        markers: [],
        projectData: [],
        status: null,
      };
    },
    route: {
      activate: function (transition) {
        let accountId = window.session.getObj(window.sessionKeys.ACCOUNT).id;
        window.mainConfig.http.getProjectPage_R(accountId).then((response) => {
          let projects = response.data;
          if (transition.from.path === '/login') {
            if (projects.length === 1) {
              window.session.setObj(window.sessionKeys.PROJECT, projects[0]);
              this.$router.push({path: '/project/situationInfo/realTime'});
            } else {
              transition.next();
            }
          } else {
            transition.next();
          }
        }, (response) => {
          console.log(response);
        });
      },
      deactivate: function (transition) {
//        $.AdminLTE.controlSidebar.close();
        setTimeout(transition.next, 10);
      }
    },
    mounted (){
      this.loadData(window.session.getObj(window.sessionKeys.ACCOUNT).id);
//      this.getProjectIdsExistMap();
    },
    methods: {
      loadData(accountId){
        window.mainConfig.http.getProjectPage_R(accountId).then((response) => {
          this.lnglats = response.data;
          if (this.lnglats.length > 0) {
            if (this.lnglats.length === 1) {
//                  this.$router.push({path: '/project/situationInfo/realTime'});
              window.session.setObj(window.sessionKeys.PROJECT, this.lnglats[0]);
//                  return;
            }
            //预留功能。为给各项目添加状态字段
            for (let i = 0, len = this.lnglats.length; i < len; i++) {
              this.lnglats[i].Status = 1;
            }
            this.loadMap();
            this.drawTMakers();
            this.addTEvent();
          } else {
            this.loadMap();
          }
        }, (response) => {
          this.loadMap();
          toastr.error("获取工程列表失败，请刷新重试！")
        })
      },
      //加载基本地图和导航
      loadMap(){
        try {
          this.map = new TMap("mapDiv"); //初始化地图对象
          this.map.centerAndZoom(new TLngLat(113.3893, 23.04954), 4);//设置显示地图的中心点和级别
          this.map.enableHandleMouseScroll(); //允许鼠标双击放大地图
        } catch (err) {
          ``
//                    alert('天地图加载不成功，请稍候再试！你可以先使用其他功能！');
        }
      },

      //绘制多个marker。
      drawTMakers(){
        this.markers.length = 0;
        if (this.lnglats.length !== 0) {
          let iconurl = '../static/image/pointOnline.jpg';
          let iconurl1 = '../static/image/pointOffline.jpg';
          let icon = new TIcon(iconurl, new TSize(20, 20), {anchor: new TPixel(12, 12)});//两种图标，根据status判断用哪一种。
          let icon1 = new TIcon(iconurl1, new TSize(20, 20), {anchor: new TPixel(12, 12)});
          for (let i = 0, len = this.lnglats.length; i < len; i++) {
            if (this.lnglats[i].Status === 1) {
              this.markers[i] = this.drawTMaker(this.lnglats[i], icon);
            } else {
              this.markers[i] = this.drawTMaker(this.lnglats[i], icon1);
            }
            this.markers[i].id = i;
          }
        }
      },

      //往地图上添加一个marker。传入参数坐标信息lnglat。传入参数图标信息。
      drawTMaker(lnglat, icon){
        let marker = new TMarker(new TLngLat(lnglat.lng, lnglat.lat), {icon: icon});
        this.map.addOverLay(marker);
        return marker;
      },
      //鼠标移动到移动站上面的时候执行
      onMouseOver(m) {
        this.info = this.lnglats[m.id];
        let html = [];
        this.status = this.lnglats[m.id].Status === 1 ? '正常' : '预警';
        html.push("	<div class='opt_station_hover' id='device_online'>");
        html.push("		<ul class='opt_station_hover_ul'>");
        html.push("	<li class='opt_li_left'><span>名称：</span>" + this.lnglats[m.id].name + "</li>");
        html.push("	<li class='opt_li_left'><span>在线状态：</span>" + this.status + "</li>");
//        html.push("	<li><span class='opt_li_left'>测点总数：</span>" + 5 + "</li>");
//        html.push("	<li><span class='opt_li_left'>传感器总数：</span>" + 2 + "</li>");
//                html.push("			<img src='../static/image/arrow.png'>");
        html.push("		</ul>");
        html.push("	</div>");
        let config = {
          offset: new TPixel(3, -120),
          position: m.getLngLat()
        };
        this.customerWinInfo = new TLabel(config);
        this.customerWinInfo.setTitle("项目详情");
        this.customerWinInfo.setLabel(html.join(''));
        this.customerWinInfo.setAnchorPer([0.5, 0]);//偏移量
        this.customerWinInfo.getObject().style.zIndex = 10000;
//                this.customerWinInfo.setNoWrap(true);
        this.map.addOverLay(this.customerWinInfo);
        $('.opt_station_hover').parent().css({
          "border": "none",
          "padding": "0",
          "background-color": ""
        });
      },

      //加载mouseover与mouseout事件。
      //iconMakers是已添加的标注对象。
      //lnglats是每个点的数据对象。通常iconMakers的length等于lnglats的length。
      //eventFn是传入 鼠标移动上去要调用哪个函数。默认是onMouseOver。主要是用于鼠标移动到点上可以显示出不同样式的窗口。
      addTEvent(){
        let component = this;
        let projects = component.lnglats;
        let eventFn = eventFn || component.onMouseOver;
        for (let i = 0, len = projects.length; i < len; i++) {
          component.markers[i].id = i;
          // 绑定事件
          (function () {
            let m = component.markers[i];
            let project = component.lnglats[m.id];
            TEvent.addListener(m, "mouseover", function () {
              eventFn(m);
//              $.AdminLTE.controlSidebar.open();
//              let data = _.find(component.projectData, (p) => {
//                return p.id === project.id;
//              });
//              if (data) {
//                let info = {},
//                    pointCount = _.size(info.pointRelSensor).sensorCount = _.size(info.pointRelSensor);
//                info.id = data.id;
//                info.name = data.name;
//                info.Status = component.status;
//                info.pointCount = pointCount;
//                info.pointList = data.pointRelSensor;
//                console.log(info);
//                console.log(pointCount);
//                component.$broadcast('change', info);
//              }

//              component.timer = setTimeout(mover, 200);//setTimeout不能带参数，所以用下面的方法处理。
              function mover() {
                eventFn(m);
              }
            });
            TEvent.addListener(m, "mouseout", function () {
              component.map.removeOverLay(component.customerWinInfo);
            });
            TEvent.addListener(m, "click", function (e) {
//                            console.log(this.lnglats[m.id]);
//                          var lonlat = this.map.fromContainerPixelToLngLat(e);
//                          console.log(lonlat);
//                          console.log(lonlat.lngNTU /100000);
//                          console.log(lonlat.latNTU/100000);
//                          this.info=lonlat;
              component.info = component.lnglats[m.id];
              window.session.setObj(window.sessionKeys.PROJECT, component.info);
              component.$router.push({path: '/project/situationInfo/realTime'});
            });
          })();
        }
      },

      /**
       * 获取账号下所有已上传项目地图的项目ID列表
       * @param organizationId
       */
      getProjectIdsExistMap () {
        window.mainConfig.http.getProjectIdsExistMap().then((response) => {
          window.session.setObj(window.sessionKeys.PROJECTIDSEXISTMAP, response.data);
//                    console.log(response.data);
//                    console.log(window.session.getObj(window.sessionKeys.PROJECTIDSEXISTMAP));
        }, (response) => {
          toastr.error(JSON.stringify(response));
        });
      },


//          MapClick(){
//              let e = window.event || arguments[0];
//              let lonlat = map.getLonLatFromPixel(e.xy);
//              alert("You clicked near " + lonlat.lat + " N, " +
//                      + lonlat.lon + " E");
//
//              alert(e.lnglat.getLng()+","+e.lnglat.getLat());
//
//          }
    }
  } ;
</script>

<!--</style>-->
<style type="text/css">
  .map-wrap {
    height: 100%;
  }

  #mapDiv {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(225, 225, 225, 0.3);
  }

  .opt_station_hover {
    display: grid;
    background: rgb(76, 159, 204);
    font-size: 12px;
    width: 310px;
    height: 90px;
    border-radius: 5px;
    opacity: 0.8;
    box-shadow: 0 0 10px 2px rgba(76, 159, 204, 0.7);
  }

  .opt_station_hover_ul {
    width: inherit;
    list-style: none;
    margin: auto;
    padding: 0;
    line-height: 23px;
    text-indent: 4px;
    color: white;
    position: relative;
  }

  .opt_station_hover_ul li {
    list-style: none;
    /*margin: 0;*/
    /*padding: 0;*/
    overflow: hidden;
    /*height: 23px;*/
    width: 100%;
    text-align: center;
    font-size: 1.2em;
    white-space: normal;
  }

  .opt_station_hover img {
    position: absolute;
    left: 50%;
    margin-left: -5px;
  }

  .opt_li_left {
  }

</style>
