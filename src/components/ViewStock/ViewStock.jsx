import React, { Component,PropTypes } from 'react';
import styles from './ViewStockStyles';
import {Table, TableBody, TableHeader, TableHeaderColumn, 
        TableRow, TableRowColumn } from 'material-ui/Table';
import Paper  from 'material-ui/Paper';
import Divider  from 'material-ui/Divider';
import {Link} from 'react-router';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';


class ViewStock extends Component {


  formatList() {
    let {productList, storeList , stockCount} = this.props;
    var storeKeyValue = {};
    var productKeyValue = {};
    storeList.map(store=>{
      storeKeyValue[store.storeKey] = store.name;
    })
    productList.map(product=> {
      productKeyValue[product.productKey] = product.name
    })
/*
    var test = [
      {name:"productname",key:"productkey",
        storeList: [
          {
            storeName:"name",
            storeKey:"key",
            count: 34
          }
        ]
      }
    ];

*/
    var countProductList = [];
    var keys = Object.keys(this.props.stockCount);
    keys.map(key=>{
      countProductList.push({
        productName:productKeyValue[key],
        productKey: key,
        storeList: []
      });
      console.log(key);
    })
    console.log("countProductList>>>>>>>>>>>>",countProductList); 

    Object.keys(storeKeyValue).map(key=>{
      countProductList.map(prodItem=>{
        var storeCountItem = stockCount[prodItem.productKey][key]
        if(storeCountItem){
          prodItem.storeList.push({
            storeName:storeKeyValue[key],
            storeKey:key,
            count: storeCountItem.count
          })
        }
        else {
          prodItem.storeList.push({
            storeName:storeKeyValue[key],
            storeKey:key,
            count: 0
          })
        }
      })
      
    })
    console.log("<><><>MY Final List<><><><><><>",countProductList);
    return {
        productListWithCount: countProductList,
        storeKeyValue: storeKeyValue
      };
    //console.log("Product List",productList);
    //console.log("store List",storeList);
    //console.log("storeKeyValue ",storeKeyValue);
    //console.log("productKeyValue ",productKeyValue);
    //console.log(this.props.stockCount);
    
  }

  render() {
    var formatedObj = this.formatList();
    return (
      <div style={styles.viewStockContainer}>
        <Paper style={styles.paper}>
          <h3 style={styles.title}>Stock Details</h3>
          <Divider/>
          <Table>
            <TableHeader displaySelectAll={false}
                adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Product</TableHeaderColumn>
                {
                  Object.keys(formatedObj.storeKeyValue).map(key=>{
                    return <TableHeaderColumn key={key}>{formatedObj.storeKeyValue[key]}</TableHeaderColumn>
                  })
                }                
              </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
                showRowHover={true}
                stripedRows={true}
              >
              {
                formatedObj.productListWithCount.map(obj=>{
                  return (
                    <TableRow>
                      <TableRowColumn>{obj.productName}</TableRowColumn>
                      {
                        obj.storeList.map(st=>{
                          return <TableRowColumn key={st.storeKey}>{st.count}</TableRowColumn>  
                        })
                      }
                    </TableRow>
                  )
                })
              }
              
            </TableBody>
          </Table>

          <div style={styles.clear}/>
        </Paper>
      </div>
    );
  }
}

export default ViewStock;
