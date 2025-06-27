import { Routes, Route } from 'react-router-dom';
import Navbar from './RecipeAppNavbar';
import RecipeHome from './RecipeHome';
import RecipeList from './RecipeList';
import './recipeapp.css';
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from './contexts/UserContext';

function RecipeApp() {
  return (
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: `${window.location.origin}/projects/recipe/recipelist`
        }}
      >
        <UserProvider>
        <div id="RecipeApp">
          <>
            <Navbar />
            <Routes>
              <Route index element={<RecipeHome />} />
              <Route path="home" element={<RecipeHome />} />
              <Route path="recipelist" element={<RecipeList key={Date.now()} />} />
            </Routes>
          </>
        </div>
        </UserProvider>
      </Auth0Provider>
    
  );
}

export default RecipeApp