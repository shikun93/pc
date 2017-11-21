/**
 * Created by Administrator on 2017/4/6.
 */
import React from 'react';
import Reflux from 'reflux';
import Actions from './action';
import {urlhttp,urlhttps} from '../../app/url';
import {hashHistory} from 'react-router';

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
    onGetList:function(token,page,cb){
        let t = this;
        let obj = new FormData();
        obj.append("admin_token",token);

        fetch(urlhttp+"/admin.shop_store_grade/getlist",{method:"post",body:obj})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    t.data.list = result.data.store_grade_list;
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
    onAddShopGrade:function(token,values,Actions,cb){
        let t = this;
        let obj = new FormData();
        obj.append("admin_token",token);
        obj.append("store_grade_name",values["store_grade_name"]);
        obj.append("store_grade_goods_limit",values["store_grade_goods_limit"]);
        obj.append("store_grade_album_limit",values["store_grade_album_limit"]);
        obj.append("store_grade_function",'');
        obj.append("store_grade_price",values["store_grade_price"]);
        obj.append("store_grade_description",values["store_grade_description"]);
        obj.append("sort_order", values["sort_order"]);
        fetch(urlhttp+"/admin.shop_store_grade/addone",{method:"post",body:obj})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.visible = false;
                    Actions.getList(token,1,cb);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onGetEditorList:function(token,id,cd){
        let t = this;
        let obj = new FormData();
        obj.append("admin_token",token);
        obj.append("store_grade_id",id);
        obj.append("update",0);
        fetch(urlhttp+"/admin.shop_store_grade/editone",{method:"post",body:obj})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.editorVisible = true;
                    t.data.editorList = result.data;
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onEditorOk:function(token,values,Actions,cb){
        let t = this;
        let obj = new FormData();
        obj.append("admin_token",token);
        obj.append("store_grade_id",values["store_grade_id"]);
        obj.append("store_grade_name",values["store_grade_name"]);
        obj.append("store_grade_goods_limit",values["store_grade_goods_limit"]);
        obj.append("store_grade_album_limit",values["store_grade_album_limit"]);
        obj.append("store_grade_function",'');
        obj.append("store_grade_price",values["store_grade_price"]);
        obj.append("store_grade_description",values["store_grade_description"]);
        obj.append("sort_order", values["sort_order"]);
        obj.append("update",1);
        fetch(urlhttp+"/admin.shop_store_grade/editone",{method:"post",body:obj})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.editorVisible = false;
                    Actions.getList(token,t.data.current,cb);
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