各组件可扩展情况
===
说明：

1. 一部分只存储其自身和其直接子元素
2. 其直接子元素再根据新的部分记录子元素的直接子元素
3. sort:? 表示filed写’sort’，value用户填写；？：？ field和value都由用户填写


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
