import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,IndexRoute, hashHistory} from 'react-router';
import _ from 'lodash';
import 'antd/dist/antd.less';
require("es6-promise");
require("whatwg-fetch");

import weixinHome from '../pages/weixin.home/weixin.home';
import specialPage from '../pages/special.page/special.page';
import phoneInquiry from '../pages/phone.inquiry/phone.inquiry';

ReactDOM.render(
    <Router history = {hashHistory}>
        <Route path="/" component={weixinHome} />
        <Route path="/specialPage" component={specialPage} />
        <Route path="/phoneInquiry" component={phoneInquiry} />
    </Router>
, document.getElementById('app'));
