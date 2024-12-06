import axios from "axios";

const url = "http://localhost:5000/users"


export const loginUser = async (loginData) => {
    try {
      const response = await axios.get(url);
      const users = response.data;
      
      const user = users.find(u => 
        u.email === loginData.email && 
        u.password === btoa(loginData.password)
      );
      
      if (!user) {
        throw new Error("Invalid email or password");
      }
  
      return user;
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  };