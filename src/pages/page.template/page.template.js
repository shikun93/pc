/**
 * Created by Administrator on 2017/4/7.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import { Table,Breadcrumb,Icon,Modal,Button, Form, Input, Tooltip,Select,message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const cb =function(err){
    message.error(err);
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

import './page.template.less';




//修改/添加公用表单
class AdminModuleForm extends React.Component {
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
            <FormItem {...formItemLayout}>
                    {getFieldDecorator('layout_id', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["layout_id"]:"",
                    })(
                    <Input  style={{"display":"none"}}/>
                    )}
            </FormItem>
            <FormItem
                    {...formItemLayout}
                    label="版面名称"
                    hasFeedback>
                    {getFieldDecorator('layout_name', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["layout_name"]:"",
                        rules: [ {
                            required: true, message: 'Please input your layout_name!',
                        }],
                    })(
                        <Input disabled={t.props.typePopPu == "edit"?true:false}/>
                    )}
            </FormItem>
            {t.props.typePopPu == "edit"?
                <FormItem
                    {...formItemLayout}
                    label="板式"
                    hasFeedback >
                    {getFieldDecorator('layout_style_name', {
                        initialValue: t.props.formdata["layout_style_name"],
                        rules: [ {
                            required: true, message: 'Please input your layout_style_name!',
                        }],
                    })(
                    <Select>
                        {
                            t.props.formdata['style_list'].map(function(item,index){
                                return <Option value={item.layout_style_name}>{item.layout_style_name}</Option>;
                            })
                        } 
                    </Select>
                    )}
                </FormItem>:''
            }
            <FormItem
                    {...formItemLayout}
                    label="版面描述">
                        {getFieldDecorator('layout_desc', {
                            initialValue: t.props.typePopPu == "edit"?t.props.formdata["layout_desc"]:"",
                            rules: [{ required: true, message: 'Please select your layout_desc!' }],
                        })(
                        <Input />
                    )}
            </FormItem>
            <FormItem
                    {...formItemLayout}
                    label="排序">
                        {getFieldDecorator('sort_order', {
                            initialValue: t.props.typePopPu == "edit"?t.props.formdata["sort_order"]:"",
                            rules: [{ required: true, message: 'Please select your sort_order!' }],
                        })(
                        <Input />
                    )}
            </FormItem>
            <FormItem>
                <Button key="back" size="large" onClick={this.props.cancel}>取消</Button>,
                <Button key="submit" type="primary" size="large"  onClick={this.props.ok.bind(this)}>
                    确认
                </Button>
            </FormItem>
        </Form>
    );
    }
}

const AdminModulesForm = Form.create()(AdminModuleForm);


//组件类
class PageTemplate extends React.Component {
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
        Actions.getAdminModuleList(obj,1,cb);
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
                Actions.editorSuccess(obj,values,Actions,t.state.current,cb);
            }
        });
    }

    //确认添加
    addOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.addPageTemplate(obj,values,Actions,cb);
            }
        });
    }

    //查看
    look(id){
        let t = this;
        hashHistory.push('/main/layoutStyle?id='+id);      
    }

    //修改
    amend(id){
        let obj = sessionStorage.getItem("admin_token");
        Actions.getEditorAdminModule(obj,id,cb);
    }

    //分页
    onChange(page){
        let obj = sessionStorage.getItem("admin_token");
        Actions.getAdminModuleList(obj,page,cb);
    }

    //添加
    add(){
        Actions.addBut();
    }

    addHtml(){
        let t = this;
        return t.state.addVisible?<div>
        <Modal visible={true}
                closable ={false}
                footer={null}>
            <AdminModulesForm  ok={this.addOk} cancel={this.handleCancel} adminGroupList = {t.state.adminGroupList}/>
            </Modal>
            </div>:"";
    }

    onpopup(){
        let t = this;
        return t.state.visible?<div>
        <Modal visible={true}
        closable ={false}
        footer={null}
            >
            <AdminModulesForm adminGroupList = {t.state.adminGroupList}
                            formdata = {t.state.editorOne}
                            ok={this.handleOk}
                            cancel={this.handleCancel} typePopPu="edit"
                            />
            </Modal>
            </div>:"";
    }

    render() {
        let t = this;
        const columns = [{
            dataIndex: 'layout_id',
            width:1,
            render: text => <span style={{"display":"none"}}>{text}</span>,
        },{
            title: '名称',
                dataIndex: 'layout_name',
        },{
            title: '板式',
                dataIndex: 'layout_style_name'
        },{
            title: '描述',
                dataIndex: 'layout_desc',
        },{
            title: '排序',
                dataIndex: 'sort_order',
        },{
            title: '操作',
                width:150,
                key: 'action',
                render: (text, record) => (
            <span>
            <a onClick={t.amend.bind(t,record["layout_id"])}>修改信息</a>
            <span className="ant-divider" />
                <a onClick={this.look.bind(t,record["layout_id"])}>查看板式</a>
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
            current: t.state.current,
            pageSize:10,
            onChange: t.onChange
        }
        return (
            <div className="table1">
            <Breadcrumb className="bread_style">
            <Breadcrumb.Item><a href="">常规版面</a></Breadcrumb.Item>
            <Breadcrumb.Item>常规版面模板</Breadcrumb.Item>
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
ReactMixin.onClass(PageTemplate, Reflux.connect(Store));
module.exports = PageTemplate;
