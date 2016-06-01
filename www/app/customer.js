Ext.application({
    //��������
    name: "app",

    requires: ['app.util.CustomerProxy'],

    //ָ��ģ�ͣ�User����model/User.js
    models: ["GoodsType", "Good", 'GoodsDetail', 'Order'],
    //ָ����������controller/Login.js
    controllers: ["customer.Customer", ],
    stores: [
     "GoodsTypes",
     'Goods',
     'GoodsDetails',
     'Orderings',
     'Orders'
    ],
    //ָ����ͼ,view/Login.js,TopToolBar.js;Form.js;BottomToolBar.js
    //���Ǳ�Login.js�����ģ���������ֻҪָ��Login.js
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
            Ext.Msg.alert('��ʾ', '��ַ����!', Ext.emptyFn);
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
                app.OrderType = '�䵥';
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