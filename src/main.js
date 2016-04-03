import Vue from 'vue'
import App from './App'

// 整体框架
Vue.config.debug = true;
Vue.config.devtools = true;

/* eslint-disable no-unused-vars
var vm = new Vue({
  el: 'body',
  components: { App }
});*/

//滤镜
import filter from './filter'

Object.keys(filter).forEach(function(k) {
  Vue.filter(k, filter[k]);
});

//路由
import Router from 'vue-router'
import Query from './Query'
import Extend from './Extend'
Vue.use(Router);

var router=new Router();
router.map({
  '*':{
    component: Query
  },
  '/index': {
    component: Query
  },
  '/extend': {
    component: Extend
  }
});

router.start(App, 'app');

