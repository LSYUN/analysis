<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content content-overflow">
      <div>
        <form enctype="multipart/form-data" id="uploadForm" method="post" name="uploadForm">
          <input id="file" type="file" name="file" style="" accept="image/*" class="file">
          <input id="projectId" name="projectId" v-model="projectId" style="display: none">
          <div class="box-footer">
            <input type="button" value="上传" @click="doUpload()" class="btn btn-block btn-info">
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    components: {
    },
    props: {
      info: {
        type: Object,
        required: true
      },
      address: {
        type: Object,
        required: true
      }
    },
    data () {
      return {};
    },
    computed: {
      operation () {
        var operation = _.find(this.operations, function (p) {
          return p.path === this.$route.params.operation;
        }.bind(this));
        return operation;
      }

    },
    mounted () {
    },
    methods: {}
  };
</script>
<style>

</style>

