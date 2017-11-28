/**
 * Created by Administrator on 2017/4/7.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import { Table,Breadcrumb,Icon,Modal,Button, Form, Input,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import './admin.admin.less';

//修改/添加公用表单
class AdminForm extends React.Component {
    state = {
        confirmDirty: false,
    };

    render() {
        let t = this;

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        return (
            <Form>
            <FormItem style={{margin:0}}>
                    {getFieldDecorator('admin_id', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["admin_id"]:"",
                    })(
                    <Input  style={{"display":"none"}}/>
                    )}
            </FormItem>
            <FormItem
                    {...formItemLayout}
                    label="管理员名称"
                    hasFeedback>
                    {getFieldDecorator('admin_name', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["admin_name"]:"",
                        rules: [ {
                            required: true, message: '请填写管理员名称!',
                        }],
                    })(
                    <Input />
                    )}
            </FormItem>
            <FormItem
                    {...formItemLayout}
                    label="管理员密码"
                    hasFeedback >
                    {getFieldDecorator('admin_password', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["admin_password"]:"",
                        rules: [ {
                            required: true, message: '请填写管理员密码!',
                        }],
                    })(
                    <Input type="password"/>
                    )}
            </FormItem>
            <FormItem
                    {...formItemLayout}
                    label="管理组ID">
                        {getFieldDecorator('admin_group_id', {
                            initialValue: t.props.typePopPu == "edit"?t.props.formdata["admin_group_id"]:"",
                            rules: [{ required: true, message: '请填写管理组ID!' }],
                        })(
                        <Select>
                            {
                                t.props.adminGroupList.map(function(item,index){
                                return <Option key={index} value={item["admin_group_id"]}>{item["admin_group_name"]}</Option>;
                                })
                            }
                        </Select>
                    )}
            </FormItem>
            <FormItem
                    {...formItemLayout}
                    label="电子邮件"
                    hasFeedback >
                    {getFieldDecorator('email', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["email"]:"",
                        rules: [{
                            type: 'email', message: '这不是电子邮件',
                        },{
                            required: true, message: '请填写电子邮件',
                        }],
                    })(
                    <Input/>
                    )}
            </FormItem>
            <FormItem
                    {...formItemLayout}
                    label="手机号码"
                    hasFeedback >
                    {getFieldDecorator('mobile', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["mobile"]:"",
                        rules: [{
                            required: true, message: '请填写手机号码!',
                        }],
                    })(
                    <Input />
                    )}
        </FormItem>
        <FormItem
                {...formItemLayout}
                    label="真实名字"
                    hasFeedback >
                    {getFieldDecorator('real_name', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["real_name"]:"",
                            rules: [{
                            required: true, message: '请填写真实姓名!',
                        }],
                    })(
                    <Input />
                )}
        </FormItem>
         <FormItem
            {...formItemLayout}
            label="排序"
            hasFeedback >
            {getFieldDecorator('sort_order', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["sort_order"]:"",
                rules: [{
                    required: true, message: '请填写排序!',
                }],
            })(
            <Input type="number" />
        )}
        </FormItem>
        <FormItem>
            <Button key="back" size="large" onClick={this.props.cancel}>取消</Button>,
            <Button key="submit" type="primary" size="large"  onClick={this.props.ok.bind(this)}>
                <span style={{color:"#fff"}}>确认</span>
            </Button>
        </FormItem>
        </Form>
    );
    }
}

const AdminsForm = Form.create()(AdminForm);


//组件类
class AdminAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bol:false
        };
    }
    componentWillMount(){
        let t = this;
        let height = document.documentElement.clientHeight-50;
        this.setState({ height: height+"px" });

    }
    componentDidMount(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        Actions.getAdminAdminList(obj,1);
        Actions.getGroups(obj);
    }
    //取消
    handleCancel(){
        Actions.cancel();
    }

    //确认修改
    handleOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.editorSuccess(obj,values,Actions,t.state.current);
            }
        });
    }

    //确认添加
    addOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.addAdmin(obj,values,Actions);
            }
        });
    }

    //移除没用
    remove(id){
        let t = this;
        cb("正在开发中");
    }

    //修改
    amend(id){
        let obj = sessionStorage.getItem("admin_token");
        Actions.getEditorAdmin(obj,id);
    }

    //分页
    onChange(page){
        let obj = sessionStorage.getItem("admin_token");
        Actions.getAdminGroupList(obj,page);
    }

    //添加
    add(){
        let obj = sessionStorage.getItem("admin_token");
        Actions.addBut(obj);
    }

    addHtml(){
        let t = this;
        return t.state.addVisible?<div>
        <Modal visible={true}
                closable ={false}
                title = "添加管理员"
                footer={null}>
            <AdminsForm  ok={this.addOk} cancel={this.handleCancel} adminGroupList = {t.state.adminGroupList}/>
            </Modal>
            </div>:"";
    }

    onpopup(){
        let t = this;
        return t.state.visible?<div>
        <Modal visible={true}
        closable ={false}
        title = "修改管理员"
        footer={null}
            >
            <AdminsForm adminGroupList = {t.state.adminGroupList}
                            formdata = {t.state.editorOne}
                            ok={this.handleOk}
                            cancel={this.handleCancel} typePopPu="edit"/>
            </Modal>
            </div>:"";
    }

    render() {
        let t = this;
        const columns = [{
            dataIndex: 'admin_group_id',
            width:1,
            render: text => <span style={{"display":"none"}}>{text}</span>,
        },{
            dataIndex: 'admin_id',
            width:1,
            render: text => <span style={{"display":"none"}}>{text}</span>,
        },{
            title: '管理员名称',
            dataIndex: 'admin_name',
        },{
            title: '电子邮件',
            dataIndex: 'email'
        },{
            title: '管理组名称',
            dataIndex: 'admin_group_name',
        },{
            title: '手机号码',
            dataIndex: 'mobile',
        },{
            title: '真实名字',
            dataIndex: 'real_name',
        },{
            title: '操作',
            width:100,
            key: 'action',
            render: (text, record) => (
            <span>
            <a onClick={t.remove.bind(t,record["admin_id"])}>删除</a>
            <span className="ant-divider" />
                <a onClick={this.amend.bind(t,record["admin_id"])}>修改</a>
            </span>
        ),
        }];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
            //console.log('selectedRowKeys: ${selectedRowKeys}', 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            //console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            //console.log(selected, selectedRows, changeRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',    // Column configuration not to be checked
        }),
    };

        let coo ={
            total: t.state.total,
            current: t.state.current,
            pageSize:10,
            onChange: t.onChange
        }
        return (
            <div className="table1">
            <Breadcrumb className="bread_style">
            <Breadcrumb.Item><a href="">后台管理</a></Breadcrumb.Item>
            <Breadcrumb.Item>管理员管理</Breadcrumb.Item>
            </Breadcrumb>
            <div className="table-operations">
            <Button type="dashed" onClick={t.add} icon="plus">添加</Button>
            </div>
            <Table className="table_width" pagination={coo} rowSelection={rowSelection}  columns={columns} dataSource={t.state.list}/>
        {t.onpopup()}
        {t.addHtml()}
    </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(AdminAdmin, Reflux.connect(Store));
module.exports = AdminAdmin;
