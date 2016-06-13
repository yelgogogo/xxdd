Ext.application({
    //命名工程
    name: "app",

    requires: ['app.util.Proxy'],

    //指明模型，User代表model/User.js
    models: ["User", "Room", "GoodsType", "Good", 'GoodsDetail', 'Order','OverView'],
    //指明控制器，controller/Login.js
    controllers: [
    "order.Login",
    "order.Order",
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
        var r = window.location.search.substr(1).match(reg);
        console.log(r);
        Ext.Msg.alert("opendi1!");
        var code = unescape(r[2]);
        if (r != null) {
            // var appid='wx9f51df2624282eb1',
            //     appsecret='0f60883c96bd8cc7dec06b3c601f233e';
            //     Ext.Msg.alert("opendi2!");
            app.util.Proxy.getOpenid(code, function (openid) {
                Ext.Msg.alert("opendi3!");
                var Json_Room = eval('(' + data + ')');
                app.CurRoom = Json_Room.Room[0];
                switch (openid)
                {
                case "041E9sju11tVS60H3Nhu1XVtju1E9sjL":{
                    console.log("here");
                    var loginView = Ext.create('app.view.LoginForm');
                    Ext.Viewport.add([loginView]);
                    var userStore = Ext.getStore('User').load();
                    userStore.removeAll();

                    var user = Ext.create("app.model.User");
                    
                    user.set("username", "管理员");
                    user.set("password", "m");
                    user.set("userno", "1");
                    user.set("isremember", 0);
                    user.set("rights", "收银,落单,经理查询".split(","));
                    userStore.add(user);
                    userStore.sync();
                    //Ext.Viewport.setMasked({ xtype: 'loadmask' });
                    Ext.Viewport.setMasked({ xtype: 'loadmask' });
                    app.util.Proxy.loadRooms(function () {
                        var mainView = Ext.create('app.view.room.Card');
                        Ext.Viewport.add(mainView);
                        loginView.reset();
                        loginView.hide();
                        mainView.show();
                        Ext.Viewport.setMasked(false);
                    });
                   };
                   break;
                };
            });
        }
        else{
            console.log("there");
            var loginView = Ext.create('app.view.LoginForm');
            
            app.util.Proxy.getSysParm('txtPlaceName', function (pname) {
                loginView.down('toolbar').setTitle(pname);
            });
            var userStore = Ext.getStore('User').load();
            if (userStore.data.length > 0 && userStore.data.items[0].data.isremember == 1) {
                loginView.user = userStore.data.items[0].data;
                loginView.setValues(loginView.user);
            }
            Ext.Viewport.add([loginView])
        };
        //Ext.Viewport.add({ xtype: 'loginform' }); //loginform  mainview test
        //Ext.Viewport.add({ xtype: 'mainview' });
    }
});