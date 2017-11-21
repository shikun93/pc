/**
 * Created by Administrator on 2017/4/21.
 */
import React from 'react';
import { Col, Row ,Switch } from 'antd';
import './fmodul.less';


//组件类
class Fmodul extends React.Component{

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
               <div className="fmodul" onMouseOver={t.show} onMouseOut={t.hide} onClick={t.props.show}>
            {
                t.props.n == 1 ? <Row>
                <Col span={12}>
                    <div className="firstImge">
                        <a href = {t.props.fData["arr"][0].rootUrl} target="_blank">
                        <img src={t.props.fData["arr"][0].imageUrl}/>
                        </a>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="twoImg">
                        <a href = {t.props.fData["arr"][1].rootUrl} target="_blank">
                        <img src={t.props.fData["arr"][1].imageUrl} />
                        </a>
                        <a href = {t.props.fData["arr"][2].rootUrl} target="_blank">
                        <img src={t.props.fData["arr"][2].imageUrl} />
                        </a>
                    </div>
                </Col>
            </Row>: <Row>
            <Col span={12}>
                <div className="twoImg">
                    <a href = {t.props.fData["arr"][0].rootUrl} target="_blank">
                    <img src={t.props.fData["arr"][0].imageUrl} />
                    </a>
                    <a href = {t.props.fData["arr"][1].rootUrl} target="_blank">
                    <img src={t.props.fData["arr"][1].imageUrl} />
                    </a>
                </div>
            </Col>
            <Col span={12}>
                <div className="firstImge">
                    <a href = {t.props.fData["arr"][2].rootUrl} target="_blank">
                    <img src={t.props.fData["arr"][2].imageUrl}/>
                    </a>
                </div>
            </Col>
            </Row>
            }
            {
                t.props.panduan != 1?<ul className="actions">
                            <li onClick={t.props.upper}>上移</li>
                            <li onClick={t.props.down}>下移</li>
                            <li><Switch checkedChildren="显示" unCheckedChildren="隐藏" checked={t.props.fData["is_show"] =="1"?true:false} onChange={t.props.lose}/></li>
                            <li onClick={t.props.recvise} data-key={t.props.fData["mobile_special_item_id"]?t.props.fData["mobile_special_item_id"]:t.props.fData["layout_special_item_id"]}>修改</li>
                            <li onClick={t.props.remove}>删除</li>
                </ul>:""
            }
        </div>
    )
    }
}

module.exports = Fmodul;
