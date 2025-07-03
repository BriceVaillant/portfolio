import { Routes, Route } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from './contexts/UserContext';
import { useLocation } from 'react-router-dom';

import Navbar from './RecipeAppNavbar';
import RecipeHome from './RecipeHome';
import RecipeList from './RecipeList';

import './recipeapp.css';
import './RecipeAppNavbar.css';
import './RecipeAppNavbar.css';
import './RecipeHome.css';
import './RecipeList.css';
import './RecipeDetails.css';
import './RecipeEdit.css';
import './RecipeAdd.css';


function RecipeApp() {

  const location = useLocation();

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/projects/recipe`
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <UserProvider>
        <div id="RecipeApp">
          <>
            <Navbar />
            <Routes location={location} key={location.pathname}>
              <Route index element={<RecipeHome />} />
              <Route path="home" element={<RecipeHome />} />
              <Route path="recipelist" element={<RecipeList />} />
            </Routes>
          </>
        </div>
      </UserProvider>
    </Auth0Provider>

  );
}

export default RecipeApp