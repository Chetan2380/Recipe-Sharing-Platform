import axios from "axios";

const Api = axios.create({
    baseURL: "https://recipe-sharing-platform-1.onrender.com/api/v1",
    withCredentials: true,
  });
  
  export default Api;