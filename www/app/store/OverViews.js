Ext.define('app.store.OverViews', {
    extend: 'Ext.data.Store',

    config: {

        model: 'app.model.OverView',

        grouper: {
            sortProperty: 'GroupName',
            groupFn: function (record) {
                return record.get('GroupName');
            }
        }
//        ,
//        sorters: [
//            {
//                property: 'ID',
//                direction: 'ASC'
//            }
//        ]
    }
});
