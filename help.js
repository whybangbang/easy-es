/**
 * Created by seaasun on 2016-3-19.
 */

//json 格式化工具
function json_formate(json, options) {
  var reg = null,
    formatted = '',
    pad = 0,
    PADDING = '    '; // one can also use '\t' or a different number of spaces

  // optional settings
  options = options || {};
  // remove newline where '{' or '[' follows ':'
  options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
  // use a space after a colon
  options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

  // begin formatting...
  if (typeof json !== 'string') {
    // make sure we start with the JSON as a string
    json = JSON.stringify(json);
  } else {
    // is already a string, so parse and re-stringify in order to remove extra whitespace
    json = JSON.parse(json);
    json = JSON.stringify(json);
  }

  // add newline before and after curly braces
  reg = /([\{\}])/g;
  json = json.replace(reg, '\r\n$1\r\n');

  // add newline before and after square brackets
  reg = /([\[\]])/g;
  json = json.replace(reg, '\r\n$1\r\n');

  // add newline after comma
  reg = /(\,)/g;
  json = json.replace(reg, '$1\r\n');

  // remove multiple newlines
  reg = /(\r\n\r\n)/g;
  json = json.replace(reg, '\r\n');

  // remove newlines before commas
  reg = /\r\n\,/g;
  json = json.replace(reg, ',');

  // optional formatting...
  if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
    reg = /\:\r\n\{/g;
    json = json.replace(reg, ':{');
    reg = /\:\r\n\[/g;
    json = json.replace(reg, ':[');
  }
  if (options.spaceAfterColon) {
    reg = /\:/g;
    json = json.replace(reg, ': ');
  }

  $.each(json.split('\r\n'), function(index, node) {
    var i = 0,
      indent = 0,
      padding = '';

    if (node.match(/\{$/) || node.match(/\[$/)) {
      indent = 1;
    } else if (node.match(/\}/) || node.match(/\]/)) {
      if (pad !== 0) {
        pad -= 1;
      }
    } else {
      indent = 0;
    }

    for (i = 0; i < pad; i++) {
      padding += PADDING;
    }

    formatted += padding + node + '\r\n';
    pad += indent;
  });

  return formatted;
};

//深度复制js对象
function clone(obj){
  var o, obj;
  if (obj.constructor == Object){
    o = new obj.constructor();
  }else{
    o = new obj.constructor(obj.valueOf());
  }
  for(var key in obj){
    if ( o[key] != obj[key] ){
      if ( typeof(obj[key]) == 'object' ){
        o[key] = clone(obj[key]);
      }else{
        o[key] = obj[key];
      }
    }
  }
  o.toString = obj.toString;
  o.valueOf = obj.valueOf;
  return o;
}

//检验是否为为bool、and、or,如果t是返回true
function checkArray(obj){
  var lists=['and','or','bool'];
  for(var i in lists){
    if(obj===lists[i]){
      return true;
    }
  }
  return false;
}

//json转换
function obj_parser(new_obj,obj) {
  if (obj.hasOwnProperty('child')) {

    var tmp = {};
    //转数组
    if (checkArray(obj['field'])) {
      new_obj[obj['field']] = []
      for (var key in obj['child']) {
        var t = clone(this.obj_parser(tmp, obj['child'][key]))
        new_obj[obj['field']].push(t);
      }
      //不转数组
    } else {
      for (var key in obj['child']) {
        new_obj[obj['field']] = this.obj_parser(tmp, obj['child'][key]);
      }

    }
  } else {
    new_obj[obj['field']] = obj['value'];
    return new_obj
  }
  return new_obj
}




