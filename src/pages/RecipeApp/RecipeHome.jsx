import { useEffect, useState } from 'react';
import './RecipeHome.css';
import './RecipeList.css';
import mealImg from './assets/meal.jpg';
import dessertImg from './assets/dessert.jpg';
import backgrdImg from './assets/background.jpg';



export default function RecipeHome() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
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

    useEffect(() => {
        fetch('/.netlify/functions/getRecipes')
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
                                <div key={recipe._id} className="mealscard" onClick={() => handleFoodCardClick(recipe)}>
                                    <h2>{recipe.title}</h2>
                                    <img
                                        src={recipe.image || mealImg}
                                    />
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
                                <div key={recipe._id} className="dessertcard" onClick={() => handleFoodCardClick(recipe)}>
                                    <h2>{recipe.title}</h2>
                                    <img
                                        src={recipe.image || dessertImg}
                                    />
                                </div>
                            ))}
                        </div>
                        <button className="scroll-btn right" onClick={() => handleScroll('dessertcardscontainer', 1)}>→</button>
                    </div>
                </div>
                {selectedRecipe && (
                    <div
                        className="currentrecipecontainer"
                        onClick={(e) => e.target === e.currentTarget && setSelectedRecipe(null)}
                    >
                        <div className="currentrecipe">
                            <div className="top">
                                <div className="leftside">
                                    <img
                                        src={selectedRecipe.image || (selectedRecipe.type === 'meal' ? mealImg : dessertImg)}
                                        alt={selectedRecipe.title}
                                    />
                                    <div className="recipe-ingredients">
                                        <h4>Ingredients</h4>
                                        <ul>
                                            {selectedRecipe.ingredients.map(({ name, amount, unit }, index) => (
                                                <li key={index}>{`${name}: ${amount}${unit}`}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="rightside">
                                    <h3>{selectedRecipe.title}</h3>
                                    <div className="recipe-instruction">
                                        <h4>Instructions</h4>
                                        {selectedRecipe.instructions
                                            .split('\n')
                                            .filter(line => line.trim() !== '')
                                            .map((line, index) => (
                                                <p key={index}>{line}</p>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}

