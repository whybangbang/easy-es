<template >
  <ul>
    <tree-item
      class="item"
      :model="model"
      :parts="parts"
      :menu-state="menuState">
    </tree-item>
  </ul>

</template>

<script>
import TreeItem from './TreeItem'
import help from '../help.js'
export default {
  components: [TreeItem],
  props: ['parts', 'model'],
  data () {
    return {
      menuState: true,
    }
  },
  created(){
    this.update(this.model)

    var that=this;
    document.addEventListener('click',function(){

      that.closeSelect();
    });

  },
  events:{
    updateTree(val){
      this.update(val);
    }
  },
  methods:{
    // 更新mode
    update(val){
      //为对象直接用
      if (typeof(val) === 'object') {
      }
      //字符串则自动判定位extend
      else if(typeof(val)==='string' &&val!==''){

        this.model={};
        this.model.field=val;
        this.model.extend=val;
        this.model.open=true;
        this.model.choose=true;
        this.model.undelete=true;
        this.$children[0].subparts=this.parts[val];
        //用默认事项
      } else {
        this.model = this.parts.tree_root;
      }

    },
    //广播关闭弹出
    closeSelect(){
      this.$broadcast('closeSelect');
    }


  }
}
</script>
<style>
  ul{
    margin:0;
  }
</style>

