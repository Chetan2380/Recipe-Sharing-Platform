import React from 'react';
import "../Footer/Footer.css"
import footerlogo from "../Footer/logo-transparent-png.png"

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-logo">
                    <img
                        src={footerlogo}
                        alt="Footer Logo"
                    />
                </div>
                <div className="footer-right">
                    <div className="footer-nav">
                        <h3 className="footer-heading">Navigations</h3>
                        <ul className="footer-nav-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/all-recipes">Recipes</a></li>
                            <li><a href="/create-new-recipe">Add Recipe</a></li>
                        </ul>
                    </div>
                    <div className="footer-categories">
                        <h3 className="footer-heading">Categories</h3>
                        <ul className="footer-category-links">
                            <li><a href="/categories/veg">Veg</a></li>
                            <li><a href="/categories/non-veg">Non Veg</a></li>
                            <li><a href="/categories/vegan">Vegan</a></li>
                            <li><a href="/categories/healthy">Healthy</a></li>
                            <li><a href="/categories/special-recipes">Special Recipes</a></li>
                            <li><a href="/categories/cuisines">Cuisines</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer