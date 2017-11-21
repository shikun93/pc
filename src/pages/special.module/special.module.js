/**
 * Created by Administrator on 2017/4/7.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link} from 'react-router';
import Actions from './action';
import Store from './store';
import { Table,Breadcrumb,Icon,Modal,Button, Form, Input, Tooltip,Carousel,Upload,Radio,message,Row,Col } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import {urlhttp,urlhttps} from '../../app/url';

import Carousels from '../../components/carousel/carousel';
import Flex from '../../components/flex/flex';
import Fmodul from '../../components/Fmodul/fmodul';
import TitleImage from '../../components/title.imagemodule/title.image';
import ModuleEditor from '../../components/editor/editor';
import Custom from '../../components/custom/custom';

import flexbg from '../../images/flexbg.png';
import flexbg1 from '../../images/flexbg1.png';
import flexbg2 from '../../images/flexbg2.png';
import flexbg3 from '../../images/flexbg3.png';
import flexbg4 from '../../images/flexbg4.png';
import hd1 from '../../images/hd1.jpg';
import hd2 from '../../images/hd2.jpg';
import hd3 from '../../images/hd3.jpg';


import './special.module.less';

const uploadButton = (
    <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
    </div>
);



const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
    },
};

const formItemLayout1 = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
};

const cb =function(err){
    message.error(err);
}


let removeModul,recviseModul,loseModul,upperModul,downModul;

const actionModuol = function(data){
        let token = sessionStorage.getItem("admin_token");
        removeModul = function(){
            Actions.removeModul(token,data["layout_special_item_id"],Actions,cb);
        };
        loseModul = function(check){
            let n;
            if(check){
                n=1;
            }else{
                n=0;
            }
            Actions.loseModul(token,data["layout_special_item_id"],n,Actions,cb);
        };
        upperModul = function(){
            Actions.orderModul(token,data["layout_special_item_id"],"upper",Actions,cb);
        };
        downModul = function(){
            Actions.orderModul(token,data["layout_special_item_id"],"down",Actions,cb);
        };
}

//修改/添加公用表单
class carForm extends React.Component {
    state = {
        confirmDirty: false,
        n:0,
        n1:0,
        n2:0,
        n3:0,
        n4:0,
    };

    componentDidMount() {
        let t = this;
        
        if(t.props.formdata){
            let obj = {};
            if(t.props.formdata["imgFile1"]){
                obj.n = 1;
            }
            if(t.props.formdata["imgFile2"]){
                obj.n1 = 1;
            }
            if(t.props.formdata["imgFile3"]){
                obj.n2 = 1;
            }
            if(t.props.formdata["imgFile4"]){
                obj.n3 = 1;
            }
            if(t.props.formdata["imgFile5"]){
                obj.n4 = 1;
            }
            t.setState(obj);
        }
    }

handlePreview(){
    return;
}

  normFile = (e) => {
        if(e.fileList.length===1){
            this.setState({n:1});
        }else{
            this.setState({n:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile1 = (e) => {
        if(e.fileList.length===1){
            this.setState({n1:1});
        }else{
            this.setState({n1:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile2 = (e) => {
        if(e.fileList.length===1){
            this.setState({n2:1});
        }else{
            this.setState({n2:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile3 = (e) => {
        if(e.fileList.length===1){
            this.setState({n3:1});
        }else{
            this.setState({n3:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile4 = (e) => {
        if(e.fileList.length===1){
            this.setState({n4:1});
        }else{
            this.setState({n4:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

render() {
        let t = this;
        let obj =sessionStorage.getItem("admin_token");
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
             <Modal
            visible={true}
            okText="确定"
            onCancel={onCancel}
            closable ={false}
            onOk={onCreate.bind(t)}
            wrapClassName="show_model"
            width="1200px"
            >
            <Form>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('layout_special_item_id', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["layout_special_item_id"]:"",
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
            <Row>
            <Col span={4}>
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
            label="图1"
            >
            {getFieldDecorator('imgFile1', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue:t.props.typePopPu == "edit"?t.props.formdata["imgFile1"]:"",
            })(
             <Upload
              action={urlhttp+"/admin.module/uploadimage"}
              listType="picture-card"
              data={{admin_token:obj,file_name:"imgFile"}}
              name="imgFile"
              onPreview={this.handlePreview}
            >
                {t.state.n==1?null:uploadButton}
            </Upload>
        )}
        </FormItem>
            </Col>
            <Col span={4} offset={1}>
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
            label="图2"
            >
            {getFieldDecorator('imgFile2', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile1,
                initialValue:t.props.typePopPu == "edit"?t.props.formdata["imgFile2"]:"",
            })(
             <Upload
              action={urlhttp+"/admin.module/uploadimage"}
              listType="picture-card"
              data={{admin_token:obj,file_name:"imgFile"}}
              name="imgFile"
              onPreview={this.handlePreview}
            >
                {t.state.n1==1?null:uploadButton}
            </Upload>
        )}
        </FormItem>
            </Col>
            <Col span={4} offset={1}>
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
            label="图3"
            >
            {getFieldDecorator('imgFile3', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile2,
                initialValue:t.props.typePopPu == "edit"?t.props.formdata["imgFile3"]:"",
            })(
             <Upload
              action={urlhttp+"/admin.module/uploadimage"}
              listType="picture-card"
              data={{admin_token:obj,file_name:"imgFile"}}
              name="imgFile"
              onPreview={this.handlePreview}
            >
                {t.state.n2==1?null:uploadButton}
            </Upload>
        )}
        </FormItem>
            </Col>
            <Col span={4} offset={1}>
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
            label="图4"
            >
            {getFieldDecorator('imgFile4', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile3,
                initialValue:t.props.typePopPu == "edit"?t.props.formdata["imgFile4"]:"",
            })(
             <Upload
              action={urlhttp+"/admin.module/uploadimage"}
              listType="picture-card"
              data={{admin_token:obj,file_name:"imgFile"}}
              name="imgFile"
              onPreview={this.handlePreview}
            >
                {t.state.n3==1?null:uploadButton}
            </Upload>
        )}
        </FormItem>
            </Col>
            <Col span={4} offset={1}>
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
            label="图5"
            >
            {getFieldDecorator('imgFile5', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile4,
                initialValue:t.props.typePopPu == "edit"?t.props.formdata["imgFile5"]:"",
            })(
             <Upload
              action={urlhttp+"/admin.module/uploadimage"}
              listType="picture-card"
              data={{admin_token:obj,file_name:"imgFile"}}
              name="imgFile"
              onPreview={this.handlePreview}
            >
                {t.state.n4==1?null:uploadButton}
            </Upload>
        )}
        </FormItem>
            </Col>
             </Row>
            <FormItem
                {...formItemLayout1}
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
            
            
        </Form>
       </Modal>
    );
    }
}

const CarsForm = Form.create()(carForm);

//flex
class flexForm extends React.Component {
    state = {
        confirmDirty: false,
        n1:0,
        n2:0,
        n3:0,
        n4:0
    };

     componentDidMount() {
        let t = this;
        
        if(t.props.formdata){
            let obj = {};
            if(t.props.formdata["imgFile1"]){
                obj.n1 = 1;
            }
            if(t.props.formdata["imgFile2"]){
                obj.n2 = 1;
            }
            if(t.props.formdata["imgFile3"]){
                obj.n3 = 1;
            }
            if(t.props.formdata["imgFile4"]){
                obj.n4 = 1;
            }
            t.setState(obj);
        }
    }

    handlePreview(){
        return;
    }

  normFile1 = (e) => {
        if(e.fileList.length===1){
            this.setState({n1:1});
        }else{
            this.setState({n1:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile2 = (e) => {
        if(e.fileList.length===1){
            this.setState({n2:1});
        }else{
            this.setState({n2:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile3 = (e) => {
        if(e.fileList.length===1){
            this.setState({n3:1});
        }else{
            this.setState({n3:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile4 = (e) => {
        if(e.fileList.length===1){
            this.setState({n4:1});
        }else{
            this.setState({n4:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

render() {
        let t = this;
        let obj =sessionStorage.getItem("admin_token");
        let n =sessionStorage.getItem("num");
        const { getFieldDecorator } = this.props.form;
        let arrhtml = [];
         for(let i=1;i<=n;i++){
            arrhtml.push(
                <Col span={24/n}>
                <FormItem
                        {...formItemLayout}
                        label={"标题"+i}
                        hasFeedback>
                        {getFieldDecorator("title"+i, {
                            initialValue: t.props.typePopPu == "edit"?t.props.formdata["title"+i]:""
                        })(
                        <Input />
                        )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label={"链接"+i}
                    required={true}
                    hasFeedback >
                    {getFieldDecorator("href"+i, {
                       initialValue: t.props.typePopPu == "edit"?t.props.formdata["href"+i]:""
                    })(
                    <Input placeholder="href"/>
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label={"描述"+i}
                    required={true}
                    hasFeedback >
                    {getFieldDecorator("details"+i, {
                       initialValue: t.props.typePopPu == "edit"?t.props.formdata["details"+i]:""
                    })(
                    <Input placeholder="href"/>
                    )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={"图"+i}
                        >
                        {getFieldDecorator('imgFile'+i, {
                            valuePropName: 'fileList',
                            getValueFromEvent: this["normFile"+i],
                            initialValue:t.props.typePopPu == "edit"?t.props.formdata["imgFile"+i]:"",
                        })(
                         <Upload
                          action={urlhttp+"/admin.module/uploadimage"}
                          listType="picture-card"
                          data={{admin_token:obj,file_name:"imgFile"}}
                          name="imgFile"
                          onPreview={this.handlePreview}
                        >
                            {t.state["n"+i]==1?null:uploadButton}
                        </Upload>
                    )}
                    </FormItem>
                    </Col>
                    );
                }
        return (
             <Modal
            visible={true}
            okText="确定"
            onCancel={this.props.cancel}
            closable ={false}
            wrapClassName="show_model"
            onOk={this.props.ok.bind(this)}
            width={n!=1?250*n+'px':"500px"}
            >
            <Form>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('layout_special_item_id', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["layout_special_item_id"]:"",
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
            <Row>
            
            {arrhtml}
            </Row>
            {n==1?<FormItem
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
            </FormItem>:<FormItem
                {...formItemLayout1}
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
            </FormItem>}
        </Form>
        </Modal>
    );
    }
}

const FlexsForm = Form.create()(flexForm);

//fmodul
class FmodulForm extends React.Component {
    state = {
        confirmDirty: false,
        n1:0,
        n2:0,
        n3:0
    };

    componentDidMount() {
        let t = this;
        
        if(t.props.formdata){
            let obj = {};
            if(t.props.formdata["imgFile1"]){
                obj.n1 = 1;
            }
            if(t.props.formdata["imgFile2"]){
                obj.n2 = 1;
            }
            if(t.props.formdata["imgFile3"]){
                obj.n3 = 1;
            }
            t.setState(obj);
        }
    }

    handlePreview(){
        return;
    }


normFile1 = (e) => {
        if(e.fileList.length===1){
            this.setState({n1:1});
        }else{
            this.setState({n1:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile2 = (e) => {
        if(e.fileList.length===1){
            this.setState({n2:1});
        }else{
            this.setState({n2:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    normFile3 = (e) => {
        if(e.fileList.length===1){
            this.setState({n3:1});
        }else{
            this.setState({n3:0});
        }
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

render() {
        let t = this;
        let obj =sessionStorage.getItem("admin_token");
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
            visible={true}
            okText="确定"
            onCancel={this.props.cancel}
            closable ={false}
            wrapClassName="show_model"
            onOk={this.props.ok.bind(this)}
            width='750px'
            >
            <Form>
                 <FormItem {...formItemLayout}>
                    {getFieldDecorator('layout_special_item_id', {
                        initialValue: t.props.typePopPu == "edit"?t.props.formdata["layout_special_item_id"]:"",
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
            <Row>
            <Col span={8}>
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
                            label="图1"
                            >
                            {getFieldDecorator('imgFile1', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile1,
                                initialValue:t.props.typePopPu == "edit"?t.props.formdata["imgFile1"]:"",
                            })(
                             <Upload
                              action={urlhttp+"/admin.module/uploadimage"}
                              listType="picture-card"
                              data={{admin_token:obj,file_name:"imgFile"}}
                              name="imgFile"
                              onPreview={this.handlePreview}
                            >
                                {t.state.n1==1?null:uploadButton}
                            </Upload>
                        )}
                </FormItem>
            </Col>
            <Col span={8}>
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
                            label="图2"
                            >
                            {getFieldDecorator('imgFile2', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile2,
                                initialValue:t.props.typePopPu == "edit"?t.props.formdata["imgFile2"]:"",
                            })(
                             <Upload
                              action={urlhttp+"/admin.module/uploadimage"}
                              listType="picture-card"
                              data={{admin_token:obj,file_name:"imgFile"}}
                              name="imgFile"
                              onPreview={this.handlePreview}
                            >
                                {t.state.n2==1?null:uploadButton}
                            </Upload>
                        )}
                </FormItem>
             </Col>
            <Col span={8}>
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
                            label="图3"
                            >
                            {getFieldDecorator('imgFile3', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile3,
                                initialValue:t.props.typePopPu == "edit"?t.props.formdata["imgFile3"]:"",
                            })(
                             <Upload
                              action={urlhttp+"/admin.module/uploadimage"}
                              listType="picture-card"
                              data={{admin_token:obj,file_name:"imgFile"}}
                              name="imgFile"
                              onPreview={this.handlePreview}
                            >
                                {t.state.n3==1?null:uploadButton}
                            </Upload>
                        )}
                </FormItem>
             </Col>
             </Row>
        <FormItem
                {...formItemLayout1}
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
        </Form>
        </Modal>
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
            <Modal
            visible={true}
            okText="确定"
            onCancel={this.props.cancel}
            wrapClassName="show_model"
            closable ={false}
            onOk={this.props.ok.bind(this)}
            >
            <Form>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('layout_special_item_id', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["layout_special_item_id"]:"",
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
            <Upload name="imgFile" action={urlhttp+"/admin.module/uploadimage"} listType="picture" data={obj}>
                <Button>
                <Icon type="upload" /> Click to upload
            </Button>
            </Upload>
        )}
        </FormItem>
        </Form>
        </Modal>
    );
    }
}

const TitleImgsForm = Form.create()(TitleImgForm);

//custom
class CustomForm extends React.Component {

    render() {
        let t = this;
        let obj ={"admin_token":sessionStorage.getItem("admin_token")};
        let items = ['source', '|', 'undo', 'redo', 'copy', 'paste',
         '|', 'justifyleft', 'justifycenter', 'justifyright',
        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
        'superscript', '|', 'selectall', 
        'fontname', 'fontsize', '|', 'forecolor', 'bold',
        'italic', 'underline', 'removeformat','table','|', 'image', 'hr', 'link', 'unlink'];
        const formItemLayout2= {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
            },
        };
        const formItemLayout3= {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
            visible={true}
            okText="确定"
            width="1100"
            onCancel={this.props.cancel}
            wrapClassName="show_model"
            closable ={false}
            onOk={this.props.ok.bind(this)}
            >
            <Form>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('layout_special_item_id', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["layout_special_item_id"]:""
                })(
                <Input  style={{"display":"none"}}/>
                )}
            </FormItem>
            <FormItem {...formItemLayout}>
                {getFieldDecorator('item_type', {
                    initialValue: "e",
                })(
                <Input  style={{"display":"none"}}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout3}
                label="类别"
                hasFeedback>
                {getFieldDecorator('classify', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["item_data"]["classify"]:""
                })(
                <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout3}
                label="标题"
                hasFeedback>
                {getFieldDecorator('title', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["item_data"]["title"]:""
                })(
                <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout2}
                label="内容">
                <ModuleEditor url={urlhttp+"/admin.module/uploadimage"} editorsValue={t.props.editorHtml} data={{name:"",value:""}} items={items} width="1000px" height="500px" editorHtml={t.props.getCustomHtml}/>
                
            </FormItem>
            <FormItem
                {...formItemLayout2}
                label="是否显示">
                {getFieldDecorator('is_show', {
                    initialValue: t.props.typePopPu == "edit"?t.props.formdata["is_show"]:""
                })(
                    <RadioGroup>
                        <Radio value="0">不显示</Radio>
                        <Radio value="1">显示</Radio>
                    </RadioGroup>
                )}
            </FormItem>
        </Form>
        </Modal>
    );
    }
}

const CustomsForm = Form.create()(CustomForm);

//组件类
class SpecialModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bol:false,
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
        sessionStorage.setItem("specialId",id); 
        Actions.getAllItem(obj,id,t.aType,t.bType,t.cType,t.dType,t.eType,cb);
        
    }

    componentDidUpdate(){
        let t = this;
        if(t.state.updateGetData){  
            let obj = sessionStorage.getItem("admin_token");
            let id = t.props.location.query.id;
            sessionStorage.setItem("specialId",id);
            Actions.getAllItem(obj,id,t.aType,t.bType,t.cType,t.dType,t.eType,cb);
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

    addOk(editorHtml){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        let id = sessionStorage.getItem("specialId");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                switch(values["item_type"]){
                    case "a":
                        Actions.setCarousel(obj,values,id,Actions,cb);
                        break;
                    case "b":
                        Actions.addFlex(obj,values,id,Actions,cb);
                        break;
                    case "c":
                        Actions.addFmodul(obj,values,id,Actions,cb);
                        break;
                    case "d":
                        Actions.addTitleImg(obj,values,id,Actions,cb);
                        break; 
                    case "e":
                        Actions.addHtml(obj,values,id,Actions,cb); 
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
        return t.state.addVisible?
         <CarsForm onCreate={this.addOk} onCancel={this.handleCancel}/>
       :"";
    }
    showHtml1(){
        let t = this;
        return t.state.flexVisible?
            <FlexsForm ok={this.addOk} cancel={this.handleCancel}/>:"";
    }
    showHtml2(){
         let t = this;
         let fmodulType = {"fmodul_type":sessionStorage.getItem("fmodulType")};
        return t.state.fmodulShowVisible?
            <FmodulsForm ok={this.addOk} cancel={this.handleCancel} formdata={fmodulType}/>
        :"";
    }
    showHtml3(){
        let t = this;
        let titleImgType = {"fmodul_type":sessionStorage.getItem("titleImgType")};
        return t.state.titleImgVisible?
            <TitleImgsForm ok={this.addOk} cancel={this.handleCancel} formdata={titleImgType}/>
        :"";
    }

    showCustom(){
        let t = this;
        return t.state.customVisible?<CustomsForm cancel={t.handleCancel} ok={t.addOk} getCustomHtml={t.getCustomHtml}/>:''
    }

    customShow(){
        Actions.customShow();
    }

    getCustomHtml(html){
        Actions.saveHtml(html);
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
                    case "e":
                        Actions.editorHtml(obj,values,Actions,cb);
                        break;  
                }   
            }
        });
    }

    //修改
    recviseHtml(){
        let t = this;
        return t.state.recviseVisible?
        <CarsForm onCreate={this.recviseOk} onCancel={this.handleCancel} formdata={t.state.getCarouseData} typePopPu="edit"/>
        :"";
    }
    recviseHtml1(){
        let t = this;
        return t.state.recviseVisible1?
            <FlexsForm ok={this.recviseOk} cancel={this.handleCancel} formdata={t.state.getFlexData} typePopPu="edit"/>
        :"";
    }
    recviseHtml2(){
        let t = this;
        return t.state.recviseVisible2?
            <FmodulsForm ok={this.recviseOk} cancel={this.handleCancel} formdata={t.state.getFmodulData} typePopPu="edit"/>
        :"";
    }
    recviseHtml3(){
        let t = this;
        return t.state.recviseVisible3?
            <TitleImgsForm ok={this.recviseOk} cancel={this.handleCancel} formdata={t.state.getTitleImgData} typePopPu="edit"/>
        :"";
    }
    recviseHtml4(){
        let t = this;
        return t.state.recviseVisible4?<CustomsForm cancel={t.handleCancel} ok={t.recviseOk} getCustomHtml={t.getCustomHtml} formdata={t.state.customData} editorHtml={t.state.editorHtml} typePopPu="edit"/>:'';
    }
    aType(data,arrHtml){
        let t = this;
        actionModuol(data);
         let recviseModul = function(e){
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

    eType(data,arrHtml){
        let t = this;
        actionModuol(data);
        let recviseModul = function(e){
            Actions.recviseCustom(sessionStorage.getItem("admin_token"),e.target.getAttribute("data-key"),cb);
        }
        arrHtml.push(<Custom data={data} recvise={recviseModul} remove={removeModul} lose={loseModul} upper={upperModul} down={downModul}/>);
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
                "imageUrl":flexbg4,
                "title":"第一个商品",
                "details":"商品说明"
            }
        ]};
        const sample2 ={arr: [
            {
                "imageUrl":flexbg1,
                "title":"第一个商品",
                "details":"商品说明"
            },
            {
                "imageUrl":flexbg1,
                "title":"第二个商品",
                "details":"商品说明"
            }
        ]};
        const sample3 ={arr: [
            {
                "imageUrl":flexbg2,
                "title":"第一个商品",
                "details":"商品说明"
            },
            {
                "imageUrl":flexbg2,
                "title":"第二个商品",
                "details":"商品说明"
            },
            {
                "imageUrl":flexbg2,
                "title":"第三个商品",
                "details":"商品说明"
            }
        ]};

        const sample4 ={arr: [
            {
                "imageUrl":flexbg3,
                "title":"第一个商品",
                "details":"商品说明"
            },
            {
                "imageUrl":flexbg3,
                "title":"第二个商品",
                "details":"商品说明"
            },
            {
                "imageUrl":flexbg3,
                "title":"第三个商品",
                "details":"商品说明"
            },
            {
                "imageUrl":flexbg3,
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
            <div className="special_module">
               
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
                        <div className="custom" onClick={t.customShow}>
                            <Icon type="plus" />
                        </div>
                </div>
                 <div  className="show">
                    <div  className="first">
                        {t.state.arrHtml}
                    </div>
                </div>
            {t.showHtml()}
            {t.showHtml1()}
            {t.showHtml2()}
            {t.showHtml3()}
            {t.recviseHtml()}
            {t.recviseHtml1()}
            {t.recviseHtml2()}
            {t.recviseHtml3()}
            {t.recviseHtml4()}
            {t.showCustom()} 
            </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(SpecialModule, Reflux.connect(Store));
module.exports = SpecialModule;
