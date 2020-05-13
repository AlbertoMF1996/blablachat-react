import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAMQt09wsYK0OOlMHDhoQLQa9mLSnIXxEQ",
    authDomain: "dawfinal.firebaseapp.com",
    databaseURL: "https://dawfinal.firebaseio.com",
    projectId: "dawfinal",
    storageBucket: "dawfinal.appspot.com",
    messagingSenderId: "659364103699",
    appId: "1:659364103699:web:bbd7b9c69406602715a1e6",
    measurementId: "G-EDF8M7N21Q"
};

const fire = firebase.initializeApp(config);
export default fire;