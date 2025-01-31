import { Container, Fab, Tooltip, Snackbar } from "@mui/material"; // mui imports
import AddIcon from "@mui/icons-material/Add"; // mui icon imports

import { useState, useEffect } from "react"; // react imports

import MyEventTable from "../components/my-event-table"; // component imports
import CreateEvent from "../components/create-event"; // component imports

import UseStateStore from "../state-store"; // state store imports

export default function MyOrganizedEventsPage() {
  const {
    allEvents,
    setMyOrganizedEvents,
    myOrganizedEvents,
    userInformation,
  } = UseStateStore();
  useEffect(() => {
    setMyOrganizedEvents(
      allEvents.filter((event) => event.organizerId == userInformation.uid)
    );
  }, [allEvents]);

  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [createNotification, setCreateNotification] = useState(false);

  const openHandler = () => {
    setIsCreateEventOpen(!isCreateEventOpen);
  };

  const closeHandler = () => {
    setIsCreateEventOpen(false);
  };

  const closeCreateNotification = () => {
    setCreateNotification(false);
  };

  return (
    <Container
      sx={{
        width: 1,
        maxWidth: "100% !important",
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        p: 1,
        m: 0,
      }}
    >
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={createNotification}
        autoHideDuration={2000}
        onClose={closeCreateNotification}
        message={"Successfully created event"}
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
      <MyEventTable myOrganizedEvents={myOrganizedEvents} />
      <Tooltip title="Create Event" placement="top">
        <Fab
          onClick={openHandler}
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 40, right: 40 }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <CreateEvent
        isOpen={isCreateEventOpen}
        setIsOpen={closeHandler}
        setCreateNotification={setCreateNotification}
      />
    </Container>
  );
}
