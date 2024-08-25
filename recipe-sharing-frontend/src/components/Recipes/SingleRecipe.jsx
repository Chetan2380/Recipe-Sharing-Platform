import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import Api from '../../axiosconfig';
import toast from 'react-hot-toast';
import "./SingleRecipe.css"
import Footer from '../Footer/Footer';

const SingleRecipe = () => {
    const { state } = useContext(AuthContext);
    const { id } = useParams();
    const [singlerecipe, setSinglerecipe] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recipeReview, setRecipeReview] = useState([]);
    const [review, setReview] = useState(null);
    const [editFormData, setEditFormData] = useState({
        rating: "",
        review: "",
        reviewerId: ""
    });
    const [showReviews, setShowReviews] = useState(false); 
    const router = useNavigate();

    async function GetSingleRecipe() {
        setLoading(true);
        try {
            const response = await Api.post("/recipe/get-single-recipe", { recipeId: id });
            if (response.data.success) {
                setLoading(false);
                setSinglerecipe([response.data.recipe]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function GetRecipeReview() {
        setLoading(true);
        try {
            const response = await Api.post("/review/added-reviews", { recipeId: id });
            if (response.data.success) {
                setLoading(false);
                setRecipeReview(response.data.reviews);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit() {
        try {
            const response = await Api.post(`/review/add-review/${review}`, {
                reviewData: editFormData, recipeId: id, userId: state?.user?.userId
            });
            if (response.data.success) {
                GetRecipeReview();
                setReview(null);
                setEditFormData({
                    rating: "",
                    review: ""
                });
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.error);
        }
    }

    function handleEdit(recipe) {
        setReview(recipe._id);
        setEditFormData({
            rating: recipe.rating,
            review: recipe.review
        });
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setEditFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function toggleReviews() {
        setShowReviews(prevShowReviews => !prevShowReviews);
    }

    useEffect(() => {
        if (id) {
            GetSingleRecipe();
            GetRecipeReview();
        }
    }, [id]);

    return (
        <div>
        <div id="sp-main">
            {loading ? (
                <div>
                    <h1>Loading....</h1>
                </div>
            ) : (
                <div id="allrecipesshow">
                    {singlerecipe.map((recipe) => (
                        <div id="sb-recipeshow" key={recipe._id}>
                            <div id="sp-title">
                                <h1>{recipe.title}</h1>
                            </div>
                            <div id="sp-image">
                                <img src={recipe.image} alt={recipe.title} />
                            </div>
                            <div id="sp-desctext">
                                <p><b>Ingredients</b>: <br/> {recipe.ingredients.split('\n').map((item, index) => (
                                    <span key={index}>• {item}<br/></span>
                                ))}</p>
                                <p><b>Instructions</b>: <br/> {recipe.instructions.split('\n').map((item, index) => (
                                    <span key={index}>• {item}<br/></span>
                                ))}</p>
                                <p><b>Cooking Time</b>: {recipe.cookingTime}</p>
                                <p><b>Category</b>: {recipe.category}</p>
                                <p><b>Cuisine</b>: {recipe.cuisine}</p>
                                <button onClick={() => handleEdit(recipe)} className='reviewbutton'>Please review recipe</button>
                                <button onClick={toggleReviews} className='showbutton'>
                                    {showReviews ? "Hide Reviews" : "Show Reviews"}
                                </button>
                            </div>
                        </div>
                    ))}
                    {showReviews && (
                        <div id="review-container">
                            {recipeReview.map((review) => (
                                <div className="review-item" key={review._id}>
                                    <p className="review-rating"><b>Rating:</b> {review.rating}</p>
                                    <p className="review-text"><b>Review:</b> {review.review}</p>
                                    <p className="review-username">
                                        <b>Username:</b> {review.userId ? review.userId.name : 'Anonymous'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                    {review && (
                        <div id="editForm">
                            <h2>Edit Review</h2>
                            <input
                                type="number"
                                name="rating"
                                value={editFormData.rating}
                                onChange={handleInputChange}
                                placeholder="Rating"
                                min="1" 
                                max="5"
                            />
                            <textarea
                                name="review"
                                value={editFormData.review}
                                onChange={handleInputChange}
                                placeholder="Review"
                            />
                            <button onClick={handleSubmit}>Update Review</button>
                            <button onClick={() => setReview(null)}>Cancel</button>
                        </div>
                    )}
                </div>
            )}
        </div>
        <Footer />
        </div>
    );
};

export default SingleRecipe;