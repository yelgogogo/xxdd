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