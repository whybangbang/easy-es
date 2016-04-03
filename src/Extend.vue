<template >
  <div >
    <nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo "><img src="../static/img/logo.png">&nbsp;&nbsp;Easy Es</a>
        <ul class="right">
          <li><a href="#">Document</a></li>
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
        <ul v-if="updateExtend">
          <li v-for="extend in parts  | noTreeConfig| filterBy searchExtend "
              @click="selectExtend($key)">{{$key}}</li>
        </ul>
      </div>

      <div class="col s5" >
        <extend-edit :content.sync="content"
              :extend="extend"></extend-edit>
      </div>

      <div class="col s5" >
        <tree
          class="item"
          :model="treeData"
          :parts="treeParts">
        </tree>
      </div>


    </div>
  </div>
</template>

<script>
import help from './help.js'
import ExtendEdit from './components/ExtendEdit'
import Tree from './components/TreeItem'
export default {
  components:{
    ExtendEdit,
    Tree
  },
  data() {
    return{
      parts:parts,
      searchExtend:'',
      content:'',
      extend:'',
      treeParts:parts,
      updateExtend:true,
      treeData:{
        field: 'Elasticsearch',
        open: true,
        extend:'elastic_search',
        root:true,
        choose:true,
        undelete:true,
      }
    }
  },
  watch:{
    extend:function(){

      if(this.extend!==''){

      }
      this.updtaeExtend=true;
      },

    content(){
      this.treeParts=this.content
    }
  },
  methods:{
    //选择合适的分支
    selectExtend:function($extend){
      //修改编辑器
      this.content=JSON.stringify(this.parts[$extend],null,4),
      this.extend=$extend

      //修改树
      this.updtaeExtend=false;
      this.treeData.field=this.extend;
      this.treeData.extend=this.extend;
      this.treeParts=this.content
      this.updtaeExtend=true;

    },
    //保存新的parts
    saveParts:function(){
      var content=JSON.stringify(this.parts,null,4);
      help.downloadFile('myparts.js',content);
    }
  }
}

</script>

<style >

  .extend-lists{
    padding-top:14px !important;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
    height: 400px;
    overflow-y: scroll;
  }
  .extend-lists ul{
    margin-top: 0;
  }
</style>
