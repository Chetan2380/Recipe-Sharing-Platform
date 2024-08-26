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
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchLatestRecipes = async () => {
            try {
                const response = await Api.get('/recipe/latest-recipes');
                if (response.data.success) {
                    setLatestRecipes(response.data.recipes);
                    setFilteredRecipes(response.data.recipes); // Initialize filteredRecipes
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

    useEffect(() => {
        // Filter recipes based on search term
        if (searchTerm) {
            const results = latestRecipes.filter(recipe =>
                recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRecipes(results);
        } else {
            setFilteredRecipes(latestRecipes);
        }
    }, [searchTerm, latestRecipes]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="home-page">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </head>
            <div className="home-welcome-container">
                {state?.user ? (
                    <h1>Welcome to RecipeShare, {state?.user?.name}!</h1>
                ) : (
                    <h1>Welcome to RecipeShare</h1>
                )}
                <p>Discover and share your favorite recipes</p>
            </div>
            
            <div className="home-search-container">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="home-search-input"
                />
            </div>

            {loading ? (
                <div className="home-loader">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                </div>
            ) : (
                <section className="home-recipes-section">
                    <h2>Latest Recipes</h2>
                    <div className="home-recipes-grid">
                        {filteredRecipes.length > 0 ? (
                            filteredRecipes.map((recipe) => (
                                <div
                                    key={recipe._id}
                                    className="home-recipe-card"
                                    onClick={() => router(`/single-recipe/${recipe._id}`)}
                                >
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="home-recipe-image"
                                    />
                                    <div className="home-recipe-info">
                                        <h3 className="home-recipe-title">{recipe.title}</h3>
                                        <p className="home-recipe-cuisine">{recipe.cuisine}</p>
                                        <p className="home-recipe-category">{recipe.category}</p>
                                    </div>
                                    <div className="home-cooking-time-container">
                                        <i className="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}
                                    </div>
                                    <div className="home-rating-container">
                                        <i className="fa-solid fa-star"></i>&nbsp;&nbsp;
                                        {recipe.averageRating && recipe.averageRating > 0
                                            ? recipe.averageRating
                                            : 'NA'}
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
                        onClick={() => router('/veg-recipes')}
                    >
                        Veg
                    </div>
                    <div
                        className="home-category-card non-veg"
                        onClick={() => router('/non-veg-recipes')}
                    >
                        Non Veg
                    </div>
                    <div
                        className="home-category-card vegan"
                        onClick={() => router('/vegan-recipes')}
                    >
                        Vegan
                    </div>
                    <div
                        className="home-category-card special-recipes"
                        onClick={() => router('/special-recipes')}
                    >
                        Special Recipes
                    </div>
                    <div
                        className="home-category-card healthy"
                        onClick={() => router('/healthy-recipes')}
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