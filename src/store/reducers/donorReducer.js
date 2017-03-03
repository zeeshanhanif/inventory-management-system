import DonorActions from "./../actions/donorActions";

const INITIAL_STATE = {
    //authUser: {},
    isProcessing : false,
    isError : false,
    errorMessage: {},
    donorList: [],
    donorDetail : {},
    isDetailUpdated: false,
}

function DonorReducer(state = INITIAL_STATE, action) {
    switch(action.type) {        
        case DonorActions.REGISTER_DONOR:
            return {...state, isProcessing: true, isError : false,isDetailUpdated:false};
        case DonorActions.REGISTER_DONOR_SUCCESSFUL:
            return {...state, isProcessing: false ,isError : false, errorMessage: {},isDetailUpdated:true};            
        case DonorActions.REGISTER_DONOR_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload,isDetailUpdated:false};         
        case DonorActions.GET_DONOR_LIST:
            return {...state, isProcessing: true, isError : false,donorList:[]};
        case DonorActions.GET_DONOR_LIST_SUCCESSFUL:
            return {...state, isProcessing: false, isError : false, donorList:action.payload};
        case DonorActions.ADD_DONOR:
            var newDonorList = [...state.donorList];
            newDonorList.push(action.payload);
            return {...state, isProcessing: false, isError : false, donorList:newDonorList};
        case DonorActions.GET_DONOR_DETAIL:
            return {...state, isProcessing: true, isError : false, donorDetail: {}};
        case DonorActions.GET_DONOR_DETAIL_SUCCESSFUL:
            return {...state, isProcessing: false ,isError : false, errorMessage: {},donorDetail:action.payload};            
        case DonorActions.GET_DONOR_DETAIL_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload, donorDetail:{}};
        default:
            return state;
    }
}

export default DonorReducer;