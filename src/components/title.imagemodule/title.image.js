/**
 * Created by Administrator on 2017/4/21.
 */
import React from 'react';
import {Col, Row ,Switch } from 'antd';
import './title.image.less';


//组件类
class Flex extends React.Component{

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
            <div style={{ padding: '5px' }} className="titleIamge" onMouseOver={t.show} onMouseOut={t.hide} onClick={t.props.show}>
            {
                t.props.n == 1?<Row>
                    <Col span={12}>
                        <div>
                        <a href = {t.props.data["imageData"].rootUrl} target="_blank">
                        <img src={t.props.data["imageData"].imageUrl}/>
                        </a>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                        <a href = {t.props.data["imageData"].rootUrl} target="_blank">
                        <h5>{t.props.data["imageData"].title}</h5>
                         <p className="p1">{t.props.data["imageData"].details}</p>
                        </a>
                        </div>
                    </Col>
                    </Row>:<Row>
                    <Col span={12}>
                        <div>
                        <a href = {t.props.data["imageData"].rootUrl} target="_blank">
                        <h5>{t.props.data["imageData"].title}</h5>
                        <p>{t.props.data["imageData"].details}</p>
                        </a>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                        <a href = {t.props.data["imageData"].rootUrl} target="_blank">
                        <img src={t.props.data["imageData"].imageUrl}/>
                        </a>
                        </div>
                    </Col>
                    </Row>
            }
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
module.exports = Flex;
