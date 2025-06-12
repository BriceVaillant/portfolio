import { useEffect } from 'react';
import './RecipeHome.css';


export default function RecipeHome() {
    function handleScroll(e, direction) {
        const container = e.currentTarget.parentElement.querySelector('.cardscontainer');
        const viewportWidth = window.innerWidth;
        const cardWidth = 250 + 16;
        const cardsVisible = Math.floor(viewportWidth / cardWidth);
        const scrollStep = cardsVisible * cardWidth;
        container.scrollLeft += direction * scrollStep;
    }
    return (
        <div className="homepage">
            <div className="imgplacement"></div>
            <div className="ideacontainer">
                <div className="dinner">
                    <div className="title">DINNER</div>
                    <div className="scrollcontainer">
                        <button className="scroll-btn left" onClick={(e) => handleScroll(e, -1)}>←</button>
                        <div className="cardscontainer">
                            <div className="card">
                                <h2>Pizzamozza</h2>
                            </div>
                            <div className="card">deux</div>
                            <div className="card">trois</div>
                            <div className="card">quatre</div>
                            <div className="card">cinq</div>
                            <div className="card">six</div>
                            <div className="card">sept</div>
                            <div className="card">huit</div>
                            <div className="card">neuf</div>
                            <div className="card">10</div>
                            <div className="card">11</div>
                            <div className="card"></div>
                            <div className="card"></div>
                            <div className="card"></div>
                            <div className="card"></div>
                            <div className="card"></div>
                        </div>
                        <button className="scroll-btn right" onClick={(e) => handleScroll(e, 1)}>→</button>
                    </div>
                </div>

                <div className="dinner">
                    <div className="title">DESSERT</div>
                    <div className="cardscontainer">
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}