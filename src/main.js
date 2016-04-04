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

