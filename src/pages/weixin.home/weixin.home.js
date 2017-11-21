/**
 * Created by Administrator on 2017/4/7.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import Actions from './action';
import Store from './store';
import {message} from 'antd';
import './weixin.home.less';

import Carousels from '../../components/carousel/carousel';
import Flex from '../../components/flex/flex';
import Fmodul from '../../components/Fmodul/fmodul';
import TitleImage from '../../components/title.imagemodule/title.image';

const cb =function(err){
    message.error(err);
}

//组件类
class WeixinHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount(){
        let t = this;
        Actions.getHomeData(t.aType,t.bType,t.cType,t.dType,cb);
    }

    aType(data,arrHtml){
        let t = this;
        arrHtml.push(<Carousels data={data} panduan={1}/>);
    }

    bType(data,arrHtml){
        let t = this;
        arrHtml.push(<Flex arrData={data} panduan={1}/>);
    }

    cType(data,n,arrHtml){
        let t = this;
        arrHtml.push(<Fmodul fData={data} n={n} panduan={1}/>);
    }

    dType(data,n,arrHtml){
        let t = this;
        arrHtml.push(<TitleImage data={data} n={n} panduan={1}/>);
    }
  
    render() {
        let t = this;
        return (
            <div className="weixin_home">
               {t.state.arrHtml}
            </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(WeixinHome, Reflux.connect(Store));
module.exports = WeixinHome;
