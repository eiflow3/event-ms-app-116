import { useParams, useSearchParams } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Tooltip,
  Chip,
  Box,
  Stack,
} from "@mui/material"; // mui imports

import Groups3Icon from "@mui/icons-material/Groups3"; // mui icon import

import sample from "/pictures/sample.jpg"; // image import

import { useState, useEffect } from "react"; // react import

import UseStateStore from "../state-store"; // state store import

import RegisterForEvent from "../services/my-events/post-my-event";
import WithdrawFromEvent from "../services/my-events/delete-my-event";

function isDatePassed(date) {
  // 1. Extract the date from the object
  const dateString = date;

  // 2. Create Date objects for both the event's date and today's date
  const eventDate = new Date(dateString); // Create a date object
  const today = new Date(); // Default constructor creates a new date based on the current time

  // Set time to 00:00:00 for accurate date comparisons
  eventDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  // 3. Compare the dates
  //    - If eventDate is in the past, it returns a negative value
  //    - If eventDate is in the future, it returns a positive value
  //    - If they are on the same date, it will return 0
  return eventDate < today;
}

export default function EventDetails() {
  const { myJoinedEventsID, setMyJoinedEventsID, userInformation } =
    UseStateStore();

  const uid = userInformation.uid;

  const params = useParams();
  const { id } = params;
  const [searchParams] = useSearchParams();

  const title = searchParams.get("title");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const location = searchParams.get("location");
  const description = searchParams.get("description");
  const maxAttendees = searchParams.get("max-attendees");
  const attendees = searchParams.get("attendees");
  const organizer = searchParams.get("organizer");

  async function withdraw(id) {
    try {
      const response = await WithdrawFromEvent(uid, id);
      const newEventsIDs = myJoinedEventsID.filter((eventID) => eventID !== id);
      setMyJoinedEventsID(newEventsIDs);
    } catch (e) {
      console.log(e);
    } finally {
      console.log("Event Withdrawn");
    }
  }

  async function attend(id) {
    try {
      const response = await RegisterForEvent(uid, id);
      console.log(response);
      const newEventsIDs = [...myJoinedEventsID, id];
      setMyJoinedEventsID(newEventsIDs);
    } catch (e) {
      console.log(e);
    } finally {
      console.log("Event Registered");
    }
  }

  const notAccepting = () => {
    if (isDatePassed(date)) {
      return true;
    }
    if (parseInt(attendees) >= parseInt(maxAttendees)) {
      return true;
    }

    return false;
  };

  return (
    <Box
      sx={{ width: 1, height: 600, display: "flex", justifyContent: "center" }}
    >
      <Card elevation={8} sx={{ flexGrow: 1, minWidth: 345, maxWidth: 500, m: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Stack spacing={1}>
            <CardHeader title={title} sx={{ p: 0 }} />
            <Typography variant="two">
              Date: <strong>{new Date(date).toISOString().slice(0, 10)}</strong>
            </Typography>
            <Typography variant="two">
              Event starts at: <strong>{time}</strong>
            </Typography>
            <Typography variant="two">
              Location: <strong>{location}</strong>
            </Typography>
          </Stack>
          {isDatePassed(date) ? (
            <Chip label="Ended" color="error" />
          ) : parseInt(attendees) >= parseInt(maxAttendees) ? (
            <Chip label="No More Spots Available" color="warning" />
          ) : (
            <Chip label="Accepting Attendees" color="success" />
          )}
        </Box>
        <CardMedia
          component="img"
          height="140"
          image={"/pictures/pic.avif"}
          alt="Event Image"
        />
        <CardContent sx={{ gap:1}}>
          <Typography>Organizer: {organizer}</Typography>
          <Typography
            variant="two"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 300,
            }}
          >
            <Groups3Icon />
            {attendees} attendees
          </Typography>
          <Typography variant="two"><i>{description}</i></Typography>
        </CardContent>
        <CardActions>
          {myJoinedEventsID.includes(parseInt(id)) ? (
            <Button
              variant="contained"
              sx={{ bgcolor: "#E7473C", color: "black",fontSize: "12px", fontWeight: "700" }}
              disabled={isDatePassed(date)}
              onClick={() => {
                withdraw(parseInt(id));
              }}
            >
              Withdraw
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ bgcolor: "#388e3c", color: "#fff",fontSize: "12px", fontWeight: "700"  }}
              disabled={notAccepting()}
              onClick={() => {
                attend(parseInt(id));
              }}
            >
              Attend
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}
