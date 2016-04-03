/**
 * Created by seaasun on 2016-4-3.
 */
export default {
  noTreeConfig(val,input){
    for(let key in val){
      if(key.substr(0,5)==='tree_'){
        delete val[key];
      }
    }
    console.log(val)
    return val
  }
}
