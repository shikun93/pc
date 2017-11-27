/**
 * Created by Administrator on 2017/4/7.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import { Table,Breadcrumb,Icon,Modal,Button, Form, Input,Tree} from 'antd';
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

import './admin.group.less';

//修改/添加公用表单
class AdminGroupForm extends React.Component {
    state = {
       
    };


    render() {

        let t = this;
        const loop = data => data.map((item) => {
            if (item.child) {
                return (
                <TreeNode key={item["admin_menu_id"]} title={item["admin_menu_name"]}>
                    {loop(item.child)}
                </TreeNode>
                 );
             }
            return <TreeNode key={item["admin_menu_id"]} title={item["admin_menu_name"]} />;
        });
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
            <Form>
            <FormItem
        {...formItemLayout}
    >
        {getFieldDecorator('admin_group_id', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata["admin_group_id"]:"",
        })(
        <Input  style={{"display":"none"}}/>
        )}
    </FormItem>
        <FormItem
        {...formItemLayout}
        label="管理员组名"
        hasFeedback
        >
        {getFieldDecorator('admin_group_name', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata["admin_group_name"]:"",
            rules: [ {
                required: true, message: '请填写管理员组名!',
            }],
        })(
        <Input />
    )}
    </FormItem>
        <FormItem
        {...formItemLayout}
        label="描述"
        hasFeedback
        >
        {getFieldDecorator('description', {
            initialValue: t.props.typePopPu == "edit"?t.props.formdata.description:"",
            rules: [ {
                required: true, message: '请填写描述内容!',
            }],
        })(
        <Input />
    )}
            </FormItem>
                <FormItem
                {...formItemLayout}
                label="权限">
                    {
                        t.props.typePopPu == "edit"? <Tree checkable
                                            autoExpandParent={true}
                                            onCheck={t.props.checkedValues} checkedKeys={t.props.changeKeys}
                                            checkStrictly={false} selectedKeys={t.props.selectKeys}
                                            onSelect={t.props.select} expandedKeys={t.props.expandKeys}
                                            onExpand={t.props.expand}
                                            >
                                            {loop(t.props.list)}
                                            </Tree>:<Tree checkable
                                        onCheck={t.props.checkedValues}
                                        checkStrictly={false}
                                        >
                                        {loop(t.props.list)}
                                    </Tree>
                    }

            </FormItem>
            <FormItem
            {...formItemLayout}
            label="序号"
            hasFeedback >
            {getFieldDecorator('sort_order', {
                initialValue: t.props.typePopPu == "edit"?t.props.formdata["sort_order"]:"",
                rules: [{
                    required: true, message: '请选择权限!',
                }],
            })(
            <Input type="number" />
        )}
        </FormItem>
        <FormItem>
            <Button key="back" size="large" onClick={this.props.cancel}>取消</Button>,
            <Button key="submit" type="primary" size="large"  onClick={this.props.ok.bind(this,this.props.current)}>
                <span style={{color:"#fff"}}>确认</span>
            </Button>
        </FormItem>
        </Form>
    );
    }
}

const AdminGroupsForm = Form.create()(AdminGroupForm);


//组件类
class AdminGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bol:false
        };
    }
    componentWillMount(){
        let t = this;
        let height = document.documentElement.clientHeight-50;
        this.setState({ height: height+"px" });

    }
    componentDidMount(){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        Actions.getAdminGroupList(obj,1);
        Actions.getPublicGetmenutree(obj);
    }
    //取消
    handleCancel(){
        Actions.cancel();
    }

    //确认修改
    handleOk(current){
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        this.props.form.validateFields(function(err,values){
            if(err==null){
                Actions.editorSuccess(obj,values,Actions, current);
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
        let t = this;
        cb("待开发")
        //let obj = sessionStorage.getItem("admin_token");
        //Actions.deleteOne(obj,id,Actions,t.state.current);
    }

    //修改
    amend(id){
        let obj = sessionStorage.getItem("admin_token");
        Actions.editorList(obj,id);
    }

    //分页
    onChange(page){
        let obj = sessionStorage.getItem("admin_token");
        Actions.getAdminGroupList(obj,page);
    }

    //添加
    add(){
        Actions.addBut();
    }

    addHtml(){
        let t = this;
        return t.state.addVisible?<div>
        <Modal visible={true}
        title = "添加管理员组"
        closable ={false}
        footer={null}
            >
            <AdminGroupsForm  list={t.state.jurisdictionList}
                            ok={this.addOk}
                            cancel={this.handleCancel}
                            checkedValues={t.checkedValue.bind(t)}
                            />
            </Modal>
            </div>:"";
    }

    checkedValue(checkedKeys){
        let t = this;
        Actions.treeChange(checkedKeys,null,null);
        let check = checkedKeys.join(",");
        Actions.getChecked(check)
    }
    onSelect(selectKeys){
        Actions.treeChange(null,selectKeys,null);
    }

    onExpand(Expand){
        Actions.treeChange(null,null,Expand);
    }


    onpopup(){
        let t = this;
        return t.state.visible?<div>
        <Modal visible={true}
        title = "修改管理员组"
        closable ={false}
        footer={null}
            >
            <AdminGroupsForm  list={t.state.jurisdictionList}
                            checkedValues={t.checkedValue}
                            formdata = {t.state.editorAdminData}
                            changeKeys={t.state.changeKeys}
                            expandKeys={t.state.expandKeys}
                            selectKeys={t.state.selectKeys}
                            select = {t.onSelect}
                            expand = {t.onExpand}
                            ok={this.handleOk}
                            current={t.state.current}
                            cancel={this.handleCancel} typePopPu="edit"/>
            </Modal>
            </div>:"";
    }

    render() {
        let t = this;
        const columns = [{
            dataIndex: 'admin_group_id',
            render: text => <span style={{"display":"none"}}>{text}</span>,
        },{
            title: '管理员组名',
                dataIndex: 'admin_group_name',
                width:150
        },{
            title: '描述',
                dataIndex: 'description'
        },{
            title: '序号',
                dataIndex: 'sort_order',
                width:90
        },{
            title: '操作',
                width:100,
                key: 'action',
                render: (text, record) => (
            <span>
            <a onClick={t.remove.bind(t,record["admin_group_id"])}>删除</a>
            <span className="ant-divider" />
                <a onClick={this.amend.bind(t,record["admin_group_id"])}>修改</a>
            </span>
        ),
        }];
       
        let  coo ={
            total: t.state.total,
            current: t.state.current,
            pageSize:10,
            onChange: t.onChange
        }
        return (
            <div className="table1">
            <Breadcrumb className="bread_style">
            <Breadcrumb.Item><a href="">后台管理</a></Breadcrumb.Item>
            <Breadcrumb.Item>管理员组管理</Breadcrumb.Item>
            </Breadcrumb>
            <div className="table-operations">
            <Button type="dashed" onClick={t.add} icon="plus">添加</Button>
            </div>
            <Table className="table_width" pagination={coo} rowSelection={null}  columns={columns} dataSource={t.state.list}/>
        {t.onpopup()}
        {t.addHtml()}
    </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(AdminGroup, Reflux.connect(Store));
module.exports = AdminGroup;
