Ext.application({
    //命名工程
    name: "app",

    requires: ['app.util.CustomerProxy'],

    //指明模型，User代表model/User.js
    models: ["GoodsType", "Good", 'GoodsDetail', 'Order'],
    //指明控制器，controller/Login.js
    controllers: ["customer.Customer", ],
    stores: [
     "GoodsTypes",
     'Goods',
     'GoodsDetails',
     'Orderings',
     'Orders'
    ],
    //指明视图,view/Login.js,TopToolBar.js;Form.js;BottomToolBar.js
    //都是被Login.js包含的，所以这里只要指明Login.js
    views: [
    'order.ListGoods',
    'order.ListGoodsDetail',
    'order.ListGoodsType',
    'order.ListOrderings',
    'order.ListOrders',

    'customer.CustMainForm'
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

        var reg = new RegExp("(^|&)" + "Op" + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r == null) {
            Ext.Msg.alert('提示', '地址错误!', Ext.emptyFn);
            return;
        }
        var para = unescape(r[2]);
//        app.util.Proxy.getUnStr(para, function (unstr) {
//            para=unstr
//        });
        app.util.CustomerProxy.chkCustomerOp(para, function () {
            Ext.Viewport.setMasked({ xtype: 'loadmask' });
            app.util.CustomerProxy.loadCustomerGoods(app.CurRoom.ID, function () {
                var mainView = Ext.create('app.view.customer.CustMainForm');
                app.OrderType = '落单';
                //mainView.down('titlebar').setTitle(app.CurRoom.RoomName + ' ' + app.OrderType);
                app.util.CustomerProxy.getSysParm('txtPlaceName', function (pname) {
                   mainView.down('titlebar').setTitle(pname + ' ' + app.CurRoom.RoomName + ' ' + app.OrderType);
                });
                Ext.Viewport.add(mainView);
                Ext.Viewport.setMasked(false);
            });
        });
    }
});