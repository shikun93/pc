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
        goods_class_list_one:[],
        goods_class_list_two:[],
        goods_class_list_three:[]
    },
    onAddBut:function(){
        let  t = this;
        t.data.addVisible = true;
        t.updateComponent();
    },
    onGetBrandList:function(token,page,cb){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            page:page,
            page_size:10
        });
        fetch(urlhttp+"/admin.shop_brand/getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    t.data.list = result.data["brand_list"];
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
    onGetCasListOne:function(token){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            goods_class_parent_id:0
        });
        fetch(urlhttp+"/admin.shop_goods_class/public_getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    t.data['goods_class_list_one'] = result.data['goods_class_list'];
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
    onGetCascaderList:function(token,id,n){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            goods_class_parent_id:id
        });
        fetch(urlhttp+"/admin.shop_goods_class/public_getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    if(n=0){
                        t.data['goods_class_list_two'] =result.data['goods_class_list'];
                        t.data['goods_class_list_three'] =[];
                    }else if(n=1){
                        t.data['goods_class_list_three'] =result.data['goods_class_list'];
                    }
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
            brand_id:id,
            update:0
        });
        fetch(urlhttp+"/admin.shop_brand/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                   let data =result.data["brand_info"];
                   let arr = data['brand_pic'].split(',');
                     imgObj.push({
                        uid:1,
                        status: 'done',
                        url:arr[0],
                    });
                    data['brand_pic'] = imgObj;
                    t.data.visible = true;
                    t.data.editorAdminData = data;
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onAddList:function(token,values,Actions,cb){
        let t = this;
        let goods_name ='';
        if(values["goods_class_name3"]!=undefined){
            goods_name = values['goods_class_name3'];
        }else if(values["goods_class_name2"]!=undefined){
             goods_name = values['goods_class_name2'];
        }else if(values["goods_class_name1"]!=undefined){
             goods_name = values['goods_class_name1'];
        }
        let arr = goods_name.split(',');
        let obj = qs.stringify({
            admin_token:token,
            brand_name:values.brand_name,
            brand_initial:values.brand_initial,
            goods_class_id:arr[0],
            goods_class_name:arr[1],
            brand_pic:values["brand_pic"][0].response.data.url,
            brand_recommend:values.brand_recommend,
            show_type:values.show_type,
            sort_order:values.sort_order
        });
        fetch(urlhttp+"/admin.shop_brand/addone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.addVisible = false;
                    t.data['goods_class_list_two'] = [];
                    t.data['goods_class_list_three'] = [];
                    Actions.getBrandList(token,1,cb);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onEditorSuccess:function(token,values,Actions,page,cb){
        let t = this;
        let goods_name ='';
        if(values["goods_class_name3"]!=undefined){
            goods_name = values['goods_class_name3'];
        }else if(values["goods_class_name2"]!=undefined){
             goods_name = values['goods_class_name2'];
        }else if(values["goods_class_name1"]!=undefined){
             goods_name = values['goods_class_name1'];
         }else{
            goods_name = values['goods_class_id']+','+values['goods_class_name'];
         }
        let arr = goods_name.split(',');
        let obj = qs.stringify({
            admin_token:token,
            brand_name:values.brand_name,
            brand_initial:values.brand_initial,
            goods_class_id:arr[0],
            goods_class_name:arr[1],
            brand_pic:values["brand_pic"][0].url?values["brand_pic"][0].url:values["brand_pic"][0].response.data.url,
            brand_recommend:values.brand_recommend,
            show_type:values.show_type,
            sort_order:values.sort_order,
            brand_id:values.brand_id,
            update:1
        });
        fetch(urlhttp+"/admin.shop_brand/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.visible = false;
                    t.data['goods_class_list_two'] = [];
                    t.data['goods_class_list_three'] = [];
                    Actions.getBrandList(token,page,cb);
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
        t.data['goods_class_list_two'] = [];
        t.data['goods_class_list_three'] = [];
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