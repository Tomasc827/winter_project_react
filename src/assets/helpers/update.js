import axios from "axios";

const url = "http://localhost:5000/"

export const putData = async (id,data) => {
    const response = await axios.put(`${url}/${id}`, data)
    return response.data
}

export const patchData = async (id,data) => {
    const response = await axios.put(`${url}/${id}`, data)
    return response.data
}