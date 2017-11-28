/**
 * Created by Administrator on 2017/4/21.
 */
import React from 'react';
import {  Card, Col, Row,Switch  } from 'antd';
import './flex.less';


//组件类
class Flex extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    show(e){
        $(e.currentTarget).find(".actions").addClass("show1");
    }

    hide(e){
        $(e.currentTarget).find(".actions").removeClass("show1");
    }

    render() {
        let t = this;
        let num =24/t.props.arrData["arr"].length;
        
        return (
            <div style={{ padding: '5px' }} className="code-box-demo" onMouseOver={t.show} onMouseOut={t.hide} onClick={t.props.show}>
        <Row>
            {
                t.props.arrData["arr"].map(function(item,index){
                  return   <Col span={num} key={index}>
                                <Card>
                                <a href = {item.rootUrl} target="_blank">
                                <div className="custom-image">
                                <img alt="example" width="100%" src={item.imageUrl} />
                                </div>
                                <div className="custom-card">
                                <h3>{item.title}</h3>
                                <p className="fontp_size">{item.details}</p>
                                </div>
                                </a>
                                </Card>
                            </Col>
            })
            }
        </Row>
            {
                t.props.panduan != 1?<ul className="actions">
                            <li onClick={t.props.upper}>上移</li>
                            <li onClick={t.props.down}>下移</li>
                            <li><Switch checkedChildren="显示" unCheckedChildren="隐藏" checked={t.props.arrData["is_show"] =="1"?true:false} onChange={t.props.lose}/></li>
                            <li onClick={t.props.recvise} data-key={t.props.arrData["mobile_special_item_id"]?t.props.arrData["mobile_special_item_id"]:t.props.arrData["layout_special_item_id"]}>修改</li>
                            <li onClick={t.props.remove}>删除</li>
                </ul>:""
            }
        </div>
     )
    }
}
module.exports = Flex;
