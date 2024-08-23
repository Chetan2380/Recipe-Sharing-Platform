import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import "../Cuisines/styles/Gujarati.css"

const Gujarati = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[cuisine,setCuisine]=useState("Gujarati");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetGujaratiRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/cuisine/gujarati-recipes",{ params: { cuisine: cuisine } })
            if(response.data.success){
                setLoading(false);
                setAllRecipes(response.data.recipes);
            } 
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        GetGujaratiRecipe();
      }, []);

      return (
        <div className="gujarati-page">
            <h1>All Gujarati Recipes</h1>
            <div className="gujarati-grid">
                {loading ? (
                    <div className="gujarati-loading">Loading....</div>
                ) : (
                    allRecipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="gujarati-card"
                            onClick={() => router(`/single-recipe/${recipe._id}`)}
                        >
                            <img
                                className="gujarati-image"
                                src={recipe.image}
                                alt="recipe"
                            />
                            <div className="gujarati-details">
                                <p className="gujarati-title"><b>Title</b>: {recipe.title}</p>
                                <p><b>Ingredients</b>: {recipe.ingredients}</p>
                                <p><b>Instructions</b>: {recipe.instructions}</p>
                                <p><b>Cooking Time</b>: {recipe.cookingTime}</p>
                                <p><b>Category</b>: {recipe.category}</p>
                                <p><b>Cuisine</b>: {recipe.cuisine}</p>
                            </div>
                            <div className="gujarati-cooking-time-container">
                                <span>Cooking Time</span>
                            </div>
                            <div className="gujarati-rating-container">
                                <span className="gujarati-rating">Rating</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Gujarati