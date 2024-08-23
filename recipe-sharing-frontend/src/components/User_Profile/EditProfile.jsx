import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import Api from '../../axiosconfig';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "./EditProfile.css";

const EditProfile = () => {
    const { state } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState(state?.user?.name || "");
    const [email, setEmail] = useState(state?.user?.email || "");
    const [loading, setLoading] = useState(false);

    async function handleUpdateProfile() {
        setLoading(true);
        try {
            const response = await Api.post("/auth/update-profile", { name, email });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/user-profile");
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleUpdateProfile} disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
            </button>
        </div>
    );
};

export default EditProfile;
