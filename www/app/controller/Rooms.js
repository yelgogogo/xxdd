Ext.define('app.controller.Rooms', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            roomslist: 'rooms',
            goodslist: 'goods',
            goodstypelist: 'goodstypes',

            roomAreaPicker: 'rooms segmentedbutton',
            doBalanceButton: '#doBalanceButton',
            mngButton: '#mngButton',
            refreshButton: '#refreshButton'
        },
        control: {
            roomslist: {
                initialize: 'initRoom',
                activate: 'onRoomActivate'
            },
            roomAreaPicker: {
                toggle: 'onRoomAreaChange'
            },
            doBalanceButton: {
                tap: 'onBalance'
            },
    //        mngButton: {
    //            tap: 'onJinglichaxun'
    //        },
            refreshButton: {
                tap: 'onRefresh'
            }
        }
    },
    initRoom: function () {
        var firstButton = this.getRoomAreaPicker().getItems().items[0];
        this.getRoomAreaPicker().setPressedButtons(firstButton);
        this.filterByButton(firstButton);
    },
    onRefresh: function () {
        app.util.Proxy.loadRooms(function () { });
    },
    onBalance: function () {
        var roomStore = Ext.getStore('Rooms');
        roomStore.each(function (item, index, length) {
            if (item.data.RoomStateName != "空房" && item.data.RoomStateName != "坏房") {
                Ext.Msg.alert("房台未清空，请刷新后检查!");
                return;
            }
        });
        var me = this;
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        app.util.Proxy.doBalance(function () { me.onRefresh(); });
    },
    onRoomAreaChange: function (seg, btn, toggle) {
        if (toggle) {
            this.filterByButton(btn);
        }
    },
    onRoomActivate: function () {
        var frmMain = this.getRoomslist().parent;
        var refreshButton = this.getRefreshButton();
        if (refreshButton) {
            refreshButton.show();
        }
        var doBalanceButton = this.getDoBalanceButton();
        if (doBalanceButton) {
            doBalanceButton.show();
        }
        var mngButton = this.getMngButton();
        if (mngButton) {
            mngButton.show();
        }
        //frmMain.getNavigationBar().hide();
        frmMain.down('titlebar').hide();
    },
    filterByButton: function (btn) {
        Ext.getStore('Rooms').clearFilter(true);
        Ext.getStore('Rooms').filter(function (record) {
            return record.get('RoomAreaName') == btn._text;
        });
    }
});