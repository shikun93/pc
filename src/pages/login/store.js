/**
 * Created by Administrator on 2017/4/6.
 */
import Reflux from 'reflux';
import Actions from './action';
import {hashHistory} from 'react-router';
import {urlhttp,urlhttps} from '../../app/url';
import qs from 'qs';


var Store =  Reflux.createStore({
    //监听所有的actions
    listenables: [Actions],
    data: {
        username:"",
        password:"",
        checkbox:false
    },
    getInitialState: function() {
        return this.data;
    },
    updateComponent: function() {
        this.trigger(this.data);
    },
    onGetChange:function(inputtype,value){
        let t = this;
        if(inputtype == "text"){
            t.data.username =value;
        }else if(inputtype == "password"){
            t.data.password =value;
        }else if(inputtype == "all"){
           t.data.username =value.username; 
           t.data.password =value.password;
        }else{
            t.data.checkbox = value==="false"?true:false;
        }
        t.updateComponent();
    },
    onLoading:function(bol,cb){
        let t = this;
        let obj = qs.stringify({
            admin_name:t.data.username,
            admin_password:t.data.password
        });
        fetch(urlhttps+"/admin.login/login",{method:"post",body:obj,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        .then(function(response){
            return response.json();
        }).then(function(result){
                if(result.error==""){
                    if(bol){
                        let date = new Date();
                        date.setTime(date.getTime()+(7*24*60*60*1000));
                        document.cookie = "username="+t.data.username+"&password="+t.data.password+";expires="+date.toGMTString();
                    }
                    sessionStorage.setItem("admin_token",result.data.admin_token);
                    hashHistory.push("/main/home");
                    t.updateComponent();
                }else{
                    cb(result.error);
                }
               
        }).catch(function(error){
            console.log(error);
        });
    }
});
module.exports = Store;