/**
 * Created by Administrator on 2017/3/30.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,IndexRoute, hashHistory} from 'react-router';
import _ from 'lodash';
import 'antd/dist/antd.less';
require('es5-shim');
require('es5-shim/es5-sham');
require("es6-promise");
require("whatwg-fetch");

import Login from '../pages/login/login';
import Main from '../pages/main/main';
import Table1 from '../pages/table1/table';
import AdminGroup from '../pages/admin.group/admin.group';
import adminAdmin from '../pages/admin.admin/admin.admin';
import EditPage from '../pages/editpage/editpage';
import AdminMoblie from '../pages/admin.moblie/admin.moblie';
import AdminImport from '../pages/admin.import/admin.import';
import AdminPrinter from '../pages/admin.printer/admin.printer';
import AdminPrinterSeller from '../pages/admin.printer_seller/printer.seller';
import Brand from '../pages/brand/brand';
import AdminShop from '../pages/admin.shop/admin.shop';
import AdminShop1 from '../pages/admin.shop1/admin.shop';
import AdminShop2 from '../pages/admin.shop2/admin.shop';
import ShopSpec from '../pages/shop.spec/shop.spec';
import ShopType from '../pages/shop.type/shop.type';
import ShopSetting from '../pages/shop.setting/shop.setting';
import ShopPromotion from '../pages/shop.promotion/shop.promotion';
import SettingImage from '../pages/setting.image/setting.image';
import SystemSetting from '../pages/system.setting/system.setting';
import Home from '../pages/home/home';
import PageTemplate from '../pages/page.template/page.template';
import LayoutStyle from '../pages/layout.style/layout.style';
import SpecialList from '../pages/special.list/special.list';
import SpecialModule from '../pages/special.module/special.module';
import BlankPage from '../pages/blank.page/blank.page';
import SiteSetup from '../pages/site.setup/site.setup';
import AdminLog from '../pages/admin.log/admin.log';
import ShopGrade from '../pages/shop.grade/shop.grade';
import ShopClass from '../pages/shop.class/shop.class';
import OwnStore from '../pages/own.store/own.store';

ReactDOM.render(
    <Router history = {hashHistory}>
        <Route path="/" component={Login} />
        <Route path="/main" component={Main} >
            <IndexRoute path="home" component={Home}/>
            <Route path="home" component={Home} />
            <Route path="table" component={Table1} />
            <Route path="adminGroup" component={AdminGroup} />
            <Route path="adminAdmin" component={adminAdmin} />
            <Route path="editPage" component={EditPage} />
            <Route path="adminMoblie" component={AdminMoblie} />
            <Route path="adminImport" component={AdminImport} />
            <Route path="adminPrinter" component={AdminPrinter} />
            <Route path="printerSeller" component={AdminPrinterSeller} />
            <Route path="brand" component={Brand} />
            <Route path="adminShop" component={AdminShop} />
            <Route path="shopSpec" component={ShopSpec} />
            <Route path="shopType" component={ShopType} />
            <Route path="adminShop1" component={AdminShop1} />
            <Route path="adminShop2" component={AdminShop2} />
            <Route path="shopSetting" component={ShopSetting} />
            <Route path="shopPromotion" component={ShopPromotion} />
            <Route path="settingImage" component={SettingImage} />
            <Route path="systemSetting" component={SystemSetting} />
            <Route path="pageTemplate" component={PageTemplate} />
            <Route path="layoutStyle" component={LayoutStyle} />
            <Route path="specialList" component={SpecialList} />
            <Route path="specialModule" component={SpecialModule} />
            <Route path="blankPage" component={BlankPage} />
            <Route path="siteSetup" component={SiteSetup} />
            <Route path="adminLog" component={AdminLog} />
            <Route path="shopGrade" component={ShopGrade} />
            <Route path="shopClass" component={ShopClass} />
            <Route path="ownStore" component={OwnStore} />
        </Route>
    </Router>
,document.getElementById('app'));
