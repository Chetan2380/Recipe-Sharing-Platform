import React, { useEffect, useState } from 'react'
import Api from '../../axiosconfig';
import { useNavigate } from 'react-router-dom';
import "../Categories/styles/Veg.css"
import Footer from '../Footer/Footer';

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
        <div>
        <div className="veg-recipes-page">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </head>
            <h1>Vegetarian Recipes</h1>
            <div className="veg-recipes-grid">
                {allRecipes.map(recipe => (
                    <div
                        key={recipe._id}
                        className="veg-recipe-card"
                        onClick={() => router(`/single-recipe/${recipe._id}`)}
                    >
                        <img src={recipe.image} alt={recipe.title} className="veg-recipe-image" />
                        <div className="veg-recipe-details">
                            <h3 className="veg-recipe-title">{recipe.title}</h3>
                            <div className="veg-cooking-time-container">
                                <p className="veg-recipe-cooking-time"><i class="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}</p>
                            </div>
                            <div className="veg-rating-container">
                                <p className="veg-recipe-rating"><i class="fa-solid fa-star"></i>&nbsp;&nbsp;{recipe.averageRating ? recipe.averageRating : 'NA'}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
        </div>
    );
}

export default VegRecipes