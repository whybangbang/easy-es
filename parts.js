/**
 * Created by seaasun on 2016-3-20.
 */
var parts={
  'es':[
    {
      field: 'sort',
      only:true
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
  ],
  'filter':[
    {
      field: 'term',
      child: [
        {field: ''}
      ]
    },
    {
      field:'exist',
      child:[
        {field:'field'}

      ]
    },
    {
      field: 'range',
      child: [
        {
          field: '',
          open: true,
          child: [
            {field: 'from'},
            {field: 'to'}
          ]
        }
      ]
    },
    {
      field: 'bool',
      extend:'bool'
    },
    {
      field: 'and',
      extend:'filter'
    }
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
  ]
};
