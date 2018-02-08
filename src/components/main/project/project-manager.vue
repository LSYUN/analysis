<template>
  <div>
    <router-view :info.sync="info"></router-view>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        info: {},
      };
    }
  } ;
</script>
<style lang="scss" scoped>

</style>
