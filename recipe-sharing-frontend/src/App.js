import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register_Login/Register';
import Login from './components/Register_Login/Login';
import Navbar from './components/Navbar/Navbar';
import { useContext } from 'react';
import { AuthContext } from './context/auth.context';
import CreateNewRecipe from './components/Recipes/CreateNewRecipe';
import AllRecipes from './components/Recipes/AllRecipes';
import SingleRecipe from './components/Recipes/SingleRecipe';
import UserProfile from './components/UserProfile';
import VegRecipes from './components/Categories/VegRecipes';
import NonVegRecipes from './components/Categories/NonVegRecipes';
import Vegan from './components/Categories/Vegan';
import SpecialRecipes from './components/Categories/SpecialRecipes';
import HealthyRecipes from './components/Categories/HealthyRecipes';
import Maharashtiran from './components/Cuisines/Maharashtiran';
import Gujarati from './components/Cuisines/Gujarati';
import Punjabi from './components/Cuisines/Punjabi';
import Rajasthani from './components/Cuisines/Rajasthani';
import SouthIndian from './components/Cuisines/SouthIndian';
import NorthEast from './components/Cuisines/NorthEast';

function App() {
  const { state, dispatch } = useContext(AuthContext);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/create-new-recipe" element={<CreateNewRecipe/>}/>
        <Route path="/all-recipes" element={<AllRecipes/>}/>
        <Route path="/single-recipe/:id" element={<SingleRecipe/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
        <Route path="/veg-recipes" element={<VegRecipes/>}/>
        <Route path="/non-veg-recipes" element={<NonVegRecipes/>}/>
        <Route path="/vegan-recipes" element={<Vegan/>}/>
        <Route path="/special-recipes" element={<SpecialRecipes/>}/>
        <Route path="/healthy-recipes" element={<HealthyRecipes/>}/>
        <Route path="/maharashtrian-recipes" element={<Maharashtiran/>}/>
        <Route path="/maharashtrian-recipes" element={<Gujarati/>}/>
        <Route path="/maharashtrian-recipes" element={<Punjabi/>}/>
        <Route path="/maharashtrian-recipes" element={<Rajasthani/>}/>
        <Route path="/maharashtrian-recipes" element={<SouthIndian/>}/>
        <Route path="/maharashtrian-recipes" element={<NorthEast/>}/>
      </Routes>
    </div>
  );
}

export default App;
