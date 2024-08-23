import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import toast from 'react-hot-toast';
import "./Home.css"

const Home = () => {
    const { state } = useContext(AuthContext);
    const navigate = useNavigate();
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
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to RecipeShare, {state?.user?.name}!</h1>
                <p>Discover and share your favorite recipes</p>
            </header>
            {loading ? (
                <div className="loader">Loading...</div>
            ) : (
                <section className="recipes-section">
                    <h2>Latest Recipes</h2>
                    <div className="recipes-grid">
                        {latestRecipes.length > 0 ? (
                            latestRecipes.map((recipe) => (
                                <div key={recipe._id} className="recipe-card">
                                    <img src={recipe.image} alt={recipe.title} className="recipe-image"/>
                                    <div className="recipe-info">
                                        <h3 className="recipe-title">{recipe.title}</h3>
                                        <p className="recipe-cuisine">Cuisine: {recipe.cuisine}</p>
                                        <p className="recipe-category">Category: {recipe.category}</p>
                                        <p className="recipe-time">Cooking Time: {recipe.cookingTime} mins</p>
                                        <p className="recipe-rating">Rating: {recipe.averageRating}</p>
                                        <button 
                                            className="view-details-btn"
                                            onClick={() => navigate(`/single-recipe/${recipe._id}`)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-recipes">No recipes available at the moment.</p>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;