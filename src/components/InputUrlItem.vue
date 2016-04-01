<template>
  <span class="url-item" >
        <span  @blur="changeValue"
               contentEditable="true">{{val}}</span>/
    </span>
</template>

<script>


export default {

  props: ['index', 'val'],
  data: function () {
    return {
      show: true
    }
  },
  methods: {
    changeValue: function () {
      //需取得最后的'/'
      this.$parent.subUrl.$set(this.index, this.$el.innerText.substring(0, this.$el.innerText.length - 1));
      this.$parent.url = this.$parent.subUrl.join('/');
      this.show = true;
    },
    toggleShow: function (event) {
      this.show = false;
      if (!this.show) {
      }
    }
  }
}
</script>

<style scoped>
  .url-item{
    position: relative;
    display: inline-block;


  }

  .url-item span{
    font-size: 14px;
    padding:2px 4px;
    background-color: #e3f2fd;
    border-radius: 3px;
    z-index: 200;
    color:#616161;

  }

  .url-item span:focus{
    background-color: #fff;
    outline: none;
    color:#000;
  }
</style>
