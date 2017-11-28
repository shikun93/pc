/**
 * Created by Administrator on 2017/4/6.
 */
import React from 'react';
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
        current:1,
        addVisible:false,
        visible:false,
        editorAdminData:{},
        selectList:[]
    },
    onAddBut:function(){
        let  t = this;
        t.data.addVisible = true;
        t.updateComponent();
    },
    onGetList:function(token,page,id){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            page:page,
            page_size:10
        });
        fetch(urlhttp+"/admin.shop_goods_spec/getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    t.data.list = addKeyFun(result.data["goods_spec_list"]);
                    t.data.total = result.ext["total_num"];
                    t.data.current = page;
                    t.updateComponent();
                }else if(result.error ==="请登陆"){
                    hashHistory.push("/");
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onGetSelectList:function(token){
        let t = this;
        let obj = qs.stringify({
            admin_token:token
        });
        fetch(urlhttp+"/admin.shop_goods_spec/selectgoodsspeclist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                   t.data.selectList = result.data['goods_spec_list'];
                   t.updateComponent();
                }else if(result.error ==="请登陆"){
                    hashHistory.push("/");
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onEditorList:function(token,id){
        let t = this;
        let imgObj = [];
        let obj = qs.stringify({
            admin_token:token,
            goods_spec_id:id,
            update:0
        });
        fetch(urlhttp+"/admin.shop_goods_spec/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.visible = true;
                    t.data.editorAdminData = result.data["goods_spec_info"];
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onAddList:function(token,values,Actions){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            goods_spec_name:values.goods_spec_name,
            goods_class_name:values.goods_class_name,
            sort_order:values.sort_order
        });
        fetch(urlhttp+"/admin.shop_goods_spec/addone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.addVisible = false;
                    Actions.getList(token,1);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onEditorSuccess:function(token,values,Actions,page){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            goods_spec_id:values.goods_spec_id,
            goods_spec_name:values.goods_spec_name,
            goods_class_name:values.goods_class_name,
            sort_order:values.sort_order,
            update:1
        });
        fetch(urlhttp+"/admin.shop_goods_spec/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.visible = false;
                    Actions.getList(token,page);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onRemove:function(token,id,Actions,page){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            goods_spec_id:id
        });
        fetch(urlhttp+"/admin.shop_goods_spec/delone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.visible = false;
                    Actions.getList(token,page);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
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