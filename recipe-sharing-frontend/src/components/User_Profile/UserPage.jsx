import React, { useEffect, useState } from 'react';
import Api from '../../axiosconfig';
import { useNavigate } from 'react-router-dom';
import './UserPage.css'; // Make sure to import your CSS

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userRecipes, setUserRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch all users
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

    // Fetch recipes for a selected user
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
        navigate(`/user-page/${userId}`);
    };

    return (
        <div className="user-page-container">
            <div className="intro-message">
                <h1>Welcome to the Community!</h1>
                <p>Explore recipes shared by our amazing users. Click on a user to view their recipes and get inspired!</p>
            </div>
            <div className="content-container">
                <div className="user-list-container">
                    <h2>All Users</h2>
                    {loading ? (
                        <div className="loading-indicator"><h1>Loading....</h1></div>
                    ) : (
                        <ul className="user-list">
                            {users.map((user) => (
                                <li
                                    key={user._id}
                                    onClick={() => handleUserClick(user._id)}
                                    className={`user-item ${user._id === selectedUserId ? 'selected' : ''}`}
                                >
                                    {user.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="user-recipes-container">
                    <h2>Recipes Added by {users.find(user => user._id === selectedUserId)?.name || 'Selected User'}</h2>
                    {loading ? (
                        <div className="loading-indicator"><h1>Loading....</h1></div>
                    ) : (
                        <div className="recipe-list">
                            {userRecipes.length > 0 ? (
                                userRecipes.map((recipe) => (
                                    <div
                                        className="recipe-item"
                                        key={recipe._id}
                                        onClick={() => navigate(`/single-recipe/${recipe._id}`)}
                                    >
                                        <img src={recipe.image} alt="recipe" className="recipe-image" />
                                        <p><b>{recipe.title}</b></p>
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
    );
};

export default UserPage;
