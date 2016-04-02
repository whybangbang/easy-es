<template >
  <div >
    <div class="row">
      <a class="btn" @click="saveParts"></a>
    </div>
    <div class="row">
      <div class="col s2" >
        <input type="text" v-model="searchExtend">
        <ul>
          <li v-for="extend in parts  | filterBy searchExtend in '$key' "
              @click="selectExtend($key)">{{$key}}</li>
        </ul>
      </div>

      <div class="col s5" >
        <extend-edit :content="content"
              :extend="extend"></extend-edit>
      </div>

      <div class="col s5" >
        <!--<edit :content="content"></edit>-->
      </div>


    </div>
    <div class="row">
      <pre>{{{parts | json 4}}}</pre>

    </div>
  </div>
</template>

<script>
import help from './help.js'
import ExtendEdit from './components/ExtendEdit'
export default {
  components:{
    ExtendEdit
  },
  data() {
    return{
      parts:parts,
      searchExtend:'',
      content:'',
      extend:''
    }
  },
  methods:{
    //选择合适的分支
    selectExtend:function($extend){
      this.content=this.parts[$extend],
        this.extend=$extend
    },
    //保存新的parts
    saveParts:function(){
      var content=JSON.stringify(this.parts,null,4);
      help.downloadFile('myparts.js',content);
    }
  }
}

</script>

<style scoped>

</style>
