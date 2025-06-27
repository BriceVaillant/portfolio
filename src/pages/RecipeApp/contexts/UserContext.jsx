// contexts/UserContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isAuthenticated, user, isLoading, loginWithRedirect } = useAuth0();
  const [dbUser, setDbUser] = useState(null);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

  // Auth redirect
  //useEffect(() => {
  //  if (!isLoading && !isAuthenticated) loginWithRedirect();
  //}, [isLoading, isAuthenticated, loginWithRedirect]);

  // Sync user + fetch recipes
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const syncUser = async () => {
      const res = await fetch('/.netlify/functions/createOrGetUser', {
        method: 'POST',
        body: JSON.stringify(user)
      });
      const data = await res.json();
      setDbUser(data.user);
    };

    syncUser();
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!user || !dbUser) return;

    const fetchRecipes = async () => {
      const res = await fetch('/.netlify/functions/getUserRecipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sub: user.sub, favorites: dbUser.favorites })
      });
      const data = await res.json();
      setCreatedRecipes(data.createdRecipes);
      setFavoritedRecipes(data.favoritedRecipes || []);
    };

    setUserFavorites(dbUser.favorites.map(id => id.toString()));
    fetchRecipes();
  }, [dbUser, user]);

  return (
    <UserContext.Provider value={{
      isLoading,
      isAuthenticated,
      user,
      dbUser,
      createdRecipes,
      favoritedRecipes,
      userFavorites,
      setUserFavorites,
      setCreatedRecipes
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);