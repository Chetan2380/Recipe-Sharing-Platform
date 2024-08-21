import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import Navbar from './components/Navbar';
import { useContext } from 'react';
import { AuthContext } from './context/auth.context';
import CreateNewRecipe from './components/CreateNewRecipe';
import AllRecipes from './components/AllRecipes';
import SingleRecipe from './components/SingleRecipe';
import UserProfile from './components/UserProfile';

function App() {
  const { state, dispatch } = useContext(AuthContext);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin-register" element={<AdminRegister/>}/>
        <Route path="/admin-login" element={<AdminLogin/>}/>
        <Route path="/create-new-recipe" element={<CreateNewRecipe/>}/>
        <Route path="/all-recipes" element={<AllRecipes/>}/>
        <Route path="/single-recipe/:id" element={<SingleRecipe/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
      </Routes>
    </div>
  );
}

export default App;
