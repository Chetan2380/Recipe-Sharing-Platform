import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import toast from 'react-hot-toast';
import Api from '../axiosconfig';
import "../styles/Navbar.css"

const Navbar = () => {
    const router = useNavigate();
    const { state, dispatch } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState("");

    async function handleLogout() {
        try {
            const response = await Api.post("/auth/logout");
            if (response.data.success) {
                dispatch({ type: "LOGOUT" });
                router("/login");
                toast.success(response.data.message);
            } else {
                toast.error("Logout failed.");
            }
        } catch (error) {
            toast.error("Failed to logout.");
        }
    }

    async function handleSearch() {
        try {
            const response = await Api.post("/recipe/search", { searchedWord: searchTerm });
            if (response.data.success) {
                dispatch({ type: "SET_SEARCH_RESULTS", payload: response.data.searchedrecipes });
                router("/all-recipes");
            } else {
                toast.error("Search failed.");
            }
        } catch (error) {
            toast.error("Failed to search.");
        }
    }

    return(
        <div className="parentdiv">
            <head>
                <title>PUMA.COM | Forever Faster</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

                <link rel="icon" href="https://static.vecteezy.com/system/resources/thumbnails/010/994/248/small/puma-logo-white-symbol-clothes-design-icon-abstract-football-illustration-with-black-background-free-vector.jpg" />
            </head>
        <div className="Navbar2">
                <div className="leftNavbar2">
                    <div id='leftnavbarimg'><img alt="icon" src="https://cdn.wallpapersafari.com/29/35/P6Uz7J.jpg"/></div>
                </div>
                <div className="rightNavbar2">
                    <div id="searchbtn">
                        <div id="search">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input placeholder="&nbsp;&nbsp;Search" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}/>
                        </div>
                    </div>
                    <div className="options">
                        <div onClick={()=>router("/")}>Home</div>
                        {state?.user?.role === "user" && (<div onClick={()=>router("/all-recipes")}>All Recipes</div>)}
                        {state?.user?.role === "user" && (<div onClick={()=>router("/create-new-recipe")}>Add Recipe</div>)}
                        {!state?.user && (<div onClick={()=>router("/admin-register")}><span>Register</span></div>)}
                        {state?.user && (<div onClick={()=>router("/user-profile")}><span>User Profile</span></div>)}
                        <div>{state?.user ? (<span onClick={handleLogout}>Logout</span>) : (<span onClick={()=>router("/login")}>Login</span>)}</div>                   </div>
                </div>
            </div>
    </div>
    )
}

export default Navbar;