import React from 'react';
import StarBackground from './Star'; // Ensure this matches the file name
import Comets from './Comets';
import Asteroids from './Asteroids';

export default function Background() {
  return (
    <>
      <StarBackground />
      <Comets />
      <Asteroids />
    </>
  );
}