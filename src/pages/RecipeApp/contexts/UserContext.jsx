// contexts/UserContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
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

  const reloadUserRecipes = async () => {
    if (!user || !dbUser) return;
    const res = await fetch('/.netlify/functions/getUserRecipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sub: user.sub, favorites: dbUser.favorites })
    });
    const data = await res.json();

    console.log('Created Recipes:', data.createdRecipes);
    console.log('Favorited Recipes:', data.favoritedRecipes);
    console.log('User Favorites:', dbUser.favorites.map(id => id.toString()));
    console.log('dbUser:', dbUser);

    setCreatedRecipes(data.createdRecipes);
    setFavoritedRecipes(data.favoritedRecipes || []);
    setUserFavorites(dbUser.favorites.map(id => id.toString()));
  };

  useEffect(() => {
    if (!user || !dbUser) return;
    reloadUserRecipes();
  }, [dbUser, user]);

  const toggleFavorite = async (recipeId) => {
  if (!user || !dbUser) return;

  // refresh immmediatly
  setUserFavorites(prev => 
    prev.includes(recipeId) 
      ? prev.filter(id => id !== recipeId)
      : [...prev, recipeId]
  );

  try {
    const favoriteRes = await fetch('/.netlify/functions/makeFavorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userSub: user.sub, recipeId })
    });

    const favoriteData = await favoriteRes.json();

    if (!favoriteRes.ok) {
      console.error('Failed to update favorite:', favoriteData.error);
      setUserFavorites(prev => 
        prev.includes(recipeId)
          ? prev.filter(id => id !== recipeId)
          : [...prev, recipeId]
      );
      return;
    }

      if (favoriteData.user?.favorites) {
        setUserFavorites(favoriteData.user.favorites.map(fav => fav.toString()));
    await reloadUserRecipes();
      }
  } catch (err) {
    console.error('Error toggling favorite:', err);
    setUserFavorites(prev => 
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  }
};

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
      setCreatedRecipes,
      reloadUserRecipes,
      toggleFavorite
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);