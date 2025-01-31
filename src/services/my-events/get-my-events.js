import axios from "axios";
/**
 * Retrieves all events user joined
 *
 * @param {int} uid [logged in user's id]
 * @returns {Array} [Array of events user joined]
 * @throws {400} [Bad Request]
 * @throws {404} [Not Found]
 * @throws {405} [Method Not Allowed]
 * @throws {408} [Request Timeout]
 * @throws {500} [Internal Server Error]
 */
async function GetMyEvents(userId) {
  try {
    const response = await axios.get(`/api/my-events/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    // Handle successful response
    return response.data.data;
  } catch (error) {
    // Handle error response
    console.error(
      "Error fetching user events:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error for the caller to handle
  }
}

export default GetMyEvents;
