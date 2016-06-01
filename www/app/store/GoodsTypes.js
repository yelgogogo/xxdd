Ext.define('app.store.GoodsTypes', {
    extend: 'Ext.data.Store',

    config: {

        model: 'app.model.GoodsType',
        sorters: [
            {
                property: 'DisplayOrder',
                direction: 'ASC'
            }
        ],
        autoLoad: true
    }
});
