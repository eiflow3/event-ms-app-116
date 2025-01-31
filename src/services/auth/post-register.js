import axios from "axios";

async function RegisterUser(firstName, lastName, email, username, password) {
  try {
    const response = await axios.post("/api/auth/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response ? error.response.data : error.message
    );
  }
}

export default RegisterUser;
