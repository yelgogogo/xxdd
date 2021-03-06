Ext.application({
    //命名工程
    name: "app",

    requires: ['app.util.Proxy'],

    //指明模型，User代表model/User.js
    models: ["User", "Room", "GoodsType", "Good", 'GoodsDetail', 'Order','OverView'],
    //指明控制器，controller/Login.js
    controllers: [
    "order.Login",
    "order.Order"
    // "Rooms"
     ],
    stores: [
     'User',
     'OverViews',
     'Rooms',
     "GoodsTypes",
     'Goods',
     'GoodsDetails',
     'Orderings',
     'Orders',
     'CancelOrders'
    ],
    //指明视图,view/Login.js,TopToolBar.js;Form.js;BottomToolBar.js
    //都是被Login.js包含的，所以这里只要指明Login.js
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
    'order.ListOrdered',
    'order.PosForm',
    'order.ListCustomerOrders',
    'manager.ListOverView',
    "RoomForm"
    ],

    launch: function () {
        app.pgmid=window.location.href.split('/')[3] + '\/';
        if (app.pgmid.indexOf('.html') >= 0){
            app.pgmid='';
        };

        app.util.Proxy.getSysParm('txtPlaceAdress', function (pmsg) {
            app.CurPlacemsg = pmsg;
        });
        app.util.Proxy.getSysParm('txtPlaceName', function (pname) {
            app.CurPlace = pname;
        });
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



        var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)", "i");
        var regstate = new RegExp("(^|&)" + "state" + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var rstate = window.location.search.substr(1).match(regstate);
        console.log(r);        
        if (r != null) {
            var code = unescape(r[2]);

            app.util.Proxy.getOpenid(code, function (openid) {    
                app.openid = openid;
                app.util.Proxy.chkOpenid(app.openid, function () { 
                    // if (rstate != null) {
                    //     var statevalue = unescape(rstate[2]);
                    // };
                });
            });
        }
        else{
            var loginView = Ext.create('app.view.LoginForm');
            
            app.util.Proxy.getSysParm('txtPlaceName', function (pname) {
                app.CurPlace = pname;
                loginView.down('toolbar').setTitle(app.CurPlace);
            });
            var userStore = Ext.getStore('User').load();
            if (userStore.data.length > 0 && userStore.data.items[0].data.isremember == 1) {
                loginView.user = userStore.data.items[0].data;
                loginView.setValues(loginView.user);
            };
            Ext.Viewport.add([loginView]);
        };
        //Ext.Viewport.add({ xtype: 'loginform' }); //loginform  mainview test
        //Ext.Viewport.add({ xtype: 'mainview' });
    }
});