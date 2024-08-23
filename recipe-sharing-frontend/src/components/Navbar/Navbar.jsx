import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import toast from 'react-hot-toast';
import Api from '../../axiosconfig';
import "../Navbar/Navbar.css"
import logo from "../Navbar/logo-png.png"

const Navbar = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState("");

    async function handleLogout() {
        try {
            const response = await Api.post("/auth/logout");
            if (response.data.success) {
                dispatch({ type: "LOGOUT" });
                navigate("/login");
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
                navigate("/all-recipes");
            } else {
                toast.error("Search failed.");
            }
        } catch (error) {
            toast.error("Failed to search.");
        }
    }

    return (
        <div className="navbar-container">
            <div className="navbar-content">
                <div className="logo">
                <img 
        src={logo} 
        alt="Navbar Logo" 
      />
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
                </div>
                <div className="nav-links">
                    <div onClick={() => navigate("/")}>Home</div>
                    <div onClick={() => navigate("/all-recipes")}>All Recipes</div>
                    {state?.user?.role === "user" && (
                        <div onClick={() => navigate("/create-new-recipe")}>Add Recipe</div>
                    )}
                    {!state?.user ? (
                        <>
                            <div onClick={() => navigate("/register")}>Register</div>
                            <div onClick={() => navigate("/login")}>Login</div>
                        </>
                    ) : (
                        <>
                            <div onClick={() => navigate("/user-profile")}>User Profile</div>
                            <div onClick={handleLogout}>Logout</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;