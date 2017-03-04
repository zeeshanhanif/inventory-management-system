import React, { Component,PropTypes } from 'react';
import styles from './PurchaseProductStyles';
import * as MUI from 'material-ui'
import {Link} from 'react-router';
import Formsy from 'formsy-react';
import { FormsyText,FormsyDate,FormsySelect } from 'formsy-material-ui/lib';


class PurchaseProduct extends Component {

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
    wordsError: "Please only use letters",
    numericError: "Please provide a number"
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
    console.log("purcahse details object ",data);
    data.date = data.date.getTime();
    data.storeKey = data.store.split("_")[0];
    data.store =  data.store.split("_")[1];

    data.productKey = data.product.split("_")[0];
    data.product =  data.product.split("_")[1];

    data.quantity = parseInt(data.quantity,10);
    data.unitPrice = parseInt(data.unitPrice,10);

    console.log("purcahse details object after ",data);

    this.props.addPurchaseDetails(data);
    this.setState({snackbarOpen:true});
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {
    return (
      <div style={styles.purchaseProductContainer}>
        <MUI.Paper style={styles.paper}>
          <h3 style={styles.title}>Add Purchase Details</h3>
          <MUI.Divider/>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}>

            <FormsySelect
              name="store"
              required
              floatingLabelText="Store"
              fullWidth={true}
            >
              {
                this.props.storeList.map(store=>{
                  return <MUI.MenuItem value={store.storeKey+'_'+store.name} primaryText={store.name} />
                })
              }
            </FormsySelect>
            
            <FormsySelect
              name="product"
              required
              floatingLabelText="Product"
              fullWidth={true}
            >
              {
                this.props.productList.map(product=>{
                  return <MUI.MenuItem value={product.productKey+'_'+product.name} primaryText={product.name} />
                })
              }
              
            </FormsySelect>

            <FormsyDate
              name="date"
              required
              floatingLabelText="Purchase Date"
              fullWidth={true}
              
            />

            <FormsyText
              name="quantity"
              validations="isNumeric"
              validationError={this.errorMessages.numericError}
              required
              hintText="Quantity"
              floatingLabelText="Quantity"
              fullWidth={true}
            />

            <FormsyText
              name="unitPrice"
              validations="isNumeric"
              validationError={this.errorMessages.numericError}
              required
              hintText="Unit Price"
              floatingLabelText="Unit Price"
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
          message="Purchase Detail Added Successfuly"
          autoHideDuration={3000}
        />
      </div>
    );
  }
}

export default PurchaseProduct;
