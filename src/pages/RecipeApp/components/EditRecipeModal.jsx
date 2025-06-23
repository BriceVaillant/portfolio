import { useState, useEffect } from 'react';

export default function EditRecipeModal({ editData, setEditData, onCancel, onSave }) {
    const [ingredientsText, setIngredientsText] = useState('');

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

    useEffect(() => {
        setIngredientsText(
            editData.ingredients
                .map(({ name, amount, unit }) => `${name}: ${amount}${unit}`)
                .join('\n')
        );
    }, []);

    const handleIngredientsChange = (e) => {
        const text = e.target.value;
        setIngredientsText(text);

        const parsedIngredients = stringToIngredients(text);
        setEditData(prev => ({ ...prev, ingredients: parsedIngredients }));
    };

    ;

    return (
        <div className="editrecipecontainer">
            <div className="editrecipe">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSave(editData);
                }} className="editrecipeform">
                    <textarea
                        id="editrecipetitle"
                        name="Recipetitle"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    />                   
                    <textarea
                        id="editingredients"
                        name="ingredients"
                        value={ingredientsText}
                        onChange={handleIngredientsChange}

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