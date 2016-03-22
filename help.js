/**
 * Created by seaasun on 2016-3-19.
 */


function help() {
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

    $.each(json.split('\r\n'), function (index, node) {
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
  function clone(obj) {
    var o, i, j, k;
    if (typeof(obj) != "object" || obj === null)return obj;
    if (obj instanceof (Array)) {
      o = [];
      i = 0;
      j = obj.length;
      for (; i < j; i++) {
        if (typeof(obj[i]) == "object" && obj[i] != null) {
          o[i] = arguments.callee(obj[i]);
        }
        else {
          o[i] = obj[i];
        }
      }
    }
    else {
      o = {};
      for (i in obj) {
        if (typeof(obj[i]) == "object" && obj[i] != null) {
          o[i] = arguments.callee(obj[i]);
        }
        else {
          o[i] = obj[i];
        }
      }
    }

    return o;
  }

  //检验是否为为bool、and、or,如果t是返回true
  function checkArray(obj) {
    var lists = ['and', 'or', 'bool', 'must', 'must_not', 'should', 'sort'];
    for (var i in lists) {
      if (obj === lists[i]) {
        return true;
      }
    }
    return false;
  }

  //json转换
  function obj_parser(new_obj, obj) {
    var tmp = {};

    //中间情况
    if (obj.hasOwnProperty('child')) {
      //转数组
      if (obj['array']) {
        new_obj[obj['field']] = [];
        for (var key in obj['child']) {

          //TODO 这里有个问题，每次迭代完t会莫名奇妙增加1位，只好用小技巧删除，但不安全
          var t = clone(this.obj_parser(tmp, obj['child'][key]));

          new_obj[obj['field']].push(t);
        }
        //不转数组
      } else {
        for (var key in obj['child']) {
          new_obj[obj['field']] = this.obj_parser(tmp, obj['child'][key]);
        }

      }
      //最终
    } else {
      new_obj[obj['field']] = obj['value'];
      return new_obj
    }
    return new_obj
  }

  function isArray(obj) {
    return (typeof obj == 'object') && obj.constructor == Array;
  }

  return {
    json_formate: json_formate,
    clone: clone,
    checkArray: checkArray,
    obj_parser: obj_parser,
    isArray: isArray
  }
}
var help = help()
function obj_parser(new_obj, obj) {
  if (obj.hasOwnProperty('child')) {

    var tmp = {};
    //转数组
    if (help.checkArray(obj['field'])) {
      new_obj[obj['field']] = []
      for (var key in obj['child']) {
        new_obj[obj['field']].push(obj_parser(tmp, obj['child'][key]));
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



