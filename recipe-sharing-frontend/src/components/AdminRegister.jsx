import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../axiosconfig";
import toast from "react-hot-toast";

const AdminRegister = () => {
    const router=useNavigate();
    const[adminData, setAdminData]=useState({
        name:"",
        email:"",
        password:"",
    });
    const [errors, setErrors] = useState([]);
    const [disable, setDisable] = useState(true);
    console.log(adminData,"adminData");
    function handleChange(event){
        setAdminData({ ...adminData, [event.target.name]: event.target.value});
    }
    async function handleSubmit(e){
        e.preventDefault();
        try {
            if(adminData.name && adminData.email && adminData.password){
                const response = await Api.post("/admin/register-admin" , {adminData});
                // const response={data:{success:true, message:"Register Successful."}};
                if(response.data.success){
                    setAdminData({
                        name:"",
                        email:"",
                 password:"",
                    });
                    router("/admin-login");
                    toast.success(response.data.message);
                }
            }else{
                toast.error("All fields are mandatory.");
            }
        } catch (error) {
            // error =  { data : { success : false, message : "All fields are mandatory."}}
            toast.error(error.response.data.error);
        }
    }

    useEffect(() => {
        const errorsArray = [];
        if (!adminData.name) {
          errorsArray.push("Name is required.");
        }
        if (!adminData.email) {
          errorsArray.push("Email is required.");
        }
        if (!adminData.password) {
          errorsArray.push("Password is required.");
        }
        setErrors(errorsArray);
        if (errorsArray.length == 0) {
          setDisable(false);
        } else {
          setDisable(true);
        }
      }, [adminData]);

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>Admin Register</h1>
            <label>Name:</label><br/>
            <input type='text' name='name' onChange={handleChange} value={adminData.name}/><br/>
            <label>Email:</label><br/>
            <input type='email' name='email' onChange={handleChange} value={adminData.email}/><br/>
            <label>Password:</label><br/>
            <input type='password' name='password' onChange={handleChange} value={adminData.password}/><br/>
            <input type='submit' value="Register" />
        </form>
    </div>
  )
}

export default AdminRegister;