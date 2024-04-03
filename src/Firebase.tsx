import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { Edge, Node, } from 'reactflow';
import useStore from './store';

import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore"; queueMicrotask
import { initialNodes, initialEdges } from './InitialNodes';
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { setUserId } from "firebase/analytics";

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

function applyUserNodes(userID: string) {
    // init zustand setNodes
    console.log("applying user nodes...")
    

    
}

function setUserData(userID: string, nodes: Node[], edges: Edge[]) {
    const docRef = (doc(db, `flow-users/${userID}`))

    setDoc(docRef, { nodes: [...nodes], edges: [...edges] }, { merge: true })
        .then(() => {
            console.log("data written to database", { nodes: [...nodes], edges: [...edges] })
        }).catch((error) => {
            console.error('Error setting document:', error);
        });
}

interface FirebaseProps {

}

function Firebase(props: FirebaseProps) {
    const setNodes = useStore((state) => state.setNodes);
    const setEdges = useStore((state) => state.setEdges);
    const auth0 = useAuth0();
    


    useEffect(() => {
        if (auth0.user && auth0.isAuthenticated) {
            console.log('user', auth0.user)
            const id = auth0.user.sub?.split("|")[1]

            // set nodes based on result of firestore request
            const docRef = (doc(db, `flow-users/${id}`))
            getDoc(docRef).then((data) => {
                if (data.exists()) {
                    console.log('Document data:', data.data());
                    // set nodes with document data
                    setNodes([...data.data().nodes])
                    setEdges([...data.data().edges])
                } else {
                    console.log('No such document!');
                }
            }).catch((error) => {
                console.error('Error getting document:', error);
            });
        }

        
    }, [auth0])

    return (
        <>
            {auth0.isAuthenticated ? undefined :
                <img style={{pointerEvents: 'none', position: 'absolute', right: 0,  width: '150px'}} 
                    src="https://gifdb.com/images/high/animated-stars-loading-icon-38ccjfav8iijnqrb.gif" />}
        </>
    )
}

export default Firebase;