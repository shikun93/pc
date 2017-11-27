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
import ClassForm from'../../components/shop.class.form/class.form';
import { Table,Breadcrumb,Icon,Modal,Button } from 'antd';
import './admin.shop.less';

//组件类
class Brand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentWillMount(){
      
    }
    componentDidMount(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        Actions.getList(obj,1,0);
        Actions.getClassList(obj);
        Actions.getTypeList(obj);
    }
    //取消
    handleCancel(){
        Actions.cancel();
    }

    //确认修改
    handleOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.editorSuccess(obj,values,Actions,t.state.current);
            }
        });

    }

    //确认添加
    addOk(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.addList(obj,values,Actions);
            }
        });
    }

    //移除没用
    remove(id){
        // let t = this;
        // let obj = sessionStorage.getItem("admin_token");
        // Actions.deleteOne(obj,id,Actions,t.state.current);
    }

    //修改
    amend(id){
        let obj = sessionStorage.getItem("admin_token");
        Actions.editorList(obj,id);
    }

    //分页
    onChange(page){
        let token = sessionStorage.getItem("admin_token");
        Actions.getBrandList(token,page);
    }

    //添加
    add(){
        Actions.addBut();
    }

    checkedValue(){
        console.log(1);
    }

    getCalList(n,value){
       let token = sessionStorage.getItem("admin_token");
       Actions.getCascaderList(token,value,n); 
    }

    lookNext (id){
        hashHistory.push('/main/adminShop1?id='+id);
    }

    addHtml(){
        let t = this;
        return t.state.addVisible?<div>
        <Modal visible={true}
        closable ={false}
        title = "添加商品分类"
        wrapClassName = "modal_style"
        footer={null}
            >
            <ClassForm      ok={this.addOk}
                            cancel={this.handleCancel}
                            classList={t.state.classList}
                            typeList={t.state.typeList}
                            />
            </Modal>
            </div>:"";
    }

    onpopup(){
        let t = this;
        return t.state.visible?<div>
        <Modal visible={true} 
            closable ={false} 
            footer={null}
            title = "修改商品分类"
            wrapClassName = "modal_style">
            <ClassForm      classList={t.state.classList}
                            typeList={t.state.typeList}
                            formdata = {t.state.editorAdminData}
                            ok={this.handleOk}
                            cancel={this.handleCancel} typePopPu="edit"/>
        </Modal>
        </div>:"";
    }

    render() {
        let t = this;
        const columns = [{
            dataIndex: 'goods_class_id',
            render: text => <span style={{"display":"none"}}>{text}</span>,
        },{
            dataIndex: 'goods_type_id',
            render: text => <span style={{"display":"none"}}>{text}</span>,
        },{
            title: '分类名称',
            dataIndex: 'goods_class_name',
        },{
            title: '类型',
            dataIndex: 'goods_type_name',
        },{
            title: '排序',
            dataIndex: 'sort_order',
        },{
            title: '操作',
            width:200,
            key: 'action',
            render: (text, record) => (
            <span>
                <a onClick={t.remove.bind(t,record["goods_class_id"])}>删除</a>
            <span className="ant-divider" />
                <a onClick={this.amend.bind(t,record["goods_class_id"])}>修改</a>
            <span className="ant-divider" />
                <a onClick={this.lookNext.bind(t,record["goods_class_id"])}>查看下一级</a>
            </span>
        ),
        }];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
               // console.log('selectedRowKeys: ${selectedRowKeys}', 'selectedRows: ', selectedRows);
        },
            onSelect: (record, selected, selectedRows) => {
            //console.log(record, selected, selectedRows);
        },
            onSelectAll: (selected, selectedRows, changeRows) => {
            //console.log(selected, selectedRows, changeRows);
        },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
        }),
    };

        let  coo ={
            total: t.state.total,
            current: t.state.current,
            pageSize:10,
            onChange: t.onChange
        }
        return (
            <div className="table1">
            <Breadcrumb className="bread_style">
            <Breadcrumb.Item><a href="">商品</a></Breadcrumb.Item>
            <Breadcrumb.Item>商品分类</Breadcrumb.Item>
            </Breadcrumb>
            <div className="table-operations">
            <Button type="dashed" onClick={t.add} icon="plus">添加</Button>
            </div>
            <Table className="table_width" pagination={coo} rowSelection={rowSelection}  columns={columns} dataSource={t.state.list}/>
        {t.onpopup()}
        {t.addHtml()}
    </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(Brand, Reflux.connect(Store));
module.exports = Brand;
