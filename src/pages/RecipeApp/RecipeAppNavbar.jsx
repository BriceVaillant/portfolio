// src/pages/RecipeApp/RecipeAppNavbar.jsx

import { Link } from 'react-router-dom';
import './RecipeAppNavbar.css';

export default function Navbar() {
    return (
        <nav className="recipeappnavbar">
            <div className="name">foodlogohere</div>
            <div className="inputfieldcontainer">
                <div className="searchformcontainer">
                    <input className="loop" type="text" id="text-input" placeholder="Search recipes..." required></input>
                        <button className="inputbutton" type="submit">🔍</button>
                </div>
                <div className="listcontainer">
                    <ul>
                        <li><Link to="/projects/recipe/home" className="navbarlink" >Discover</Link></li>
                        <li><Link to="/projects/recipe/recipelist" className="navbarlink" >Recipes</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
