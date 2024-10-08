import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import toast from 'react-hot-toast';
import Api from '../../axiosconfig';
import "./CreateNewRecipe.css"
import Footer from '../Footer/Footer';

const CreateNewRecipe = () => {
    const { state } = useContext(AuthContext);
    const router=useNavigate();
    const[recipeData, setRecipeData]=useState({
        title: "",
        ingredients: "",
        instructions:"",
        cookingTime:"",
        category: "",
        cuisine: "",
        image: "",
    });
    const [errors, setErrors] = useState([]);
    const [disable, setDisable] = useState(true);
    console.log(recipeData,"recipeData");
    function handleChange(event){
        setRecipeData({ ...recipeData, [event.target.name]: event.target.value});
    }
    async function handleSubmit(e){
        e.preventDefault();
        try {
            if(recipeData.title && recipeData.ingredients && recipeData.instructions && recipeData.cookingTime && recipeData.category && recipeData.cuisine && recipeData.image){
                const response = await Api.post("/recipe/create-new-recipe" , {recipeData,userId : state?.user?.userId});
                if(response.data.success){
                    setRecipeData({
                        title: "",
                        ingredients: "",
                        instructions:"",
                        cookingTime:"",
                        category: "",
                        cuisine: "",
                        image: "",
                    });
                    router("/all-recipes");
                    toast.success(response.data.message);
                }
            }else{
                toast.error("All fields are mandatory.");
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    useEffect(() => {
        const errorsArray = [];
        if (!recipeData.title) {
          errorsArray.push("Title is required.");
        }
        if (!recipeData.ingredients) {
          errorsArray.push("Ingredients are required.");
        }
        if (!recipeData.instructions) {
          errorsArray.push("Instructions are required.");
        }
        if (!recipeData.cookingTime) {
          errorsArray.push("Cooking Time is required.");
        }if (!recipeData.category) {
          errorsArray.push("Category is required.");
        }if (!recipeData.cuisine) {
            errorsArray.push("Cuisine is required.");
        }if (!recipeData.image) {
            errorsArray.push("Image is required.");
        }
        setErrors(errorsArray);
        if (errorsArray.length == 0) {
          setDisable(false);
        } else {
          setDisable(true);
        }
      }, [recipeData]);

      return (
        <div>
        <div className="create-recipe-container">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </head>
            <form onSubmit={handleSubmit}>
                <h1>Share Your Recipe</h1>
                <label>Title:</label>
                <input type='text' name='title' onChange={handleChange} value={recipeData.title}/>

                <label>Ingredients:</label>
                <textarea name='ingredients' onChange={handleChange} value={recipeData.ingredients}></textarea>

                <label>Instructions:</label>
                <textarea name='instructions' onChange={handleChange} value={recipeData.instructions}></textarea>

                <label>Cooking Time:</label>
                <input type='text' name='cookingTime' onChange={handleChange} value={recipeData.cookingTime}/>

                <label>Category:</label>
                <select
                    name="category"
                    value={recipeData.category}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    <option value="Veg">Veg</option>
                    <option value="Non Veg">Non Veg</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Special Recipe">Special Recipes</option>
                    <option value="Healthy">Healthy</option>
                </select>

                <label>Cuisine:</label>
                <select
                    name="cuisine"
                    value={recipeData.cuisine}
                    onChange={handleChange}
                >
                    <option value="">Select Cuisine</option>
                    <option value="Maharashtrian">Maharashtrian</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Rajasthani">Rajasthani</option>
                    <option value="North East">North East</option>
                    <option value="South Indian">South Indian</option>
                </select>

                <label>Image URL:</label>
                <input type='text' name='image' onChange={handleChange} value={recipeData.image}/>

                
                <input type="submit" value="ADD RECIPE"/>
            </form>
        </div>
        <Footer />
        </div>
    )
}

export default CreateNewRecipe;