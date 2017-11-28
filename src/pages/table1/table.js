/**
 * Created by Administrator on 2017/4/7.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import Editors from '../../components/editor/editor';
import { Table,Breadcrumb,Icon,Modal,Button, Form, Input,Radio } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import './table.less';

//修改/添加公用表单
class RegistrationForm extends React.Component {
    state = {
        
    };

    render() {
        let t = this;
        const items = [
                    'bold', 'italic', 'underline',
                    '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                    'insertunorderedlist', '|', 'image', 'link'];
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
            <FormItem
                    style={{margin:0}}
                    >
                    {getFieldDecorator('id', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["qa_id"]:"",
                    })(
                    <Input  style={{"display":"none"}}/>
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="标题"
                    hasFeedback
                    >
                    {getFieldDecorator('title', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata.title:"",
                        rules: [ {
                            required: true, message: 'Please input your Title!',
                        }],
                    })(
                    <Input />
                )}
                </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="内容"
                    >
                        <Editors url="http://api.sjychina.com/admin.qa/uploadimage" editorHtml= {t.props.strHtml} items={items} width="200px" height="400px" data={{name:"cat",value:"N41"}} editorsValue={t.props.typePopPu == "edit"?t.props.formdata.content:""}/>
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="序号"
                    hasFeedback
                    >
                    {getFieldDecorator('sort_order', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["sort_order"]:"",
                        rules: [{
                            required: true, message: 'Please confirm your number!',
                        }],
                    })(
                    <Input type="number" />
                )}
                </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="类型 "
                    >
                    {getFieldDecorator('type', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata.type:"",
                        rules: [{ required: true }],
                    })(
                    <RadioGroup>
                        <Radio value="0">类型0</Radio>
                        <Radio value="1">类型1</Radio>
                    </RadioGroup>
                )}
                </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="是否显示"
                    >
                    {getFieldDecorator('is_show', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["is_show"]:"",
                        rules: [{ required: true }],
                    })(
                    <RadioGroup>
                        <Radio value="0">不显示</Radio>
                        <Radio value="1">显示</Radio>
                    </RadioGroup>
                )}
                </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="链接地址 "
                    hasFeedback
                    >
                    {getFieldDecorator('url', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata.url:""
                    })(
                    <Input />
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

const WrappedRegistrationForm = Form.create()(RegistrationForm);


//组件类
class Table1 extends React.Component {
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
        let current = sessionStorage.getItem("tpage")?sessionStorage.getItem("tpage"):1;
        Actions.getSu(obj,current);
    }
    //取消
    handleCancel(){
        Actions.cancel();
    }

    //确认修改
    handleOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        let current =sessionStorage.getItem("tpage");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                console.log();
                Actions.newlyIncreased(obj,values,Actions, current);
            }
        });

    }

    //确认添加
    addOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.addFormData(obj,values,Actions);
            }
        });
    }

    //移除
    remove(id){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        let current =sessionStorage.getItem("tpage");
        Actions.deleteOne(obj,id,Actions,current);
    }

    //修改
    amend(id){
        let obj = sessionStorage.getItem("admin_token");
        Actions.getAmendData(obj,id);
    }

    //分页
    onChange(page){
        let obj = sessionStorage.getItem("admin_token");
        sessionStorage.setItem("tpage",page);
        Actions.getSu(obj,page);
    }

    //添加
    add(){
        Actions.addBol();
    }

    addHtml(){
        let t = this;
        return t.state.addVisible?<div>
            <Modal visible={true}
            closable ={false}
            footer={null}
            title = "添加Qa"
            >
            <WrappedRegistrationForm  strHtml={this.compileHtmls}  ok={this.addOk} cancel={this.handleCancel} typePopPu="add"/>
         </Modal>
        </div>:"";
    }

    compileHtmls(str){
        let t = this;
        Actions.getHtml(str);
    }

    onpopup(){
        let t = this;
        return t.state.visible?<div>
                    <Modal visible={true}
                            closable ={false}
                            footer={null}
                            title = "修改Qa"
                    >
                   <WrappedRegistrationForm strHtml={this.compileHtmls}  formdata = {t.state.getEditorData} ok={this.handleOk} cancel={this.handleCancel} typePopPu="edit"/>

                    </Modal>
                </div>:"";
    }

    render() {
        let t = this;
        const columns = [{
                dataIndex: 'qa_id',
                render: text => <span style={{"display":"none"}}>{text}</span>,
            },{
                title: '标题',
                dataIndex: 'title',
                width:150
            },{
                title: '内容',
                dataIndex: 'content'
            },{
                title: '序号',
                dataIndex: 'sort_order',
                width:90
            },{
                 title: '类型',
                 dataIndex: 'type',
                width:60
            },{
                title: '是否显示',
                dataIndex: 'is_show',
                width:90
            },{
                title: '链接地址',
                dataIndex: 'url',
                width:100
            },{
                title: '操作',
                    width:100,
                    key: 'action',
                    render: (text, record) => (
                    <span>
                        <a onClick={t.remove.bind(t,record["qa_id"])}>删除</a>
                        <span className="ant-divider" />
                        <a onClick={this.amend.bind(t,record["qa_id"])}>修改</a>
                    </span>
        ),
        }];
        const rowSelection = {
                onChange: (selectedRowKeys, selectedRows) => {
                console.log('selectedRowKeys: ${selectedRowKeys}', 'selectedRows: ', selectedRows);
                },
                onSelect: (record, selected, selectedRows) => {
                    console.log(record, selected, selectedRows);
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                    console.log(selected, selectedRows, changeRows);
                },
                getCheckboxProps: record => ({
                    disabled: record.name === 'Disabled User',    // Column configuration not to be checked
                }),
        };
        let  coo ={
            total: t.state.total,
            current:t.state.current,
            pageSize:10,
            onChange: t.onChange
        }
        return (
            <div className="table1">
                <Breadcrumb className="bread_style">
                    <Breadcrumb.Item><a href="">QA管理</a></Breadcrumb.Item>
                    <Breadcrumb.Item>N41_Qa</Breadcrumb.Item>
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
ReactMixin.onClass(Table1, Reflux.connect(Store));
module.exports = Table1;
