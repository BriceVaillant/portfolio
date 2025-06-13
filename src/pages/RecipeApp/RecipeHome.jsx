import { useEffect, useState } from 'react';
import './RecipeHome.css';


export default function RecipeHome() {
    const [recipes, setRecipes] = useState([]);
    const meals = recipes.filter(r => r.type === "meal");
    const desserts = recipes.filter(r => r.type === "dessert");

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
    useEffect(() => {
        fetch('/recipes.json')
            .then(res => res.json())
            .then(data => {
                const shuffled = shuffleArray(data);
                setRecipes(shuffled);
            })
            .catch(err => console.error('Error loading JSON:', err));
    }, []);
    return (
        <div className="homepage">
            <div className="imgplacement"></div>
            <div className="ideacontainer">
                <div className="Homepagetitle">
                    <div className="title">DINNER</div>
                    <div className="scrollcontainer">
                        <button className="scroll-btn left" onClick={() => handleScroll('mealcardscontainer', -1)}>←</button>
                        <div className="mealcardscontainer">
                            {meals.map(recipe => (
                                <div key={recipe.id} className="mealscard">
                                    <h2>{recipe.title}</h2>
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
                                <div key={recipe.id} className="dessertcard">
                                    <h2>{recipe.title}</h2>
                                </div>
                            ))}
                        </div>
                        <button className="scroll-btn right" onClick={() => handleScroll('dessertcardscontainer', 1)}>→</button>
                    </div>
                </div>
            </div>
        </div>

    );
}