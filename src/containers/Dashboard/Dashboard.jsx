import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';
import {Graphs} from '../../components'

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        authUser: state.AuthReducer.authUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}


class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <div>
          Please Wait while we are loading Charts for you
        </div>
        <div>
            <Graphs {...this.props} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
