<template>
  <div class="root">
    <div class="title">
      <input type="text" v-model="newExtend" placeholder="extend name">
      <a @click="delExtend"><i class="fa fa-times"></i ><span word="删除" >delete</span></a>
      <a @click="changeName"><i class="fa fa-exchange"></i><span word="删除" >change name</span></a>

    </div>
    <div id="editor"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  let editor;

  export default {
    props: ['parts', 'extend'],
    data(){
      return {
        newExtend: ''
      }
    },
    ready(){
      editor = ace.edit("editor");
      editor.setTheme("ace/theme/github");
      editor.getSession().setMode("ace/mode/json")
      editor.$blockScrolling = Infinity
      var that = this;
      editor.getSession().on('change', function (e) {
        try {
          that.parts[that.extend] = JSON.parse(editor.getValue());
        } catch (e) {
        }
      });
      word.translate();
    },
    watch: {
      'extend': function (newContent, oldContent) {
        this.newExtend = this.extend
        var content = JSON.stringify(this.parts[this.extend], null, 4);
        if (typeof(content) == 'string') {
          editor.setValue(content);
          editor.clearSelection()
        }

      }
    },
    methods: {
      changeName(){
        //检测有无名称
        if(this.newExtend==''){
          Materialize.toast('Please give a name',4000)
          return
        }

       //检测是否符合json规范
        try{
          var content=JSON.parse(editor.getValue());
        }catch(e){
          Materialize.toast('Wrong format', 4000)
          return
        }

        //检测重名
        if(this.parts[this.newExtend]){
          if(!confirm("The nam is exist ,do you want to overwrite?")){
           return
          }
        }

        //修改名称
        Vue.set(this.parts,this.newExtend,content);
        Vue.delete(this.parts, this.extend);
        this.extend=this.newExtend;
        Materialize.toast('Change name suceess', 4000)

      },
      delExtend(){
        if (confirm("Are you sure delete this extent?")) {
          Vue.delete(this.parts, this.extend);
          editor.setValue('');
          this.extend = ''
        }
      }
    }
  }

</script>

<style>
  .root{
    position:relative;
    display: block;
    height:504px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
  }
  #editor{
    position: absolute;
    top: 35px;
    right: 0;
    bottom: 0;
    left: 0;
    height:470px;
    border:1px solid #eee;
    border-left:0;

    color:#616161;
    font-size: 12px;

  }
  #editor .ace_gutter{
    background-color: #fafafa;
  }

  .title{
    border:1px solid #eee;
    background-color: #fafafa;
    height:45px;
    font-size: 13px;
    padding:7px;
    color:#757575
  }

  .title input{
    display: inline-block;
    margin-top: -6px;
    width:150px;
    margin-bottom: 7px;
  }

  .title a{
    float:right;
    margin-right:14px;
  }
  .title a i{
    margin-right:7px;
  }
</style>
