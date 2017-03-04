import StockActions from "./../actions/stockActions";
//import AuthMiddleware from "./authMiddleware";
import * as firebase from 'firebase';

export default class StockMiddleware {

    static formatStringForKey(obj,propertyToFormat,newProperty){
        obj[newProperty] = obj[propertyToFormat].toLowerCase().replace(/\s+/g, '');
    }

    //Add Store
    static addStore(storeObj) {
        console.log("addStore ",storeObj);
        return (dispatch) => {
            dispatch(StockActions.addStore())
            StockMiddleware.addStoreOnFirebase(dispatch,storeObj);            
        }
    }

    static addStoreOnFirebase(dispatch,storeObj){
        StockMiddleware.formatStringForKey(storeObj,"name","storeKey");
        firebase.database().ref('/')
            .child(`stores`)
            .push(storeObj)
            .then(function (){
                dispatch(StockActions.addStoreSuccessful());
            })
            .catch(function (error){
                dispatch(StockActions.addStoreRejected(error));
            });
    }

    //Add Product
    static addProduct(productObj) {
        console.log("addProduct ",productObj);
        return (dispatch) => {
            dispatch(StockActions.addProduct())
            StockMiddleware.addProductOnFirebase(dispatch,productObj);            
        }
    }

    static addProductOnFirebase(dispatch,productObj){
        StockMiddleware.formatStringForKey(productObj,"name","productKey");
        firebase.database().ref('/')
            .child(`products`)
            .push(productObj)
            .then(function (){
                dispatch(StockActions.addProductSuccessful());
            })
            .catch(function (error){
                dispatch(StockActions.addProductRejected(error));
            });
    }

    //Add Purchase Details
    static addPurchaseDetails(purchaseDetailsObj) {
        console.log("addPurchaseDetails ",purchaseDetailsObj);
        return (dispatch) => {
            dispatch(StockActions.addPurchaseDetails())
            StockMiddleware.addPurchaseDetailsOnFirebase(dispatch,purchaseDetailsObj);            
        }
    }

    static addPurchaseDetailsOnFirebase(dispatch,purchaseDetailsObj){
        //StockMiddleware.formatStringForKey(purchaseDetailsObj,"name","productKey");
        purchaseDetailsObj.type="Purchase";
        firebase.database().ref('/')
            .child(`inventoryDetails`)
            .push(purchaseDetailsObj)
            .then(function (){
                //dispatch(StockActions.addPurchaseDetailsSuccessful());
                StockMiddleware.addStockCountOnFirebase(dispatch,purchaseDetailsObj);
            })
            .catch(function (error){
                dispatch(StockActions.addPurchaseDetailsRejected(error));
            });
    }

    static addStockCountOnFirebase(dispatch,purchaseDetailsObj){
        var countRef = firebase.database().ref('/')
                        .child(`stockCounts/${purchaseDetailsObj.productKey}/${purchaseDetailsObj.storeKey}`);
            countRef.once('value')
            .then(function (count){
                var countforProduct = 0;
                if(count && count.val()){
                    countforProduct = count.val().count;
                }

                countRef.update({count:countforProduct+purchaseDetailsObj.quantity})
                .then(function (){
                    dispatch(StockActions.addPurchaseDetailsSuccessful());
                })
                .catch(function (error){
                    dispatch(StockActions.addPurchaseDetailsRejected(error));
                });
            });         
    }


    //Add Sale Details
    static addSaleDetails(saleDetailsObj) {
        console.log("addSaleDetails ",saleDetailsObj);
        return (dispatch) => {
            dispatch(StockActions.addSaleDetails())
            StockMiddleware.addSaleDetailsOnFirebase(dispatch,saleDetailsObj);            
        }
    }

    static addSaleDetailsOnFirebase(dispatch,saleDetailsObj){
        //StockMiddleware.formatStringForKey(purchaseDetailsObj,"name","productKey");
        saleDetailsObj.type="Sale";
        firebase.database().ref('/')
            .child(`inventoryDetails`)
            .push(saleDetailsObj)
            .then(function (){
                StockMiddleware.subtractStockCountOnFirebase(dispatch,saleDetailsObj);
                //dispatch(StockActions.addSaleDetailsSuccessful());
            })
            .catch(function (error){
                dispatch(StockActions.addSaleDetailsRejected(error));
            });
    }  

    static subtractStockCountOnFirebase(dispatch,saleDetailsObj){
        var countRef = firebase.database().ref('/')
                        .child(`stockCounts/${saleDetailsObj.productKey}/${saleDetailsObj.storeKey}`);
            countRef.once('value')
            .then(function (count){
                var countforProduct = 0;
                if(count && count.val()){
                    countforProduct = count.val().count;
                }
                var newCount = countforProduct - saleDetailsObj.quantity;
                StockMiddleware.updateNotificationOnFirebase(dispatch,newCount,saleDetailsObj);
                countRef.update({count:newCount})
                .then(function (){
                    dispatch(StockActions.addSaleDetailsSuccessful());
                })
                .catch(function (error){
                    dispatch(StockActions.addSaleDetailsRejected(error));
                });
            });         
    }  

    static updateNotificationOnFirebase(dispatch,newCount,detailsObj){
        if(newCount<5){
            firebase.database().ref('/')
            .child(`notifications/${detailsObj.storeKey}|${detailsObj.productKey}`)
            .set(({productName:detailsObj.product,storeName:detailsObj.store,quantity:newCount}))
            .then(function (){
                //StockMiddleware.subtractStockCountOnFirebase(dispatch,saleDetailsObj);
                //dispatch(StockActions.addSaleDetailsSuccessful());
            })
            .catch(function (error){
                //dispatch(StockActions.addSaleDetailsRejected(error));
            });
        }
    }
    /// Get Store List Functions
    static getStoreList() {
        console.log("getStoreList ");
        return (dispatch) => {
            dispatch(StockActions.getStoreList())
            StockMiddleware.getStoreListFromFirebase(dispatch);            
        }
    }

    static getStoreListFromFirebase(dispatch){
        const storeListRef = firebase.database().ref('/')
                            .child("stores")
        storeListRef.on("child_added",function (snapshot){
            dispatch(StockActions.addStoreItemToList(snapshot.val()))
        })
    }


    /// Get Product List Functions
    static getProductList() {
        console.log("getProductList ");
        return (dispatch) => {
            dispatch(StockActions.getProductList())
            StockMiddleware.getProductListFromFirebase(dispatch);            
        }
    }

    static getProductListFromFirebase(dispatch){
        const productListRef = firebase.database().ref('/')
                            .child("products")
        productListRef.on("child_added",function (snapshot){
            dispatch(StockActions.addProductItemToList(snapshot.val()))
        })
    }


    /// Get Sales List Functions
    static getSaleList(startDate,endDate) {
        console.log("getSaleList ");
        return (dispatch) => {
            dispatch(StockActions.getSalesList())
            StockMiddleware.getSalesListFromFirebase(dispatch,startDate,endDate);            
        }
    }

    static getSalesListFromFirebase(dispatch,startDate,endDate){
        const salesListRef = firebase.database().ref('/')
                            .child("inventoryDetails")
                            .orderByChild("date")
                            //.equalTo("Sale")
                            .startAt(startDate).endAt(endDate);
        salesListRef.on("child_added",function (snapshot){
            if(snapshot.val().type==="Sale") {
                dispatch(StockActions.addSaleItemToList(snapshot.val()))
            }
        })
    }

    /// Get Purchase List Functions
    static getPurchaseList(startDate,endDate) {
        console.log("getPurchaseList ");
        return (dispatch) => {
            dispatch(StockActions.getPurchaseList())
            StockMiddleware.getPurchaseListFromFirebase(dispatch,startDate,endDate);            
        }
    }

    static getPurchaseListFromFirebase(dispatch,startDate,endDate){
        const purchaseListRef = firebase.database().ref('/')
                            .child("inventoryDetails")
                            .orderByChild("type").equalTo("Purchase");
        purchaseListRef.on("child_added",function (snapshot){
            dispatch(StockActions.addPurchaseItemToList(snapshot.val()))
        })
    }

    //Get Stock Counts
    static getStockCounts() {
        console.log("getStockCounts");
        return (dispatch) => {
            dispatch(StockActions.getStockCount())
            StockMiddleware.getStockCountFromFirebase(dispatch);            
        }
    }

    static getStockCountFromFirebase(dispatch){
        firebase.database().ref('/')
            .child(`stockCounts`)
            .on("value",function (snapshot){
                console.log(snapshot.val());
                dispatch(StockActions.getStockCountSuccessful(snapshot.val()));
            });
    }
}