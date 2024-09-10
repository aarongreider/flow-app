/* import { useAuth0 } from "@auth0/auth0-react"; */
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

interface props {
    photoURL: string,
}
const LogoutButton = ({photoURL} : props) => {

    const handleLogout = async () => {
        try {
            await signOut(auth)
        }
    }

    return (
        <button style={{padding: '3px 6px'}}
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            {photoURL ? <img src={photoURL} style={{width: '30px', borderRadius: '50px'}} /* alt={user.name} */ /> : undefined}
            <p style={{fontSize: '16px'}}>Log Out</p>
        </button>
    );
};

export default LogoutButton;