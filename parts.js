/**
 * Created by seaasun on 2016-3-20.
 */
var parts={
  'es':[
    {
      field: 'sort',
      extend:'sort',
      array:true,
      group:1,
      choose:true,
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
      field: 'from',
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
          undelete:true}
      ]
    },
    {
      field:'prefix',
      group:1,
      disabled:true,
      child:[
        {field:'name.second',
          undelete:true}

      ]
    },
    {
      field:'_cache',
      value:true,
      disabled:true,
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
              },
            {field: 'to',
              }
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
      array:true,
      group:1,
      choose:true,
      extend:'filter'
    },
    {
      field: 'or',
      array:true,
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
    {
      field:'missing',
      group:1,
      open:true,
      child:[
        {
          field:''
        }
      ]
    },
    {
      field:'geo_bounding_box',
      group:1,
      open: true,
      child:[
        {
          field:'',
          open: true,
          undelete:true,
          child:[
            {
              field:'top_left',
              undelete:true,
            },
            {
              field:'bottom_right',
              undelete:true,
            }
          ]
        }
      ]
    },
    {
      field:'geo_distance',
      group:1,
      open:true,
      child:[
        {
          field:'distance',
          open:true,
        },
        {
          field:'location',
          open:true,
          undelete:true,
          child:[
            {
              field:'lat',
              open:true,
              undelete:true
            },
            {
              field:'lon',
              open:true,
              undelete:true

            }
          ]
        }
      ]
    }
  ],
  'bool':[
    {
      field: 'must',
      group:1,
      array:true,
      choose:true,
      extend:'filter'
    },
    {
      field: 'must_not',
      group:1,
      array:true,
      choose:true,
      extend:'filter'
    },
    {
      field: 'should',
      group:1,
      array:true,
      choose:true,
      extend:'filter'
    },
  ],
  'exist_null':[
    {
    field:"null_value",
    value:"_null_"
  }],
  'sort':[
    {
      field:'',
      name:'[field]',
    },
    {
      field:'_geo_distance',
      open:true,
      group:1,
      child:[
        {
          field:'location',
          undelete:true,
          open:true,
          child:[
            {
              field:'lat',
              undelete:true
            },
            {
              field:'lon',
              undelete:true
            }
          ]

        }
      ]


    }
  ]
};
