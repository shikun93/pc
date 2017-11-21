/**
 * Created by Administrator on 2017/4/6.
 */
import Reflux from 'reflux';
import {hashHistory} from 'react-router';
import Actions from './action';
import {urlhttp,urlhttps} from '../../app/url';
import qs from 'qs';

var Store =  Reflux.createStore({
    //监听所有的actions
    listenables: [Actions],
    data: {
        menuList:[],
        arr:[],
        messageVisable:false,
        passVisable:false,
        pattern:null,
        messageList:{}
    },
    getInitialState: function() {
        return this.data;
    },
    updateComponent: function() {
        this.trigger(this.data);
    },
    onGetPattern:function(value){
        let t = this;
        let reg = new RegExp("^"+value+"$");
        t.data.pattern = reg;
        t.updateComponent();
    },
    onGetMenu:function(token,menuChangeList,cb){
        let t = this;
        
        let obj = qs.stringify({
            admin_token:token
        });
        fetch(urlhttp+"/admin.admin/public_getMenu",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
            if(result.error == ""){
                t.data.menuList = result.data["menu_list"];
                t.updateComponent();
                if(sessionStorage.getItem("admin_item_id")){
                menuChangeList(sessionStorage.getItem("admin_item_id"));
                }
            }else if(result.error ==="请登陆"){
                hashHistory.push("/");
            }else{
                cb(result.error);
            }
          
        });
    },
    onGetQuitLoading:function(token,cb){
        let t = this;
        
        let obj= qs.stringify({
            admin_token:token
        })
        fetch(urlhttps+"/admin.login/logout",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
            if(result.error == ""){
                sessionStorage.setItem("admin_token","");
                sessionStorage.setItem("admin_item_id","");
                sessionStorage.setItem("current","");
                sessionStorage.setItem("openKeys","");
                hashHistory.push("/");
                t.updateComponent();
            }else{
                cb(result.error);
            }
        });
    },
    onShowHtml:function(token,str,cb){
        let t = this;
        if(str == "修改信息"){
            let obj = qs.stringify({
                admin_token:token,
                update:0
            });
            fetch(urlhttp+"/admin.admin/public_edit_info",{method:"post",body:obj,headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }})
                .then(function(response){
                    return response.json();
                }).then(function(result){
                if(result.error == ""){
                    t.data.messageVisable = true;
                    t.data.messageList = result.data["admin_info"];
                    t.updateComponent();
                 }else{
                    cb(result.error);
            }
            });
        }else{
            t.data.passVisable = true;
            t.updateComponent();
        }
    },
    onSetAdminMessage:function(token,values,cb){
        let t = this;
        
        let obj = qs.stringify({
            admin_token:token,
            email:values.email,
            real_name:values.real_name,
            mobile:values.mobile,
            update:1
        });
        fetch(urlhttp+"/admin.admin/public_edit_info",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
            if(result.error == ""){
                t.data.messageVisable = false;
                t.updateComponent();
             }else{
                cb(result.error);
            }
        });
    },
    onSetAdminPassword:function(token,values,cb){
        let t = this;
       
        let obj = qs.stringify({
            admin_token:token,
            old_password:values.old_password,
            new_password:values.new_password,
            new_password_confirm:values.new_password_confirm
        });
        fetch(urlhttp+"/admin.admin/public_change_password",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
            if(result.error == ""){
                t.data.passVisable = false;
                t.updateComponent();
             }else{
                cb(result.error);
            }
        });
    },
    onCancel:function(){
        let t = this;
        t.data.messageVisable = false;
        t.data.passVisable = false;
        t.updateComponent();
    }
});
module.exports = Store;