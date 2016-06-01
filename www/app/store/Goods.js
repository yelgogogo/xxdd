Ext.define('app.store.Goods', {
    extend: 'Ext.data.Store',

    config: {

        model: 'app.model.Good',

        grouper: {
            sortProperty: 'GoodsTypeName',
            groupFn: function (record) {
                return record.get('GoodsTypeName');
            }
        },

        sorters: [        
            {
                property: 'Price',
                direction: 'DESC'
            },
            {
                property: 'GoodsName',
                direction: 'ASC'
            }
        ]
    }
});
