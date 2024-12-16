import axios from "axios";

const urlUsers = "http://localhost:5000/users"
const urlContent = "http://localhost:5000/content"

export const patchData = async (id, data) => {
    try {
      const response = await axios.patch(`${urlUsers}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
      throw error;
    }
  };

export const putData = async (id,data) => {
    const response = await axios.put(`${urlUsers}/${id}`, data)
    return response.data
}

export const patchContentData = async (id, data) => {
  try {
    const response = await axios.put(`${urlContent}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Update failed:', error.response?.data || error.message);
    throw error;
  }
};