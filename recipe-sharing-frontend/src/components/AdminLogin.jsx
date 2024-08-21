import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../axiosconfig";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth.context";

const AdminLogin = () => {
    const {state,dispatch}=useContext(AuthContext);
    
        const router=useNavigate();
        const[adminData, setAdminData]=useState({
            email:"",
            password:"",
        });
    
        console.log(adminData,"adminData");
        function handleChange(event){
            setAdminData({ ...adminData, [event.target.name]: event.target.value});
        }
        async function handleSubmit(e) {
            e.preventDefault();
            // api call to backend
            try {
              if (adminData.email && adminData.password) {
                  const response = await Api.post("/admin/login-admin" , {adminData});
                // const response = {
                //   data: {
                //     success: true,
                //     message: "Login successfull.",
                //     adminData: { name: "Awdiz" },
                //   },
                // };
                if (response.data.success) {
                  dispatch({ type: "LOGIN", payload: response.data.adminData });
                  // LOGIN(adminData)
                  setAdminData({
                    email: "",
                    password: "",
                  });
                  router("/");
                  toast.success(response.data.message);
                } else {
                  toast.error(response?.data?.error)
                  // console.log(response.data.error, "error")
                }
              } else {
                throw Error("All fields are mandatory.");
                // toast.error("All fields are mandatory.");
              }
            } catch (error) {
              console.log(error, "error");
              //   console.log(error);
              //   error =  { data : { success : false, message : "Password is invalid."}}
              toast.error(error?.response?.data?.error);
            }
          }
      return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Admin Login</h1>
                <label>Email:</label><br/>
                <input type='email' name='email' onChange={handleChange} value={adminData.email}/><br/>
                <label>Password:</label><br/>
                <input type='password' name='password' onChange={handleChange} value={adminData.password}/><br/>
                <input style={{width:"80px", height:"30px",marginTop:"10px",fontWeight:"500"}} type='submit' value="Login" />
            </form>
        </div>
      )
    }
    
    export default AdminLogin;