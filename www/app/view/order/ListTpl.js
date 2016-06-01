/*
*list tplģ����밴ť���
*<div class="x-button-normal x-button x-iconalign-center x-layout-box-item x-stretched btn"><span class="x-button-icon x-shown lower" fire="showWeibo"></span></div>
*fire="showWeibo" �����Ǽ���ָ���¼�
*����������cmp:��ͼ�����Լ�doit
*ֻҪ�����ϸ�ʽ��ģ�嶼���Ա���ص�
*����btn��lowerΪ�Զ�����ʽ����������st�Դ���ʽ
*/
Ext.define('app.view.order.ListTpl', {
    alias: 'plugin.ListTpl',
    xtype: 'listTpl',
    config: {
        list: null,
        //����ʱ���css
        pressedCls: 'pressing',
        //��ض���ѡ����
        delegate: '.mydiv', //div.mydiv
        //�Ƿ����input�ؼ�
        isInput: false
    },
    constructor: function (config) {
        this.initConfig(config);
        this.callParent([config]);
    },
    //��ʼ��
    init: function (list) {
        this.setList(list);
    },
    //��������
    updateList: function (newList, oldList) {
        if (newList) {
            //Ϊ�Զ��尴ťע�����¼�
            newList.container.element.on({
                tap: 'onTap',
                touchstart: 'onPress',
                touchend: 'onRelease',
                delegate: this.getDelegate(),
                scope: this
            });
            if (this.getIsInput()) {
                //Ϊ�Զ��尴ťע�����¼�
                newList.container.element.on({
                    blur: 'onBlur',
                    delegate: 'input[type="text"]',
                    scope: this
                });
            }
        }
    },
    //ִ�ж���
    onTap: function (e) {
        var me = this.getList(),
        item = Ext.getCmp(Ext.get(e.getTarget()).up('.x-list-item').id),
        index = item.$dataIndex,
        record = me.getStore().getAt(index),
        el = e.getTarget(this.getDelegate(), null, true),
        fire = el.getAttribute('fire'),
        action = 'do' + fire;
        me.fireAction(fire, [me, record, item, index, el], action);
    },
    //��ť����ʱ�����css
    onPress: function (e, node) {
        var el = e.getTarget(this.getDelegate(), null, true);
        el.addCls(this.getPressedCls());
    },
    //��ť�ɿ�ʱ���Ƴ�css
    onRelease: function (e, node) {
        var el = e.getTarget(this.getDelegate(), null, true);
        el.removeCls(this.getPressedCls());
    },
    //�����뿪ʱ����ֵ��䵽store��
    onBlur: function (e) {
        var me = this.getList(),
        item = Ext.getCmp(Ext.get(e.getTarget()).up('.x-list-item').id),
        index = item.$dataIndex,
        record = me.getStore().getAt(index),
        el = e.getTarget('input', null, true),
        value = el.getValue(),
        name = el.getAttribute('name');
        record.data[name] = value;
    }
});