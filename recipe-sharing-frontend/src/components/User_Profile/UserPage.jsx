import React, { useEffect, useState } from 'react';
import Api from '../../axiosconfig';
import { useNavigate } from 'react-router-dom';
import './UserPage.css'; 
import Footer from '../Footer/Footer';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userRecipes, setUserRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await Api.get('/auth/users'); 
                if (response.data.success) {
                    setUsers(response.data.users);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (selectedUserId) {
            const fetchUserRecipes = async () => {
                setLoading(true);
                try {
                    const response = await Api.post('/recipe/your-added-recipes', { userId: selectedUserId });
                    if (response.data.success) {
                        setUserRecipes(response.data.recipes);
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUserRecipes();
        }
    }, [selectedUserId]);

    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
        router(`/user-page/${userId}`);
    };

    return (
        <div>
            <div className="user-page-container">
                <div className="user-page-welcome-container">
                    <h1>Welcome to Our Community!</h1>
                    <p>Explore recipes shared by our users. Click on a username to view their recipes.</p>
                </div>
                <div className="user-page-content-container">
                    <div className="user-page-list-container">
                        <h2>All Users</h2>
                        {loading ? (
                            <div className="loader-container">
                                <i className="fa-solid fa-spinner fa-spin"></i>
                            </div>
                        ) : (
                            <div className="user-page-list">
                                {users.map((user) => (
                                    <div
                                        key={user._id}
                                        onClick={() => handleUserClick(user._id)}
                                        className={`user-page-list-item ${user._id === selectedUserId ? 'selected' : ''}`}
                                    >
                                        {user.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="user-page-recipes-container">
                        <h2>Recipes Added by {selectedUserId ? users.find(user => user._id === selectedUserId)?.name : 'Selected User'}</h2>
                        {loading ? (
                            <div className="loader-container">
                                <i className="fa-solid fa-spinner fa-spin"></i>
                            </div>
                        ) : (
                            <div className="user-page-recipe-list">
                                {userRecipes.length > 0 ? (
                                    userRecipes.map((recipe) => (
                                        <div
                                            className="user-page-recipe-item"
                                            key={recipe._id}
                                            onClick={() => router(`/single-recipe/${recipe._id}`)}
                                        >
                                            <img src={recipe.image} alt="recipe" className="user-page-recipe-image" />
                                            <div className="user-page-recipe-info">
                                                <p className="user-page-recipe-title"><b>{recipe.title}</b></p>
                                                <p className="user-page-recipe-cuisine">{recipe.cuisine}</p>
                                                <p className="user-page-recipe-category">{recipe.category}</p>
                                            </div>
                                            <div className="user-page-cooking-time-container">
                                                <i className="fa-regular fa-clock"></i>&nbsp;&nbsp;{recipe.cookingTime}
                                            </div>
                                            <div className="user-page-rating-container">
                                                <i className="fa-solid fa-star"></i>&nbsp;&nbsp;{recipe.averageRating && recipe.averageRating > 0 ? recipe.averageRating : 'NA'}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No recipes found for this user.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserPage;
