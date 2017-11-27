import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import {urlhttp,urlhttps} from '../../app/url';
import { Breadcrumb,Button,Form,Switch,Modal} from 'antd';
const FormItem = Form.Item;
import './shop.promotion.less';

//修改/添加公用表单
class ShopPromotionForm extends React.Component {
    state = {
    }; 
    render() {

        let t = this;
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
        };

        const formItemLayout1 = {
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 5,offset:4 },
            },
        };

        return (
            <Form> 
             <FormItem
            {...formItemLayout}
            label="团购"
            >
            {getFieldDecorator('groupbuy_allow', {
                valuePropName: 'checked',
                initialValue:t.props.formData.groupbuy_allow,   
            })(
               <Switch  checkedChildren="开启" unCheckedChildren="关闭"/>
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="商品促销"
            >
            {getFieldDecorator('promotion_allow', {
                valuePropName: 'checked',
                initialValue:t.props.formData.promotion_allow,   
               
            })(
                <Switch  checkedChildren="开启" unCheckedChildren="关闭"/>
            )}
            </FormItem>
             <FormItem
                {...formItemLayout}
                label="积分中心"
                >
                {getFieldDecorator('pointshop_isuse', {
                    valuePropName: 'checked',
                    initialValue:t.props.formData.pointshop_isuse,
                    
                })(
                <Switch  checkedChildren="开启" unCheckedChildren="关闭"/>
            )}
            </FormItem>
             <FormItem
                {...formItemLayout}
                label="积分兑换"
                >
                {getFieldDecorator('pointprod_isuse', {
                    valuePropName: 'checked',
                    initialValue: t.props.formData.pointprod_isuse,
                    
                })(
                <Switch  checkedChildren="开启" unCheckedChildren="关闭"/>
            )}
            </FormItem>
             <FormItem
                {...formItemLayout}
                label="代金券"
                >
                {getFieldDecorator('voucher_allow', {
                    valuePropName: 'checked',
                    initialValue: t.props.formData.voucher_allow,
                    
                })(
                <Switch  checkedChildren="开启" unCheckedChildren="关闭"/>
            )}
            </FormItem>
             <FormItem
                {...formItemLayout}
                label="平台红包"
                >
                {getFieldDecorator('redpacket_allow', {
                    valuePropName: 'checked',
                    initialValue:t.props.formData.redpacket_allow,
                    
                })(
                <Switch  checkedChildren="开启" unCheckedChildren="关闭"/>
            )}
            </FormItem>
            <FormItem {...formItemLayout1}>
                <Button key="submit" type="primary" size="large" onClick={t.props.submitPromotion.bind(t)}>
                    <span style={{color:'#fff'}}>确认提交</span>
                </Button>
            </FormItem>
        </Form>
    );
    }
}

const ShopPromotionsForm = Form.create()(ShopPromotionForm);


//组件类
class ShopPromotion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentWillMount(){
      
    }
    componentDidMount(){
        let t = this;
        let token = sessionStorage.getItem("admin_token");
        Actions.promotion(token);
    }   
    
    submitPromotion(){
        let token = sessionStorage.getItem("admin_token");
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Actions.promotion(token,values,Actions,Modal);
            }
        });
    }
    render() {
        let t = this;
        
        return (
            <div className="shop_promotion">
                <Breadcrumb className="bread_style">
                <Breadcrumb.Item><a href="">设置</a></Breadcrumb.Item>
                <Breadcrumb.Item>促销设置</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <ShopPromotionsForm  submitPromotion={t.submitPromotion} formData={t.state.promotionObj}/>
                </div>
            </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(ShopPromotion, Reflux.connect(Store));
module.exports = ShopPromotion;
