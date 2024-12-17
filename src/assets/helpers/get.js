import axios from "axios";

const urlUsers = "http://localhost:5000/users"
const urlContent = "http://localhost:5000/content"

export const getAllData = async() => {
    const response = await axios.get(urlUsers)
    return response.data
}

export const getSingleData = async(id) => {
    const response = await axios.get(`${urlUsers}/${id}`)
    return response.data
}

export const getAllContent = async() => {
    const response = await axios.get(urlContent)
    return response.data
}