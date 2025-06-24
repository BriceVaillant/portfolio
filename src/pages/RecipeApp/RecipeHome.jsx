import { useEffect, useState } from 'react';
import './RecipeHome.css';
import mealImg from './assets/meal.jpg';
import dessertImg from './assets/dessert.jpg';
import backgrdImg from './assets/background.jpg';


export default function RecipeHome() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const meals = recipes.filter(r => r.type === "meal");
    const desserts = recipes.filter(r => r.type === "dessert");

    //this below is used to edit recipe
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(selectedRecipe);

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

    //exit modal when background is clicked
    const handleBackdropClick = (e, closeModal) => {
        if (e.target === e.currentTarget) {
            closeModal(false);
        }
    };

    //handle the deleting part of the recipe
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this recipe?");
        if (!confirmed) return;

        try {
            const res = await fetch(`/.netlify/functions/deleteRecipe`, {
                method: 'DELETE',
                body: JSON.stringify({ id }),
            });

            const result = await res.json();
            if (res.ok) {
                //this Remove deleted recipe
                setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== id));
                //and this closes the modal
                setSelectedRecipe(null);
            } else {
                console.error('Delete failed:', result.error);
            }
        } catch (err) {
            console.error('Error deleting recipe:', err);
        }
    };

    //this handle the edit function 
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/.netlify/functions/updateRecipe', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editData),
            });

            const updated = await res.json();

            if (res.ok) {
                setRecipes(prev =>
                    prev.map(r => r._id === updated.recipe._id ? updated.recipe : r)
                );
                setSelectedRecipe(updated.recipe);
                setIsEditing(false);
            } else {
                console.error('Failed to update:', updated.error);
            }
        } catch (err) {
            console.error('Error updating recipe:', err);
        }
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
                    isEditing ? (
                        <div className="editrecipecontainer">
                            <div className="editrecipe">
                                <form onSubmit={handleEditSubmit} className="editrecipeform">
                                    <textarea
                                        id="editrecipetitle"
                                        name="Recipetitle"
                                        maxLength="20"
                                        value={editData.title}
                                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                    />
                                    <textarea
                                        id="editingredients"
                                        name="ingredients"
                                        value={editData.ingredients.join(' ')}
                                        onChange={(e) =>
                                            setEditData({ ...editData, ingredients: e.target.value.split(' ') })
                                        }
                                    />
                                    {/* Optional: ingredients input if you support editing it */}
                                    <textarea
                                        id="editinstructions"
                                        name="instructions"
                                        value={editData.instructions}
                                        onChange={(e) => setEditData({ ...editData, instructions: e.target.value })}
                                    />
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    ) : (

                        <div className="currentrecipecontainer" onClick={(e) => handleBackdropClick(e, setSelectedRecipe)}>
                            <div className="currentrecipe">
                                <h3>{selectedRecipe.title}</h3>
                                <div className="tophalf">
                                    <div className="recipe-ingredients">
                                        <h4>Ingredients</h4>
                                        <ul>
                                            {selectedRecipe.ingredients.map((ingredient, index) => (
                                                <li key={index}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="recipe-instruction">
                                        <h4>Instructions</h4>
                                        <p>{selectedRecipe.instructions}</p>
                                    </div>
                                </div>
                                <div className="bottomhalf">
                                    <button type="button" className="editbtn" onClick={() => {
                                        // pre fill form
                                        setEditData(selectedRecipe);
                                        setIsEditing(true);
                                    }}>
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="dltbtn"
                                        onClick={() => handleDelete(selectedRecipe._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>

    );
}

