import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase.config";
import { useState, createContext } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();
export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

const getUser = user => {
    const { displayName, email, photoURL } = user;
    return { name: displayName, email, photo: photoURL };
}
const Auth = () => {
    const [user, setUser] = useState(null);
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(res => {
                const signedUser = getUser(res.user);
                setUser(signedUser);
                return res.user;
            })
            .catch(err => {
                setUser(null);
                return err.message;
            })
    }
    const signOut = () => {
        return firebase.auth().signOut().then(() => {
            setUser(null);
            return true;
        }).catch(err => {
            console.log(err.message);
            return false;
        })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const currUser = getUser(user);
                setUser(currUser);
            }
        });
    }, [])
    return {
        user,
        signInWithGoogle,
        signOut
    }
}
export default Auth;