<template>
<div>
  <nav>
    <div class=" row">
      <div class="col l4 s4 m4">
      <a href="#!" class="brand-logo "><img src="../static/img/logo.png"><span>&nbsp;&nbsp;Easy Es</span></a>
      </div>
      <div class="col l3 s8 m8">
      <ul class="nav-center">
        <li><a v-link="{ path: '/query', activeClass: 'activate' }" word="查询">query</a></li>
        <li><a v-link="{ path: '/extend', activeClass: 'activate' }" word="扩展">extend</a></li>
      </ul>
      </div>
      <div class="col l5 s12 s12">
      <ul class="" id="nav-mobile">
        <slot name="nav-right"></slot>
        <li><a class="grey-text text-lighten-3" href="https://github.com/whybangbang/es_query_dsl_mindmanger" target="_blank">
          Github</a></li>
        <li><a href="#" word="文档" target="_blank">Wiki</a></li>
        <!--<li>
          <a v-show="lang==='en'" @click="selectLang('cn')">中文</a>
          <a v-show="lang==='cn'" @click="selectLang('en')">English</a>
        </li>-->
      </ul>
      </div>
      <div style="clear:both"></div>
    </div>
  </nav>

  <slot></slot>

  <footer class="page-footer">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Easy Es</h5>
          <p class="grey-text text-lighten-4">轻点鼠标，快速写出elasticsearch语句!欢迎补充子选项<br>本项目遵循BSD协议。</p>
        </div>
        <div class="col l4 offset-l2 s12">
          <ul>
            <li><a class="grey-text text-lighten-3" href="https://github.com/whybangbang/es_query_dsl_mindmanger">View
              project on Github</a></li>
            <li><a class="grey-text text-lighten-3" href="http://es.xiaoleilu.com/" target="_blank">Elasticsearch 权威指南</a></li>

          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        2016 wangbangbang seaasun
        <a class="grey-text text-lighten-4 right" href="https://www.5milesapp.com/" target="_blank"><img
          src="../static/img/fivemiles.jpg" class="footer-5m" >&nbsp;&nbsp;5 miles offers support</a>


      </div>
    </div>
  </footer>
</div>
</template>

<script>
export default {
  data () {
    return {
      lang:''

    }
  },
  beforeCompile(){
    this.lang=word.nowLang
  },
  methods:{
    selectLang(lang){
      this.lang=lang;
      word.change(lang)
    }
  }
}
</script>

<style >

</style>
