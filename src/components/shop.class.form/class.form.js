import React from 'react';
import { Icon,Button, Form, Input,Select,Switch,Row, Col,Checkbox,Radio } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
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

let ops = [{label:'允许',value:'1'}];
//修改/添加公用表单
class ShopTypeForm extends React.Component {
    state = {
        bol: false,
    };

    render() {
        let t = this;
        const { getFieldDecorator } = this.props.form;
        let arr = [],arr1 = [];
        for(let key in t.props.typeList){
            let a = t.props.typeList[key];
            if(Array.isArray(a['goods_type'])){
                a['goods_type'].map(function(item,index){
                    arr.push(<Radio value={item['goods_type_id']+' '+item['goods_type_name']}>{item['goods_type_name']}</Radio>);
                }) 
            }else{
                 for(let k in a['goods_type']){
                     arr.push(<Radio value={a['goods_type'][k]['goods_type_id']+' '+a['goods_type'][k]['goods_type_name']}>{a['goods_type'][k]['goods_type_name']}</Radio>);
                 }
            }
         }
         for(let keys in t.props.classList){
             let item = t.props.classList[keys];
            arr1.push(<Option value={item['goods_class_id']}>{item['goods_class_name']}</Option>);
        }
        return (
            <Form>
            <FormItem
        {...formItemLayout}
    >
        {getFieldDecorator('goods_class_id', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_class_id"]:"",
        })(
        <Input  style={{"display":"none"}}/>
        )}
    </FormItem>
        <FormItem
        {...formItemLayout}
        label="分类名称"
        hasFeedback
        >
        {getFieldDecorator('goods_class_name', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata["goods_class_name"]:"",
            rules: [ {
                required: true, message: 'Please input your goods_class_name!',
            }],
        })(
        <Input />
    )}
    </FormItem>
        <FormItem
        {...formItemLayout}
        label="发布虚拟商品"
        hasFeedback
        >
        {getFieldDecorator('can_virtual', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata['can_virtual']:"",
        })(
            <CheckboxGroup options={ops}/>
        )}
        </FormItem>
         <FormItem
            {...formItemLayout}
            label="商品展示方式"
            hasFeedback
            >
            {getFieldDecorator('show_type', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata['show_type']:"",
            })(
                <Select>
                    <Option value='1'>1</Option>
                    <Option value='0'>0</Option>
                </Select>
            )}
        </FormItem>
         <FormItem
            {...formItemLayout}
            label="分佣比列"
            hasFeedback
            >
            {getFieldDecorator('commis_rate', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata['commis_rate']:"",
                rules: [ {
                    required: true, message: 'Please input your commis_rate!',
                }],
            })(
               <Input style={{width:'50px'}}/>
            )}
            <span>%</span>
        </FormItem>
         <FormItem
            {...formItemLayout}
            label="上级分类"
            hasFeedback
            >
            {getFieldDecorator('goods_class_parent_id', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata['goods_class_parent_id']:"",
            })(
                <Select>
                    {arr1}
                </Select>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="类型"
            >
            {getFieldDecorator('goods_type_name', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata['goods_type_name']:"",
            })(
                <RadioGroup>
                    <Radio vlaue='0'>无类型</Radio>
                    {arr}
                </RadioGroup>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="税率"
            hasFeedback
            >
            {getFieldDecorator('lp_tax', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["lp_tax"]:"",
            })(
            <Input />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="是否显示"
            hasFeedback
            >
            {getFieldDecorator('is_show', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["is_show"]:"",
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
            })(
             <Input / >
        )}
        </FormItem>
        <FormItem>
            <Button key="back" size="large" onClick={this.props.cancel}>取消</Button>,
            <Button key="submit" type="primary" size="large"  onClick={this.props.ok.bind(this,this.props.id)}>
                确认
            </Button>
        </FormItem>
        </Form>
    );
    }
}

const ShopTypesForm = Form.create()(ShopTypeForm);
module.exports = ShopTypesForm;