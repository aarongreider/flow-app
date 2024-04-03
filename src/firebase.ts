import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { Edge, Node, } from 'reactflow';
import useStore from './store';

import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore"; queueMicrotask
import { initialNodes, initialEdges } from './InitialNodes';

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
//const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export function applyUserNodes(userID: string) {
    // init zustand setNodes
    console.log("applying user nodes...")
    const setNodes = useStore((state) => state.setNodes);

    const docRef = (doc(db, `flow-users/${userID}`))
    getDoc(docRef).then((data) => {
        if (data.exists()) {
            console.log('Document data:', data.data());
            // set nodes with document data
            //setNodes([...data.data().nodes])
        } else {
            console.log('No such document!');
            return false;
        }
    }).catch((error) => {
        console.error('Error getting document:', error);
    });
}

export function setUserData(userID: string, nodes: Node[], edges: Edge[]) {
    const docRef = (doc(db, `flow-users/${userID}`))

    setDoc(docRef, { nodes: [...nodes], edges: [...edges] }, { merge: true })
        .then(() => {
            console.log("data written to database", { nodes: [...nodes], edges: [...edges] })
        }).catch((error) => {
            console.error('Error setting document:', error);
        });
}




// set the user's data