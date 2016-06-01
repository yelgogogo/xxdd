Ext.define('app.view.order.ListGoodsDetail', {
    extend: 'Ext.List',
    alias: 'widget.goodsdetaillist',

    xtype: 'goodsdetail',

    requires: ['app.view.order.ListTpl'],

    config: {
        store: 'GoodsDetails',
        plugins: [{
            xtype: 'listTpl',
            isInput: true
        }],
        scrollable: true,
        cls: 'list',
        itemHeight: 32,
        //useSimpleItems: false,listTpl   
        itemTpl: new Ext.XTemplate(
        '<div class="bh">',
            '<div class="mydiv bone" fire="onGoodsClick"><div>{GoodsName}</div><div>{Price}/{Unit}</div></div>',
            '<div class="bv">',
                '<div class="mydiv x-button" fire="onNumClick" value="-1">',
                '<span class="x-button-icon x-shown lower"></span></div>',
            '</div>',
            '<div class="bv" style="width:40px;text-align:center">',
                '{GoodsDetailCount}',
            '</div>',
            '<div class="bv">',
                '<div class="mydiv x-button"  fire="onNumClick" value="1">',
                '<span class="x-button-icon x-shown add"></span></div>',
            '</div>',
         '</div>'
         ),

        selectedCls: 'x-item-pressed',
        pressedCls: '',
        listeners: {
            onGoodsClick: function (list, record, item, index, btn) {

            },
            onNumClick: function (list, record, item, index, btn) {
                if (record.data.IsFixed)
                    return;
                var value = btn.getAttribute("value"),
                    GoodsDetailCount = record.data.GoodsDetailCount + Number(value),
                    data = record.data;
                if (GoodsDetailCount < 0) {
                    GoodsDetailCount = 0;
                }
                if (Number(value) > 0) {
                    var detailStore = Ext.getStore('GoodsDetails');
                    var grpCount = 0;
                    var detailArr = detailStore.each(function (detail) {
                        if (detail.get('GroupName') == record.data.GroupName)
                            grpCount += detail.get('GoodsDetailCount');
                    });
                    if (grpCount >= record.data.GroupCount) {
                        Ext.Msg.alert(record.data.GroupName + '�������' + grpCount);
                        return;
                    }
                }

                data.GoodsDetailCount = GoodsDetailCount;
                item.setData(data);
                var goods = Ext.getStore('Goods').findRecord('ID', data.PackGoodsID);
                if (goods) {
                    goods.data.GoodsDetails[index] = data;
                }
                //1.����ʹ��item.setRecord(record);�˷����޷�������ͼ
                //2.����ʹ��record.set({taste:taste});�鿴Դ��ᷢ�ִ˷�����ˢ��������ͼ��Ч�ʼ�����¡�

                if (value == -1 && GoodsDetailCount == 0)
                    btn.hide();
                else if (value == 1 && GoodsDetailCount > 0)
                    btn.show();
            }
        }
    }
});
