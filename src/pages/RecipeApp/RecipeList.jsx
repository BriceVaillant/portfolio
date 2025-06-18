import { useEffect, useState } from 'react';
import './RecipeList.css';


export default function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
    //this below is used to edit recipe
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(selectedRecipe);

    const meals = recipes.filter(r => r.type === "meal");
    // const desserts = recipes.filter(r => r.type === "dessert");

    //fetch data from json to generate card
    useEffect(() => {
        fetch('/.netlify/functions/getRecipes')
            .then(res => res.json())
            .then(data => {
                const shuffled = shuffleArray(data);
                setRecipes(shuffled);
            })
            .catch(err => console.error('Error loading JSON:', err));
    }, []);

    //allow to filter to only display ingredients that are u sed multitple times
    const ingredientCounts = meals
        .flatMap(recipe => recipe.ingredients)
        .reduce((acc, ingredient) => {
            acc[ingredient] = (acc[ingredient] || 0) + 1;
            return acc;
        }, {});

    const commonIngredients = Object.entries(ingredientCounts)
        .filter(([_, count]) => count >= 2)
        .map(([ingredient]) => ingredient)
        .sort();

    //const [showFoodModal, setShowFoodModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        ingredients: '',
        instructions: ''
    });

    //handle the choice of recipe
    const handleTypeSelect = (selectedType) => {
        setFormData({ ...formData, type: selectedType });
    };

    //shuffle card array 
    function shuffleArray(array) {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    //handle filter with checkmark
    const filteredRecipes = recipes.filter(recipe => {
        if (selectedIngredients.length === 0) return true;


        return selectedIngredients.some(ingredient =>
            recipe.ingredients.includes(ingredient)
        );
    });

    //show add recipe modal when card is clicked
    const handleCardClick = () => {
        setShowAddRecipeModal(true);
    };

    //show recipe modal when card is clicked
    const handleFoodCardClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    //exit modal when background is clicked
    const handleBackdropClick = (e, closeModal) => {
        if (e.target === e.currentTarget) {
            setFormData({ title: '', ingredients: '', instructions: '' });
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
                // Refresh list, or update state to remove deleted recipe
                //this close the modal
                setSelectedRecipe(null);
                handleSubmit(); // or however you're refreshing your list
            } else {
                console.error('Delete failed:', result.error);
            }
        } catch (err) {
            console.error('Error deleting recipe:', err);
        }
    };

    //fetch recipe logic
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/.netlify/functions/addRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                console.log('Recipe saved:', data.recipe);
                setFormData({ title: '', ingredients: '', instructions: '' });
                setShowAddRecipeModal(false);
            } else {
                console.error('Failed to save recipe:', data);
                alert('Failed to save recipe.');
            }
        } catch (err) {
            console.error('Error saving recipe:', err);
            alert('Something went wrong.');
        }
    };

    return (
        <div className="recipelistcontainer">
            <div className="sidecolumn">
                <button className="filterlgd" onClick={() => setSelectedIngredients([])}>
                    Clear Selection
                </button>
                {commonIngredients.map((ingredient) => (
                    <label className="custom-checkbox" key={ingredient}>
                        <input
                            type="checkbox"
                            name="filter"
                            value={ingredient}
                            checked={selectedIngredients.includes(ingredient)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedIngredients(prev => [...prev, ingredient]);
                                } else {
                                    setSelectedIngredients(prev => prev.filter(i => i !== ingredient));
                                }
                            }}
                        />
                        <span className="checkmark"></span>
                        <span className="filtertext">{ingredient}</span>
                    </label>
                ))}
            </div>
            <div className="cardcolumn">
                <div className="listoffood">
                    <div className="newrecipecard" onClick={handleCardClick}>
                        <h2>Add a new recipe</h2>
                    </div>
                    {filteredRecipes.map(recipe => (
                        <div className="foodcard" onClick={() => handleFoodCardClick(recipe)}>
                            <h2>{recipe.title}</h2>
                        </div>
                    ))}
                </div>
                {showAddRecipeModal && (
                    <div className="addrecipecontainer" onClick={(e) => handleBackdropClick(e, setShowAddRecipeModal)}>
                        <form className="addrecipeform" onSubmit={handleSubmit}>
                            <h2 className="recipename">New Recipe</h2>
                            <textarea
                                id="addrecipetitle"
                                name="Recipetitle"
                                placeholder="Recipe Title"
                                maxLength="20"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <div className="choice">
                                <button
                                    type="button"
                                    className={`choicebtn ${formData.type === 'dessert' ? 'selected' : ''}`}
                                    onClick={() => handleTypeSelect('dessert')}
                                >
                                    Dessert
                                </button>
                                <button
                                    type="button"
                                    className={`choicebtn ${formData.type === 'meal' ? 'selected' : ''}`}
                                    onClick={() => handleTypeSelect('meal')}
                                >
                                    Meal
                                </button>
                            </div>
                            <textarea
                                id="addingredients"
                                name="ingredients"
                                placeholder="Ingredients (separated by a space) example: pasta tomate chicken"
                                required
                                value={formData.ingredients}
                                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                            />
                            <textarea
                                id="addinstructions"
                                name="instructions"
                                placeholder="Instructions"
                                required
                                value={formData.instructions}
                                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                            />
                            <input id="submit" type="submit" value="Save" />
                        </form>
                    </div>
                )}
                {selectedRecipe && (
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
                            <div class="bottomhalf">
                                <button type="button" className="editbtn">
                                    Edit
                                </button>
                                <button type="button" className="dltbtn"
                                    onClick={() => handleDelete(selectedRecipe._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}