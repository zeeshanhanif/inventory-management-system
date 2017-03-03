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
            <Avatar src="http://www.material-ui.com/images/uxceo-128.jpg"
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
              primaryText={this.props.authUser.isDonor?"Update Info":"Register as Doner"} 
              leftIcon={<Web/>}
              containerElement={<Link to="/dashboard/registerDonor"/>}
            />
          <MUI.MenuItem
            className="navigation-menuItem"
            primaryText="Donors"
            leftIcon={<Web/>}
            containerElement={<Link to="/dashboard/donorlist"/>}
          />
      </div>
    );
  }

  render() {
    return (
      <div className="navigation-container">
        <MUI.AppBar style={this.props.styles} title="Blood Bank System"
              onLeftIconButtonTouchTap={this.props.drawerToggle}
              iconElementRight={<MUI.FlatButton label="Sign out" onTouchTap={this.props.logout}/>}
              onRightIconButtonTouchTap={()=>this.context.router.push("/login")}
              />
        <MUI.Drawer open={this.props.drawerOpen} docked={false}
            onRequestChange={this.props.drawerToggle}>
          {this.drawerMenu()}
        </MUI.Drawer>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);
