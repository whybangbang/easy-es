<template >
  <div >
    <nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo "><img src="../static/img/logo.png">&nbsp;&nbsp;Easy Es</a>
        <ul class="right">
          <li><a class="btn" @click="saveParts">save</a></li>
          <li><a href="#">Document</a></li>
          <li><a href="#">Query</a></li>
        </ul>
        <div style="clear:both"></div>
      </div>
    </nav>

    <!--<div class="row">
      <a class="btn" @click="saveParts"></a>
    </div>-->
    <div class="row">
      <div class="col s2 extend-lists" >
        <input type="text" v-model="searchExtend" placeholder="search">
        <ul >
          <li v-for="extend in parts  |  filterBy searchExtend "
              v-if="$key.substr(0,5)!=='tree_'"
              @click="selectExtend($key)">{{$key}}</li>
        </ul>
      </div>

      <div class="col s5" >
        <extend-edit :parts.sync="parts"
              :extend="extend"></extend-edit>
      </div>

      <div class="col s5 tree" >
        <a class="" @click="updataTree" id="update-tree"><i class="fa fa-refresh"></i>refresh</a>
        <tree
          v-if="s"
          class="item"
          :model="treeData"
          :parts="parts">
        </tree>
      </div>


    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import help from './help.js'
import ExtendEdit from './components/ExtendEdit'
import Tree from './components/Tree'
export default {
  components:{
    ExtendEdit,
    Tree
  },
  data() {
    return{
      parts:parts,
      searchExtend:'',
      extend:'',
      treeData:'',
      s:true
    }
  },

  methods:{
    //选择合适的分支
    selectExtend:function($extend){
      //修改编辑器
      this.extend=$extend
    },
    //保存新的parts
    saveParts:function(){
      var content=JSON.stringify(this.parts,null,4);
      help.downloadFile('myparts.js',content);
    },
    updataTree:function(){
      this.$broadcast('updateTree',this.extend);
   }
  }
}

</script>

<style scoped>

  .extend-lists{
    padding-top:14px !important;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
    height: 400px;
    overflow-y: scroll;
  }
  .extend-lists ul{
    margin-top: 0;
  }

  .tree{
    position:relative;
  }
  #update-tree{
    position:absolute;
    right:28px;
    top:14px;
  }
  #update-tree i{
    margin-right:7px;
  }
</style>
