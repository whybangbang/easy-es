import Vue from 'vue'
import App from './App'

// 整体框架
Vue.config.debug = true;
Vue.config.devtools = true;

//滤镜
import filter from './filter'

Object.keys(filter).forEach(function(k) {
  Vue.filter(k, filter[k]);
});

//指令
import directive from './directive'
Object.keys(directive).forEach(function(k) {
  Vue.directive(k, directive[k]);
});

// i18n
/*
import i18n from 'vue-i18n'
import locales from './assets/locales'
var a=function(){
  return{
    function(lang){
      Vue.use(i18n,{
        lang:lang,
        locales:locales
      });
  }
  }
};
console.log(a);
a('cn');*/

//路由
import Router from 'vue-router'
import Query from './Query'
import Extend from './Extend'
Vue.use(Router);

var router=new Router();
router.map({

  '/query': {
    component: Query
  },
  '/extend': {
    component: Extend
  }
});
router.redirect({
  '*':'/query'
});

router.start(App, 'app');



