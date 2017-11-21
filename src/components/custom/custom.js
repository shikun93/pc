/**
 * Created by Administrator on 2017/4/21.
 */
import React from 'react';
import {Link} from 'react-router';
import { Carousel,Switch } from 'antd';
import './custom.less';


//组件类
class Custom extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount(){
        let t = this;
    }

    show(e){
       $(e.currentTarget).find(".actions").addClass("show1");
    }

    hide(e){
        $(e.currentTarget).find(".actions").removeClass("show1");
    }
    render() {
        let t = this;
        
        return (
                <div className="_custom" onMouseOver={t.show} onMouseOut={t.hide} onClick={t.props.show}>
                    <div dangerouslySetInnerHTML={{__html:t.props.data.item_data.html}}></div>
                    {
                        t.props.panduan != 1?<ul className="actions">
                            <li onClick={t.props.upper}>上移</li>
                            <li onClick={t.props.down}>下移</li>
                            <li><Switch checkedChildren="显示" unCheckedChildren="隐藏" checked={t.props.data["is_show"] =="1"?true:false} onChange={t.props.lose}/></li>
                            <li onClick={t.props.recvise} data-key={t.props.data["mobile_special_item_id"]?t.props.data["mobile_special_item_id"]:t.props.data["layout_special_item_id"]}>修改</li>
                            <li onClick={t.props.remove}>删除</li>
                        </ul>:""
                    }
                </div>
    )
    }
}

module.exports = Custom;
