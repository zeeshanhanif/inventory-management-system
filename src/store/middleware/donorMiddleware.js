import DonorActions from "./../actions/donorActions";
import AuthMiddleware from "./authMiddleware";
import * as firebase from 'firebase';

export default class DonorMiddleware {

    
    static registerDonor(donorDetail) {
        console.log("donorDetail ",donorDetail);
        return (dispatch) => {
            dispatch(DonorActions.registerDoner())
            DonorMiddleware.updateUserInfoOnFirebase(dispatch,donorDetail);            
        }
    }

    static updateUserInfoOnFirebase(dispatch,donorDetail){
        firebase.database().ref('/')
            .child(`users/${donorDetail.uid}`)
            .update(donorDetail)
            .then(function (){
                dispatch(DonorActions.registerDonerSuccessful());
                dispatch(AuthMiddleware.updateUser(donorDetail));
            });

    }


    /// Fetch Donor List Functions
    static getDonorList(bloodGroup) {
        console.log("getDonorList ",bloodGroup);
        return (dispatch) => {
            dispatch(DonorActions.getDonorList())
            DonorMiddleware.getDonorListFromFirebase(dispatch,bloodGroup);            
        }
    }

    static getDonorListFromFirebase(dispatch,bloodGroup){
        //playersRef.orderByChild("name").equalTo("John")
        const donorListRef = firebase.database().ref('/')
                            .child("users")
                            .orderByChild("isDonor").equalTo(true);
        donorListRef.on("child_added",function (snapshot){
                        dispatch(DonorActions.addDonorToList(snapshot.val()))
                    })
    }

    //Get Donor Detail
    static getDonorDetial(donorId) {
        console.log("getDonorDetial ",donorId);
        return (dispatch) => {
            dispatch(DonorActions.getDonorDetail())
            DonorMiddleware.getDonorDetailFromFirebase(dispatch,donorId);            
        }
    }

    static getDonorDetailFromFirebase(dispatch,donorId){
        firebase.database().ref('/')
            .child(`users/${donorId}`)
            .on("value",function (snapshot){
                dispatch(DonorActions.getDonorDetailSuccessful(snapshot.val()))
            });
    }


}