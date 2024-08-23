import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import toast from 'react-hot-toast';
import Api from '../../axiosconfig';
import "../Navbar/Navbar.css"
import logo from "../Navbar/logo-png.png"

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

    return (
        <div className="navbar-container">
            <div className="navbar-content">
                <div className="logo">
                    <img src={logo} alt="Navbar Logo" />
                </div>
                {state?.user && (<div className="search-container">
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
                </div>)}
                <div className="nav-links">
                    <div onClick={() => router("/")}>Home</div>
                    <div onClick={() => router("/all-recipes")}>Recipes</div>
                    <div className="dropdown">
                        <div className="dropdown-header">Categories</div>
                        <div className="dropdown-menu">
                            <div onClick={() => router("/veg-recipes")}>Veg</div>
                            <div onClick={() => router("/non-veg-recipes")}>Non Veg</div>
                            <div onClick={() => router("/vegan-recipes")}>Vegan</div>
                            <div onClick={() => router("/special-recipes")}>Special Recipes</div>
                            <div onClick={() => router("/healthy-recipes")}>Healthy</div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <div className="dropdown-header">Cuisines</div>
                        <div className="dropdown-menu">
                            <div onClick={() => router("maharashtrian-recipes")}>Maharashtrian</div>
                            <div onClick={() => router("/gujarati-recipes")}>Gujarati</div>
                            <div onClick={() => router("/punjabi-recipes")}>Punjabi</div>
                            <div onClick={() => router("/rajasthanirecipes")}>Rajasthani</div>
                            <div onClick={() => router("/south-indian-recipes")}>South Indian</div>
                            <div onClick={() => router("/north-east-recipes")}>North East</div>
                        </div>
                    </div>
                    {state?.user?.role === "user" && (
                        <div onClick={() => router("/create-new-recipe")}>Add Recipe</div>
                    )}

                    {!state?.user ? (
                        <div>
                            {/* <div onClick={() => router("/register")}>Register</div> */}
                            <div onClick={() => router("/login")}>Login</div>
                        </div>
                    ) : (
                        <>
                            <div className="nav-icon dropdown">
                                <i className="fa-solid fa-user"></i>
                                <div className="dropdown-menu">
                                    <div onClick={() => router("/user-profile")}>Your Profile</div>
                                    <div onClick={() => router("/edit-profile")}>Edit Profile</div>
                                    <div onClick={handleLogout}>Logout</div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;