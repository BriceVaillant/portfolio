//src/AppRoutes.jsx
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import VinylMarketApp from './pages/VinylMarket/app';
import Miniatures from './pages/Miniatures';
import Navbar from './components/Navbar';
import Socials from './components/Socials';

export default function AppRoutes() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/projects/VinylMarket");

  const hideSocial =
    location.pathname.startsWith("/projects");  
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/VinylMarket/*" element={<VinylMarketApp />} />
        <Route path="/briceminis" element={<Miniatures />} />
      </Routes>
      {!hideSocial && <Socials />}
    </>
  );
}
