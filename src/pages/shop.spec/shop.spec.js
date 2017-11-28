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
import { Table,Breadcrumb,Icon,Modal,Button, Form, Input,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import './shop.spec.less';


//修改/添加公用表单
class ShopSpecForm extends React.Component {
    state = {
        
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
            style={{margin:0}}
    >
        {getFieldDecorator('goods_spec_id', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_spec_id"]:"",
        })(
        <Input  style={{"display":"none"}}/>
        )}
    </FormItem>
        <FormItem
        {...formItemLayout}
        label="规格"
        hasFeedback
        >
        {getFieldDecorator('goods_spec_name', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_spec_name"]:"",
            rules: [ {
                required: true, message: 'Please input your brand_name!',
            }],
        })(
        <Input />
    )}
    </FormItem>
        <FormItem
        {...formItemLayout}
        label="快捷定位"
        hasFeedback
        >
        {getFieldDecorator('goods_class_name', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata['goods_class_name']:"",
            rules: [ {
                required: true, message: 'Please input your brand_initial!',
            }],
        })(
        <Select>
               {
                    t.props.selectList.map(function(item,index){
                        return <Option key={index} value={item['goods_class_name']}>{item['goods_class_name']}</Option>;
                    })
                }
        </Select>
        )}
        </FormItem>
         <FormItem
            {...formItemLayout}
            label="排序"
            hasFeedback >
            {getFieldDecorator('sort_order', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["sort_order"]:"",
                rules: [{
                    required: true, message: 'Please confirm your sort_order!',
                }],
            })(
             <Input / >
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

const ShopSpecsForm = Form.create()(ShopSpecForm);


//组件类
class Brand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentWillMount(){
      
    }
    componentDidMount(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        Actions.getList(obj,1,0);
        Actions.getSelectList(obj);
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
                Actions.editorSuccess(obj,values,Actions, t.state.current);
            }
        });

    }

    //确认添加
    addOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.addList(obj,values,Actions);
            }
        });
    }

    //移除没用
    remove(id){
        console.log(id);
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        Actions.remove(obj,id,Actions,t.state.current);
    }

    //修改
    amend(id){
        let obj = sessionStorage.getItem("admin_token");
        Actions.editorList(obj,id);
    }

    //分页
    onChange(page){
        let token = sessionStorage.getItem("admin_token");
        Actions.getBrandList(token,page);
    }

    //添加
    add(){
        Actions.addBut();
    }

    checkedValue(){
        console.log(1);
    }

    getCalList(n,value){
       let token = sessionStorage.getItem("admin_token");
       Actions.getCascaderList(token,value,n); 
    }

    addHtml(){
        let t = this;
        return t.state.addVisible?<div>
        <Modal visible={true}
        closable ={false}
        footer={null}
        title = "添加商品规格"
            >
            <ShopSpecsForm     selectList = {t.state.selectList}
                            ok={this.addOk}
                            cancel={this.handleCancel}/>
            </Modal>
            </div>:"";
    }

    onpopup(){
        let t = this;
        return t.state.visible?<div>
        <Modal 
        visible={true} 
        closable ={false} 
        footer={null}
        title = "修改商品规格">
            <ShopSpecsForm  selectList = {t.state.selectList}
                            formdata = {t.state.editorAdminData}
                            ok={this.handleOk}
                            cancel={this.handleCancel} typePopPu="edit"/>
        </Modal>
        </div>:"";
    }

    render() {
        let t = this;
        const columns = [{
            title: '规格ID',
            dataIndex: 'goods_spec_id',
        },{
            title: '规格名称',
            dataIndex: 'goods_spec_name',
        },{
            title: '规格排序',
            dataIndex: 'sort_order',
        },{
            title: '快捷定位ID',
            dataIndex: 'goods_class_id',
        },{
            title: '快捷定位名称',
            dataIndex: 'goods_class_name',
        },{
            title: '操作',
            width:100,
            key: 'action',
            render: (text, record) => (
            <span>
            <a onClick={t.remove.bind(t,record["goods_spec_id"])}>删除</a>
            <span className="ant-divider" />
                <a onClick={this.amend.bind(t,record["goods_spec_id"])}>修改</a>
            </span>
        ),
        }];
        const rowSelection = {
                onChange: (selectedRowKeys, selectedRows) => {
               // console.log('selectedRowKeys: ${selectedRowKeys}', 'selectedRows: ', selectedRows);
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

        let  coo ={
            total: t.state.total,
            current: t.state.current,
            pageSize:10,
            onChange: t.onChange
        }
        return (
            <div className="table1">
            <Breadcrumb className="bread_style">
            <Breadcrumb.Item><a href="">商品</a></Breadcrumb.Item>
            <Breadcrumb.Item>商品规格</Breadcrumb.Item>
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
ReactMixin.onClass(Brand, Reflux.connect(Store));
module.exports = Brand;
