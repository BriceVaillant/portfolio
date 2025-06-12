import { useState } from 'react';
import './RecipeList.css';


export default function RecipeList() {
    const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instructions: ''
    });

    const handleCardClick = () => {
        setShowAddRecipeModal(true);
    };

    const handleFoodCardClick = () => {
        setShowFoodModal(true);
    };

    const handleBackdropClick = (e, closeModal) => {
        if (e.target === e.currentTarget) {
            closeModal(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //need to save all that into the json
        console.log(formData);
        setShowAddRecipeModal(false);
         //this reset the form
        setFormData({ title: '', ingredients: '', instructions: '' });
    };
    return (
        <div className="maincontainer">
            <div className="sidecolumn">
                <div className="filterlgd custom-checkbox">
                    <button className="clrbtn checkmark">X</button>
                    <h1 className="filtertext">Clear Selection:</h1>
                </div>
                <label className="custom-checkbox">
                    <input type="checkbox" name="filter" value="rice"></input>
                    <span className="checkmark"></span>
                    <span className="filtertext">Rice</span>
                </label>
                <label className="custom-checkbox">
                    <input type="checkbox" name="filter" value="Chicken"></input>
                    <span className="checkmark"></span>
                    <span className="filtertext">Chicken</span>
                </label>
                <label className="custom-checkbox">
                    <input type="checkbox" name="filter" value="Shrimp"></input>
                    <span className="checkmark"></span>
                    <span className="filtertext">Shrimp</span>
                </label>
                <label className="custom-checkbox">
                    <input type="checkbox" name="filter" value="Pasta"></input>
                    <span className="checkmark"></span>
                    <span className="filtertext">Pasta</span>
                </label>
                <label className="custom-checkbox">
                    <input type="checkbox" name="filter" value="Potatoes"></input>
                    <span className="checkmark"></span>
                    <span className="filtertext">Potatoes</span>
                </label>
                <label className="custom-checkbox">
                    <input type="checkbox" name="filter" value="rice"></input>
                    <span className="checkmark"></span>
                    <span className="filtertext">Rice</span>
                </label>
                <label className="custom-checkbox">
                    <input type="checkbox" name="filter" value="Chicken"></input>
                    <span className="checkmark"></span>
                    <span className="filtertext">Chicken</span>
                </label>
                <label className="custom-checkbox">
                    <input type="checkbox" name="filter" value="Shrimp"></input>
                    <span className="checkmark"></span>
                    <span className="filtertext">Shrimp</span>
                </label>
                <label className="custom-checkbox">
                    <input type="checkbox" name="filter" value="Pasta"></input>
                    <span className="checkmark"></span>
                    <span className="filtertext">Pasta</span>
                </label>
            </div>
            <div className="cardcolumn">
                <div className="listoffood">
                    <div className="newrecipecard" onClick={handleCardClick}>
                        <h2>Add a new recipe</h2>
                    </div>
                    <div className="foodcard" onClick={handleFoodCardClick}>
                        <h2>Pizzamozza</h2>
                    </div>
                    <div className="foodcard" onClick={handleFoodCardClick}>
                        <h2>guacamole</h2>
                    </div>
                    <div className="foodcard" onClick={handleFoodCardClick}>
                        <h2>tiramisu</h2>
                    </div>
                    <div className="foodcard" onClick={handleFoodCardClick}>
                        <h2>crepes</h2>
                    </div>
                    <div className="foodcard" onClick={handleFoodCardClick}>
                        <h2>muffin</h2>
                    </div>
                    <div className="foodcard" onClick={handleFoodCardClick}>
                        <h2>pate bolognese</h2>
                    </div>
                    <div className="foodcard" onClick={handleFoodCardClick}>
                        <h2>pate bolognese</h2>
                    </div>
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
                            <input id="submit" type="submit" value="Add Recipe" />
                        </form>
                    </div>
                )}
                {showFoodModal && (
                    <div className="currentrecipecontainer" onClick={(e) => handleBackdropClick(e, setShowFoodModal)}>
                        <div className="currentrecipe">
                            <h3>Title</h3>
                            <div className="halfcontainer">
                                <div className="recipe-ingredients">
                                    <h4>Ingredients:</h4>
                                    <ul>
                                        <li>tomates</li>
                                        <li>pasta</li>
                                        <li>rice</li>
                                        <li>chicken</li>
                                    </ul>
                                </div>
                                <div className="recipe-instruction">
                                    <h4>Instructions:</h4>
                                    <p>Some instructions here...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}