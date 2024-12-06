import axios from "axios";

const url = "http://localhost:5000/users"

export const postData = async (data) => {

    try {const existingUsers = await axios.get(url);

    if(existingUsers.data.some(user => user.email === data.email)) {
        throw new Error("This email is already in use")
    }

    const response = await axios.post(url,data)
    return response.data} catch (error) {
        throw new Error(error.message)
    }
} 