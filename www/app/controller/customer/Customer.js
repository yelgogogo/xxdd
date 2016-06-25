Ext.define('app.controller.customer.Customer', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            custmainform: 'custmainform',
            goodslist: 'goods',
            goodsdetaillist: 'goodsdetail',
            goodstypelist: 'goodstypes',
            orderingslist: 'orderings',
            orderedlist: 'ordereds',
            txtConsumed: '#txtConsumed',
            orderingsButton: 'orderings button',
            queryButton: '#queryButton',
            markToggleButton: 'orderings #markToggle',
            orderButton: '#orderButton'
        },
        control: {
            markToggleButton: {
                change: 'onmarkToggle'
            },
            custmainform: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            goodslist: {
                onPackGoodsClicked: 'onPackGoodsClicked'
            },
            orderedlist: {
                activate: 'onRoomOrdersActivate'
            },
            goodstypelist: {
                initialize: 'initGoodsType',
                itemtap: 'onGoodsTypeTap'
            },
            orderingslist: {
                initialize: 'initOrderings',
                onPackGoodsClicked: 'onPackGoodsClicked'
            },
            orderingsButton: {
                tap: 'onOkOrder'
            },
            queryButton: {
                tap: 'onQuery'
            },
            orderButton: {
                tap: 'onLuodan'
            },
            presentButton: {
                tap: 'onZengsong'
            }
        }
    },
    initGoodsType: function (dataView, eOpts) {

    },
    initOrderings: function (dataView, eOpts) {
    },
    //全部加辣
    onmarkToggle: function (field, slider, thumb, newValue, oldValue) {
        var goodsStore = Ext.getStore('Goods');

        goodsStore.each(function (records) {
            if (newValue == 1)
                records.data.Remarks = '加辣';
            else
                records.data.Remarks = '';
        });
        var goodsview = this.getOrderingslist();
        goodsview.refresh();
    },
    onRoomOrdersActivate: function () {
        // var room = app.CurRoom;
        // this.getTxtReserver().setValue(room.ReservationEmpName + '(' + room.ReservationDateTime + ')');
        this.getTxtConsumed().setValue(roomcount);
        // this.getTxtPresented().setValue(room.PresentAmount);
    },
    onGoodsTypeTap: function (dataView, index, dataItem, dataItemModel, e, eOpts) {
        //console.log('onGoodsTypeTap' + dataItemModel);        
        app.GoodsTypeName = dataItemModel.data.GoodsTypeName;
        var goodsStore = Ext.getStore('Goods');
        goodsStore.clearFilter(true);
        goodsStore.filterBy(function (goods) {
            return goods.get('GoodsTypeName') == app.GoodsTypeName;
        });
        if (!this.goodslist) {
            this.goodslist = Ext.widget('goodslist');
        }
        this.getCustmainform().push(this.goodslist);
    },
    onPackGoodsClicked: function (list, record, item, index, btn) {
        if (!this.goodsdetaillist)
            this.goodsdetaillist = Ext.widget('goodsdetaillist');

        var detailStore = Ext.getStore('GoodsDetails');
        detailStore.removeAll();
        Ext.Array.each(record.data.GoodsDetails, function (Good) {
            detailStore.add(Good);
        });
        this.getCustmainform().push(this.goodsdetaillist);
    },
    selectOrders: function () {
        if (!this.orderingslist) {
            this.orderingslist = Ext.widget('orderingslist');
        }
        var goodsStore = Ext.getStore('Goods');
        var idx = goodsStore.findBy(function (goods) {
            return goods.get('GoodsCount') > 0;
        });
        if (idx < 0) {
            Ext.Msg.alert("没有点取菜品!");
            return;
        }
        goodsStore.clearFilter(true);
        goodsStore.filterBy(function (goods) {
            return goods.get('GoodsCount') > 0;
        });

        if (app.IsPresent)
            this.getOrderingsButton().setText('确认赠送');
        else
            this.getOrderingsButton().setText('确认下单');
        this.getCustmainform().push(this.orderingslist);
    },
    //落单
    onLuodan: function () {
        var reg = new RegExp("(^|&)" + "Key" + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);

        if (r == null) {
            Ext.Msg.alert('检查提示', '地址错误!', Ext.emptyFn);
            return;
        }
        var UnStr = unescape(r[2]);
        var thisobj = this;
        app.util.CustomerProxy.getUnStr(UnStr, function (destr) {
            var para = destr;

            app.util.CustomerProxy.chkCustomerOp(para, function () {
                app.OrderType = '下单';
                var frmMain = thisobj.getCustmainform();
                var curView = frmMain.getActiveItem();
                if (curView.xtype == 'ordereds') {
                    Ext.Viewport.setMasked({ xtype: 'loadmask' });
                    app.util.Proxy.loadOrderGoods(app.CurRoom.ID, function () {
                        //点击房台后，先载入房台消费信息或者载入菜品信息 
                        if (!this.goodstypelist) {
                            this.goodstypelist = Ext.widget('goodstypelist');
                        }
                        frmMain.push(this.goodstypelist);
                        //frmMain.applyActiveItem(this.goodstypelist, curView);                
                        Ext.Viewport.setMasked(false);
                    });
                }
                else if (curView.xtype == 'goodstypes' || curView.xtype == 'goods')
                    thisobj.selectOrders();
            });
        });
    },
    //消费查询
    onQuery : function () {
        // Ext.Viewport.setMasked({ xtype: 'loadmask' });

        var frmMain = this.getCustmainform();
        var curView = frmMain.getActiveItem();
        var reg = new RegExp("(^|&)" + "Key" + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);

        if (r == null) {
            Ext.Msg.alert('检查提示', '地址错误!', Ext.emptyFn);
            return;
        }
        var UnStr = unescape(r[2]);
        var thisobj = this;
        app.util.CustomerProxy.getUnStr(UnStr, function (destr) {
            var para = destr;

            app.util.CustomerProxy.chkCustomerOp(para, function () {
            // 
            // Ext.Viewport.setMasked(false);
                if (curView.xtype != 'ordereds')
                thisobj.loadRoomOrder(app.CurRoom.ID);
            });
        });
        // if (curView.xtype != 'ordereds')
        //     this.loadRoomOrder(app.CurRoom.ID);
    },
    loadRoomOrder: function (roomID) {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var frmMain = this.getCustmainform();
        frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' 消费查询');
        this.hideOrderButton();
        this.hideQueryButton();
        //点击房台后，先载入房台消费信息
        app.util.CustomerProxy.loadOrder(roomID, function () {
            if (!this.orderedlist) {
                this.orderedlist = Ext.widget('orderedslist');
            }
            frmMain.push(this.orderedlist);
            Ext.Viewport.setMasked(false);
        });

    },
    //确认下单
    onOkOrder: function () {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var goodsStore = Ext.getStore('Goods');
        var allData = [];
        var msgtxt = '';
        goodsStore.filterBy(function (goods) {
            return goods.get('GoodsCount') > 0;
        });
        goodsStore.each(function (records) {
            if (records.data.GoodsDetails && records.data.GoodsDetails.length > 0) {
                records.data.GoodsDetails = records.data.GoodsDetails.filter(function (goodsDetail) {
                    delete goodsDetail.id;
                    return goodsDetail.GoodsDetailCount > 0;
                });
            }
            msgtxt += records.data.GoodsName + ' ' + records.data.GoodsCount + records.data.Unit + records.data.Remarks +';'
            delete records.data.id;
            allData.push(records.data);
        });
        if (allData.length == 0) {
            Ext.Viewport.setMasked(false);
            return;
        }
        var strrights = '落单';
        var templateid = 'tc6Ayn7IGJk5BtQzi94BniwSqHMb3ErgG7rZwpL1eoA';
        var url = '';
        var Sysdate = new Date();  
        var Curdate = Ext.Date.format(Sysdate, 'Y-m-d H:i:s'); 
        var first = { value: app.CurPlace + ' 客户在线点单提醒', color: '#173177' },
            keyword1 = { value: app.CurRoom.RoomName, color: '#173177' },
            keyword2 = { value: Curdate, color: '#173177' },
            keyword3 = { value: msgtxt, color: '#173177' },
            remark = { value: '星星点单消息推送', color: '#173177' };

        var weChatData =
            {
                first: first,
                keyword1: keyword1,
                keyword2: keyword2,
                keyword3: keyword3,
                remark: remark
            };
        var submitMobile = {};
        submitMobile.SubmitOrders = allData;
        submitMobile.orderType = app.OrderType;
        //        submitMobile.isPresent = app.IsPresent;
        submitMobile.roomID = app.CurRoom.ID;

        var dataToBeSentToServer = Ext.JSON.encode(submitMobile);

        var frmMain = this.getCustmainform();
        app.util.CustomerProxy.orderRoom(dataToBeSentToServer, function () {
            frmMain.pop(frmMain.getInnerItems().length - 1);
            app.util.CustomerProxy.loadCustomerGoods(app.CurRoom.ID, function () { });
            app.util.CustomerProxy.sendMsg(strrights,templateid,url,weChatData,function () {})
        });
    },
    setButtonVisiable: function (viewType) {

        switch (viewType) {
            case "goods":
            case "goodstypes":
                this.showOrderButton();
                this.showQueryButton();
                var frmMain = this.getCustmainform();
                frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' ' + app.OrderType);
                break;
            case "ordereds":
                this.hideOrderButton();
                this.hideQueryButton();
                break;
            default:
                this.hideOrderButton();
                this.hideQueryButton();
                break;
        }
    },
    onMainPush: function (view, item) {
        this.setButtonVisiable(view._activeItem.xtype);
    },
    onMainPop: function (view, item) {
        this.setButtonVisiable(view._activeItem.xtype);
    },
    showOrderButton: function () {
        var orderButton = this.getOrderButton();
        if (!orderButton || !orderButton.isHidden()) {
            return;
        }
        orderButton.show();
    },
    hideOrderButton: function () {
        var orderButton = this.getOrderButton();
        if (!orderButton || orderButton.isHidden()) {
            return;
        }
        orderButton.hide();
    },
    showQueryButton: function () {
        var queryButton = this.getQueryButton();
        if (!queryButton || !queryButton.isHidden()) {
            return;
        }
        queryButton.show();
    },
    hideQueryButton: function () {
        var queryButton = this.getQueryButton();
        if (!queryButton || queryButton.isHidden()) {
            return;
        }
        queryButton.hide();
    }

});