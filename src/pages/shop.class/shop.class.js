import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import {urlhttp,urlhttps} from '../../app/url';
import { Breadcrumb,message,Button,Table,Form,Input,Checkbox,Modal} from 'antd';
const FormItem = Form.Item;
import './shop.class.less';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const cb =function(err){
    message.error(err);
}


//修改/添加公用表单
class ShopClassForm extends React.Component {
    state = {
        
    };


    render() {

        let t = this;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
            visible={true}
            okText="确定"
            wrapClassName="shop_form"
            onCancel={this.props.cancel}
            closable ={false}
            onOk={this.props.ok.bind(this)}
            >
            <Form>
            <FormItem
                {...formItemLayout}
            >
            {getFieldDecorator('store_class_id', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["store_class_id"]:"",
            })(
                <Input  style={{"display":"none"}}/>
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="分类名称"
                hasFeedback
            >
            {getFieldDecorator('store_class_name', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["store_class_name"]:"",
                rules: [ {
                    required: true, message: 'Please input your store_class_name!',
                }],
            })(
                <Input />
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="保证金额"
            hasFeedback >
            {getFieldDecorator('store_class_bail', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["store_class_bail"]:"",
                rules: [ {
                    required: true, message: 'Please input your store_class_bail!',
                }],
            })(
                <Input type="number" />
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="排序"
                hasFeedback
                extra="数字范围为0~255，数字越小越靠前"
            >
            {getFieldDecorator('sort_order', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["sort_order"]:"",
            })(
                <Input type="number"/>
            )}
            </FormItem>
        </Form>
        </Modal>
    );
    }
}

const ShopClasssForm = Form.create()(ShopClassForm);


//组件类
class ShopClass extends React.Component {
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
        Actions.getList(token,1,cb);
    }  

    add(){
        Actions.show();
    }

    remove(){

    } 

    amend(id){
        let token = sessionStorage.getItem("admin_token");
        Actions.getEditorList(token,id,cb);
    }

    onChange(page){
        console.log(page);
        Actions.getList(token,page,cb);
    }

    handleCancel(){
        Actions.cancel();
    }

    handleOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.addShopGrade(obj,values,Actions,cb);
            }
        });
    }

    editorOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.editorOk(obj,values,Actions,cb);
            }
        });
    }

    shopForm1(){
        let t = this;
        return t.state.visible?<ShopClasssForm cancel={t.handleCancel} ok={t.handleOk}/>:"";
    }

    shopForm2(){
        let t = this;
        return t.state.editorVisible?<ShopClasssForm cancel={t.handleCancel} ok={t.editorOk} typePopPu="edit" formdata={t.state.editorList}/>:"";
    }
    
    render() {
        let t = this;
        const columns = [{
                dataIndex: 'store_class_id',
                render: text => <span style={{"display":"none"}}>{text}</span>,
            },{
                title: '排序',
                dataIndex: 'sort_order',
            },{
                title: '分类名称',
                dataIndex: 'store_class_name'
            },{
                title: '保证金额(元)',
                dataIndex: 'store_class_bail',
            },{
                title: '操作',
                    width:100,
                    key: 'action',
                    render: (text, record) => (
                    <span>
                        <a onClick={t.remove.bind(t,record["store_class_id"])}>删除</a>
                        <span className="ant-divider" />
                        <a onClick={this.amend.bind(t,record["store_class_id"])}>修改</a>
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
            <div className="shop_grade">
                <Breadcrumb className="bread_style">
                    <Breadcrumb.Item><a href="">店铺</a></Breadcrumb.Item>
                    <Breadcrumb.Item>店铺分类</Breadcrumb.Item>
                </Breadcrumb>
                <div className="table-operations">
                    <Button type="dashed" onClick={t.add} icon="plus">添加</Button>
                </div>
                <Table className="table_width" pagination={coo} rowSelection={rowSelection}  columns={columns} dataSource={t.state.list}/>
                {t.shopForm1()}
                {t.shopForm2()}
        </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(ShopClass, Reflux.connect(Store));
module.exports = ShopClass;
