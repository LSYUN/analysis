<template>
  <div class="wrapper">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <!--<app-footer></app-footer>-->
    <!--<app-control-sidebar></app-control-sidebar>-->
  </div>
</template>

<script>
  export default {
    components: {
      'app-header': require('./main-header.vue'),
      'app-sidebar': require('./main-sidebar.vue'),
//      'app-footer': require('./main-footer.vue'),
//      'app-control-sidebar': require('./main-control-sidebar.vue')
    }
  };
</script>
<style scoped>
  @media screen and (max-width: 768px){
    #app .content-wrapper, #app .right-side{
      padding-top: 50px;
    }
  }
</style>
