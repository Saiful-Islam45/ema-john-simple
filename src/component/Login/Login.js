import React from 'react';
import Auth from '../User-auth';

const Login = () => {
    const auth = Auth();
    const handleSignIn = () => {
        auth.signInWithGoogle()
            .then(res => {
                window.location.pathname = '/review';

            })
    }
    const handleSignOut = () => {
        auth.signOut()
            .then(res => {
                window.location.pathname = '/';
            })
    }
    return (
        <div>
            <h1>Login page</h1>
            {
                auth.user ? <button onClick={handleSignOut} className="btn btn-primary">Sign out</button> : <button onClick={handleSignIn} className="btn btn-primary">Sign in with Google</button>
            }
        </div>
    );
};

export default Login;