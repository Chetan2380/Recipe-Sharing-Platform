import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import "../Cuisines/styles/NorthEast.css"

const NorthEast = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[cuisine,setCuisine]=useState("North East");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetNorthEastRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/cuisine/north-east-recipes",{ params: { cuisine: cuisine } })
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
        GetNorthEastRecipe();
      }, []);

      return (
        <div className="north-east-page">
            <h1>All Recipes</h1>
            <div className="north-east-grid">
                {loading ? (
                    <div className="north-east-loading">Loading....</div>
                ) : (
                    allRecipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="north-east-card"
                            onClick={() => router(`/single-recipe/${recipe._id}`)}
                        >
                            <img
                                className="north-east-image"
                                src={recipe.image}
                                alt="recipe"
                            />
                            <div className="north-east-details">
                                <p className="north-east-title"><b>Title</b>: {recipe.title}</p>
                                <p><b>Ingredients</b>: {recipe.ingredients}</p>
                                <p><b>Instructions</b>: {recipe.instructions}</p>
                                <p><b>Cooking Time</b>: {recipe.cookingTime}</p>
                                <p><b>Category</b>: {recipe.category}</p>
                                <p><b>Cuisine</b>: {recipe.cuisine}</p>
                            </div>
                            <div className="north-east-cooking-time-container">
                                <span>Cooking Time</span>
                            </div>
                            <div className="north-east-rating-container">
                                <span className="north-east-rating">Rating</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default NorthEast