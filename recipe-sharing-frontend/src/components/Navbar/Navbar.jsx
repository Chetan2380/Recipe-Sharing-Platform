import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import toast from 'react-hot-toast';
import Api from '../../axiosconfig';
import "../Navbar/Navbar.css"
import logo from "../Navbar/logo-transparent-png.png"

const Navbar = () => {
    const router = useNavigate();
    const { state, dispatch } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [cuisinesOpen, setCuisinesOpen] = useState(false);

    const handleLogout = async () => {
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
    };

    const handleSearch = async () => {
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
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleCategoriesMenu = () => {
        setCategoriesOpen(!categoriesOpen);
        if (cuisinesOpen) setCuisinesOpen(false); 
    };

    const toggleCuisinesMenu = () => {
        setCuisinesOpen(!cuisinesOpen);
        if (categoriesOpen) setCategoriesOpen(false);
    };

    return (
        <div>
            <div className="navbar-container">
                <div className="navbar-content">
                    <div className="logo">
                        <img src={logo} alt="Navbar Logo" />
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
                        <div onClick={() => router("/")}>Home</div>
                        <div onClick={() => router("/all-recipes")}>Recipes</div>
                        {state?.user?.role === "user" && (<div onClick={() => router("/create-new-recipe")}>Share Recipe</div>)}
                        <div className="dropdown">
                            <div className="dropdown-header" onClick={toggleCategoriesMenu}>Categories</div>
                            <div className={`dropdown-menu ${categoriesOpen ? 'show' : ''}`}>
                                <div onClick={() => router("/veg-recipes")}>Veg</div>
                                <div onClick={() => router("/non-veg-recipes")}>Non Veg</div>
                                <div onClick={() => router("/vegan-recipes")}>Vegan</div>
                                <div onClick={() => router("/special-recipes")}>Special Recipes</div>
                                <div onClick={() => router("/healthy-recipes")}>Healthy</div>
                            </div>
                        </div>
                        <div className="dropdown">
                            <div className="dropdown-header" onClick={toggleCuisinesMenu}>Cuisines</div>
                            <div className={`dropdown-menu ${cuisinesOpen ? 'show' : ''}`}>
                                <div onClick={() => router("/maharashtrian-recipes")}>Maharashtrian</div>
                                <div onClick={() => router("/gujarati-recipes")}>Gujarati</div>
                                <div onClick={() => router("/punjabi-recipes")}>Punjabi</div>
                                <div onClick={() => router("/rajasthani-recipes")}>Rajasthani</div>
                                <div onClick={() => router("/south-indian-recipes")}>South Indian</div>
                                <div onClick={() => router("/north-east-recipes")}>North East</div>
                            </div>
                        </div>
                        <div onClick={() => router("/user-page")}>Community</div>
                        {!state?.user ? (
                            <div onClick={() => router("/login")}>Login</div>
                        ) : (
                            <div className="dropdown">
                                <div className="dropdown-header">Profile</div>
                                <div className="dropdown-menu">
                                    <div onClick={() => router("/user-profile")}>Your Profile</div>
                                    <div onClick={() => router("/edit-profile")}>Edit Profile</div>
                                    <div onClick={handleLogout}>Logout</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="nav-icon" onClick={toggleSidebar}>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </div>
            </div>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="close-btn" onClick={toggleSidebar}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className="sidebar-menu">
                    <div onClick={() => router("/")}>Home</div>
                    <div onClick={() => router("/all-recipes")}>Recipes</div>
                    {state?.user?.role === "user" && (<div onClick={() => router("/create-new-recipe")}>Share Recipe</div>)}
                    <div className="dropdown">
                        <div className="dropdown-header" onClick={toggleCategoriesMenu}>Categories</div>
                        <div className={`dropdown-menu ${categoriesOpen ? 'show' : ''}`}>
                            <div onClick={() => router("/veg-recipes")}>Veg</div>
                            <div onClick={() => router("/non-veg-recipes")}>Non Veg</div>
                            <div onClick={() => router("/vegan-recipes")}>Vegan</div>
                            <div onClick={() => router("/special-recipes")}>Special Recipes</div>
                            <div onClick={() => router("/healthy-recipes")}>Healthy</div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <div className="dropdown-header" onClick={toggleCuisinesMenu}>Cuisines</div>
                        <div className={`dropdown-menu ${cuisinesOpen ? 'show' : ''}`}>
                            <div onClick={() => router("/maharashtrian-recipes")}>Maharashtrian</div>
                            <div onClick={() => router("/gujarati-recipes")}>Gujarati</div>
                            <div onClick={() => router("/punjabi-recipes")}>Punjabi</div>
                            <div onClick={() => router("/rajasthani-recipes")}>Rajasthani</div>
                            <div onClick={() => router("/south-indian-recipes")}>South Indian</div>
                            <div onClick={() => router("/north-east-recipes")}>North East</div>
                        </div>
                    </div>
                    <div onClick={() => router("/user-page")}>Community</div>
                    {!state?.user ? (
                        <div onClick={() => router("/login")}>Login</div>
                    ) : (
                        <div className="dropdown">
                            <div className="dropdown-header">Profile</div>
                            <div className="dropdown-menu">
                                <div onClick={() => router("/user-profile")}>Your Profile</div>
                                <div onClick={() => router("/edit-profile")}>Edit Profile</div>
                                <div onClick={handleLogout}>Logout</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
