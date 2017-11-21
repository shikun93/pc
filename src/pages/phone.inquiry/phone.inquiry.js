/**
 * Created by Administrator on 2017/5/15.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import { Button, Form, Input,message} from 'antd';
import {urlhttp,urlhttps} from '../../app/url';
const FormItem = Form.Item;

const cb =function(err){
    message.error(err);
}
import './phone.inquiry.less';




//查询优惠券信息
class VoucherForm extends React.Component {
    state = {
        confirmDirty: false,
    };

    componentDidMount(){
        document.title = "易打单优惠券查询";
    }
    render() {

        let t = this;
        const { getFieldDecorator } = this.props.form;

        return (
            <Form className="voucher_no">
                <FormItem label="易打单优惠券查询">
                    {getFieldDecorator('voucher_no', {
                    })(
                        <Input className="input"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button key="submit" type="primary" size="large" onClick={t.props.getvalue.bind(this)}>
                        查询
                    </Button>
                </FormItem>
        </Form>
    );
    }
}

const VouchersForm = Form.create()(VoucherForm);


//组件类
class PhoneInquiry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bol:false
        };
    }

    getValue(){
        this.props.form.validateFields(function(err,values){
                Actions.getList(values,cb);
        });
    }

    render() {
        let t = this;
        return (
            <div className="table1">
            <div className="phone_inquiry">  
            <VouchersForm  getvalue={t.getValue}/>
            </div>
            {t.state.list !=null?
                <ul className="phone_list">
                    <li><p className="p1">优惠码</p><p className="p2">{t.state.list["voucher_no"]}</p></li>
                    <li><p className="p1">店铺名</p><p className="p2">{t.state.list["taobao_shop"]}</p></li>
                    <li><p className="p1">订购时间</p><p className="p2">{t.state.list["order_date"]}</p></li>
                    <li><p className="p1">返现申请时间</p><p className="p2">{t.state.list["cashback_date"]}</p></li>
                    <li><p className="p1">首月天数</p><p className="p2">{t.state.list["firstmonth_days"]}</p></li>
                    <li><p className="p1">首月单量</p><p className="p2">{t.state.list["firstmonth_orders"]}</p></li>
                </ul>
            :""}
    </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(PhoneInquiry, Reflux.connect(Store));
module.exports = PhoneInquiry;
