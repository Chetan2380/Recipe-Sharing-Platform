import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../axiosconfig';
import "../Cuisines/styles/NorthEast.css"
import Footer from '../Footer/Footer';

const NorthEast = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const[cuisine,setCuisine]=useState("North East");
    const [loading, setLoading] = useState(false);

    console.log(allRecipes);

    async function GetNorthEastRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/cuisine/north-east-recipes",{ params: { cuisine: cuisine } })
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
        GetNorthEastRecipe();
      }, []);

      return (
        <div>
        <div className="north-east-page">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </head>
            <h1>All North-East Recipes</h1>
            <div className="north-east-grid">
                {loading ? (
                    <div className="north-east-loading">Loading....</div>
                ) : (
                    allRecipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="north-east-card"
                            onClick={() => router(`/single-recipe/${recipe._id}`)}
                        >
                            <img
                                className="north-east-image"
                                src={recipe.image}
                                alt="recipe"
                            />
                            <div className="north-east-details">
                                <p className="north-east-title"><b>{recipe.title}</b></p>
                                <p className="home-recipe-category">{recipe.category}</p>
                            </div>
                            <div className="north-east-cooking-time-container">
                                <span><i class="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}</span>
                            </div>
                            <div className="north-east-rating-container">
                            <span className="north-east-rating"><i class="fa-solid fa-star"></i>&nbsp;&nbsp;{recipe.averageRating ? recipe.averageRating : 'NA'}</span>
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

export default NorthEast