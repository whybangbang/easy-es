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
      only:true
    },

    {
      field: 'query',
      only:true,
      child: [
        {
          field: 'match',
          only:true,
          child: [
            {field: ''}
          ]
        }
      ]
    },
    {
      field: 'form',
      only:true
    },
    {
      field: 'size',
      only:true
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
