import { signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import auth from '../Firebase';


const LoginButtonGoogle = () => {

    const handleGoogleSignIn = async () => {
        try {

            const provider = new GoogleAuthProvider();
            // @ts-ignore
            await signInWithRedirect(auth, provider);
            // Handle successful login (e.g., redirect to a protected route)
        } catch (error: any) {
            console.log("error with google sign in button", error);
            
        }
    };


    useEffect(() => {
        async function handleRedirect() {
            // @ts-ignore
            const response = await getRedirectResult(auth)
            console.log(response);
        }

        handleRedirect();
    }, [])




    return (
        <button onClick={handleGoogleSignIn}>Log In with Google</button>
    );
};

export default LoginButtonGoogle;
