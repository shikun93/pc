/**
 * Created by Administrator on 2017/4/6.
 */
import Reflux from 'reflux';
import Actions from './action';
import {urlhttp,urlhttps} from '../../app/url';

var Store =  Reflux.createStore({
    //监听所有的actions
    listenables: [Actions],
    data: {
        arrHtml:[]
    },
    onGetHomeData(aType,bType,cType,dType,cb){
        let t = this;
        fetch(urlhttp+"/mobile_special/getitemlist/mobile_special_id/1").then(function(response){
            return response.json();
        }).then(function(result){
            if(result.error==""){
            let list = [],arrHtml=[];
            let data = result.data["item_list"];
                data.map(function(item,index){
                    switch(item["item_type"]){
                        case "a":
                            if(item["is_show"] ==1){
                                let arr = [];
                                for(let i =1;i<=5;i++){
                                    if(item["item_data"]["title"+i]!=undefined&&item["item_data"]["href"+i]!=undefined&&item["item_data"]["pic1_ur"+i] !=undefined){
                                        arr.push({title:item["item_data"]["title"+i],rootUrl:item["item_data"]["href"+i],imageUrl:item["item_data"]["pic1_ur"+i]})
                                    }
                                }
                                list.push(item["mobile_special_item_id"]);
                                item.arr = arr;
                                aType.call(t,item,arrHtml);
                            }
                            break;
                        case "b":
                          if(item["is_show"] ==1){
                                let arr1 = [];
                                for(let i =1;i<=4;i++){
                                    if(item["item_data"]["title"+i]!=undefined ||item["item_data"]["href"+i]!=undefined||item["item_data"]["pic1_ur"+i]!=undefined){
                                        arr1.push({title:item["item_data"]["title"+i],rootUrl:item["item_data"]["href"+i],imageUrl:item["item_data"]["pic1_ur"+i]})
                                    }    
                                }
                                list.push(item["mobile_special_item_id"]);
                                item.arr = arr1;
                                bType.call(t,item,arrHtml);
                            }
                            break;
                        case "c":
                          if(item["is_show"] ==1){
                                let arr2 = [],n;
                                for(let i =1;i<=3;i++){
                                    arr2.push({rootUrl:item["item_data"]["href"+i],imageUrl:item["item_data"]["pic1_ur"+i]});
                                }
                                list.push(item["mobile_special_item_id"]);
                                item.arr = arr2;
                                n =item["item_data"]["fmodul_type"];
                                cType.call(t,item,n,arrHtml);
                            }
                            break;
                        case "d":
                          if(item["is_show"] ==1){
                                let obj1={},n1;
                                for(let i =1;i<=3;i++){
                                    obj1 = {title:item["item_data"]["title"],rootUrl:item["item_data"]["href"],imageUrl:item["item_data"]["pic1_ur"],details:item["item_data"]["details"]};
                                }
                                list.push(item["mobile_special_item_id"]);
                                item.imageData = obj1;
                                n1 =item["item_data"]["titleImg_type"];
                                dType.call(t,item,n1,arrHtml);
                            }
                            break;
                }
            });
            t.data.arrHtml = arrHtml;
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