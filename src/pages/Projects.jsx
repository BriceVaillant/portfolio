// src/pages/Projects.jsx
import './Projects.css';
import calculator from '/src/assets/calculator.PNG';
import drummachine from '/src/assets/DrumMachine.PNG';
import clock from '/src/assets/PomodoroClock.PNG';

export default function Projects() {
    const handleMouseMove = (e) => {
      //select card
      const card = e.currentTarget;
      const content = card.querySelector('.cardcontent');
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

      //this is the calcul for the inner content
      const moveX = ((x - centerX) / centerX) * -10;
      const moveY = ((y - centerY) / centerY) * -10;

      //card.style.transform influence the css of the card
        //perspective(1000px) give the 3D effect
        //rotate tilt the card
      card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      content.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    };

    const handleMouseLeave = (e) => {
      const card = e.currentTarget;
      const content = card.querySelector('.card-content');

      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      content.style.transform = 'translateX(0) translateY(0)';
    };
  return (
    <div className="cardcontainer">
      <a className="cardlink" href="https://codepen.io/nawers/pen/PwwWXJK" target="_blank" rel="noopener noreferrer">
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="cardcontent">
            <h2>Calculator Project</h2>
            <p>Description goes here.</p>
          </div>
          <img className="cardbg" src={calculator} alt="calculatorProject"></img>
        </div>
      </a>
      <a className="cardlink" href="https://codepen.io/nawers/pen/KwwNYBE" target="_blank" rel="noopener noreferrer">
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="cardcontent">
            <h2>Drum Machine</h2>
            <p>Description goes here.</p>
          </div>
          <img className="cardbg" src={drummachine} alt="DrumMachineProject"></img>
        </div>
      </a>
      <a className="cardlink" href="https://codepen.io/nawers/pen/zxxEqeQ" target="_blank" rel="noopener noreferrer">
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="cardcontent">
            <h2>Pomodoro Clock</h2>
            <p>Description goes here.</p>
          </div>
          <img className="cardbg" src={clock} alt="PomodoroClockProject"></img>
        </div>
      </a>
        <div className="card"onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}> 
          <div className="cardcontent">
            <h2>Project Title</h2>
            <p>Description goes here.</p>
          </div>
        </div>
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="cardcontent">
            <h2>Project Title</h2>
            <p>Description goes here.</p>
          </div>
        </div>
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="cardcontent">
            <h2>Project Title</h2>
            <p>Description goes here.</p>
          </div>
        </div>
    </div>
  );
}