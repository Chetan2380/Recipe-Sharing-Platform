import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import "../Cuisines/styles/Punjabi.css"
import Footer from '../Footer/Footer';

const Punjabi = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[cuisine,setCuisine]=useState("Punjabi");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetPunjabiRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/cuisine/punjabi-recipes",{ params: { cuisine: cuisine } })
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
        GetPunjabiRecipe();
      }, []);

      return (
        <div>
            <div className="punjabi-page">
                <head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
                </head>
                <h1>All Punjabi Recipes</h1>
                {loading ? (
                    <div className="loader-container">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                    </div>
                ) : (
                    <div className="punjabi-grid">
                        {allRecipes.map((recipe) => (
                            <div
                                key={recipe._id}
                                className="punjabi-card"
                                onClick={() => router(`/single-recipe/${recipe._id}`)}
                            >
                                <img className="punjabi-image" src={recipe.image} alt="recipe" />
                                <div className="punjabi-details">
                                    <p className="punjabi-title"><b>{recipe.title}</b></p>
                                    <p className="home-recipe-category">{recipe.category}</p>
                                </div>
                                <div className="punjabi-cooking-time-container">
                                    <span><i className="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}</span>
                                </div>
                                <div className="punjabi-rating-container">
                                    <span className="punjabi-rating"><i className="fa-solid fa-star"></i>&nbsp;&nbsp;{recipe.averageRating ? recipe.averageRating : 'NA'}</span>
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

export default Punjabi