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
          total:10,
          current:1,
          addVisible:false,
          editVisible:false,
          getOneList:{
            init_setting:{
                customer_service:{},
                page_url:{}
            },
            printer_seller_id:'',
            printer_seller_name:''
          }
    },
    getInitialState: function() {
        return this.data;
    },
    updateComponent: function() {
        this.trigger(this.data);
    },
    onGetPrinterSeller:function(token,page,cb){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            page:page
        });
        fetch(urlhttp+"/admin.printer_seller/getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
            if(result.error == ""){
                t.data.list = result.data['printer_seller_list'];
                t.data.total = result.ext['total_num'];
                t.data.current =parseInt(page);
                t.updateComponent();  
            }else if(result.error ==="请登陆"){
                hashHistory.push("/");
            }else{
                cb(result.error);
            }
          
        });
    },
    onAddShow:function(){
        let t = this;
        t.data.addVisible = true;
        t.updateComponent();  
    },
    onEditShow:function(token,id,cb){
        let t = this;
       
        let obj = qs.stringify({
            admin_token:token,
            printer_seller_id:id,
            update:0
        });
        fetch(urlhttp+"/admin.printer_seller/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
            if(result.error == ""){
                t.data.getOneList = result.data['printer_seller_info'];
                t.updateComponent();  
            }else{
                cb(result.error);
            }
          
        });
        t.data.editVisible = true;
        t.updateComponent();  
    },
    onCancal:function(){
        let t = this;
        t.data.addVisible = false;
         t.data.editVisible = false;
        t.updateComponent();  
    },
    onAddPrinterSeller:function(token,values,Actions,cb,current){
        let t = this;
        let obj = {};
        obj.admin_token = token;
        for(let key in values){
            if(key !="printer_seller_id"){
                obj[key] = values[key];
            }
        }
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.printer_seller/addone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
            if(result.error == ""){
                Actions.getPrinterSeller(token,current,cb);
                t.data.addVisible = false;
                t.updateComponent();  
            }else{
                cb(result.error);
            }
          
        });
    },
    onEditPrinterSeller:function(token,values,Actions,cb,current){
        let t = this;
        let obj = {};
        obj.admin_token = token;
        for(let key in values){
            obj[key] = values[key];  
        }
        obj.update = 1;
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.printer_seller/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
            if(result.error == ""){
                Actions.getPrinterSeller(token,current,cb);
                t.data.editVisible = false;
                t.updateComponent();  
            }else{
                cb(result.error);
            }
          
        });
    }
});
module.exports = Store;