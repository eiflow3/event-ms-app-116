import axios from "axios";
/**
 * Deletes a user's registration for an event in joined events table
 *
 * @param {int} uid [logged in user's id]
 * @param {int} eventId [event id to withdraw from]
 * @returns {str} [Message confirming withdrawal]
 * @throws {400} [Bad Request]
 * @throws {404} [Not Found]
 * @throws {405} [Method Not Allowed]
 * @throws {408} [Request Timeout]
 * @throws {500} [Internal Server Error]
 */
async function WithdrawFromEvent(userId, eventId) {
  try {
    const response = await axios.delete(`/api/my-events/${userId}/${eventId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    // Handle successful withdrawal
    return response.message;
  } catch (error) {
    // Handle error response
    console.error(
      "Error withdrawing user from event:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

export default WithdrawFromEvent;
