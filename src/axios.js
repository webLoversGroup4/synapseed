import axios from "axios";
import router from "./router";


axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('TOKEN');
      router.navigate('/login') 
    }
    return Promise.reject(error);
  }
);

export default axios;
