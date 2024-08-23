import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import Api from '../../axiosconfig';
import "./AllRecipe.css"
import Footer from '../Footer/Footer';

const AllRecipes = () => {
    const router=useNavigate();
    const[allRecipes,setAllRecipes]=useState([]);
    const [loading, setLoading] = useState(false);
    const{state}=useContext(AuthContext);

    console.log(allRecipes);

    async function GetRecipe(){
        setLoading(true);
        try{
            const response = await Api.get("/recipe/get-all-recipe")
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
        GetRecipe();
      }, []);

      useEffect(() => {
        if (state.searchResults.length > 0) {
            setAllRecipes(state.searchResults);
        } else {
            GetRecipe();
        }
    }, [state.searchResults]);


    return (
        <div id="main">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </head>
            <h1>All Recipes</h1>
            {loading ? (
                <div className="loading">
                    <h1>Loading....</h1>
                </div>
            ) : (
                <div className="recipes-grid">
                    {allRecipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="recipe-card"
                            onClick={() => router(`/single-recipe/${recipe._id}`)}
                        >
                            <img src={recipe.image} alt="recipe" className="recipe-image" />
                            <div className="recipe-details">
                                <h3 className="recipe-title">{recipe.title}</h3>
                                {/* <p className="recipe-time"><b>Cooking Time:</b> {recipe.cookingTime}</p> */}
                                <div className="rating-container">
                                    <p className="recipe-rating"><b><i class="fa-solid fa-star"></i></b> {recipe.averageRating && recipe.averageRating > 0 ? recipe.averageRating : 'NA'}</p>
                                </div>

                                <div className="cooking-time-container">
                                    
                                    <p className="recipe-cooking-time"><i class="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
}

export default AllRecipes;