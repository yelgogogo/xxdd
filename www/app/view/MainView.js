Ext.define('app.view.MainView', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.mainview',

    //    requires: [
    //            'Ext.SegmentedButton',
    //            ],
    //    requires: [
    //        'app.view.LoginForm',
    //        'app.view.RoomForm'
    //    ],

    config: {
        id: 'mainView',
        tabBarPosition: 'bottom',
//        tabBar: {
//            ui: 'gray',
//            hidden: true
//        },
        items: [
                {
                    //title: '��̨',
                    //iconCls: 'home',
                    xtype: 'roomContainer'
                }
//                ,
//                {
//                    iconCls: 'user',
//                    title: '����',

//                    xtype: 'button',
//                    text: 'ȷ���˳���?',
//                    handler: function () {
//                        //Ext.ComponentQuery.query('#loginForm')[0].show();
//                        //���� mainview
//                        //this.getParent().destroy();
//                        //������ص�¼�û�����
//                        Ext.getStore('User').removeAll();
//                        Ext.getStore('User').sync();

//                        window.location.reload();
//                    }
//                }
        ]
    }
});