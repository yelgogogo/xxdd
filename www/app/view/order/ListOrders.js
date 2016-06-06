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
        //<a href="http://cli.im/api/qrcode">201505150002</a> 二维码
        itemTpl: [
            '<div class="bh" style = "background-color:{BackColor};color: {ForeColor}">',
            '<div class="bone" style = "width:25%">{GoodsTypeName}</div>',
            '<div class="bone" style = "width:48%">{GoodsName}</div>',
          //  '<div class="bone" style = "width:15%">{GoodsTypeName}<br />状态:{Status}</div>',
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
                            label: '订房人',
                            itemId: 'txtReserver'
                        },
                        {
                            readOnly: true,
                            label: '消费合计',
                            itemId: 'txtConsumed',
                            value: '0'
                        },
                        {
                            readOnly: true,
                            label: '赠送合计',
                            itemId: 'txtPresented',
                            value: '0'
                        }
                    ]
            }
//            {
//                height: 20,
//                minheight:20,
//                xtype: 'textfield',
//                label: '消费合计:',
//                itemId: 'txtConsumed',
//                docked: 'top',
//                readOnly : true,
//                value:'0'
//            },
//            {
//                xtype: 'textfield',
//                label: '赠送合计:',
//                itemId: 'txtPresented',
//                docked: 'top',
//                readOnly: true,
//                value: '0'
//            }
//            ,
//            {
//                docked: 'top',
//                html: ['<div class="bh">',
//                '<div class="bone" style = "width:50%"><div>菜品</div><div>价格/单位</div></div>',
//                '<div class="bone" style = "width:30%">数量|小计</div>',
//                '<div class="bone" style = "width:20%">落单人</div>',
//                '</div>',
//                '</div>'].join("")
//            }
        ]
    }
});
