<template>
  <div class="hello">
    <input type="text" v-model="lsy">
    <button onclick="submit()" class="">{{lsy}}</button>
  </div>
</template>

<script>
  function submit() {
    console.log('sure');
  }
  export default {
    name: 'HelloWorld',
    data () {
      return {
        lsy: 'you are ok?',
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted: function () {
      this.$nextTick(function () {

        console.log('sure');
      })
    },
    methods: {
      submit(){
        console.log('sure');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
