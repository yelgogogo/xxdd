Ext.define('app.view.LoginForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginform',

    requires: [
        'Ext.field.Toggle',
        'Ext.field.Text',
        'Ext.form.FieldSet',
        'Ext.Toolbar',
        'Ext.Button'
    ],

    config: {
        id: 'loginForm',
        scroll: 'vertical',
        //layout: { type: 'hbox', align: 'center' },
        items: [
            {
					xtype: 'toolbar',  //ʹ����ͨ��Container��������
					height: 68,  //�߶�Ҫ��ͼƬ�ߴ�����Ӧ��������������html�����и�ͼƬ����16px��margin-top������Container�߶����ó�ͼƬ�߶�+16����ֹͼƬ��ʾ������
					//width: 96,  //ͼƬ�Ŀ��
                    ui: 'light',
                    title: "���ǵ㵥"  //�������ı���
					//html: '<img src="../dxmobile/app/view/room.png" style="margin-top: 16px;" />'  //ֱ���趨html��������ʾͼƬ��ע����16���صĶ���margin
	        },
    		{
    		    xtype: 'fieldset',
    		    margin: '20 0 30 0',  //ʹ��margin����������Ԫ�غ�����Ԫ��֮��Ŀ�϶
                items: [
                    {
                        xtype: 'textfield',
                        name: 'userno',
                        //label: '����',
                        required: true,
                        placeHolder: '���Ĺ���',
                        itemId: 'usernameText'
                    },
                    {
                        xtype: 'passwordfield',
                        name: 'password',
                        //label: '����',
                        required: true,
                        placeHolder: '��������',
                        itemId: 'passwordText'
                    },
                    {
                        xtype: 'togglefield',
                        name: 'isremember',
                        label:'��ס����'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'loginButton',
                ui: 'confirm',
                text: '��¼'
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
		],
        listeners:[
            {
        	    delegate:"#loginButton",
        	    event:"tap",
        	    fn:"onLoginButtonTap"
            }
        ]
    },
    onLoginButtonTap:function(){
    	//Ext.Msg.alert("Login Failure");
    	this.fireEvent("onLoginClicked");
    }

});