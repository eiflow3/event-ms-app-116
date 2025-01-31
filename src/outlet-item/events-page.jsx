import EventCard from "../components/event-card";
import { Container, Typography } from "@mui/material";

import { useState, useEffect } from "react";
import UseStateStore from "../state-store";

export default function EventsPage() {
  const { allEvents, setAvailableEvents, availableEvents, userInformation } = UseStateStore();

  useEffect(() => {
    console.log(allEvents)
    const loadEvents = async () => {
      try {
        setAvailableEvents(
          allEvents.filter((event) => event.organizerId != userInformation.uid)
        );

      } catch (e) {
        console.log("error", e);
      }
    };
    loadEvents();
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
      {availableEvents.length == 0 ? (
        <Typography component={"h1"} sx={{ width: 1, textAlign: "center" }}>
          No current events
        </Typography>
      ) : (
        availableEvents.map((i, index) => (
          <EventCard key={i.id} info={i} link={"events"} />
        ))
      )}
    </Container>
  );
}
