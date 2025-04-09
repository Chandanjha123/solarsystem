import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <>
      {/* Back button fixed to the viewport */}
      <button className="back-button" onClick={handleBackClick}>
        <FaArrowLeft /> 
      </button>

      {/* About content */}
      <div className="about-container">
        <h1>About Our 3D Solar System</h1>
        
        <div className="about-content scrollable">
          <h2>Creators</h2>
          <p>
            This 3D Solar System was created by <strong>Chandan Jha</strong> and <strong>Akash Das</strong>.
          </p>
          
          <h2>About Us</h2>
          <p>
            We are students at <strong>BP Poddar Institute of Management and Technology</strong>, 
            pursuing B.Tech in Information Technology.
          </p>
          
          <h2>Project Purpose</h2>
          <p>
            This 3D Solar System was developed for educational purposes to help visualize 
            and understand our solar system better. It demonstrates the relative positions, 
            movements, and characteristics of planets in our cosmic neighborhood.
          </p>
          
          <h2>Solar System Facts</h2>
          <ul>
            <li>The solar system formed 4.6 billion years ago from a giant interstellar molecular cloud.</li>
            <li>There are 8 planets in our solar system (since Pluto was reclassified as a dwarf planet).</li>
            <li>The Sun contains 99.8% of the solar system's mass.</li>
            <li>Jupiter is the largest planet - it could contain all other planets combined.</li>
            <li>Venus is the hottest planet despite not being closest to the Sun.</li>
          </ul>
          
          <h2>Contact Us</h2>
          <p>
            For any inquiries or feedback, please reach out to us at: 
            <a href="mailto:kd.jha000@gmail.com">kd.jha000@gmail.com</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;