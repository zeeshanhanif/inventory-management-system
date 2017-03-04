import StockActions from "./../actions/stockActions";

const INITIAL_STATE = {
    isProcessing : false,
    isError : false,
    errorMessage: {},
    isDetailUpdated: false,
    storeList : [],
    productList : [],
    stockCount : {},
    salesList : [],
    purchaseList : []
}

function StockReducer(state = INITIAL_STATE, action) {
    switch(action.type) {  

        //Add Store      
        case StockActions.ADD_STORE:
            return {...state, isProcessing: true, isError : false,isDetailUpdated:false};
        case StockActions.ADD_STORE_SUCCESSFUL:
            return {...state, isProcessing: false ,isError : false, errorMessage: {},isDetailUpdated:true};            
        case StockActions.ADD_STORE_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload,isDetailUpdated:false};

        //Add Product
        case StockActions.ADD_PRODUCT:
            return {...state, isProcessing: true, isError : false,isDetailUpdated:false};
        case StockActions.ADD_PRODUCT_SUCCESSFUL:
            return {...state, isProcessing: false ,isError : false, errorMessage: {},isDetailUpdated:true};            
        case StockActions.ADD_PRODUCT_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload,isDetailUpdated:false};

        //Add Purchase Details
        case StockActions.ADD_PURCHASE_DETAILS:
            return {...state, isProcessing: true, isError : false,isDetailUpdated:false};
        case StockActions.ADD_PURCHASE_DETAILS_SUCCESSFUL:
            return {...state, isProcessing: false ,isError : false, errorMessage: {},isDetailUpdated:true};            
        case StockActions.ADD_PURCHASE_DETAILS_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload,isDetailUpdated:false};

        //Add Sales Details
        case StockActions.ADD_SALE_DETAILS:
            return {...state, isProcessing: true, isError : false,isDetailUpdated:false};
        case StockActions.ADD_SALE_DETAILS_SUCCESSFUL:
            return {...state, isProcessing: false ,isError : false, errorMessage: {},isDetailUpdated:true};            
        case StockActions.ADD_SALE_DETAILS_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload,isDetailUpdated:false};
        
        // Get Store List
        case StockActions.GET_STORE_LIST:
            return {...state, isProcessing: true, isError : false,storeList:[]};
        case StockActions.GET_STORE_LIST_SUCCESSFUL:
            return {...state, isProcessing: false, isError : false, storeList:action.payload};
        case StockActions.ADD_STORE_ITEM:
            var newStoreList = [...state.storeList];
            newStoreList.push(action.payload);
            return {...state, isProcessing: false, isError : false, storeList:newStoreList};

        // Get Product List
        case StockActions.GET_PRODUCT_LIST:
            return {...state, isProcessing: true, isError : false,productList:[]};
        case StockActions.GET_PRODUCT_LIST_SUCCESSFUL:
            return {...state, isProcessing: false, isError : false, productList:action.payload};
        case StockActions.ADD_PRODUCT_ITEM:
            var newProductList = [...state.productList];
            newProductList.push(action.payload);
            return {...state, isProcessing: false, isError : false, productList:newProductList};

        // Get Stock Count
        case StockActions.GET_STOCK_COUNT:
            return {...state, isProcessing: true, isError : false, stockCount: {}};
        case StockActions.GET_STOCK_COUNT_SUCCESSFUL:            
            return {...state, isProcessing: false ,isError : false, errorMessage: {},stockCount:action.payload};
        case StockActions.GET_STOCK_COUNT_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload, stockCount:{}};

        // Get Sales List        
        case StockActions.GET_SALES_LIST:
            return {...state, isProcessing: true, isError : false,salesList:[]};
        case StockActions.GET_SALES_LIST_SUCCESSFUL:
            return {...state, isProcessing: false, isError : false, salesList:action.payload};
        case StockActions.ADD_SALES_ITEM:
            var newSalesList = [...state.salesList];
            newSalesList.push(action.payload);
            return {...state, isProcessing: false, isError : false, salesList:newSalesList};

        // Get Purchase List
        case StockActions.GET_PURCHASE_LIST:
            return {...state, isProcessing: true, isError : false,purchaseList:[]};
        case StockActions.GET_PURCHASE_LIST_SUCCESSFUL:
            return {...state, isProcessing: false, isError : false, purchaseList:action.payload};
        case StockActions.ADD_PURCHASE_ITEM:
            var newPurchaseList = [...state.purchaseList];
            newPurchaseList.push(action.payload);
            return {...state, isProcessing: false, isError : false, purchaseList:newPurchaseList};            

        default:
            return state;
    }
}

export default StockReducer;