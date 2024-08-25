    import React, { useEffect, useState } from 'react'
    import { useNavigate } from 'react-router-dom';
    import Api from '../../axiosconfig';
    import "../Categories/styles/Nonveg.css"
    import Footer from '../Footer/Footer';

    const NonVegRecipes = () => {
        const router=useNavigate();
        const[allRecipes,setAllRecipes]=useState([]);
        const[category,setCategory]=useState("Non Veg");
        const [loading, setLoading] = useState(false);

        console.log(allRecipes);

        async function GetNonVegRecipe(){
            setLoading(true);
            try{
                const response = await Api.get("/recipe-category/non-veg-recipes",{ params: { category: category } })
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
            GetNonVegRecipe();
        }, []);

        return (
            <div>
            <div className="non-veg-recipes-page">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </head>
                <h1>Non-Vegetarian Recipes</h1>
                <div className="non-veg-recipes-grid">
                    {allRecipes.map(recipe => (
                        <div
                            key={recipe._id}
                            className="non-veg-recipe-card"
                            onClick={() => router(`/single-recipe/${recipe._id}`)}
                        >
                            <img src={recipe.image} alt={recipe.title} className="non-veg-recipe-image" />
                            <div className="non-veg-recipe-details">
                                <h3 className="non-veg-recipe-title">{recipe.title}</h3>
                                <p className="home-recipe-cuisine">{recipe.cuisine}</p>
                                <div className="non-veg-cooking-time-container">
                                    <p className="non-veg-recipe-cooking-time"><i class="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}</p>
                                </div>
                                <div className="non-veg-rating-container">
                                    <p className="non-veg-recipe-rating"><i class="fa-solid fa-star"></i>&nbsp;&nbsp;{recipe.averageRating ? recipe.averageRating : 'NA'}</p>
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

    export default NonVegRecipes