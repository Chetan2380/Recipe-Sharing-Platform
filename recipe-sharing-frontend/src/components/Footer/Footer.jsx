import React from 'react';
import "../Footer/Footer.css"
import footerlogo from "../Footer/logo-transparent-png.png"
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const router =useNavigate();
    return (
        <div>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </head>
            <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img
                        src={footerlogo}
                        alt="Footer Logo"
                    />
                </div>
                <div className='footer-slogan'>
                    <h2>Explore Culinary Creativity with RecipeShare</h2>
                    <p>Connect with food lovers around the globe and find your next favorite dish. At RecipeShare, we celebrate the art of cooking and the joy of sharing recipes that bring people together.</p>
                </div>
                <div className="footer-main">
                    <div className="footer-links">
                        <div className="footer-nav">
                            <h3>Navigations</h3>
                            <ul>
                                <li onClick={() => router('/')}>Home</li>
                                <li onClick={() => router('/all-recipes')}>Recipes</li>
                                <li onClick={() => router('/create-new-recipe')}>Add Recipe</li>
                            </ul>
                        </div>
                        <div className="footer-categories">
                            <h3>Categories</h3>
                            <ul>
                                <li onClick={() => router('/category/veg')}>Veg</li>
                                <li onClick={() => router('/category/non-veg')}>Non Veg</li>
                                <li onClick={() => router('/category/vegan')}>Vegan</li>
                                <li onClick={() => router('/category/special-recipes')}>Special Recipes</li>
                                <li onClick={() => router('/category/healthy')}>Healthy</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="social-media">
                    <h3>Follow us on:</h3>
                    <div className='social-media-logos'>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} RecipeShare. All rights reserved.</p>
            </div>
        </footer>
        </div>
    );
}

export default Footer