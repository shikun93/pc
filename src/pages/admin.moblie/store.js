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
        addJurisdiction:[],
        editorAdminData:{},
        checkedKeys:"",
        current:1
    },
    onAddBut:function(){
        let  t = this;
        t.data.addVisible = true;
        t.updateComponent();
    },
    onGetAdminGroupList:function(token,page,cb){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            page:page,
            page_size:10
        });
        fetch(urlhttp+"/admin.mobile_special/getlist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                     t.data.list = result.data["mobile_special_list"];
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
    onEditorList:function(token,id,cb){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            mobile_special_id:id,
            update:0
        });
        fetch(urlhttp+"/admin.mobile_special/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.visible = true;
                    t.data.editorAdminData = result.data["mobile_special_info"];
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
        let starTtime =new Date(values["start_time"]);
        let startfullYear =starTtime.getFullYear();
        let startmonth =starTtime.getMonth()>8?(starTtime.getMonth()+1):("0"+starTtime.getMonth());
        let startdate =starTtime.getDate()<10?("0"+starTtime.getDate()):starTtime.getDate();
        let starthours =starTtime.getHours()<10?("0"+starTtime.getHours()):starTtime.getHours();
        let startminutes =starTtime.getMinutes()<10?("0"+starTtime.getMinutes()):starTtime.getMinutes();
        let startseconds =starTtime.getSeconds()<10?("0"+starTtime.getSeconds()):starTtime.getSeconds();
        starTtime =startfullYear+"-"+startmonth+"-"+startdate+" "+starthours+":"+startminutes+":"+startseconds;
        let endtime =new Date(values["end_time"]);
        let endfullYear =endtime.getFullYear();
        let endmonth =endtime.getMonth()>8?(endtime.getMonth()+1):("0"+endtime.getMonth());
        let enddate =endtime.getDate()<10?("0"+endtime.getDate()):endtime.getDate();
        let endhours =endtime.getHours()<10?("0"+endtime.getHours()):endtime.getHours();
        let endminutes =endtime.getMinutes()<10?("0"+endtime.getMinutes()):endtime.getMinutes();
        let endseconds =endtime.getSeconds()<10?("0"+endtime.getSeconds()):endtime.getSeconds();
        endtime =endfullYear+"-"+endmonth+"-"+enddate+" "+endhours+":"+endminutes+":"+startseconds;

        let obj = qs.stringify({
            admin_token:token,
            mobile_special_id:values.mobile_special_id,
            mobile_special_name:values.mobile_special_name,
            start_time:starTtime,
            end_time:endtime,
            is_show:values.is_show,
            special_desc:values.special_desc
        });
        fetch(urlhttp+"/admin.mobile_special/addone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.addVisible = false;
                    Actions.getAdminGroupList(token,1,cb);
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
        let starTtime =new Date(values["start_time"]);
        let startfullYear =starTtime.getFullYear();
        let startmonth =starTtime.getMonth()>8?(starTtime.getMonth()+1):("0"+starTtime.getMonth());
        let startdate =starTtime.getDate()<10?("0"+starTtime.getDate()):starTtime.getDate();
        let starthours =starTtime.getHours()<10?("0"+starTtime.getHours()):starTtime.getHours();
        let startminutes =starTtime.getMinutes()<10?("0"+starTtime.getMinutes()):starTtime.getMinutes();
        let startseconds =starTtime.getSeconds()<10?("0"+starTtime.getSeconds()):starTtime.getSeconds();
        starTtime =startfullYear+"-"+startmonth+"-"+startdate+" "+starthours+":"+startminutes+":"+startseconds;
        let endtime =new Date(values["end_time"]);
        let endfullYear =endtime.getFullYear();
        let endmonth =endtime.getMonth()>8?(endtime.getMonth()+1):("0"+endtime.getMonth());
        let enddate =endtime.getDate()<10?("0"+endtime.getDate()):endtime.getDate();
        let endhours =endtime.getHours()<10?("0"+endtime.getHours()):endtime.getHours();
        let endminutes =endtime.getMinutes()<10?("0"+endtime.getMinutes()):endtime.getMinutes();
        let endseconds =endtime.getSeconds()<10?("0"+endtime.getSeconds()):endtime.getSeconds();
        endtime =endfullYear+"-"+endmonth+"-"+enddate+" "+endhours+":"+endminutes+":"+startseconds;
        
        let obj = qs.stringify({
            admin_token:token,
            mobile_special_id:values.mobile_special_id,
            mobile_special_name:values.mobile_special_name,
            start_time:starTtime,
            end_time:endtime,
            is_show:values.is_show,
            special_desc:values.special_desc,
            update:1
        });
        fetch(urlhttp+"/admin.mobile_special/editone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.visible = false;
                    Actions.getAdminGroupList(token,page,cb);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
            
        }).catch(function(error){
            console.log(error);
        });
    },
    onDeleteOne:function(token,id,Actions,page,cb){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            mobile_special_id:id
        });
        fetch(urlhttp+"/admin.mobile_special/delone",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    Actions.getAdminGroupList(token,page,cb);
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