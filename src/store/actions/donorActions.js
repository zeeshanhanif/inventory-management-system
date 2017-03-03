export default class DonorActions {

    static REGISTER_DONOR = 'REGISTER_DONOR';
    static REGISTER_DONOR_SUCCESSFUL = 'REGISTER_DONOR_SUCCESSFUL';
    static REGISTER_DONOR_REJECTED = 'REGISTER_DONOR_REJECTED';

    static GET_DONOR_LIST = 'GET_DONOR_LIST';
    static GET_DONOR_LIST_SUCCESSFUL = 'GET_DONOR_LIST_SUCCESSFUL';
    static GET_DONOR_LIST_REJECTED = 'GET_DONOR_LIST_REJECTED';

    static ADD_DONOR = 'ADD_DONOR';

    static GET_DONOR_DETAIL = 'GET_DONOR_DETAIL';
    static GET_DONOR_DETAIL_SUCCESSFUL = 'GET_DONOR_DETAIL_SUCCESSFUL';
    static GET_DONOR_DETAIL_REJECTED = 'GET_DONOR_DETAIL_REJECTED';
    //static ADD_DONOR_SUCCESSFUL = 'GET_DONOR_LIST_SUCCESSFUL';
    //static ADD_DONOR_REJECTED = 'GET_DONOR_LIST_REJECTED';

    static registerDoner() {
        return {
            type: DonorActions.REGISTER_DONOR
        }
    }

    static registerDonerSuccessful(donorObj) {
        return {
            type: DonorActions.REGISTER_DONOR_SUCCESSFUL,
            payload: donorObj
        }
    }

    static registerDonerRejected(error) {
        return {
            type: DonorActions.REGISTER_DONOR_REJECTED,
            payload: error
        }
    }    


    static getDonorList() {
        return {
            type: DonorActions.GET_DONOR_LIST
        }
    }

    static getDonorListSuccessful(donorList) {
        return {
            type: DonorActions.GET_DONOR_LIST_SUCCESSFUL,
            payload: donorList
        }
    }

    static addDonorToList(donorObj) {
        return {
            type: DonorActions.ADD_DONOR,
            payload: donorObj
        }
    }

    static getDonorDetail() {
        return {
            type: DonorActions.GET_DONOR_DETAIL
        }
    }

    static getDonorDetailSuccessful(donorObj) {
        return {
            type: DonorActions.GET_DONOR_DETAIL_SUCCESSFUL,
            payload: donorObj
        }
    }

    static getDonorDetailRejected(error) {
        return {
            type: DonorActions.GET_DONOR_DETAIL_REJECTED,
            payload: error
        }
    }    
}