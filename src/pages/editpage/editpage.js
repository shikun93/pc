/**
 * Created by Administrator on 2017/4/7.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link} from 'react-router';
import Actions from './action';
import Store from './store';
import { Table,Breadcrumb,Icon,Modal,Button, Form, Input, Tooltip,Carousel,Upload,Radio,message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import {urlhttp,urlhttps} from '../../app/url';

import Carousels from '../../components/carousel/carousel';
import Flex from '../../components/flex/flex';
import Fmodul from '../../components/Fmodul/fmodul';
import TitleImage from '../../components/title.imagemodule/title.image';

import flexbg from '../../images/flexbg.png';
import hd1 from '../../images/hd1.jpg';
import hd2 from '../../images/hd2.jpg';
import hd3 from '../../images/hd3.jpg';

import './editpage.less';

let uuid=0;

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

const cb =function(err){
    message.error(err);
}


let removeModul,recviseModul,loseModul,upperModul,downModul;

const actionModuol = function(data){
        let token = sessionStorage.getItem("admin_token");
        removeModul = function(){
            Actions.removeModul(token,data["mobile_special_item_id"],Actions,cb);
        };
        loseModul = function(check){
            let n;
            if(check){
                n=1;
            }else{
                n=0;
            }
            Actions.loseModul(token,data["mobile_special_item_id"],n,Actions,cb);
        };
        upperModul = function(){
            Actions.orderModul(token,data["mobile_special_item_id"],"upper",Actions,cb);
        };
        downModul = function(){
            Actions.orderModul(token,data["mobile_special_item_id"],"down",Actions,cb);
        };
}

//修改/添加公用表单
class carForm extends React.Component {
    state = {
        confirmDirty: false,
    };

normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
}

render() {
        let t = this;
        let obj ={"admin_token":sessionStorage.getItem("admin_token")};
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('mobile_special_item_id', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["mobile_special_item_id"]:"",
                })(
                <Input  style={{"display":"none"}}/>
                )}
            </FormItem>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('item_type', {
                    initialValue: "a",
                })(
                <Input  style={{"display":"none"}}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="标题1"
                hasFeedback>
                {getFieldDecorator('title1', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["title1"]:""
                })(
                <Input />
                )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label={"链接1"}
            required={true}
            hasFeedback >
            {getFieldDecorator("href1", {
               initialValue: t.props.typePopPu == "edit"?t.props.formdata["href1"]:""
            })(
            <Input placeholder="href"/>
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="标题2"
                hasFeedback>
                {getFieldDecorator('title2', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["title2"]:""
                })(
                <Input />
                )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label={"链接2"}
            required={true}
            hasFeedback >
            {getFieldDecorator("href2", {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["href2"]:""
            })(
            <Input placeholder="href"/>
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="标题3"
                hasFeedback>
                {getFieldDecorator('title3', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["title3"]:""
                })(
                <Input />
                )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label={"链接3"}
            required={true}
            hasFeedback >
            {getFieldDecorator("href3", {
               initialValue: t.props.typePopPu == "edit"?t.props.formdata["href3"]:""
            })(
            <Input placeholder="href"/>
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="标题4"
                hasFeedback>
                {getFieldDecorator('title4', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["title4"]:""
                })(
                <Input />
                )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label={"链接4"}
            required={true}
            hasFeedback >
            {getFieldDecorator("href4", {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["href4"]:""
            })(
            <Input placeholder="href"/>
            )}
            </FormItem>
             <FormItem
                {...formItemLayout}
                label="标题5"
                hasFeedback>
                {getFieldDecorator('title5', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["title5"]:""
                })(
                <Input />
                )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label={"链接5"}
            required={true}
            hasFeedback >
            {getFieldDecorator("href5", {
               initialValue: t.props.typePopPu == "edit"?t.props.formdata["href5"]:""
            })(
            <Input placeholder="href"/>
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
            label="上传图片"
            >
            {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue:t.props.typePopPu == "edit"?t.props.formdata["imgObj"]:""
            })(
            <Upload name="imgFile" action={urlhttp+"/admin.mobile_special/uploadimage"} listType="picture" data={obj}>
                <Button>
                <Icon type="upload" /> Click to upload
            </Button>
            </Upload>
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

const CarsForm = Form.create()(carForm);

//flex
class flexForm extends React.Component {
    state = {
        confirmDirty: false,
    };

normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
}

render() {
        let t = this;
        let obj ={"admin_token":sessionStorage.getItem("admin_token")};
        let n =sessionStorage.getItem("num");
        const { getFieldDecorator } = this.props.form;
        let arrhtml = [];
         for(let i=1;i<=n;i++){
            arrhtml.push(<FormItem
                        {...formItemLayout}
                        label={"标题"+i}
                        hasFeedback>
                        {getFieldDecorator("title"+i, {
                            initialValue: t.props.typePopPu == "edit"?t.props.formdata["title"+i]:""
                        })(
                        <Input />
                        )}
                    </FormItem>);
                arrhtml.push(<FormItem
                    {...formItemLayout}
                    label={"链接"+i}
                    required={true}
                    hasFeedback >
                    {getFieldDecorator("href"+i, {
                       initialValue: t.props.typePopPu == "edit"?t.props.formdata["href"+i]:""
                    })(
                    <Input placeholder="href"/>
                    )}
                    </FormItem>);
                    
                arrhtml.push(<FormItem
                    {...formItemLayout}
                    label={"描述"+i}
                    required={true}
                    hasFeedback >
                    {getFieldDecorator("details"+i, {
                       initialValue: t.props.typePopPu == "edit"?t.props.formdata["details"+i]:""
                    })(
                    <Input placeholder="href"/>
                    )}
                    </FormItem>);
                }
        return (
            <Form>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('mobile_special_item_id', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["mobile_special_item_id"]:"",
                })(
                <Input  style={{"display":"none"}}/>
                )}
            </FormItem>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('item_type', {
                    initialValue: "b",
                })(
                <Input  style={{"display":"none"}}/>
                )}
            </FormItem>
            {arrhtml}
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
            label="上传图片"
            >
            {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue:t.props.typePopPu == "edit"?t.props.formdata["imgObj"]:""
            })(
            <Upload name="imgFile" action={urlhttp+"/admin.mobile_special/uploadimage"} listType="picture" data={obj}>
                <Button>
                <Icon type="upload" /> Click to upload
            </Button>
            </Upload>
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

const FlexsForm = Form.create()(flexForm);

//fmodul
class FmodulForm extends React.Component {
    state = {
        confirmDirty: false,
    };

normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
}

render() {
        let t = this;
        let obj ={"admin_token":sessionStorage.getItem("admin_token")};
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
             <FormItem {...formItemLayout}>
                {getFieldDecorator('mobile_special_item_id', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["mobile_special_item_id"]:"",
                })(
                <Input  style={{"display":"none"}}/>
                )}
            </FormItem>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('item_type', {
                    initialValue: "c",
                })(
                <Input  style={{"display":"none"}}/>
                )}
            </FormItem>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('fmodul_type', {
                    initialValue: t.props.formdata["fmodul_type"],
                })(
                <Input  style={{"display":"none"}}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={"链接1"}
                required={true}
                hasFeedback >
                {getFieldDecorator("href1", {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["href1"]:""
                })(
                <Input placeholder="href"/>
                )}
            </FormItem>
             <FormItem
                {...formItemLayout}
                label={"链接2"}
                required={true}
                hasFeedback >
                {getFieldDecorator("href2", {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["href2"]:""
                })(
                <Input placeholder="href"/>
                )}
            </FormItem>
             <FormItem
                {...formItemLayout}
                label={"链接3"}
                required={true}
                hasFeedback >
                {getFieldDecorator("href3", {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["href3"]:""
                })(
                <Input placeholder="href"/>
                )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="上传图片"
            >
            {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue:t.props.typePopPu == "edit"?t.props.formdata["imgObj"]:""
            })(
            <Upload name="imgFile" action={urlhttp+"/admin.mobile_special/uploadimage"} listType="picture" data={obj}>
                <Button>
                <Icon type="upload" /> Click to upload
            </Button>
            </Upload>
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

const FmodulsForm = Form.create()(FmodulForm);

//title.img
class TitleImgForm extends React.Component {
    state = {
        confirmDirty: false,
    };

normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
}

render() {
        let t = this;
        let obj ={"admin_token":sessionStorage.getItem("admin_token")};
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('mobile_special_item_id', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["mobile_special_item_id"]:"",
                })(
                <Input  style={{"display":"none"}}/>
                )}
            </FormItem>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('titleImg_type', {
                    initialValue: t.props.formdata["fmodul_type"],
                })(
                <Input  style={{"display":"none"}}/>
                )}
            </FormItem>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('item_type', {
                    initialValue: "d",
                })(
                <Input  style={{"display":"none"}}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="标题"
                hasFeedback>
                {getFieldDecorator('title', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["title"]:""
                })(
                <Input />
                )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="链接"
            required={true}
            hasFeedback >
            {getFieldDecorator("href", {
               initialValue: t.props.typePopPu == "edit"?t.props.formdata["href"]:""
            })(
            <Input placeholder="href"/>
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label={"描述"}
            required={true}
            hasFeedback >
            {getFieldDecorator("details", {
               initialValue: t.props.typePopPu == "edit"?t.props.formdata["details"]:""
            })(
            <Input placeholder="href"/>
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
            label="上传图片"
            >
            {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue:t.props.typePopPu == "edit"?t.props.formdata["imgObj"]:""
            })(
            <Upload name="imgFile" action={urlhttp+"/admin.mobile_special/uploadimage"} listType="picture" data={obj}>
                <Button>
                <Icon type="upload" /> Click to upload
            </Button>
            </Upload>
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

const TitleImgsForm = Form.create()(TitleImgForm);

//组件类
class EditPage extends React.Component {
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
        let id = t.props.location.query.id;
        sessionStorage.setItem("page_id",id); 
        Actions.getAllItem(obj,id,t.aType,t.bType,t.cType,t.dType,cb);
    }

    componentDidUpdate(){
        let t = this;
        if(t.state.updateGetData){  
            let obj = sessionStorage.getItem("admin_token");
            let id = t.props.location.query.id;
            sessionStorage.setItem("page_id",id);
            Actions.getAllItem(obj,id,t.aType,t.bType,t.cType,t.dType,cb);
            Actions.updatebol();
        }
    }

   carouselShow(){
        Actions.show();
    }

    flexShow(n){
        sessionStorage.setItem("num",n);
        Actions.flexShow();
    }

    fmodulShow(n){
        sessionStorage.setItem("fmodulType",n);
        Actions.fmodulShow();
    }

    titleImageShow(n){
        sessionStorage.setItem("titleImgType",n);
        Actions.titleImgShow();
    }

    addOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        let id = sessionStorage.getItem("page_id",id);
        this.props.form.validateFields(function(err,values){
            if(err==null){
                switch(values["item_type"]){
                    case "a":
                        Actions.setCarousel(obj,values,sessionStorage.getItem("page_id"),Actions,cb);
                        break;
                    case "b":
                        Actions.addFlex(obj,values,sessionStorage.getItem("page_id"),Actions,cb);
                        break;
                    case "c":
                        Actions.addFmodul(obj,values,sessionStorage.getItem("page_id"),Actions,cb);
                        break;
                    case "d":
                        Actions.addTitleImg(obj,values,sessionStorage.getItem("page_id"),Actions,cb);
                        break;   
                }   
            }
        });
    }
    handleCancel(){
        Actions.cancal();
    }

    showHtml(){
        let t = this;
        return t.state.addVisible?<div>
        <Modal visible={true}
            closable ={false}
            footer={null}>
            <CarsForm ok={this.addOk} cancel={this.handleCancel}/>
        </Modal>
        </div>:"";
    }
    showHtml1(){
        let t = this;
        return t.state.flexVisible?<div>
        <Modal visible={true}
            closable ={false}
            footer={null}>
            <FlexsForm ok={this.addOk} cancel={this.handleCancel}/>
        </Modal>
        </div>:"";
    }
    showHtml2(){
         let t = this;
         let fmodulType = {"fmodul_type":sessionStorage.getItem("fmodulType")};
        return t.state.fmodulShowVisible?<div>
        <Modal visible={true}
            closable ={false}
            footer={null}>
            <FmodulsForm ok={this.addOk} cancel={this.handleCancel} formdata={fmodulType}/>
        </Modal>
        </div>:"";
    }
    showHtml3(){
        let t = this;
        let titleImgType = {"fmodul_type":sessionStorage.getItem("titleImgType")};
        return t.state.titleImgVisible?<div>
        <Modal visible={true}
            closable ={false}
            footer={null}>
            <TitleImgsForm ok={this.addOk} cancel={this.handleCancel} formdata={titleImgType}/>
        </Modal>
        </div>:"";
    }

    recviseOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                switch(values["item_type"]){
                    case "a":
                        Actions.editCarousel(obj,values,Actions,cb);
                        break;
                    case "b":
                        Actions.editFlex(obj,values,Actions,cb);
                        break;
                    case "c":
                        Actions.editFmodul(obj,values,Actions,cb);
                        break;
                    case "d":
                        Actions.editTitleImg(obj,values,Actions,cb);
                        break;   
                }   
            }
        });
    }

    //修改
    recviseHtml(){
        let t = this;
        return t.state.recviseVisible?<div>
        <Modal visible={true}
            closable ={false}
            footer={null}>
            <CarsForm ok={this.recviseOk} cancel={this.handleCancel} formdata={t.state.getCarouseData} typePopPu="edit"/>
        </Modal>
        </div>:"";
    }
    recviseHtml1(){
        let t = this;
        return t.state.recviseVisible1?<div>
        <Modal visible={true}
            closable ={false}
            footer={null}>
            <FlexsForm ok={this.recviseOk} cancel={this.handleCancel} formdata={t.state.getFlexData} typePopPu="edit"/>
        </Modal>
        </div>:"";
    }
    recviseHtml2(){
        let t = this;
        return t.state.recviseVisible2?<div>
        <Modal visible={true}
            closable ={false}
            footer={null}>
            <FmodulsForm ok={this.recviseOk} cancel={this.handleCancel} formdata={t.state.getFmodulData} typePopPu="edit"/>
        </Modal>
        </div>:"";
    }
    recviseHtml3(){
        let t = this;
        return t.state.recviseVisible3?<div>
        <Modal visible={true}
            closable ={false}
            footer={null}>
            <TitleImgsForm ok={this.recviseOk} cancel={this.handleCancel} formdata={t.state.getTitleImgData} typePopPu="edit"/>
        </Modal>
        </div>:"";
    }
    aType(data,arrHtml){
        let t = this;
        actionModuol(data);
         let recviseModul = function(e){
            console.log(e.target.getAttribute("data-key"));
            Actions.recviseCarouse(sessionStorage.getItem("admin_token"),e.target.getAttribute("data-key"),cb);
        }
        arrHtml.push(<Carousels data={data} recvise={recviseModul} remove={removeModul} lose={loseModul} upper={upperModul} down={downModul}/>);
    }

    bType(data,arrHtml){
        let t = this;
        actionModuol(data);
        let recviseModul = function(e){
            Actions.recviseFlex(sessionStorage.getItem("admin_token"),e.target.getAttribute("data-key"),cb);
        }
        arrHtml.push(<Flex arrData={data} recvise={recviseModul} remove={removeModul} lose={loseModul} upper={upperModul} down={downModul}/>);
    }

    cType(data,n,arrHtml){
        let t = this;
        actionModuol(data);
         let recviseModul = function(e){
            Actions.recviseFmodul(sessionStorage.getItem("admin_token"),e.target.getAttribute("data-key"),cb);
        }
        arrHtml.push(<Fmodul fData={data} n={n} recvise={recviseModul} remove={removeModul} lose={loseModul} upper={upperModul} down={downModul}/>);
    }

    dType(data,n,arrHtml){
        let t = this;
        actionModuol(data);
        let recviseModul = function(e){
            Actions.recviseTitleImg(sessionStorage.getItem("admin_token"),e.target.getAttribute("data-key"),cb);
        }
        arrHtml.push(<TitleImage data={data} n={n} recvise={recviseModul} remove={removeModul} lose={loseModul} upper={upperModul} down={downModul}/>);
    }

    render() {
        let t = this;
        const sample = {arr:[
            {
                "imageUrl":hd1,
                "title":"第一个商品",
                "details":"商品说明"
            },{
                "imageUrl":hd3,
                "title":"第二个商品",
                "details":"商品说明"
            }
        ]}

        const sample1 ={arr: [
            {
                "imageUrl":flexbg,
                "title":"第一个商品",
                "details":"商品说明"
            }
        ]};
        const sample2 ={arr: [
            {
                "imageUrl":flexbg,
                "title":"第一个商品",
                "details":"商品说明"
            },
            {
                "imageUrl":flexbg,
                "title":"第二个商品",
                "details":"商品说明"
            }
        ]};
        const sample3 ={arr: [
            {
                "imageUrl":flexbg,
                "title":"第一个商品",
                "details":"商品说明"
            },
            {
                "imageUrl":flexbg,
                "title":"第二个商品",
                "details":"商品说明"
            },
            {
                "imageUrl":flexbg,
                "title":"第三个商品",
                "details":"商品说明"
            }
        ]};

        const sample4 ={arr: [
            {
                "imageUrl":flexbg,
                "title":"第一个商品",
                "details":"商品说明"
            },
            {
                "imageUrl":flexbg,
                "title":"第二个商品",
                "details":"商品说明"
            },
            {
                "imageUrl":flexbg,
                "title":"第三个商品",
                "details":"商品说明"
            },
            {
                "imageUrl":flexbg,
                "title":"第四个商品",
                "details":"商品说明"
            }
        ]};

        const fdata ={arr: [
            {
                "imageUrl":flexbg
            },
            {
                "imageUrl":hd2
            },
            {
                "imageUrl":hd2
            }
        ]};

        const fdata1 ={arr: [
            {
                "imageUrl":hd2
            },
            {
                "imageUrl":hd2
            },
            {
                "imageUrl":flexbg
            }
        ]};


        const imageData ={imageData:{
                "imageUrl":flexbg,
                "title":"这是第一个产品",
                "details":"这是大大大大的大大大大大大大大大大大大大大大大大大大大大"
            }};

        return (
            <div className="editpage">
                <div  className="show">
                    <div  className="first">
                        {t.state.arrHtml}
                    </div>
                </div>
                <div className="sample">
                        <Carousels data ={sample} show={t.carouselShow}  panduan={1}/>
                        <Flex arrData={sample2} show={t.flexShow.bind(t,2)}   panduan={1}/>
                        <Flex arrData={sample3} show={t.flexShow.bind(t,3)}  panduan={1}/>
                        <Flex arrData={sample4} show={t.flexShow.bind(t,4)}  panduan={1}/>
                        <Flex arrData={sample1} show={t.flexShow.bind(t,1)}  panduan={1}/>
                        <Fmodul n={1} fData={fdata} show={t.fmodulShow.bind(t,1)}   panduan={1}/>
                        <Fmodul n={2} fData={fdata1} show={t.fmodulShow.bind(t,2)}   panduan={1}/>
                        <TitleImage n={1} data={imageData} show={t.titleImageShow.bind(t,1)}  panduan={1}/>
                        <TitleImage n={2} data={imageData} show={t.titleImageShow.bind(t,2)}  panduan={1}/>
                </div>
            {t.showHtml()}
            {t.showHtml1()}
            {t.showHtml2()}
            {t.showHtml3()}
            {t.recviseHtml()}
            {t.recviseHtml1()}
            {t.recviseHtml2()}
            {t.recviseHtml3()}
            </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(EditPage, Reflux.connect(Store));
module.exports = EditPage;
