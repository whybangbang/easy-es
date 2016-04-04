<template >
  <wrap>
    <span slot="nav-right">
        <li><a class="btn tooltipped" @click="saveParts"
               data-position="bottom" data-delay="50"
               data-tooltip="保存你的自定义至本地，替换/static/parts.js即可" word="保存">save</a></li>
     </span>

    <!--<div class="row">
      <a class="btn" @click="saveParts"></a>
    </div>-->
    <div class="row">
      <div class="col s2 extend-lists" >
        <div v-show="helpState">
          <div class="help-nav">
             <a @click="changeNav('scan')"> <div class="help-name" word="浏览">scan</div></a>
            <a @click="changeNav('tip')"> <div class="help-name activate" word="贴士">tip!</div></a>
          </div>
          <ul class="help">
            <li v-for="item in helpBrief">
              <span class="help-filed">{{$key}}:</span>
                <span class="help-value">{{item[0]}}</span>
                <span class="help-doc">{{item[1]}}</span>
            </li>
          </ul>
        </div>
        <div v-show="!helpState">
          <div class="help-nav">
            <a @click="changeNav('scan')"> <div class="help-name activate" word="浏览">scan</div></a>
            <a @click="changeNav('tip')"> <div class="help-name" word="贴士">tip!</div></a>
          </div>
          <input type="text" v-model="searchExtend" placeholder="search">
          <span class="new-btn"><a @click="newExtend(searchExtend)" ><i class="fa fa-plus"></i>new extend</a></span>
          <ul >
            <li v-for="extend in parts  |  filterBy searchExtend "
                v-if="$key.substr(0,5)!=='tree_'"
                @click="selectExtend($key)">{{$key}}</li>
          </ul>
        </div>
      </div>

      <div class="col s5" >
        <div class="nav-bottom"></div>
        <extend-edit :parts.sync="parts"
              :extend="extend"></extend-edit>
      </div>

      <div class="col s5 tree" >
        <div class="nav-bottom"></div>
        <a class="" @click="updataTree" id="update-tree"><i class="fa fa-refresh"></i><span word="刷新">refresh</span></a>
        <div class="tree">
        <tree
          class="item"
          :model.sync="treeData"
          :parts="parts">
        </tree>
        </div>
        <pre class="get-str">{{{getStr | json 4}}}</pre>
      </div>


    </div>
  </wrap>
</template>

<script>
import Vue from 'vue'
import help from './help.js'
import ExtendEdit from './components/ExtendEdit'
import Tree from './components/Tree'
import Wrap from './Wrap'
var helpBrief={
  "field":[
    "'field'","键名"
  ],
  "value":[
    "'name'","值名"
  ],
  "extend":[
    "'name'","扩展项",
  ],
  "child":[
    "[{}]","预制模板"
  ],
  "open":[
    "true","展开"
  ],
  "undelete":[
    "true","不可删除"
  ],
  "disabled":[
    "true","禁用"
  ],
  "placeholder":[
    "doc","value的提示"
  ],
  "selectValue":[
    "['A','B']","value中显示下拉菜单",
  ],
  "arrayValue":[
    "true","value的值为数组"
  ],
  "arrayField":[
    "true","field为数组"
  ],
  "object":[
    "true","包含对象"
  ],
  "array":[
    "true","包含数组"
  ],
  "group":[
    "3","组3的只出现1次"
  ],
  "force_only":[
    "true","强制只出现1次"
  ],
}
export default {

  components:{
    ExtendEdit,
    Tree,
    Wrap
  },
  data() {
    return{
      parts:parts,
      searchExtend:'',
      extend:'',
      treeData:'',
      helpState:false,
      helpBrief:helpBrief,
    }
  },
  computed: {
    getStr: function () {
      // 验证json的情况
      var new_obj = {};
      return help.obj_parser(new_obj, this.treeData)[this.treeData.field];
    }
  },
  ready(){
    word.translate();
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
      console.log(this.extend)
      this.$broadcast('updateTree',this.extend);
      Materialize.toast(word.get(['refresh tree success','成功刷新']), 4000)
   },
    newExtend(name){
      //检测有无名称
      if(!name || name===''){
        Materialize.toast(word.get(['Plase give a name','请给个名称']), 4000);
        return
      }

      //检测重名
      if(this.parts[this.newExtend]){
        if(!confirm(word.get(["The nam is exist ,do you want to overwrite?",
            "此名称已存在，是否要覆盖？"]))){
          return
        }
      }

      Vue.set(this.parts,name,{});
      this.extend=name;
      Materialize.toast(word.get(['Built a new extend success','成功新建分支']), 4000);
    },
    changeNav(name){
      if(name=='tip'){
        this.helpState=true
      }else{
        this.helpState=false
      }
    }
  }
}

</script>

<style scoped>
  .help{
    font-size: 13px;
    clear: both;
  }
  .help li{
    margin-top: 8px;
  }
  .help-filed{
    color:#039be5;
  }
  .help-value{
    color:#757575
  }

  .help-name{
    width:50%;
    float:left;
    text-align: center;
    margin-bottom: 10px;
    color:#424242;
  }

  .help-name.activate{
    color:#039be5;
  }
  .extend-lists{
    padding-top:14px !important;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
    height: 525px;
    overflow: auto;
  }
  .extend-lists input{
    margin-top:0;
    margin-bottom: 0;
  }
  .extend-lists ul{
    margin-top: 0;
  }

  .new-btn{
      text-align: right;
      margin-bottom: 24px;
      font-size: 12px;
      width:100%;
  }
  .new-btn i{
    margin-right:6px;
  }
  .tree{
    position:relative;
  }
  #update-tree{
    position:absolute;
    right:28px;
    top:14px;
    z-index: 1000;
  }
  #update-tree i{
    margin-right:7px;
  }
  .get-str{
    padding:13px;
    border-top:1px #eee solid;
    outline: none;
    color:#616161;
    background-color: #fafafa;
    height:auto;
    min-height:290px;
    font-size:13px;
    line-height: 1.2;
    overflow: hidden;
    overflow-y:visible;
    font-family: Roboto, sans-serif;
  }

  .tree{
    min-height:200px;
  }

</style>
