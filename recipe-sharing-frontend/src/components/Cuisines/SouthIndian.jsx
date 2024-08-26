import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import "../Cuisines/styles/SouthIndian.css"
import Footer from '../Footer/Footer';

const SouthIndian = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[cuisine,setCuisine]=useState("South Indian");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetSouthIndianRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/cuisine/south-indian-recipes",{ params: { cuisine: cuisine } })
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
        GetSouthIndianRecipe();
      }, []);

      return (
        <div>
            <div className="south-indian-page">
                <head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
                </head>
                <h1>All South Indian Recipes</h1>
                {loading ? (
                    <div className="loader-container">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                    </div>
                ) : (
                    <div className="south-indian-grid">
                        {allRecipes.map((recipe) => (
                            <div
                                key={recipe._id}
                                className="south-indian-card"
                                onClick={() => router(`/single-recipe/${recipe._id}`)}
                            >
                                <img className="south-indian-image" src={recipe.image} alt="recipe" />
                                <div className="south-indian-details">
                                    <p className="south-indian-title"><b>{recipe.title}</b></p>
                                    <p className="home-recipe-category">{recipe.category}</p>
                                </div>
                                <div className="south-indian-cooking-time-container">
                                    <span><i className="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}</span>
                                </div>
                                <div className="south-indian-rating-container">
                                    <span className="south-indian-rating"><i className="fa-solid fa-star"></i>&nbsp;&nbsp;{recipe.averageRating ? recipe.averageRating : 'NA'}</span>
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

export default SouthIndian