export default function RecipeDetails({ recipe, onEdit, onDelete, onClose }) {
    return (
        <div className="currentrecipecontainer" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="currentrecipe">
                <div className="top">
                    <div className="leftside">
                        <img
                            src={recipe.image || (recipe.type === 'meal' ? '/assets/meal.jpg' : '/assets/dessert.jpg')}
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
                        <div className="recipe-instruction">
                            <h4>Instructions</h4>
                            <p>{recipe.instructions}</p>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <button type="button" className="editbtn" onClick={onEdit}>Edit</button>
                    <button type="button" className="dltbtn" onClick={() => onDelete(recipe._id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}