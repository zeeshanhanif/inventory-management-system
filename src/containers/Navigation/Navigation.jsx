import React, { Component , PropTypes} from 'react';
import './Navigation.css';
import * as MUI from 'material-ui'
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Web from 'material-ui/svg-icons/av/web';
import { AuthMiddleware } from '../../store'


function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        authUser: state.AuthReducer.authUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(AuthMiddleware.logout())
    };
}

class Navigation extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillReceiveProps(nextProps){
    setTimeout(()=> {
      if(!this.props.isAuthenticated){
        console.log("Logout true");
          this.context.router.push("/login");
      }
    },0);
  }

  /*
  handelSignin() {
    this.props.logout();
  }*/
  drawerMenu(){
    return (
      <div>
          <div className="navigation-avatar-div">
            <Avatar src="https://addons.cdn.mozilla.net/user-media/userpics/0/0/45.png"
                    size={50}
                    className="navigation-icon"/>
            <span className="navigation-span">{this.props.authUser.fullName}</span>
          </div>
          <MUI.MenuItem
              className="navigation-menuItem"
              primaryText="Dashboard"
              leftIcon={<Assessment/>}
              containerElement={<Link to="/dashboard"/>}
            />
          <MUI.MenuItem
              className="navigation-menuItem"
              primaryText="Add Store" 
              leftIcon={<Web/>}
              containerElement={<Link to="/addstore"/>}
            />
          <MUI.MenuItem
              className="navigation-menuItem"
              primaryText="Add Product" 
              leftIcon={<Web/>}
              containerElement={<Link to="/addproduct"/>}
            />
          <MUI.MenuItem
              className="navigation-menuItem"
              primaryText="Add Purchase Detail" 
              leftIcon={<Web/>}
              containerElement={<Link to="/purchaseproduct"/>}
            />
          <MUI.MenuItem
              className="navigation-menuItem"
              primaryText="Add Sale Detail" 
              leftIcon={<Web/>}
              containerElement={<Link to="/saleproduct"/>}
            />
          <MUI.MenuItem
              className="navigation-menuItem"
              primaryText="View Stock" 
              leftIcon={<Web/>}
              containerElement={<Link to="/viewstock"/>}
            />
          <MUI.MenuItem
              className="navigation-menuItem"
              primaryText="View Sales" 
              leftIcon={<Web/>}
              containerElement={<Link to="/viewsales"/>}
            />
          
      </div>
    );
  }

  render() {
    return (
      <div className="navigation-container">
        <MUI.AppBar style={this.props.styles} title="Inventory Management System"
              onLeftIconButtonTouchTap={this.props.drawerToggle}
              iconElementRight={<MUI.FlatButton label="Sign out" onTouchTap={this.props.logout}/>}
              onRightIconButtonTouchTap={()=>this.context.router.push("/login")}
              />
        <MUI.Drawer open={this.props.drawerOpen} docked={true}
            onRequestChange={this.props.drawerToggle}>
          {this.drawerMenu()}
        </MUI.Drawer>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);
