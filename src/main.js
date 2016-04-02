import Vue from 'vue'
import App from './App'

// 整体框架
Vue.config.debug = true;
Vue.config.devtools = true;

/* eslint-disable no-unused-vars */
var vm = new Vue({
  el: 'body',
  components: { App }
})
