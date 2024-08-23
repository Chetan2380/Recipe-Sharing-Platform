import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import "../Categories/styles/healthy.css"

const HealthyRecipes = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[category,setCategory]=useState("Healthy");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetHealthyRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/recipe-category/healthy-recipes",{ params: { category: category } })
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
        GetHealthyRecipe();
      }, []);

      return (
        <div className="healthy-recipes-page">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </head>
            <h1>Healthy Recipes</h1>
            <div className="healthy-recipes-grid">
                {allRecipes.map(recipe => (
                    <div
                        key={recipe._id}
                        className="healthy-recipe-card"
                        onClick={() => router(`/single-recipe/${recipe._id}`)}
                    >
                        <img src={recipe.image} alt={recipe.title} className="healthy-recipe-image" />
                        <div className="healthy-recipe-details">
                            <h3 className="healthy-recipe-title">{recipe.title}</h3>
                            <div className="healthy-cooking-time-container">
                                <p className="healthy-recipe-cooking-time"><i class="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}</p>
                            </div>
                            <div className="healthy-rating-container">
                                <p className="healthy-recipe-rating"><i class="fa-solid fa-star"></i>&nbsp;&nbsp;{recipe.averageRating ? recipe.averageRating : 'NA'}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HealthyRecipes