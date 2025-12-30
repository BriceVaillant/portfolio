// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-name">BV.</Link>
      <ul className="navbar-lead">
        <li><Link to="/projects" className="navbarlink">Portfolio</Link></li>
        <li><Link to="/about" className="navbarlink">BriceVaillant</Link></li>
      </ul>
    </nav>
  );
}
