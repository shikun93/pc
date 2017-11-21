/**
 * Created by Administrator on 2017/4/7.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import {urlhttp,urlhttps} from '../../app/url';
import { Breadcrumb,Icon,Button, Form, Input,message,Upload,Modal } from 'antd';
const FormItem = Form.Item;
import './shop.setting.less';

const cb =function(err){
    message.error(err);
}


//修改/添加公用表单
class ShopSettingForm extends React.Component {
    state = {
      n:0,
      n1:0,
      n2:0
    }; 

    normFile = (e) => {
        if(e.fileList.length===1){
            this.setState({n:1});
        }else{
            this.setState({n:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile1 = (e) => {
        console.log(e.fileList,e.fileList.length===1);
        if(e.fileList.length===1){
            this.setState({n1:1});
        }else{
            this.setState({n1:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile2 = (e) => {
        if(e.fileList.length===1){
            this.setState({n2:1});
        }else{
            this.setState({n2:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    componentWillReceiveProps(nextProps) {
        let t = this;
        let obj = {};
        if(nextProps.formdata.site_logo.length ===1){
            obj.n = 1;
        }
        if(nextProps.formdata.member_logo.length ===1){
            obj.n1 = 1;
        }
        if(nextProps.formdata.seller_center_logo.length ===1){
            obj.n2 = 1;
        }
        t.setState(obj);
    }

    render() {

        let t = this;
        let token = sessionStorage.getItem("admin_token");
        const { getFieldDecorator } = this.props.form;

         const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

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
            label="网站logo"
            >
            {getFieldDecorator('site_logo', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue:t.props.formdata.site_logo,
                rules: [{
                    required: true, message: 'Please confirm your 网站logo',
                }],
            })(
             <Upload
              action={urlhttp+"/admin.shop_setting/uploadimage"}
              listType="picture-card"
              data={{admin_token:token,file_name:"site_logo"}}
              name="img"
            >
                {t.state.n==1?null:uploadButton}
            </Upload>
        )}
        </FormItem>
            <FormItem
            {...formItemLayout}
            label="会员中心logo"
            >
            {getFieldDecorator('member_logo', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile1,
                initialValue:t.props.formdata.member_logo,
                rules: [{
                    required: true, message: 'Please confirm your 会员中心logo',
                }],
            })(
                <Upload
                  action={urlhttp+"/admin.shop_setting/uploadimage"}
                  listType="picture-card"
                  data={{admin_token:token,file_name:"member_logo"}}
                  name="img"
                >
                     {t.state.n1==1?null:uploadButton}
                </Upload>
            )}
            </FormItem>
             <FormItem
                {...formItemLayout}
                label="商家中心logo"
                >
                {getFieldDecorator('seller_center_logo', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile2,
                    initialValue:t.props.formdata.seller_center_logo,
                    rules: [{
                        required: true, message: 'Please confirm your 商家中心logo',
                    }],
                })(
                  <Upload
                    action={urlhttp+"/admin.shop_setting/uploadimage"}
                    listType="picture-card"
                    data={{admin_token:token,file_name:"seller_center_logo"}}
                    name="img"
                    >
                 {t.state.n2==1?null:uploadButton}
            </Upload>
            )}
            </FormItem>
             <FormItem
                {...formItemLayout}
                label="平台客服"
                hasFeedback >
                {getFieldDecorator('site_phone', {
                    initialValue:t.props.formdata.site_phone,
                    rules: [{
                        required: true, message: 'Please confirm your 平台客服',
                    }],
                })(
                 <Input / >
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="电子邮件"
                hasFeedback >
                {getFieldDecorator('site_email', {
                    initialValue: t.props.formdata.site_email,
                    rules: [{
                        required: true, message: 'Please confirm your 电子邮件',
                    },{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }],
                })(
                 <Input / >
            )}
            </FormItem>
            <FormItem 
                {...formItemLayout1}>
                <Button key="submit" type="primary" size="large" onClick={t.props.addOk.bind(t)}>
                    <span style={{color:'#fff'}}>确认</span>
                </Button>
            </FormItem>
        </Form>
    );
    }
}

const ShopSettingsForm = Form.create()(ShopSettingForm);


//组件类
class ShopSetting extends React.Component {
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
        Actions.setting(token,cb);
    }

    submitSetting(){
        let token = sessionStorage.getItem("admin_token");
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Actions.setting(token,cb,values,Actions,Modal);
            }
        });
    }

    render() {
        let t = this;
    
        return (
            <div className="shop_setting">
            <Breadcrumb className="bread_style">
            <Breadcrumb.Item><a href="">设置</a></Breadcrumb.Item>
            <Breadcrumb.Item>促销设置</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <ShopSettingsForm  addOk={t.submitSetting} formdata={t.state.formObj}/>
            </div>
    </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(ShopSetting, Reflux.connect(Store));
module.exports = ShopSetting;
