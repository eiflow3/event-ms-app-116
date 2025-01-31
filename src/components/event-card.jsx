import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Tooltip,
  Stack,
} from "@mui/material";

import { Link } from "react-router-dom";

import Groups3Icon from "@mui/icons-material/Groups3";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

export default function EventCard({ info, link }) {
  const {
    date,
    event_name,
    id,
    location,
    max_participants,
    organizerId,
    registered_participants,
    reminders,
    time,
  } = info;

  const eventsLink = `/${link}/${id}?title=${event_name}&description=${reminders}&date=${date}&time=${time}&location=${location}&max-attendees=${max_participants}&attendees=${registered_participants}&organizer=${organizerId}`;
  const myEventsLink = `/${link}/${id}?title=${event_name}&description=${reminders}&date=${date}&time=${time}&location=${location}&max-attendees=${max_participants}&attendees=${registered_participants}&organizer=${organizerId}`;
  const myOrganizedEventsLink = `/${link}/${id}?title=${event_name}&description=${reminders}&date=${date}&time=${time}&location=${location}&max-attendees=${max_participants}&attendees=${registered_participants}&organizer=${organizerId}`;
  return (
    <Card
      elevation={5}
      sx={{
        flexGrow: 1,
        minWidth: 345,
        maxWidth: 500,
        transition: "0.3s ease",
        ":hover": {
          bgcolor: "#f0f0f0",
          borderColor: "red",
        },
      }}
    >
      <Stack spacing={0.5} sx={{ p: 1 }}>
        <CardHeader title={event_name} sx={{ p: 0 }} />
        <Typography variant="two">
          Date: <strong>{new Date(date).toISOString().slice(0, 10)}</strong>
        </Typography>
        <Typography variant="two">
          Event starts at: <strong>{time}</strong>
        </Typography>
      </Stack>
      <CardMedia
        component="img"
        height="150"
        image={"/pictures/pic.avif"}
        alt="Event Image"
      />
      <CardContent>
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
          {registered_participants} attendees
        </Typography>
        <Typography variant="two">
          Event ID: {id}
          <br />
        </Typography>
        <Typography variant="two">Created by ID: {organizerId}</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "end" }}>
        <Tooltip title="View Details" placement="top">
          <Link
            to={
              link == "events"
                ? eventsLink
                : link == "my-events"
                ? myEventsLink
                : myOrganizedEventsLink
            }
            style={{ textDecoration: "none" }}
          >
            <Typography
              variant="two"
              color="#000"
              sx={{ display: "flex", gap: 1, justifyContent: "center", ":hover":{
                color: "#E7473C",
              } }}
            >
              View Details
              <AppRegistrationIcon color="black"/>
            </Typography>
          </Link>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
