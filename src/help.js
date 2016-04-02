/**
 * Created by seaasun on 2016-3-19.
 */
export default {
  // 深度复制js对象
  clone: function (obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
      return;
    } else if (window.JSON) {
      str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ?
          cloneObj(obj[i]) : obj[i];
      }
    }
    return newobj;
  },


  //检验是否为为bool、and、or,如果t是返回true
  checkArray: function (obj) {
    var lists = ['and', 'or', 'bool', 'must', 'must_not', 'should', 'sort'];
    for (var i in lists) {
      if (obj === lists[i]) {
        return true;
      }
    }
    return false;
  },


  //检查是否为数组
  isArray: function (obj) {
    return (typeof obj == 'object') && obj.constructor == Array;
  },


  //json转换
  obj_parser: function (new_obj, obj) {
    if (obj.hasOwnProperty('child')) {


      //转数组
      if (obj['array']) {
        new_obj[obj['field']] = [];
        for (var key in obj['child']) {
          //数组中包含有连续对象
          if (obj['child'][key]['object']) {
            var o = {};
            var tmpSon = {};

            for (var keySon in obj['child'][key]['child']) {
              //有子对象
              if (obj['child'][key]['child'][keySon].hasOwnProperty('child')) {
                o[obj['child'][key]['child'][keySon]['field']] = this.obj_parser(tmpSon, obj['child'][key]['child'][keySon])
              }
              //无子对象
              else {
                console.log(1111)
                o[obj['child'][key]['child'][keySon]['field']] = obj['child'][key]['child'][keySon]['value']
              }
            }
            console.log(o)
            new_obj[obj['field']].push(o);
            //正常情况

            //正常情况
          } else {
            var tmp = {};
            new_obj[obj['field']].push(this.obj_parser(tmp, obj['child'][key]));
          }

        }

        //不转数组
      } else {
        var tmp = {};
        for (var key in obj['child']) {
          new_obj[obj['field']] = this.obj_parser(tmp, obj['child'][key]);
        }

      }
    } else {
      new_obj[obj['field']] = obj['value'];
      return new_obj
    }
    return new_obj
  },
  //保存文件到本地：http://www.alloyteam.com/2014/01/use-js-file-download/
  downloadFile(fileName, content){
    var aLink = document.createElement('a');
    var blob = new Blob([content]);
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);
  }
}




