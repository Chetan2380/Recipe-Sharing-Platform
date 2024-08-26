import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import Api from '../../axiosconfig';
import "./AllRecipe.css"
import Footer from '../Footer/Footer';

const AllRecipes = () => {
    const router = useNavigate();
    const [allRecipes, setAllRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const { state } = useContext(AuthContext);

    async function GetRecipe() {
        setLoading(true);
        try {
            const response = await Api.get("/recipe/get-all-recipe");
            if (response.data.success) {
                setLoading(false);
                setAllRecipes(response.data.recipes);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetRecipe();
    }, []);

    useEffect(() => {
        if (state.searchResults.length > 0) {
            setAllRecipes(state.searchResults);
        } else {
            GetRecipe();
        }
    }, [state.searchResults]);

    return (
        <div>
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </head>
            <div className="all-recipes-page">
                <h1>All Recipes</h1>
                {loading ? (
                    <div className="loader-container">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                    </div>
                ) : (
                    <div className="all-recipes-grid">
                        {allRecipes.map((recipe) => (
                            <div
                                key={recipe._id}
                                className="all-recipe-card"
                                onClick={() => router(`/single-recipe/${recipe._id}`)}
                            >
                                {/* Show loader inside card if loading */}
                                {loading ? (
                                    <div className="card-loader">
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                    </div>
                                ) : (
                                    <>
                                        <img src={recipe.image} alt={recipe.title} className="all-recipe-image" />
                                        <div className="all-recipe-details">
                                            <h3 className="all-recipe-title">{recipe.title}</h3>
                                            <p className="home-recipe-cuisine">{recipe.cuisine}</p>
                                            <p className="home-recipe-category">{recipe.category}</p>
                                        </div>
                                        <div className="all-cooking-time-container">
                                            <p className="all-recipe-cooking-time">
                                                <i className="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}
                                            </p>
                                        </div>
                                        <div className="all-rating-container">
                                            <p className="all-recipe-rating">
                                                <b><i className="fa-solid fa-star"></i></b> {recipe.averageRating && recipe.averageRating > 0 ? recipe.averageRating : 'NA'}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );

};

export default AllRecipes;