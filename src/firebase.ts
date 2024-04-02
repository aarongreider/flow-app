import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore, collection, doc, getDoc } from "firebase/firestore"; queueMicrotask

const firebaseConfig = {
    apiKey: "AIzaSyAQOWLW33YmcldSc_tpJgpcH9Nl-jXF5Ec",
    authDomain: "winged-precinct-418901.firebaseapp.com",
    projectId: "winged-precinct-418901",
    storageBucket: "winged-precinct-418901.appspot.com",
    messagingSenderId: "908912265044",
    appId: "1:908912265044:web:350310428d15ffc2b56ac1",
    measurementId: "G-3NF1PZKCYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const docRef = (doc(db, 'flow-users/test-document'))
getDoc(docRef).then((data) => {
    if (data.exists()) {
        console.log('Document data:', data.data());
    } else {
        console.log('No such document!');
    }
})
    .catch((error) => {
        console.error('Error getting document:', error);
    });


// set the user's data