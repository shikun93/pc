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
        total:1,
        visible:false,
        editorList:{},
        editorVisible:false
    },
    onGetList:function(token,page){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            query:'',
            sortname:'',
            sortorder:'',
            page:page,
            page_size:10,
            qtype:''
        });
        fetch(urlhttp+"/admin.shop_member/getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    let data = result.data.member_list;
                    data = data.map(function(item,index){
                        item.member_name = {
                            member_name:item.member_name,
                            member_avatar:item.member_avatar
                        };
                        return item;
                    });
                    t.data.list = addKeyFun(data);
                    t.data.total = result.ext["total_num"];
                    t.data.current = page;
                    t.updateComponent();
                }else if(result.error ==="请登陆"){
                   hashHistory.push('/');
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onShow:function(){
        let t = this;
        t.data.visible = true;
        t.updateComponent();
    },
    onAddShopMember:function(token,values,Actions){
        let t = this;
        if(values.member_avatar){
            let length = values.member_avatar.length-1;
            values.member_avatar = values.member_avatar?values.member_avatar[length].response.data.url:'';
        }
        values.admin_token = token;
        delete values.member_id;
        let obj = qs.stringify(values);
        fetch(urlhttp+"/admin.shop_member/addmember",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.visible = false;
                    Actions.getList(token,1);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onGetEditorList:function(token,id){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            member_id:id,
            update:0
        });
        fetch(urlhttp+"/admin.shop_member/editmember",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    let data = result.data;
                    if(data.member_avatar){

                        data.member_avatar = {
                            uid: 1,
                            status: 'done',
                            url: data.member_avatar
                        };
                    }
                   
                    data.inform_allow = data.inform_allow!=0?true:false;
                    data.is_allowtalk = data.is_allowtalk!=0?true:false;
                    data.is_buy = data.is_buy!=0?true:false;
                    t.data.editorVisible = true;
                    t.data.editorList = data;
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onEditorOk:function(token,values,Actions){
        let t = this;
        if(values.member_avatar){
            let length = values.member_avatar.length-1;
            values.member_avatar = values.member_avatar?(values.member_avatar.url||values.member_avatar[length].response.data.url):'';
        }
        values.admin_token = token;
        values.inform_allow = values.inform_allow?1:0;
        values.is_allowtalk = values.is_allowtalk?1:0;
        values.is_buy = values.is_buy?1:0;
        values.update = 1;
        let obj = qs.stringify(values);
        fetch(urlhttp+"/admin.shop_member/editmember",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.editorVisible = false;
                    Actions.getList(token,t.data.current);
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
        t.data.editorVisible = false;
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