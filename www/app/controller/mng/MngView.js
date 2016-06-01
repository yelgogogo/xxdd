Ext.define('app.controller.mng.MngView', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mngContainer: 'mngContainer',
            overview: 'overview',
            roomslist: 'rooms',

            roomDetail: 'roomDetail',

            goodslist: 'goods',
            goodsdetaillist: 'goodsdetail',
            goodstypelist: 'goodstypes',
            orderingslist: 'orderings',
            orderedlist: 'ordereds',

            btnRefresh: '#refreshButton',
            btnGoRoom: '#goroomButton',
            btnGoOverview: '#overViewButton',

            txtReserver: '#txtReserver',
            txtConsumed: '#txtConsumed',
            txtPresented: '#txtPresented',
            orderingsButton: 'orderings button',
            queryButton: '#queryButton',
            orderButton: '#orderButton',
            presentButton: '#presentButton'
        },
        control: {
            mngContainer: {
                pop: 'onMainPop'
            },
            overview: {
                activate: 'onOverviewActivate'
            },
            orderedlist: {
                activate: 'onRoomOrdersActivate'
            },
            btnRefresh: {
                tap: 'refreshOverView'
            },
            btnGoRoom: {
                tap: 'goRoom'
            },
            btnGoOverview: {
                tap: 'goOverView'
            },
            roomslist: {
                itemtap: 'onRoomTap'
            },
            goodslist: {
                onPackGoodsClicked: 'onPackGoodsClicked'
            },
            goodstypelist: {
                itemtap: 'onGoodsTypeTap'
            },
            orderingslist: {
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
    refreshOverView: function () {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var overview = this.getOverview();
        app.util.Proxy.loadOverView(function () {
            var viewStore = Ext.getStore('OverViews');
            overview.setValues(viewStore.data.items[0].data);
            Ext.Viewport.setMasked(false);
        });
    },
    goRoom: function (seg, btn, toggle) {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var mainView = this.getMngContainer();
        app.util.Proxy.loadRooms(function () {
            if (!this.roomslist) {
                this.roomslist = Ext.widget('roomlist');
            }
            mainView.push(this.roomslist);
            Ext.Viewport.setMasked(false);
        });
        this.hideRefreshButton();
        this.hideGoRoomButton();
        this.showGoOverButton();
    },
    goOverView: function (seg, btn, toggle) {
        var frmMain = this.getMngContainer()
        frmMain.pop(frmMain.getInnerItems().length - 1);
    },
    onOverviewActivate: function () {
        var frmMain = this.getMngContainer();
        frmMain.getNavigationBar().show();
        frmMain.down('titlebar').hide();
        this.showRefreshButton();
        this.showGoRoomButton();
        this.hideQueryButton();
        this.hidePresentButton();
        this.hideOrderButton();
        this.hideGoOverButton();
    },
    onRoomTap: function (dataView, index, dataItem, dataItemModel, e, eOpts) {
        if (dataItemModel.data.RoomStateName == "�շ�"
        || dataItemModel.data.RoomStateName == "����"
        || dataItemModel.data.RoomStateName == "����"
        || dataItemModel.data.RoomStateName == "��λ") {
            return;
        }
        //��ȡ��̨ID
        var roomID = dataItemModel.data.ID;
        app.CurRoom = dataItemModel.data;
        var frmMain = this.getMngContainer();
        //        if (!this.roomDetail) {
        //            this. = Ext.roomDetailwidget('roomdetail');
        //        }

        this.loadRoomOrder(app.CurRoom.ID);
        if (app.CurRoom.RoomStateName == "��" || app.CurRoom.RoomStateName == "����") {
            this.hideOrderButton();
            this.hidePresentButton();
            this.hideQueryButton();
        }
        else {
            this.showOrderButton();
            this.showPresentButton();
            this.hideQueryButton();
        }
        //        frmMain.push(this.roomDetail);
        frmMain.getNavigationBar().show();
        frmMain.down('titlebar').show();
        this.hideRefreshButton();
    },
    onRoomOrdersActivate: function () {
        var room = app.CurRoom;
        this.getTxtReserver().setValue(room.ReservationEmpName + '(' + room.ReservationDateTime + ')');
        this.getTxtConsumed().setValue(room.ConsumeAmount);
        this.getTxtPresented().setValue(room.PresentAmount);
    },
    loadRoomOrder: function (roomID) {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var frmMain = this.getMngContainer();
        frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' ���Ѳ�ѯ');
        this.showOrderButton();
        this.showPresentButton();
        this.hideQueryButton();
        //�����̨�������뷿̨������Ϣ
        app.util.Proxy.loadOrder(roomID, function () {
            if (!this.orderedlist) {
                this.orderedlist = Ext.widget('orderedslist');
            }
            frmMain.push(this.orderedlist);
            Ext.Viewport.setMasked(false);
        });
    },
    loadPresentGoods: function (roomID) {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var frmMain = this.getMngContainer();
        frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' ����');
        this.hideOrderButton();
        this.showPresentButton();
        this.hideQueryButton();
        app.util.Proxy.loadPresentGoods(roomID, function () {
            //�����̨��������㵥��Ʒ��Ϣ 
            if (!this.goodstypelist) {
                this.goodstypelist = Ext.widget('goodstypelist');
                //roomDetail.add(this.goodstypelist);
            }
            frmMain.push(this.goodstypelist);
            Ext.Viewport.setMasked(false);
        });
    },
    loadOrderGoods: function (roomID) {
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        var frmMain = this.getMngContainer();
        frmMain.down('titlebar').setTitle(app.CurRoom.RoomName + ' �䵥');
        this.showOrderButton();
        this.hidePresentButton();
        this.hideQueryButton();
        app.util.Proxy.loadOrderGoods(roomID, function () {
            //�����̨�����������Ͳ�Ʒ��Ϣ 
            if (!this.goodstypelist) {
                this.goodstypelist = Ext.widget('goodstypelist');
                //roomDetail.add(this.goodstypelist);
            }
            frmMain.push(this.goodstypelist);
            Ext.Viewport.setMasked(false);
        });
    },
    onGoodsTypeTap: function (dataView, index, dataItem, dataItemModel, e, eOpts) {
        app.GoodsTypeName = dataItemModel.data.GoodsTypeName;
        var goodsStore = Ext.getStore('Goods');
        goodsStore.clearFilter(true);
        goodsStore.filterBy(function (goods) {
            return goods.get('GoodsTypeName') == app.GoodsTypeName;
        });
        var frmMain = this.getMngContainer();
        if (!this.goodslist) {
            this.goodslist = Ext.widget('goodslist');
            //this.getRoomDetail().add(this.goodslist);
        }
        frmMain.push(this.goodslist);
    },
    onPackGoodsClicked: function (list, record, item, index, btn) {
        var detailStore = Ext.getStore('GoodsDetails');
        detailStore.removeAll();
        Ext.Array.each(record.data.GoodsDetails, function (Good) {
            detailStore.add(Good);
        });
        var frmMain = this.getMngContainer();
        if (!this.goodsdetaillist) {
            this.goodsdetaillist = Ext.widget('goodsdetaillist');
            //this.getRoomDetail().add(this.goodsdetaillist);
        }
        this.hideOrderButton();
        this.hidePresentButton();
        //this.hideOrderMemButton();
        //this.hideQueryButton();
        frmMain.push(this.goodsdetaillist);
        //this.getRoomDetail().setActiveItem(this.goodsdetaillist);
    },
    selectOrders: function () {
        var goodsStore = Ext.getStore('Goods');
        var idx = goodsStore.findBy(function (goods) {
            return goods.get('GoodsCount') > 0;
        });
        if (idx < 0) {
            Ext.Msg.alert("û�е�ȡ��Ʒ!");
            return;
        }
        this.hideOrderButton();
        this.hidePresentButton();
        this.hideQueryButton();
        goodsStore.clearFilter(true);
        goodsStore.filterBy(function (goods) {
            return goods.get('GoodsCount') > 0;
        });
        var frmMain = this.getMngContainer();
        if (!this.orderingslist) {
            this.orderingslist = Ext.widget('orderingslist');
            //this.getRoomDetail().add(this.orderingslist);
        }
        frmMain.push(this.orderingslist);
        if (app.OrderType == "����")
            this.getOrderingsButton().setText('ȷ������');
        else
            this.getOrderingsButton().setText('ȷ���䵥');
    },
    //�䵥
    onLuodan: function () {
        var frmMain = this.getMngContainer();
        var curView = frmMain.getActiveItem();
        if (curView.xtype == 'ordereds' || app.OrderType != "�䵥") {
            app.OrderType = "�䵥";
            //this.setOrderButton();
            this.loadOrderGoods(app.CurRoom.ID);
        }
        else if (curView.xtype == 'goodstypes' || curView.xtype == 'goods')
            this.selectOrders();
    },
    //����
    onZengsong: function (isPresent) {
        var frmMain = this.getMngContainer();
        var curView = frmMain.getActiveItem();
        if (curView.xtype == 'ordereds' || app.OrderType != "����") {
            app.OrderType = "����";
            //this.setOrderButton();
            this.loadPresentGoods(app.CurRoom.ID);
        }
        else if (curView.xtype == 'goodstypes' || curView.xtype == 'goods')
            this.selectOrders();
    },
    //���Ѳ�ѯ
    onQuery: function () {
        var frmMain = this.getMngContainer();
        var curView = frmMain.getActiveItem();
        if (curView.xtype != 'ordereds')
            this.loadRoomOrder(app.CurRoom.ID);
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
        var subTotal = 0;
        if (app.OrderType == "��Ա�㵥") {
//            Ext.Array.each(allData, function (records) {
//                subTotal += records.Price * records.GoodsCount;
//            });
//            if (subTotal > app.CardCurrentMoney) {
//                Ext.Msg.alert("��������(" + app.CardCurrentMoney + ")!");
//                Ext.Viewport.setMasked(false);
//                return;
//            }
        }
        else
            app.CardNo = "";
        var submitMobile = {};
        submitMobile.SubmitOrders = allData;
        submitMobile.isPresent = app.OrderType == "����" ? true : false;
        submitMobile.roomID = app.CurRoom.ID;
        submitMobile.userNo = Ext.getStore('User').load().data.items[0].data.userno;
        submitMobile.orderType = app.OrderType;

        var dataToBeSentToServer = Ext.JSON.encode(submitMobile);

        var roomCard = this.getMngContainer();
        var successCallback = function (resp, ops) {
            Ext.Viewport.setMasked(false);
            var msg = Ext.decode(resp.responseText).d;
            if (msg && msg != "") {
                Ext.Msg.alert(msg);
                return;
            }
            Ext.Msg.alert(app.OrderType + "�ɹ�!");
            roomCard.pop(roomCard.getInnerItems().length - 1);
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
    setOrderButton: function () {

    },
    setPresentButton: function () {

    },
    setQueryButton: function () {

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
    },
    showRefreshButton: function () {
        var refreshButton = this.getBtnRefresh();
        if (!refreshButton || !refreshButton.isHidden()) {
            return;
        }
        refreshButton.show();
    },
    hideRefreshButton: function () {
        var refreshButton = this.getBtnRefresh();
        if (!refreshButton || refreshButton.isHidden()) {
            return;
        }
        refreshButton.hide();
    },
    showGoRoomButton: function () {
        var goroomButton = this.getBtnGoRoom();
        if (!goroomButton || !goroomButton.isHidden()) {
            return;
        }
        goroomButton.show();
    },
    hideGoRoomButton: function () {
        var goroomButton = this.getBtnGoRoom();
        if (!goroomButton || goroomButton.isHidden()) {
            return;
        }
        goroomButton.hide();
    },
    showGoOverButton: function () {
        var goOverButton = this.getBtnGoOverview();
        if (!goOverButton || !goOverButton.isHidden()) {
            return;
        }
        goOverButton.show();
    },
    hideGoOverButton: function () {
        var goOverButton = this.getBtnGoOverview();
        if (!goOverButton || goOverButton.isHidden()) {
            return;
        }
        goOverButton.hide();
    },
    onMainPop: function (view, item) {
        this.setButtonVisiable(view._activeItem.xtype);
    },
    setButtonVisiable: function (viewType) {

        switch (viewType) {
            case "goods":
                if (app.CurRoom.RoomStateName == "����"
                || app.CurRoom.RoomStateName == "����") {
                    if (app.OrderType == "����")
                        this.showPresentButton();
                    else if (app.OrderType == "�䵥")
                        this.showOrderButton();
                    //this.showQueryButton();
                }
                else {
                    this.hideOrderButton();
                    this.hidePresentButton();
                    this.hideQueryButton();
                }
                break;
            case "goodstypes":
                if (app.CurRoom.RoomStateName == "����"
                || app.CurRoom.RoomStateName == "����") {
                    this.showPresentButton();
                    this.showOrderButton();
                    //this.hideQueryButton();
                }
                else {
                    this.hideOrderButton();
                    this.hidePresentButton();
                    this.hideQueryButton();
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
                    this.hideQueryButton();
                }
                break;
            default:
                this.hideOrderButton();
                this.hidePresentButton();
                this.hideQueryButton();
                break;
        }
    }
});