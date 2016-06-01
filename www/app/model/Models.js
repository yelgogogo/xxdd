//----------------------------Goods----------------------------------------
Ext.define('app.model.Good', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            { name: 'ID', type: 'int' },
            { name: 'GoodsTypeName', type: 'string' },
            { name: 'GoodsName', type: 'string' },
            { name: 'Unit', type: 'string' },
            { name: 'Price', type: 'number' },
            { name: 'GoodsCount', type: 'int', defaultValue: 0 },
            { name: 'IsPack', type: 'boolean' },
            { name: 'GoodsDetails', type: 'AUTO' },

        ]
        //        ,
        //        hasMany  : {
        //            model: 'app.model.GoodsDetail',
        //            name: 'GoodsDetails'
        //                }
    }
});
//----------------------------GoodsDetail----------------------------------------
Ext.define('app.model.GoodsDetail', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            { name: 'ID', type: 'int' },
            { name: 'PackGoodsID', type: 'int' },
            { name: 'GoodsTypeName', type: 'string' },
            { name: 'GoodsName', type: 'string' },
            { name: 'Unit', type: 'string' },
            { name: 'Price', type: 'number' },
            { name: 'GoodsDetailCount', type: 'int', defaultValue: 0 },
            { name: 'GroupCount', type: 'int', defaultValue: 0 },
            { name: 'GroupName', type: 'string' },
            { name: 'IsFixed', type: 'boolean' }
        ]
        //        ,
        //        belongsTo: 'app.model.Good',
    }
});
//----------------------------GoodsType----------------------------------------
Ext.define('app.model.GoodsType', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            { name: 'GoodsTypeName', type: 'string' }
        ]
    }
});
//----------------------------Order----------------------------------------
Ext.define('app.model.Order', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            { name: 'OrderID', type: 'int' },
            { name: 'OrderDetailID', type: 'int' },
            { name: 'OrderTime', type: 'string' },
            { name: 'RoomName', type: 'string' },
            { name: 'OrderSerialNumber', type: 'string' },
            { name: 'ProduceSerialNumber', type: 'string' },
            { name: 'ProduceSite', type: 'string' },
            { name: 'PackNo', type: 'int' },
            { name: 'GoodsName', type: 'string' },
            { name: 'Price', type: 'string' }, //{ name: 'Price', type: 'number' },
            {name: 'Unit', type: 'string' },
            { name: 'GoodsCount', type: 'string' }, //{ name: 'GoodsCount', type: 'int' },
            {name: 'SubTotal', type: 'string' }, //{ name: 'SubTotal', type: 'number' },
            {name: 'IsPresent', type: 'boolean' },
            { name: 'PresentWay', type: 'string' },
            { name: 'PresentUser', type: 'string' },
            { name: 'IsCanceled', type: 'boolean' },
            { name: 'CanceledUser', type: 'string' },
            { name: 'SendUser', type: 'string' },
            { name: 'Remarks', type: 'string' },
            { name: 'BackColor', type: 'string' },
            { name: 'ForeColor', type: 'string' }
        ]
    }
});
//----------------------------Rights----------------------------------------
Ext.define('app.model.Rights', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'rightsname', type: 'string' }
        ]
    }
});
//----------------------------Room----------------------------------------
Ext.define('app.model.Room', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            { name: 'ID', type: 'string' },
            { name: 'RoomName', type: 'string' },
            { name: 'PriceCase', type: 'string' },
            { name: 'RoomStateName', type: 'string' },
            { name: 'RoomColor', type: 'string' },
            { name: 'RoomAreaName', type: 'string' },
            { name: 'RoomTypeName', type: 'string' },
            { name: 'ReservationEmpName', type: 'string' },
            { name: 'ReservationDateTime', type: 'string' },
            { name: 'OpenRoomDateTime', type: 'string' },

            { name: 'MinConsume', type: 'string' },
            { name: 'ConsumeAmount', type: 'string' },
            { name: 'PresentAmount', type: 'string' },
            { name: 'DiscountAmount', type: 'string' },
            { name: 'ServiceAmount', type: 'string' }
        ]
    }
});
//----------------------------User----------------------------------------
Ext.define('app.model.User', {
    extend: 'Ext.data.Model',

    requires: [
        'app.model.Rights',
        'Ext.data.Field'
    ],

    config: {
        fields: [
            { name: 'username', type: 'string' },
            { name: 'userno', type: 'string' },
            { name: 'password', type: 'string' },
            { name: 'isremember', type: 'int' }
        ],
        validations: [
			{ type: 'presence', field: 'username' },
			{ type: 'presence', field: 'password' }
		],
        hasMany: { model: 'Rights', name: 'rights' },
        proxy: {
            type: 'localstorage',
            id: 'dxUser'
        }
    }
});
//----------------------------User----------------------------------------