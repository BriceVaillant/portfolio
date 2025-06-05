// src/pages/Projects.jsx
import './Projects.css';
import { useEffect } from 'react';

export default function Projects() {
    const handleMouseMove = (e) => {
      //select card
      const card = e.currentTarget;

      //getBoundingClientRect get the size and position of the cards
      //ex 100px from the top 50 from the left etc
      const rect = card.getBoundingClientRect();
      
      //e.clientX give the position relative to the viewport
      //-rect.left the substraction give you the position within the rectangle wich make
      //x and y the pointer's position within the card
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      //this find the center of the card
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      //(y - centerY) / centerY) give a value between -1 and 1 depending on pointer position from the center
        //the 10 is how much it will tilt 
      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      //card.style.transform influence the css of the card
        //perspective(1000px) give the 3D effect
        //rotate tilt the card
      card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = (e) => {
      const card = e.currentTarget;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };
  return (
    <div className="cardcontainer">
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <h2>Project Title</h2>
          <p>Description goes here.</p>
        </div>
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <h2>Project Title</h2>
          <p>Description goes here.</p>
        </div>
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <h2>Project Title</h2>
          <p>Description goes here.</p>
        </div>
        <div className="card"onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}> 
          <h2>Project Title</h2>
          <p>Description goes here.</p>
        </div>
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <h2>Project Title</h2>
          <p>Description goes here.</p>
        </div>
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <h2>Project Title</h2>
          <p>Description goes here.</p>
        </div>
    </div>
  );
}