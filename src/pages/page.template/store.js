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
    onAddBut:function(){
        let t = this;
        t.data.addVisible = true;
        t.updateComponent();
    },
   onGetAdminModuleList:function(token,page){
       let t = this;
       let obj = qs.stringify({
            admin_token:token,
            page:page,
            page_size:10
       });
       fetch(urlhttp+"/admin.module/layoutlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
       }})
           .then(function(response){
               return response.json();
           }).then(function(result){
            if(result.error==""){
                t.data.list = addKeyFun(result.data["layout_list"]);
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
    onAddPageTemplate:function(token,values,Actions){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            layout_name:values.layout_name,
            layout_desc:values.layout_desc,
            sort_order:values.sort_order
       });
        fetch(urlhttps+"/admin.module/layoutadd",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
       }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.addVisible = false;
                    Actions.getAdminModuleList(token,1);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }  
        });
    },
    onGetEditorAdminModule:function(token,id){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            layout_id:id,
            update:0
       });
        fetch(urlhttps+"/admin.module/layoutedit",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.editorOne = result.data;
                    t.data.visible = true;
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
        });
    },
    onEditorSuccess:function(token,values,Actions,page){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            layout_id:values.layout_id,
            layout_style_name:values.layout_style_name,
            layout_desc:values.layout_desc,
            sort_order:values.sort_order,
            update:1
       });
        fetch(urlhttps+"/admin.module/layoutedit",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.visible = false;
                    Actions.getAdminModuleList(token,page);
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