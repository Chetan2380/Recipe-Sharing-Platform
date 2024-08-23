import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import toast from 'react-hot-toast';
import "./Home.css"
import Footer from '../Footer/Footer';

const Home = () => {
    const { state } = useContext(AuthContext);
    const router = useNavigate();
    const [latestRecipes, setLatestRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestRecipes = async () => {
            try {
                const response = await Api.get('/recipe/latest-recipes');
                if (response.data.success) {
                    setLatestRecipes(response.data.recipes);
                } else {
                    toast.error(response.data.error);
                }
            } catch (error) {
                toast.error('Failed to fetch latest recipes.');
            } finally {
                setLoading(false);
            }
        };

        fetchLatestRecipes();
    }, []);

    return (
        <div className="home-page">
            <div className="home-welcome-container">
                {state?.user && (<h1>Welcome to RecipeShare, {state?.user?.name}!</h1>)}
                {!state?.user && (<h1>Welcome to RecipeShare</h1>)}
                <p>Discover and share your favorite recipes</p>
            </div>
            {loading ? (
                <div className="home-loader">Loading...</div>
            ) : (
                <section className="home-recipes-section">
                    <h2>Latest Recipes</h2>
                    <div className="home-recipes-grid">
                        {latestRecipes.length > 0 ? (
                            latestRecipes.map((recipe) => (
                                <div key={recipe._id} className="home-recipe-card">
                                    <img src={recipe.image} alt={recipe.title} className="home-recipe-image" />
                                    <div className="home-recipe-info">
                                        <h3 className="home-recipe-title">{recipe.title}</h3>
                                        <p className="home-recipe-cuisine">Cuisine: {recipe.cuisine}</p>
                                        <p className="home-recipe-category">Category: {recipe.category}</p>
                                        <p className="home-recipe-time">Cooking Time: {recipe.cookingTime} mins</p>
                                        <p className="home-recipe-rating">Rating: {recipe.averageRating && recipe.averageRating > 0 ? recipe.averageRating : 'NA'}</p>
                                        <button
                                            className="home-view-details-btn"
                                            onClick={() => router(`/recipe/${recipe._id}`)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="home-no-recipes">No recipes available at the moment.</p>
                        )}
                    </div>
                </section>
            )}
            <section className="home-categories-section">
                <h2>Categories</h2>
                <div className="home-categories-grid">
                    <div
                        className="home-category-card veg"
                        onClick={() => router("/veg-recipes")}
                    >
                        Veg
                    </div>
                    <div
                        className="home-category-card non-veg"
                        onClick={() => router("/non-veg-recipes")}
                    >
                        Non Veg
                    </div>
                    <div
                        className="home-category-card vegan"
                        onClick={() => router("/vegan-recipes")}
                    >
                        Vegan
                    </div>
                    <div
                        className="home-category-card special-recipes"
                        onClick={() => router("/special-recipes")}
                    >
                        Special Recipes
                    </div>
                    <div
                        className="home-category-card healthy"
                        onClick={() => router("/healthy-recipes")}
                    >
                        Healthy
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;