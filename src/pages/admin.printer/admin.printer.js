/**
 * Created by Administrator on 2017/4/7.
 */
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import {Link,hashHistory} from 'react-router';
import Actions from './action';
import Store from './store';
import './admin.printer.less';
import { Upload, Button, Icon,Breadcrumb } from 'antd';
import {urlhttp,urlhttps} from '../../app/url';

//组件类
class AdminPrinter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentWillMount(){
        let t = this;
        let height = document.documentElement.clientHeight-50;
        this.setState({ height: height+"px" });

    }
    render() {
        let t = this;
        let obj = sessionStorage.getItem("admin_token");
        const props = {
          name: 'file',
          action: urlhttps+'/admin.printer/import_xls',
          data:{"admin_token":obj}
          }
        return (
            <div className="admin_import">
                <Breadcrumb className="bread_style">
                <Breadcrumb.Item><a href="">打印机数据管理</a></Breadcrumb.Item>
                <Breadcrumb.Item>打印机数据导入</Breadcrumb.Item>
                </Breadcrumb>
                <div className="main">
                <p>打印机数据文件模板<a href="http://oss.sjychina.com/打印机数据导入模板.xlsx">下载</a></p>
                <p>打印机数据文件上传</p>
                 <Upload {...props}>
                    <Button className="">
                      <Icon type="upload" /> 上传文件
                    </Button>
                </Upload>
                </div>
               
    </div>
    );
    }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(AdminPrinter, Reflux.connect(Store));
module.exports = AdminPrinter;
