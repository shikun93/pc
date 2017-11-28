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
   onGetLayoutStyleList:function(token,page,id){
       let t = this;
       let obj = qs.stringify({
            admin_token:token,
            layout_id:id,
            page_size:10,
            page:page
       });
       fetch(urlhttp+"/admin.module/stylelist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
       }})
           .then(function(response){
               return response.json();
           }).then(function(result){
            if(result.error==""){
                t.data.list = addKeyFun(result.data["style_list"]);
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
    onAddLayoutStyle:function(token,values,id,Actions){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            layout_id:id,
            layout_style_name:values.layout_style_name,
            layout_style_desc:values.layout_style_desc,
            sort_order:values.sort_order
        });
        fetch(urlhttps+"/admin.module/styleadd",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.addVisible = false;
                    Actions.getLayoutStyleList(token,1,id);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
            
        });
    },
    onGetEditorLayout:function(token,id){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            layout_style_id:id,
            update:0
        });
        fetch(urlhttps+"/admin.module/styleedit",{method:"post",body:obj,headers:{
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
    onEditorSuccess:function(token,values,Actions,page,id){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            layout_style_id:values.layout_style_id,
            layout_style_desc:values.layout_style_desc,
            sort_order:values.sort_order,
            update:1
        });
        fetch(urlhttps+"/admin.module/styleedit",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.visible = false;
                    Actions.getLayoutStyleList(token,page,id);
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