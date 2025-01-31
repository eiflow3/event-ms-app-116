import axios from "axios";

async function GetProfile() {
  try {
    const response = await axios.get(`/api/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    // Handle successful login (e.g., save token, redirect)
    return response.data;
  } catch (error) {
    // Handle login error (e.g., show error message)
    console.error(
      "Error logging in:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error to be handled by the caller
  }
}

export default GetProfile;
