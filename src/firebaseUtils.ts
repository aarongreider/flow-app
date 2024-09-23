import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { Edge, Node, } from 'reactflow';
import { MetadataFetch, PageFetch } from "./types";

import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore"; queueMicrotask
import { getAuth, Auth, GoogleAuthProvider,browserLocalPersistence, User } from "firebase/auth";

//#region Fire Init
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

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth: Auth = getAuth();
export const provider = new GoogleAuthProvider();
auth.setPersistence(browserLocalPersistence)
//#endregion

console.log(auth.currentUser);


//#region Fire Utils
export const fetchPage = async (user: User | null, projectID: string, pageID: string): Promise<PageFetch> => {

    if (user) {
        try {
            const docRef = (doc(db, `flow-users/${user.uid}/projects/${projectID}/pages/${pageID}`))
            const response = await getDoc(docRef);
            if (response.exists()) {
                console.log('Document data:', response.data());
                return response.data() as PageFetch;
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error getting document:', error);
            // set path to be a new page
        };
    } else {
        console.log(`no user!`);
        
    }

    return { nodes: [], edges: [] }
}
export const fetchMetadata = async (user: User | null): Promise<MetadataFetch> => {
    // fetch all metadata, including the register and all tokens

    if (user) {
        const docRef = (doc(db, `flow-users/${user.uid}`))

        try {
            const response = await getDoc(docRef);
            if (response.exists()) {
                console.log('Document data:', response.data());
                return response.data() as MetadataFetch;
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error getting document:', error);
        };
    }

    return { register: [], tokens:"dummy token" }
}

export const setPage = async (user: User | null, projectName: string, pageKey: string, nodes: Node[], edges: Edge[]) => {
    // if the user is logged in, attempt to update the nodes and edges of the specified page within the project 
    // if updateDoc runs an error, then use setDoc. this is for efficiency and data saving
    if (user) {
        const docRef = (doc(db, `flow-users/${user.uid}/projects/${projectName}/pages/${pageKey}`))

        try {
            await updateDoc(docRef, { nodes: [...nodes], edges: [...edges] })
            console.log(`${projectName} ${pageKey} updated successfully`);
        } catch (error) {
            console.log(error);
            try {
                setDoc(docRef, { nodes: [...nodes], edges: [...edges] }, { merge: true })
                    .then(() => {
                        console.log(`${projectName} ${pageKey} set successfully`, { nodes: [...nodes], edges: [...edges] })
                    }).catch((error) => {
                        console.error('Error setting document:', error);
                    });
            } catch (error) {
                console.log(error);
                
            }
        }
    } else {
        alert("You must be logged in to use the Cloud Save feature.")
        return;
    }
}
//#endregion
