import React from 'react';
import { Steps,Tabs,Breadcrumb,Row, Col,Table  } from 'antd';
import './order.details.less';
import _ from 'lodash';;
const TabPane = Tabs.TabPane;
const Step = Steps.Step;

class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let t = this;
        let {order_info,order_log,store_info} = this.props.allDetails;
        let arr =[],money=0;
         _.mapKeys(order_info.invoice_info, function(value, key) {
            arr.push(<li key={key} style={{overflow:"hidden"}}>{key}：{value}</li>)
        });
        order_info.goods_list.map(function(item,index){
            money+=item.goods_price*item.goods_num;
        })
        
        const columns = [{
            title: '商品',
            dataIndex: 'goods_name',
        },{
            title: '单价',
            dataIndex: 'goods_price'
        },{
            title: '数量',
            dataIndex: 'goods_num',
        },{
            title: '优惠活动',
            dataIndex: 'xx',
        },{
            title: '佣金比例',
            dataIndex: 'commis_rate',
        },{
            title: '收取佣金',
            dataIndex: 'real_name',
        }];
        return (
            <div className="order_details">
                {t.props.allDetails.order_info.state_desc==="已取消"?<Steps current={2}>
                    <Step title="生成订单" description={order_info.add_time} />
                    <Step title="取消订单" description={order_log[0].log_time} />
                  </Steps>:<Steps current={1}>
                    <Step title="生成订单" description={order_info.add_time} />
                    <Step title="完成付款" description="" />
                    <Step title="商家发货" description="" />
                    <Step title="收货确认" description="" />
                    <Step title="完成评价" description="" />
                  </Steps>}
                  <div className="order_details_tab">
                    <Tabs type="card">
                        <TabPane tab="订单详情" key="1">
                            <div>
                                <Breadcrumb className="bread_style">
                                    <Breadcrumb.Item>下单</Breadcrumb.Item>
                                    <Breadcrumb.Item>支付</Breadcrumb.Item>
                                </Breadcrumb>
                                <Row>
                                  <Col span={8}><a>订单号：</a><span>{order_info.order_sn}</span></Col>
                                  <Col span={8}><a>订单来源：</a><span>{order_info.order_from==2?"移动端":"pc端"}</span></Col>
                                  <Col span={8}><a>下单时间：</a><span>{order_info.add_time}</span></Col>
                                </Row>
                            </div>
                            <div>
                                <Breadcrumb className="bread_style">
                                    <Breadcrumb.Item>购买</Breadcrumb.Item>
                                    <Breadcrumb.Item>收货方信息</Breadcrumb.Item>
                                </Breadcrumb>
                                <Row>
                                  <Col span={8}><a>买家：</a><span>{order_info.reciver_name}</span></Col>
                                  <Col span={8}><a>联系方式：</a><span>{order_info.reciver_info.mob_phone}</span></Col>
                                </Row>
                                 <Row>
                                  <Col span={24}><a>收货地址：</a><span>{order_info.reciver_info.address}</span></Col>
                                </Row>
                                 <Row>
                                  <Col span={8}>
                                    <a>发票信息：</a>
                                    <ul style={{float:"left"}}>
                                        {arr}
                                    </ul>
                                  </Col>
                                </Row>
                                 <Row>
                                  <Col span={24}><a>买家留言：</a><span>{order_info.extend_order_common.order_message}</span></Col>
                                </Row>
                            </div>
                            <div>
                                <Breadcrumb className="bread_style">
                                    <Breadcrumb.Item>销售</Breadcrumb.Item>
                                    <Breadcrumb.Item>发货方信息</Breadcrumb.Item>
                                </Breadcrumb>
                                <Row>
                                  <Col span={8}><a>店铺：</a><span>{store_info.store_name}</span></Col>
                                  <Col span={8}><a>店主名称：</a><span>{store_info.member_name}</span></Col>
                                  <Col span={8}><a>联系电话：</a><span>{store_info.store_phone}</span></Col>
                                </Row> 
                                <Row>
                                  <Col span={8}><a>发货时间：</a><span></span></Col>
                                  <Col span={8}><a>快递公司：</a><span></span></Col>
                                  <Col span={8}><a>物流单号：</a><span></span></Col>
                                </Row>
                                <Row>
                                  <Col span={24}><a>发货地址：</a><span>{store_info.store_address}</span></Col>
                                </Row>
                            </div>
                            <div>
                                <Breadcrumb className="bread_style">
                                    <Breadcrumb.Item>商品信息</Breadcrumb.Item>
                                </Breadcrumb>
                                <Table className="table_width" columns={columns} pagination={false} dataSource={addKeyFun(order_info.goods_list)}/>
                            </div>
                            <p style={{textAlign:"right",paddingRight:"10px",marginTop:"20px"}}>订单总金额：<span className="span1">￥{money.toFixed(2)}</span></p>  
                            <p style={{textAlign:"right",marginBottom:"10px",paddingRight:"10px"}}>(运费：￥{order_info.shipping_fee})</p>
                        </TabPane>
                    </Tabs>
                  </div>
                  
            </div>
        )
    }   
}

module.exports = OrderDetails;