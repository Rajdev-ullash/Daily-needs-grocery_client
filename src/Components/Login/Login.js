import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router';


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    // const { register, errors, getValues, handleSubmit } = useForm();
    const { log } = useContext(UserContext);
    const [loggedIn, setLoggedIn] = log;
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    // const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isLoggedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })


    const handleSignIn = () => {

        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const userInfo = {
                    isLoggedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(userInfo);
                setLoggedIn(userInfo)
                history.replace(from);
            })
            .catch(error => {
                console.log(error);
                console.log(error.message);
            })

    }

    const handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            const signOutUser = {
                isSignIn: false,
                name: '',
                email: '',
                photo: '',
                error: ''
            }
            setUser(signOutUser)
        })
            .catch(error => {
                console.log(error);
            })
    }

    const updateUsername = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log('User name update successfully')
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            <div className="m-5 justify-content-center align-content-center d-flex">
                <div>
                    {
                        user.isLoggedIn ? <button className="btn btn-success" onClick={handleSignOut}>Sign Out</button> : <button className="btn btn-success" onClick={handleSignIn}><i class="fab fa-google"> Continue with Google</i></button>
                    }
                </div>
            </div>

        </div>
    );
};

export default Login;