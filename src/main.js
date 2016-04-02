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

