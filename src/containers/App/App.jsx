import React, { Component,PropTypes } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import * as MUI from 'material-ui'
import AppTheme from '../../app-theme';
import Navigation from '../Navigation/Navigation'
import { connect } from 'react-redux';
import { AuthMiddleware, StockMiddleware } from '../../store'

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        storeList : state.StockReducer.storeList,
        productList : state.StockReducer.productList,
        stockCount : state.StockReducer.stockCount,
        salesList : state.StockReducer.salesList,
        purchaseList : state.StockReducer.purchaseList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        isLoggedIn: () => dispatch(AuthMiddleware.isLoggedIn()),
        addStore : (storeObj)=> dispatch(StockMiddleware.addStore(storeObj)),
        addProduct : (productObj)=> dispatch(StockMiddleware.addProduct(productObj)),
        addPurchaseDetails : (purchaseDetailsObj)=> dispatch(StockMiddleware.addPurchaseDetails(purchaseDetailsObj)),
        addSaleDetails : (saleDetailsObj)=> dispatch(StockMiddleware.addSaleDetails(saleDetailsObj)),

        getStoreList : ()=> dispatch(StockMiddleware.getStoreList()),
        getProductList : ()=> dispatch(StockMiddleware.getProductList()),
        getStockCount : ()=> dispatch(StockMiddleware.getStockCounts()),
        getSalesList : (startDate,endDate)=> dispatch(StockMiddleware.getSaleList(startDate,endDate)),
        getPurchaseList : (startDate,endDate)=> dispatch(StockMiddleware.getPurchaseList(startDate,endDate))
    };
}


class App extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(){
    super();
    setTimeout(() => {
        this.props.isLoggedIn()
    }, 5);

    this.state = {
      drawerOpen : false
    }
  }

  componentWillMount() {
    this.props.getStoreList();
    this.props.getProductList();
    this.props.getStockCount();
    if(this.props.isAuthenticated){
      console.log("Authenticated");
    }
    else {
      console.log("Not Authenticated");
      //Uncomment it and it will move to login page if not authenticated
      this.context.router.push("/login");
    }
    
  }

  handleDrawerToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});
  render() {

    // User for resizing center view and header
    let { drawerOpen } = this.state;
    const paddingLeftDrawerOpen = 280;

    const styles = {
      header: {
        // User for resizing center view and header
        paddingLeft: drawerOpen ? paddingLeftDrawerOpen : 20
      },
      container: {
        // User for resizing center view and header
        margin: '20px 20px 20px 15px',
        paddingLeft: drawerOpen ? paddingLeftDrawerOpen : 0
      }
    };
    

    return (
      <MuiThemeProvider muiTheme={AppTheme}>
        <div className="app">
        <Navigation styles={styles.header} drawerOpen={this.state.drawerOpen} drawerToggle={this.handleDrawerToggle.bind(this)}/>
        <div className="app-childs" style={styles.container}>
          {this.props.children?React.cloneElement(this.props.children, {...this.props}):this.props.children}
        </div>
        </div>
      </MuiThemeProvider>
      
    );
  }
}

//export default App;
export default connect(mapStateToProps,mapDispatchToProps)(App)