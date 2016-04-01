<template>
  <div class="url">
    <input type="text" v-model="url" v-show="inputShow"
           @blur="hideInputShow">
    <div class="url-all"  v-show="!inputShow">
      <input-url-item v-for="u in subUrl"
                :index="$index" :val="u"></input-url-item>
    </div>
    <div v-show="!inputShow" class="url-bottom" @click="showInputShow"></div>
  </div>
</template>

<script>
import InputUrlItem from './InputUrlItem'
export default {
  components:{
    InputUrlItem
  },
  props: ['url'],
  data:function(){
    return{
      inputShow:false,
      subUrl:[]
    }
  },
  created:function(){
    this.dealUrl()
  },
  watch:{
    url:function(){
      this.dealUrl();
    }
  },
  methods:{
    showInputShow:function(){
      this.inputShow=true;
    },
    hideInputShow:function(){
      this.inputShow=false;
    },
    dealUrl:function(){
      var re=/^.*:\/\//;
      var urlHead=re.exec(this.url);
      var urlBack=this.url.replace(re,'');
      this.subUrl=urlBack.split('/');
      if(urlHead){
        this.subUrl.$set(0,urlHead+this.subUrl[0])
      }
    }
  }
}
</script>

<style scoped>
  .url{
    display:block;
    width:100%;
    position:relative;
    height:auto;
    min-height:24px;
    padding-bottom: 4px;
    margin-bottom: 7px;
    border-bottom: 1px solid #9e9e9e;
  }

  .url input{
    font-size: 14px;
    border-bottom: 0 !important;
    margin-bottom: 0;
    border-bottom: 0;
    padding-bottom: 0;
  }
  .url input:focus {
    outline: none !important;
    box-shadow: none !important;
  }

   .url-all{
    position: absolute;
    left:0;
    top:0;
    z-index: 200;
  }

  .url-bottom{
    position: absolute;
    width:100%;
    height:20px;
    display: block;
    left:0;
    top:0;
  }
</style>
