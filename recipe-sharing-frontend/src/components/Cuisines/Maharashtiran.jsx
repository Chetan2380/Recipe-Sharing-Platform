import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import "../Cuisines/styles/Maharashtrian.css"
import Footer from '../Footer/Footer';

const Maharashtiran = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[cuisine,setCuisine]=useState("Maharashtrian");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetMaharashtrianRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/cuisine/maharashtrian-recipes",{ params: { cuisine: cuisine } })
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
        GetMaharashtrianRecipe();
      }, []);

      return (
        <div>
            <div className="maharashtiran-page">
                <head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
                </head>
                <h1>All Maharashtrian Recipes</h1>
                {loading ? (
                    <div className="loader-container">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                    </div>
                ) : (
                    <div className="maharashtiran-grid">
                        {allRecipes.map((recipe) => (
                            <div
                                key={recipe._id}
                                className="maharashtiran-card"
                                onClick={() => router(`/single-recipe/${recipe._id}`)}
                            >
                                <img className="maharashtiran-image" src={recipe.image} alt="recipe" />
                                <div className="maharashtiran-details">
                                    <p className="maharashtiran-title"><b>{recipe.title}</b></p>
                                    <p className="home-recipe-category">{recipe.category}</p>
                                </div>
                                <div className="maharashtiran-cooking-time-container">
                                    <span><i className="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}</span>
                                </div>
                                <div className="maharashtiran-rating-container">
                                    <span className="maharashtiran-rating"><i className="fa-solid fa-star"></i>&nbsp;&nbsp;{recipe.averageRating ? recipe.averageRating : 'NA'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );

}

export default Maharashtiran