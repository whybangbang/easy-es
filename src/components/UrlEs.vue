<template>
  <div class="urles">
    <div class="input-url"><input type="text" v-model="urlRoot" class="url" @change="getDb"></div>

    <div class="input-select">
      <input type="text" v-model="url1"  >
      <select v-model="url1">
        <option v-for="cat in db" track-by="$index">{{$key}}</option>
      </select>
    </div>  <!--<i class="fa fa-refresh" :class="{'ok':connectState=='open','fa-spin':connectState=='ing'}">-->

    <span class="url-search">/_search</span>

    <!--<a  @click="getDb" class="connect getstr-copy"><span word="连接">connect </span>
      <i class="fa fa-refresh" :class="{'ok':connectState=='open','fa-spin':connectState=='ing'}">
      </i></a>-->
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: ['url'],
    data () {
      return {
        db: {},
        urlRoot:window.location.protocol + '//' + window.location.host,
        url1: 'test',
        connectState:'close'
      }
    },
    created(){
      this.getDb();
    },
    computed:{
        url(){
          return this.urlRoot+"/"+this.url1+"/_search"
        }
    },
    methods: {
      getDb(){
        this.connectState='ing';
        var that = this;
        //去最后位的'/'
        this.urlRoot = this.urlRoot.replace(/(^\s*)|(\s*$)/g, '');
        if (this.urlRoot.substr(this.urlRoot.length - 1, 1) == '/') {
          this.urlRoot.substr(0, this.urlRoot.length - 1);
        }



        $.ajax({
          url: this.urlRoot + "/_cat/indices/?h=i",
          type: 'GET',
          cache: false,
          success: function (data) {
            data = data.split('\n');
            data.pop();
            for (var i = 0; i < data.length; i++) {
              data[i] = data[i].replace(/(^\s*)|(\s*$)/g, "");
              Vue.set(that.db, data[i], []);
            }
            that.url1=data[0];
            if(i>0){
           that.connectState='open';
            }
          },
          error: function (httpd, msg) {
            that.connectState='ing';
            Materialize.toast(word.get(['can not connect elestic，plase check root url', '无法链接数据库，请检查根URL']), 4000)
          }
        })
      }
    }
  }


</script>

<style scoped>
  .url-search{
    position:relative;
    margin-left: 120px;
  }
  .urles{
    margin-bottom: 14px;
    display:inline-block;
  }

  .input-url{
    min-width:300px;
  }
  .url{
    margin-bottom: 0;
  }
  .input-select {
    font-size: 13px;
    margin-top:3px;
    position: relative;
    display: inline-block;
  }
  .input-select input {
    font-size: 13px;
    width:100px;
    z-index: 101;
    border:0;
    border-bottom: 1px solid #9e9e9e;
    vertical-align:baseline;
  }

  .input-select select {
    width:120px;
    position: absolute;
    border:0;
    vertical-align:baseline;
    left: 0;
    top: 0;
    z-index: 100;
    height:28px;
  }
  .input-select select:active{
    border: 0;
    outline: 0;
  }

  .ul2{
    margin-left: 140px;;
  }

  .connect{
    margin-left: 140px;
  }

  .connect i{
    margin-left: 14px;
    color:#f44336;
  }
  .connect i.ok{
    color:#66bb6a;
  }
  .connect i.fa-spin{
    color:#fb8c00
  }
</style>
