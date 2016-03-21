/**
 * Created by seaasun on 2016-3-20.
 */
var parts={
  'es':[
    {
      field: 'sort',
      group:1,
    },
    {
      field: 'filter',
      extend:'filter',
      group:2,
      choose:true,
    },

    {
      field: 'query',
      group:3,
      child: [
        {
          field: 'match',
          open:true,
          undelete:true,
          child: [
            {field: ''}
          ]
        }
      ]
    },
    {
      field: 'form',
      group:4,
    },
    {
      field: 'size',
      gorup:5,
    }
  ],
  'filter':[
    {
      field: 'term',
      group:1,
      child: [
        {field: '',
          undelete:true}
      ]
    },
    {
      field:'exist',
      group:1,
      extend:'exist_null',
      child:[
        {field:'field',
          undelete:true},


      ]
    },
    {
      field:'prefix',
      group:1,
      child:[
        {field:'name.second',
          undelete:true}

      ]
    },
    {
      field:'_cache',
      value:true,
      group:2
    },
    {
      field: 'range',
      group:1,
      child: [
        {
          field: '',
          open: true,
          undelete:true,
          child: [
            {field: 'from',
              undelete:true,},
            {field: 'to',
              undelete:true,}
          ]
        }
      ]
    },
    {
      field: 'bool',
      group:1,
      extend:'bool',
      choose:true,
    },
    {
      field: 'and',
      group:1,
      choose:true,
      extend:'filter'
    },
    {
      field: 'or',
      group:1,
      choose:true,
      extend:'filter'
    },
    {
      field: 'not',
      group:1,
      choose:true,
      extend:'filter'
    },
  ],
  'bool':[
    {
      field: 'must',
      child: [
        {field: ''}
      ]
    },
    {
      field: 'must_not',
      child: [
        {field: ''}
      ]
    },
    {
      field: 'should',
      child: [
        {field: ''}
      ]
    },
  ],
  'exist_null':[
    {
    field:"null_value",
    value:"_null_"
  }]
};
