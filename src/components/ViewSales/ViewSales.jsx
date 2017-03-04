import React, { Component,PropTypes } from 'react';
import styles from './ViewSalesStyles';
import * as MUI from 'material-ui'
import {Link} from 'react-router';
import Formsy from 'formsy-react';
import { FormsyText,FormsyDate } from 'formsy-material-ui/lib';
import {Table, TableBody, TableHeader, TableHeaderColumn, 
        TableRow, TableRowColumn } from 'material-ui/Table';
import Paper  from 'material-ui/Paper';
import Divider  from 'material-ui/Divider';
import Moment from 'react-moment';


class ViewSales extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props){
    super();
    console.log("component props ",props);
    this.state = {
        canSubmit:false
    }
    
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
  }


  errorMessages = {
    wordsError: "Please only use letters"
  }

  componentWillMount() {
    this.props.getSalesList(0,(new Date()).getTime());
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
    //alert(JSON.stringify(data));
    console.log(data);
    console.log(data.startDate.getTime());
    console.log(new Date())
    this.props.getSalesList(data.startDate.getTime(),data.endDate.getTime());
    
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {
    return (
      <div style={styles.viewSalesContainer}>
        <MUI.Paper style={styles.paper}>
          <h3 style={styles.title}>Sales</h3>
          <MUI.Divider/>

          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}>
            
            <FormsyDate
              style={{float:"left"}}
              name="startDate"
              required
              floatingLabelText="State Date"
            />
            <FormsyDate
              style={{float:"left",marginLeft:10}}
              name="endDate"
              required
              floatingLabelText="End Date"
            />
            <MUI.RaisedButton label="Filter"  
                          style={{float:"left",verticalAlign:"bottom",marginTop:28,marginLeft:10}}
                          primary={true}
                          type="submit"
                          disabled={!this.state.canSubmit}
                          />
            <div style={styles.clear}></div>
        </Formsy.Form>
          
          <MUI.Divider style={{marginTop:30}}/>
          <Table>
            <TableHeader displaySelectAll={false}
                adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Product Name</TableHeaderColumn>
                <TableHeaderColumn>Store</TableHeaderColumn>
                <TableHeaderColumn>Type</TableHeaderColumn>
                <TableHeaderColumn>Quantity</TableHeaderColumn>
                <TableHeaderColumn>Unit Price</TableHeaderColumn>
                 <TableHeaderColumn>Sale Volume</TableHeaderColumn>
                <TableHeaderColumn>Date</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
                showRowHover={true}
                stripedRows={true}
              >

              {
                this.props.salesList.map(saleItem=>{
                   return (
                      <TableRow>              
                        <TableRowColumn>{saleItem.product}</TableRowColumn>
                        <TableRowColumn>{saleItem.store}</TableRowColumn>
                        <TableRowColumn>{saleItem.type}</TableRowColumn>
                        <TableRowColumn>{saleItem.quantity}</TableRowColumn>
                        <TableRowColumn>{saleItem.unitPrice}</TableRowColumn>
                        <TableRowColumn>{saleItem.quantity * saleItem.unitPrice}</TableRowColumn>
                        <TableRowColumn><Moment format="DD/MMM/YYYY">{saleItem.date}</Moment></TableRowColumn>
                      </TableRow>
                   );
                })
              }
                           
            </TableBody>
          </Table>

          <div style={styles.clear}/>
        </MUI.Paper>
      </div>
    );
  }
}

export default ViewSales;
