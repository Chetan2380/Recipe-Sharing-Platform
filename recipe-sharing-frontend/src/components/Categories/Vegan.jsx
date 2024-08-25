import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import "../Categories/styles/Vegan.css"
import Footer from '../Footer/Footer';

const Vegan = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[category,setCategory]=useState("Vegan");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetVeganRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/recipe-category/vegan-recipes",{ params: { category: category } })
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
        GetVeganRecipe();
      }, []);

      return (
        <div>
        <div className="vegan-recipes-page">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </head>
            <h1>Vegan Recipes</h1>
            <div className="vegan-recipes-grid">
                {allRecipes.map(recipe => (
                    <div
                        key={recipe._id}
                        className="vegan-recipe-card"
                        onClick={() => router(`/single-recipe/${recipe._id}`)}
                    >
                        <img src={recipe.image} alt={recipe.title} className="vegan-recipe-image" />
                        <div className="vegan-recipe-details">
                            <h3 className="vegan-recipe-title">{recipe.title}</h3>
                            <p className="home-recipe-cuisine">{recipe.cuisine}</p>
                            <div className="vegan-cooking-time-container">
                                <p className="vegan-recipe-cooking-time"><i class="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}</p>
                            </div>
                            <div className="vegan-rating-container">
                                <p className="vegan-recipe-rating"><i class="fa-solid fa-star"></i>&nbsp;&nbsp;{recipe.averageRating ? recipe.averageRating : 'NA'}</p>
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

export default Vegan