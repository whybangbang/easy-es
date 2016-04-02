<template>
  <span>
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
  </span>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello from vue-loader!'
    }
  }
}
</script>

<style scoped>
  .tree-name{
    display:block;
    position:relative;
    height:24px;
    width:150px;
    line-height: 42px;
    margin-left:4px;
    margin-right: 4px;
  }

  .tree-name input{
    position:absolute;
    top:7px;
    left:0;
    padding-left:14px;
    background-color: #757575;
    z-index:9001;
    height:28px;
    box-sizing: inherit;
    width:130px;
    border:0;
    font-weight: 300;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
  }
  .tree-name input[type=text]:focus:not([readonly]){
    border-blottom: 0 solid #00E676;
  }

  .tree-name select{
    height:28px;
    position:absolute;
    background-color: #757575;
    top:7px;
    left:0;
    right:10px;
    z-index:9000;
    outline:0;
    padding-top:0;
    padding-bottom:0;
    border:0;
    width:100%;
    font-weight: 300;
  }

</style>
