import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import "./Signup.css";

const Signup = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const starsContainerRef = useRef(null);
    const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);

    useEffect(() => {
        let unsubscribe;

        const handleAuthChange = async (user) => {
            if (user) {
                navigate("/");
            }
        };

        unsubscribe = onAuthStateChanged(auth, handleAuthChange);

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [navigate]);

    useEffect(() => {
        const shootingStarsContainer = document.querySelector(".comets");
        let cometCount = 0;
        const maxComets = 20 + Math.floor(Math.random() * 5);

        function createComet() {
            if (cometCount >= maxComets) return;
            
            cometCount++;
            const comet = document.createElement("div");
            comet.className = "comet";
            comet.style.top = `${Math.random() * 80}vh`;
            comet.style.left = `${Math.random() * 50}vw`;
            const size = 2 + Math.random() * 10;
            comet.style.width = `${size}px`;
            comet.style.height = `${size}px`;
            const duration = 3 + Math.random() * 4;
            comet.style.animationDuration = `${duration}s`;
            shootingStarsContainer.appendChild(comet);
            
            comet.addEventListener("animationend", () => {
                comet.remove();
                cometCount--;
            });
        }

        for (let i = 0; i < maxComets; i++) {
            createComet();
        }

        const interval = setInterval(() => {
            const currentComets = document.querySelectorAll(".comet").length;
            if (currentComets < maxComets) {
                createComet();
            }
        }, 1000);

        const starsContainer = starsContainerRef.current;
        if (starsContainer) {
            starsContainer.innerHTML = '';
            
            for (let i = 0; i < 200; i++) {
                const star = document.createElement("div");
                const colors = ['white', '#f5f5f5', '#d4e6f7', '#f7e3d4', '#e3d4f7'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                star.style.backgroundColor = randomColor;
                star.className = "star";
                
                star.style.top = `${Math.random() * 100}vh`;
                star.style.left = `${Math.random() * 100}vw`;
                
                const size = Math.random() > 0.9 ? 
                    `${1 + Math.random() * 2}px` :
                    `${0.5 + Math.random() * 0.5}px`;
                
                star.style.width = size;
                star.style.height = size;
                
                star.style.animationDelay = `${Math.random() * 5}s`;
                star.style.animationDuration = `${3 + Math.random() * 7}s`;
                
                star.style.setProperty('--brightness', Math.random() * 0.8 + 0.2);
                
                starsContainer.appendChild(star);
            }
        }
    
        return () => clearInterval(interval);
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const usernameDocRef = doc(db, "usernames", username);
            const usernameDoc = await getDoc(usernameDocRef);
            if (usernameDoc.exists()) {
                setErrorMessage("Username already exists. Please choose a different one.");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "usernames", username), {
                userId: user.uid,
            });

            navigate("/");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setErrorMessage("Email already in use. Please use a different email.");
            } else {
                console.error("Sign-Up Error:", error.message);
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                setErrorMessage("Invalid email or password. Please try again.");
            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            setIsGoogleAuthLoading(true);
            setErrorMessage("");
            
            // Create new provider instance each time
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: 'select_account'
            });
            
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            if (error.code === 'auth/popup-closed-by-user') {
                setErrorMessage("Google sign-in popup was closed. Please try again.");
            } else {
                setErrorMessage("Failed to sign in with Google. Please try again.");
            }
        } finally {
            setIsGoogleAuthLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="stars" ref={starsContainerRef}></div>
            <div className="comets"></div>

            <button className="back-btn" onClick={() => navigate("/")}>←</button>

            <div className="login">
                <form onSubmit={isFlipped ? handleSignIn : handleSignUp}>
                    <div className="inputgroup">
                        <h1>{isFlipped ? "Welcome Back" : "Get Started"}</h1>
                        <h4>
                            {isFlipped ? (
                                <>Don't have an Account? <a onClick={() => setIsFlipped(false)}>Sign Up</a></>
                            ) : (
                                <>Already have an Account? <a onClick={() => setIsFlipped(true)}>Log in</a></>
                            )}
                        </h4>

                        {isFlipped ? (
                            <>
                                <label htmlFor="login-email">Email</label>
                                <input
                                    type="email"
                                    id="login-email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrorMessage("");
                                    }}
                                    required
                                />
                                <label htmlFor="login-password">Password</label>
                                <input
                                    type="password"
                                    id="login-password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrorMessage("");
                                    }}
                                    required
                                />
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <div className="buttons">
                                    <button type="submit">SIGN IN</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <label htmlFor="signup-username">Username</label>
                                <input
                                    type="text"
                                    id="signup-username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <label htmlFor="signup-email">Email</label>
                                <input
                                    type="email"
                                    id="signup-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="signup-password">Password</label>
                                <input
                                    type="password"
                                    id="signup-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <div className="buttons">
                                    <button type="submit">SIGN UP</button>
                                </div>
                                <div className="singleline">
                                    <div className="line"></div>
                                    <span>Or Sign Up With</span>
                                    <div className="line"></div>
                                </div>
                                <div className="faang">
                                    <button
                                        className="image1"
                                        aria-label="Sign up with Google"
                                        type="button"
                                        onClick={handleGoogleSignIn}
                                        disabled={isGoogleAuthLoading}
                                    >
                                        {isGoogleAuthLoading ? "Loading..." : ""}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;