import mealImg from '../assets/meal.jpg';
import dessertImg from '../assets/dessert.jpg';
import emptyHeart from '../assets/Emptyheart.png';
import fullHeart from '../assets/Fullheart.png';
import { useUserContext } from '../contexts/UserContext.jsx';
import { useAuth0 } from '@auth0/auth0-react';


export default function RecipeDetails({ recipe, onEdit, onDelete, onClose, showControls = true }) {
    //is user connected ? 
    const { userFavorites = [], user, setUserFavorites } = useUserContext();
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    const toggleFavorite = async (recipeId) => {
        if (!isAuthenticated) {
    loginWithRedirect();
    return;
  }
        try {
            // Optimistic update
            setUserFavorites(prev =>
                prev.includes(recipeId)
                    ? prev.filter(id => id !== recipeId)
                    : [...prev, recipeId]
            );

            // thjis update the database
            const favoriteRes = await fetch('/.netlify/functions/makeFavorite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userSub: user.sub,
                    recipeId
                })
            });

            const favoriteData = await favoriteRes.json();

            if (favoriteData.user?.favorites) {
                const updatedFavorites = favoriteData.user.favorites.map(fav => fav.toString());
                setUserFavorites(updatedFavorites);

                //this refresh the favorite
                const recipeRes = await fetch('/.netlify/functions/getUserRecipes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sub: user.sub,
                        favorites: updatedFavorites
                    })
                });

                const recipeData = await recipeRes.json();
                setFavoritedRecipes(recipeData.favoritedRecipes || []);
            }
        } catch (err) {
            console.error('Error toggling favorite:', err);
        }
    };

    return (
        <div className="currentrecipecontainer" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="currentrecipe">
                <div className="top">
                    <div className="leftside">
                        <img
                            src={recipe.image || (recipe.type === 'meal' ? mealImg : dessertImg)}
                            alt={recipe.title}
                        />
                        <div className="recipe-ingredients">
                            <h4>Ingredients</h4>
                            <ul>
                                {recipe.ingredients.map(({ name, amount, unit }, index) => (
                                    <li key={index}>{`${name}: ${amount}${unit}`}</li>
                                ))}
                            </ul>
                        </div>

                    </div>
                    <div className="rightside">
                        <h3>{recipe.title}</h3>
                            <button className="favoriteButton" onClick={() => toggleFavorite(recipe._id)}>
                                <img
                                    src={userFavorites.includes(recipe._id.toString()) ? fullHeart : emptyHeart}
                                    alt={userFavorites.includes(recipe._id.toString()) ? 'Unfavorite' : 'Favorite'}
                                    className="heartIcon"
                                />
                            </button>
                        <div className="recipe-instruction">
                            <h4>Instructions</h4>
                            <div className="instructionlist">
                                {recipe.instructions
                                    .split('\n')
                                    .filter(line => line.trim() !== '')
                                    .map((line, index) => (
                                        <p key={index}>{line}</p>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    {showControls && (
                        <>
                            <button type="button" className="editbtn" onClick={onEdit}>Edit</button>
                            <button type="button" className="dltbtn" onClick={() => onDelete(recipe._id)}>Delete</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}