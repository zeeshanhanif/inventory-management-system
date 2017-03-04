export default class StockActions {

    static ADD_STORE = 'ADD_STORE';
    static ADD_STORE_SUCCESSFUL = 'ADD_STORE_SUCCESSFUL';
    static ADD_STORE_REJECTED = 'ADD_STORE_REJECTED';

    static ADD_PRODUCT = 'ADD_PRODUCT';
    static ADD_PRODUCT_SUCCESSFUL = 'ADD_PRODUCT_SUCCESSFUL';
    static ADD_PRODUCT_REJECTED = 'ADD_PRODUCT_REJECTED';

    static ADD_PURCHASE_DETAILS = 'ADD_PURCHASE_DETAILS';
    static ADD_PURCHASE_DETAILS_SUCCESSFUL = 'ADD_PURCHASE_DETAILS_SUCCESSFUL';
    static ADD_PURCHASE_DETAILS_REJECTED = 'ADD_PURCHASE_DETAILS_REJECTED';

    static ADD_SALE_DETAILS = 'ADD_SALE_DETAILS';
    static ADD_SALE_DETAILS_SUCCESSFUL = 'ADD_SALE_DETAILS_SUCCESSFUL';
    static ADD_SALE_DETAILS_REJECTED = 'ADD_SALE_DETAILS_REJECTED';

    static GET_STORE_LIST = 'GET_STORE_LIST';
    static GET_STORE_LIST_SUCCESSFUL = 'GET_STORE_LIST_SUCCESSFUL';
    static GET_STORE_LIST_REJECTED = 'GET_STORE_LIST_REJECTED';
    static ADD_STORE_ITEM = 'ADD_STORE_ITEM';

    static GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
    static GET_PRODUCT_LIST_SUCCESSFUL = 'GET_PRODUCT_LIST_SUCCESSFUL';
    static GET_PRODUCT_LIST_REJECTED = 'GET_PRODUCT_LIST_REJECTED';
    static ADD_PRODUCT_ITEM = 'ADD_PRODUCT_ITEM';

    static GET_STOCK_COUNT = 'GET_STOCK_COUNT';
    static GET_STOCK_COUNT_SUCCESSFUL = 'GET_STOCK_COUNT_SUCCESSFUL';
    static GET_STOCK_COUNT_REJECTED = 'GET_STOCK_COUNT_REJECTED';

    static GET_SALES_LIST = 'GET_SALES_LIST';
    static GET_SALES_LIST_SUCCESSFUL = 'GET_SALES_LIST_SUCCESSFUL';
    static GET_SALES_LIST_REJECTED = 'GET_SALES_LIST_REJECTED';
    static ADD_SALES_ITEM = 'ADD_SALES_ITEM';

    static GET_PURCHASE_LIST = 'GET_PURCHASE_LIST';
    static GET_PURCHASE_LIST_SUCCESSFUL = 'GET_PURCHASE_LIST_SUCCESSFUL';
    static GET_PURCHASE_LIST_REJECTED = 'GET_PURCHASE_LIST_REJECTED';
    static ADD_PURCHASE_ITEM = 'ADD_PURCHASE_ITEM';

    

    //Add Store
    static addStore() {
        return {
            type: StockActions.ADD_STORE
        }
    }

    static addStoreSuccessful(storeObj) {
        return {
            type: StockActions.ADD_STORE_SUCCESSFUL,
            payload: storeObj
        }
    }

    static addStoreRejected(error) {
        return {
            type: StockActions.ADD_STORE_REJECTED,
            payload: error
        }
    }  


    // Add Product
    static addProduct() {
        return {
            type: StockActions.ADD_PRODUCT
        }
    }

    static addProductSuccessful(productObj) {
        return {
            type: StockActions.ADD_PRODUCT_SUCCESSFUL,
            payload: productObj
        }
    }

    static addProductRejected(error) {
        return {
            type: StockActions.ADD_PRODUCT_REJECTED,
            payload: error
        }
    } 

    // Add Purchase Detail
    static addPurchaseDetails() {
        return {
            type: StockActions.ADD_PURCHASE_DETAILS
        }
    }

    static addPurchaseDetailsSuccessful(purcahseDetailsObj) {
        return {
            type: StockActions.ADD_PURCHASE_DETAILS_SUCCESSFUL,
            payload: purcahseDetailsObj
        }
    }

    static addPurchaseDetailsRejected(error) {
        return {
            type: StockActions.ADD_PURCHASE_DETAILS_REJECTED,
            payload: error
        }
    } 


    // Add Sales Detail
    static addSaleDetails() {
        return {
            type: StockActions.ADD_SALE_DETAILS
        }
    }

    static addSaleDetailsSuccessful(purcahseDetailsObj) {
        return {
            type: StockActions.ADD_SALE_DETAILS_SUCCESSFUL,
            payload: purcahseDetailsObj
        }
    }

    static addSaleDetailsRejected(error) {
        return {
            type: StockActions.ADD_SALE_DETAILS_REJECTED,
            payload: error
        }
    } 

    // Get Store List
    static getStoreList() {
        return {
            type: StockActions.GET_STORE_LIST
        }
    }

    static getStoreListSuccessful(storeList) {
        return {
            type: StockActions.GET_STORE_LIST_SUCCESSFUL,
            payload: storeList
        }
    }

    static addStoreItemToList(storeObj) {
        return {
            type: StockActions.ADD_STORE_ITEM,
            payload: storeObj
        }
    }


    // Get Product List
    static getProductList() {
        return {
            type: StockActions.GET_PRODUCT_LIST
        }
    }

    static getProductListSuccessful(productList) {
        return {
            type: StockActions.GET_PRODUCT_LIST_SUCCESSFUL,
            payload: productList
        }
    }

    static addProductItemToList(productObj) {
        return {
            type: StockActions.ADD_PRODUCT_ITEM,
            payload: productObj
        }
    }


    // Get Stock Count
    static getStockCount() {
        return {
            type: StockActions.GET_STOCK_COUNT
        }
    }

    static getStockCountSuccessful(stockCountObj) {
        return {
            type: StockActions.GET_STOCK_COUNT_SUCCESSFUL,
            payload: stockCountObj
        }
    }

    static getStockCountRejected(error) {
        return {
            type: StockActions.GET_STOCK_COUNT_SUCCESSFUL,
            payload: error
        }
    } 

    // Get Sales List
    static getSalesList() {
        return {
            type: StockActions.GET_SALES_LIST
        }
    }

    static getSalesListSuccessful(salesList) {
        return {
            type: StockActions.GET_SALES_LIST_SUCCESSFUL,
            payload: salesList
        }
    }

    static addSaleItemToList(saleObj) {
        return {
            type: StockActions.ADD_SALES_ITEM,
            payload: saleObj
        }
    }


    // Get Purchase List
    static getPurchaseList() {
        return {
            type: StockActions.GET_PURCHASE_LIST
        }
    }

    static getPurchaseListSuccessful(purchaseList) {
        return {
            type: StockActions.GET_PURCHASE_LIST_SUCCESSFUL,
            payload: purchaseList
        }
    }

    static addPurchaseItemToList(purchaseObj) {
        return {
            type: StockActions.ADD_PURCHASE_ITEM,
            payload: purchaseObj
        }
    }   
}