import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import toast from 'react-hot-toast';
import Api from '../../axiosconfig';

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
          errorsArray.push("Ingredients is required.");
        }
        if (!recipeData.instructions) {
          errorsArray.push("Instructions is required.");
        }
        if (!recipeData.cookingTime) {
          errorsArray.push("Cooking Time is required.");
        }
        if (!recipeData.category) {
          errorsArray.push("Category is required.");
        }
        if (!recipeData.cuisine) {
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
      
        <form onSubmit={handleSubmit}>
            <h1>Create New Recipe</h1>
            <label>Title:</label><br/>
            <input type='text' name='title' onChange={handleChange} value={recipeData.title}/><br/>
            <label>Ingredients:</label><br/>
            <textarea name='ingredients' onChange={handleChange} value={recipeData.ingredients}></textarea><br/>
            <label>Instructions:</label><br/>
            <textarea name='instructions' onChange={handleChange} value={recipeData.instructions}></textarea><br/>
            <label>Cooking Time:</label><br/>
            <input type='text' name='cookingTime' onChange={handleChange} value={recipeData.cookingTime}/><br/>
            <label>Category:</label><br/>
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
            </select><br/>
            
            {/* <input type='text' name='category' onChange={handleChange} value={recipeData.category}/><br/> */}
            <label>Cuisine:</label><br/>
            <input type='text' name='cuisine' onChange={handleChange} value={recipeData.cuisine}/><br/>
            <label>Image URL:</label><br/>
            <input type='text' name='image' onChange={handleChange} value={recipeData.image}/><br/>
            {errors.length > 0 && (
          <div>
            {errors.map((error, i) => (
              <p key={i}>{error}*</p>
            ))}
          </div>
        )}
            <input type="submit" value="ADD RECIPE" />
        </form>
        
    </div>
  )
}

export default CreateNewRecipe;