/**
 * Created by Administrator on 2017/4/6.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import {message } from 'antd';
import Actions from './action';
import Store from './store';
import './login.less';

const cb =function(err){
    message.error(err);
}
//组件类
class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount(){
        let t = this;
        let arr = document.cookie.split(";");
        if(arr[0]!=""){
           arr = arr[0].split("&");
           let admin = {};
           arr.map(function(item,index){
                let arr1 = item.split("=");
                admin[arr1[0]] = arr1[1]; 
           }) 
           Actions.getChange("all",admin);
        } 
        $(document).keyup(function(e){
            if(e.keyCode==13){
                t.loaded();
            }
        })
    }

   changeValue(e){
        Actions.getChange(e.target.getAttribute("type"),e.target.value);
   }

    loaded(){
        let t = this;
        Actions.loading(cb);
    }

    render() {
        let t = this;
        return (
            <div className="container-fluid login">
                    <h1>十间鱼后台管理系统</h1>
                    <div className="landing_register">
                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="login_li"><a style={{fontSize:"18px",fontWeight:"bold",color:"#fff"}}>管　理　员　登　陆</a></li>
                        </ul>
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="home">
                                <form  className="form-horizontal login_form" >
                                    <div className="form-group">
                                        <label htmlFor="inputEmail3" className="col-sm-3 control-label">用户名</label>
                                        <div className="col-sm-9">
                                        <input type="text" className="form-control" id="inputEmail3" placeholder="username" value={t.state.username} onChange={t.changeValue}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword3" className="col-sm-3 control-label">密码</label>
                                        <div className="col-sm-9">
                                        <input type="password" className="form-control" id="inputPassword3" placeholder="Password" value={t.state.password} onChange={t.changeValue} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-offset-3 col-sm-9">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" onChange={t.changeValue} value={t.state.checkbox}/> 记住我
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-offset-3 col-sm-9">
                                            <a className="btn btn-default" onClick={t .loaded.bind(t)}>登陆</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
    )
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(Login, Reflux.connect(Store));
module.exports = Login;
