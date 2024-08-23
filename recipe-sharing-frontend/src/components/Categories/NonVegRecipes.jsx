import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import "../Categories/styles/Nonveg.css"

const NonVegRecipes = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[category,setCategory]=useState("Non Veg");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetNonVegRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/recipe-category/non-veg-recipes",{ params: { category: category } })
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
        GetNonVegRecipe();
      }, []);

    return(
        <div id="main">
            <h1>All Recipes</h1>
            
            <div style={{width:"100%",marginTop:"20px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            </div>
                {loading?(<div>
                    <h1>Loading....</h1>                    
                </div>):(
                    <div id="allrecipesshow">
                    {allRecipes.map((recipe)=>(
                        <div id="recipeshow" onClick={()=>router(`/single-recipe/${recipe._id}`)}>
                            <img src={recipe.image} alt="recipe"/>
                            <p><b>Title</b>: {recipe.title}</p>
                            <p><b>Ingrediets</b>: {recipe.ingredients}</p>
                            <p><b>Instructions</b>: ₹{recipe.instructions}</p>
                            <p><b>Cooking Time</b>: {recipe.cookingTime}</p>
                            <p><b>Category</b>: {recipe.category}</p>
                            <p><b>Cuisine</b>: {recipe.cuisine}</p>
                        </div>
                    ))}
                </div>
                )} 
        </div>
    );
}

export default NonVegRecipes