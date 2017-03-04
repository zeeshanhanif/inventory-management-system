import React, { Component,PropTypes } from 'react';
import styles from './AddProductStyles';
import * as MUI from 'material-ui'
import {Link} from 'react-router';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';


class AddProduct extends Component {

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
    console.log("proudct obj",data);
    this.props.addProduct(data);
    this.setState({snackbarOpen:true});
    
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {
    return (
      <div style={styles.addProductContainer}>
        <MUI.Paper style={styles.paper}>
          <h3 style={styles.title}>Add Product</h3>
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
              hintText="Product Name"
              floatingLabelText="Product Name"
              fullWidth={true}
            />
          
          <FormsyText
            ref="manufacturer"
            name="manufacturer"
            validations="isWords"
            validationError={this.errorMessages.wordsError}
            required
            hintText="Manufacturer"
            floatingLabelText="Manufacturer"
            fullWidth={true}
          />

          <FormsyText
            ref="description"
            name="description"
            validations="isWords"
            validationError={this.errorMessages.wordsError}
            required
            hintText="Description"
            floatingLabelText="Description"
            fullWidth={true}
          />
          
          <div style={styles.buttons}>
            <Link to="/">
              <MUI.RaisedButton label="Cancel"/>
            </Link>

            <MUI.RaisedButton label="Save"
                          style={styles.saveButton}
                          primary={true}
                          type="submit"
                          disabled={!this.state.canSubmit}/>
          </div>
        </Formsy.Form>

          <div style={styles.clear}/>
        </MUI.Paper>
        <MUI.Snackbar
          open={this.state.snackbarOpen}
          message="Product Added Successfuly"
          autoHideDuration={3000}
        />
      </div>
    );
  }
}

export default AddProduct;
