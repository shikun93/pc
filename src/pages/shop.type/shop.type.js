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
import { Table,Breadcrumb,Icon,Modal,Button, Form, Input,message,Select,Switch,Row, Col,Checkbox } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
import './shop.type.less';

const cb =function(err){
    message.error(err);
}

let addi = 0,sxi = 0;
let ops = [{label:'显示',value:'1'}];
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

//修改/添加公用表单
class ShopTypeForm extends React.Component {
    state = {
        bol: false,
        arr:[],
        sxarr:[],
        removezdId:[],
        removesxId:[]
    };

    componentDidMount(){
        let t = this;
        let arr = [],sxarr=[];
        if(t.props.zNum!=undefined){
            for(let i=1;i<t.props.sNum;i++){
                    let c =i-1;
                    sxarr.push(t.props.formdata["goods_attr_id"+c]); 
            }
            for(let j=1;j<t.props.zNum;j++){
                    let c =j-1;
                    arr.push(t.props.formdata["goods_type_custom_id"+c]);
            }
            t.setState({
                arr:arr,
                sxarr:sxarr
            });
        }
    }

    showHtml = ()=>{
        this.setState({bol:true});
    }

    removezd = (i)=>{
        let t = this;
        let arr = [],arr1=[];
        arr = t.state.arr;
        arr1 = t.state.removezdId;
        if(!isNaN(parseInt(arr[i]))){
            arr1.push(arr[i]);
        }
        arr[i] = 'a';
        t.setState({
            arr:arr,
            removezdId:arr1
        });
    }

    addzd = ()=>{
        let t = this;
        let arr = [];
        arr = t.state.arr;
        arr.push('b');
        t.setState({arr:arr});
    }

    removesx = (i)=>{
        let t = this;
        let arr = [],arr1=[];
        arr = t.state.sxarr;
        arr1 = t.state.removesxId;
         if(!isNaN(parseInt(arr[i]))){
            arr1.push(arr[i]);
        }
        arr[i] = 'a';
        t.setState({
            sxarr:arr,
            removesxId:arr1
        });
    }

    addsx = ()=>{
        let t = this;
        let arr = [];
        arr = t.state.sxarr;
        arr.push('b');
        t.setState({sxarr:arr});
    }


    render() {
        let t = this;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
            <FormItem
        {...formItemLayout}
    >
        {getFieldDecorator('goods_type_id', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_type_id"]:"",
        })(
        <Input  style={{"display":"none"}}/>
        )}
    </FormItem>
     <FormItem>
        {getFieldDecorator('goods_class_id', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_class_id"]:"",
            })(
            <Input style={{ display:'none' }} />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="类型"
        hasFeedback
        >
        {getFieldDecorator('goods_type_name', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_type_name"]:"",
            rules: [ {
                required: true, message: 'Please input your brand_name!',
            }],
        })(
        <Input />
    )}
    </FormItem>

        {t.props.typePopPu != "edit"?<Row>
            <Col span={12}>
                <FormItem
                    {...formLayout1}
                    label="快捷定位">
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
                    label="快捷定位">
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
        <FormItem
            {...formItemLayout}
            label="选择关联规格">
              {getFieldDecorator('goods_spec_id', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_spec_id"]:"",
            })(
            <CheckboxGroup options={t.props.specList}/>
        )}     
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="选择关联品牌">
              {getFieldDecorator('brand_id', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["brand_id"]:"",
            })(
            <CheckboxGroup options={t.props.brandList}/>
        )}     
        </FormItem>
        <Row>
            <Col span={0}>
                <FormItem>
                  {getFieldDecorator('goods_attr_id', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_attr_id"]:"",
                })(
                    <Input style={{ display:'none' }} />
                )}     
                </FormItem>
            </Col>
            <Col span={9}>
                <FormItem
                {...formLayout2}
                label="添加属性">
                  {getFieldDecorator('asort_order', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["sort_order"]:"",
                })(
                    <Input />
                )}     
                </FormItem>
            </Col>
            <Col span={6}>
                <FormItem
                {...formLayout}>
                  {getFieldDecorator('goods_attr_name', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_attr_name"]:"",
                })(
                    <Input placeholder="输入属性名称"/>
                )}     
                </FormItem>
            </Col>
            <Col span={6}>
                <FormItem
                {...formLayout}>
                  {getFieldDecorator('goods_attr_value', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_attr_value"]:"",
                })(
                    <Input placeholder="输入属性可选值"/>
                )}     
                </FormItem>
            </Col>
            <Col span={3}>
                <FormItem
                {...formLayout}>
                  {getFieldDecorator('ais_show', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["ais_show"]:"",
                })(
                    <CheckboxGroup options={ops}/>
                )}     
                </FormItem>
            </Col>
        </Row>
        {
            t.state.sxarr.map(function(item,index){
                if(item !='a'){
                return  (<Row>
            <Col span={6}></Col>
            <Col span={0}>
                <FormItem>
                  {getFieldDecorator('goods_attr_id'+index, {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_attr_id"+index]:"",
                })(
                    <Input style={{ display:'none' }} />
                )}     
                </FormItem>
            </Col>
            <Col span={2}>
                <FormItem
                {...formLayout}>
                  {getFieldDecorator('asort_order'+index, {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["asort_order"+index]:"",
                })(
                    <Input />
                )}     
                </FormItem>
            </Col>
            <Col span={5}>
                <FormItem
                {...formLayout}>
                  {getFieldDecorator('goods_attr_name'+index, {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata['goods_attr_name'+index]:"",
                })(
                    <Input placeholder="输入属性名称"/>
                )}     
                </FormItem>
            </Col>
            <Col span={5}>
                <FormItem
                {...formLayout}>
                  {getFieldDecorator('goods_attr_value'+index, {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata['goods_attr_value'+index]:"",
                })(
                    <Input placeholder="输入属性可选值"/>
                )}     
                </FormItem>
            </Col>
            <Col span={3}>
                <FormItem
                {...formLayout}>
                  {getFieldDecorator('ais_show'+index, {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata['ais_show'+index]:"",
                })(
                    <CheckboxGroup options={ops}/>
                )}     
                </FormItem>
            </Col>
            <Col span={3}>
                <Button  onClick={t.removesx.bind(t,index)}>
                    移除
                </Button>
            </Col>
        </Row>)}
            }) 
        }
        <Row>
            <Col span={9}></Col>
            <Col span={9}>
               <Button style={{'margin-bottom':'10px'}} type="dashed" onClick={t.addsx} icon="plus">添加属性</Button>
            </Col>
        </Row>
        <FormItem>
                  {getFieldDecorator('goods_type_custom_id', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_type_custom_id"]:"",
                })(
                    <Input style={{ display:'none' }} />
                )}     
        </FormItem>
        <FormItem
                {...formItemLayout}
                label="自定义属性">
                  {getFieldDecorator('goods_type_custom', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_type_custom"]:"",
                })(
                    <Input />
                )}     
        </FormItem>
        {
            t.state.arr.map(function(item,index){
                if(item !='a'){
                    return (<Row>
                        <Col span={6}></Col>
                        <Col span={0}>
                            <FormItem>
                              {getFieldDecorator('goods_type_custom_id'+index, {
                                initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_type_custom_id"+index]:"",
                            })(
                                <Input style={{ display:'none' }} />
                            )}     
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                            {...formLayout}>
                              {getFieldDecorator('goods_type_custom'+index, {
                               initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_type_custom"+index]:"",
                            })(
                                <Input />
                            )}     
                            </FormItem>
                        </Col>
                        <Col>
                            <Button  onClick={t.removezd.bind(t,index)}>
                                移除
                            </Button>
                        </Col>
                    </Row>)
                }
            })
        }
        <Row>
            <Col span={9}></Col>
            <Col span={9}>
               <Button style={{'margin-bottom':'10px'}} type="dashed" onClick={t.addzd} icon="plus">添加自定义属性</Button>
            </Col>
        </Row>
        <FormItem>
            <Button key="back" size="large" onClick={this.props.cancel}>取消</Button>,
            <Button key="submit" type="primary" size="large"  onClick={this.props.ok.bind(this,t.props.current)}>
                确认
            </Button>
        </FormItem>
        </Form>
    );
    }
}

const ShopTypesForm = Form.create()(ShopTypeForm);


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
        Actions.getList(obj,1,cb);
        Actions.getCasListOne(obj);
        Actions.getBrandList(obj);
        Actions.getSpecList(obj);
    }
    //取消
    handleCancel(){
        Actions.cancel();
    }

    //确认修改
    handleOk(current){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.editorSuccess(obj,values,Actions, current,cb,t.state.removezdId,t.state.removesxId);
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
            <ShopTypesForm  listOne={t.state['goods_class_list_one']}
                            listTwo={t.state['goods_class_list_two']}
                            listThree={t.state['goods_class_list_three']}
                            ok={this.addOk}
                            cancel={this.handleCancel}
                            getCalList = {t.getCalList}
                            brandList = {t.state.brandList}
                            specList = {t.state.specList}
                            />
            </Modal>
            </div>:"";
    }

    onpopup(){
        let t = this;
        return t.state.visible?<div>
        <Modal visible={true} closable ={false} footer={null}>
            <ShopTypesForm  listOne={t.state['goods_class_list_one']}
                            listTwo={t.state['goods_class_list_two']}
                            listThree={t.state['goods_class_list_three']}
                            formdata = {t.state.editorAdminData}
                            getCalList = {t.getCalList}
                            brandList = {t.state.brandList}
                            specList = {t.state.specList}
                            zNum = {t.state.zNum}
                            sNum = {t.state.sNum}
                            ok={this.handleOk}
                            current = {t.state.current}
                            cancel={this.handleCancel} typePopPu="edit"/>
        </Modal>
        </div>:"";
    }

    render() {
        let t = this;
        const columns = [{
            title: '类型ID',
            dataIndex: 'goods_type_id',
        },{
            title: '类型名称',
            dataIndex: 'goods_type_name',
        },{
            title: '类型排序',
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
            <a onClick={t.remove.bind(t,record["goods_type_id"])}>删除</a>
            <span className="ant-divider" />
                <a onClick={this.amend.bind(t,record["goods_type_id"])}>修改</a>
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
            <Breadcrumb.Item>商品类型</Breadcrumb.Item>
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
