import axios from "axios";
/**
 * Retrieves all events
 *
 * @returns {Array} [Array of all events]
 * @throws {400} [Bad Request]
 * @throws {404} [Not Found]
 * @throws {405} [Method Not Allowed]
 * @throws {408} [Request Timeout]
 * @throws {500} [Internal Server Error]
 */
async function GetAllEvents() {
  try {
    const response = await axios.get("/api/events", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    // Handle successful response (e.g., display events)
    return response.data;
  } catch (error) {
    // Handle error response
    console.error(
      "Error fetching events:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error for the caller to handle
  }
}

export default GetAllEvents;
