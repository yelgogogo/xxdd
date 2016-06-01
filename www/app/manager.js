Ext.application({
    //��������
    name: "app",

    requires: ['app.util.Proxy'],

    //ָ��ģ�ͣ�User����model/User.js
    models: ["User", "Room", "GoodsType", "Good", 'GoodsDetail', 'Order', 'OverView'],
    //ָ����������controller/Login.js
    controllers: [
    "mng.MngLogin",
    'mng.MngView',
    "Rooms"
     ],
    stores: [
     'User',
     'OverViews',
     'Rooms',
     "GoodsTypes",
     'Goods',
     'GoodsDetails',
     'Orderings',
     'Orders'
    ],
    //ָ����ͼ,view/Login.js,TopToolBar.js;Form.js;BottomToolBar.js
    //���Ǳ�Login.js�����ģ���������ֻҪָ��Login.js
    views: [
    "LoginForm",
    "MainView",

    'room.Card',
    'room.List',
    'room.Info',

    'order.ListGoods',
    'order.ListGoodsDetail',
    'order.ListGoodsType',
    'order.ListOrderings',
    'order.ListOrders',
    //    'order.Info',
    'manager.ListOverView',
    'manager.MngCard',

    "RoomForm"
    ],

    launch: function () {
        Ext.override(Ext.util.SizeMonitor, {
            constructor: function (config) {
                var namespace = Ext.util.sizemonitor;

                if (Ext.browser.is.Firefox) {
                    return new namespace.OverflowChange(config);
                } else if (Ext.browser.is.WebKit) {
                    if (!Ext.browser.is.Silk && Ext.browser.engineVersion.gtEq('535') && !Ext.browser.engineVersion.ltEq('537.36')) {
                        return new namespace.OverflowChange(config);
                    } else {
                        return new namespace.Scroll(config);
                    }
                } else if (Ext.browser.is.IE11) {
                    return new namespace.Scroll(config);
                } else {
                    return new namespace.Scroll(config);
                }
            }
        });
        Ext.override(Ext.util.PaintMonitor, {
            constructor: function (config) {
                if (Ext.browser.is.Firefox || (Ext.browser.is.WebKit && Ext.browser.engineVersion.gtEq('536') && !Ext.browser.engineVersion.ltEq('537.36') && !Ext.os.is.Blackberry)) {
                    return new Ext.util.paintmonitor.OverflowChange(config);
                }
                else {
                    return new Ext.util.paintmonitor.CssAnimation(config);
                }
            }
        });
        //Ext.create('app.view.MainView');
        //var mainView = Ext.create('app.view.MainView');
        var loginView = Ext.create('app.view.LoginForm');
        var userStore = Ext.getStore('User').load();
        if (userStore.data.length > 0 && userStore.data.items[0].data.isremember == 1) {
            loginView.user = userStore.data.items[0].data;
            loginView.setValues(loginView.user);
        }
        Ext.Viewport.add([loginView])
        //Ext.Viewport.add({ xtype: 'loginform' }); //loginform  mainview test
        //Ext.Viewport.add({ xtype: 'mainview' });


    }
});