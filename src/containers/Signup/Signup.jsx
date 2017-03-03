import React, { Component,PropTypes } from 'react';
import './Signup.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as MUI from 'material-ui'
import AppTheme from '../../app-theme';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { AuthMiddleware } from '../../store'

function mapStateToProps(state) {
    return {
        isRegistered: state.AuthReducer.isRegistered,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signup: (credentials) => dispatch(AuthMiddleware.signup(credentials))
    };
}

class Signup extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(){
    super();
    this.handelSignup = this.handelSignup.bind(this);
  }
  handelSignup() {
    this.props.signup(
      {
        "email":this.refs.email.getValue(),
        "password":this.refs.password.getValue(),
        "fullName":this.refs.fullName.getValue()
      })
    console.log("Hello world");
  }

  componentWillReceiveProps(nextProps){
    setTimeout(()=> {
      if(this.props.isRegistered){
        console.log("isRegistered true in signup");
        this.context.router.push("/login");
      }
    },0);
  }
  
  render() {
      console.log("Authenticated FALSE in signup");    
      return (
        <MuiThemeProvider muiTheme={AppTheme}>          
        <div>
          <div className="signup-loginContainer">
            <MUI.Paper className="signup-paper">
              <form>
                <MUI.TextField
                    ref="fullName"
                    hintText="Full Name"
                    floatingLabelText="Full Name"
                    fullWidth={true}
                  />
                <MUI.TextField
                  ref="email"
                  hintText="E-mail"
                  floatingLabelText="E-mail"
                  fullWidth={true}
                />
                <MUI.TextField
                  ref="password"
                  hintText="Password"
                  floatingLabelText="Password"
                  fullWidth={true}
                  type="password"
                />

                <div>
                  
                  <MUI.RaisedButton label="Signup"
                                primary={true}
                                className="signup-loginBtn"
                                onTouchTap={this.handelSignup}/>
                  
                </div>
              </form>
            </MUI.Paper>  
            <div className="signup-buttonsDiv">
            <Link to="/login">
                <MUI.FlatButton
                  label="Login"
                  className="signup-flatButton"
                />
              </Link>
            </div>       
            
          </div>
        </div>
        </MuiThemeProvider>
      );
  }
}

//export default Signup;
export default connect(mapStateToProps,mapDispatchToProps)(Signup)
