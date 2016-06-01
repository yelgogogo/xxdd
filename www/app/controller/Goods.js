Ext.define('app.controller.Goods', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            roomContainer: 'roomContainer',
            goodslist: 'goods',
            goodsdetaillist: 'goodsdetail',
            goodstypelist: 'goodstypes',
            orderingslist: 'orderings',
            orderedlist: 'ordereds',

            orderingsButton: 'orderings button',
            queryButton: '#queryButton',
            orderButton: '#orderButton',
            presentButton: '#presentButton'
        },
        control: {
            roomContainer: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            goodslist: {
                onPackGoodsClicked: 'onPackGoodsClicked'
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
        this.getRoomContainer().push(this.goodslist);
    },
    onPackGoodsClicked: function (list, record, item, index, btn) {
        if (!this.goodsdetaillist)
            this.goodsdetaillist = Ext.widget('goodsdetaillist');

        var detailStore = Ext.getStore('GoodsDetails');
        detailStore.removeAll();
        Ext.Array.each(record.data.GoodsDetails, function (Good) {
            detailStore.add(Good);
        });
        this.getRoomContainer().push(this.goodsdetaillist);
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
            Ext.Msg.alert("û�е�ȡ��Ʒ!");
            return;
        }
        goodsStore.clearFilter(true);
        goodsStore.filterBy(function (goods) {
            return goods.get('GoodsCount') > 0;
        });

        if (app.IsPresent)
            this.getOrderingsButton().setText('ȷ������');
        else
            this.getOrderingsButton().setText('ȷ���䵥');
        this.getRoomContainer().push(this.orderingslist);
    },
    //�䵥
    onLuodan: function () {
        app.IsPresent = false;
        var roomCard = this.getRoomContainer();
        var curView = roomCard.getActiveItem();
        if (curView.xtype == 'ordereds') {
            Ext.Viewport.setMasked({ xtype: 'loadmask' });
            app.util.Proxy.loadOrderGoods(app.CurRoom.ID, function () {
                //�����̨�������뷿̨������Ϣ���������Ʒ��Ϣ 
                if (!this.goodstypelist) {
                    this.goodstypelist = Ext.widget('goodstypelist');
                }                
                roomCard.push(this.goodstypelist);
                //roomCard.applyActiveItem(this.goodstypelist, curView);                
                Ext.Viewport.setMasked(false);
            });
        }
        else if (curView.xtype == 'goodstypes' || curView.xtype == 'goods')
            this.selectOrders();
    },
    //����
    onZengsong: function (isPresent) {
        app.IsPresent = true;
        var roomCard = this.getRoomContainer();
        var curView = roomCard.getActiveItem();
        if (curView.xtype == 'ordereds') {
            Ext.Viewport.setMasked({ xtype: 'loadmask' });
            app.util.Proxy.loadPresentGoods(app.CurRoom.ID, function () {
                //�����̨�������뷿̨������Ϣ���������Ʒ��Ϣ 
                if (!this.goodstypelist) {
                    this.goodstypelist = Ext.widget('goodstypelist');
                }
                roomCard.push(this.goodstypelist);
                Ext.Viewport.setMasked(false);
            });
        }
        else if (curView.xtype == 'goodstypes' || curView.xtype == 'goods')
            this.selectOrders();
    },
    //���Ѳ�ѯ
    onQuery: function () {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        if (!this.orderedlist) {
            this.orderedlist = Ext.widget('orderedslist');
        }
        var curView = this.getRoomContainer().getActiveItem();
        if (curView.xtype == 'goodstypes')
            this.getRoomContainer().pop();
        if (curView.xtype == 'goods')
            this.getRoomContainer().pop(2);
        Ext.Viewport.setMasked(false);
    },
    //ȷ���µ�
    onOkOrder: function () {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var goodsStore = Ext.getStore('Goods');
        var allData = [];
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
            delete records.data.id;
            allData.push(records.data);
        });
        if (allData.length == 0) {
            Ext.Viewport.setMasked(false);
            return;
        }
        var submitMobile = {};
        submitMobile.SubmitOrders = allData;
        submitMobile.isPresent = app.IsPresent;
        submitMobile.roomID = app.CurRoom.ID;
        submitMobile.userNo = Ext.getStore('User').load().data.items[0].data.userno;

        var dataToBeSentToServer = Ext.JSON.encode(submitMobile);

        var roomCard = this.getRoomContainer();
        var successCallback = function (resp, ops) {
            Ext.Viewport.setMasked(false);
            var msg = Ext.decode(resp.responseText).d;
            if (msg && msg != "") {
                Ext.Msg.alert(msg);
                return;
            }
            if (app.IsPresent)
                Ext.Msg.alert("���ͳɹ�!");
            else
                Ext.Msg.alert("�䵥�ɹ�!");

            var goodsStore = Ext.getStore('Goods');
            goodsStore.each(function (record) {
                record.set("GoodsCount", 0);
            });
            Ext.Viewport.setMasked({ xtype: 'loadmask' });
            app.util.Proxy.loadOrder(app.CurRoom.ID, function () {
                roomCard.pop(3);
                Ext.Viewport.setMasked(false);
            });
        };
        var failureCallback = function (resp, ops) {
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert("�䵥ʧ��!", resp.responseText);
        };
        Ext.Ajax.request({
            method: 'POST',
            url: '../WebServiceEx.asmx/JSON_Add_Orders',
            async: true, //�첽ִ��
            params: dataToBeSentToServer,
            jsonData: {
                submitMobile: dataToBeSentToServer
            },
            success: successCallback,
            failure: failureCallback
        });
    },
    setButtonVisiable: function (viewType) {

        switch (viewType) {
            case "goods":
            case "goodstypes":
                if (app.CurRoom.RoomStateName == "����"
                || app.CurRoom.RoomStateName == "����") {
                    this.showOrderButton();
                    this.showPresentButton();
                    //this.showQueryButton();
                }
                else {
                    this.hideOrderButton();
                    this.hidePresentButton();
                }
                break;
            case "ordereds":
                if (app.CurRoom.RoomStateName == "����"
                || app.CurRoom.RoomStateName == "����") {
                    this.showOrderButton();
                    this.showPresentButton();
                    this.hideQueryButton();
                }
                else {
                    this.hideOrderButton();
                    this.hidePresentButton();
                }
                break;
            default:
                this.hideOrderButton();
                this.hidePresentButton();
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
    showPresentButton: function () {
        var presentButton = this.getPresentButton();
        if (!presentButton || !presentButton.isHidden()) {
            return;
        }
        presentButton.show();
    },
    hidePresentButton: function () {
        var presentButton = this.getPresentButton();
        if (!presentButton || presentButton.isHidden()) {
            return;
        }
        presentButton.hide();
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