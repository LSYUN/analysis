<template>
  <div class="wrapper">
    <div style="display: none">
      <svg class="loading">
        <circle r="50"></circle>
      </svg>
    </div>
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <div class="content-wrapper">
      <div class="content-nav">
        <navigation></navigation>
      </div>
      <router-view class="content-view"></router-view>
    </div>
    <!--<app-footer></app-footer>-->
    <!--<app-control-sidebar></app-control-sidebar>-->
  </div>
</template>

<script>
  import appHeader from '../components/main/main-header.vue';
  import appSidebar from '../components/main/main-sidebar.vue';
  import navigation from './utility/navigation-path.vue';
  export default {
    components: {
      'app-header': appHeader,
      'app-sidebar': appSidebar,
      'navigation': navigation
//      'app-footer': require('./main-footer.vue'),
//      'app-control-sidebar': require('./main-control-sidebar.vue')
    },
  };
</script>
<style scoped>
  .wrapper {
    height: 100%;
  }

  .content-wrapper {
    background-color: #edf1f5;
    height: 100%;
    overflow: hidden;
  }

  .content-nav {
    padding-top: 50px;
  }

  .content-view {
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    #app .content-wrapper, #app .right-side {
      padding-top: 50px;
    }

    .content-wrapper {
      padding-top: 100px;
    }
  }
</style>
