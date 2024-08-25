import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import "../Cuisines/styles/Gujarati.css"
import Footer from '../Footer/Footer';

const Gujarati = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[cuisine,setCuisine]=useState("Gujarati");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetGujaratiRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/cuisine/gujarati-recipes",{ params: { cuisine: cuisine } })
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
        GetGujaratiRecipe();
      }, []);

      return (
        <div>
        <div className="gujarati-page">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </head>
            <h1>All Gujarati Recipes</h1>
            <div className="gujarati-grid">
                {loading ? (
                    <div className="gujarati-loading">Loading....</div>
                ) : (
                    allRecipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="gujarati-card"
                            onClick={() => router(`/single-recipe/${recipe._id}`)}
                        >
                            <img
                                className="gujarati-image"
                                src={recipe.image}
                                alt="recipe"
                            />
                            <div className="gujarati-details">
                                <p className="gujarati-title"><b>{recipe.title}</b></p>
                                <p className="home-recipe-category">{recipe.category}</p>
                            </div>
                            <div className="gujarati-cooking-time-container">
                                <span><i class="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}</span>
                            </div>
                            <div className="gujarati-rating-container">
                                <span className="gujarati-rating"><i class="fa-solid fa-star"></i>&nbsp;&nbsp;{recipe.averageRating ? recipe.averageRating : 'NA'}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        <Footer />
        </div>
    );
}

export default Gujarati