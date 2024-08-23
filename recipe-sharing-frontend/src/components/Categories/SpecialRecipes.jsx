import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import "../Categories/styles/specialrecipe.css"
import Footer from '../Footer/Footer';

const SpecialRecipes = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[category,setCategory]=useState("Special Recipe");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetSpecialRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/recipe-category/special-recipes",{ params: { category: category } })
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
        GetSpecialRecipe();
      }, []);

      return (
        <div>
        <div className="special-recipes-page">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </head>
            <h1>Special Recipes</h1>
            <div className="special-recipes-grid">
                {allRecipes.map(recipe => (
                    <div
                        key={recipe._id}
                        className="special-recipe-card"
                        onClick={() => router(`/single-recipe/${recipe._id}`)}
                    >
                        <img src={recipe.image} alt={recipe.title} className="special-recipe-image" />
                        <div className="special-recipe-details">
                            <h3 className="special-recipe-title">{recipe.title}</h3>
                            <div className="special-cooking-time-container">
                                <p className="special-recipe-cooking-time"><i class="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}</p>
                            </div>
                            <div className="special-rating-container">
                                <p className="special-recipe-rating"><i class="fa-solid fa-star"></i>&nbsp;&nbsp;{recipe.averageRating ? recipe.averageRating : 'NA'}</p>
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

export default SpecialRecipes