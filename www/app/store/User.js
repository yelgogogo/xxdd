Ext.define('app.store.User', {
    extend: 'Ext.data.Store',

    config: {

        model: 'app.model.User',
        autoLoad: true
    }
});
