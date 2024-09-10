import { signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { useEffect, useState } from "react";
import useStore from './store';
import auth from './Firebase';


const LoginButtonGoogle = () => {
    const user = useStore((state) => state.user);
    const updateUser = useStore((state) => state.updateUser);

    const [error, setError] = useState(null);

    const handleGoogleSignIn = async () => {
        try {

            const provider = new GoogleAuthProvider();
            // @ts-ignore
            await signInWithRedirect(auth, provider);
            // Handle successful login (e.g., redirect to a protected route)
        } catch (error: any) {
            setError(error.message);
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
