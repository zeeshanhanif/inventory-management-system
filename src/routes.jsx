import React from 'react';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory
} from 'react-router'

import { App,Login, Signup, Dashboard } from './containers'
import { AddStore,AddProduct,PurchaseProduct,
            SaleProduct,ViewStock, ViewSales} from './components'

export default (
    <Router history={browserHistory}>
        <Route path="login" component={Login} />        
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard} />            
            <Route path="dashboard" component={Dashboard} />
            <Route path="addstore" component={AddStore} />
            <Route path="addproduct" component={AddProduct} />
            <Route path="purchaseproduct" component={PurchaseProduct} />
            <Route path="saleproduct" component={SaleProduct} />
            <Route path="viewstock" component={ViewStock} />
            <Route path="viewsales" component={ViewSales} />
        </Route>
    </Router>
)