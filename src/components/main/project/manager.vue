<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    watch: {
      $route: (to, from) => {
        if (from.path.indexOf('/info/') > 0) {
          window.session.setObj(window.sessionKeys.TEMPINFO, {});
        }
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
