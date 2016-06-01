Ext.define('app.view.manager.ListOverView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.overviewform',

    xtype: 'overview',

    config: {
        fullscreen: true,
        scrollable: true,
        items: [
                {
                    xtype: 'fieldset',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: '60%',
                        inputCls: 'dxtextright',
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            docked: 'top',
                            readOnly: true,
                            label: '�ۼƿ���',
                            name: 'RoomOpenTotal'
                        },
                        {
                            readOnly: true,
                            label: '��ǰ����',
                            name: 'RoomOpen'
                        },
                        {
                            readOnly: true,
                            label: '���˷�',
                            name: 'RoomPosed'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: '60%',
                        inputCls: 'dxtextright',
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            docked: 'top',
                            readOnly: true,
                            label: '�ۼƿ�̨',
                            name: 'HallOpenTotal'
                        },
                        {
                            readOnly: true,
                            label: '��ǰ��̨',
                            name: 'HallOpen'
                        },
                        {
                            readOnly: true,
                            label: '����̨',
                            name: 'HallPosed'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: '60%',
                        inputCls: 'dxtextright',
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            docked: 'top',
                            readOnly: true,
                            label: '���տ�',
                            name: 'PosedAmount'
                        },
                        {
                            readOnly: true,
                            label: '�����տ�',
                            name: 'PosedHallAmount'
                        },
                        {
                            readOnly: true,
                            label: '�����տ�',
                            name: 'PosedRoomAmount'
                        },
                        {
                            docked: 'bottom',
                            readOnly: true,
                            label: 'Ԥ��������',
                            name: 'PosFinallyAmount'
                        },
                        {
                            docked: 'bottom',
                            readOnly: true,
                            label: 'Ԥ��δ�տ�',
                            name: 'PosingAmount'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: '60%',
                        inputCls: 'dxtextright',
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            docked: 'top',
                            readOnly: true,
                            label: '���ͺϼ�',
                            name: 'PresentAmount'
                        },
                        {
                            readOnly: true,
                            label: 'Ա������',
                            name: 'PresentAmountEmp'
                        },
                        {
                            readOnly: true,
                            label: '��˾����',
                            name: 'PresentAmountCompany'
                        }
                    ]
                },
        ]
    },
    initialize: function () {
        this.callParent();
        var viewStore = Ext.getStore('OverViews');
        this.setValues(viewStore.data.items[0].data);
    }
});
