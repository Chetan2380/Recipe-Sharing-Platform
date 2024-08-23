import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import Api from '../../axiosconfig';
import { useNavigate } from 'react-router-dom';
import "./UserProfile.css"
import Footer from '../Footer/Footer';

const UserProfile = () => {
    const { state } = useContext(AuthContext);
    const router = useNavigate();
    const [allRecipes, setAllRecipes] = useState([]);
    const [reviewedRecipes, setReviewedRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    async function GetReviewedRecipe() {
        setLoading(true);
        try {
            const response = await Api.post('/recipe/your-reviewed-recipes', { userId: state?.user?.userId });
            if (response.data.success) {
                setLoading(false);
                setReviewedRecipes(response.data.reviews);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function GetRecipe() {
        setLoading(true);
        try {
            const response = await Api.post('/recipe/your-added-recipes', { userId: state?.user?.userId });
            if (response.data.success) {
                setLoading(false);
                setAllRecipes(response.data.recipes);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (state) {
            GetRecipe();
            GetReviewedRecipe();
        }
    }, [state]);

    return (
        <div>
        <div className="user-profile-container">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </head>
            <div className="user-info-container user-box">
                <h1 className="user-name">{state?.user?.name}</h1>
                <p className="user-email">{state?.user?.email}</p>
            </div>
            <div className="user-recipes-reviews">
                <div className="user-recipes-container user-box">
                    <h2 className="section-title">Recipes Shared By You</h2>
                    {loading ? (
                        <div className="loading-indicator"><h1>Loading....</h1></div>
                    ) : (
                        <div className="recipe-list">
                            {allRecipes.map((recipe) => (
                                <div
                                    className="recipe-item"
                                    key={recipe._id}
                                    onClick={() => router(`/single-recipe/${recipe._id}`)}
                                >
                                    <img src={recipe.image} alt="recipe" className="recipe-image" />
                                    <p><b>{recipe.title}</b></p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="user-reviews-container user-box">
                    <h2 className="section-title">Recipes Reviewed By You</h2>
                    {loading ? (
                        <div className="loading-indicator"><h1>Loading....</h1></div>
                    ) : (
                        <div className="recipe-list">
                            {reviewedRecipes.map((review) => (
                                <div
                                    className="recipe-item"
                                    key={review.recipeId._id}
                                    onClick={() => router(`/single-recipe/${review.recipeId._id}`)}
                                >
                                    <img src={review.recipeId.image} alt="recipe" className="recipe-image" />
                                    <p><b>{review.recipeId.title}</b></p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
}

export default UserProfile