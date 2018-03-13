<template>
  <div>
    <p>{{info.lsy}}</p>
    <router-view :info.sync="info"></router-view>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        info: {},
      };
    },
    mounted(){
      this.info = {lsy: 'lsy'};
      console.log(this.info);
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>

</style>
