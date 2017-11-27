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
        promotionObj:{}
    },
    onPromotion:function(token,values,Actions,Modal){
        let t = this;
        let obj = {
            admin_token:token,
            update:0
        };
        if(values){
             obj.promotion_allow = values.promotion_allow;
             obj.groupbuy_allow = values.groupbuy_allow;
             obj.pointshop_isuse = values.pointshop_isuse;
             obj.voucher_allow = values.voucher_allow;
             obj.pointprod_isuse = values.pointprod_isuse;
             obj.redpacket_allow = values.redpacket_allow;
             obj.update = 1;
        }
        obj = qs.stringify(obj);
        fetch(urlhttp+"/admin.shop_setting/editpromotionsetting",{method:"post",body:obj,headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error ==""){
                    if(result.data ==1){
                        Actions.promotion(token);
                        const modal = Modal.success({
                            title: '保存成功',
                            content: '页面1s后自动关闭',
                        });
                        setTimeout(() => modal.destroy(), 1000);
                    }else{
                        t.data.promotionObj["groupbuy_allow"] = result.data.groupbuy_allow.value==="true"?true:false;
                        t.data.promotionObj["pointprod_isuse"] = result.data.pointprod_isuse.value==="true"?true:false;
                        t.data.promotionObj["pointshop_isuse"] = result.data.pointshop_isuse.value==="true"?true:false;
                        t.data.promotionObj["promotion_allow"] = result.data.promotion_allow.value==="true"?true:false=="true"?true:false;
                        t.data.promotionObj["redpacket_allow"] = result.data.redpacket_allow.value==="true"?true:false;
                        t.data.promotionObj["voucher_allow"] = result.data.voucher_allow.value==="true"?true:false;
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