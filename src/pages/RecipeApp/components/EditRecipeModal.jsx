export default function EditRecipeModal({ editData, setEditData, onCancel, onSave }) {
    const ingredientsToString = (ingredients) =>
        ingredients.map(({ name, amount, unit }) => `${name}: ${amount}${unit}`).join('\n');

    const stringToIngredients = (rawText) =>
        rawText.split('\n')
            .map(line => {
                const [name, rawValue] = line.split(':').map(s => s.trim());
                if (!name || !rawValue) return null;

                const match = rawValue.match(/^(\d+)([a-zA-Z]*)$/);
                if (!match) return null;

                return {
                    name,
                    amount: parseInt(match[1], 10),
                    unit: match[2] || ''
                };
            })
            .filter(Boolean);

    return (
        <div className="editrecipecontainer">
            <div className="editrecipe">
                <form onSubmit={onSave} className="editrecipeform">
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
                        value={ingredientsToString(editData.ingredients)}
                        onChange={(e) =>
                            setEditData({
                                ...editData,
                                ingredients: stringToIngredients(e.target.value)
                            })
                        }
                    />
                    <textarea
                        id="editinstructions"
                        name="instructions"
                        value={editData.instructions}
                        onChange={(e) => setEditData({ ...editData, instructions: e.target.value })}
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}