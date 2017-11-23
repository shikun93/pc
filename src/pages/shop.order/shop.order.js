import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import {urlhttp,urlhttps} from '../../app/url';
import { Breadcrumb,message,Button,Table,Modal} from 'antd';
import OrderDetails from '../../components/order.details/order.details';
import './shop.order.less';


const cb =function(err){
    message.error(err);
}

//组件类
class ShopOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentWillMount(){
      
    }
    componentDidMount(){
        let t = this;
        let token = sessionStorage.getItem("admin_token");
        Actions.getList(token,1,cb);
    }  

    findLook(id){
        let token = sessionStorage.getItem("admin_token");
        Actions.findLook(token,id,cb);
    } 

    cancelOrder(id){
        let token = sessionStorage.getItem("admin_token");
        Actions.cancelOrder(token,id,Actions,cb);
    }

    cancel(){
        Actions.cancel();
    }

    allDetails(){
        let t = this;
        return <Modal
            visible={t.state.visible}
            title="商品订单"
            width="1000px"
            onCancel={this.cancel}
            footer={null}
            >
            <OrderDetails allDetails={t.state.findList}/>
        </Modal>
    }

    onChange(page){
        Actions.getList(token,page,cb);
    }
    
    render() {
        let t = this;
        const columns = [{
                dataIndex: 'order_id',
                render: text => <span style={{"display":"none"}}>{text}</span>,
            },{
                title: '订单编号',
                dataIndex: 'order_sn',
                width:70,
                fixed: 'left' 
            },{
                title: '订单来源',
                dataIndex: 'order_from',
                fixed: 'left',
                width:100
            },{
                title: '下单时间',
                dataIndex: 'add_times',
                width:150
            },{
                 title: '订单金额(元)',
                 dataIndex: 'order_amount',
                 width:150
            },{
                title: '订单状态',
                dataIndex: 'order_state',
                width:100
            },{
                title: '支付单号',
                dataIndex: 'pay_sn',
                width:80
            },{
                title: '支付方式',
                dataIndex: 'payment_code',
                width:100
            },{
                title: '支付时间',
                dataIndex: 'payment_time',
                width:100
            },{
                title: '充值卡支付(元)',
                dataIndex: 'rcb_amount',
                width:150
            },{
                title: '预存款支付(元)',
                dataIndex: 'pd_amount',
                width:150
            },{
                title: '发货物流单号',
                dataIndex: 'shipping_code',
                width:80
            },{
                title: '退款金额(元)',
                dataIndex: 'refund_amount',
                width:100
            },{
                title: '订单完成时间',
                dataIndex: 'finnshed_time',
                width:80
            },{
                title: '是否评价',
                dataIndex: 'evaluation_state',
                width:150
            },{
                title: '店铺ID',
                dataIndex: 'store_id',
                width:150
            },{
                title: '店铺名称',
                dataIndex: 'store_name',
                width:150
            },{
                title: '买家ID',
                dataIndex: 'buyer_id',
                width:150
            },{
                title: '买家账号',
                dataIndex: 'buyer_name',
                width:80
            },{
                title: '操作',
                    width:150,
                    key: 'action',
                    fixed: 'right', 
                    render: (text, record) => {
                        return record["order_state"]=="已取消"?<span>
                        <a onClick={this.findLook.bind(t,record["order_id"])}>查看</a>
                    </span>:<span>
                        <a onClick={this.findLook.bind(t,record["order_id"])}>查看</a>
                        <span className="ant-divider" />
                        <a onClick={this.cancelOrder.bind(t,record["order_id"])}>取消订单</a>
                    </span>;
                    }
        }];
        const rowSelection = {
                onChange: (selectedRowKeys, selectedRows) => {
                console.log('selectedRowKeys: ${selectedRowKeys}', 'selectedRows: ', selectedRows);
                },
                onSelect: (record, selected, selectedRows) => {
                    console.log(record, selected, selectedRows);
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                    console.log(selected, selectedRows, changeRows);
                },
                getCheckboxProps: record => ({
                    disabled: record.name === 'Disabled User',    // Column configuration not to be checked
                }),
        };
        let  coo ={
            total: t.state.total,
            current:t.state.current,
            pageSize:10,
            onChange: t.onChange
        }
        return (
            <div className="shop_grade">
                <Breadcrumb className="bread_style">
                    <Breadcrumb.Item><a href="">交易</a></Breadcrumb.Item>
                    <Breadcrumb.Item>商品订单</Breadcrumb.Item>
                </Breadcrumb>
                <div className="table-operations">
                    <Button type="dashed" onClick={t.add} icon="plus">添加</Button>
                </div>
                <Table className="table_width" pagination={coo} rowSelection={rowSelection}  columns={columns} dataSource={t.state.list} scroll={{ x: 2200 }}/>
                {t.allDetails()}
        </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(ShopOrder, Reflux.connect(Store));
module.exports = ShopOrder;
