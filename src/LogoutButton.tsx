import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { user, logout } = useAuth0();

    return (
        <button style={{padding: '3px 6px'}}
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            {user ? <img src={user.picture} style={{width: '30px', borderRadius: '50px'}} /* alt={user.name} */ /> : undefined}
            <p style={{fontSize: '16px'}}>Log Out</p>
        </button>
    );
};

export default LogoutButton;