import { useUserContext } from '../contexts/UserContext.jsx';

import mealImg from '../assets/meal.jpg';
import dessertImg from '../assets/dessert.jpg';
import emptyHeart from '../assets/Emptyheart.png';
import fullHeart from '../assets/Fullheart.png';

export default function RecipeDetails({ recipe, onEdit, onDelete, onClose, showControls = true }) {
    //is user connected ? 
    const { userFavorites = [], toggleFavorite } = useUserContext();

    return (
        <div className="currentrecipecontainer" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="currentrecipe">
                <div className="top">
                    <div className="leftside">
                        <div className="img-wrapper">
                            <button type="button" className="favoriteButton" onClick={() => toggleFavorite(recipe._id)}>
                                <img
                                    src={userFavorites.includes(recipe._id.toString()) ? fullHeart : emptyHeart}
                                    alt="favorite"
                                    className="heartIcon"
                                />
                            </button>
                            <img
                                src={recipe.image || (recipe.type === 'meal' ? mealImg : dessertImg)}
                                alt={recipe.title}
                            />
                        </div>
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