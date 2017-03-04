import React, { Component,PropTypes } from 'react';
import styles from './GraphsStyles';
import * as MUI from 'material-ui'
import {Link} from 'react-router';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import moment from 'moment';
import regression from 'regression'

import {LineChart, Line, ResponsiveContainer,CartesianGrid,XAxis,YAxis} from 'recharts';


class Graphs extends Component {


  constructor(props){
    super();
    console.log("component props ",props);
    this.state = {
        canSubmit:false,
        snackbarOpen: false,
        predictedValue : NaN,
    }
    
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.equation = null;
    
  }

  errorMessages = {
    wordsError: "Please only use letters",
    numericError: "Please provide a number"
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
    console.log("predict from ",data);
    if(this.equation){
      var eq = this.equation.equation[0];
      var yIntercept = this.equation.equation[1]?this.equation.equation[1]:0;
      var finalVal = data.predictValue * eq + yIntercept;
      this.setState({
        predictedValue: finalVal,
      });
    }
    else {
      this.setState({
        snackbarOpen: true,
      });
    }
    
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  componentWillMount(){
      this.props.getSalesList(0,new Date().getTime());
  }

  calculateSaleData(){
    console.log("sale report data ===== >>> ",this.props.salesList);
    //var a = moment;
    var dateWiseSales = {};
    var multiKeySales = [];
    this.props.salesList.map(saleItem=> {
      var itemDate = moment(saleItem.date).format("L");
      if(!dateWiseSales[itemDate]){
          dateWiseSales[itemDate] = 0;
      }
      dateWiseSales[itemDate] += saleItem.quantity * saleItem.unitPrice;
    })
    console.log("final report sale report data ===== >>> ",dateWiseSales);
    return dateWiseSales;
  }

  createListForGraph(){
      var dateWiseSales = this.calculateSaleData();
      var listOneKey = [];
      var listTwoKey = [];
      Object.keys(dateWiseSales).map(key=>{
          listOneKey.push({uv:dateWiseSales[key]});
          listTwoKey.push({name:key,uv:dateWiseSales[key]});
      });
      return {
        oneKeyList: listOneKey,
        twoKeyList: listTwoKey
      }
  }

  generateDataForRegression(myGraphData){
    //var myGraphData = this.createListForGraph();
    var dataList = [];

    myGraphData.oneKeyList.map(item=>{
      dataList.push([1,item.uv]);
    });

    return dataList;
  }

  getLeastSquaresFittingLineData(myGraphData){
    var dataListForRegression = this.generateDataForRegression(myGraphData); 
    var result = regression('linearThroughOrigin', dataListForRegression);
    var equation = result.equation[0];
    var yIntercept = result.equation[1]?result.equation[1]:0;
    var squaresFittingLineDataOneKey = [];
    var squaresFittingLineDataTwoKey = [];
    myGraphData.oneKeyList.map((item,index)=>{
    var updatedValue = (index+1)* equation + yIntercept;
      squaresFittingLineDataOneKey.push({uv:updatedValue});
      squaresFittingLineDataTwoKey.push({name:myGraphData.twoKeyList[index].name,uv:updatedValue});
    });
    this.equation = result;
    console.log("regression Result ",result);
    return {
      regressionEquation: result,
      fittedListOneKeyList : squaresFittingLineDataOneKey,
      fittedListTwoKeyList : squaresFittingLineDataTwoKey
    }
  }

  render() {
    var myGraphData = this.createListForGraph();
    console.log(regression);
    var equationAndFittedList = this.getLeastSquaresFittingLineData(myGraphData);

    

    
    //data={myGraphData.oneKeyList}
    //data={equationAndFittedList.fittedListOneKeyList}
    return (
      <div style={styles.graphsContainer}>

        <div>        
              <Formsy.Form
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                onValidSubmit={this.submitForm}
                onInvalidSubmit={this.notifyFormError}>
                
                <FormsyText
                    style={{float:"left"}}
                    name="predictValue"
                    validations="isNumeric"
                    validationError={this.errorMessages.numericError}
                    required
                    hintText="Predict Value"
                    floatingLabelText="Predict Value"
                  />

                
                <MUI.RaisedButton label="Predict"  
                              style={{float:"left",verticalAlign:"bottom",marginTop:28,marginLeft:10}}
                              primary={true}
                              type="submit"
                              disabled={!this.state.canSubmit}
                              />
                  <div style={{float:"left",verticalAlign:"bottom",marginTop:40,marginLeft:10}}>
                    <span>
                      {isNaN(this.state.predictedValue)?"No Value":this.state.predictedValue}
                    </span>
                  </div>
                <div style={styles.clear}></div>
            </Formsy.Form>
            
        </div>

        <MUI.Paper style={styles.paper}>
          <div style={{...styles.header}}>Sales Volume</div>
          <div style={styles.div}>
            <ResponsiveContainer >
                <LineChart
                    width={400}
                    height={400}
                    data={myGraphData.twoKeyList}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                  <XAxis dataKey="name" />
                  
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="name" stroke="#ff7300" yAxisId={0} />
                <Line type="monotone" dataKey="uv" stroke="#387908" yAxisId={1} />
                </LineChart>
            </ResponsiveContainer>
          </div>
        </MUI.Paper>

        <MUI.Paper style={styles.paper}>
          <div style={{...styles.header}}>Least Squares Fitting Line</div>
          <div style={styles.div}>
            <ResponsiveContainer >
                <LineChart
                    width={400}
                    height={400}
                    data={equationAndFittedList.fittedListTwoKeyList}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                  <XAxis dataKey="name" />
                  
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="name" stroke="#ff7300" yAxisId={0} />
                <Line type="monotone" dataKey="uv" stroke="#387908" yAxisId={1} />
                </LineChart>
            </ResponsiveContainer>
          </div>
        </MUI.Paper>  
        <MUI.Divider/>
        <div style={{marginTop:20}}>
          <h2>Sales Data</h2>
          <MUI.List>
                {myGraphData.twoKeyList.map((item) =>
                  <MUI.ListItem
                    key={item.name}
                    primaryText={item.name}
                    secondaryText={item.uv}
                    >
                  </MUI.ListItem>
                )}
              </MUI.List>
        </div> 
        <MUI.Snackbar
          open={this.state.snackbarOpen}
          message="Something went wrong unable to Preditct Value"
          autoHideDuration={3000}
        />          
      </div>
    );
  }
}

export default Graphs;
