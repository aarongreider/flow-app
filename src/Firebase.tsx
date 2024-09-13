import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import useStore from './store';
import { Edge, Node, } from 'reactflow';
import { PageFetch } from "./types";

import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; queueMicrotask
import { useState, useEffect } from "react";
import { getAuth, Auth, GoogleAuthProvider, signInWithPopup, signOut, browserLocalPersistence, onAuthStateChanged, User } from "firebase/auth";

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
const db = getFirestore(app);
const auth: Auth = getAuth();
console.log(auth.currentUser);

const provider = new GoogleAuthProvider();
auth.setPersistence(browserLocalPersistence)

function Firebase() {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const user = useStore((state) => state.user);
    const projectID = useStore((state) => state.projectID);
    const pageID = useStore((state) => state.pageID);
    const setNodes = useStore((state) => state.setNodes);
    const setEdges = useStore((state) => state.setEdges);
    const updateUser = useStore((state) => state.updateUser);

    const [error, setError] = useState(null);


    useEffect(() => { // if the user is logged in, set the nodes to match what is stored in their user database

        //TODO: support pages and handle setting the nodes more gracefully
        // set nodes based on result of firestore request

        // manually getting user's data with users uid matched with firebase's dictionary
        // need to find a firebase native way to get a user's data.

        const get = async () => {
            console.log("fetching page...");
            
            const response = await fetchPage(user, projectID, pageID)
            console.log("recieved response", response);
            
            if (response) {
                const { edges, nodes } = response;
                setEdges(edges);
                setNodes(nodes);
            }
        }
        get();
    }, [user])

    useEffect(() => { // properly handle login persistence and changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is logged in:", user);
                updateUser(user); // Set user in Zustand store
            } else {
                console.log("No user logged in.");
                //@ts-ignore
                updateUser(null);
            }
        });

        return () => unsubscribe(); // Clean up the listener
    }, [updateUser])

    const handleSave = async () => { // when the user hits the save button
        try {
            await setPage(user, projectID, pageID, nodes, edges)
        } catch (error) {
            console.log("set page error", error);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // Handle successful login (e.g., redirect to a protected route)
            console.log(result);
            updateUser(result.user)

        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            const result = await signOut(auth);
            console.log('result of Logout', result);
            // @ts-ignore
            updateUser(null);
        } catch (error) {
            console.log("logout error", error);

        }
    }


    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', position: 'absolute', right: '10px', top: '10px', zIndex: 1 }}>
                {user ? <>
                    <button style={{ padding: '3px 6px' }}
                        onClick={handleLogout}>
                        {user ? <img src={user.photoURL ?? ''} style={{ width: '30px', borderRadius: '50px' }} /> : undefined}
                        <p style={{ fontSize: '16px' }}>Log Out</p>
                    </button>
                </> : <button onClick={handleGoogleSignIn}>Log In with Google</button>}

                {user ? undefined :
                    <img style={{ pointerEvents: 'none', width: '50px' }}
                        src="https://gifdb.com/images/high/animated-stars-loading-icon-38ccjfav8iijnqrb.gif" />}
                <button onClick={handleSave}>
                    <span className="material-symbols-outlined">save</span>
                </button>
            </div>
        </>
    )
}

export default Firebase;




export const fetchPage = async (user: User | null, projectID: string, pageID: string): Promise<PageFetch> => {

    if (user) {
        const docRef = (doc(db, `flow-users/${user.uid}/projects/${projectID}/pages/${pageID}`))

        try {
            const response = await getDoc(docRef);
            if (response.exists()) {
                console.log('Document data:', response.data());
                return response.data() as PageFetch;
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error getting document:', error);
        };
    }

    return { nodes: [], edges: [] }
}

export const setPage = async (user: User | null, projectID: string, pageID: string, nodes: Node[], edges: Edge[]) => {
    if (user) {
        const docRef = (doc(db, `flow-users/${user.uid}/projects/${projectID}/pages/${pageID}`))

        try {
            await updateDoc(docRef, { nodes: [...nodes], edges: [...edges] })
            console.log(`${projectID} ${pageID} updated successfully`);
        } catch (error) {
            console.log(error);
            /* try {
                setDoc(docRef, { nodes: [...nodes], edges: [...edges] }, { merge: true })
                    .then(() => {
                        console.log("data written to database", { nodes: [...nodes], edges: [...edges] })
                    }).catch((error) => {
                        console.error('Error setting document:', error);
                    });
            } catch (error) {
                console.log(error);
                
            } */
        }
    } else {
        alert("You must be logged in to use the Cloud Save feature.")
        return;
    }
}

export const getProjectList = async (user: User): Promise<string[]> => {
    /* if (user) {
        const docRef = (doc(db, `flow-users/${user.uid}/projects`))

        try {
            const response = await listCollections(docRef);
            if (response.exists()) {
                console.log('Document data:', response.data());
                //return response.data() as PageFetch;
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error getting document:', error);
        };
    } */
    return []
}
export const getPageList = async (): Promise<string[]> => {
    return []
}