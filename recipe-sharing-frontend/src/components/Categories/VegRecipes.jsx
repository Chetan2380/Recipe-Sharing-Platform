import React, { useEffect, useState } from 'react'
import Api from '../../axiosconfig';
import { useNavigate } from 'react-router-dom';
import "../Categories/styles/Veg.css"

const VegRecipes = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[category,setCategory]=useState("Veg");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetVegRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/recipe-category/veg-recipes",{ params: { category: category } })
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
        GetVegRecipe();
      }, []);

      return (
        <div className="veg-recipes-page">
            <div className="veg-recipes-header">
                <h1>All Veg Recipes</h1>
            </div>
            {loading ? (
                <div className="veg-recipes-loader">Loading....</div>
            ) : (
                <div className="veg-recipes-list">
                    {allRecipes.map((recipe) => (
                        <div key={recipe._id} className="veg-recipe-card" onClick={() => router(`/single-recipe/${recipe._id}`)}>
                            <img src={recipe.image} alt="recipe" />
                            <div className="veg-recipe-card-info">
                                <h3 className="veg-recipe-card-title">{recipe.title}</h3>
                                <div className="veg-recipe-card-details">
                                    <p><b>Ingredients</b>: {recipe.ingredients}</p>
                                    <p><b>Instructions</b>: {recipe.instructions}</p>
                                    <p><b>Cooking Time</b>: {recipe.cookingTime}</p>
                                    <p><b>Category</b>: {recipe.category}</p>
                                    <p><b>Cuisine</b>: {recipe.cuisine}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default VegRecipes