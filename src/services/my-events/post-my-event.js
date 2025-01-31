import axios from "axios";
/**
 * Add a user for an event in joined events table
 *
 * @param {int} uid [logged in user's id]
 * @param {int} eventId [event id to register for]
 * @returns {str} [Message confirming registration]
 * @throws {400} [Bad Request]
 * @throws {404} [Not Found]
 * @throws {405} [Method Not Allowed]
 * @throws {408} [Request Timeout]
 * @throws {500} [Internal Server Error]
 */
async function RegisterForEvent(userId, eventId) {
  try {
    const response = await axios.post(
      `/api/my-events/${userId}/${eventId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    // Handle successful registration
    return response.data;
  } catch (error) {
    // Handle error response
    console.error(
      "Error registering user for event:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw error so that the caller can handle it.
  }
}

export default RegisterForEvent;
