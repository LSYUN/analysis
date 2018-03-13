<template>
  <p class="control has-icon has-icon-right">
    <input :id="veeId" :type="veeType" class="dt-input veeClass" :placeholder="veePlaceholder" :name="veeName"
           v-validate="veeValidate" :class="{'input': true, 'is-danger': errors.has(veeName) }" :ref="veeRef">
    <i v-show="errors.has('address')" class="fa fa-warning"></i>
    <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
  </p>
</template>
<script>
  export default{
    props: ['veeId', 'veeName', 'veeType', 'veeClass', 'veePlaceholder', 'veeName', 'veeValidate', 'veeRef']
  }
</script>
<style type="scss" scoped>

</style>
