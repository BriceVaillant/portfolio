import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useUserContext } from './contexts/UserContext.jsx';
import AddRecipeModal from './components/AddRecipeModal.jsx';
import EditRecipeModal from './components/EditRecipeModal';
import RecipeDetails from './components/RecipeDetails';
import mealImg from './assets/meal.jpg';
import dessertImg from './assets/dessert.jpg';
import addimg from './assets/plusicon.png';
import './RecipeList.css';


export default function RecipeList() {

    const location = useLocation();

    const {
        isLoading,
        isAuthenticated,
        user,
        reloadUserRecipes,
        createdRecipes,
        favoritedRecipes,
        userFavorites,
        setCreatedRecipes,
        toggleFavorite
    } = useUserContext();

    //this refresh the userrecipe when the route change
    useEffect(() => {
        reloadUserRecipes();
    }, [location.pathname]);

    //ajoutez favorite logic
    const allRecipes = [...createdRecipes, ...favoritedRecipes];

    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
    //this below is used to edit recipe
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);

    //combine favorite recipe and createad recipe to avoid duplicata
    const recipes = allRecipes.reduce((acc, recipe) => {
        if (!acc.find(r => r._id.toString() === recipe._id.toString())) {
            acc.push(recipe);
        }
        return acc;
    }, []);

    const meals = recipes.filter(r => r.type === "meal");
    // const desserts = recipes.filter(r => r.type === "dessert");

    //needed for the search bar to function
    const query = new URLSearchParams(useLocation().search);
    const searchQuery = query.get("search")?.toLowerCase() || "";

    //max size for image upload
    const MAX_SIZE_MB = 2;

    // this clear filter is search bar is used
    useEffect(() => {
        if (searchQuery) {
            setSelectedIngredients([]);
        }
    }, [searchQuery]);

    useEffect(() => {
        setEditData(selectedRecipe);
    }, [selectedRecipe]);


    //allow to filter to only display ingredients that are u sed multitple times
    const ingredientCounts = meals
        .flatMap(recipe => recipe.ingredients.map(ing => ing.name))
        .reduce((acc, ingredientName) => {
            acc[ingredientName] = (acc[ingredientName] || 0) + 1;
            return acc;
        }, {});

    const commonIngredients = Object.entries(ingredientCounts)
        .filter(([_, count]) => count >= 2)
        .map(([ingredient, count]) => ({ name: ingredient || 'unknown', count }))
        .sort((a, b) => a.name.localeCompare(b.name));

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

    //show add recipe modal when card is clicked
    const handleCardClick = () => {
        setShowAddRecipeModal(true);
    };

    //show recipe modal when card is clicked
    const handleFoodCardClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    //handle image upload via to cloudinary
    const handleImageUpload = async (file, setData) => {
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            alert('Image is too large. Max size is 2MB.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'recipewebsite');

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/dxrlfbw2k/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            setData(prev => ({
                ...prev,
                image: data.secure_url,
                imagePublicId: data.public_id
            }));
        } catch (err) {
            console.error('Upload failed:', err);
        }
    };

    const stringToIngredients = (rawText) =>
        rawText.split('\n')
            .map(line => {
                const [namePart, amountPart] = line.split(':').map(s => s.trim());
                if (!namePart || !amountPart) return { name: line.trim(), amount: null, unit: '' };

                const match = amountPart.match(/^(\d+(?:\.\d+)?)(?:\s*([^\d]+))?$/);

                return {
                    name: namePart,
                    amount: match ? parseFloat(match[1]) : null,
                    unit: match ? match[2]?.trim() || '' : amountPart
                };
            })
            .filter(({ name }) => !!name);

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
                setCreatedRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== id));
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
                setCreatedRecipes(prev =>
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

        const parsedIngredients = stringToIngredients(formData.ingredients);

        try {
            const res = await fetch('/.netlify/functions/addRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    ingredients: parsedIngredients,
                    userSub: user.sub
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setCreatedRecipes(prev => [data.recipe, ...prev]);
                setFormData({
                    title: '',
                    ingredients: '',
                    instructions: '',
                    image: '',
                    imagePublicId: '',
                    createdBy: ''
                });
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

    //handle filter with checkmark
    const filteredRecipes = recipes.filter(recipe => {
        const ingredientMatch =
            selectedIngredients.length === 0 ||
            selectedIngredients.some(ingredient =>
                recipe.ingredients.some(ing => ing.name.toLowerCase() === ingredient.toLowerCase())
            );

        //needed for search bar
        const searchMatch =
            searchQuery === "" ||
            recipe.title.toLowerCase().includes(searchQuery) ||
            recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery));

        return ingredientMatch && searchMatch;
    });

    if (isLoading) return <div>Loading...</div>;
    if (!isAuthenticated) return <div>Redirecting to login...</div>;

    return (
        <div className="recipelistcontainer">
            <div className="sidecolumn">
                <button className="filterlgd" onClick={() => setSelectedIngredients([])}>
                    Clear Selection
                </button>
                {commonIngredients.map(({ name }) => (
                    <label className="custom-checkbox" key={name}>
                        <input
                            type="checkbox"
                            name="filter"
                            value={name}
                            checked={selectedIngredients.includes(name)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedIngredients(prev => [...prev, name]);
                                } else {
                                    setSelectedIngredients(prev => prev.filter(i => i !== name));
                                }
                            }}
                        />
                        <span className="checkmark"></span>
                        <span className="filtertext">{name}</span>
                    </label>
                ))}
            </div>
            <div className="cardcolumn">
                <div className="listoffood">
                    <div className="newrecipecard" onClick={handleCardClick}>
                        <img
                            src={addimg}
                        />
                    </div>
                    {filteredRecipes.map(recipe => (
                        <div key={recipe._id} className="foodcard" onClick={() => handleFoodCardClick(recipe)}>
                            <h2>{recipe.title}</h2>
                            <img
                                src={recipe.image || (recipe.type === 'meal' ? mealImg : dessertImg)}
                            />
                        </div>
                    ))}
                </div>
                {showAddRecipeModal && (
                    <AddRecipeModal
                        formData={formData}
                        setFormData={setFormData}
                        onClose={() => setShowAddRecipeModal(false)}
                        handleSubmit={handleSubmit}
                        handleImageUpload={handleImageUpload}
                        handleTypeSelect={handleTypeSelect}
                    />
                )}
                {selectedRecipe && !isEditing && (
                    <RecipeDetails
                        recipe={selectedRecipe}
                        onEdit={() => {
                            setEditData(selectedRecipe);
                            setIsEditing(true);
                        }}
                        onDelete={handleDelete}
                        onClose={() => {
                            setSelectedRecipe(null);
                            reloadUserRecipes();
                        }}
                        userFavorites={userFavorites}
                        handleFavorite={toggleFavorite}
                    />
                )}
                {isEditing && (
                    <EditRecipeModal
                        editData={editData}
                        setEditData={setEditData}
                        onCancel={() => setIsEditing(false)}
                        onSave={handleEditSubmit}
                        handleImageUpload={handleImageUpload}
                    />
                )}
            </div >
        </div >
    );

}