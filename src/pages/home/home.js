/**
 * Created by Administrator on 2017/4/7.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import {urlhttp,urlhttps} from '../../app/url';
import './home.less';

const cb =function(err){
    message.error(err);
}

//组件类
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount(){
        let t = this;
    }

    render() {
        let t = this;
       
        return (
            <div className="home">
                <div className="main">
                    欢迎进入首页！
                </div>
            </div>
        );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(Home, Reflux.connect(Store));
module.exports = Home;
