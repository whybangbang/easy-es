<template>
  <li :class="{'item-no-child-box':!model.extend}">
    <div >
      <!--有子项,显示+--><span @click="toggleOpen" v-if="isFolder"
                          :class="{ 'item-close': !open, 'item-open': open }">{{open ? '-&nbsp;' : '+'}}&nbsp;</span>
      <!-- 无子项，补白--><span @click="toggleOpen" v-else>&nbsp;&nbsp;&nbsp;</span>

      <!--field--><input v-if="!model.arrayField&&!model.object"
                         type="text" v-model="model.field" class="data-field" placeholder="field"
    >
      <span v-if="model.object">{{model.field}}</span>
      <select v-if="model.arrayField" v-model="model.field" class="tree_select">
        <option v-for="v in model.arrayField ">{{v}}</option>
      </select>

      <!--value-->
                <span v-if="!model.child  && !model.extend" class="data-value">
                    <span>:</span>
                    <input  v-if="!model.selectValue && !model.arrayValue"
                            type="text" v-model="model.value" class="data-value" placeholder="{{model.placeholder || 'value'}}">



                    <select v-if="model.selectValue" v-model="model.value" class="tree_select">
                      <option v-for="v in model.selectValue ">{{v}}</option>
                    </select>

            </span>

      <!--启用自定义模式--><span v-if="parts.tree_customize">
            <a @click="extendCustomizeChild" class="custom-add">add</a>
            <span class="custom-array">
                <input type="checkbox" id="customize-array" v-model="model.array">
                <label for="customize-array">array</label>
            </span>
            </span>

      <span @click="addArrayValue" v-if="model.arrayValue" class="choose-child-add" >+</span>
      <span @click="delChild" v-if="!model.undelete" class="delete-child">X</span>
      <!-- array value -->
      <ul v-if="model.arrayValue">

        <!--行内数组<input
            v-model="arrayValue" placeholder="array,array,array" class="data-value" style="width:120px;margin-right:0">-->
        <!--<a  href='#' class="choose-child-add" @click.stop="addArrayValue" >+</a>-->

        <array v-for="item in model.value" track-by="$index" ></array>
      </ul>

      <!--有括展项-->
            <span v-if="model.extend" class="choose-child">
                <a  href='#' class="choose-child-add" @click.stop="showchooseChild" v-bind:class="{'color-grey':view.hideChooseChildBtn}">+</a>

              <!-- 下拉扩展项 -->
                <ul v-show="chooseChildShow" class="choose-child-box">
                  <li v-for="item in subparts"
                      v-show="!item.only"
                      v-if="!item.disabled"
                      @click.stop="extendChild($key)">
                    <a href="#!">{{$key}}</a>
                  </li>

                </ul>
            </span>

    </div>
    <ul v-show="open" v-if="isFolder"
        :class="{'item-array':model.array,'item-no-child':!model.extend}"
    >
      <tree
        class="data-item"
        v-for="model in model.child"
        :model="model"
        :parts="parts"
      >
      </tree>

    </ul>
  </li>

</template>

<script>
  import help from '../help'
  import Vue from 'vue'
  import Tree from './Tree'

export default {
  props: ['model', 'parts'],
  name:"tree",
  data: function () {
    return {
      array: this.model.array ? this.model.array : false,
      open: this.model.open ? this.model.open : false,
      chooseChildShow: this.model.choose ? this.model.choose : false,
      subparts:this.model.extend? help.clone(parts[this.model.extend]): '',
      view: {},
    }
  },
  created: function () {

    //清除父展开的选项
    if (this.$parent.hasOwnProperty('chooseChildShow')) {
      this.$parent.chooseChildShow = false;
    }

    //自动增加value array
    //if(this.model.arrayValue && !this.model.value){
    //  this.model.value=['','']
    //}

    //arrayValue 处理
    if (this.model.arrayValue) {
      Vue.set(this.model, 'value', []);
      this.model.value.push('');
      //this.model.value.push('');
    }


  },
  ready: function () {
    //only 处理
    if (this.$parent.hasOwnProperty('model')) {//非第一个组件
      //if(!this.$parent.model.array){ //排除and、or

      for (var son in this.$parent.$children) { //遍历子对象

        if (this.$parent.$children[son].model.group) {//判断是否分组
          var group_number = this.$parent.$children[son].model.group;//得到分组号

          //修改数据subparts
          for (var part in this.$parent.subparts) {
            if (!this.$parent.model.array || this.$parent.subparts[part].force_only) {
              if (this.$parent.subparts[part].group === group_number) {
                Vue.set(this.$parent.subparts[part], 'only', true)
              }
            }
          }
        }
      }
      //}

      //检查父元素是否可以增加新的子元素
      var part_open = true;
      for (var part in this.$parent.subparts) {//遍历父元素的记录状态
        if (!this.$parent.subparts[part].only) {
          part_open = false
        }
      }
      if (part_open) {
        Vue.set(this.$parent.view, 'hideChooseChildBtn', true)
      }
    }

  },
  computed: {
    isFolder: function () {
      return this.model.child &&
        this.model.child.length
    },
    isArray: function () {
      return (typeof this.model.value == 'object') && this.model.value.constructor == Array;
    },
    /*行内显示arrayValue:{
     set: function(newValue){

     Vue.set(this.model,'value',newValue.split(','))
     return newValue
     }
     },*/

  },
  methods: {
    toggleOpen: function () {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
    //显示可添加的子项
    showchooseChild: function () {

      //影藏其他展开的选项
      function hide(obj) {
        obj.$data.chooseChildShow = false;
        //隐藏所有的子选项
        for (var i in obj.$children) {
          hide(obj.$children[i])
        }
      }

      hide(this.$parent);

      this.chooseChildShow = true;
    },

    //扩展子项目
    //field str 子项目的名称
    extendChild: function (field) {
      //影藏所有展开的弹出菜单
      function hide(obj) {
        obj.$data.chooseChildShow = false;
        //隐藏所有的子选项
        for (var i in obj.$children) {
          hide(obj.$children[i])
        }
      }

      hide(this.$parent);

      // 检查有无子child 数组
      if (!this.isFolder) {
        Vue.set(this.model, 'child', []);
      }

      //添加子项目,用push方法
      //this.addChild(this.model.extend,field);

      var child = help.clone(this.subparts[field]);

      //增加 field 名称
      if (!child.hasOwnProperty('field')) {
        child.field = field;
      }

      this.model.child.push(child);

      //展开新添加的内容
      this.open = true
      this.model.child[this.model.child.length - 1]['open'] = true;


    },
    //扩展自定义项目
    extendCustomizeChild: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'child', []);
      }
      this.model.child.push({
        'field': '',
        'open': true
      })

    },
    //删除自项目
    delChild: function () {
      for (var i in this.$parent.$children) {
        if (this === this.$parent.$children[i]) {
          //通过父删除自己
          this.$parent.model.child.splice(i, 1)

          //唯一属性的恢复 only处理
          for (var part in this.$parent.subparts) {
            if (this.$parent.subparts[part]['group'] === this.model.group) {
              this.$parent.subparts[part]['only'] = false
            }
          }
          break;
        }
      }

      //检查父有无可增加的项
      for (part in this.$parent.subparts) {
        if (!this.$parent.subparts[part].only) {
          this.$parent.view.hideChooseChildBtn = false
        }
      }
    },
    addArrayValue: function () {
      this.model.value.push('')
    },
  }
}

</script>

<style scoped>

</style>
