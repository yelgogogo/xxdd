Ext.define('app.controller.mng.MngLogin', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            loginView: "loginform"
        },

        control: {
            loginView: {
                onLoginClicked: "onlogin"
            }
        }
    },

    onlogin: function (button, e, eOpts) {
        loginView = this.getLoginView(); // Login Form
        values = loginView.getValues();
        var UserNo = values.userno;
        var Pwd = values.password;
        var IsRemember = values.isremember;

        var successCallback = function (resp, ops) {
            var data = Ext.decode(resp.responseText).d;

            if (data) {
                result = eval('(' + data + ')');
                if (!Ext.Array.contains(result.rights, "�����ѯ")) {
                    Ext.Msg.alert("��û��Ȩ�޵�¼����ģ��!");
                    return;
                }
                app.CurModel = '����';
                //���ص�¼�û�����
                var userStore = Ext.getStore('User').load();
                userStore.removeAll();

                var user = Ext.create("app.model.User");
                user.set("username", result.user);
                user.set("password", Pwd);
                user.set("userno", UserNo);
                user.set("isremember", IsRemember);
                user.set("rights", result.rights);
                userStore.add(user);
                userStore.sync();
                Ext.Viewport.setMasked({ xtype: 'loadmask' });
                app.util.Proxy.loadOverView(function () {
                    var mainView = Ext.create('app.view.manager.MngCard'); 
                    Ext.Viewport.add(mainView);
                    loginView.reset();
                    loginView.hide();
                    mainView.show();
                    Ext.Viewport.setMasked(false);
                });
                //mainView.setActiveItem(1);
                //Ext.Viewport.setMasked(false);
            }
            else
                Ext.Msg.alert("�û������������!");
        };
        var failureCallback = function (resp, ops) {
            Ext.Msg.alert("��¼ʧ��!", resp.responseText);
        };

        //TODO: Login using server-side authentication service        
        Ext.Ajax.request({
            url: '../WebServiceEx.asmx/JSON_CheckPassword',
            //            headers: {
            //                'Content-Type': 'application/json;utf-8'
            //            },

            params: values,
            jsonData: {
                username: UserNo,
                password: Pwd
            },
            success: successCallback,
            failure: failureCallback
        });
    }
});