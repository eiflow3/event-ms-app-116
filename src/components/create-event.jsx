import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material"; // mui imports
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"; // mui imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // mui imports
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import dayjs from "dayjs";

import UseStateStore from "../state-store"; // state store import

import PostEvent from "../services/my-organized-events/post-event"; // service import

function formatDateFromTimestamp(timestamp) {
  try {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch (error) {
    console.error("Error converting timestamp:", error);
    return null; // Or handle error as appropriate
  }
}

function getCurrentDateInDesiredFormat() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const formattedDate = getCurrentDateInDesiredFormat();
console.log(formattedDate);

export default function CreateEvent({
  isOpen,
  setIsOpen,
  setCreateNotification,
}) {
  const { myOrganizedEvents, setMyOrganizedEvents, userInformation } =
    UseStateStore();

  const [datetime, setDatetime] = useState(
    dayjs(getCurrentDateInDesiredFormat())
  );
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [maxAttendees, setMaxAttendees] = useState(0);
  const [description, setDescription] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };

  const addEvent = async () => {
    try {
      const response = await PostEvent(
        userInformation.uid,
        title,
        description,
        formatDateFromTimestamp(datetime),
        location,
        maxAttendees
      );
      const newMyOrganizedEvents = [...myOrganizedEvents, response.data];
      setMyOrganizedEvents(newMyOrganizedEvents);
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setCreateNotification(true);
      setIsOpen(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      component="form"
      sx={{
        "& .MuiPaper-root": {
          maxHeight: "800px !important",
        },
      }}
    >
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent sx={{ mb: 4 }}>
        <Stack spacing={5}>
          <TextField
            autoFocus
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            margin="dense"
            id="name"
            name="email"
            label="Title of Event"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            required
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            margin="dense"
            id="name"
            name="email"
            label="Location"
            type="text"
            fullWidth
            variant="standard"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={datetime}
              label="Date & Time"
              onChange={(newValue) => setDatetime(newValue)}
            />
          </LocalizationProvider>

          <TextField
            autoFocus
            required
            value={maxAttendees}
            onChange={(e) => {
              setMaxAttendees(e.target.value);
            }}
            margin="dense"
            id="name"
            name="email"
            label="Max Attendees"
            type="number"
            fullWidth
            variant="standard"
            sx={{
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                {
                  display: "none",
                },
              "& input[type=number]": {
                MozAppearance: "textfield",
              },
            }}
          />
          <TextField
            autoFocus
            required
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            multiline
            margin="dense"
            id="name"
            name="email"
            label="Event Description"
            type="text  "
            fullWidth
            variant="standard"
          />
        </Stack>
      </DialogContent>
      <Button variant="contained" color="primary" onClick={addEvent}>
        Create Event
      </Button>
    </Dialog>
  );
}
