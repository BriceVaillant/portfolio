import { useEffect, useState } from 'react';
import { useUserContext } from './contexts/UserContext.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import './RecipeHome.css';
import './RecipeList.css';
import RecipeDetails from './components/RecipeDetails';
import mealImg from './assets/meal.jpg';
import dessertImg from './assets/dessert.jpg';
import backgrdImg from './assets/background.jpg';
import emptyHeart from './assets/Emptyheart.png';
import fullHeart from './assets/Fullheart.png';


export default function RecipeHome() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    const { userFavorites = [], setUserFavorites, user  } = useUserContext();

    const meals = recipes.filter(r => r.type === "meal");
    const desserts = recipes.filter(r => r.type === "dessert");

    function shuffleArray(array) {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    function handleScroll(containerClass, direction) {
        const container = document.querySelector(`.${containerClass}`);
        const viewportWidth = window.innerWidth;
        const cardWidth = 250 + 16;
        const cardsVisible = Math.floor(viewportWidth / cardWidth);
        const scrollStep = cardsVisible * cardWidth;
        container.scrollLeft += direction * scrollStep;
    }

    //show recipe modal when card is clicked
    const handleFoodCardClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

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

    useEffect(() => {
        fetch('/.netlify/functions/getAllRecipes')
            .then(res => res.json())
            .then(data => {
                const shuffled = shuffleArray(data);
                setRecipes(shuffled);
            })
            .catch(err => console.error('Error loading JSON:', err));
    }, []);

    return (
        <div className="homepage">
            <div className="imgheader">
                <h1>Cook It Yourself</h1>
                <img className="imgplacement" src={backgrdImg} />
            </div>

            <div className="ideacontainer">
                <div className="Homepagetitle">
                    <div className="title">DINNER</div>
                    <div className="scrollcontainer">
                        <button className="scroll-btn left" onClick={() => handleScroll('mealcardscontainer', -1)}>←</button>
                        <div className="mealcardscontainer">
                            {meals.map(recipe => (
                                <div key={`meal-${recipe._id}`} className="mealscard" onClick={() => handleFoodCardClick(recipe)}>
                                    <h2>{recipe.title}</h2>
                                    <div className="imgcardcontainer">
                                        <img className="bgdimg" src={recipe.image || mealImg} />
                                        <button
                                            className="homefavbtn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(recipe._id);
                                            }}
                                        >
                                            <img
                                                src={userFavorites.includes(recipe._id.toString()) ? fullHeart : emptyHeart}
                                                alt={userFavorites.includes(recipe._id.toString()) ? 'Unfavorite' : 'Favorite'}
                                                className="heartIcon"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="scroll-btn right" onClick={() => handleScroll('mealcardscontainer', 1)}>→</button>
                    </div>
                </div>

                <div className="Homepagetitle">
                    <div className="title">DESSERT</div>
                    <div className="scrollcontainer">
                        <button className="scroll-btn left" onClick={() => handleScroll('dessertcardscontainer', -1)}>←</button>
                        <div className="dessertcardscontainer">
                            {desserts.map(recipe => (
                                <div key={`dessert-${recipe._id}`} className="dessertcard" onClick={() => handleFoodCardClick(recipe)}>
                                    <h2>{recipe.title}</h2>
                                    <div className="imgcardcontainer">
                                        <img src={recipe.image || dessertImg} />
                                        <button
                                            className="homefavbtn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(recipe._id);
                                            }}
                                        >
                                            <img
                                                src={userFavorites.includes(recipe._id.toString()) ? fullHeart : emptyHeart}
                                                alt={userFavorites.includes(recipe._id.toString()) ? 'Unfavorite' : 'Favorite'}
                                                className="heartIcon"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="scroll-btn right" onClick={() => handleScroll('dessertcardscontainer', 1)}>→</button>
                    </div>
                </div>

                {selectedRecipe && (
                    <RecipeDetails
                        recipe={selectedRecipe}
                        onClose={() => setSelectedRecipe(null)}
                        showControls={false}
                    />
                )}
            </div>
        </div>
    );
}

