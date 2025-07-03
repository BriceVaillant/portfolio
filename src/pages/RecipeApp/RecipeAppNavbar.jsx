// src/pages/RecipeApp/RecipeAppNavbar.jsx

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    //let you go to a new url
    const navigate = useNavigate();
    //this store what the user type
    const [searchQuery, setSearchQuery] = useState("");

    const handleLogin = () => loginWithRedirect();
    const handleLogout = () => logout({ returnTo: window.location.origin });

    //handlle search logic 
    const handleSubmit = (e) => {
        //prefent full page reload
        e.preventDefault();
        //prevent empty search
        const trimmed = searchQuery.trim();
        if (!trimmed) return;
        //encoreurl prevent special character from breaking the url
        //.trim remove shite space
        navigate("/projects/recipe/recipelist?search=" + encodeURIComponent(trimmed));
        //clear the input after search
        setSearchQuery("");
    };

    //handle discover et your own recipe
    const handleRecettesClick = () => {
        if (!isAuthenticated) {
            loginWithRedirect();
        } else {
            navigate("/projects/recipe/recipelist");
        }
    };

    return (
        <nav className="recipeappnavbar">
            <div className="name">C.I.Y</div>
            <div className="inputfieldcontainer">
                <form className="searchformcontainer" onSubmit={handleSubmit}>
                    <input
                        className="loop"
                        type="text"
                        id="text-input"
                        placeholder="Chercher une recette ou un ingrédient..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        required
                    />
                    <button className="inputbutton" type="submit">🔍</button>
                </form>

                <div className="listcontainer">
                    <ul>
                        <li>
                            <Link to="/projects/recipe/home" className="navbarlink">Découvrir</Link>
                        </li>
                        <li>
                            <button className="navbarlink" onClick={handleRecettesClick}>Recettes</button>
                        </li>
                        <li>
                            {!isAuthenticated ? (
                                <button className="navbarlink" onClick={handleLogin}>Log In</button>
                            ) : (
                                <button className="navbarlink" onClick={handleLogout}>Log Out</button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
