import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
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
        let timeoutId;

        const handleAuthChange = async (user) => {
            if (user) {
                // Add slight delay to allow Google popup to complete
                timeoutId = setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        };

        unsubscribe = onAuthStateChanged(auth, handleAuthChange);

        return () => {
            clearTimeout(timeoutId);
            if (unsubscribe) unsubscribe();
        };
    }, [navigate]);


    useEffect(() => {
        // Comet animation logic - fixed to properly limit count
        const shootingStarsContainer = document.querySelector(".comets");
        let cometCount = 0;
        const maxComets = 20 + Math.floor(Math.random() * 5); // Random between 10-15
    
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
    
        // Create initial comets (limited to maxComets)
        for (let i = 0; i < maxComets; i++) {
            createComet();
        }
    
        // Fixed interval logic - only create new comets if under limit
        const interval = setInterval(() => {
            const currentComets = document.querySelectorAll(".comet").length;
            if (currentComets < maxComets) {
                createComet();
            }
        }, 1000); // Check every second
    
        // Twinkling stars logic remains unchanged
        const starsContainer = starsContainerRef.current;
        if (starsContainer) {
            starsContainer.innerHTML = '';
            
            // Generate twinkling stars with more realistic properties
            for (let i = 0; i < 200; i++) {
                const star = document.createElement("div"); // Fixed typo: was "stars"
                const colors = ['white', '#f5f5f5', '#d4e6f7', '#f7e3d4', '#e3d4f7'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                star.style.backgroundColor = randomColor;
                star.className = "star";
                
                // Random positioning
                star.style.top = `${Math.random() * 100}vh`;
                star.style.left = `${Math.random() * 100}vw`;
                
                // Random sizes (some bigger, some smaller)
                const size = Math.random() > 0.9 ? 
                    `${1 + Math.random() * 2}px` :  // 10% chance of being bigger
                    `${0.5 + Math.random() * 0.5}px`; // 90% smaller stars
                
                star.style.width = size;
                star.style.height = size;
                
                // Random twinkle properties
                star.style.animationDelay = `${Math.random() * 5}s`;
                star.style.animationDuration = `${3 + Math.random() * 7}s`;
                
                // Random brightness (some stars brighter than others)
                star.style.setProperty('--brightness', Math.random() * 0.8 + 0.2);
                
                starsContainer.appendChild(star);
            }
        }
    
        return () => clearInterval(interval);
    }, []);
    // Rest of your existing code remains exactly the same...
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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Logged in user:", user);
            navigate("/");
        } catch (error) {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                setErrorMessage("Invalid email or password. Please try again.");
            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
    };
    const handleGoogleSignIn = async () => {
        try {
            // Clear any existing error messages
            setErrorMessage("");
            
            // Explicitly wait for the sign-in to complete
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            // Optional: You can add a small delay here if needed
            await new Promise(resolve => setTimeout(resolve, 500));
            
            console.log("Google Sign-In Success:", user);
        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
            setErrorMessage("Failed to sign in with Google. Please try again.");
        }
    };


    return (
        <div className="container">
            {/* Changed to use ref for stars container */}
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
                                    ></button>
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