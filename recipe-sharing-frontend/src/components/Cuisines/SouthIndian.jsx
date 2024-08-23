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
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </head>
            <h1>All South-Indian Recipes</h1>
            <div className="south-indian-grid">
                {loading ? (
                    <div className="south-indian-loading">Loading....</div>
                ) : (
                    allRecipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="south-indian-card"
                            onClick={() => router(`/single-recipe/${recipe._id}`)}
                        >
                            <img
                                className="south-indian-image"
                                src={recipe.image}
                                alt="recipe"
                            />
                            <div className="south-indian-details">
                                <p className="south-indian-title"><b>Title</b>: {recipe.title}</p>
                                <p><b>Ingredients</b>: {recipe.ingredients}</p>
                                <p><b>Instructions</b>: {recipe.instructions}</p>
                                <p><b>Cooking Time</b>: {recipe.cookingTime}</p>
                                <p><b>Category</b>: {recipe.category}</p>
                                <p><b>Cuisine</b>: {recipe.cuisine}</p>
                            </div>
                            <div className="south-indian-cooking-time-container">
                                <span>Cooking Time</span>
                            </div>
                            <div className="south-indian-rating-container">
                                <span className="south-indian-rating">Rating</span>
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

export default SouthIndian