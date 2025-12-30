// src/pages/About.jsx
import './About.css';
import profilpic from '../assets/profilepicture.jpg';

export default function About() {
  return (
    <div className="about">
      <div className="picture">
        <img className="profile" src={profilpic} alt="Profile" />
      </div>
      <div className="description">
      <h1>Développeur Junior</h1>
      <p>Je sui sun pros du  le web design et le développement, c'est un domaine infini et vraiment passionnant.</p>
      <p className="insta"> Et quand je ne suis pas en train de coder, je suis en train de peindre, retrouvez mes creations sur mon instagram </p>
    </div>
    </div>
  );
}