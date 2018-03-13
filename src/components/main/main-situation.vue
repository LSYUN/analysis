<template xmlns="http://www.w3.org/1999/html">
  <div class="">
    <div class="head">
      <label id="name" class="head-child project-name">namenamenamenamenamenamenamenamenamename</label>
      <div class="">
        <ul class="nav navbar-nav">
          <!--<li><a v-link="{path:'/project/situationInfo/diagram'}">工程简图</a></li>-->
          <li v-link-active><a v-link="{path:'/situation/history'}">历史数据</a></li>
          <li v-link-active><a v-link="{path:'/situation/analysis'}">数据分析</a></li>
          <li v-link-active><a v-link="{path:'/situation/relevance'}">关联分析</a></li>
          <li v-link-active><a v-link="{path:'/situation/realTime'}">实时数据</a></li>
        </ul>
      </div><!-- /.navbar-collapse -->
      <button class="head-child btn-return">go back</button>
    </div>
    <div>
      <router-view :info.sync="info"></router-view>
    </div>
  </div>
</template>
<script>
  import '../../assets/css/situation.scss';
  export default {
    props: {},
    data () {
      return {
        info:{}
      };
    },
    components: {},
    mounted () {
    },
    methods: {}
  };
</script>
<style lang="scss" scoped>
</style>
