import axios from "axios";

const Api = axios.create({
    baseURL: "https://recipe-sharing-platform-zedg.onrender.com/api/v1",
    withCredentials: true,
  });
  
  export default Api;