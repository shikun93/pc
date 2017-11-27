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
import { Breadcrumb,Button,Form,Input,Tabs,Modal,Switch} from 'antd';
import './site.setup.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class SiteSetupForm extends React.Component {
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
                    label="网站名称"
                    extra="网站名称，将显示在前台顶部欢迎信息等位置">
                    {getFieldDecorator('site_name', {
                        initialValue: t.props.formData.site_name?t.props.formData.site_name.value:''
                    })(
                   <Input />
                )}
                </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="ICP证书号"
                    extra="前台页面底部可以显示 ICP 备案信息，如果网站已备案，在此输入你的授权码，它将显示在前台页面底部，如果没有请留空">
                    {getFieldDecorator('icp_number', {
                        initialValue:  t.props.formData.icp_number?t.props.formData.icp_number.value:''
                    })(
                   <Input />
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="站点状态"
                    extra="可暂时将站点关闭，其他人无法访问，但不影响管理员访问后台">
                    {getFieldDecorator('site_status', {
                        valuePropName: 'checked',
                        initialValue:t.props.formData.site_status?Boolean(t.props.formData.site_status.value):false,
                    })(
                   <Switch  checkedChildren="开启" unCheckedChildren="关闭"/>
                )}
                </FormItem>
                <FormItem 
                    {...formItemLayout}
                    label="关闭原因"
                    extra="当网站处于关闭状态时，关闭原因将显示在前台">
                    {getFieldDecorator('closed_reason', {
                        initialValue: t.props.formData.closed_reason?t.props.formData.closed_reason.value:'升级中……'
                    })(
                    <Input type="textarea"/>  
                    )}
                </FormItem>
                <FormItem 
                    {...formItemLayout1}>
                    <Button key="submit" type="primary" size="large" onClick={t.props.addOk.bind(t)}>
                        <span style={{color:'#fff'}}>确认提交</span>
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const SiteSetupsForm = Form.create()(SiteSetupForm);


//组件类
class SiteSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount(){
        let t = this;
        let token = sessionStorage.getItem("admin_token");
        Actions.siteSetting(token);
    }

    settingEmail(){
        let token = sessionStorage.getItem("admin_token");
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Actions.siteSetting(token,values,Actions,Modal);
            }
        });
    }

    render() {
        let t = this;
    
        return (
            <div className="site_setup">
            <Breadcrumb className="bread_style">
            <Breadcrumb.Item><a href="">设置</a></Breadcrumb.Item>
            <Breadcrumb.Item>站点设置</Breadcrumb.Item>
            </Breadcrumb>
            <div className="main">
                <Tabs type="card" animated={false}>
                    <TabPane tab="商城设置" key="1">
                        <SiteSetupsForm addOk={t.settingEmail} testingEmail={t.testingEmail} formData={t.state.formData}/>
                    </TabPane>
                    <TabPane tab="防灌水设置" key="2">
                       
                    </TabPane>
                    <TabPane tab="登陆主题图片" key="3">
                       
                    </TabPane>
                </Tabs>
            </div>
    </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(SiteSetup, Reflux.connect(Store));
module.exports = SiteSetup;
