import axios from "axios";

const Api = axios.create({
    baseURL: "https://recipe-sharing-platform-d0tt.onrender.com/api/v1",
    withCredentials: true,
  });
  
  export default Api;