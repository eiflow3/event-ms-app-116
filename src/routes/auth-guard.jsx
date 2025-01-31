import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import UseStateStore from "../state-store";
import GetProfile from "../services/auth/get-profile";
import LoginLoader from "../components/login-loader";
import Axios from "axios";

export default function AuthGuard({ children }) {
  const { setUserInformation } = UseStateStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken") == null) {
      return Nav("/sign-in");
    } else {
      Axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          setUserInformation({
            uid: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
          });
          setIsAuthenticated(true);
          setTimeout(() => setIsLoading(false), 2000);
        })
        .catch((e) => {
          console.log("error", e);
          localStorage.removeItem("authToken");
          setIsLoading(false);
          return Nav("/sign-in");
        });
    }
  }, []);

  if (isLoading) {
    return <LoginLoader />;
  }

  return isAuthenticated ? children : null;
}
