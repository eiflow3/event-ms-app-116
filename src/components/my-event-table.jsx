import { act, useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Tooltip,
  Snackbar,
} from "@mui/material";
// mui icons imports
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
// service imports
import DeleteEvent from "../services/my-organized-events/delete-event"; // service imports
import UpdateEvent from "../services/my-organized-events/patch-event"; // service imports
// state store imports
import UseStateStore from "../state-store";
// mui imports
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"; // mui imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // mui imports
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
// date formatter imports
import ConvertTo24Hour from "../time-formatter/convert-24-hour-format";
import FormatDateFromTimestamp from "../time-formatter/time-stamp-format";
import ExtractDateTime from "../time-formatter/date-time-extractor";

function ConfirmationModal({
  message,
  open,
  onClose,
  idToDelete,
  setSnackbarOpenHandler,
}) {
  const { myOrganizedEvents, setMyOrganizedEvents, allEvents, setAllEvents } =
    UseStateStore();

  const deleteEventHandler = async (eventId) => {
    try {
      await DeleteEvent(eventId);
      const newMyOrganizedEvents = myOrganizedEvents.filter(
        (event) => event.id != eventId
      );
      setMyOrganizedEvents(newMyOrganizedEvents);
      const newAllEvents = allEvents.filter((event) => event.id != eventId);
      setAllEvents(newAllEvents);
      console.log("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setSnackbarOpenHandler("Event deleted successfully");
      onClose();
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            deleteEventHandler(idToDelete);
          }}
        >
          Confirm
        </Button>
        <Button
          onClick={() => {
            onClose();
          }}
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default function MyEventTable({ myOrganizedEvents }) {
  const { allEvents, setAllEvents } = UseStateStore();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [idToDelete, setIdToDelete] = useState(null);
  const [activeEditingId, setActiveEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedDate, setEditedDate] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedMaxAttendees, setEditedMaxAttendees] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // open delete confirmation modal
  const handleDeleteConfirmation = (message, eventId) => {
    setIdToDelete(eventId);
    setMessage(message);
    setOpen(true);
  };
  // close delete confirmation modal
  const handleCloseDeleteConfirmation = () => {
    setIdToDelete(null);
    setMessage("");
    setOpen(false);
  };

  // save update event handler
  const handleUpdateEvent = async () => {
    try {
      const response = await UpdateEvent(
        activeEditingId,
        editedTitle,
        editedDescription,
        FormatDateFromTimestamp(editedDate),
        editedLocation,
        editedMaxAttendees
      );
      console.log(response);
      const { date, time } = ExtractDateTime(FormatDateFromTimestamp(editedDate));
      const newAllEvents = allEvents.map((event) => {
        if (event.id == activeEditingId) {
          return {
            ...event,
            event_name: editedTitle,
            location: editedLocation,
            date: date,
            time: time,
            reminders: editedDescription,
            max_participants: editedMaxAttendees,
          };
        }
        return event;
      });
      setAllEvents(newAllEvents);
    } catch (e) {
      console.log(e);
    } finally {
      setActiveEditingId(null);
      setSnackbarOpenHandler("Event updated successfully");
    }
  };

  const tableColumns = [
    "Title",
    "Location",
    "Date",
    "Time",
    "Description",
    "Max Attendees",
    "Registgered Attendees",
    "",
  ];

  const setSnackbarOpenHandler = (message) => {
    setNotificationMessage(message);
    setSnackbarOpen(true);
  };
  const setSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={setSnackbarClose}
        message={notificationMessage}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "green",
            fontWeight: 500,
          },
          "& .MuiPaper-root": {
            display: "flex",
            justifyContent: "center",
          },
        }}
      />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {tableColumns.map((column) => (
              <TableCell key={column} align={"right"}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {myOrganizedEvents.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="right">
                {activeEditingId == row.id ? (
                  <TextField
                    type="text"
                    value={editedTitle}
                    onChange={(e) => {
                      setEditedTitle(e.target.value);
                    }}
                  ></TextField>
                ) : (
                  row.event_name
                )}
              </TableCell>
              <TableCell align="right">
                {activeEditingId == row.id ? (
                  <TextField
                    type="text"
                    value={editedLocation}
                    onChange={(e) => {
                      setEditedLocation(e.target.value);
                    }}
                  ></TextField>
                ) : (
                  row.location
                )}
              </TableCell>
              {activeEditingId == row.id ? (
                <TableCell colSpan={2} align="right">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      value={editedDate}
                      onChange={(newValue) => setEditedDate(newValue)}
                    />
                  </LocalizationProvider>
                </TableCell>
              ) : (
                <>
                  <TableCell align="right">
                    {new Date(row.date).toISOString().slice(0, 10)}
                  </TableCell>
                  <TableCell align="right">{row.time}</TableCell>
                </>
              )}
              <TableCell align="right">
                {activeEditingId == row.id ? (
                  <TextField
                    type="text"
                    value={editedDescription}
                    onChange={(e) => {
                      setEditedDescription(e.target.value);
                    }}
                    // sx={{
                    //   "& .MuiInputBase-root":{
                    //     p: 1
                    //   }
                    // }}
                  ></TextField>
                ) : (
                  row.reminders
                )}
              </TableCell>
              <TableCell align="right">
                {activeEditingId == row.id ? (
                  <TextField
                    type="number"
                    value={editedMaxAttendees}
                    onChange={(e) => {
                      setEditedMaxAttendees(e.target.value);
                    }}
                  ></TextField>
                ) : (
                  row.max_participants
                )}
              </TableCell>
              <TableCell align="right">{row.registered_participants}</TableCell>
              <TableCell align="right">
                {activeEditingId == null ? (
                  <IconButton
                    onClick={() => {
                      setActiveEditingId(row.id);
                      setEditedTitle(row.event_name);
                      setEditedLocation(row.location);
                      setEditedDescription(row.reminders);
                      setEditedDate(
                        dayjs(
                          `${new Date(row.date)
                            .toISOString()
                            .slice(0, 10)}T${ConvertTo24Hour(row.time)}`
                        )
                      );
                      setEditedMaxAttendees(row.max_participants);
                    }}
                  >
                    <ModeEditOutlineIcon color="primary" />
                  </IconButton>
                ) : activeEditingId == row.id ? (
                  <>
                    <Tooltip title="Save Changes" placement="top">
                      <IconButton
                        onClick={() => {
                          handleUpdateEvent();
                        }}
                      >
                        <SaveIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel" placement="top">
                      <IconButton
                        onClick={() => {
                          setActiveEditingId(null);
                        }}
                      >
                        <CancelIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : null}
                <Tooltip title="Delete Event" placement="top">
                  <IconButton
                    onClick={() =>
                      handleDeleteConfirmation(
                        "Are you sure you want to delete this event?",
                        row.id
                      )
                    }
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmationModal
        open={open}
        onClose={handleCloseDeleteConfirmation}
        message={message}
        idToDelete={idToDelete}
        setSnackbarOpenHandler={setSnackbarOpenHandler}
      />
    </TableContainer>
  );
}
