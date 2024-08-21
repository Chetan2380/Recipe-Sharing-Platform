import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import Api from '../axiosconfig';
import toast from 'react-hot-toast';

const Home = () => {
    const {state,dispatch}=useContext(AuthContext);
    const router = useNavigate();
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
  return (
    <div>
        <h1>Home - {state?.user?.name}</h1>
    </div>
  )
}

export default Home;