import { Container } from "@mui/material"; // material ui import
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import ResponsiveAppBar from "../components/nav"; // component import
import UseStateStore from "../state-store"; // state store import
import GetAllEvents from "../services/events/get-events";
import GetMyEvents from "../services/my-events/get-my-events";

export default function Home() {
  const { setAllEvents, setMyJoinedEventsID, userInformation } =
    UseStateStore();
  const Nav = useNavigate();

  useEffect(() => {
    console.log("runned")
    try {
      GetAllEvents().then((response) => {
        console.log(response.data);
        const data = response.data;
        setAllEvents(data);
      });
      GetMyEvents(userInformation.uid).then((response) => {
        console.log("runned")
        console.log(response);
        const ids = response.map((event) => {
          return event.event_id;
        });
        console.log(ids);
        setMyJoinedEventsID(ids);
      });
    } catch (e) {
      console.log("error", e);
    }
    Nav("/events");
  }, []);

  return (
    <Container
      sx={{
        height: 1,
        width: 1,
        m: 0,
        padding: "0 !important",
        maxWidth: "100% !important",
      }}
    >
      <Helmet>
        <title>Home</title>
      </Helmet>
      <ResponsiveAppBar />
      <Outlet />
    </Container>
  );
}
