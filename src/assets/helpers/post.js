import axios from "axios";

const urlUsers = "http://localhost:5000/users"
const urlContent = "http://localhost:5000/content"

export const postData = async (data) => {

    try {const existingUsers = await axios.get(urlUsers);

    if(existingUsers.data.some(user => user.email === data.email)) {
        throw new Error("This email is already in use")
    }

    const response = await axios.post(urlUsers,data)
    return response.data} catch (error) {
        throw new Error(error.message)
    }
} 

export const postContentData = async (data) => {

    try {const existingContent = await axios.get(urlContent);

    if(existingContent.data.some(show => show.title === data.title)) {
        throw new Error("This title already exists")
    }

    const response = await axios.post(urlContent,data)
    return response.data} catch (error) {
        throw new Error(error.message)
    }
} 