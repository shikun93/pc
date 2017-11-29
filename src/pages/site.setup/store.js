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
    onSiteSetting:function(token,values,Actions,Modal){
        let t = this;
        let obj;
        if(values){
            // obj = qs.stringify({
            //     admin_token:token,
            //     site_name:values.site_name,
            //     icp_number:values.icp_number,
            //     site_status:values.site_status?1:0,
            //     closed_reason:values.closed_reason,
            //     email_type:1,
            //     update:1
            // }); 
            values.site_status = values.site_status?1:0;
            obj = qs.stringify(Object.assign(values,{admin_token:token,email_type:1,update:1}));
        }else{
            obj = qs.stringify({
                admin_token:token,
                update:0
            });
        }
        fetch(urlhttp+"/admin.system_setting/editsystemsetting",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    if(result.data ==1){
                        Actions.siteSetting(token);
                        const modal = Modal.success({
                            title: '保存成功',
                            content: '页面1s后自动关闭',
                        });
                        setTimeout(() => modal.destroy(), 1000);
                    }else{
                        let data = result.data;
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
    getInitialState: function() {
        return this.data;
    },
    updateComponent: function() {
        this.trigger(this.data);
    }
});
module.exports = Store;