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
      </Routes>
    </div>
  );
}

export default App;
