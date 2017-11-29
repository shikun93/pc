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
import { Breadcrumb,Button,Form,Input,Tabs,Modal,Row,Col } from 'antd';
import './system.setting.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class SystemSettingForm extends React.Component {
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
                sm: { span: 6 },
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
                    label="SMTP服务器"
                    extra="设置 SMTP 服务器的地址，如 smtp.163.com">
                    {getFieldDecorator('email_host', {
                        initialValue: t.props.formData.email_host?t.props.formData.email_host.value:''
                    })(
                   <Input />
                )}
                </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="SMTP端口"
                    extra="设置 SMTP 服务器的端口，默认为 25">
                    {getFieldDecorator('email_port', {
                        initialValue:  t.props.formData.email_port?t.props.formData.email_port.value:25
                    })(
                   <Input />
                )}
                </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="发信人邮件地址"
                    extra="使用SMTP协议发送的邮件地址，如 shopnc@163.com">
                    {getFieldDecorator('email_addr', {
                        initialValue:  t.props.formData.email_addr?t.props.formData.email_addr.value:''
                    })(
                   <Input />
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="SMTP 身份验证用户名"
                    extra="如 shopnc">
                    {getFieldDecorator('email_id', {
                        initialValue: t.props.formData.email_id?t.props.formData.email_id.value:''
                    })(
                   <Input />
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="SMTP 身份验证密码"
                    extra="shopnc@163.com邮件的密码，如 123456">
                    {getFieldDecorator('email_pass', {
                        initialValue: t.props.formData.email_pass?t.props.formData.email_pass.value:''
                    })(
                   <Input type="passwrod"/>
                )}
                </FormItem>
                <FormItem 
                    {...formItemLayout}
                    label="测试接收的邮件地址">
                    <Row>
                        <Col span={18}>
                          
                            {getFieldDecorator('address', {
                                initialValue: ''
                            })(
                                <Input />  
                            )}
                        </Col>
                        <Col span={5} offset={1}>
                          <Button onClick={t.props.testingEmail.bind(t)}>测试</Button>
                        </Col>
                    </Row>
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

const SystemSettingsForm = Form.create()(SystemSettingForm);


//组件类
class SystemSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount(){
        let t = this;
        let token = sessionStorage.getItem("admin_token");
        Actions.emailSetting(token);
    }

    settingEmail(){
        let token = sessionStorage.getItem("admin_token");
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Actions.emailSetting(token,values,Actions,Modal);
            }
        });
    }

    testingEmail(){
        let token = sessionStorage.getItem("admin_token");
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Actions.testEmail(token,values,Modal);
            }
        });
    }

    render() {
        let t = this;
    
        return (
            <div className="system_setting">
            <Breadcrumb className="bread_style">
            <Breadcrumb.Item><a href="">设置</a></Breadcrumb.Item>
            <Breadcrumb.Item>邮件设置</Breadcrumb.Item>
            </Breadcrumb>
            <div className="main">
                <Tabs type="card" animated={false}>
                    <TabPane tab="邮件设置" key="1">
                        <SystemSettingsForm addOk={t.settingEmail} testingEmail={t.testingEmail} formData={t.state.formData}/>
                    </TabPane>
                    <TabPane tab="消息模板" key="2">
                       
                    </TabPane>
                </Tabs>
            </div>
    </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(SystemSetting, Reflux.connect(Store));
module.exports = SystemSetting;
