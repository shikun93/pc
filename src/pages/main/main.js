/**
 * Created by Administrator on 2017/4/6.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import { Menu,Dropdown,Form,Modal,Input,Button,message} from 'antd';
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
import './main.less';
import img from '../../images/main_login1.jpg';

const allUrl = {
    "url19":"/main/table",
    "url24":"/main/adminGroup",
    "url13":"/main/adminAdmin",
    "url30":"/main/adminMoblie",
    "url36":"/main/adminImport",
    "url38":"/main/adminPrinter",
    "url44":"/main/printerSeller",
    "url45":"/main/brand",
    "url40":"/main/adminShop",
    "url43":"/main/shopSpec",
    "url42":"/main/shopType",
    "url47":"/main/shopSetting",
    "url48":"/main/shopPromotion",
    "url49":"/main/settingImage",
    "url52":"/main/systemSetting",
    "url1":"/main/home",
    "url54":"/main/pageTemplate",
    "url51":"/main/siteSetup",
    "url55":"/main/adminLog",
    "url61":"/main/shopGrade",
    "url62":"/main/shopClass",
    "url63":"/main/ownStore",
    "url65":"/main/shopMember",
    "url67":"/main/shopOrder",
};

window.cb =function(err){
    message.error(err);
}
window.addKeyFun = function(arr){
    arr = arr.map(function(item,index){
         item.key = index+1;
         return item;
    })
    return arr;
}

//信息修改
class MessageForm extends React.Component {
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
            <FormItem {...formItemLayout}>
        {getFieldDecorator('admin_id', {
            initialValue: t.props.messageList["admin_id"],
        })(
        <Input  style={{"display":"none"}}/>
        )}
    </FormItem>
        <FormItem
        {...formItemLayout}
        label="电子邮件"
        hasFeedback>
        {getFieldDecorator('email', {
            initialValue: t.props.messageList["email"],
                rules: [ {
                required: true, message: 'Please input your admin_name!',
            }],
        })(
        <Input />
    )}
    </FormItem>
        <FormItem
        {...formItemLayout}
        label="手机号码"
        hasFeedback >
        {getFieldDecorator('mobile', {
            initialValue: t.props.messageList["mobile"],
                rules: [{
                required: true, message: 'Please confirm your mobile!',
            }],
        })(
        <Input />
    )}
    </FormItem>
        <FormItem
        {...formItemLayout}
        label="真实名字"
        hasFeedback >
        {getFieldDecorator('real_name', {
            initialValue: t.props.messageList["real_name"],
                rules: [{
                required: true, message: 'Please confirm your real_name!',
            }],
        })(
        <Input />
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

const AdminMessageForm = Form.create()(MessageForm);


//密码修改
class PasswordForm extends React.Component {
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
        {...formItemLayout}
        label="旧密码"
        hasFeedback>
        {getFieldDecorator('old_password', {
                rules: [ {
                required: true, message: 'Please input your old_password!',
            }],
        })(
        <Input />
    )}
    </FormItem>
        <FormItem
        {...formItemLayout}
        label="新密码"
        hasFeedback >
        {getFieldDecorator('new_password', {
                rules: [ {
                required: true, message: 'Please input your new_password!',
            }],
        })(
        <Input type="password" onChange={t.props.passChange}/>
    )}
    </FormItem>
        <FormItem
        {...formItemLayout}
        label="确认密码"
        hasFeedback >
        {getFieldDecorator('new_password_confirm', {
                rules: [{
                required: true, message: 'Please confirm your new_password_confirm!',

            },{
                pattern:t.props.pattern, message:"两次密码不一致！"
                }],
        })(
        <Input type="password"/>
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
const AdminPasswordForm = Form.create()(PasswordForm);

//组件类
class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: '',
            openKeys: [],
            height:0
        };
    }
    componentWillMount(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        Actions.getMenu(obj,t.menuChangeList.bind(t),cb);

        let height = document.documentElement.clientHeight-50;
        t.setState({ height: height+"px" });
        window.onresize = function(){
            let height = document.documentElement.clientHeight-50;
            t.setState({ height: height+"px" });
        }
    }
    componentDidMount(){
        let t = this;
    }
    handleClick(e){
        sessionStorage.setItem("current",e.key);
        this.setState({
            current: e.key,
        })
    }

    quitLoad(){
        let obj = sessionStorage.getItem("admin_token");
        Actions.getQuitLoading(obj,cb);
    }

    onOpenChange(openKeys){
        const state = this.state;
        let latestOpenKey;
        if(openKeys.length==2&&state.openKeys[0]==undefined){
            latestOpenKey =openKeys[1];
        }else{
            latestOpenKey = _.difference(openKeys,state.openKeys)[0];
        }
        const latestCloseKey = _.difference(state.openKeys,openKeys)[0];
        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        sessionStorage.setItem("openKeys",nextOpenKeys);
        this.setState({ openKeys: nextOpenKeys });
    }
    getAncestorKeys(key){
        const arr = {
            sub3: ['sub2']
        };
        return arr[key] || [];
    }

    menuChangeList(id,bs){
        let t = this;
        let arr = [];
        sessionStorage.setItem("admin_item_id",id);
        if(bs == 1){
            $(".tab1>ul").css("display","none");
            $(".tab1 .main_tab").css({"margin-left":"0px","border-left":"none"});
            hashHistory.push('/main/home');
        }else{
            $(".tab1>ul").css("display","block");
            let url = this.props.location;
            if(url.pathname.slice(-4)==="home"){
               let n = sessionStorage.getItem("current");
               if(n){

               }else{
                hashHistory.push('/main/blankPage');
               }
            }
            $(".tab1 .main_tab").css({"margin-left":"240px","border-left":"1px solid #ccc"});
        }
        let childObj = t.state.menuList[id];
        
           if(childObj.child){
               childObj.child.map(function(item,index){
                    if(item.child){
                        let arr1 =[];
                        item.child.map(function(item, index){
                            arr1.push( < Menu.Item key = {item["admin_menu_id"]} >{allUrl["url"+item["admin_menu_id"]]?<Link to={allUrl["url"+item["admin_menu_id"]]}> {item["admin_menu_name"]}</Link>:<a>{item["admin_menu_name"]}</a>}< / Menu.Item >);
                        })
                        arr.push(<SubMenu key={item["admin_menu_id"]} title={<span><span>{item["admin_menu_name"]}</span></span>}>{arr1}</SubMenu>);
                    }else{
                        arr.push(<Menu.Item key={item["admin_menu_id"]}>{allUrl["url"+item["admin_menu_id"]]?<Link to={allUrl["url"+item["admin_menu_id"]]}> {item["admin_menu_name"]}</Link>:<a>{item["admin_menu_name"]}</a>}</Menu.Item>);
                    }
               });
            }
        Actions.setList(arr);
    }

    addOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.setAdminPassword(obj,values,cb);
            }
        });
    }

    addHandleOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.setAdminMessage(obj,values,cb);
            }
        });

    }

    handleCancel(){
        Actions.cancel();
    }

    addMessageHtml(){
            let t = this;
            return t.state.messageVisable?<div>
            <Modal visible={true}
            title="修改信息"
            closable ={false}
            footer={null}>
                <AdminMessageForm messageList={t.state.messageList} ok={this.addHandleOk} cancel={this.handleCancel}/>
        </Modal>
            </div>:"";
    }

    passChange(e){
        Actions.getPattern(e.target.value);
    }

    addPassHtml(){
        let t = this;
        return t.state.passVisable?<div>
        <Modal visible={true}
        title="修改密码"
        closable ={false}
        footer={null}>
            <AdminPasswordForm ok={this.addOk} passChange={t.passChange} pattern ={t.state.pattern} cancel={this.handleCancel} adminGroupList = {t.state.adminGroupList}/>
    </Modal>
        </div>:"";
    }
    changePassword(e){
        Actions.showHtml(null,e.target.innerHTML,cb);
    }

    changeMessage(e){
        let obj = sessionStorage.getItem("admin_token",cb);
        Actions.showHtml(obj,e.target.innerHTML,cb);
    }
    render() {
        let t = this;
        const menu = (
            <Menu>
            <Menu.Item>
                <a onClick={t.changePassword}>修改密码</a>
                <a onClick={t.changeMessage}>修改信息</a>
                <a onClick={t.quitLoad}>退出登陆</a>
            </Menu.Item>
            </Menu>
            );
        return (
            <div className="main">
                <div className="main_header">
                    <div className="logo">
                        <img  src={img}/>
                    </div>
                    <div className="personage">
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <p>个人菜单</p>
                        </Dropdown>
                    </div>
                    <div className="header_menu">
                        <ul>
                            {
                                t.state.menuList?t.state.menuList.map(function(item,index){
                                return <li key={index} onClick={t.menuChangeList.bind(t,index,item["admin_menu_id"])}>{item["admin_menu_name"]}</li>
                                }):""
                            }
                        </ul>
                    </div>
                </div>
                <div className="tab1">
                    <Menu className="main_menu"
                mode="inline"
                openKeys={t.state.openKeys[0] == undefined?(sessionStorage.getItem("openKeys")?[sessionStorage.getItem("openKeys")]:[]):t.state.openKeys}
                selectedKeys={t.state.current?[t.state.current]:[sessionStorage.getItem("current")]}
                style={{ width: 240 }}
                onOpenChange={t.onOpenChange.bind(t)}
                onClick={t.handleClick.bind(t)}
            >
            {t.state.arr}
                </Menu>
                <div style={{height:t.state.height}} className="main_tab">
                    {t.props.children}
                </div>
                </div>
                {t. addMessageHtml()}
                {t. addPassHtml()}
            </div>
);
}
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(Main, Reflux.connect(Store));
module.exports = Main;
