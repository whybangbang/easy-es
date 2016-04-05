<template>
  <a word="自动URL" @click="">auto url</a>
  <div><input type="text" v-model="url"></div>
  <a word="确定" @click="getDb">ok</a>
</template>

<script>
export default {
  props: ['url'],
  data () {
    return {
      rootUrl:'',
      db:[]
    }
  },
  methods: {
    setUrl(){
    },
    getDb(){
      var that=this;
      function getCat(db){
        $.ajax({
          url: that.url+"/"+db+"/_search/",
          type: 'POST',
          cache: false,
          dataType: 'json',
          data:JSON.stringify({
            "aggs":{
              "genders":{
                "terms":{
                  "field":"_type"
                }
              }
            },
            "size":0
          }),
          success: function (data) {
            that.db[db].push(data.aggregations.genders.buckets)
          },
          error: function (httpd, msg) {

          }
        })
      }

      $.ajax({
        url: this.url+"/_cat/indices/?h=i",
        type: 'GET',
        cache: false,
        success: function (data) {
          data=data.split('\n');
          data.pop();
          for(var i=0;i<data.length;i++){
            data[i]=data[i].replace(/(^\s*)|(\s*$)/g, "")
            that.db[data[i]]=[]
            getCat(data[i]);
          }
          console.log(that.db)
        },
        error: function (httpd, msg) {
          Materialize.toast(word.get(['can not connect elestic，plase check root url','无法链接数据库，请检查根URL']), 4000)
        }
      })

    },

  }
}
</script>

<style>

</style>
