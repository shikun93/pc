import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import {urlhttp,urlhttps} from '../../app/url';
import { Breadcrumb,message,Button,Table,Form,Input,Checkbox,Modal} from 'antd';
const FormItem = Form.Item;
import './own.store.less';

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
class OwnStoreForm extends React.Component {
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
            {getFieldDecorator('store_grade_id', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["store_grade_id"]:"",
            })(
                <Input  style={{"display":"none"}}/>
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="等级名称"
                hasFeedback
            >
            {getFieldDecorator('store_grade_name', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["store_grade_name"]:"",
                rules: [ {
                    required: true, message: 'Please input your store_grade_name!',
                }],
            })(
                <Input />
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="可发布商品数"
                hasFeedback
                extra="0表示没有限制"
            >
            {getFieldDecorator('store_grade_goods_limit', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata.store_grade_goods_limit:"0",
            })(
                <Input type="number"/>
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="可上传图片数"
            extra="0表示没有限制"
            hasFeedback >
            {getFieldDecorator('store_grade_album_limit', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["store_grade_album_limit"]:"0",
            })(
                <Input type="number" />
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="可选模板套数"
            hasFeedback >
                <p>0 (在店铺等级列表设置)</p>
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="可用附加功能"
            >
                {getFieldDecorator('store_grade_function', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["store_grade_function"]:false,
                })(
                    <Checkbox>编辑器多媒体功能</Checkbox>
                )} 
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="收费标准"
                hasFeedback
                extra="收费标准，单：元/年，必须为数字，在会员开通或升级店铺时将显示在前台"
            >
            {getFieldDecorator('store_grade_price', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["store_grade_price"]:"",
                 rules: [ {
                    required: true, message: 'Please input your store_grade_price!',
                }],
            })(
                <Input type="number"/>
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="申请说明"
                hasFeedback
                extra="申请说明，在会员开通或升级店铺时将显示在前台"
            >
            {getFieldDecorator('store_grade_description', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["store_grade_description"]:"",
            })(
                <Input type="textarea" rows={4}/>
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="级别"
                hasFeedback
                extra="数值越大表明级别越高"
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

const OwnStoresForm = Form.create()(OwnStoreForm);


//组件类
class OwnStore extends React.Component {
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
        return t.state.visible?<OwnStoresForm cancel={t.handleCancel} ok={t.handleOk}/>:"";
    }

    shopForm2(){
        let t = this;
        return t.state.editorVisible?<OwnStoresForm cancel={t.handleCancel} ok={t.editorOk} typePopPu="edit" formdata={t.state.editorList}/>:"";
    }
    
    render() {
        let t = this;
        const columns = [{
                title: '店铺ID',
                dataIndex: 'store_id',
            },{
                title: '店铺名称',
                dataIndex: 'store_name'
            },{
                title: '店主账号',
                dataIndex: 'member_name',
            },{
                 title: '商家账号',
                 dataIndex: 'seller_name',
            },{
                title: '当前状态',
                dataIndex: 'store_state',
            },{
                title: '绑定所有类目',
                dataIndex: 'bind_all_gc',
            },{
                title: '操作',
                    width:100,
                    key: 'action',
                    render: (text, record) => (
                    <span>
                        <a onClick={this.amend.bind(t,record["store_id"])}>修改</a>
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
                    <Breadcrumb.Item>自营店铺</Breadcrumb.Item>
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
ReactMixin.onClass(OwnStore, Reflux.connect(Store));
module.exports = OwnStore;
