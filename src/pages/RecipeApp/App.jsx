import { Routes, Route } from 'react-router-dom';
import Navbar from './RecipeAppNavbar';
import RecipeHome from './RecipeHome';
import RecipeList from './RecipeList';

function RecipeApp() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<RecipeHome />} />
        <Route path="home" element={<RecipeHome />} />
        <Route path="recipelist" element={<RecipeList />} />
      </Routes>
    </>
  );
}

export default RecipeApp