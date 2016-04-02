<template >
  <li class="data-item">
    <input v-model="arrayValue" class="data-value" placeholder="array" >
    <span @click="del" class="delete-child">X</span>
  </li>
</template>

<script>
export default {
  data() {
    return{
      arrayValue:'',
      key:''
    }
  },
  created(){
    this.key=this.$parent.model.value.length-1;
  },
  watch:{
    'arrayValue':function(val,oldVal){
      this.$parent.model.value.$set(this.key, val)
    }
  },
  methods:{
    del:function(){
      this.$parent.model.value.splice(this.key,1);
    }
  }
}
</script>

<style>

</style>
