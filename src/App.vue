<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo "><img src="../static/img/logo.png">&nbsp;&nbsp;Easy Es</a>
        <ul class="right">
          <li class="tree-name">
            <input type="text" v-model="treeName">
            <select v-model="treeName">
              <option v-for="item in treeNameLists" track-by="$index">{{item}}</option>
            </select>
          </li>
          <li>
            <a @click="openTree" class="nav btn">open</a>
          </li>
          <li>
            <a @click="saveTree" class="nav btn">save</a>
          </li>
          <li><a href="#">Document</a></li>
        </ul>
        <div style="clear:both"></div>
      </div>
    </nav>
    <div class="card result" v-show="resultShow&&resultShow!=='no'">
      <div class="result-nav">
        <span class="close right" @click="toggleResult"><i class="fa fa-times"></i></span>
        <span class="result-handle right"><i class="fa fa-arrows"></i></span>
        <a @click="changeResultType('response')"
           :class="{'undeline':resultShow=='response'}">response</a>
        <a @click="changeResultType('table')" class=""
           :class="{'undeline':resultShow=='table','line-through':!resultData.hits}">
          table</a>
        <a download="es data.xls" href="#"
           :class="{'line-through':!resultData.hits}"
           onclick="return ExcellentExport.excel(this, 'result-data-table', 'result');">export excel</a>

      </div>
      <pre v-if="resultShow=='response'">{{resultData | json 4}}</pre>
      <div v-if="resultData.hits">
        <table v-show="resultShow=='table'" id="result-data-table">

          <tr class="result-th">
            <th>No</th>
            <th v-for="row in resultData.hits.hits[0]._source">{{$key}}</th>
          </tr>

          <tr v-for="row in resultData.hits.hits | orderBy '_id'">{{row}}
            <td>{{row._id}}</td>
            <td v-for="td in row._source">{{td}}</td>
          </tr>

        </table>
      </div>
    </div>

    <div>
      <div class="row">
        <div class="col s7" style="position:relative">
          <div class="card-content" style="min-height: 400px;">
            <ul>
              <tree
                class="item"
                :model="treeData"
                :parts="parts">
              </tree>
              <div class="switch custom-btn">
                <label>
                  <input type="checkbox" v-model="parts.tree_customize">
                  <span class="lever"></span>
                  Custom Model
                </label>
              </div>
            </ul>
          </div>
        </div>

        <div class="col s5">
          <div class="card">
            <div class="card-content">
              <input-url :url.sync="queryUrl"></input-url>

              <a class="btn" @click="queryWeb">send</a>
              <a class="getstr-copy" @click="toggleResult"
                 :class="{'un-getstr-copy':resultShow||resultShow=='no'}">last result</a>
            </div>
          </div>
          <div class="card">
            <div class="card-content">
              <a class="getstr-copy" @click="validator">formate&validator</a>
              <a class="getstr-copy copy" data-clipboard-target="#getstr">cope code</a>
              <div v-show="validJson.state=='pass' " class="valid-json-pass"></div>

              <div v-show="validJson.state=='fail' " class="valid-json-fail">
                {{{validJson.doc}}}
              </div>
              <textarea class="getstr" id="getstr" v-model="showJson">{{{getStr | json 4}}}</textarea>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import Vue from 'vue'
  import * as Jsonlint from './assets/jsonlint.min'
  import help from './help'

  import InputUrl from './components/InputUrl'
  import Tree from './components/Tree'

  import Clipboard from 'clipboard'
  new Clipboard('.copy');



  import $ from 'jquery'
  import Draggabilly from 'draggabilly'




  export default {
    components:{
      InputUrl,
      Tree,
    },
    data: function(){
      return{
        treeData: {
          field: 'Elasticsearch',
          open: true,
          extend:'elastic_search',
          root:true,
          choose:true,
          undelete:true,
        },
        parts: parts,
        treeProject: 'base',
        treeProjectLists: [],
        treeName: 'start',
        treeNameLists: [],
        showJson: '',
        validJson: {
          'state': false,
          'doc': ''
        },
        queryUrl: window.location.protocol + '//' + window.location.host + '/index/type/_search',
        querySubUrl: [],

        resultShow: 'no',
        resultData: {},
      }

    },
    created: function () {
      this.updateTree();
      //读取最后的树
      if (localStorage['tree']&&localStorage['last_tree']) {
        var tmp = JSON.parse(localStorage['tree']);
        var last = JSON.parse(localStorage['last_tree']);

        this.treeData = tmp[last['treeProject']][last['treeName']];
        if(tmp[last['treeProject']][last['treeName'] + '_url']){
          this.queryUrl = tmp[last['treeProject']][last['treeName'] + '_url'];
        }

        this.treeName=last['treeName'];
        this.treeProject=last['treeProject'];
      }
      this.parts.tree_chooseChidShow = true;


      // 隐藏选项，这里同上冗余
    },
    watch: {
      treeProject: 'updateTree'

    },
    computed: {
      getStr: function () {

        // 验证json的情况
        var new_obj = {};

        return help.obj_parser(new_obj, this.treeData)[this.treeData.field];
      },
      getTree: function () {
        return JSON.stringify(this.treeData);
      }
    },
    methods: {
      // 保存树
      saveTree: function () {
        // 已储存有树
        if (localStorage['tree']) {
          var tmp = JSON.parse(localStorage['tree']);

          // 没有此项目则新建项目
          if (!tmp[this.treeProject]) {
            tmp[this.treeProject] = {}
          }

          // 检查重名
          if (tmp[this.treeProject][this.treeName]) {
            if (!confirm('Name already exists, you want to replace it?')) {
              return;
            }
          }

          tmp[this.treeProject][this.treeName] = this.treeData;
          tmp[this.treeProject][this.treeName + '_url'] = this.queryUrl;
          localStorage['tree'] = JSON.stringify(tmp)

        }
        //更新树的视图
        this.updateTree();

        this.saveLastTree();

        Materialize.toast('template saved', 4000)
      },
      // 打开树
      openTree: function () {
        var tmp = JSON.parse(localStorage['tree']);
        if (tmp[this.treeProject][this.treeName]) {
          this.treeData = tmp[this.treeProject][this.treeName];
          this.queryUrl=tmp[this.treeProject][this.treeName+'_url'];
          Materialize.toast('template open', 4000);

          this.saveLastTree();

        } else {
          Materialize.toast("there is no this template,pleses check name", 4000)
        }
      },
      // 更新树的显示
      updateTree: function () {
        // 读取已本地保存的tree
        if (localStorage['tree']) {
          var tree = JSON.parse(localStorage['tree'])
          this.treeProjectLists = [] // 清空之前的选项
          for (var key in tree) {
            this.treeProjectLists.push(key)
          }
          this.treeNameLists = [];// 清空之前的选项
          for (var key in tree[this.treeProject]) {
            this.treeNameLists.push(key);
          }

          // 本地没有保存则创建新tree
        } else {
          var tmp = {};
          tmp[this.treeProject] = {};
          tmp[this.treeProject][this.treeName] = this.treeData;
          localStorage['tree'] = JSON.stringify(tmp)
          localStorage['last_tree']=JSON.stringify({
            treeProject:this.treeProject,
            treeName:this.treeName
          })
        }
      },
      saveLastTree:function(){
        localStorage['last_tree']=JSON.stringify({
          treeProject:this.treeProject,
          treeName:this.treeName
        })
      },
      validator: function () {
        try {
          var str
          if (this.showJson.constructor == Object) {
            str = JSON.stringify(this.showJson)
          } else if (this.showJson === '') {
            this.validJson.state = 'pass'
            return
          } else {
            str = this.showJson
          }
          //验证
          var result = jsonlint.parse(str);
          this.validJson.state = 'pass';
          this.validJson.doc = 'pass';
          this.showJson = JSON.stringify(result, null, 4);

        } catch (e) {
          this.validJson.doc = e.message;
          this.validJson.doc = this.validJson.doc.replace(/\n/, "<br>")
          this.validJson.state = 'fail';

        }

      },
      // 隐藏添加子选项菜单
      hideChildShow: function () {
        function hide(obj) {
          obj.$data.chooseChildShow = false
          // 隐藏所有的子选项
          for (var i in obj.$children) {
            hide(obj.$children[i])
          }
        }

        hide(this)
      },
      queryWeb: function () {

        this.validator();
        if (this.validJson.state == 'fail') {
          Materialize.toast('pelase check DSL', 4000);
          return false;
        }

        var that = this;
        $.ajax({
          url: this.queryUrl,
          type: 'POST',
          cache: false,
          data: this.showJson,
          dataType: 'json',
          success: function (data) {
            that.resultShow = 'response';
            Vue.set(that, 'resultData', data);

          },
          error: function (httpd, msg) {

            that.resultShow = 'response';
            var data = JSON.stringify(httpd, null, 4);
            Vue.set(that, 'resultData', data);

          }

        })
      },
      toggleResult: function () {
        if(this.resultShow){
          this.resultShow=false
        }else{
          this.resultShow='response'
        }
      },
      changeResultType: function (val) {
        this.resultShow = val;
      },
      exportResult: function () {
        window.open('data:application/vnd.ms-excel,' + $('#result-data-table').html());
      }
    }

  }
</script>

<style>

</style>
