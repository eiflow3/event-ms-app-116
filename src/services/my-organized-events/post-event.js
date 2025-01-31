import axios from "axios";
/**
 * Creates an event in the events table
 *
 * @param {str} eventTitle [event id to delete]
 * @param {str} organizer [event id to delete]
 * @param {str} location [event id to delete]
 * @param {date} date [event id to delete]
 * @param {time} time [event id to delete]
 * @param {str} description [event id to delete]
 * @param {int} maxAttendees [event id to delete]
 * @param {int} registeredAttendees [event id to delete]
 * @returns {str} [Message confirming creation]
 * @throws {400} [Bad Request]
 * @throws {404} [Not Found]
 * @throws {405} [Method Not Allowed]
 * @throws {408} [Request Timeout]
 * @throws {500} [Internal Server Error]
 */
async function PostEvent(
  uid,
  eventTitle,
  description,
  date,
  location,
  maxAttendees
) {
  try {
    const response = await axios.post(
      "/api/events",
      {
        userId: uid,
        eventTitle: eventTitle,
        description: description,
        date: date,
        location: location,
        maxAttendees: maxAttendees,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    // Handle successful event creation
    return response.data;
  } catch (error) {
    // Handle error response
    console.error(
      "Error creating event:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error for the caller to handle
  }
}

export default PostEvent;
