import React, { Component,PropTypes } from 'react';
import styles from './AddStoreStyles';
import * as MUI from 'material-ui'
import {Link} from 'react-router';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';


class AddStore extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props){
    super();
    console.log("component props ",props);
    this.state = {
        canSubmit:false,
        snackbarOpen: false
    }
    
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
  }


  errorMessages = {
    wordsError: "Please only use letters"
  }

  componentWillReceiveProps(nextProps){
    setTimeout(()=> {
      if(this.props.isDetailUpdated){
        console.log("isDetailUpdated true");
        //this.context.router.push("/dashboard");
      }
    },0);
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  submitForm(data) {    
    console.log("store obj",data);
    this.props.addStore(data);    
    this.setState({snackbarOpen:true});
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {
    return (
      <div style={styles.addStoreContainer}>
        <MUI.Paper style={styles.paper}>
          <h3 style={styles.title}>Add Store</h3>
          <MUI.Divider/>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}>

            <FormsyText
              ref="name"
              name="name"
              validations="isWords"
              validationError={this.errorMessages.wordsError}
              required
              hintText="Store Name"
              floatingLabelText="Store Name"
              fullWidth={true}
            />
          
          <FormsyText
            ref="location"
            name="location"
            validations="isWords"
            validationError={this.errorMessages.wordsError}
            required
            hintText="Location"
            floatingLabelText="Location"
            fullWidth={true}
          />
          
          <div style={styles.buttons}>
            <Link to="/">
              <MUI.RaisedButton label="Cancel"/>
            </Link>

            <MUI.RaisedButton label="Save"
                          style={styles.saveButton}
                          onTouchTap={this.handleSave}
                          primary={true}
                          type="submit"
                          disabled={!this.state.canSubmit}/>
          </div>
        </Formsy.Form>

          <div style={styles.clear}/>
        </MUI.Paper>
        <MUI.Snackbar
          open={this.state.snackbarOpen}
          message="Store Added Successfuly"
          autoHideDuration={3000}
        />
      </div>
    );
  }
}

export default AddStore;
