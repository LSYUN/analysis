<template>
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> 0.9.0
    </div>
    <!--<strong>Copyright &copy; 2014-2016 湘银河 &nbsp&nbsp&nbsp&nbsp技术支持：深圳大铁 </strong>-->
  </footer>
</template>
<script>
  export default {
    ready: function () {
      if (typeof ($.AdminLTE.layout) !== 'undefined') {
        $.AdminLTE.layout.activate();
      }
    }
  };
</script>
