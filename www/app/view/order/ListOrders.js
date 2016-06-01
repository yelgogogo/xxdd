Ext.define('app.view.order.ListOrders', {
    extend: 'Ext.List',
    alias: 'widget.orderedslist',

    xtype: 'ordereds',

    config: {
        store: 'Orders',
        scrollable: true,
        cls: 'list',
        itemHeight: 32,
        selectedCls: '',
        pressedCls: '',
        //useSimpleItems: false,listTpl
        //<a href="http://cli.im/api/qrcode">201505150002</a> ��ά��
        itemTpl: [
            '<div class="bh" style = "background-color:{BackColor};color: {ForeColor}">',
            '<div class="bone" style = "width:25%">{GoodsTypeName}</div>',
            '<div class="bone" style = "width:48%">{GoodsName}</div>',
          //  '<div class="bone" style = "width:15%">{GoodsTypeName}<br />״̬:{Status}</div>',
            '<div class="bone" style = "width:12%">{GoodsCount}{Unit}</div>',
            '<div class="bone" style = "width:15%;text-align:right;padding-right:10px">{SubTotal}</div>',
         // '<div class="bone" style = "width:30%;text-align:right;">{PresentUser}<br />{OrderTime}</div>',
            '</div>',
         '</div>'
        ],
        items: [
            {
                xtype: 'fieldset',
                docked: 'top',
                defaults: {                    
                    xtype: 'textfield',
                    labelWidth: '50%',
                    inputCls: 'dxtextright',
                    flex: 1
                },
                layout: 'hbox',
                items: [
                        {
                            docked: 'top',
                            readOnly: true,
                            label: '������',
                            itemId: 'txtReserver'
                        },
                        {
                            readOnly: true,
                            label: '���Ѻϼ�',
                            itemId: 'txtConsumed',
                            value: '0'
                        },
                        {
                            readOnly: true,
                            label: '���ͺϼ�',
                            itemId: 'txtPresented',
                            value: '0'
                        }
                    ]
            }
//            {
//                height: 20,
//                minheight:20,
//                xtype: 'textfield',
//                label: '���Ѻϼ�:',
//                itemId: 'txtConsumed',
//                docked: 'top',
//                readOnly : true,
//                value:'0'
//            },
//            {
//                xtype: 'textfield',
//                label: '���ͺϼ�:',
//                itemId: 'txtPresented',
//                docked: 'top',
//                readOnly: true,
//                value: '0'
//            }
//            ,
//            {
//                docked: 'top',
//                html: ['<div class="bh">',
//                '<div class="bone" style = "width:50%"><div>��Ʒ</div><div>�۸�/��λ</div></div>',
//                '<div class="bone" style = "width:30%">����|С��</div>',
//                '<div class="bone" style = "width:20%">�䵥��</div>',
//                '</div>',
//                '</div>'].join("")
//            }
        ]
    }
});
