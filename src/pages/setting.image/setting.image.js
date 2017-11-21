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
import { Breadcrumb,Icon,Button, Form, Input,message,Upload,Tabs,Radio,Modal } from 'antd';
import './setting.image.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

const cb =function(err){
    message.error(err);
}

class ImageTypeForm extends React.Component {
    state = {
    }; 

    render() {
        let t = this;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
        };

        const formItemLayout1 = {
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 5,offset:4 },
            },
        };

        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="图片存放类型">
                    {getFieldDecorator('image_dir_type', {
                        initialValue: t.props.initData,
                        rules: [{
                            required: true, message: 'Please confirm your 图片存放类型',
                        }],
                    })(
                    <RadioGroup>
                      <Radio value="1">按照文件名存放 (例:/店铺id/图片)</Radio>
                      <Radio value="2">按照年份存放 (例:/店铺id/年/图片)</Radio>
                      <Radio value="3">按照年月存放 (例:/店铺id/年/月/图片)</Radio>
                      <Radio value="4">按照年月日存放 (例:/店铺id/年/月/日/图片)</Radio>
                    </RadioGroup>
                )}
                </FormItem>
                <FormItem 
                    {...formItemLayout1}>
                    <Button key="submit" type="primary" size="large" onClick={t.props.addOk.bind(t)}>
                        <span style={{color:'#fff'}}>确认提交</span>
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const ImageTypesForm = Form.create()(ImageTypeForm);



class DefaultImageForm extends React.Component {
    state = {
        imgValue1:'',
        imgValue2:'',
        imgValue3:'',
        imgValue4:''
    }; 



    normFile1 = (e) => {
       if(e.file.response){
        this.setState({imgValue1:e.file.response.data.file});
       }
       
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile2 = (e) => {
        if(e.file.response){
        this.setState({imgValue2:e.file.response.data.file});
       }
       
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile3 = (e) => {
        if(e.file.response){
        this.setState({imgValue3:e.file.response.data.file});
       }
       
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile4 = (e) => {
        if(e.file.response){
        this.setState({imgValue4:e.file.response.data.file});
       }
       
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    changeInit(){
        let  t = this;
        t.props.addOk(t);
        t.setState({
            imgValue1:'',
            imgValue2:'',
            imgValue3:'',
            imgValue4:''
        }); 
    }

    render() {
        let t = this;
        let token = sessionStorage.getItem("admin_token");
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
        };

         const formItemLayout1 = {
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 5,offset:4 },
            },
        };
        
        return (
            <Form>
            <FormItem
                {...formItemLayout}
                label="默认商品图片"
                extra="300px*300px"
                >
                {getFieldDecorator('default_goods_image', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile1,
                    initialValue:t.props.formdata.default_goods_image,
                    rules: [{
                        required: true, message: 'Please confirm your 默认商品图片',
                    }],
                })(
                  <Upload
                    action={urlhttp+"/admin.shop_setting/uploadimage"}
                    data={{admin_token:token,file_name:"default_goods_image"}}
                    name="img"
                    showUploadList={false}
                    >
                    <div>
                       <Input addonAfter="选择上传" disabled value={t.state.imgValue1?t.state.imgValue1:(t.props.formdata.default_goods_image?t.props.formdata.default_goods_image[0].url:'')}/>
                    </div>
                </Upload>
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="默认店铺标志"
                extra="200px*60px"
                >
                {getFieldDecorator('default_store_logo', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile2,
                    initialValue:t.props.formdata.default_store_logo,
                    rules: [{
                        required: true, message: 'Please confirm your 默认店铺标志',
                    }],
                })(
                  <Upload
                    action={urlhttp+"/admin.shop_setting/uploadimage"}
                    data={{admin_token:token,file_name:"default_store_logo"}}
                    name="img"
                    showUploadList={false}
                    >
                  <div>
                       <Input addonAfter="选择上传" disabled value={t.state.imgValue2?t.state.imgValue2:(t.props.formdata.default_store_logo?t.props.formdata.default_store_logo[0].url:'')}/>
                    </div>
                </Upload>
            )}
            </FormItem>
             <FormItem
                {...formItemLayout}
                label="默认店铺头像"
                extra="100px*100px"
                >
                {getFieldDecorator('default_store_avatar', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile3,
                    initialValue:t.props.formdata.default_store_avatar,
                    rules: [{
                        required: true, message: 'Please confirm your 默认店铺头像',
                    }],
                })(
                  <Upload
                    action={urlhttp+"/admin.shop_setting/uploadimage"}
                    data={{admin_token:token,file_name:"default_store_avatar"}}
                    name="img"
                    showUploadList={false}
                    >
                  <div>
                       <Input addonAfter="选择上传" disabled value={t.state.imgValue3?t.state.imgValue3:(t.props.formdata.default_store_avatar?t.props.formdata.default_store_avatar[0].url:'')}/>
                    </div>
                </Upload>
            )}
            </FormItem>
             <FormItem
                {...formItemLayout}
                label="默认会员头像"
                >
                {getFieldDecorator('default_member_avatar', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile4,
                    initialValue:t.props.formdata.default_member_avatar,
                    rules: [{
                        required: true, message: 'Please confirm your 默认会员头像',
                    }],
                })(
                  <Upload
                    action={urlhttp+"/admin.shop_setting/uploadimage"}
                    data={{admin_token:token,file_name:"default_member_avatar"}}
                    name="img"
                    showUploadList={false}
                    >
                     <div>
                        <Input addonAfter="选择上传" disabled value={t.state.imgValue4?t.state.imgValue4:(t.props.formdata.default_member_avatar?t.props.formdata.default_member_avatar[0].url:'')}/>
                    </div>
                </Upload>
            )}
            </FormItem>
            <FormItem 
                {...formItemLayout1}>
                <Button key="submit" type="primary" size="large" onClick={t.changeInit.bind(t)}>
                    <span style={{color:'#fff'}}>确认</span>
                </Button>
            </FormItem>
        </Form>
    );
    }
}

const DefaultImagesForm = Form.create()(DefaultImageForm);


//组件类
class SettingImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount(){
        let t = this;
        let token = sessionStorage.getItem("admin_token");
        Actions.settingType(token,cb);
        Actions.settingImage(token,cb);
    }

    submitType(){
        let token = sessionStorage.getItem("admin_token");
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Actions.settingType(token,cb,values,Actions,Modal);
            }
        });
    }

    submitImage(t){
        let token = sessionStorage.getItem("admin_token");
        t.props.form.validateFields((err, values) => {
            if (!err) {
                Actions.settingImage(token,cb,values,Actions,Modal);
            }
        });
    }

    render() {
        let t = this;
    
        return (
            <div className="setting_image">
            <Breadcrumb className="bread_style">
            <Breadcrumb.Item><a href="">设置</a></Breadcrumb.Item>
            <Breadcrumb.Item>图片设置</Breadcrumb.Item>
            </Breadcrumb>
            <div className="main">
                <Tabs type="card" animated={false}>
                    <TabPane tab="上传参数" key="1">
                        <ImageTypesForm addOk={t.submitType} initData={t.state.typeStr}/>
                    </TabPane>
                    <TabPane tab="默认图片" key="2">
                        <DefaultImagesForm addOk={t.submitImage} formdata={t.state.imageObj}/>
                    </TabPane>
                </Tabs>
            </div>
    </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(SettingImage, Reflux.connect(Store));
module.exports = SettingImage;
