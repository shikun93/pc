/**
 * Created by Administrator on 2017/4/6.
 */
import Reflux from 'reflux';
import Actions from './action';
import {urlhttp,urlhttps} from '../../app/url';
import {hashHistory} from 'react-router';
import qs from 'qs';

var Store =  Reflux.createStore({
    //监听所有的actions
    listenables: [Actions],
    data: {
        list:[],
        addVisible:false,
        adminGroupList:[],
        visible:false,
        editorOne:{}
    },
    onGetGroups:function(token){
        let t = this;
        let arr = [];
        let obj = qs.stringify({
            admin_token:token
        });
        fetch(urlhttp+"/admin.admin_group/getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.adminGroupList = result.data["admin_group_list"];
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
            
        });
    },
    onAddBut:function(){
        let t = this;
        t.data.addVisible = true;
        t.updateComponent();
    },
   onGetAdminAdminList:function(token,page){
       let t = this;
       
       let obj = qs.stringify({
            admin_token:token,
            page:page,
            page_size:10
       });
       fetch(urlhttp+"/admin.admin/getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
       }})
           .then(function(response){
               return response.json();
           }).then(function(result){
            if(result.error==""){
                t.data.list = addKeyFun(result.data["admin_list"]);
                t.data.total = result.ext["total_num"];
                t.data.current = page;
                t.updateComponent();
            }else if(result.error ==="请登陆"){
                hashHistory.push("/");
            }else{
                cb(result.error);
            }
           
       });
   },
    onAddAdmin:function(token,values,Actions){
        let t = this;
        delete values.admin_id;
        let obj = qs.stringify(Object.assign(values,{admin_token:token}));
        fetch(urlhttps+"/admin.admin/addone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.addVisible = false;
                    Actions.getAdminAdminList(token,1);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
            
        });
    },
    onGetEditorAdmin:function(token,id){
        let t = this;
       
        let obj = qs.stringify({
            admin_token:token,
            admin_id:id,
            update:0
        });
        fetch(urlhttps+"/admin.admin/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
            if(result.error="不能编辑系统管理员"&&result.data.length ==0){
                cb('不能编辑系统管理员');
            }else{
                t.data.editorOne = result.data["admin_info"];
                t.data.visible = true;
                t.updateComponent();
            }
        });
    },
    onEditorSuccess:function(token,values,Actions,page){
        let t = this;
        let obj = qs.stringify(Object.assign(values,{admin_token:token,update:1}));
        fetch(urlhttps+"/admin.admin/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.visible = false;
                    Actions.getAdminAdminList(token,page);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
            
        });
    },
    onCancel:function(){
        let t = this;
        t.data.visible = false;
        t.data.addVisible = false;
        t.updateComponent();
    },
    getInitialState: function() {
        return this.data;
    },
    updateComponent: function() {
        this.trigger(this.data);
    }
});
module.exports = Store;