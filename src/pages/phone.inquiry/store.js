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
        list:null
    },
    onGetList:function(value,cb){
        let t = this;
        let obj = new FormData();
        obj.append("voucher_no",value["voucher_no"]);
        fetch(urlhttp+"/ydd_voucher/getsinglebyvoucher_no",{method:"post",body:obj})
            .then(function(response){
                return response.json();
            }).then(function(result){
                if(result.error==""){
                    t.data.list = result.data["voucher_info"];
                    t.updateComponent();
                }else{
                    cb(result.error);
                    t.data.list = null;
                    t.updateComponent();
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