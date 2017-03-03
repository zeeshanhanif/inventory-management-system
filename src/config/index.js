// This separate configuration file
import * as firebase from 'firebase'

// adding firebase configuration
var config = {
    apiKey: "AIzaSyAWmkL-pG4fUXcRSjQ5xh5QusnyKFqnIIw",
    authDomain: "inventory-management-sys-9b77e.firebaseapp.com",
    databaseURL: "https://inventory-management-sys-9b77e.firebaseio.com",
    storageBucket: "inventory-management-sys-9b77e.appspot.com",
    messagingSenderId: "451701337957"
  };
firebase.initializeApp(config);
