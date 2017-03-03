import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';
import { DonorMiddleware } from '../../store'

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        authUser: state.AuthReducer.authUser,
        donorList: state.DonorReducer.donorList,
        donorDetail: state.DonorReducer.donorDetail,
        isDetailUpdated: state.DonorReducer.isDetailUpdated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerDoner: (donorDetail) => dispatch(DonorMiddleware.registerDonor(donorDetail)),
        getDonorList: (bloodGroup) => dispatch(DonorMiddleware.getDonorList(bloodGroup)),
        getDonorDetail: (donorId) => dispatch(DonorMiddleware.getDonorDetial(donorId))
    };
}


class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        {this.props.children?React.cloneElement(this.props.children, {...this.props}):this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
//export default Dashboard;
