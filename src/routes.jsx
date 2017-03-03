import React from 'react';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory
} from 'react-router'

import { App,Login, Signup, Dashboard } from './containers'
import {RegisterDonor,DonorList, DonorDetail} from './components'

export default (
    <Router history={browserHistory}>
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard} />            
            <Route path="dashboard" component={Dashboard} >
                <IndexRoute component={DonorList} />
                <Route path="registerDonor" component={RegisterDonor} />
                <Route path="donorlist" component={DonorList} />
                <Route path="donorlist/:id" component={DonorDetail} />
            </Route>
            
        </Route>
    </Router>
)