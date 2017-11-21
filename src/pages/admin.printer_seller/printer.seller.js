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
import { Table,Breadcrumb,Icon,Modal,Button, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox,Radio,message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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

import './printer.seller.less';

const cb =function(err){
    message.error(err);
}


//修改/添加公用表单
class PrinterSellerForm extends React.Component {
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
            <FormItem
                    {...formItemLayout}
                    >
                    {getFieldDecorator('printer_seller_id', {
                         initialValue: t.props.typePopPu == "edit"?t.props.formdata["printer_seller_id"]:"",
                    })(
                    <Input  style={{"display":"none"}}/>
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="销售商名称"
                    hasFeedback
                    >
                    {getFieldDecorator('printer_seller_name', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata['printer_seller_name']:""
                    })(
                    <Input disabled={t.props.typePopPu == "edit"?true:false} />
                )}
                </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="客服 上方标题"
                    hasFeedback
                    >
                    {getFieldDecorator('c_up_title', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata['init_setting']['customer_service']['up_title']:""
                    })(
                    <Input />
                     )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="客服 下左标题"
                    hasFeedback
                    >
                    {getFieldDecorator('c_downl_title', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata['init_setting']['customer_service']['downl_title']:""
                    })(
                    <Input />
                )}
                </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="客服 下右标题"
                    hasFeedback
                    >
                    {getFieldDecorator('c_downr_title', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata['init_setting']['customer_service']['downr_title']:"",
                        rules: [{ required: true }],
                    })(
                    <Input />
                )}
                </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="客服 上方QQ"
                    hasFeedback
                    >
                    {getFieldDecorator('c_up_qq', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata['init_setting']['customer_service']['up_qq']:""
                    })(
                    <Input />
                )}
                </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="客服 下左QQ"
                    hasFeedback
                    >
                    {getFieldDecorator('c_downl_qq', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata['init_setting']['customer_service']['downl_qq']:""
                    })(
                    <Input />
                )}
                </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="客服 下右QQ"
                    hasFeedback
                    >
                    {getFieldDecorator('c_downr_qq', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata['init_setting']['customer_service']['downr_qq']:""
                    })(
                    <Input />
                )}
                </FormItem>
                 <FormItem
                    {...formItemLayout}
                    label="页面1 标题"
                    hasFeedback
                    >
                    {getFieldDecorator('p_up_title', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata['init_setting']['page_url']['up_title']:""
                    })(
                    <Input />
                )}
                </FormItem>
                 <FormItem
                    {...formItemLayout}
                    label="页面2 标题"
                    hasFeedback
                    >
                    {getFieldDecorator('p_middle_title', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata['init_setting']['page_url']['middle_title']:""
                    })(
                    <Input />
                )}
                </FormItem>
                 <FormItem
                    {...formItemLayout}
                    label="页面3 标题"
                    hasFeedback
                    >
                    {getFieldDecorator('p_down_title', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata['init_setting']['page_url']['down_title']:""
                    })(
                    <Input />
                )}
                </FormItem>
                 <FormItem
                    {...formItemLayout}
                    label="页面1 链接"
                    hasFeedback
                    >
                    {getFieldDecorator('p_up_url', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata['init_setting']['page_url']['up_url']:""
                    })(
                    <Input />
                )}
                </FormItem>
                 <FormItem
                    {...formItemLayout}
                    label="页面2 链接"
                    hasFeedback
                    >
                    {getFieldDecorator('p_middle_url', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata['init_setting']['page_url']['middle_url']:""
                    })(
                    <Input />
                )}
                </FormItem>
                 <FormItem
                    {...formItemLayout}
                    label="页面3 链接"
                    hasFeedback
                    >
                    {getFieldDecorator('p_down_url', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata['init_setting']['page_url']['down_url']:""
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

const PrinterSellersForm = Form.create()(PrinterSellerForm);


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
        Actions.getPrinterSeller(obj,1,cb);
    }
   
   add (){
        Actions.addShow();
   }
   addOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        let current = sessionStorage.getItem("pspage");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.addPrinterSeller(obj,values,Actions,cb,current);
            }
        });
   }

   handleCancel(){
       Actions.cancal(); 
   }

   getHtml(){
        let t = this;
        return t.state.addVisible?<div>
        <Modal visible={true}
            closable ={false}
            footer={null}>
            <PrinterSellersForm ok={this.addOk} cancel={this.handleCancel}/>
        </Modal>
        </div>:"";
   }

   edit(id){
        let t = this;
        let token = sessionStorage.getItem("admin_token");
        Actions.editShow(token,id,cb);
   }

   editOk(){
        let t = this;
        let token = sessionStorage.getItem("admin_token");
        let current = sessionStorage.getItem("pspage");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.editPrinterSeller(token,values,Actions,cb,current);
            }
        });
   }

    getHtml1(){
        let t = this;
        return t.state.editVisible?<div>
        <Modal visible={true}
            closable ={false}
            footer={null}>
            <PrinterSellersForm ok={this.editOk} cancel={this.handleCancel} formdata={t.state.getOneList} typePopPu="edit"/>
        </Modal>
        </div>:"";
   }

   onChange(page){
        let token = sessionStorage.getItem("admin_token");
        sessionStorage.setItem("pspage",page);
        Actions.getPrinterSeller(token,page,cb);
   }

    render() {
        let t = this;
        const columns = [{
                title: '销售商ID',
                dataIndex: 'printer_seller_id',
            },{
                title: '销售商名称',
                dataIndex: 'printer_seller_name'
            },{
                title: '操作',
                    width:100,
                    key: 'action',
                    render: (text, record) => (
                    <span>
                        <a onClick={t.edit.bind(t,record["printer_seller_id"])}>修改</a>
                    </span>
        ),
        }];
        const rowSelection = {
                onChange: (selectedRowKeys, selectedRows) => {
                //console.log('selectedRowKeys: ${selectedRowKeys}', 'selectedRows: ', selectedRows);
                },
                onSelect: (record, selected, selectedRows) => {
                   // console.log(record, selected, selectedRows);
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                    //console.log(selected, selectedRows, changeRows);
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
                    <Breadcrumb.Item><a href="">打印机管理</a></Breadcrumb.Item>
                    <Breadcrumb.Item>打印机销售商管理</Breadcrumb.Item>
                </Breadcrumb>
                <div className="table-operations">
                    <Button type="dashed" onClick={t.add} icon="plus">添加</Button>
                </div>
                <Table className="table_width" pagination={coo} rowSelection={rowSelection}  columns={columns} dataSource={t.state.list}/>
                {t.getHtml()}
                {t.getHtml1()}
            </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(Table1, Reflux.connect(Store));
module.exports = Table1;
