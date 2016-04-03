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
export default {
  components: [TreeItem],
  props: ['parts', 'model'],
  data () {
    return {
      menuState: true,
      treeData: {}
    }
  },
  created(){
    if (this.model.constructor == Object) {
      this.model = this.parts.tree_root;
    } else {
      this.model = this.parts.tree_root;
    }
  }
}
</script>

