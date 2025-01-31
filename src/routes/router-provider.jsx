import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../scenes/home";
import EventsPage from "../outlet-item/events-page";
import MyEventsPage from "../outlet-item/my-events-page";
import EventDetails from "../components/event-details";
import MyOrganizedEventsPage from "../outlet-item/my-organized-events";
import SignUp from "../scenes/register";
import SignIn from "../scenes/login";

import AuthGuard from "./auth-guard";

export default function RouterProviderWrapper() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthGuard>
          <Home />
        </AuthGuard>
      ),
      children: [
        {
          path: "/events",
          element: <EventsPage />,
        },
        {
          path: "/events/:id",
          element: <EventDetails />,
        },
        {
          path: "/my-events",
          element: <MyEventsPage />,
        },
        {
          path: "/my-events/:id",
          element: <EventDetails />,
        },
        {
          path: "/my-organized-events",
          element: <MyOrganizedEventsPage />,
        },
        {
          path: "/my-organized-events/:id",
          element: <EventDetails />,
        },
      ],
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
