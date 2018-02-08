/**
 * Created by Administrator on 2017/12/4.
 */

define(function (require, exports, module) {
  layui.use(['layer', 'form'], function () {
    var layer = layui.layer, form = layui.form;
    // layer.msg('努力加载中...', {icon: 16, shade: [0.5, '#f5f5f5'], scrollbar: false, offset: '50%', time: 10000});

    exports.showLoadLayer = function () {
      return layer.msg('努力中...', {icon: 16, shade: [0.5, '#f5f5f5'], scrollbar: false, offset: '45%', time: 20 * 1000});
    };

    exports.closeLayer = function () {
      layer.closeAll();
    };

    exports.showTipsLayer = function (tips, time) {
      layer.msg(tips, {time: time || 1000, offset: '45%'});
    };
  });

});
