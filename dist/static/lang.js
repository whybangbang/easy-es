/**
 * Created by seaasun on 2016-4-4.
 */
function word(conf) {
  var config = conf ? conf : {
    type: 'inline',
    lang: ['en', 'cn']
  };

  var nowLang=config.lang[0];

  function inlinTranse(el, lang) {
    var word = el.getAttribute('word');
    el.setAttribute('word', el.innerHTML);
    el.setAttribute('word-l', lang);
    el.innerHTML = word;
  }

  function inlineWrap(el, lang) {

    //改变的语言不是默认项
    if (lang !== config.lang[0]) {
     if (el.getAttribute('word-l') !== lang) {
        inlinTranse(el, lang);
      }
    } else{
      if(el.getAttribute('word-l') && el.getAttribute('word-l') !== lang)
      inlinTranse(el, lang);
    }
  }

  //自动调用
  function translate() {
    var els = document.querySelectorAll("[word]");
    for (var i = 0; i < els.length; i++) {
      inlineWrap(els[i], nowLang);
    }
  }
  //改变语言
  function change(lang){
    if (config.lang.indexOf(lang )=== -1) {
      throw 'no language in config';
    }else{
      nowLang=lang
      translate()
    }
  }
  //在js中调用
  function get(word){
    return word[config.lang.indexOf(nowLang)]
  }
  return{
    change:change,
    translate:translate,
    get:get
  }
}
