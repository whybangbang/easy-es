/**
 * Created by seaasun on 2016-3-20.
 */

var parts = {
  tree_customize: false,
  elastic_search: {
    sort: {
      extend: 'sort',
      array: true,
      group: 1,
      choose: true
    },
    filter: {
      extend: 'filter',
      group: 2,
      choose: true
    },
    query: {
      group: 3,
      extend: 'query',
      choose: true
    },
    from: {
      group: 4,
    },
    size: {
      group: 5,
    },
    _source:{
      extend:'fields',
      array:true,
      open:true,
      group:6,
      child:[
        {field:""}
      ]
    }
  },


  filter: {
    term: {
      group: 1,
      child: [
        {
          field: '',
          undelete: true
        }
      ]
    },
    exist: {
      group: 1,
      extend: 'exist_null',
      child: [
        {
          field: 'field',
          undelete: true
        }
      ]
    },
    prefix: {
      group: 1,
      disabled: true,
      child: [
        {
          field: 'name.second',
          undelete: true
        }

      ]
    },
    '_cache': {
      value: true,
      disabled: true,
      group: 1
    },
    range: {
      group: 1,
      child: [
        {
          field: '',
          open: true,
          undelete: true,
          child: [
            {
              field: 'gte',
              arrayField:['gte','gt','from']
            },
            {
              field: 'lte',
              arrayField:['lte','lt','to']
            }
          ]
        }
      ]
    },
    bool: {
      group: 1,
      extend: 'filter_bool',
      choose: true,
    },
    and: {
      array: true,
      group: 1,
      choose: true,
      extend: 'filter'
    },
    or: {
      array: true,
      group: 1,
      choose: true,
      extend: 'filter'
    },
    not: {
      group: 1,
      choose: true,
      extend: 'filter'
    },
    missing: {
      group: 1,
      open: true,
      child: [
        {
          field: ''
        }
      ]
    },
    geo_bounding_box: {
      group: 1,
      open: true,
      child: [
        {
          field: '',
          open: true,
          undelete: true,
          child: [
            {
              field: 'top_left',
              undelete: true,
            },
            {
              field: 'bottom_right',
              undelete: true,
            }
          ]
        }
      ]
    },
    geo_distance: {
      group: 1,
      open: true,
      child: [
        {
          field: 'distance',
          open: true,
        },
        {
          field: 'location',
          open: true,
          undelete: true,
          child: [
            {
              field: 'lat',
              open: true,
              undelete: true
            },
            {
              field: 'lon',
              open: true,
              undelete: true

            }
          ]
        }
      ]
    }
  },
  'filter_bool': {
    must: {
      group: 1,
      array: true,
      choose: true,
      extend: 'filter'
    },
    must_not: {
      group: 2,
      array: true,
      choose: true,
      extend: 'filter'
    },
    should: {
      group: 3,
      array: true,
      choose: true,
      extend: 'filter'
    },
  },
  'exist_null': {
    null_value: {
      value: "_null_"
    }
  },
  sort: {
    '[field]': {
      field: '',
      value:'asc',
      arrayValue: ['desc', 'asc'],
    },
    _geo_distance: {
      open: true,
      group: 1,
      extend:'sort_geo_distance',
      force_only:true,
      child: [
        {
          field: 'location',
          undelete: true,
          open: true,
          child: [
            {
              field: 'lat',
              undelete: true
            },
            {
              field: 'lon',
              undelete: true
            }
          ]
        },
        {
          field: 'order',
          value:'asc',
          arrayValue:['asc','desc']
        },
        {
          field: 'unit',
          value:'km'
        }
      ]
    }
  },
  sort_geo_distance:{
    order:{
      value:'asc',
      arrayValue:['asc','desc']
    },
    unnit:{
      value:'km'
    }
  },
  query: {
    term: {
      open: true,
      group: 1,
      child: [
        {
          field: ''
        }
      ]
    },
    match: {
      open: true,
      group: 1,
      child: [
        {
          field: '',
          open: true,
          extend: 'ony_analyzer',
          undelete: true,
          child: [
            {
              field: 'query',
              undelete: true
            },
            {
              field: 'operator',
              value: 'and',
              arrayValue: ['and', 'or'],
              undelete: true
            },
            {
              field: 'analyzer'
            }
          ]
        }
      ]
    },
    filtered:{
      open:true,
      group:1,
      child:[
        {
          field:'query',
          extend:'query',
          undelete:true,
          },
        {
          field:'query',
          extend:'filter',
          undelete:true,
        },
    ]
    },
    prefix:{
      open:true,
      group:1,
      child:[
        {field:'',
        undelete:true
        }
      ]
    },
    query_string:{
      open:true,
      group:1,
      child:[
        {
          field:'query',
          value:'content:this OR name:this) AND (content:that OR name:that)',
          undelete:true
        }
      ]
    },
    regexp:{
      open:true,
      group:1,
      child:[
        {
          field:'name',
          value:'s.*y',
          undelete:true
        }
      ]
    },
    range: {
      group: 1,
      child: [
        {
          field: '',
          open: true,
          undelete: true,
          child: [
            {
              field: 'gte',
              arrayField:['gte','gt','from']
            },
            {
              field: 'lte',
              arrayField:['lte','lt','to']
            }
          ]
        }
      ]
    },
    multi_match: {
      extend: 'only_analyzer',
      group: 1,
      open: true,
      child: [
        {
          field: 'query',
          undelete: true,
        },
        {
          field: 'fields',
          extend: 'fields',
          array: true,
          open: true,
          undelete: true,
          child: [
            {
              'field': ''
            },
            {
              'field': ''
            },
          ]
        },
        {
          field: 'operator',
          value: 'and',
          arrayValue: ['and', 'or'],
          undelete: true
        },
        {
          field: 'analyzer',
          group: 1,
        }
      ]
    },
    bool: {
      extend: 'query_bool',
      group: 1,
      choose: true,
    }
  },
  query_bool: {
    must: {
      extend: 'query',
      group: 1,
      array: true,
      choose: true,
    },
    must_not: {
      extend: 'query',
      group: 2,
      array: true,
      choose: true,
    },
    should: {
      extend: 'query',
      group: 3,
      array: true,
      choose: true,
    },
    minimum_should_match: {
      group: 4,
    },
    boost: {
      field: "boost",
      group: 5,
    }
  },
  only_analyzer: {
    analyzer: {
      open: true,
      group: 1,
    }
  },
  fields: {
    '[filed]': {
      field: '',
    }
  }
};
