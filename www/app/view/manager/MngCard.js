Ext.define('app.view.manager.MngCard', {

    extend: 'Ext.NavigationView',
    xtype: 'mngContainer',

    config: {
        navigationBar: {
            ui: 'dark',
            docked: 'bottom'
        },
        defaultBackButtonText: '����',
        autoDestroy: false,

        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'ʵʱӪҵ',
                hidden: false
            },
            {
                xtype: 'overview',
                pinHeaders: false
            }
        ]
    },
    initialize: function () {
        this.callParent();
        var userStore = Ext.getStore('User').load().data.items[0].data
        var me = this;
        me.getNavigationBar().add({
            xtype: 'button',
            id: 'queryButton',
            text: '���Ѳ�ѯ',
            align: 'right',
            hidden: true,
            hideAnimation: Ext.os.is.Android ? false : {
                type: 'fadeOut',
                duration: 200
            },
            showAnimation: Ext.os.is.Android ? false : {
                type: 'fadeIn',
                duration: 200
            }
        });
        me.getNavigationBar().add({
                    xtype: 'button',
                    id: 'refreshButton',
                    text: 'ˢ��',
                    align: 'right',
                    hidden: false
                });
        me.getNavigationBar().add({
                    xtype: 'button',
                    id: 'goroomButton',
                    text: '��̨',
                    align: 'left',
                    hidden: false
                });
//        me.getNavigationBar().add({
//                    xtype: 'button',
//                    id: 'overViewButton',
//                    text: 'Ӫҵ����',
//                    align: 'left',
//                    hidden: true
//                });
        Ext.Array.each(userStore.rights, function (rights) {
            if (rights == "�䵥")
                me.getNavigationBar().add({
                    xtype: 'button',
                    id: 'orderButton',
                    text: rights,
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                });
            if (rights == "����")
                me.getNavigationBar().add({
                    xtype: 'button',
                    id: 'presentButton',
                    text: rights,
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                });
        });
    }
});
