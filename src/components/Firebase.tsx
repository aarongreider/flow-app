import { doc, setDoc, updateDoc } from "firebase/firestore"; queueMicrotask
import { useEffect, useRef } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

import useStore from '../store/store';
import { db, auth, provider, fetchPage, fetchMetadata, setPage } from '../firebaseUtils';

//#region Component
function Firebase() {
    const hasFetchedData = useRef(false); // persistent boolean value

    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const user = useStore((state) => state.user);
    const activePath = useStore((state) => state.activePath);
    const register = useStore((state) => state.register);

    const setNodes = useStore((state) => state.setNodes);
    const setEdges = useStore((state) => state.setEdges);
    const updateUser = useStore((state) => state.updateUser);
    const setRegister = useStore((state) => state.setRegister);
    const setActivePath = useStore((state) => state.setActivePath);
    const setLastChange = useStore((state) => state.setLastChange);
    const setLastSave = useStore((state) => state.setLastSave);


    useEffect(() => { // if the user is logged in, set the nodes to match what is stored in their user database

        // manually getting user's data with users uid matched with firebase's dictionary
        const get = async () => {
            //get metadata
            const metadata = await fetchMetadata(user);
            if (metadata?.register) {
                // merge the active register and the register from the server
                // TODO: resolve duplicates?
                const newRegister = [...register, ...metadata.register]

                console.log("REGISTER SETTING on USER UPDATE");
                console.log(register);
                console.log(metadata.register);
                console.log(newRegister);

                setRegister(newRegister)
            }
        }
        if (user && !hasFetchedData.current) {
            get();
            hasFetchedData.current = true; // Mark as fetched
            if (activePath) {
                setActivePath({ projectKey: activePath?.projectKey, pageKey: activePath?.pageKey })
            }
        }
    }, [user])

    useEffect(() => { // if the user is logged in, set the nodes to match what is stored in their user database

        // when activePath is set, set the nodes, otherwise, init a new page

        const get = async () => {
            // when activePath changes, load the new content. If no path is found (first render), then init a new page under an umbrella project
            let response;
            if (activePath && user) {
                console.log("fetching page...", activePath.projectKey, activePath.pageKey);

                response = await fetchPage(user, activePath.projectKey, activePath.pageKey)
            } else {
                // add a page in the register
                console.log("no page found, ");

                /* const projectKey = "Uncategorized Pages"
                const pageKey = nanoid()
                addPage(projectKey, pageKey, pageKey)
                setActivePath({ projectKey, pageKey }) */
            }

            if (response) {
                const { edges, nodes } = response;
                setEdges(edges);
                setNodes(nodes);
            }
        }
        get();
    }, [activePath])

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

    useEffect(() => {
        localStorage.setItem("register", JSON.stringify(register))
        localStorage.setItem("active path", JSON.stringify(activePath))
        setLastChange(new Date);

    }, [register, activePath])


    const syncRegister = async () => {
        if (user) {
            const docRef = (doc(db, `flow-users/${user.uid}`))

            try {
                await updateDoc(docRef, { register });
                console.log(`register updated successfully`);
            } catch (error) {
                console.log(error);

                try {
                    await setDoc(docRef, { register })
                    console.log(`register set successfully`);
                } catch (error) {
                    console.log(error);
                }

            }
        }
    }

    const handleSave = async () => { // when the user hits the save button
        try {
            await syncRegister();
            activePath ? await setPage(user, activePath.projectKey, activePath.pageKey, nodes, edges) : undefined;
            setLastSave(new Date);
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
            console.log("error signing in", error);
            
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
//#endregion