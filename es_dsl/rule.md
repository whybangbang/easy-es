各组件可扩展情况
===
说明：

1. 一部分只存储其自身和其直接子元素
2. 其直接子元素再根据新的部分记录子元素的直接子元素
3. sort:? 表示filed写’sort’，value用户填写；？：？ field和value都由用户填写




 编写示例：

1.  field  字键名
2.  value 值，根据用户填的可自动生成，也可提供默认值
3.  extend 可扩展，默认为false不可扩展，为ture为随意扩展，为filter时为term、range、exist、bool、and扩展
4.  open 展开，默认为false，为true时默认为展开的
5.  root 是否为根元素，根元素不可删除
6. choose 是否自动显示菜单 true为显示，false默认值
7.  undelete 无法删除，默认为false可删除，为true可删除
8. group 组，用数字表明，同1组的在一个层下只能出现1次
9.  and、or、bool按array处理,在help中提供checkArray()
10.  disabled: 不显示该字段，默认为false显示，true为不显示
11. name:别名，用于field解释不清楚时用
12. placeholder:value的提示词，不填显示value
14. arrayValue: 提供value的选项 如 arrayValue=['and','or'],请将value='and',出现预先值

 概念辨析：
1.  extend：增加子项
2.  add：增同级项目
3.  open： 展开显示
4.  only: 此值为唯一
5.  tree: 原始数据
6.  parts: 辅助供选择的； subparts 各子临时缓存的
7.  dsl：最终生成的语句

全局状态
tree_customize：true 打开自定义修改 false 关闭（默认）

TODO
1. 去除不要的+
2. 必填的不能删
整体部分
=
    es
        sort
        filter
        query
        form
        size

    sort：？

    filter
        term
        exist
        range
        bool
        and

    query
        match

    from:?

    size:?


滤镜部分
=
    term
        ？：？

    exist
        ？：？

    range
        ？
            from:?
            to:?

    bool
        must
        must_not
        should

    and
        同滤镜部分


bool部分
=

    must
       ？:?
    must_not
       ?:?
    should
       ?:?

exist_null部分
==
    null_value：_null_
