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
        current:1,
        addVisible:false,
        visible:false,
        jurisdictionList:[],
        editorAdminData:{},
        changeKeys:[],
        expandKeys:[],
        selectKeys:[],
        checkedKeys:""
    },
    onTreeChange:function(changeKeys,selectKeys,expandKeys){
        let t = this;
        if(changeKeys){
            t.data.changeKeys = changeKeys;
        }else if(expandKeys){
            t.data.expandKeys = expandKeys;
        }else{
            t.data.selectKeys = selectKeys;
        }
        t.updateComponent();
    },
    onGetChecked:function(str){
        let t = this;
        t.data.checkedKeys = str;
        t.updateComponent();
    },
    onAddBut:function(){
        let  t = this;
        t.data.addVisible = true;
        t.updateComponent();
    },
    onGetAdminGroupList:function(token,page){
        let t = this;
    
        let obj = qs.stringify({
            admin_token:token,
            page_size:10,
            page:page
        });
        fetch(urlhttp+"/admin.admin_group/getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    t.data.list = addKeyFun(result.data["admin_group_list"]);
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
    onGetPublicGetmenutree:function(token){
        let t = this;
        
        let obj = qs.stringify({
            admin_token:token
        });
        fetch(urlhttp+"/admin.admin_group/public_getmenutree",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.jurisdictionList = result.data["menu_list"];
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
            
        }).catch(function(error){
            console.log(error);
        });
    },
    onEditorList:function(token,id){
        let t = this;
        let arr =[],arr1=[];
        
        let obj = qs.stringify({
            admin_token:token,
            admin_group_id:id,
            update:0
        });
        function bianli(arr2){
            arr2.forEach(function(item){
                if(item.checked == 1){
                    arr.push(item["admin_menu_id"]);
                }else if(item.child){
                    bianli(item.child);
                }
            })
        }
        fetch(urlhttp+"/admin.admin_group/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.visible = true;
                    t.data.editorAdminData = result.data["admin_group_info"];
                    arr1 = result.data["admin_group_info"];
                    bianli(arr1["menu_list"]);
                    t.data.changeKeys = arr;
                    t.data.expandKeys = arr;
                    t.data.selectKeys = arr;
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
        delete values.admin_group_id;
        let obj = qs.stringify(Object.assign(values,{admin_token:token,rules:t.data.checkedKeys}));
    
        fetch(urlhttp+"/admin.admin_group/addone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error == ""){
                    t.data.addVisible = false;
                    Actions.getAdminGroupList(token,1);
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
        let obj = qs.stringify(Object.assign(values,{admin_token:token,rules:t.data.checkedKeys,update:1}));
        fetch(urlhttp+"/admin.admin_group/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.visible = false;
                    Actions.getAdminGroupList(token,page);
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