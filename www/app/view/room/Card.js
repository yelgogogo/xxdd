Ext.define('app.view.room.Card', {

    extend: 'Ext.NavigationView',
    xtype: 'roomContainer',

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
                xtype: 'rooms',
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
        var userStore = Ext.getStore('User').load().data.items[0].data
        var me = this;
        
        me.CreateMyButton('refreshButton', 'ˢ��', 'right', false);

        Ext.Array.each(userStore.rights, function (rights) {
//            if (rights == "�䵥") {
//                me.CreateMyButton('orderButton', '�䵥', 'right', true);
//                //me.CreateMyButton('orderMemButton', '��Ա�㵥', 'right', true);
//            }
//            if (rights == "�����ѯ")
//                me.CreateMyButton('mngButton', '�����ѯ', 'left', false);
//            if (rights == "�����ѯ")
//                me.CreateMyButton('mngButton', '�����ѯ', 'left', false);
//            if (rights == "����")
//                me.CreateMyButton('presentButton', '����', 'right', true);    
            switch (rights)
            {
            case "�䵥":{
               me.CreateMyButton('qrCodeButton', '̨��', 'left', true);
               me.CreateMyButton('closeButton', '��̨', 'right', true);
               me.CreateMyButton('queryButton', '����', 'right', true);
               me.CreateMyButton('customerButton', '��ѡ', 'left', true);
               me.CreateMyButton('orderButton', '�䵥', 'right', true);
               };
               break;
            case "�����ѯ":{
               me.CreateMyButton('mngButton', '�����ѯ', 'left', false);
               };
               break;
            case "����":{
               me.CreateMyButton('hisqueryButton', '��ʷ', 'right', true);
               me.CreateMyButton('posButton', '��', 'right', true);
			   me.CreateMyButton('doBalanceButton', 'Ӫҵ����', 'left', false);
               };
               break;
            }
        });
    }
});
