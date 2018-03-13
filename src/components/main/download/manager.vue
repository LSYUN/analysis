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
    },
    mounted(){
    },
    methods:{
    }
  } ;
</script>
<style lang="scss" scoped>

</style>
