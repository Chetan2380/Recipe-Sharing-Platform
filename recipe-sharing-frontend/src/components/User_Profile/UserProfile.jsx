import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import Api from '../../axiosconfig';
import { useNavigate } from 'react-router-dom';
import "./UserProfile.css"

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
        <div className="user-profile-container">
            <div className="user-info-container">
                <h1 className="user-name">{state?.user?.name}</h1>
                <p className="user-email">{state?.user?.email}</p>
            </div>
            <div className="user-recipes-reviews">
                <div className="user-recipes-container">
                    <h2 className="section-title">Your Added Recipes</h2>
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
                                    <p><b>Title</b>: {recipe.title}</p>
                                    <p><b>Average Rating</b>: {recipe.averageRating || 'N/A'}</p>
                                    <p><b>Cooking Time</b>: {recipe.cookingTime}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="user-reviews-container">
                    <h2 className="section-title">Your Reviewed Recipes</h2>
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
                                    <p><b>Title</b>: {review.recipeId.title}</p>
                                    <p><b>Average Rating</b>: {review.rating || 'N/A'}</p>
                                    <p><b>Cooking Time</b>: {review.recipeId.cookingTime}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile