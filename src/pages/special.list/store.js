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
   onGetSpecialList:function(token,page,id){
       let t = this;
       let obj = qs.stringify({
            admin_token:token,
            page:page,
            layout_style_id:id,
            page_size:10
       });
       fetch(urlhttp+"/admin.module/speciallist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
       }})
           .then(function(response){
               return response.json();
           }).then(function(result){
            if(result.error==""){
                t.data.list = addKeyFun(result.data["special_list"]);
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
    onAddSpecialList:function(token,values,Actions,id){
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
            layout_style_id:id,
            layout_special_name:values.layout_special_name,
            layout_special_desc:values.layout_special_desc,
            start_time:starTtime,
            end_time:endtime,
            is_show:values.is_show,
            sort_order:values.sort_order
        });
        fetch(urlhttps+"/admin.module/specialadd",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.addVisible = false;
                    Actions.getSpecialList(token,1,id);
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
            
        });
    },
    onGetEditorSpecial:function(token,id){
        let t = this;
        let obj = qs.stringify({
            admin_token:token,
            layout_special_id:id,
            update:0
        });
        fetch(urlhttps+"/admin.module/specialedit",{method:"post",body:obj,headers:{
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
            layout_style_id:values.layout_style_id,
            layout_special_name:values.layout_special_name,
            layout_special_desc:values.layout_special_desc,
            start_time:starTtime,
            end_time:endtime,
            is_show:values.is_show,
            sort_order:values.sort_order,
            update:1
        });
        fetch(urlhttps+"/admin.module/specialedit",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.visible = false;
                    Actions.getSpecialList(token,page,id);
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