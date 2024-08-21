import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import Api from '../axiosconfig';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { state } = useContext(AuthContext);
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const [loading, setLoading] = useState(false);
    console.log(allRecipes);

    async function GetRecipe(){
        setLoading(true);
        try{
            const response = await Api.post("/recipe/your-added-recipes",{userId: state?.user?.userId})
            console.log(state?.user?.userId)
            if(response.data.success){
                setLoading(false);
                setAllRecipes(response.data.recipes);
            } 
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(state){
            GetRecipe()
        }
        },[state]);

    return(
        <div id="main">
            <h1>{state?.user?.name}</h1>
            <p>{state?.user?.email}</p>
            <h1>Your Added Recipes</h1>
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

export default UserProfile