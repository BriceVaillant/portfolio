import { Routes, Route } from 'react-router-dom';
import Navbar from './RecipeAppNavbar';
import RecipeHome from './RecipeHome';
import RecipeList from './RecipeList';
import './recipeapp.css';
import { Auth0Provider } from "@auth0/auth0-react";

function RecipeApp() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/projects/recipe/recipelist`
      }}
    >
      <div id="RecipeApp">
        <>
          <Navbar />
          <Routes>
            <Route index element={<RecipeHome />} />
            <Route path="home" element={<RecipeHome />} />
            <Route path="recipelist" element={<RecipeList />} />
          </Routes>
        </>
      </div>
    </Auth0Provider>
  );
}

export default RecipeApp