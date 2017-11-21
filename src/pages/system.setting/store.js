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
        formData:{}
    },
    onEmailSetting:function(token,cb,values,Actions,Modal){
        let t = this;
        
        let obj;
        if(values){
            obj = qs.stringify({
                admin_token:token,
                email_addr:values.email_addr,
                email_host:values.email_host,
                email_id:values.email_id,
                email_pass:values.email_pass,
                email_port:values.email_port,
                email_type:1,
                update:1
            });
        }else{
            obj = qs.stringify({
                admin_token:token,
                update:0
            });
        }
        fetch(urlhttp+"/admin.system_setting/editemailsetting",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    if(result.data ==1){
                        Actions.emailSetting(token,cb);
                        const modal = Modal.success({
                            title: '保存成功',
                            content: '页面1s后自动关闭',
                        });
                        setTimeout(() => modal.destroy(), 1000);
                    }else{
                        t.data.formData = result.data;
                        t.updateComponent(); 
                    }
                }else if(result.error ==="请登陆"){
                   hashHistory.push('/');
                }else{
                    cb(result.error);
                }
           
        }).catch(function(error){
            console.log(error);
        });

    },
    onTestEmail:function(token,cb,values,Modal){
        let t = this;
    
        let obj = qs.stringify({
            admin_token:token,
            email_addr:values.email_addr,
            email_host:values.email_host,
            email_id:values.email_id,
            email_pass:values.email_pass,
            email_port:values.email_port,
            email_type:1,
            address:values.address
        });

        fetch(urlhttp+"/admin.system_setting/sendtestemail",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    if(result.data ==1){
                        const modal = Modal.success({
                            title: '测试成功',
                            content: '页面1s后自动关闭',
                        });
                        setTimeout(() => modal.destroy(), 1000);
                    }
                }else if(result.error ==="请登陆"){
                   hashHistory.push('/');
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