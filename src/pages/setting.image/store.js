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
      typeStr:'',
      imageObj:{}
    },
    onSettingType:function(token,cb,values,Actions,Modal){
        let t = this;
        let obj = {
            admin_token:token,
            update:0
        };
        if(values){
            obj.image_dir_type = values.image_dir_type;
            obj.update = 1;
        }
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.shop_setting/edituploadimagedirsetting",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    if(result.data ==1){
                        Actions.settingType(token,cb);
                        const modal = Modal.success({
                            title: '保存成功',
                            content: '页面1s后自动关闭',
                        });
                        setTimeout(() => modal.destroy(), 1000);
                    }else{
                        let obj = result.data;
                        t.data.typeStr = result.data.image_dir_type.value;
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
    onSettingImage:function(token,cb,values,Actions,Modal){
        let t = this;
        let obj = {
            admin_token:token,
            update:0
        };
        if(values){
            let n1 = values.default_goods_image.length-1;
            let n2 = values.default_store_logo.length-1;
            let n3 = values.default_store_avatar.length-1;
            let n4 = values.default_member_avatar.length-1;
            obj.default_goods_image = values.default_goods_image[n1].url?values.default_goods_image[n1].url:values.default_goods_image[n1].response.data.file;
            obj.default_store_logo = values.default_store_logo[n2].url?values.default_store_logo[n2].url:values.default_store_logo[n2].response.data.file;
            obj.default_store_avatar = values.default_store_avatar[n3].url?values.default_store_avatar[n3].url:values.default_store_avatar[n3].response.data.file;
            obj.default_member_avatar = values.default_member_avatar[n4].url?values.default_member_avatar[n4].url:values.default_member_avatar[n4].response.data.file;
            obj.update = 1;
        }
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.shop_setting/editdefaultimagesetting",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    if(result.data ==1){
                        Actions.settingImage(token,cb);
                        const modal = Modal.success({
                            title: '保存成功',
                            content: '页面1s后自动关闭',
                        });
                        setTimeout(() => modal.destroy(), 1000);
                    }else{
                        let obj = result.data;
                        obj.default_goods_image = [{
                            uid: 1,
                            status: 'done',
                            url: obj.default_goods_image.value
                        }];
                        obj.default_store_logo = [{
                            uid: 1,
                            status: 'done',
                            url: obj.default_store_logo.value
                        }];
                        obj.default_store_avatar = [{
                            uid: 1,
                            status: 'done',
                            url: obj.default_store_avatar.value
                        }];
                        obj.default_member_avatar = [{
                            uid: 1,
                            status: 'done',
                            url: obj.default_member_avatar.value
                        }];
                        t.data.imageObj = obj;
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