// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav>
      <div className="name">BV.</div>
      <ul>
        <li><Link to="/" className="navbarlink">Home</Link></li>
        <li><Link to="/about" className="navbarlink">About</Link></li>
        <li><Link to="/projects" className="navbarlink">Projects</Link></li>
        <li><Link to="/contact" className="navbarlink">Contact</Link></li>
      </ul>
    </nav>
  );
}
