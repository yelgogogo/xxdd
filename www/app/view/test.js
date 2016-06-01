Ext.define('app.view.TestView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.testview',

    requires: [
        'Ext.tab.Panel'
    ],

    config: {
        id: 'TestView',
        items: [
            {
                xtype: 'tabpanel',
                docked: 'bottom',
                itemId: 'mytabpanel',
                items: [
                    {
                        xtype: 'container',
                        title: 'Tab 1'
                    },
                    {
                        xtype: 'container',
                        title: 'Tab 2'
                    },
                    {
                        xtype: 'container',
                        title: 'Tab 3'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onMytabpanelActiveItemChange',
                event: 'activeitemchange',
                delegate: '#mytabpanel'
            }
        ]
    },

    onMytabpanelActiveItemChange: function (container, value, oldValue, eOpts) {
        Ext.Msg.alert(value);
    }
});