import axios from "axios";

const url = "http://localhost:5000/users";

export const loginUser = async (loginData) => {
  try {
    const response = await axios.get(url);
    const users = response.data;

    const user = users.find(
      (u) =>
        u.email === loginData.email && u.password === btoa(loginData.password) && u.role === "User"
    );

    const admin = users.find((u) => u.email === loginData.email && u.password === btoa(loginData.password) && u.role === "Admin")


    if(admin) {
      return  admin
    } else if (user) {
    return  user
    } else {
      throw new Error("Invalid email or password");
    }


  } catch (error) {
  throw new Error(error.message || "Unable to connect to server")
  }
};
