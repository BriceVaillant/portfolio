// src/pages/RecipeApp/RecipeAppNavbar.jsx

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './RecipeAppNavbar.css';

export default function Navbar() {
    //this store what the user type
    const [searchQuery, setSearchQuery] = useState("");
    //let you go to a new url
    const navigate = useNavigate();

    return (
        <nav className="recipeappnavbar">
            <div className="name">D.I.Y.Food</div>
            <div className="inputfieldcontainer">
                <form
                    className="searchformcontainer"
                    onSubmit={(e) => {
                        //prefent full page reload
                        e.preventDefault();
                        //prevent empty search
                        if (searchQuery.trim() === "") return;
                        //encoreurl prevent special character from breaking the url
                        //.trim remove shite space
                        navigate("/projects/recipe/recipelist?search=" + encodeURIComponent(searchQuery));
                        //clear the input after search
                        setSearchQuery("");
                    }}
                >
                    <input
                        className="loop"
                        type="text"
                        id="text-input"
                        placeholder="Search recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        required
                    />
                    <button className="inputbutton" type="submit">🔍</button>
                </form>
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
