/**
 * Created by Administrator on 2017/4/7.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import { Table,Breadcrumb,Icon,Button, Form, Input,message,DatePicker,Row,Col } from 'antd';
const FormItem = Form.Item;
const RangePicker  = DatePicker.RangePicker;

const cb =function(err){
    message.error(err);
}

import './admin.log.less';




//修改/添加公用表单
class AdminLogForm extends React.Component {
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
            <Row>
             <Col span={8}>
            <FormItem
                {...formItemLayout}
                label="管理员名称"
                >
                {getFieldDecorator('admin_name', {
                  
                })(
                <Input />
                )}
            </FormItem>
            </Col>
            <Col span={8}>
            <FormItem
                {...formItemLayout}
                label="操作内容"
                >
                {getFieldDecorator('keywords', {
                  
                })(
                <Input  />
                )}
            </FormItem>
            </Col>
            <Col span={8}>
            <FormItem
                {...formItemLayout}
                label="IP地址"
                >
                {getFieldDecorator('ip', {
                  
                })(
                <Input />
                )}
            </FormItem>
            </Col>
            </Row>
            <Row>
            <Col span={8}>
             <FormItem
                {...formItemLayout}
                label="时间段查询"
                >
                {getFieldDecorator('time', {
                  
                })(
                 <RangePicker />
                )}
            </FormItem>
            </Col>
            <Col span={8}>
        <FormItem>
            <Button key="submit" type="primary" size="large"  onClick={this.props.ok.bind(this)}>
                <span style={{"color":"#fff"}}>查询</span>
            </Button>
        </FormItem>
        </Col>
         <Col span={8}></Col>
        </Row>
        </Form>
    );
    }
}

const AdminLogsForm = Form.create()(AdminLogForm);


//组件类
class AdminLog extends React.Component {
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
        Actions.getAdminLog(obj,{},1,cb);
    }

    //分页
    onChange(page){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        Actions.getAdminLog(obj,t.state.values,page,cb);
    }

    inquiry(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                 if(values.time!=undefined){
                    values.start_time = values.time[0].format('YYYY-MM-DD')+" 00:00:00";
                     values.end_time = values.time[1].format('YYYY-MM-DD')+" 23:59:59"; 
                 }
                Actions.getAdminLog(obj,values,1,cb);
            }
        });
    }

    render() {
        let t = this;
        const columns = [{
            title: '管理员名称',
                dataIndex: 'admin_name',
        },{
            title: '内容',
                dataIndex: 'record'
        },{
            title: 'IP地址',
                dataIndex: 'ip',
        },{
            title: '添加时间',
                dataIndex: 'add_time',
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
            onChange: t.onChange.bind(t)
        }
        return (
            <div className="admin_log">
            <Breadcrumb className="bread_style">
            <Breadcrumb.Item><a href="">后台管理</a></Breadcrumb.Item>
            <Breadcrumb.Item>管理员管理</Breadcrumb.Item>
            </Breadcrumb>
            <div className="inquiry_form">
                <AdminLogsForm  ok={this.inquiry} />
            </div> 
            <div>
                <Table className="table_width" pagination={coo} rowSelection={rowSelection}  columns={columns} dataSource={t.state.list}/>
            </div>          
    </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(AdminLog, Reflux.connect(Store));
module.exports = AdminLog;
