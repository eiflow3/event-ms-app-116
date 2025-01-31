import { useState, useEffect } from "react"; // react import
import { Container, Fab, Typography } from "@mui/material"; // material ui import
import EventCard from "../components/event-card"; // component import
import UseStateStore from "../state-store"; // state store import
import GetMyEvents from "../services/my-events/get-my-events";

export default function MyEventsPage() {
  const { allEvents, myJoinedEvents, setMyJoinedEvents, myJoinedEventsID, userInformation } = UseStateStore();
  const uid = userInformation.uid;
  useEffect(() => {
    console.log(myJoinedEventsID)
    async function loadMyEvents() {
      try {
        const newMyjoinedEvents = allEvents.filter((event) => myJoinedEventsID.includes(event.id));
        setMyJoinedEvents(newMyjoinedEvents);
      } catch (e) {
        console.log("Error", e);
      }
    }
    loadMyEvents();
  }, [allEvents]);

  return (
    <Container
      sx={{
        width: 1,
        maxWidth: "100% !important",
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        p: 3,
        m: 0,
      }}
    >
      {" "}
      {myJoinedEvents.length == 0 ? (
        <Typography component={"h1"} sx={{ width: 1, textAlign: "center"}}>No events joined</Typography>
      ) : (
        myJoinedEvents?.map((i, index) => (
          <EventCard key={i.id} info={i} link={"my-events"} />
        ))
      )}
    </Container>
  );
}
