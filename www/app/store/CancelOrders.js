Ext.define('app.store.CancelOrders', {
    extend: 'Ext.data.Store',

    config: {

        model: 'app.model.Order',
        grouper: {
            sortProperty: 'OpCode',
//            sortProperty: 'Price', direction: "ASC",
            groupFn: function (record) {
                return record.get('OpCode');
            }
        },

    }
});
