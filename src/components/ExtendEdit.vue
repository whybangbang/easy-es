<template>
  <div class="root">
    <div class="title">
      <span>extend:{{extend}}</span>
    </div>
    <div id="editor"></div>
  </div>
</template>

<script>
  let editor;

  export default {
    props: ['parts', 'extend'],
    ready(){
      editor = ace.edit("editor");
      editor.setTheme("ace/theme/github");
      editor.getSession().setMode("ace/mode/json")
      editor.$blockScrolling = Infinity
      var that=this;
      editor.getSession().on('change', function(e) {
        try{
          that.parts[that.extend]=JSON.parse(editor.getValue());
        }catch(e){}
      });
    },
    watch: {
      'extend': function (newContent, oldContent) {
          editor.setValue(JSON.stringify(this.parts[this.extend],null,4));
          editor.clearSelection()
      }
    }
  }

</script>

<style>
  .root{
    position:relative;
  }
  #editor{
    position: absolute;
    top: 30px;
    right: 0;
    bottom: 0;
    left: 0;
    height:400px;
    border:1px solid #eee;
    border-left:0;

    color:#616161;
    font-size: 12px;
  }
  #editor .ace_gutter{
    background-color: #eee;
  }

  .title{
    border:1px solid #eee;
    background-color: #fafafa;
    height:30px;
    font-size: 13px;
    padding:7px;
    color:#757575
  }
</style>
