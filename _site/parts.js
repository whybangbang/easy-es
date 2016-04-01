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
    aggs: {
      group: 6,
      extend: 'aggs',
      choose: true
    },
    _source:{
      open:true,
      group:7,
      arrayValue:true
    }
  },

/***--aggs--***/
aggs:{
  min: {
    group: 1,
    field:'',
    child:[
      {
        field: 'min',
        open: true,
        undelete: true,
        child: [
          {
            field: 'field',
            value: ''
          }
        ]
      }
    ]
  },
  max: {
    group: 1,
    field:'',
    child:[
      {
        field: 'max',
        open: true,
        undelete: true,
        child: [
          {
            field: 'field',
            value: ''
          }
        ]
      }
    ]
  },
  sum: {
    group: 1,
    field:'',
    child:[
      {
        field: 'sum',
        open: true,
        undelete: true,
        child: [
          {
            field: 'field',
            value: ''
          }
        ]
      }
    ]
  },
  avg: {
    group: 1,
    field:'',
    child:[
      {
        field: 'avg',
        open: true,
        undelete: true,
        child: [
          {
            field: 'field',
            value: ''
          }
        ]
      }
    ]
  },
  term: {
    group: 1,
    field:'genders',
    child:[
      {
        field: 'terms',
        open: true,
        undelete: true,
        child: [
          {
            field: 'field',
            value: ''
          }
        ]
      }
    ]
  },
  geohash_grid: {
    group: 1,
    field:'GrainGeoHashGrid',
    child:[
      {
        field: 'geohash_grid',
        open: true,
        undelete: true,
        child: [
          {
            field: 'field',
            value: 'location'
            
          },{
            field: 'precision',
            value: '5'
          }
        ]
      }
    ]
  },
  field_range: {
    group: 1,
    field:'price_ranges',
    child:[
      {
        field: 'range',
        open: true,
        undelete: true,
        child: [
          {
            field: 'field',
            value: 'price',
            undelete: true
          },
          {
            field:'ranges',
            extend:'aggs_ranges',
            array:true,
            undelete: true
          }
        ]
      }
    ]
  }

},
  aggs_ranges:{
    to:{
    },
    from:{

    },
    from_to:{
      object:true,
      child:[
        {field:'from',
          undelete: true},
        {field:'to',
          undelete: true},
      ]

    }
  },

/***--filter--***/
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
    exists: {
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
          field: 'field',
          undelete: true
        }
      ]
    },
    geo_bounding_box: {
      group: 1,
      open: true,
      child: [
        {
          field: 'location',
          open: true,
          undelete: true,
          child: [
            {
              field: 'top_left',
              value: '40.73, -74.1',
              undelete: true,
            },
            {
              field: 'bottom_right',
              value: '40.73, -74.1',
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

  /***--sort--***/
  sort: {
    '[field]': {
      field: '',
      value:'asc',
      selectValue: ['desc', 'asc'],
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
          selectValue:['asc','desc']
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
      selectValue:['asc','desc']
    },
    unnit:{
      value:'km'
    }
  },

  /***--query--***/
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
              value: 'or',
              selectValue: ['or','and'],
              undelete: true
            },
            {
              field: 'analyzer',
              value: 'standard'
            }
          ]
        }
      ]
    },
    match_all:{
      child:[]
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
          field:'filter',
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
    wildcard:{
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
          selectValue: ['and', 'or'],
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
    },
    function_score: {
      extend: 'function_score',
      group: 1,
      choose: true,
    }
  },

  /***--bool--***/
  function_score:{
    filter: {
      extend: 'filter',
      group: 1,
      array: true,
      choose: true,
    },
    query: {
      extend: 'query',
      group: 2,
      array: true,
      choose: true,
    },
    functions: {
      extend: 'function_score_functions',
      group: 3,
      array: true,
      choose: true,
    }
  },

  function_score_functions:{
    guass: {
      open: true,
      group: 1,
      child: [
        {
          field: '',
          open: true,
          undelete: true,
          child: [
            {
              field: 'origin',
              value: '29,117',
              undelete: true
            },
            {
              field: 'scale',
              value: '86400',
              undelete: true
            },
            {
              field: 'delay',
              value: '0.5',
              undelete: true
            },
            {
              field: 'offset',
              value: '0',
              undelete: true
            }
          ]
        }
      ]
    },
    linear: {
      open: true,
      group: 2,
      child: [
        {
          field: '',
          open: true,
          undelete: true,
          child: [
            {
              field: 'origin',
              value: '29,117',
              undelete: true
            },
            {
              field: 'scale',
              value: '86400',
              undelete: true
            },
            {
              field: 'delay',
              value: '0.5',
              undelete: true
            },
            {
              field: 'offset',
              value: '0',
              undelete: true
            }
          ]
        }
      ]
    },
    exp: {
      open: true,
      group: 3,
      child: [
        {
          field: '',
          open: true,
          undelete: true,
          child: [
            {
              field: 'origin',
              value: '29,117',
              undelete: true
            },
            {
              field: 'scale',
              value: '86400',
              undelete: true
            },
            {
              field: 'delay',
              value: '0.5',
              undelete: true
            },
            {
              field: 'offset',
              value: '0',
              undelete: true
            }
          ]
        }
      ]
    }
  },

  /***--bool--***/
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
  

  /***--other mode--***/
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
