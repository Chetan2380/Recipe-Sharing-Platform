import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import Api from '../../axiosconfig';

const SingleRecipe = () => {
    const { state } = useContext(AuthContext);
    const {id}=useParams();
    const[singlerecipe,setSinglerecipe]=useState([]);
    const [loading, setLoading] = useState(false);
    const[recipeReview,setRecipeReview]=useState([]);
    const [review, setReview] = useState(null);
    const [editFormData, setEditFormData] = useState({
        rating: "",
        review: "",
        reviewerId: ""
    });
    console.log(singlerecipe);
    console.log(recipeReview)
    const router = useNavigate();

    async function GetSingleRecipe(){
        setLoading(true);
        try{
            const response = await Api.post("/recipe/get-single-recipe",{recipeId: id});
            console.log(response)
            if(response.data.success){
                setLoading(false);
                setSinglerecipe([response.data.recipe]);
            } 
        }
        catch(error){
            console.log(error);
        }
    }

    async function GetRecipeReview(){
        setLoading(true);
        try{
            const response = await Api.post("/review/added-reviews",{recipeId: id});
            console.log(response)
            if(response.data.success){
                setLoading(false);
                setRecipeReview(response.data.reviews);
            } 
        }
        catch(error){
            console.log(error);
        }
    }

    async function handleSubmit() {
        try {
            const response = await Api.post(`/review/add-review/${review}`, {
                reviewData: editFormData
            });
            if (response.data.success) {
                GetRecipeReview();
                setReview(null);
                setEditFormData({
                    rating: "",
                    review: ""
                });
            }
        } catch (error) {
            console.log(error);
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


    useEffect(()=>{
        if(id){
            GetSingleRecipe();
            GetRecipeReview();
        }
       },[id]);

    return(
        <div id="sp-main">
                {loading?(<div>
                    <h1>Loading....</h1>                    
                </div>):(
                    <div id="allrecipesshow">
                    {singlerecipe.map((recipe)=>(
                        <div id="sb-recipeshow">
                            <div id="sp-image">
                                <img src={recipe.image}/>
                            </div>
                            <div id="sp-desctext">
                                <p><b>Title</b>: {recipe.title}</p>
                                <p><b>Ingredients</b>: ₹{recipe.ingredients}</p>
                                <p><b>Instructions</b>: ₹{recipe.instructions}</p>
                                <p><b>Cooking Time</b>: ₹{recipe.cookingTime}</p>
                                <p><b>Category</b>: {recipe.category}</p>
                                <p><b>Cuisine</b>: {recipe.cuisine}</p>
                                <button onClick={() => handleEdit(recipe)}>Please review recipe</button>
                            </div>
                        </div>
                    ))}
                    {recipeReview.map((review)=>(
                        <div id="sb-recipeshow">
                            <div id="sp-desctext">
                                <p><b>Rating</b>: {review.rating}</p>
                                <p><b>Ingredients</b>: {review.review}</p>
                                {/* <p><b>Username</b>: {review.reviewerId.name}</p> */}
                            </div>
                        </div>
                    ))}
                    {review && (
                <div id="editForm">
                    <h2>Edit Task</h2>
                    <input
                        type="number"
                        name="rating"
                        value={editFormData.rating}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="review"
                        value={editFormData.review}
                        onChange={handleInputChange}
                    />
                    
                    <button onClick={handleSubmit}>Update Task</button>
                    <button onClick={() => setReview(null)}>Cancel</button>
                </div>
            )}
                </div>
                )} 
        </div>
    );
}

export default SingleRecipe;