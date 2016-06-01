Ext.define('app.view.order.PosForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.posform',
    xtype: 'pos',
    requires: [
        'Ext.field.Toggle',
        'Ext.field.Text',
        'Ext.field.Select',
        'Ext.form.FieldSet',
        'Ext.Toolbar',
        'Ext.Button'
    ],

    config: {
        id: 'posForm',
        scroll: 'vertical',
        items: [
            
    		{
    		    xtype: 'fieldset',
    		    margin: '20 0 30 0',  //ʹ��margin����������Ԫ�غ�����Ԫ��֮��Ŀ�϶
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'txtTotalMoney',
                        label: 'Ӧ�ս��',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'txtTruePayMoney',
                        label: 'ʵ�ս��',
                        required: true
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'txtPayMode',
                        label: '���ʽ',
                        options: [
                                { text: '�ֽ�', value: '�ֽ�' },
                                { text: '��Ա��', value: '��Ա��' },
                                { text: '���ÿ�', value: '���ÿ�' },
                                { text: '֧����', value: '֧����' },
                                { text: '΢��', value: '΢��' }
                            ]
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'posOkButton',
                scrollDock: 'bottom',
                ui:'confirm',
                text: 'ȷ����'
            },
            {
                xtype: 'button',
                hidden: true,
                itemId: 'closeButton2',
                docked: 'bottom',
                ui: 'confirm',
                text: '��̨'
            }
        ],
        dockedItems: [
            {
	            id: 'dxTitle',  //����һ��ID
	            xtype: 'toolbar',  //xtype������toolbar��������xtypeö�ټ�����http://docs.sencha.com/touch/1-1/#!/api/Ext.Component
	            ui: 'light',  //light��ʾǳɫ�ı���ͼ��
	            dock: 'top',  //���������������
	            title: "���ǵ㵥"  //�������ı���
            }
		]
    }
});