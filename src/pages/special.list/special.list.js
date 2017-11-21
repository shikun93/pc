/**
 * Created by Administrator on 2017/4/7.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import { Table,DatePicker,Breadcrumb,Icon,Modal,Button, Form, Input, Tooltip,Radio,message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import moment from 'moment';

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

import './special.list.less';




//修改/添加公用表单
class SpecialListForm extends React.Component {
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
                    {getFieldDecorator('layout_special_id', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["layout_special_id"]:"",
                    })(
                    <Input  style={{"display":"none"}}/>
                    )}
            </FormItem>
            <FormItem
                    {...formItemLayout}
                    label="专题名称"
                    hasFeedback>
                    {getFieldDecorator('layout_special_name', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["layout_special_name"]:"",
                        rules: [ {
                            required: true, message: 'Please input your layout_special_name!',
                        }],
                    })(
                    <Input />
                    )}
            </FormItem>
            <FormItem
                    {...formItemLayout}
                    label="专题描述"
                    hasFeedback >
                    {getFieldDecorator('layout_special_desc', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["layout_special_desc"]:"",
                        rules: [ {
                            required: true, message: 'Please input your layout_special_desc!',
                        }],
                    })(
                    <Input />
                    )}
            </FormItem>
             <FormItem
              {...formItemLayout}
              label="开始时间">
                  {getFieldDecorator('start_time',{
                        initialValue: t.props.typePopPu == "edit"?moment(t.props.formdata["start_time"], "YYYY-MM-DD HH:mm:ss"):"",
                        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                    })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                  )}
            </FormItem>
             <FormItem
                  {...formItemLayout}
                  label="结束时间">
                  {getFieldDecorator('end_time',{
                    initialValue: t.props.typePopPu == "edit"?moment(t.props.formdata["end_time"], "YYYY-MM-DD HH:mm:ss"):"",
                    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                    })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                  )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="是否显示"
                hasFeedback
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
                    label="排序"
                    hasFeedback >
                    {getFieldDecorator('sort_order', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["sort_order"]:"",
                        rules: [ {
                            required: true, message: 'Please input your sort_order!',
                        }],
                    })(
                    <Input />
                    )}
            </FormItem>
            <FormItem>
                <Button key="back" size="large" onClick={this.props.cancel}>取消</Button>,
                <Button key="submit" type="primary" size="large"  onClick={this.props.ok.bind(this,this.props.layoutStyleId)}>
                    确认
                </Button>
            </FormItem>
        </Form>
    );
    }
}

const SpecialListsForm = Form.create()(SpecialListForm);


//组件类
class SpecialList extends React.Component {
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
        let id = this.props.location.query.id;
        Actions.getSpecialList(obj,1,id,cb);
    }
    //取消
    handleCancel(){
        Actions.cancel();
    }

    //确认修改
    handleOk(id){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.editorSuccess(obj,values,Actions,t.state.current,id,cb);
            }
        });
    }

    //确认添加
    addOk(id){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.addSpecialList(obj,values,Actions,id,cb);
            }
        });
    }

    //修改
    amend(id){
        let obj = sessionStorage.getItem("admin_token");
        Actions.getEditorSpecial(obj,id,cb);
    }

    //分页
    onChange(page){
        let obj = sessionStorage.getItem("admin_token");
        Actions.getAdminGroupList(obj,page);
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
            <SpecialListsForm layoutStyleId={t.props.location.query.id}  ok={this.addOk} cancel={this.handleCancel} adminGroupList = {t.state.adminGroupList}/>
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
            <SpecialListsForm adminGroupList = {t.state.adminGroupList}
                            formdata = {t.state.editorOne}
                            ok={this.handleOk}
                            cancel={this.handleCancel} 
                            typePopPu="edit"
                            layoutStyleId={t.props.location.query.id}/>
            </Modal>
            </div>:"";
    }

    JumpEdit(id){
        let url ="/main/specialModule?id="+id;
        hashHistory.push(url);
    }

    render() {
        let t = this;
        const columns = [{
            dataIndex: 'layout_special_id',
            width:1,
            render: text => <span style={{"display":"none"}}>{text}</span>,
        },{
            title: '专题名称',
                dataIndex: 'layout_special_name',
        },{
            title: '专题描述',
                dataIndex: 'layout_special_desc',
        },{
            title: '是否显示',
                dataIndex: 'is_show',
        },{
            title: '排序',
                dataIndex: 'sort_order',
        },{
            title: '操作',
                width:150,
                key: 'action',
                render: (text, record) => (
            <span>
            <a onClick={t.amend.bind(t,record["layout_special_id"])}>修改信息</a> 
            <span className="ant-divider" />
                <a onClick={t.JumpEdit.bind(t,record["layout_special_id"])}>修改模块</a>
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
            <Breadcrumb.Item>版式列表</Breadcrumb.Item>
            <Breadcrumb.Item>专题列表</Breadcrumb.Item>
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
ReactMixin.onClass(SpecialList, Reflux.connect(Store));
module.exports = SpecialList;
