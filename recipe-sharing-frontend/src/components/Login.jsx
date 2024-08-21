import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/auth.context';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Api from '../axiosconfig';

const Login = () => {
    const {state,dispatch}=useContext(AuthContext);

    const router=useNavigate();
    const[userData, setUserData]=useState({
        email:"",
        password:"",
    });

    console.log(userData,"userData");
    function handleChange(event){
        setUserData({ ...userData, [event.target.name]: event.target.value});
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
          if (userData.email && userData.password) {
              const response = await Api.post("/auth/login" , {userData});
            if (response.data.success) {
              dispatch({ type: "LOGIN", payload: response.data.userData });
              setUserData({
                email: "",
                password: "",
              });
              router("/");
              toast.success(response.data.message);
            } else {
              toast.error(response?.data?.error)
            }
          } else {
            throw Error("All fields are mandatory.");
          }
        } catch (error) {
          console.log(error, "error");
          toast.error(error?.response?.data?.error);
        }
      }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label>Email:</label><br/>
            <input type='email' name='email' onChange={handleChange} value={userData.email}/><br/>
            <label>Password:</label><br/>
            <input type='password' name='password' onChange={handleChange} value={userData.password}/><br/>
            <input type='submit' value="Login" />
        </form>
    </div>
  )
}

export default Login