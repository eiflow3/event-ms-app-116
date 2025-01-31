import axios from "axios";

async function LoginUser(username, password) {
  try {
    const response = await axios.post("/api/auth/login", {
      username: username,
      password: password,
    });

    // Handle successful login (e.g., save token, redirect)
    console.log(response.data)
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

export default LoginUser;
