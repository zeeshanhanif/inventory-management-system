import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';

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
          New Notifications
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
