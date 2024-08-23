import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import "../Cuisines/styles/Rajasthani.css"

const Rajasthani = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[cuisine,setCuisine]=useState("Rajasthani");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetRajasthaniRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/cuisine/rajasthani-recipes",{ params: { cuisine: cuisine } })
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
        GetRajasthaniRecipe();
      }, []);

      return (
        <div className="rajasthani-page">
            <h1>All Rajasthani Recipes</h1>
            <div className="rajasthani-grid">
                {loading ? (
                    <div className="rajasthani-loading">Loading....</div>
                ) : (
                    allRecipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="rajasthani-card"
                            onClick={() => router(`/single-recipe/${recipe._id}`)}
                        >
                            <img
                                className="rajasthani-image"
                                src={recipe.image}
                                alt="recipe"
                            />
                            <div className="rajasthani-details">
                                <p className="rajasthani-title"><b>Title</b>: {recipe.title}</p>
                                <p><b>Ingredients</b>: {recipe.ingredients}</p>
                                <p><b>Instructions</b>: {recipe.instructions}</p>
                                <p><b>Cooking Time</b>: {recipe.cookingTime}</p>
                                <p><b>Category</b>: {recipe.category}</p>
                                <p><b>Cuisine</b>: {recipe.cuisine}</p>
                            </div>
                            <div className="rajasthani-cooking-time-container">
                                <span>Cooking Time</span>
                            </div>
                            <div className="rajasthani-rating-container">
                                <span className="rajasthani-rating">Rating</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Rajasthani