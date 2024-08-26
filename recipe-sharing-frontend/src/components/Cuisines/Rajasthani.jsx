import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import "../Cuisines/styles/Rajasthani.css"
import Footer from '../Footer/Footer';

const Rajasthani = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[cuisine,setCuisine]=useState("Rajasthani");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetRajasthaniRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/cuisine/rajasthani-recipes",{ params: { cuisine: cuisine } })
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
        GetRajasthaniRecipe();
      }, []);

      return (
        <div>
            <div className="rajasthani-page">
                <head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
                </head>
                <h1>All Rajasthani Recipes</h1>
                {loading ? (
                    <div className="loader-container">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                    </div>
                ) : (
                    <div className="rajasthani-grid">
                        {allRecipes.map((recipe) => (
                            <div
                                key={recipe._id}
                                className="rajasthani-card"
                                onClick={() => router(`/single-recipe/${recipe._id}`)}
                            >
                                <img className="rajasthani-image" src={recipe.image} alt="recipe" />
                                <div className="rajasthani-details">
                                    <p className="rajasthani-title"><b>{recipe.title}</b></p>
                                    <p className="home-recipe-category">{recipe.category}</p>
                                </div>
                                <div className="rajasthani-cooking-time-container">
                                    <span><i className="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}</span>
                                </div>
                                <div className="rajasthani-rating-container">
                                    <span className="rajasthani-rating"><i className="fa-solid fa-star"></i>&nbsp;&nbsp;{recipe.averageRating ? recipe.averageRating : 'NA'}</span>
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

export default Rajasthani