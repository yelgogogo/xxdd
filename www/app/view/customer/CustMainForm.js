Ext.define('app.view.customer.CustMainForm', {

    extend: 'Ext.NavigationView',
    xtype: 'custmainform',

    config: {
        navigationBar: {
            ui: 'dark',
            docked: 'bottom',
            hidden: false
        },
        defaultBackButtonText: '����',
        autoDestroy: false,

        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: '',
                hidden: false
            },
            {
                xtype: 'goodstypes',
                pinHeaders: false
            }
        ]
    },
    CreateMyButton: function (btnID, btnText, btnAlign, btnIsHidden) {
        var me = this;
        me.getNavigationBar().add({
            xtype: 'button',
            id: btnID,
            text: btnText,
            align: btnAlign,
            hidden: btnIsHidden,
            hideAnimation: Ext.os.is.Android ? false : {
                type: 'fadeOut',
                duration: 200
            },
            showAnimation: Ext.os.is.Android ? false : {
                type: 'fadeIn',
                duration: 200
            }
        });
    },
    initialize: function () {
        this.callParent();
        var me = this;
        me.CreateMyButton('queryButton', '���Ѳ�ѯ', 'right', false);
        me.CreateMyButton('orderButton', '�µ�', 'right', false);

//        Ext.Array.each(userStore.rights, function (rights) {
//            if (rights == "�䵥") {
//                me.CreateMyButton('orderButton', '�䵥', 'right', true);
//                //me.CreateMyButton('orderMemButton', '��Ա�㵥', 'right', true);
//            }
//            if (rights == "�����ѯ")
//                me.CreateMyButton('mngButton', '�����ѯ', 'left', false);
//            if (rights == "����")
//                me.CreateMyButton('presentButton', '����', 'right', true);               
//        });
    }
});
