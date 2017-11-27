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
        total:10,
        values:{}
    },
    onGetAdminLog:function(token,values,page){
        let t = this;
        let arr = [];
        
        let obj = qs.stringify({
            admin_token:token,
            admin_name:values.admin_name?values.admin_name:'',
            keywords:values.keywords?values.keywords:'',
            ip:values.ip?values.ip:'',
            start_time:values.start_time?values.start_time:'',
            end_time:values.end_time?values.end_time:'',
            page:page,
            page_size:10
        });
        fetch(urlhttp+"/admin.admin/adminloglist",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.list = addKeyFun(result.data["log_list"]);
                    t.data.total = result.ext["total_num"];
                    t.data.current = page;
                    t.data.values = values;
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
            
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