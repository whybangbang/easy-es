/**
 * Created by seaasun on 2016-3-20.
 */
var data={
  field: 'Elasticsearch',
  open: true,
  extend:'es',
  root:true,
  choose:true
}
var data2 = {
  field: 'Elasticsearch',
  open: true,
  extend:'es',
  root:true,
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