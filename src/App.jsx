import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Background from './components/Background';
import Sun from './components/planets/Sun';
import Orbit from './components/Orbit';
import './App.css';
import About from './components/About';

// Lazy load planet components
const Mercury = lazy(() => import('./components/planets/Mercury'));
const Venus = lazy(() => import('./components/planets/Venus'));
const Earth = lazy(() => import('./components/planets/Earth'));
const Mars = lazy(() => import('./components/planets/Mars'));
const Jupiter = lazy(() => import('./components/planets/Jupiter'));
const Saturn = lazy(() => import('./components/planets/Saturn'));
const Uranus = lazy(() => import('./components/planets/Uranus'));
const Neptune = lazy(() => import('./components/planets/Neptune'));
const Signup = lazy(() => import('./components/Signup'));
const Asteroids = lazy(() => import("./components/planets/AsteroidModel"));

// Lazy load planet info components
const MercuryInfo = lazy(() => import("./components/PlanetInfo/MercuryInfo"));
const VenusInfo = lazy(() => import("./components/PlanetInfo/VenusInfo"));
const EarthInfo = lazy(() => import("./components/PlanetInfo/EarthInfo"));
const MarsInfo = lazy(() => import("./components/PlanetInfo/MarsInfo"));
const JupiterInfo = lazy(() => import("./components/PlanetInfo/JupiterInfo"));
const SaturnInfo = lazy(() => import("./components/PlanetInfo/SaturnInfo"));
const UranusInfo = lazy(() => import("./components/PlanetInfo/UranusInfo"));
const NeptuneInfo = lazy(() => import("./components/PlanetInfo/NeptuneInfo"));
const SunInfo = lazy(() => import("./components/PlanetInfo/SunInfo"));
const AsteroidsInfo = lazy(() => import("./components/PlanetInfo/AsteroidsInfo"));

const Planet = ({ PlanetComponent, radius, angle, rotationSpeed, revolutionSpeed, onClick }) => {
  const planetRef = useRef();
  const orbitRef = useRef();

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y += revolutionSpeed;
    }
  });

  return (
    <mesh ref={orbitRef} rotation={[0, angle * (Math.PI / 180), 0]}>
      <Suspense fallback={null}>
        <PlanetComponent
          ref={planetRef}
          position={[radius, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onClick(e); // Pass the event to the handler
          }}
        />
      </Suspense>
    </mesh>
  );
};

const Home = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const timer1 = setTimeout(() => {
      setShowWelcome(false);
    }, 2500);

    const timer2 = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handlePlanetClick = (planet, e) => {
    if (e) e.stopPropagation();
    
    if (!user) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }
    setSelectedPlanet(planet);
  };

  const handleAboutClick = () => {
    navigate('/about');
    setDropdownOpen(false);
  };

  const handleSignupClick = () => {
    navigate('/signup');
    setDropdownOpen(false);
  };

  return (
    <div 
      style={{ width: '100vw', height: '100vh' }} 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSelectedPlanet(null);
        }
      }}
    >
      <Canvas 
        camera={{ position: [0, 0, 800], fov: 45, far: 3000 }} 
        onPointerMissed={() => setSelectedPlanet(null)}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={1} />
        <Background />
        <Sun onClick={(e) => {
          e.stopPropagation();
          handlePlanetClick("Sun", e);
        }} />

        {[80, 120, 160, 220, 300, 400, 500, 600].map((r, index) => (
          <Orbit key={index} radius={r} />
        ))}

        <Suspense fallback={null}>
          <Planet 
            PlanetComponent={Mercury} 
            radius={80} 
            angle={0} 
            rotationSpeed={0.008} 
            revolutionSpeed={0.004} 
            onClick={(e) => handlePlanetClick("Mercury", e)} 
          />
          <Planet 
            PlanetComponent={Venus} 
            radius={120} 
            angle={45} 
            rotationSpeed={0.008} 
            revolutionSpeed={0.005} 
            onClick={(e) => handlePlanetClick("Venus", e)} 
          />
          <Planet 
            PlanetComponent={Earth} 
            radius={160} 
            angle={90} 
            rotationSpeed={0.007} 
            revolutionSpeed={0.003} 
            onClick={(e) => handlePlanetClick("Earth", e)} 
          />
          <Planet 
            PlanetComponent={Mars} 
            radius={220} 
            angle={135} 
            rotationSpeed={0.006} 
            revolutionSpeed={0.005} 
            onClick={(e) => handlePlanetClick("Mars", e)} 
          />
          <Planet 
            PlanetComponent={Jupiter} 
            radius={300} 
            angle={180} 
            rotationSpeed={0.005} 
            revolutionSpeed={0.005} 
            onClick={(e) => handlePlanetClick("Jupiter", e)} 
          />
          <Planet 
            PlanetComponent={Saturn} 
            radius={400} 
            angle={225} 
            rotationSpeed={0.004} 
            revolutionSpeed={0.004} 
            onClick={(e) => handlePlanetClick("Saturn", e)} 
          />
          <Planet 
            PlanetComponent={Uranus} 
            radius={500} 
            angle={270} 
            rotationSpeed={0.003} 
            revolutionSpeed={0.003} 
            onClick={(e) => handlePlanetClick("Uranus", e)} 
          />
          <Planet 
            PlanetComponent={Neptune} 
            radius={600} 
            angle={315} 
            rotationSpeed={0.002} 
            revolutionSpeed={0.002} 
            onClick={(e) => handlePlanetClick("Neptune", e)} 
          />
        </Suspense>

        <OrbitControls enableZoom enablePan enableRotate minDistance={10} maxDistance={1000} />

        <EffectComposer>
          <Bloom intensity={1.5} luminanceThreshold={0.1} luminanceSmoothing={0.5} kernelSize={3} />
        </EffectComposer>
      </Canvas>

      {showLoginPrompt && (
        <div className="login-prompt">
          Please login first. Click on the user icon to sign up.
        </div>
      )}

      <div className="user-icon-container">
        <FaUserCircle
          className="user-icon"
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
          }}
        />
        {dropdownOpen && (
          <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
            {user ? (
              <>
                <button onClick={handleAboutClick}>About</button>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={handleSignupClick}>Sign Up</button>
                <button onClick={handleAboutClick}>About</button>
              </>
            )}
          </div>
        )}
      </div>

      {selectedPlanet && user && (
        <div className="popup-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setSelectedPlanet(null);
          }
        }}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedPlanet(null)}>✖</button>
            <Suspense fallback={<div>Loading planet info...</div>}>
              {{
                Mercury: <MercuryInfo />,
                Venus: <VenusInfo />,
                Earth: <EarthInfo />,
                Mars: <MarsInfo />,
                Jupiter: <JupiterInfo />,
                Saturn: <SaturnInfo />,
                Uranus: <UranusInfo />,
                Neptune: <NeptuneInfo />,
                Sun: <SunInfo />,
                Asteroids: <AsteroidsInfo />
              }[selectedPlanet]}
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}