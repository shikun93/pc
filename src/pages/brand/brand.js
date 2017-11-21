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
import { Table,Breadcrumb,Icon,Modal,Button, Form, Input, Tooltip,message,Select,Radio,Switch,Row, Col,Upload } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import './brand.less';

const cb =function(err){
    message.error(err);
}


//修改/添加公用表单
class BrandForm extends React.Component {
    state = {
        bol: false,
    };

    normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
    }

    showHtml = ()=>{
        this.setState({bol:true});
    }


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

        const formLayout = {
            labelCol: {
                xs: { span: 0 },
                sm: { span: 0 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
        };

        const formLayout1 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const formLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };

        let obj ={"admin_token":sessionStorage.getItem("admin_token")};
        return (
            <Form>
            <FormItem
        {...formItemLayout}
    >
        {getFieldDecorator('brand_id', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata["brand_id"]:"",
        })(
        <Input  style={{"display":"none"}}/>
        )}
    </FormItem>
        <FormItem
        {...formItemLayout}
        label="品牌名称"
        hasFeedback
        >
        {getFieldDecorator('brand_name', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata["brand_name"]:"",
            rules: [ {
                required: true, message: 'Please input your brand_name!',
            }],
        })(
        <Input />
    )}
    </FormItem>
        <FormItem
        {...formItemLayout}
        label="名称首字母"
        hasFeedback
        >
        {getFieldDecorator('brand_initial', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata['brand_initial']:"",
            rules: [ {
                required: true, message: 'Please input your brand_initial!',
            }],
        })(
        <Input />
        )}
        </FormItem>

        {t.props.typePopPu != "edit"?<Row>
            <Col span={12}>
                <FormItem
                    {...formLayout1}
                    label="商品分类名">
                        {getFieldDecorator('goods_class_name1', {
                        rules: [ {
                            required: true, message: 'Please input your brand_initial!',
                            }],
                        })(
                        <Select onChange={t.props.getCalList.bind(t,0)}>
                            {
                                t.props.listOne.map(function(item,index){
                                    return <Option value={item['goods_class_id']+','+item['goods_class_name']}>{item['goods_class_name']}</Option>;
                                })
                            }
                        </Select>
                    )}
            </FormItem>
            </Col>
           {
                t.props.listTwo.length?<Col span={6}>
                <FormItem
                    {...formLayout}>
                        {getFieldDecorator('goods_class_name2', {
                        rules: [ {
                            required: true, message: 'Please input your brand_initial!',
                            }],
                        })(
                        <Select onChange={t.props.getCalList.bind(t,1)}>
                            {
                                t.props.listTwo.map(function(item,index){
                                    return <Option value={item['goods_class_id']+','+item['goods_class_name']}>{item['goods_class_name']}</Option>;
                                })
                            }
                        </Select>
                    )}
            </FormItem>
            </Col>:""
           }
           {
                t.props.listThree.length?<Col span={6}>
                <FormItem
                    {...formLayout}>
                        {getFieldDecorator('goods_class_name3', {
                        rules: [ {
                            required: true, message: 'Please input your brand_initial!',
                            }],
                        })(
                        <Select>
                            {
                                t.props.listThree.map(function(item,index){
                                    return <Option value={item['goods_class_id']+','+item['goods_class_name']}>{item['goods_class_name']}</Option>;
                                })
                            }
                        </Select>
                    )}
            </FormItem>
            </Col>:""
           }
        </Row>:<Row>
            <Col span={9}>
                <FormItem
                    {...formLayout2}
                    label="商品分类名">
                        {getFieldDecorator('goods_class_name', {
                            initialValue: t.props.typePopPu == "edit"?t.props.formdata['goods_class_name']:"",
                        })(
                       <Input style={{ border: 'none',outline: 'none',width:'50px' }} disabled/>
                    )}
            </FormItem>
            </Col>
            {!t.state.bol?<Col span={3}>
                <FormItem>
                     <Button onClick={this.showHtml}>编辑</Button>  
                </FormItem>
            </Col>:""
            }
             {t.state.bol?<Col span={5}>
                <FormItem
                    {...formLayout}>
                        {getFieldDecorator('goods_class_name1', {
                        rules: [ {
                            required: true, message: 'Please input your brand_initial!',
                            }],
                        })(
                        <Select onChange={t.props.getCalList.bind(t,0)}>
                            {
                                t.props.listOne.map(function(item,index){
                                    return <Option value={item['goods_class_id']+','+item['goods_class_name']}>{item['goods_class_name']}</Option>;
                                })
                            }
                        </Select>
                    )}
            </FormItem>
            </Col>:""}
           {
                t.props.listTwo.length?<Col span={5}>
                <FormItem
                    {...formLayout}>
                        {getFieldDecorator('goods_class_name2', {
                        rules: [ {
                            required: true, message: 'Please input your brand_initial!',
                            }],
                        })(
                        <Select onChange={t.props.getCalList.bind(t,1)}>
                            {
                                t.props.listTwo.map(function(item,index){
                                    return <Option value={item['goods_class_id']+','+item['goods_class_name']}>{item['goods_class_name']}</Option>;
                                })
                            }
                        </Select>
                    )}
            </FormItem>
            </Col>:""
           }
           {
                t.props.listThree.length?<Col span={5}>
                <FormItem
                    {...formLayout}>
                        {getFieldDecorator('goods_class_name3', {
                        rules: [ {
                            required: true, message: 'Please input your brand_initial!',
                            }],
                        })(
                        <Select>
                            {
                                t.props.listThree.map(function(item,index){
                                    return <Option value={item['goods_class_id']+','+item['goods_class_name']}>{item['goods_class_name']}</Option>;
                                })
                            }
                        </Select>
                    )}
            </FormItem>
            </Col>:""
           }
        </Row>
        }
             <FormItem>
                 {getFieldDecorator('goods_class_id', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_class_id"]:"",
                        })(
                       <Input style={{ display:'none' }} />
                    )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="品牌图片"
            hasFeedback >
             {getFieldDecorator('brand_pic', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue:t.props.typePopPu == "edit"?t.props.formdata["brand_pic"]:""
            })(
            <Upload name="imgFile" action={urlhttp+"/admin.shop_brand/uploadimage"} listType="picture" data={obj}>
                <Button>
                <Icon type="upload" /> Click to upload
            </Button>
            </Upload>
             )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="展示方式"
            hasFeedback >
            {getFieldDecorator('show_type', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["show_type"]:"",
                rules: [{
                    required: true, message: 'Please confirm your show_type!',
                }],
            })(
             <RadioGroup>
              <Radio value="0">图片</Radio>
              <Radio value="1">文字</Radio>
            </RadioGroup>
        )}
        </FormItem>
         <FormItem
            {...formItemLayout}
            label="是否推荐"
            hasFeedback >
            {getFieldDecorator('brand_recommend', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["brand_recommend"]:"",
                rules: [{
                    required: true, message: 'Please confirm your brand_recommend!',
                }],
            })(
              <RadioGroup>
              <Radio value="0">否</Radio>
              <Radio value="1">是</Radio>
            </RadioGroup>
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
                确认
            </Button>
        </FormItem>
        </Form>
    );
    }
}

const BrandsForm = Form.create()(BrandForm);


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
        Actions.getBrandList(obj,1,cb);
        Actions.getCasListOne(obj);
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
                Actions.editorSuccess(obj,values,Actions, t.state.current,cb);
            }
        });

    }

    //确认添加
    addOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.addList(obj,values,Actions,cb);
            }
        });
    }

    //移除没用
    remove(id){
        // let t = this;
        // let obj = sessionStorage.getItem("admin_token");
        // Actions.deleteOne(obj,id,Actions,t.state.current);
    }

    //修改
    amend(id){
        let obj = sessionStorage.getItem("admin_token");
        Actions.editorList(obj,id,cb);
    }

    //分页
    onChange(page){
        let token = sessionStorage.getItem("admin_token");
        Actions.getBrandList(token,page,cb);
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
            >
            <BrandsForm     listOne={t.state['goods_class_list_one']}
                            listTwo={t.state['goods_class_list_two']}
                            listThree={t.state['goods_class_list_three']}
                            ok={this.addOk}
                            cancel={this.handleCancel}
                            checkedValues={t.checkedValue.bind(t)}
                            getCalList = {t.getCalList}
                            />
            </Modal>
            </div>:"";
    }

    onpopup(){
        let t = this;
        return t.state.visible?<div>
        <Modal visible={true} closable ={false} footer={null}>
            <BrandsForm     listOne={t.state['goods_class_list_one']}
                            listTwo={t.state['goods_class_list_two']}
                            listThree={t.state['goods_class_list_three']}
                            formdata = {t.state.editorAdminData}
                            ok={this.handleOk}
                            getCalList = {t.getCalList}
                            cancel={this.handleCancel} typePopPu="edit"/>
        </Modal>
        </div>:"";
    }

    render() {
        let t = this;
        const columns = [{
            title: '品牌ID',
            dataIndex: 'brand_id',
            width:150
        },{
            title: '品牌名称',
            dataIndex: 'brand_name'
        },{
            title: '首字母',
            dataIndex: 'brand_initial',
        },{
            title: '品牌图片',
            dataIndex: 'brand_pic',
            render: img => <img src={img}/>,
        },{
            title: '品牌排序',
            dataIndex: 'sort_order',
        },{
            title: '品牌推荐',
            dataIndex: 'brand_recommend',
        },{
            title: '展示形式',
            dataIndex: 'show_type',
        },{
            title: '操作',
            width:100,
            key: 'action',
            render: (text, record) => (
            <span>
            <a onClick={t.remove.bind(t,record["admin_group_id"])}>删除</a>
            <span className="ant-divider" />
                <a onClick={this.amend.bind(t,record["brand_id"])}>修改</a>
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
            <Breadcrumb.Item>品牌</Breadcrumb.Item>
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
