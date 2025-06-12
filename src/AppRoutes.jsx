//src/AppRoutes.jsx
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import RecipeApp from './pages/RecipeApp/App';
import Navbar from './components/Navbar';

export default function AppRoutes() {
  const location = useLocation();
  const isRecipeApp = location.pathname.startsWith("/projects/recipe");

  return (
    <>
      {!isRecipeApp && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/recipe/*" element={<RecipeApp />} />
      </Routes>
    </>
  );
}
