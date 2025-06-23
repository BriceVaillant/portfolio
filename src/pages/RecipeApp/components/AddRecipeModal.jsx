export default function AddRecipeModal({ formData, setFormData, onClose, handleSubmit, handleImageUpload, handleTypeSelect }) {
  return (
    <div className="addrecipecontainer" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="addrecipeform" onSubmit={handleSubmit}>
        <div className="top-third-row">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
          <textarea
            id="addrecipetitle"
            name="Recipetitle"
            placeholder="Recipe Name"
            maxLength="30"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <button
            type="button"
            className={`choicebtn ${formData.type === 'meal' ? 'selected' : ''}`}
            onClick={() => handleTypeSelect('meal')}
          >
            Meal
          </button>
          <button
            type="button"
            className={`choicebtn ${formData.type === 'dessert' ? 'selected' : ''}`}
            onClick={() => handleTypeSelect('dessert')}
          >
            Dessert
          </button>
        </div>
        <div className="middle-third-row">
          <h2 className="formtitle">Ingredients:</h2>
          <textarea
            id="addingredients"
            name="ingredients"
            placeholder={`Enter ingredients like this:\nboeuf: 400g\nmilk: 40ml\ncarrotte: 4`}
            required
            value={formData.ingredients}
            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
          />
        </div>
        <div className="bottom-third-row">
          <h2 className="formtitle">Instructions:</h2>
          <textarea
            id="addinstructions"
            name="instructions"
            placeholder="Instructions"
            required
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
          />
        </div>
        <input id="submit" type="submit" value="Save" />
      </form>
    </div>
  );
}