import axios from 'axios';

const API_BASE_URL = 'http://localhost:3333/api/users'; 

const userApi = axios.create({
    baseURL: API_BASE_URL, // Replace with your base URL
  });
  
  // Add Authorization header for all requests
userApi.defaults.headers.common["Authorization"] = `Bearer 12345`;
  
export const getUser = async (id) => await userApi.get(`/${id}`);
export const createUser = async (user) => await userApi.post("/", user);
export const updateUser = async (id,user) => await userApi.patch(`/${id}`, user);
export const deleteUser = async (id) => await userApi.delete(`/${id}`);
