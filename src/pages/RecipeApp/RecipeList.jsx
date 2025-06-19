import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

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

    //needed for the search bar to function
    const query = new URLSearchParams(useLocation().search);
    const searchQuery = query.get("search")?.toLowerCase() || "";

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

    // this clear filter is search bar is used
    useEffect(() => {
    if (searchQuery) {
        setSelectedIngredients([]);
    }
}, [searchQuery]);

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
    const filteredRecipes = recipes.filter((recipe) => {
        //handle the filter bar
        const ingredientMatch =
            selectedIngredients.length === 0 ||
            selectedIngredients.some((ingredient) =>
                recipe.ingredients.includes(ingredient)
            );

        //needed for search bar
        const searchMatch =
            searchQuery === "" ||
            recipe.title.toLowerCase().includes(searchQuery) ||
            recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery));

        return ingredientMatch && searchMatch;
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
                setRecipes(prev => [data.recipe, ...prev]);
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
                        <div key={recipe._id} className="foodcard" onClick={() => handleFoodCardClick(recipe)}>
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
            </div >
        </div >
    );
}