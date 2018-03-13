<template>
  <ul class="bar-ul">
    <!--<li v-link-active><a v-link="{path:'/project/edit/alarm/alarmTolerance'}">监测项预警设置</a></li>-->
    <li v-link-active><a v-link="{path:'/project/edit/alarm/alarmPoint'}">预警设置</a></li>
    <li v-link-active><a v-link="{path:'/project/edit/alarm/alarmAccount'}">预警人员设置</a></li>
    <li v-link-active><a v-link="{path:'/project/edit/alarm/messageAccount'}">消息人员设置</a></li>
  </ul>
  <div>
    <router-view :info.sync="info" :gps.sync="gps"></router-view>
  </div>
</template>
<script>
  export default {
   /* this.info:{itemObj pointObj,relAlarmAccount,relMessageAccount},itemInfo:{null}*/
    components: {
      'alarm-account': require('../project-edit-alarm-pages/alarm-fourth-path/alarm-account.vue'),
      'message-account': require('../project-edit-alarm-pages/alarm-fourth-path/message-account.vue')
    },
    props: {
      info: {
        type: Object,
        required: true
      },
      itemInfo: {
        type: Object,
        required: false
      },
      gps: {
        type: Number,
        required: false
      }
    },
    data () {
      return {};
    },
    mounted () {
      this.itemInfo = {};
//      console.log(this.info);
    },
    methods: {}
  };
</script>
<style lang="scss" scoped>
  .bar-ul {
    width: 100%;
    padding: 0;
    margin: 0 0 5px 0;
    overflow: hidden;
    background: #f39c12;
    list-style-type: none;
    -webkit-border-radius: 60px;
    -moz-border-radius: 60px;
    border-radius: 60px;
  }

  .bar-ul > li {
    float: left;
    width: 33.33%;
    -webkit-transition: all 200ms ease-out;
  }

  .bar-ul > li a {
    font-size: 16px;
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  .bar-ul > li a:hover {
    font-size: 16px;
    font-weight: bolder;
    color: #fff;
    background-color: #1b9bff;
    border-radius: 60px;
    -webkit-transition: all 200ms ease-out;
  }

  li.v-link-active {
    color: #fff;
    font-size: 16px;
    font-weight: bolder;
    background-color: #1b9bff;
    border-radius: 60px;
  }

  @media screen and(max-width: 768px) {
    .bar-ul > li a {
      font-size: .2em;
    }

    .bar-ul > li a:hover {
      font-size: .2em;
    }
  }
</style>

