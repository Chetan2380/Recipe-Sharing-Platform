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

    const userNameInitial = state?.user?.name?.charAt(0).toUpperCase();

    return (
        <div>
        <div className="user-profile-container">
            <div className="user-info-container">
                <div className="user-box">
                    <div className="profile-letter">{userNameInitial}</div>
                    <h1 className="user-name">{state?.user?.name}</h1>
                    <p className="user-email">{state?.user?.email}</p>
                </div>
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
                                    <div className="recipe-details">
                                        <p className="recipe-title">{recipe.title}</p>
                                        {/* <div className="cooking-time-container">
                                            <i class="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}
                                        </div>
                                        <div className="rating-container">
                                            <i class="fa-solid fa-star"></i>&nbsp;&nbsp;{recipe.averageRating && recipe.averageRating > 0 ? recipe.averageRating : 'NA'}
                                        </div> */}
                                    </div>
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
                                    <div className="recipe-details">
                                        <p className="recipe-title">{review.recipeId.title}</p>
                                        {/* <div className="cooking-time-container">
                                            <i class="fa-regular fa-clock"></i>&nbsp;&nbsp;{review.recipeId.cookingTime}
                                        </div>
                                        <div className="rating-container">
                                            <i class="fa-solid fa-star"></i>&nbsp;&nbsp;{review.recipeId.averageRating && review.recipeId.averageRating > 0 ? review.recipeId.averageRating : 'NA'}
                                        </div> */}
                                    </div>
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
