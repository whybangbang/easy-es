/**
 * Json对象操作，增删改查
 *
 * @author  lellansin
 * @blog    www.lellansin.com
 * @version 0.1
 *
 * 解决一些常见的问题
 * get/set 解决获取和设置时，无节点中断的问题
 *     json.get(Data, 'country', 'province', 'city');
 *     obj.set(data, "ENTRY", "FA_TOKEN_INVALID", 1234);
 * create  可以创建多级节点，若存在则覆盖新值
 *     obj.create(data, 'add', 'hello', 'test', 120);
 * delete  删除节点及其子节点
 *     data['create']['hello']['test'] 节点并设置值为 120
 * print_r 格式化输出对象（调试用）
 *     json.print_r(obj)
 * 实例见底部
 */

function Json() {

}

/**
 * 获取Json对象中的某个节点
 * 例如：json.get(Data, 'country', 'province', 'city');
 * 结果则返回 Data['country']['province']['city']
 * 无则返回false
 */
Json.prototype.get = function(obj, key) {
  var args = this.get.arguments;
  var result = obj;

  for (var i = 1; i < args.length; i++) {
    result = result[args[i]];
    if (result === undefined) {
      return false;
    };
  };
  return result;
};

/**
 * 设置Json对象中的某个节点
 * 例如：obj.set(data, "ENTRY", "FA_TOKEN_INVALID", 1234);
 * 将 data['ENTRY']['FA_TOKEN_INVALID'] 设置为1234
 * 成功true, 失败false
 */
Json.prototype.set = function(obj, key) {
  var args = this.set.arguments;
  if (ergodic_set(obj, args, 1)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 在Json对象中创建节点(若存在则覆盖值)
 * 例如：obj.create(data, 'add', 'hello', 'test', 120);
 * 添加 data['create']['hello']['test'] 节点并设置值为 120
 * 成功true, 失败false
 */
Json.prototype.create = function(obj, key) {
  var args = this.create.arguments;
  if (ergodic_create(obj, args, 1)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 在Json对象中删除节点
 * 例如：obj.delete(prods, 'grade', 'math');
 * 成功true, 失败false
 */
Json.prototype.delete = function(obj, key) {
  var args = this.delete.arguments;
  if (ergodic_delete(obj, args, 1)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 返回Json对象的字符串形式（封装 ECMAScript 库函数）
 */
Json.prototype.getStr = function(obj) {
  return JSON.stringify(obj);
}

/**
 * 解析字符串返回Json对象（封装 ECMAScript 库函数）
 */
Json.prototype.getJson = function(str) {
  return JSON.parse(str);
}

/**
 * 格式化输出Json对象
 */
Json.prototype.print_r = function(obj) {
  console.log("{")
  ergodic_print(obj, "");
  console.log("}")
}

function ergodic_print(obj, indentation) {
  var indent = "  " + indentation;
  if (obj.constructor == Object) {
    for (var p in obj) {
      if (obj[p].constructor == Array || obj[p].constructor == Object) {
        console.log(indent + "[" + p + "] => " + typeof(obj) + "");
        console.log(indent + "{");
        ergodic_print(obj[p], indent);
        console.log(indent + "}");
      } else if (obj[p].constructor == String) {
        console.log(indent + "[" + p + "] => '" + obj[p] + "'");
      } else {
        console.log(indent + "[" + p + "] => " + obj[p] + "");
      }
    }
  }
}

function ergodic_set(obj, args, floor) {
  if (obj.constructor == Object) {
    for (var tmpKey in obj) {
      if (tmpKey == args[floor]) {
        if (floor < args.length - 2) {
          return ergodic_set(obj[tmpKey], args, floor + 1);
        } else {
          // 此时参数floor为倒数第二个，加1值为最后一个
          obj[tmpKey] = args[floor + 1];
          console.log("成功设置，返回true");
          return true;
        }
      }
    }
  }
}

function ergodic_create(obj, args, floor) {
  if (obj.constructor == Object) {
    for (var tmpKey in obj) {
      if (tmpKey == args[floor]) {
        if (floor < args.length - 2) {
          return ergodic_create(obj[tmpKey], args, floor + 1);
        } else {
          obj[tmpKey] = args[floor + 1];
          return true;
        }
      }
    }
  }
  // 节点不存在，创建新节点
  if (floor < args.length - 1) {
    var jsonstr = getJsonFormat(args[args.length - 1]);

    for (var i = args.length - 2; i > floor; i--) {
      jsonstr = '{"' + args[i] + '":' + jsonstr + '}';
    };

    // 使用eval解析第三方Json数据时，可能会执行恶意代码
    // var node = eval('(' + jsonstr + ')');
    var node = JSON.parse(jsonstr);
    obj[args[floor]] = node;
    return true;
  }
}

function ergodic_delete(obj, args, floor) {
  if (obj.constructor == Object) {
    for (var tmpKey in obj) {
      if (tmpKey == args[floor]) {
        if (floor < args.length - 1) {
          return ergodic_delete(obj[tmpKey], args, floor + 1);
        } else {
          delete obj[tmpKey];
          return true;
        }
      }
    }
  }
}


function getJsonFormat(param) {
  if (param.constructor == String) {
    return '"' + param + '"';
  } else {
    return param;
  }
}

