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
        classId:0,
        classList:[],
        typeList:[],
    },
    onAddBut:function(){
        let  t = this;
        t.data.addVisible = true;
        t.updateComponent();
    },
    onGetList:function(token,page,cb,id){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            goods_class_parent_id:id,
            page:page,
            page_size:10
        });
        fetch(urlhttp+"/admin.shop_goods_class/public_getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    t.data.list = result.data["goods_class_list"];
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
    onGetClassList:function(token){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            deep:2
        });
        fetch(urlhttp+"/admin.shop_goods_class/getClassTree",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    t.data.classList = result.data['goods_class_list'];
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
    onGetTypeList:function(token){
        let t = this;
        let obj = qs.stringify({
            admin_token:token
        });
        fetch(urlhttp+"/admin.shop_goods_type/getGoodsTypeList",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                   t.data.typeList = result.data['goods_type_list'];
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
    onEditorList:function(token,id,cb){
        let t = this;
        let imgObj = [];
        let obj = qs.stringify({
            admin_token:token,
            goods_class_id:id,
            update:0
        });
        fetch(urlhttp+"/admin.shop_goods_class/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.visible = true;
                    let obj = result.data["goods_class_info"];
                    obj['goods_type_name'] = obj['goods_type_id']==0?'0':(obj['goods_type_id']+' '+obj['goods_type_name']);
                    console.log(obj['goods_type_name']);
                    t.data.editorAdminData = obj;
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onAddList:function(token,values,Actions,cb){
        let t = this,typeId,typeName;
        if(values['goods_type_name'] ===undefined){
           typeId = '';
           typeName = '';
        }else{
            let arr = values['goods_type_name'].split(' ');
            typeId = arr[0];
            typeName = arr[1];
        }
        let obj = qs.stringify({
            admin_token:token,
            goods_class_name:values["goods_class_name"],
            goods_type_id:typeId,
            goods_type_name:typeName,
            goods_class_parent_id:values["goods_class_parent_id"],
            commis_rate:values["commis_rate"],
            can_virtual:values["can_virtual"],
            show_type:values["show_type"],
            lp_tax:values["lp_tax"],
            is_show:values["is_show"],
            sort_order:values["sort_order"],
        });
        fetch(urlhttp+"/admin.shop_goods_class/addone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.addVisible = false;
                    Actions.getList(token,1,cb,0);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onEditorSuccess:function(token,values,Actions,page,cb){
        
        let t = this,typeId,typeName,can_virtual;
        if(values["can_virtual"][1] != undefined){
            can_virtual = 1;
        }else{
            can_virtual = 0;
        }
        if(values['goods_type_name'] ===undefined){
           typeId = '';
           typeName = '';
        }else{
            let arr = values['goods_type_name'].split(' ');
            typeId = arr[0];
            typeName = arr[1];
        }
        let obj = qs.stringify({
            admin_token:token,
            goods_class_name:values["goods_class_name"],
            goods_type_id:typeId,
            goods_type_name:typeName,
            goods_class_parent_id:values["goods_class_parent_id"],
            commis_rate:values["commis_rate"],
            can_virtual:values["can_virtual"],
            show_type:values["show_type"],
            lp_tax:values["lp_tax"],
            is_show:values["is_show"],
            sort_order:values["sort_order"],
            goods_class_id:values.goods_class_id,
            update:1
        });
        fetch(urlhttp+"/admin.shop_goods_class/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.visible = false;
                    Actions.getList(token,page,cb,0);
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