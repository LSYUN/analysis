<template>
  <div>
    <router-view :info.sync="info" :address.sync="address"></router-view>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        info: {},
        address: {}
      };
    }
  } ;
</script>
<style lang="scss" scoped>

</style>
