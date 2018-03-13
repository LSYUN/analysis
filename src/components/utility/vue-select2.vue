<template>
  <div>
    <select v-if="multiple" class="form-control select2" multiple="multiple" style="width: 100%;"></select>
    <select v-else class="form-control select2" style="width: 100%;"></select>
  </div>
</template>
<script>
  export default{
    props: {
      evtSelected: {
        type: Function
      },
      multiple: {
        type: Boolean
      },
      paging: {
        type: Boolean
      },
      initData: {
        type: Array
      },
      placeholder: {
        type: String
      },
      search: {
        type: Boolean
      },
      ajax: {
        type: Boolean
      },
      ajaxUrl: {
        type: Function
      },
      ajaxDataType: {
        type: String
      },
      ajaxType: {
        type: String
      },
      ajaxContentType: {
        type: String
      },
      ajaxCache: {
        type: Boolean
      },
      ajaxData: {
        type: Function
      },
      ajaxResults: {
        type: Function
      },
      options: {
        type: Object
      },
      tags: {
        type: Boolean
      },
      allowClear: {
        type: Boolean
      },
      localData: {
        type: Array
      },
      resultAdd: {
        type: Array
      },
      disabled: {
        type: Boolean
      }
    },
//    computed: {
//      evtSelected: () => {
//      },
//      multiple: () => {
//      },
//      paging: () => {
//      },
//      initData: () => {
//      },
//      placeholder: () => {
//      },
//      search: () => {
//      },
//      ajax: () => {
//      },
//      ajaxUrl: () => {
//      },
//      ajaxDataType: () => {
//      },
//      ajaxType: () => {
//      },
//      ajaxContentType: () => {
//      },
//      ajaxCache: () => {
//      },
//      ajaxData: () => {
//      },
//      ajaxResults: () => {
//      },
//      options: () => {
//      },
//      tags: () => {
//      },
//      allowClear: () => {
//      },
//      localData: () => {
//      },
//      resultAdd: () => {
//      },
//    },
    data () {
      return {
        selectObj: null,
        defaultOptions: {
          placeholder: this.placeholder || '未设置',
          minimumResultsForSearch: this.search || Infinity,
          disabled: this.disabled || false,
          allowClear: this.allowClear || false,
          data: this.formatObj(this.localData),
          tags: this.tags
        }
      }
    },
//    created: function () {
//      this.$on('clear', (change) => {
//        if (change) this.selectObj.val(null).trigger('change');
//        else this.selectObj.val(null);
//      });
//      this.$on('change', () => {
//        this.selectObj.trigger('change');
//      });
//      this.$on('disabled', () => {
//        this.selectObj.attr({'disabled': 'disabled'});
////        this.selectObj.prop("disabled", true);
////        $("select").prop("disabled", true);
//      });
//      this.$on('enabled', () => {
//        this.selectObj.prop("disabled", false);
//      });
//      this.$on('update', (data, hidden) => {
//        this.initData = data;
//        if (this.initData && this.initData.length > 0) {
//          if (this.multiple) {
//            for (let i = 0; i < this.initData.length; i++) {
//              const item = this.initData[i];
//              var $selected;
//              if (item.id) {
//                $selected = $('<option selected>' + item.text + '</option>').val(item.id);
//              }
//              else {
//                $selected = $('<option selected>' + item + '</option>').val(item);
//              }
//              this.selectObj.append($selected);
//              $selected[0].disabled = hidden;
//              $selected[0].hidden = hidden;
//              $('span.select2-container--open.select2-dropdown--below').css("display", "none");
//            }
//          } else {
//            const data = this.initData[0];
//            const $selected = $('<option selected>' + data.text + '</option>').val(data.id);
//            this.selectObj.append($selected);
//          }
//          this.selectObj.trigger('change.select2');
//          _.forEach(this.initData, (src) => {
//            const data = _.find(this.selectObj.select2('data'), (dec) => {
//              return dec.id === src.id;
//            });
//            if (data && !data.obj && src.obj) {
//              data.obj = src.obj;
//            }
//          });
//        } else {
//        }
//      });
//      this.$on('changeLocal', (src) => {
//        let data = _.map(src, (s) => {
//          return {id: s.value || s.id, text: s.text, obj: s}
//        });
//        data = data.length <= 0 ? null : data;
//        if (this.selectObj) this.selectObj.select2('destroy').empty().select2($.extend(true, this.defaultOptions, {data: data}));
//        else this.selectObj = $('.select2', this.$el).select2($.extend(true, this.defaultOptions, {data: data}));
//      });
//    },
    mounted () {
      const $options = this.options || this.defaultOptions;
      if (this.ajax) {
        $options.ajax = this.getAjax(this.paging, this.resultAdd);
        if (this.ajaxData) {
          $options.ajax.data = this.ajaxData;
        }
        if (this.ajaxResults) {
          $options.ajax.processResults = this.ajaxResults;
        }
      }
      this.selectObj = $('.select2', this.$el).select2($options);
      if ($options.ajax) {
        if (this.initData && this.initData.length > 0) {
          if (this.multiple) {
            for (let i = 0; i < this.initData.length; i++) {
              const item = this.initData[i];
              const $selected = $('<option selected>' + item.text + '</option>').val(item.id);
              this.selectObj.append($selected);
            }
          }
          else {
            if (this.initData && this.initData.length > 0) {
              const data = this.initData[0];
              const $selected = $('<option selected>' + data.text + '</option>').val(data.id);
              this.selectObj.append($selected);
            }
          }
          this.selectObj.trigger('change.select2');
        }
      } else {
        if (this.multiple) {
          let $selected = [];
          _.each(this.initData, (d) => $selected.push(d.id));
          this.selectObj.val($selected);
        } else {
          if (this.initData && this.initData.length > 0) {
            this.selectObj.val(this.initData[0].id);
          }
        }
        this.selectObj.trigger('change.select2');
      }
      _.forEach(this.initData, (src) => {
        const data = _.find(this.selectObj.select2('data'), (dec) => {
          return dec.id === src.id;
        });
        if (data && !data.obj && src.obj) {
          data.obj = src.obj;
        }
      });
      this.selectObj.on("change", function (evt) {
        if (this.evtSelected) {
          this.evtSelected(evt, this.selectObj.select2('data'));
        }
      }.bind(this));
    },
    methods: {
      getAjax (paging, resultAdd) {
        return {
          url: this.ajaxUrl || 'unset ajax url',
          dataType: this.dataType || 'json',
          type: this.type,
          contentType: this.contentType || 'application/json',
          cache: this.ajaxCache || true,
          headers: {
            'token': window.session.get(window.sessionKeys.TOKEN)
          },
          data (params) {
            if (paging) {
              params.page = params.page || 1;
              return JSON.stringify({
                pageIndex: params.page,
                pageSize: 10
              });
            }
          },
          processResults (res) {
            if (paging) {
              params.page = params.page || 1;
              if (resultAdd && resultAdd.length > 0) {
                res.records.push(resultAdd);
              }
              const data = _.map(res.records, function (p) {
                return {
                  id: p.id || p.code,
                  text: p.name,
                  obj: p
                }
              });
              return {
                results: data,
                pagination: {
                  more: params.page < res.totalPages
                }
              };
            } else {
              if (resultAdd && resultAdd.length > 0) {
                _.each(resultAdd, (r) => {
                  res.push(r);
                });
              }
              const data = _.map(res, function (p) {
                return {
                  id: p.id || p.code,
                  text: p.name,
                  obj: p
                }
              });
              return {
                results: data
              };
            }
          },
          error: function (e) {
            console.log(e);
          }
        };
      },
      getData () {
        return this.selectObj.select2('data');
      },
      formatObj(data){
        if (data !== undefined) {
          let res = [];
          if (typeof data === 'object') {
            if (Array.isArray(data)) {
              _.each(data, (d) => {
                let id = this.hasValue(d.id) ? d.id : this.hasValue(d.value) ? d.value : this.hasValue(d) ? d : null;
                let text = this.hasValue(d.text) ? d.text : this.hasValue(d.name) ? d.name : this.hasValue(d) ? d : null;
                res.push({
                  id: id,
                  text: text,
                  obj: d
                })
              });
              return res;
            } else {
              res = {
                id: data.id || data.value || data,
                text: data.text || data.name || data,
                obj: data
              };
              return res;
            }
          }
          else {
            return {id: null, text: '空'};
          }
        } else {
          return data;
        }
      },
      hasValue(obj){
        return (obj !== null && obj !== undefined);
      },
      clear(change){
        if (change) this.selectObj.val(null).trigger('change');
        else this.selectObj.val(null);
      },
      change(){
        this.selectObj.trigger('change');
      },
      enable(){
        this.selectObj.prop("disabled", false);
      },
      disable(){
        this.selectObj.attr({'disabled': 'disabled'});
      },
      update(data, hidden){
        if (data && data.length > 0) {
          var item, name, id, $selected;
          if (this.multiple) {
            for (let i = 0; i < data.length; i++) {
              item = data[i];
              name = item.text || item.name;
              id = item.value !== null && item.value !== undefined ? item.value : item.id;
              $selected = '';
              $selected = $('<option selected>' + name + '</option>').val(id);
              this.selectObj.append($selected);
              $selected[0].disabled = hidden;
              $selected[0].hidden = hidden;
              $('span.select2-container--open.select2-dropdown--below').css("display", "none");
            }
          } else {
            item = data[0];
            name = item.text || item.name;
            id = item.value !== null && item.value !== undefined ? item.value : item.id;
            $selected = $('<option selected>' + name + '</option>').val(id);
            this.selectObj.append($selected);
          }
          this.selectObj.trigger('change.select2');
          _.forEach(data, (src) => {
            const ele = _.find(this.selectObj.select2('data'), (dec) => {
              return dec.id === src.id;
            });
            if (ele && !ele.obj && src.obj) {
              ele.obj = src.obj;
            }
          });
        } else {
        }
      },
      changeLocal(src){
        let data = _.map(src, (s) => {
          return {id: s.value || s.id, text: s.text, obj: s}
        });
        data = data.length > 0 ? data : null;
        console.log(this.selectObj);
        if (this.selectObj) this.selectObj.select2('destroy').empty().select2($.extend(true, this.defaultOptions, {data: data}));
        else this.selectObj = $('.select2', this.$el).select2($.extend(true, this.defaultOptions, {data: data}));
      },
      initLocal(src){
        if (src && src.length > 0) {
          if (this.multiple) {
            let mulVal = _.map(src, (s) => {
              return {id: s.value !== null && s.value !== undefined ? s.value : s.id, text: s.text || s.name}
            });
            this.selectObj.select2('data', mulVal).triggle('change');
          } else {
            const item = src[0];
            const id = item.value !== null && item.value !== undefined ? item.value : item.id;
            this.selectObj.val(id).trigger('change');
          }
        }
      }
    },
    beforeDestroy () {
      if (this.selectObj !== null) {
        this.selectObj.off('select2:select');
      }
      this.$off('clear');
    },
  };

</script>
<style scoped>

</style>
