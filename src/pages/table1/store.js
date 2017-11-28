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
            length:null,
            total:null,
            current:1,
            visible:false,
            getEditorData:{},
            setAditorData:{},
            removeBol:false,
            addVisible:false,
            content:""
    },
    getInitialState: function() {
        return this.data;
    },
    updateComponent: function() {
        this.trigger(this.data);
    },
    onGetHtml:function(str){
        let t= this;
        t.data.content = str;
        t.updateComponent();
    },
    onGetSu:function(token,page){
        let t = this;
       
        let obj = qs.stringify({
            admin_token:token,
            cat:'n41',
            page:page,
            page_size:10
        });
        fetch(urlhttp+"/admin.qa/getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.list = addKeyFun(result.data["qa_list"]);
                    t.data.total = result.ext["total_num"];
                    t.data.current =parseInt(page);
                    t.updateComponent();
                }else if(result.error === "请登陆"){
                    hashHistory.push("/");
                }else{
                    cb(result.error);
                }
               
            });
    },
    onAddBol:function(){
        let  t = this;
        t.data.addVisible = true;
        t.updateComponent();
    },
    onGetAmendData:function(token,id){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            qa_id:id
        });
        fetch(urlhttp+"/admin.qa/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.getEditorData = result.data.qa;
                    t.data.visible = true;
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
            
        });
    },
    onNewlyIncreased:function(token,values,Actions,current){
        let t = this;
        
        let obj = qs.stringify({
            admin_token:token,
            cat:'n41',
            title:values.title,
            content:t.data.content,
            type:values.type,
            is_show:values.is_show,
            url:values.url,
            sort_order:values.sort_order,
            update:1,
            qa_id:values.id
        });
        fetch(urlhttp+"/admin.qa/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    Actions.getSu(token,current);
                    t.data.visible = false;
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
            
        });
    },
    onAddFormData:function(token,values,Actions){
        let t = this;
       
        let obj = qs.stringify({
            admin_token:token,
            cat:'n41',
            title:values.title,
            content:t.data.content,
            type:values.type,
            is_show:values.is_show,
            url:values.url,
            sort_order:values.sort_order
        });
        fetch(urlhttp+"/admin.qa/addone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                     Actions.getSu(token, 1);
                    t.data.addVisible = false;
                    t.data.content = "";
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
           
        });
    },
    onDeleteOne:function(token,id,Actions,current){
        let t = this;
        
        let obj = qs.stringify({
            admin_token:token,
            qa_id:id
        });
        fetch(urlhttp+"/admin.qa/delone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    Actions.getSu(token, current);
                    t.data.visible = false;
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
    }
});
module.exports = Store;