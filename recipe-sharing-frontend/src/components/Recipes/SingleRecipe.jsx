import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import Api from '../../axiosconfig';

const SingleRecipe = () => {
    const { state } = useContext(AuthContext);
    const {id}=useParams();
    const[singlerecipe,setSinglerecipe]=useState([]);
    const [loading, setLoading] = useState(false);
    console.log(singlerecipe);
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

    useEffect(()=>{
        if(id){
            GetSingleRecipe();
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
                            </div>
                        </div>
                    ))}
                </div>
                )} 
        </div>
    );
}

export default SingleRecipe;