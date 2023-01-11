import React, { useState, useEffect } from 'react';
import background from "../../img/background.jpg";
import './index.css';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebase/firebase' 
import {GoogleButton}  from 'react-google-button'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRegistering, setIsRegistering] = useState(false)
    const [registrationInfo, setRegistrationInfo] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
    })        

    const navigate = useNavigate()

    const handleLoginWithGoogle = () => signInWithPopup(auth, provider)


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user){
                navigate('/homepage')
            }
        })
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate('/homepage')
        })
        .catch((error) => {
            alert(error);
        })
    }

    const handleRegister = () => {
        if(registrationInfo.email !== registrationInfo.confirmEmail){
            alert('Please confirm that email are the same')
            return
        } else if(registrationInfo.password !== registrationInfo.confirmPassword){
            alert('Please confirm that password are the same')
            return
        }

        createUserWithEmailAndPassword(auth, registrationInfo.email, registrationInfo.password)
        .then(() => {
            navigate('/homepage')
        })
        .catch((error) => {
            alert(error);
        })
    }


    return (
        <div className='container'>
            <img className='background' src={background} alt="" />
                <div autoComplete="off" className="box">
                {isRegistering ? (
                    <>
                <p className="txt">Registration</p>
                <input
                className="box_item"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="off"
                required
                value={registrationInfo.email}
                onChange={(e) => {
                    setRegistrationInfo({
                        ...registrationInfo,
                        email: e.target.value
                    })
                }}
                />

                <input
                className="box_item"
                name="email"
                type="email"
                placeholder="Confirm email"
                autoComplete="off"
                required
                value={registrationInfo.confirmEmail}
                onChange={(e) => {
                    setRegistrationInfo({
                        ...registrationInfo,
                        confirmEmail: e.target.value
                    })
                }}
                />

                <input
                className="box_item"
                name="password"
                type="password"
                placeholder="Password"
                required
                value={registrationInfo.password}
                onChange={(e) => {
                    setRegistrationInfo({
                        ...registrationInfo,
                        password: e.target.value
                    })
                }}
                />

                <input
                className="box_item"
                name="password"
                type="password"
                placeholder="Confirm Password"
                required
                value={registrationInfo.confirmPassword}
                onChange={(e) => {
                    setRegistrationInfo({
                        ...registrationInfo,
                        confirmPassword: e.target.value
                    })
                }}
                />

                <div className="box_cont">
                <button onClick={handleRegister} className="box_item__btn">
                    Sign Up
                </button>
                <button onClick={() => setIsRegistering(false)} className='link_register'>Go back</button>
                </div>
                </> 
                ):(
                <>
                <p className="txt">Log In to your Account</p>
                <input
                className="box_item"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="off"
                value={email}
                onChange={handleEmailChange}
                required
                />

                <input
                className="box_item"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
                />

                <div className="box_cont">
                <button onClick={handleSignIn} className="box_item__btn">
                    Sign In
                </button>
                <div className="box_item__google-btn">
                    <GoogleButton onClick={handleLoginWithGoogle} />
                </div>
                <button onClick={() => setIsRegistering(true)} className='link_register'>Need an Account?</button>
                </div>
                </>
                )
                }
            </div> 
        </div>
    );
}

export default Auth;
