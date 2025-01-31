import axios from "axios";
/**
 * Deletes an event from the events table
 *
 * @param {int} userId [event id to delete]
 * @param {int} eventId [event id to delete]
 * @returns {str} [Message confirming deletion]
 * @throws {400} [Bad Request]
 * @throws {404} [Not Found]
 * @throws {405} [Method Not Allowed]
 * @throws {408} [Request Timeout]
 * @throws {500} [Internal Server Error]
 */
async function DeleteEvent(eventId) {
  try {
    const response = await axios.delete(`/api/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }); //event id for the event to be deleted

    // Handle successful deletion
    return response.data;
  } catch (error) {
    // Handle error response
    console.error(
      "Error deleting event:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error to be handled by the caller
  }
}

export default DeleteEvent;
