Ext.define('app.view.order.Listordered', {
    extend: 'Ext.List',
    alias: 'widget.orderedlist',

    xtype: 'ordered',

    requires: ['app.view.order.ListTpl'],

    config: {
        store: 'Orders',
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
                '{GoodsCount}',
            '</div>',
//            '<div class="bv">',
//                '<div class="mydiv x-button"  fire="onNumClick" value="1">',
//                '<span class="x-button-icon x-shown add"></span></div>',
//            '</div>',
         '</div>'
         ),
        items: [
            {
                xtype: 'textfield',
                itemId: 'txtSubTotal',
                readOnly: true,
                docked: 'bottom',
                label: '�ϼ�:'
            },
            {
                xtype: 'button',
                itemId: 'btnQueRen',
                scrollDock: 'bottom',
                docked: 'bottom',
                ui:'confirm',
                text: 'ȷ��'
            }
        ],

        selectedCls: 'x-item-pressed',
        pressedCls: '',
        listeners: {
            onGoodsClick: function (list, record, item, index, btn) {
                data = record.data;
                if (data.IsPack)
                    this.fireEvent("onPackGoodsClicked", list, record, item, index, btn);
            },
            onNumClick: function (list, record, item, index, btn) {
                console.log("onNumClick");
                var value = btn.getAttribute("value"),
                    GoodsCount = record.data.GoodsCount + Number(value),
                    data = record.data;
                if (GoodsCount < 0) {
                    GoodsCount = 0;
                }

                data.GoodsCount = GoodsCount;
                item.setData(data);
                //1.����ʹ��item.setRecord(record);�˷����޷�������ͼ
                //2.����ʹ��record.set({taste:taste});�鿴Դ��ᷢ�ִ˷�����ˢ��������ͼ��Ч�ʼ�����¡�

                if (value == -1 && GoodsCount == 0)
                    btn.hide();
                else if (value == 1 && GoodsCount > 0)
                    btn.show();
            }
        }
    }
});
