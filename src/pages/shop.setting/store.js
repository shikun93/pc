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
      formObj:{
        member_logo:[],
        seller_center_logo:[],
        site_logo:[],
        site_email:'',
        site_phone:''
      }
    },
    onSetting:function(token,cb,values,Actions,Modal){
        let t = this;
        let obj = {
            admin_token:token,
            update:0
        };
        if(values){
            obj.site_logo = values.site_logo[0].url?values.site_logo[0].url:values.site_logo[0].response.data.file;
            obj.member_logo = values.member_logo[0].url?values.member_logo[0].url:values.member_logo[0].response.data.file;
            obj.seller_center_logo = values.seller_center_logo[0].url?values.seller_center_logo[0].url:values.seller_center_logo[0].response.data.file;
            obj.site_phone = values.site_phone;
            obj.site_email = values.site_email;
            obj.update = 1;
        }
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.shop_setting/editshopsetting",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    if(result.data ==1){
                        Actions.setting(token,cb);
                        const modal = Modal.success({
                            title: '保存成功',
                            content: '页面1s后自动关闭',
                        });
                        setTimeout(() => modal.destroy(), 1000);
                    }else{
                        let obj = result.data;
                        obj.member_logo = [{
                            uid: 1,
                            status: 'done',
                            url: obj.member_logo.value
                        }];
                        obj.seller_center_logo = [{
                            uid: 1,
                            status: 'done',
                            url: obj.seller_center_logo.value
                        }];
                        obj.site_logo = [{
                            uid: 1,
                            status: 'done',
                            url: obj.site_logo.value
                        }];
                        obj.site_email = obj.site_email.value;
                        obj.site_phone = obj.site_phone.value;
                        t.data.formObj = obj;
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