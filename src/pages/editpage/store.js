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
        arrHtml:[],
        getCarouseData:{},
        getFlexData:{},
        getFmodulData:{},
        getTitleImgData:{},
        addVisible:false,
        flexVisible:false,
        titleImgVisible:false,
        fmodulShowVisible:false,
        recviseVisible:false,
        recviseVisible1:false,
        recviseVisible2:false,
        recviseVisible3:false,
        updateGetData:false
    },
    onCancal:function(){
        let t = this;
        t.data.addVisible=false;
        t.data.flexVisible=false;
        t.data.titleImgVisible=false;
        t.data.fmodulShowVisible=false;
        t.data.recviseVisible=false;
        t.data.recviseVisible1=false;
        t.data.recviseVisible2=false;
        t.data.recviseVisible3=false;
        t.data.updateGetData=false;
        t.updateComponent();
    },
    onUpdatebol:function(){
        let t =this;
        if(t.data.updateGetData){
            t.data.updateGetData =false;
        }else{
            t.data.updateGetData =true;
        }
        t.data.addVisible=false;
        t.data.flexVisible=false;
        t.data.titleImgVisible=false;
        t.data.fmodulShowVisible=false;
        t.data.recviseVisible=false;
        t.data.recviseVisible1=false;
        t.data.recviseVisible2=false;
        t.data.recviseVisible3=false;
        t.updateComponent();
    },
    onShow:function(){
        let t =this;
        t.data.addVisible = true;
        t.updateComponent();
    },
    onFlexShow:function(){
        let t =this;
        t.data.flexVisible = true;
        t.updateComponent();
    },
    onFmodulShow:function(){
        let t =this;
        t.data.fmodulShowVisible = true;
        t.updateComponent();
    },
    onTitleImgShow:function(){
        let t =this;
        t.data.titleImgVisible = true;
        t.updateComponent();
    },
    onRemoveModul:function(token,id,Actions,cb){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            layout_special_item_id:id
        });
        fetch(urlhttp+"/admin.mobile_special/delitem",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    Actions.updatebol();    
                }else{
                    cb(result.error);
                }
            
        }).catch(function(error){
            console.log(error);
        });
    },
    onLoseModul:function(token,id,bol,Actions,cb){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            layout_special_item_id:id,
            is_show:bol,
            update:1
        });
        fetch(urlhttp+"/admin.mobile_special/edititem",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    Actions.updatebol();  
                }else{
                    cb(result.error);
                }
            
        }).catch(function(error){
            console.log(error);
        });
    },
    onOrderModul:function(token,id,mode,Actions,cb){
        let t = this;
        let arr =[];
        let list = sessionStorage.getItem("list_order").split(",");
        let index = list.indexOf(id);
        if(mode == "upper"&&index !=0){
            list[index-1] = [list[index],list[index]=list[index-1]][0];
        }else if(index !=list.length-1){
            list[index] = [list[index+1],list[index+1]=list[index]][0];
        }
        let obj = qs.stringify({
            admin_token:token,
            item_order:list.join(",")
        });
        fetch(urlhttp+"/admin.mobile_special/edititemorder",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    Actions.updatebol();
                }else{
                    cb(result.error);
                }
            
        }).catch(function(error){
            console.log(error);
        });
    },
    onSetCarousel:function(token,values,id,Actions,cb){
        let t = this;
        let obj = {};
        obj.admin_token = token;
        for(let i =1;i<=5;i++){
            if(values["title"+i]!=""&&values["href"+i]!=""){
                let img =values.upload[i-1];
                obj["item_data[name"+i+"]"] = img.name;
                img =img.response.data.url;
                obj["item_data[pic1_ur"+i+"]"] = img;
                obj["item_data[title"+i+"]"] = values["title"+i];
                obj["item_data[href"+i+"]"] = values["href"+i];
                
            }
        }
        obj.is_show = values.is_show;
        obj.item_type = values.item_type;
        obj.layout_special_id = id;
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.mobile_special/additem",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    Actions.updatebol(); 
                }else{
                    cb(result.error);
                }
            
        }).catch(function(error){
            console.log(error);
        });
    },
    onEditCarousel:function(token,values,Actions,cb){
        let t = this;
        let obj ={};
        obj.admin_token = token;
        for(let i =1;i<=5;i++){
            if(values["title"+i]!=undefined&&values["href"+i]!=undefined){
                let img =values.upload[i-1];
                obj["item_data[name"+i+"]"] = img.name;
                if(img.response){
                    img =img.response.data.url;
                }else{
                    img =img.url;
                }
                obj["item_data[pic1_ur"+i+"]"] = img;
                obj["item_data[title"+i+"]"] = values["title"+i];
                obj["item_data[href"+i+"]"] = values["href"+i];
            }  
        }
        obj.is_show = values.is_show;
        obj.item_type = values.item_type;
        obj.layout_special_item_id = values.layout_special_item_id;
        obj.update = 1;
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.mobile_special/edititem",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    Actions.updatebol();  
                }else{
                    cb(result.error);
                }
                
        }).catch(function(error){
            console.log(error);
        });
    },
    onAddFlex:function(token,values,id,Actions,cb){
        let t = this;
        let num = sessionStorage.getItem("num");
        let obj = {};
        obj.admin_token = token;
        for(let i =1;i<=num;i++){
            let img =values.upload[i-1];
            obj["item_data[name"+i+"]"] = img.name;
            img =img.response.data.url;
            obj["item_data[pic1_ur"+i+"]"] = img;
            obj["item_data[title"+i+"]"] = values["title"+i];
            obj["item_data[href"+i+"]"] = values["href"+i];
            obj["item_data[details"+i+"]"] = values["details"+i];
        }
        obj.is_show = values.is_show;
        obj.item_type = values.item_type;
        obj.layout_special_id = id;
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.mobile_special/additem",{method:"post",body:obj,headers:{
           "Content-Type":"application/x-www-form-urlencoded" 
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    sessionStorage.removeItem('num');  
                    Actions.updatebol();
                }else{
                    cb(result.error);
                }
            
        }).catch(function(error){
            console.log(error);
        });
    },
    onEditFlex:function(token,values,Actions,cb){
        let t = this;
        let num = sessionStorage.getItem("num");
        let obj = {};
        obj.admin_token = token;
        for(let i =1;i<=num;i++){
            let img =values.upload[i-1];
            obj["item_data[name"+i+"]"] = img.name;
            if(img.response){
                img =img.response.data.url;
            }else{
                img =img.url;
            }
            obj["item_data[pic1_ur"+i+"]"] = img;
            obj["item_data[title"+i+"]"] = values["title"+i];
            obj["item_data[href"+i+"]"] = values["href"+i];
            obj["item_data[details"+i+"]"] = values["details"+i];
        }
        obj.is_show = values.is_show;
        obj.item_type = values.item_type;
        obj.layout_special_item_id = values.layout_special_item_id;
        obj.update = 1;
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.mobile_special/edititem",{method:"post",body:obj,headers:{
           "Content-Type":"application/x-www-form-urlencoded" 
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                     sessionStorage.removeItem('num');
                    Actions.updatebol();
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });
    },
     onAddFmodul:function(token,values,id,Actions,cb){
        let t = this;
        let obj = {};
        obj.admin_token = token;
        for(let i =1;i<=3;i++){
            let img =values.upload[i-1];
            obj["item_data[name"+i+"]"] = img.name;
            img =img.response.data.url;
            obj["item_data[pic1_ur"+i+"]"] = img;
            obj["item_data[href"+i+"]"] = values["href"+i];
        }
        obj.is_show = values.is_show;
        obj["item_data[fmodul_type]"] = values.fmodul_type;
        obj.item_type = values.item_type;
        obj.layout_special_id = id;
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.mobile_special/additem",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded" 
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    Actions.updatebol();
                }else{
                    cb(result.error);
                }
            
        }).catch(function(error){
            console.log(error);
        });
    },
    onEditFmodul:function(token,values,Actions,cb){
        let t = this;
        let obj = {};
        obj.admin_token = token;
        for(let i =1;i<=3;i++){
            let img =values.upload[i-1];
            obj["item_data[name"+i+"]"] = img.name;
            if(img.response){
                img =img.response.data.url;
            }else{
                img =img.url;
            }
           obj["item_data[pic1_ur"+i+"]"] = img;
           obj["item_data[href"+i+"]"] = values["href"+i];
        }
        obj.is_show = values.is_show;
        obj["item_data[fmodul_type]"] = values.fmodul_type;
        obj.item_type = values.item_type;
        obj.layout_special_item_id = values.layout_special_item_id;
        obj.update = 1;
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.mobile_special/edititem",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded" 
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){  
                if(result.error==""){
                     Actions.updatebol();     
                 }else{
                    cb(result.error);
                 }
           
        }).catch(function(error){
            console.log(error);
        });
    },
     onAddTitleImg:function(token,values,id,Actions,cb){
        let t = this;
        let obj = {};
        let img =values.upload[0];
        obj.admin_token = token;
        obj["item_data[name]"] = img.name;
        img =img.response.data.url;
        obj["item_data[pic1_ur]"] = img;
        obj["item_data[title]"] = values.title;
        obj["item_data[href]"] = values.href;
        obj["item_data[details]"] = values.details;
        obj["item_data[titleImg_type]"] = values.titleImg_type;
        obj.item_type = values.item_type;
        obj.is_show = values.is_show;
        obj.layout_special_id = id;
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.mobile_special/additem",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded" 
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                     Actions.updatebol(); 
                }else{
                    cb(result.error);
                }
              
        }).catch(function(error){
            console.log(error);
        });
    },
    onEditTitleImg:function(token,values,Actions,cb){
        let t = this;
        let obj = {};
        let img =values.upload[0];
        obj.admin_token = token;
        obj["item_data[name]"] = img.name;
        img =img.response.data.url;
        obj["item_data[pic1_ur]"] = img;
        obj["item_data[title]"] = values.title;
        obj["item_data[href]"] = values.href;
        obj["item_data[details]"] = values.details;
        obj["item_data[titleImg_type]"] = values.titleImg_type;
        obj.item_type = values.item_type;
        obj.is_show = values.is_show;
        obj.layout_special_item_id = values.layout_special_item_id;
        obj.update = 1;
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.mobile_special/edititem",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded" 
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){ 
                if(result.error==""){
                    Actions.updatebol(); 
                }else{
                    cb(result.error);
                }
            
        }).catch(function(error){
            console.log(error);
        });
    },
    onRecviseFlex:function(token,id,cb){
        let t = this;
        let i=1,imgObj = [];
        let obj = qs.stringify({
            admin_token:token,
            update:0,
            layout_special_item_id:id
        });
        fetch(urlhttp+"/admin.mobile_special/edititem",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
            let allData = result.data["mobile_special_item"];
            for(let key in allData["item_data"]){
                if(("pic1_ur"+i) ==key){
                    imgObj.push({
                        uid:i,
                        name:allData["item_data"]["name"+i],
                        status: 'done',
                        url:allData["item_data"]["pic1_ur"+i],
                        thumbUrl:allData["item_data"]["pic1_ur"+i]
                    });
                    i++;    
                }
            }  
            let data =allData["item_data"];
            data["is_show"] =allData["is_show"];
            data["item_type"] =allData["item_type"];
            data["mobile_special_item_id"] =allData["mobile_special_item_id"];
            data["imgObj"] =imgObj; 
            t.data.recviseVisible1 = true;
            t.data.getFlexData = data;
            sessionStorage.setItem("num",i-1);    
            t.updateComponent();
        }else{
            cb(result.error);
        }
        }).catch(function(error){
            console.log(error);
        });
    },
     onRecviseCarouse:function(token,id,cb){
        let t = this;
        let i=1,imgObj = [];
        let obj = qs.stringify({
            admin_token:token,
            update:0,
            layout_special_item_id:id
        });
        fetch(urlhttp+"/admin.mobile_special/edititem",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
            let allData = result.data["mobile_special_item"];

            for(let key in allData["item_data"]){
                if(("pic1_ur"+i) ==key){
                    imgObj.push({
                        uid:i,
                        name:allData["item_data"]["name"+i],
                        status: 'done',
                        url:allData["item_data"]["pic1_ur"+i],
                        thumbUrl:allData["item_data"]["pic1_ur"+i]
                    });
                    i++;    
                }
            }  
             let data =allData["item_data"];
             data["is_show"] =allData["is_show"];
            data["item_type"] =allData["item_type"];
            data["mobile_special_item_id"] =allData["mobile_special_item_id"];
             data["imgObj"] =imgObj; 
            t.data.recviseVisible = true;
             t.data.getCarouseData = data;
            t.updateComponent();
        }else{
            cb(result.error);
        }
        }).catch(function(error){
            console.log(error);
        });
    },
    onRecviseFmodul:function(token,id,cb){
        let t = this;
        let i=1,imgObj = [];
        let obj = qs.stringify({
            admin_token:token,
            update:0,
            layout_special_item_id:id
        });
        fetch(urlhttp+"/admin.mobile_special/edititem",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
            let allData = result.data["mobile_special_item"];
            for(let key in allData["item_data"]){
                if(("pic1_ur"+i) ==key){
                    imgObj.push({
                        uid:i,
                        name:allData["item_data"]["name"+i],
                        status: 'done',
                        url:allData["item_data"]["pic1_ur"+i],
                        thumbUrl:allData["item_data"]["pic1_ur"+i]
                    });
                    i++;    
                }
            }  
            let data =allData["item_data"];
            data["is_show"] =allData["is_show"];
            data["item_type"] =allData["item_type"];
            data["mobile_special_item_id"] =allData["mobile_special_item_id"];
            data["imgObj"] =imgObj; 
            t.data.recviseVisible2 = true;
            t.data.getFmodulData = data;
            t.updateComponent();
        }else{
            cb(result.error);
        }
        }).catch(function(error){
            console.log(error);
        });
    },
    onRecviseTitleImg:function(token,id,cb){
        let t = this;
        let i=1,imgObj = [];
        let obj = qs.stringify({
            admin_token:token,
            update:0,
            layout_special_item_id:id
        });
        fetch(urlhttp+"/admin.mobile_special/edititem",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
            let allData = result.data["mobile_special_item"];
            imgObj.push({
                uid:i,
                name:allData["item_data"]["name"],
                status: 'done',
                url:allData["item_data"]["pic1_ur"],
                thumbUrl:allData["item_data"]["pic1_ur"]
            });
             
            let data =allData["item_data"];
            data["is_show"] =allData["is_show"];
            data["item_type"] =allData["item_type"];
            data["mobile_special_item_id"] =allData["mobile_special_item_id"];
            data["imgObj"] =imgObj; 
            t.data.recviseVisible3 = true;
            t.data.getTitleImgData = data;
            t.updateComponent();
        }else{
            cb(result.error);
        }
        }).catch(function(error){
            console.log(error);
        });
    },
    onGetAllItem:function(token,id,aType,bType,cType,dType,cb){
        let t = this;
        let list = [],arrHtml=[];
        let obj = qs.stringify({
            admin_token:token,
            update:0,
            mobile_special_id:id
        });
        fetch(urlhttp+"/admin.mobile_special/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                let data = result.data["mobile_special_info"];
                data["item_list"].map(function(item,index){
                    switch(item["item_type"]){
                        case "a":
                            let arr = [];
                            for(let i =1;i<=5;i++){
                                if(item["item_data"]["title"+i]!=undefined&&item["item_data"]["href"+i]!=undefined&&item["item_data"]["pic1_ur"+i] !=undefined){
                                    arr.push({title:item["item_data"]["title"+i],rootUrl:item["item_data"]["href"+i],imageUrl:item["item_data"]["pic1_ur"+i]})
                                }
                            }
                            list.push(item["mobile_special_item_id"]);
                            item.arr = arr;
                            aType.call(t,item,arrHtml);
                            break;
                        case "b":
                            let arr1 = [];
                            for(let i =1;i<=4;i++){
                                if(item["item_data"]["title"+i]!=undefined ||item["item_data"]["href"+i]!=undefined||item["item_data"]["pic1_ur"+i]!=undefined){
                                    arr1.push({title:item["item_data"]["title"+i],rootUrl:item["item_data"]["href"+i],imageUrl:item["item_data"]["pic1_ur"+i]})
                                }    
                            }
                            list.push(item["mobile_special_item_id"]);
                            item.arr = arr1;
                            bType.call(t,item,arrHtml);
                            break;
                        case "c":
                            let arr2 = [],n;
                            for(let i =1;i<=3;i++){
                                arr2.push({rootUrl:item["item_data"]["href"+i],imageUrl:item["item_data"]["pic1_ur"+i]});
                            }
                            console.log(item["mobile_special_item_id"]);
                            list.push(item["mobile_special_item_id"]);
                            item.arr = arr2;
                            n =item["item_data"]["fmodul_type"];
                            cType.call(t,item,n,arrHtml);
                            break;
                        case "d":
                            let obj1={},n1;
                            for(let i =1;i<=3;i++){
                                obj1 = {title:item["item_data"]["title"],rootUrl:item["item_data"]["href"],imageUrl:item["item_data"]["pic1_ur"],details:item["item_data"]["details"]};
                            }
                            list.push(item["mobile_special_item_id"]);
                            item.imageData = obj1;
                            n1 =item["item_data"]["titleImg_type"];
                            dType.call(t,item,n1,arrHtml);
                            break;
                    }
                });
                t.data.arrHtml = arrHtml;
                sessionStorage.setItem("list_order",list);
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
    getInitialState: function() {
        return this.data;
    },
    updateComponent: function() {
        this.trigger(this.data);
    }
});
module.exports = Store;