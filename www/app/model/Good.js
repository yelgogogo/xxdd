Ext.define('app.model.Good', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            { name: 'ID', type: 'int' },
            { name: 'GoodsTypeName', type: 'string' },
            { name: 'DisplayOrder', type: 'int' },
            { name: 'GoodsName', type: 'string' },
            { name: 'Unit', type: 'string' },
            { name: 'Price', type: 'number' },
            { name: 'GoodsCount', type: 'int', defaultValue: 0 },
            { name: 'IsPack', type: 'boolean' },
            { name: 'GoodsDetails', type: 'AUTO' },
            { name: 'Remarks', type: 'string' },
            { name: 'IsHot', type: 'boolean' }


        ]
//        ,
//        hasMany  : {
//            model: 'app.model.GoodsDetail',
//            name: 'GoodsDetails'
//                }
    }
});