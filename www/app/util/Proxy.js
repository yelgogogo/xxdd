Ext.define('app.util.Proxy', {

    singleton: true,
    //1.webservice Ĭ��֧��post ������Ҫwebconfig�����֧�� get post��JsonpĬ����get ���ͣ�params����
    //     Ext.data.JsonP.request({
    //            url: '../WebServiceEx.asmx/TestJsonp',
    //            callbackKey: 'callback',
    //            params: {
    //                v1: 'abc'
    //            },
    //            success: function (result) {
    //                console.log(result);
    //                Ext.Msg.alert("����ɹ�" + result.cad);
    //            },
    //            failure: function () {
    //                Ext.Msg.alert("ʧ������");
    //            }
    //        });
    //requires: ['Ext.data.proxy.JsonP'],
    getEnStr: function (instr,callback) {
        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d;
            var strvalue = Ext.decode(data);
            callback(strvalue[0].ParaValue
);
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("����ϵͳ����ʧ��!");
        };
       Ext.Ajax.request({
          url: '../WebServiceEx.asmx/JSON_GetSysParam',
          jsonData: {
              paraCode: instr
          },
          success: successCallback,
          failure: failureCallback
       });     
    },
    getSysParm: function (sysparm,callback) {
        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d;
            var Pname = Ext.decode(data);
            callback(Pname[0].ParaValue
);
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("����ϵͳ����ʧ��!");
        };
       Ext.Ajax.request({
          url: '../WebServiceEx.asmx/JSON_GetSysParam',
          jsonData: {
              paraCode: sysparm
          },
          success: successCallback,
          failure: failureCallback
       });     
    },
    loadRoomsJsonP: function (callback) {

        var roomStore = Ext.getStore('Rooms'),
            roomModels, roomAreas = {};

        var successCallback = function (result) {
            roomStore.removeAll();
            Ext.Array.each(result, function (room) {
                roomModels = Ext.create('app.model.Room', room);
                roomStore.add(roomModels);
                if (roomModels.data.RoomAreaName) {
                    roomAreas[roomModels.data.RoomAreaName] = {
                        areaName: roomModels.data.RoomAreaName
                    };
                }
            });
            app.roomAreas = roomAreas;
            //}
            callback();
        };
        var failureCallback = function (result) {
            Ext.Msg.alert("���ط�̨ʧ��!");
        };
        Ext.data.JsonP.request({
            url: '../WebServiceEx.asmx/JSONP_Get_Room',
            callbackKey: 'callback',
            success: successCallback,
            failure: failureCallback
        });
    },
    loadRooms: function (callback) {

        var roomStore = Ext.getStore('Rooms'),
            roomModels, roomAreas = {};

        var successCallback = function (resp, ops) {
            roomStore.removeAll();
            var data = Ext.decode(resp.responseText).d;
            //if (data != "") {
            var Json_Room = Ext.decode(data);
            Ext.Array.each(Json_Room, function (room) {
                roomModels = Ext.create('app.model.Room', room);
                roomStore.add(roomModels);
                if (roomModels.data.RoomAreaName) {
                    roomAreas[roomModels.data.RoomAreaName] = {
                        areaName: roomModels.data.RoomAreaName
                    };
                }
            });
            app.roomAreas = roomAreas;
            //}
            callback();
        };
        var failureCallback = function (resp, ops) {
            Ext.Msg.alert("���ط�̨ʧ��!", resp.responseText);
        };
        Ext.Ajax.request({
            url: '../WebServiceEx.asmx/JSON_Get_Room',
            jsonData: {
            //RoomAreaId: '1'
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadOrderGoods: function (roomID, callback) {

    var goodsStore = Ext.getStore('Goods'),
        goodsTypes = Ext.getStore('GoodsTypes'),
        goodsModels, goodsTypesArr = {};

    var successCallback = function (resp, ops) {
        goodsStore.removeAll();
        goodsTypes.removeAll();
        var data = Ext.decode(resp.responseText).d;
        if (data && data != "") {
            var Json_Goods = Ext.decode(data);
            Ext.Array.each(Json_Goods, function (Good) {
                goodsModels = Ext.create('app.model.Good', Good);
                goodsStore.add(goodsModels);

                if (goodsModels.data.GoodsTypeName) {
                    goodsTypesArr[goodsModels.data.GoodsTypeName] = {
                        GoodsTypeName: goodsModels.data.GoodsTypeName,
                        DisplayOrder: goodsModels.data.DisplayOrder
                    };
                }
            });
            Ext.Array.each(Ext.Object.getValues(goodsTypesArr), function (goodsType) {
                goodsTypes.add(goodsType);
            });
        }
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("���ز�Ʒʧ��!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../WebServiceEx.asmx/JSON_Get_RoomGoods',
        jsonData: {
            roomID: roomID
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadOrderedGoods: function (roomID, callback) {

    var orderStore = Ext.getStore('Orders');
    orderStore.removeAll();
    orderStore.clearFilter(true);
//    orderStore.filterBy(function (Orders) {
//    	return Orders.get('OpCode') == app.CurRoom.RoomOpCode
//    });
    var successCallback = function (resp, ops) {

        var data = Ext.decode(resp.responseText).d;
        var Json_Order = eval('(' + data + ')');
        Ext.Array.each(Json_Order.Orders, function (order) {
            orderModel = Ext.create('app.model.Order', order);
            orderStore.add(orderModel);
        });


        //���¸÷�̨�ļ�¼
        var roomStore = Ext.getStore('Rooms');
        var record = roomStore.findRecord('ID', roomID);
        record.setData(Json_Order.Room[0]);
        app.CurRoom = record.data;
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("�����ѵ㵥ʧ��!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../WebServiceEx.asmx/JSON_GetRoomOrderList',
        jsonData: {
            roomID: roomID
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadOrderMemGoods: function (roomID, callback) {

    var goodsStore = Ext.getStore('Goods'),
        goodsTypes = Ext.getStore('GoodsTypes'),
        goodsModels, goodsTypesArr = {};

    var successCallback = function (resp, ops) {
        goodsStore.removeAll();
        goodsTypes.removeAll();
        var data = Ext.decode(resp.responseText).d;
        if (data && data != "") {
            var Json_Goods = Ext.decode(data);
            Ext.Array.each(Json_Goods, function (Good) {
                goodsModels = Ext.create('app.model.Good', Good);
                goodsStore.add(goodsModels);

                if (goodsModels.data.GoodsTypeName) {
                    goodsTypesArr[goodsModels.data.GoodsTypeName] = {
                        GoodsTypeName: goodsModels.data.GoodsTypeName,
                        DisplayOrder: goodsModels.data.DisplayOrder
                    };
                }
            });
            Ext.Array.each(Ext.Object.getValues(goodsTypesArr), function (goodsType) {
                goodsTypes.add(goodsType);
            });
        }
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("���ز�Ʒʧ��!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../WebServiceEx.asmx/JSON_Get_RoomMemberGoods',
        jsonData: {
            roomID: roomID
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadPresentGoods: function (roomID, callback) {

    var goodsStore = Ext.getStore('Goods'),
        goodsTypes = Ext.getStore('GoodsTypes'),
        goodsModels, goodsTypesArr = {};

    var successCallback = function (resp, ops) {
        goodsStore.removeAll();
        goodsTypes.removeAll();
        var data = Ext.decode(resp.responseText).d;
        if (data && data != "") {
            var Json_Goods = Ext.decode(data);
            Ext.Array.each(Json_Goods, function (Good) {
                goodsModels = Ext.create('app.model.Good', Good);
                goodsStore.add(goodsModels);

                if (goodsModels.data.GoodsTypeName) {
                    goodsTypesArr[goodsModels.data.GoodsTypeName] = {
                        GoodsTypeName: goodsModels.data.GoodsTypeName,
                        DisplayOrder: goodsModels.data.DisplayOrder
                    };
                }
            });
            Ext.Array.each(Ext.Object.getValues(goodsTypesArr), function (goodsType) {
                goodsTypes.add(goodsType);
            });
        }
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("���ز�Ʒʧ��!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../WebServiceEx.asmx/JSON_Get_PresentGoods',
        jsonData: {
            roomID: roomID,
            PresentUserNO: Ext.getStore('User').load().data.items[0].data.userno
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadOrder: function (roomID, callback) {

    var orderStore = Ext.getStore('Orders');
    orderStore.removeAll();
    orderStore.clearFilter(true);
//    orderStore.filterBy(function (Orders) {
//    	return Orders.get('OpCode') == app.CurRoom.RoomOpCode
//    });
    var successCallback = function (resp, ops) {
        var temp = Ext.create('app.model.Order', { 'GoodsName': '��Ʒ','GoodsTypeName': '����', 'Price': '�۸�', 'Unit': '', 'GoodsCount': '����', 'SubTotal': 'С��', 'PresentUser': '�䵥��', 'OpCode':app.CurRoom.RoomOpCode });
        orderStore.add(temp);
        var data = Ext.decode(resp.responseText).d;
        var Json_Order = eval('(' + data + ')');
        Ext.Array.each(Json_Order.Orders, function (order) {
            orderModel = Ext.create('app.model.Order', order);
            orderStore.add(orderModel);
        });


        //���¸÷�̨�ļ�¼
        var roomStore = Ext.getStore('Rooms');
        var record = roomStore.findRecord('ID', roomID);
        record.setData(Json_Order.Room[0]);
        app.CurRoom = record.data;
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("�����ѵ㵥ʧ��!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../WebServiceEx.asmx/JSON_GetRoomOrderList',
        jsonData: {
            roomID: roomID
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadHisOrder: function (roomID, callback) {

    var orderStore = Ext.getStore('Orders');
    orderStore.removeAll();
    orderStore.clearFilter(true);
//    orderStore.filterBy(function (Orders) {
//       return Orders.get('OpCode') != app.CurRoom.RoomOpCode
//    });
    var successCallback = function (resp, ops) {
        var data = Ext.decode(resp.responseText).d;
        var Json_Order = eval('(' + data + ')');
        var pn='0';
        var n=0;
        var sum=0;
        var total=0;
        Ext.Array.each(Json_Order.Orders, function (order) {
            orderModel = Ext.create('app.model.Order', order);
            if (orderModel.data.OpCode > pn ){
               if(pn!='0'){
               sum += total
               var temp=Ext.create('app.model.Order', { 'Unit': '����','SubTotal': total,'OpCode':pn});
               orderStore.add(temp);
               temp=Ext.create('app.model.Order', { 'GoodsName': '--------------------------------','GoodsTypeName': '--------', 'Unit': '-------','SubTotal': '-------', 'PresentUser': '----------------------','OpCode':pn});
               orderStore.add(temp);
               };
               total=0;
               n = n + 1;
               title='===��';
               title+=n;
               title+='�ֵ��===';
               temp=Ext.create('app.model.Order', { 'GoodsName': title,'OpCode':orderModel.data.OpCode});
               orderStore.add(temp);
               temp= Ext.create('app.model.Order', { 'GoodsName': '��Ʒ', 'GoodsTypeName': '����','Price': '�۸�', 'Unit': '', 'GoodsCount': '����', 'SubTotal': 'С��', 'PresentUser': '�䵥��','OpCode':orderModel.data.OpCode });
               orderStore.add(temp);
            };
            
            orderStore.add(orderModel);
            total += Number(orderModel.data.SubTotal);
            pn = orderModel.data.OpCode;
        });
        if(pn!='0'){
//           if(pn==orderModel.data.OpCode){
               sum += total
               temp=Ext.create('app.model.Order', { 'Unit': '����','SubTotal': total,'OpCode':pn});
               orderStore.add(temp);
               temp=Ext.create('app.model.Order', { 'GoodsName': '--------------------------------','GoodsTypeName': '--------', 'Unit': '-------','SubTotal': '-------', 'PresentUser': '----------------------','OpCode':pn});
               orderStore.add(temp);
//           };
        };
        temp=Ext.create('app.model.Order', { 'Unit': '�ܼ�','SubTotal': sum});
        orderStore.add(temp);
      //  orderStore.clearFilter(true);
      //  orderStore.filterBy(function (Orders) {
      //      return Orders.get('OpCode') != app.CurRoom.RoomOpCode
      //  });
        //orderModel = Ext.create('app.model.Order', { 'GoodsName': '��Ʒ', 'Price': '�۸�', 'Unit': '', 'GoodsCount': '����', 'SubTotal': 'С��', 'PresentUser': '�䵥��' });
        //orderStore.insert(0, orderModel);
        //���¸÷�̨�ļ�¼
        var roomStore = Ext.getStore('Rooms');
        var record = roomStore.findRecord('ID', roomID);
        record.setData(Json_Order.Room[0]);
        app.CurRoom = record.data;
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("�����ѵ㵥ʧ��!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../WebServiceEx.asmx/JSON_GetRoomHisOrderList',
        jsonData: {
            roomID: roomID
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadCustomerOrder: function (roomID, opCode, callback) {

    var goodsStore = Ext.getStore('Goods');

    var successCallback = function (resp, ops) {
        var data = Ext.decode(resp.responseText).d;
        var Json_CustomerOrder = Ext.decode(data);
        Ext.Array.each(Json_CustomerOrder, function (main) {
            var goods = goodsStore.findRecord('ID', main.ID);
            goods.data.GoodsCount = main.GoodsCount;
            if (main.GoodsDetails) {
                Ext.Array.each(main.GoodsDetails, function (detail) {
                    Ext.Array.each(goods.data.GoodsDetails, function (gdetail) {
                        if (gdetail.ID == detail.ID)
                            gdetail.GoodsDetailCount = detail.GoodsDetailCount;
                    });
                });
            }
        });

        //        if (goods) 
        //            goods.data.GoodsDetails[index] = data;

        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("�����ѵ㵥ʧ��!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../WebServiceEx.asmx/JSON_GetRoomCustomerOrderList',
        jsonData: {
            roomID: roomID,
            opCode: opCode
        },
        success: successCallback,
        failure: failureCallback
    });
},
loadOverView: function (callback) {

    var viewStore = Ext.getStore('OverViews');
    viewStore.removeAll();

    var successCallback = function (resp, ops) {
        var data = Ext.decode(resp.responseText).d;
        var Json_View = Ext.decode(data);
        Ext.Array.each(Json_View, function (view) {
            viewModel = Ext.create('app.model.OverView', view);
            viewStore.add(viewModel);
        });
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("����ʵʱӪҵ����ʧ��!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../WebServiceEx.asmx/JSON_GetManagerOverView',
        jsonData: {
    },
    success: successCallback,
    failure: failureCallback
});
},
openRoom: function (roomID, callback) {

    var successCallback = function (resp, ops) {
        var data = Ext.decode(resp.responseText).d;
        if (data.indexOf("{ Room:") == -1) {
            Ext.Msg.alert('��ʾ', data, Ext.emptyFn);
            return;
        }
        var Json_Order = eval('(' + data + ')');

        //���¸÷�̨�ļ�¼
        var roomStore = Ext.getStore('Rooms');
        var record = roomStore.findRecord('ID', roomID);
        record.setData(Json_Order.Room[0]);
        app.CurRoom = record.data;

        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("��̨ʧ��!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../WebServiceEx.asmx/JSON_OpenRoom',
        jsonData: {
            roomID: roomID,
            userNo: Ext.getStore('User').load().data.items[0].data.userno
        },
        success: successCallback,
        failure: failureCallback
    });
},
orderRoom: function (submitMobile, callback) {

    var successCallback = function (resp, ops) {
        Ext.Viewport.setMasked(false);
        var data = Ext.decode(resp.responseText).d;
        if (data.indexOf("{ Room:") == -1) {
            Ext.Msg.alert('��ʾ', data, Ext.emptyFn);
            return;
        }
        var Json_Order = eval('(' + data + ')');

        //���¸÷�̨�ļ�¼
        var roomStore = Ext.getStore('Rooms');
        var record = roomStore.findRecord('ID', app.CurRoom.ID);
        record.setData(Json_Order.Room[0]);
        app.CurRoom = record.data;
        Ext.Msg.alert(app.OrderType + "�ɹ�!");
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Viewport.setMasked(false);
        Ext.Msg.alert("�䵥ʧ��!", resp.responseText);
    };
    Ext.Ajax.request({
        method: 'POST',
        url: '../WebServiceEx.asmx/JSON_Add_Orders',
        async: true, //�첽ִ��
        params: submitMobile,
        jsonData: {
            submitMobile: submitMobile
        },
        success: successCallback,
        failure: failureCallback
    });
},
posRoom: function (roomID, totalMoney, trueMoney, payMode, callback) {

    var successCallback = function (resp, ops) {
        var data = Ext.decode(resp.responseText).d;
        if (data.indexOf("{ Room:") == -1) {
            Ext.Msg.alert('��ʾ', data, Ext.emptyFn);
            return;
        }
        var Json_Order = eval('(' + data + ')');

        //���¸÷�̨�ļ�¼
        var roomStore = Ext.getStore('Rooms');
        var record = roomStore.findRecord('ID', roomID);
        record.setData(Json_Order.Room[0]);
        app.CurRoom = record.data;

        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("��ʧ��!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../WebServiceEx.asmx/JSON_PosRoom',
        jsonData: {
            roomID: roomID,
            totalMoney: totalMoney,
            trueMoney: trueMoney,
            payMode: payMode,
            userNo: Ext.getStore('User').load().data.items[0].data.userno
        },
        success: successCallback,
        failure: failureCallback
    });
},
closeRoom: function (roomID, callback) {

    var successCallback = function (resp, ops) {
        var data = Ext.decode(resp.responseText).d;
        if (data.indexOf("{ Room:") == -1) {
            Ext.Msg.alert('��ʾ', data, Ext.emptyFn);
            return;
        }
        var Json_Order = eval('(' + data + ')');

        //���¸÷�̨�ļ�¼
        var roomStore = Ext.getStore('Rooms');
        var record = roomStore.findRecord('ID', roomID);
        record.setData(Json_Order.Room[0]);
        app.CurRoom = record.data;

        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Msg.alert("��̨ʧ��!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../WebServiceEx.asmx/JSON_CloseRoom',
        jsonData: {
            roomID: roomID,
            userNo: Ext.getStore('User').load().data.items[0].data.userno
        },
        success: successCallback,
        failure: failureCallback
    });
},
doBalance: function (callback) {

    var successCallback = function (resp, ops) {
        Ext.Viewport.setMasked(false);
        var msg = Ext.decode(resp.responseText).d;
        if (msg && msg != "") {
            Ext.Msg.alert('��ʾ', msg, Ext.emptyFn);
            return;
        }
        Ext.Msg.alert("Ӫҵ�����ɹ�!");
        callback();
    };
    var failureCallback = function (resp, ops) {
        Ext.Viewport.setMasked(false);
        Ext.Msg.alert("Ӫҵ����ʧ��!", resp.responseText);
    };
    Ext.Ajax.request({
        url: '../WebServiceEx.asmx/JSON_BoBalance',
        jsonData: {
            userNo: Ext.getStore('User').load().data.items[0].data.userno
        },
        success: successCallback,
        failure: failureCallback
    });
}
});
