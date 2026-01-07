// src/pages/About.jsx
import './About.css';
import profilpic from '../assets/profilepicture.jpg';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about">
      <div className="picture">
        <img className="profile" src={profilpic} alt="Profile" />
      </div>
      <div className="description">
        <h1>Développeur Junior</h1>
        <p>Pour une personne en constante quête de connaissances, le développement constitue un domaine infini et véritablement passionnant.</p>
        <p className="insta"> En dehors du code, je me consacre à la peinture. Retrouvez mes plus belles miniatures sur mon <a href="https://www.instagram.com/briceminis/" className="social-link" target="_blank" rel="noopener noreferrer">Instagram</a> où sur ce <Link className="social-link" to="/briceminis">site.</Link></p>
      </div>
    </div>
  );
}


