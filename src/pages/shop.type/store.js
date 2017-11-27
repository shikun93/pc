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
        brandList:[],
        specList:[],
        current:1,
        addVisible:false,
        visible:false,
        editorAdminData:{},
        goods_class_list_one:[],
        goods_class_list_two:[],
        goods_class_list_three:[],
        zNum:0,
        sNum:0
    },
    onAddBut:function(){
        let  t = this;
        t.data.addVisible = true;
        t.updateComponent();
    },
    onGetList:function(token,page,cb){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            page:page,
            page_size:10
        });
        fetch(urlhttps+"/admin.shop_goods_type/getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    t.data.list = addKeyFun(result.data["goods_type_list"]);
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
    onGetBrandList:function(token){
        let t = this;
        let obj = qs.stringify({
            admin_token:token
        });
        fetch(urlhttps+"/admin.shop_brand/getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    let arr = [];
                    let data = result.data["brand_list"];
                    for(let i =0;i<data.length;i++){
                        arr.push({ label: data[i]['brand_name'], value: data[i]['brand_id'] });
                     }
                    t.data.brandList = arr;
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
     onGetSpecList:function(token){
        let t = this;
        let obj = qs.stringify({
            admin_token:token
        });
        fetch(urlhttps+"/admin.shop_goods_spec/selectgoodsspeclist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    let arr = [];
                    let data = result.data["goods_spec_list"];
                    for(let i =0;i<data.length;i++){
                        let item = data[i]['goods_spec'];
                        for(let j =0;j<item.length;j++){
                            arr.push({ label: item[j]['goods_spec_name'], value: item[j]['goods_spec_id'] });
                        }
                     }
                    t.data.specList = arr;
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
        let obj = qs.stringify({
            admin_token:token,
            goods_type_id:id,
            update:0
        });
        fetch(urlhttp+"/admin.shop_goods_type/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.visible = true;
                    let data = {};
                    data['goods_class_id'] =result.data['goods_type_info']['goods_class_id'];
                    data['goods_type_name'] =result.data['goods_type_info']['goods_type_name'];
                    data['sort_order'] =result.data['goods_type_info']['sort_order'];
                    data['goods_type_id'] =result.data['goods_type_info']['goods_type_id'];
                    data['goods_class_name'] =result.data['goods_type_info']['goods_class_name'];
                    data['brand_id'] = [];
                    let brindList = result.data['goods_type_info']['goods_type_brand_list'];
                    for(let i =0;i<brindList.length;i++){
                        data['brand_id'][i] =brindList[i]['brand_id'];
                    }
                    data['goods_spec_id'] = [];
                    let specList = result.data['goods_type_info']['goods_type_spec_list'];
                    for(let i =0;i<specList.length;i++){
                        data['goods_spec_id'][i] =specList[i]['goods_spec_id'];
                    }
                    let attrList =result.data['goods_type_info']['goods_attr_list']; 
                    for(let i=0;i<attrList.length;i++){
                        if(i == 0){
                            data['goods_attr_name'] =attrList[0]['goods_attr_name'];
                            data['goods_attr_value']=attrList[0]['goods_attr_value'];
                            data['asort_order']=attrList[0]['sort_order'];
                            data['ais_show']=attrList[0]['is_show'];
                            data['goods_attr_id']=attrList[0]['goods_attr_id'];
                        }else{
                            let a = i-1;
                            data['goods_attr_name'+a] =attrList[i]['goods_attr_name'];
                            data['goods_attr_value'+a]=attrList[i]['goods_attr_value'];
                            data['asort_order'+a]=attrList[i]['sort_order'];
                            data['ais_show'+a]=attrList[i]['is_show'];
                            data['goods_attr_id'+a]=attrList[i]['goods_attr_id'];
                        }  
                    }
                    let customList =result.data['goods_type_info']['goods_type_custom_list'];
                    for(let i=0;i<customList.length;i++){
                        if(i == 0){
                            data['goods_type_custom'] =customList[0]['goods_type_custom_name'];
                            data['goods_type_custom_id'] =customList[0]['goods_type_custom_id'];
                        }else{
                            let a = i-1;
                            data['goods_type_custom'+a] =customList[i]['goods_type_custom_name'];
                            data['goods_type_custom_id'+a] =customList[i]['goods_type_custom_id'];
                        }
                        
                    }
                    t.data.zNum =customList.length;
                    t.data.sNum =attrList.length;
                    t.data.editorAdminData =data;
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
        let obj = {
            admin_token:token,
            goods_type_name:values.goods_type_name,
            sort_order:values.sort_order,
            goods_class_id:arr[0],
            goods_class_name:arr[1]
        };
        for(let i=0;i<values['brand_id'].length;i++ ){
            obj["brand_id["+i+"]"] = values['brand_id'][i];
        }
        for(let j=0;j<values['goods_spec_id'].length;j++ ){
            obj["goods_spec_id["+j+"]"] = values['goods_spec_id'][j];
        }
        let k = 0;
        for(let key in values){
            if(typeof key == 'string'){
                if(key.slice(0,key.length-1)=='ais_show'||key.slice(0,key.length)=='ais_show'){
                    let bs =parseInt(key.slice(-1))>=0?key.slice(-1):'';
                    obj["goods_attr["+k+"][goods_attr_name]"] = values['goods_attr_name'+bs];
                    obj["goods_attr["+k+"][goods_attr_value]"] = values['goods_attr_value'+bs];
                    obj["goods_attr["+k+"][sort_order]"] = values['asort_order'+bs];
                    obj["goods_attr["+k+"][is_show]"] = values[key];
                    k++;
                }
            }
            
        }

        let l = 0;
        for(let key in values){
            if(typeof key == 'string'){
                if(key.slice(0,key.length-1)=='goods_type_custom'||key.slice(0,key.length)=='goods_type_custom'){
                    obj["goods_type_custom["+l+"]"] = values[key];
                    l++;
                }  
            }
        }
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.shop_goods_type/addone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    console.log(result);
                    t.data.addVisible = false;
                    t.data['goods_class_list_two'] = [];
                    t.data['goods_class_list_three'] = [];
                    Actions.getList(token,1,cb);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
    onEditorSuccess:function(token,values,Actions,page,cb,removezdId,removesxId){
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
        let obj = {
            admin_token:token,
            goods_type_id:values.goods_type_id,
            goods_type_name:values.goods_type_name,
            sort_order:values.sort_order,
            goods_class_id:arr[0],
            goods_class_name:arr[1],
            update:1
        };
        removezdId.map(function(item,index){
            obj["goods_type_custom["+item+"][del]"] = 1;
        })

        removesxId.map(function(item,index){
            obj["goods_attr_del["+index+"]"] = item;
        })

        for(let i=0;i<values['brand_id'].length;i++ ){
            obj["brand_id["+i+"]"] = values['brand_id'][i];
        }
         for(let j=0;j<values['goods_spec_id'].length;j++ ){
            obj["goods_spec_id["+j+"]"] = values['goods_spec_id'][j];
        }
        let k = 0;
        for(let key in values){
            if(typeof key == 'string'){
                if(key.slice(0,key.length-1)=='goods_attr_name'||key.slice(0,key.length)=='goods_attr_name'){

                    let bs =parseInt(key.slice(-1))>=0?key.slice(-1):'';
                    obj["goods_attr["+k+"][goods_attr_name]"] = values[key];
                    obj["goods_attr["+k+"][goods_attr_value]"] = values['goods_attr_value'+bs];
                    obj["goods_attr["+k+"][sort_order]"] = values['asort_order'+bs];
                    obj["goods_attr["+k+"][is_show]"] = values['ais_show'+bs];
                    if(values['goods_attr_id'+bs]!=undefined){
                        obj["goods_attr["+k+"][goods_attr_id]"] = values['goods_attr_id'+bs];
                        obj["goods_attr["+k+"][form_submit]"] = 1;
                    }else{
                        obj["goods_attr["+k+"][form_submit]"] = 0;
                    }
                    k++;
                }
            }     
        }
        let l = 0;
        for(let key in values){
            if(typeof key == 'string'){
                if(key.slice(0,key.length-1)=='goods_type_custom'||key.slice(0,key.length)=='goods_type_custom'){
                    let bs =parseInt(key.slice(-1))>=0?key.slice(-1):'';
                    let id =values['goods_type_custom_id'+bs];
                    if(!isNaN(parseInt(id))){
                        obj["goods_type_custom["+id+"][goods_type_custom_name]"] = values[key];
                    }else{
                        obj["goods_type_custom_new["+l+"]"] = values[key];
                        l++;
                    }
                }  
            }
        }
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.shop_goods_type/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.visible = false;
                    t.data['goods_class_list_two'] = [];
                    t.data['goods_class_list_three'] = [];
                    Actions.getList(token,page,cb);
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