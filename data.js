/**
 * Created by seaasun on 2016-3-20.
 */
var data = {
  field: 'Elasticsearch',
  open: 'true',
  extend:'es',
  child: [
    {
      field: 'sort',
    },
    {
      field: 'filter',
      extend:'filter',
    },

    {
      field: 'query',
      child: [
        {
          field: 'match',
          child: [
            {field: ''}
          ]
        }
      ]
    },
    {
      field: 'form',
    },
    {
      field: 'size',
    }

  ]
}