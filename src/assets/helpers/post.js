import axios from "axios";

const url = "http://localhost:5000/pets"

export const postData = async (data) => {
    const response = await axios.post(url,data)
    return response.data
}