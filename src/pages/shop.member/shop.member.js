import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import {urlhttp,urlhttps} from '../../app/url';
import { Breadcrumb,Button,Table,Form,Input,Radio,Modal,Upload,Switch} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import './shop.member.less';
import qs from 'qs';

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

//修改/添加公用表单
class ShopMemberForm extends React.Component {
    state = {
        imgValue1:''
    };

    componentDidMount(){
        let t = this;
        if(t.props.typePopPu == "edit"){
            if(t.props.formdata.member_avatar){
                this.setState({imgValue1:t.props.formdata.member_avatar.url});
            }else{
                this.setState({imgValue1:''});
            }  
        }
    }

    normFile = (e) => {
       if(e.file.response){
        this.setState({imgValue1:e.file.response.data.url});
       }
       
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    validatorMember(rule, value, callback){
        let token = sessionStorage.getItem("admin_token");
        let t = this;
        if(t.props.typePopPu == "edit"){
            if(t.props.formdata[rule.field] === value){
                callback();
                return ;
            }
        }

        let obj = {
            admin_token:token,
        }
        obj[rule.field] = value;
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.shop_member/MemberCheck",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){}
                else if(result.error ==="请登陆"){
                   hashHistory.push('/');
                }else{
                    callback(result.error);       
                }
                callback();
                return ;
        }).catch(function(error){
            //console.log(error);
        });
    }

    render() {

        let t = this;
        
        let token = sessionStorage.getItem("admin_token");
        const { getFieldDecorator } = this.props.form;
       
        return (
            <Modal
            visible={true}
            okText="确定"
            wrapClassName="shop_form"
            onCancel={this.props.cancel}
            closable ={false}
            title = "会员添加"
            onOk={this.props.ok.bind(this)}
            >
            <Form>
            <FormItem
            style={{margin:0}}
            >
            {getFieldDecorator('member_id', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["member_id"]:"",
            })(
                <Input  style={{"display":"none"}}/>
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="会员"
                hasFeedback
                extra="3-15位字符，可由中文、英文、数字及“_”、“-”组成。"
            >
            {getFieldDecorator('member_name', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["member_name"]:"",
                rules: [ {
                    required: true, message: 'Please input your member_name!',
                },{
                     validator:t.validatorMember.bind(t)
                }],
            })(
                <Input />
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="密码"
                hasFeedback
                extra="6-20位字符，可由英文、数字及标点符号组成。"
            >
            {getFieldDecorator('member_password', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata.member_password:"",
                rules: [ {
                    required: true, message: 'Please input your member_password!',
                }],
            })(
                <Input type="password"/>
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="电子邮箱"
            extra="请输入常用的邮箱，将用来找回密码、接受订单通知等。"
            hasFeedback >
            {getFieldDecorator('member_email', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["member_email"]:"",
                rules: [ {
                    required: true, message: 'Please input your member_email!',
                },{
                     validator:t.validatorMember.bind(t)
                }],
            })(
                <Input />
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="手机号码"
                hasFeedback
            >
            {getFieldDecorator('member_mobile', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["member_mobile"]:"",
            })(
                <Input />
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="真实姓名"
            hasFeedback >
            {getFieldDecorator('member_truename', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["member_truename"]:"",
            })(
                <Input />
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="性别"
            >
                {getFieldDecorator('member_sex', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["member_sex"]:'',
                })(
                    <RadioGroup>
                      <Radio value="0">保密</Radio>
                      <Radio value="1">男</Radio>
                      <Radio value="2">女</Radio>
                    </RadioGroup>
                )} 
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="QQ"
                hasFeedback
            >
            {getFieldDecorator('member_qq', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["member_qq"]:"",
            })(
                <Input />
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="阿里旺旺"
                hasFeedback
            >
            {getFieldDecorator('member_ww', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["member_ww"]:"",
            })(
                <Input />
            )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="头像"
                extra="默认会员头像图片请使用100*100像素jpg/gif/png格式的图片。"
            >
             {getFieldDecorator('member_avatar', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                    initialValue:t.props.typePopPu == "edit"?t.props.formdata["member_avatar"]:"",
                })(
                  <Upload
                    action={urlhttp+"/admin.shop_member/uploadimage"}
                    data={{admin_token:token}}
                    name="imgFile"
                    showUploadList={false}
                    >
                    <div>
                       <Input addonAfter="选择上传" disabled value={t.state.imgValue1}/>
                    </div>
                </Upload>
            )}
            </FormItem>
            {
                t.props.typePopPu == "edit"?<div>
                    <FormItem
                    {...formItemLayout}
                    label="允许举报"
                    extra="如果禁止该项则会员不能在商品详情页面进行举报"
                    >
                    {getFieldDecorator('inform_allow', {
                        valuePropName: 'checked',
                        initialValue:t.props.formdata["inform_allow"]?true:false,   
                    })(
                       <Switch  checkedChildren="开启" unCheckedChildren="关闭"/>
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="允许发表言论"
                    extra="如果禁止该项则会员不能在前台进行下单操作"
                    >
                    {getFieldDecorator('is_allowtalk', {
                        valuePropName: 'checked',
                        initialValue:t.props.formdata["is_allowtalk"]?true:false,   
                    })(
                       <Switch  checkedChildren="开启" unCheckedChildren="关闭"/>
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="否有购买权限"
                    extra="如果禁止该项则会员不能发表咨询和发送站内信"
                    >
                    {getFieldDecorator('is_buy', {
                        valuePropName: 'checked',
                        initialValue:t.props.formdata["is_buy"]?true:false,   
                    })(
                       <Switch  checkedChildren="开启" unCheckedChildren="关闭"/>
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="积分"
                    >
                    <p>{t.props.formdata.member_points}</p>
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="经验值"
                    >
                   <p>{t.props.formdata.member_exppoints}</p>
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="可用预存款"
                    >
                    <p>{t.props.formdata.available_predeposit}</p>
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="冻结预存款"
                    >
                    <p>{t.props.formdata.freeze_predeposit}</p>
                    </FormItem>
                </div>
                :''
            }
        </Form>
        </Modal>
    );
    }
}

const ShopMembersForm = Form.create()(ShopMemberForm);


//组件类
class ShopMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount(){
        let t = this;
        let token = sessionStorage.getItem("admin_token");
        Actions.getList(token,1);
    }  

    add(){
        Actions.show();
    }

    remove(){

    } 

    amend(id){
        let token = sessionStorage.getItem("admin_token");
        Actions.getEditorList(token,id);
    }

    onChange(page){
        
        Actions.getList(token,page);
    }

    handleCancel(){
        Actions.cancel();
    }

    handleOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.addShopMember(obj,values,Actions);
            }
        });
    }

    editorOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.editorOk(obj,values,Actions);
            }
        });
    }

    shopForm1(){
        let t = this;
        return t.state.visible?<ShopMembersForm cancel={t.handleCancel} ok={t.handleOk} memberCheck={t.memberCheck} error={t.state.error}/>:"";
    }

    shopForm2(){
        let t = this;
        return t.state.editorVisible?<ShopMembersForm cancel={t.handleCancel} ok={t.editorOk} typePopPu="edit" formdata={t.state.editorList} memberCheck={t.memberCheck} error={t.state.error}/>:"";
    }
    
    render() {
        let t = this;
        
        const columns = [{
                title: '会员ID',
                dataIndex: 'member_id',
                width:70,
                fixed: 'left' 
            },{
                title: '会员名称',
                dataIndex: 'member_name',
                fixed: 'left',
                width:130,
                render: text => <p><img src={text.member_avatar} width="25" height="25" style={{"borderRadius":"50%","marginRight":"5px"}}/>{text.member_name}</p>
            },{
                title: '会员邮箱',
                dataIndex: 'member_email',
                width:150
            },{
                 title: '会员手机',
                 dataIndex: 'member_mobile',
                 width:150
            },{
                title: '会员性别',
                dataIndex: 'member_sex',
                width:100
            },{
                title: '真实姓名',
                dataIndex: 'member_truename',
                width:80
            },{
                title: '出生日期',
                dataIndex: 'member_birthday',
                width:100
            },{
                title: '注册时间',
                dataIndex: 'member_time',
                width:100
            },{
                title: '最后登录时间',
                dataIndex: 'member_login_time',
                width:150
            },{
                title: '最后登录IP',
                dataIndex: 'member_login_ip',
                width:150
            },{
                title: '会员积分',
                dataIndex: 'member_points',
                width:80
            },{
                title: '会员经验',
                dataIndex: 'member_exppoints',
                width:100
            },{
                title: '会员等级',
                dataIndex: 'member_grade',
                width:80
            },{
                title: '可用预存款(元)',
                dataIndex: 'available_predeposit',
                width:150
            },{
                title: '冻结预存款(元)',
                dataIndex: 'freeze_predeposit',
                width:150
            },{
                title: '可用充值卡(元)',
                dataIndex: 'available_rc_balance',
                width:150
            },{
                title: '冻结充值卡(元)',
                dataIndex: 'freeze_rc_balance',
                width:150
            },{
                title: '允许举报',
                dataIndex: 'inform_allow',
                width:80
            },{
                title: '允许购买',
                dataIndex: 'is_buy',
                width:80
            },{
                title: '允许咨询',
                dataIndex: 'is_allowtalk',
                width:80
            },{
                title: '操作',
                    width:80,
                    key: 'action',
                    fixed: 'right', 
                    render: (text, record) => (
                    <span>
                        <a onClick={this.amend.bind(t,record["member_id"])}>修改</a>
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
            <div className="shop_member">
                <Breadcrumb className="bread_style">
                    <Breadcrumb.Item><a href="">会员</a></Breadcrumb.Item>
                    <Breadcrumb.Item>会员管理</Breadcrumb.Item>
                </Breadcrumb>
                <div className="table-operations">
                    <Button type="dashed" onClick={t.add} icon="plus">添加</Button>
                </div>
                <Table className="table_width" pagination={coo} rowSelection={rowSelection}  columns={columns} dataSource={t.state.list} scroll={{ x: 2300 }}/>
                {t.shopForm1()}
                {t.shopForm2()}
        </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(ShopMember, Reflux.connect(Store));
module.exports = ShopMember;
