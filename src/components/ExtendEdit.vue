<template>
  <div class="root">
   <!-- <textarea class="getstr" v-model="content | json 4"
              @dblclick="goExtend($event)"><br></textarea>-->
    <div id="editor">{{contents}}</div>
  </div>
</template>

<script>

  export default {
    props: ['content', 'extend'],
    data: function () {
      return {
        contents: 'ssss'
      }
    },
    created(){
      //console.log(this);
    },
    ready(){

      //var a=this.$el.createElement("p");
      //console.log(a)
      var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/json")
      var that=this
      editor.getSession().on('change', function(e) {
        that.contents=editor.getValue()

      });
    },
    watch: {
      'content': function (newContent) {
        this.$parent.parts[this.extend] = newContent;
      }
    },
    methods: {
      goExtend: function (event) {
        console.log(event);
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
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height:100px;
    background-color: #ccc!important;
  }
</style>
