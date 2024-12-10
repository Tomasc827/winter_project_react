import axios from "axios";

const url = "http://localhost:5000/users"

export const putData = async (id, data) => {
    try {
      const response = await axios.patch(`${url}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
      throw error;
    }
  };

export const patchData = async (id,data) => {
    const response = await axios.put(`${url}/${id}`, data)
    return response.data
}