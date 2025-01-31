import {
  Card,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  Box,
  Snackbar,
} from "@mui/material";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import LoginUser from "../services/auth/post-login";
import GetProfile from "../services/auth/get-profile";
import UseStateStore from "../state-store"; // state store import

export default function SignIn() {
  const { setUserInformation } = UseStateStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const Nav = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const registered = searchParams.get("registered-successfully");
    if (registered == "true") {
      setOpen(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      console.log(username, password);
      const response = await LoginUser(username, password);
      console.log(response);
      if ((response.status = "success")) {
        localStorage.setItem("authToken", response.token);
        Nav("/");
      }
      setError(false);
    } catch (error) {
      console.error("Error logging in:", error);
      setError(true);
    }
  };
  return (
    <Paper
      sx={{
        width: "20%",
        padding: "20px",
      }}
    >
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Registered Sucessfully"
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
      <Box component={"form"}>
        <Stack spacing={2}>
          <Typography
            variant="three"
            component={"h1"}
            sx={{ textAlign: "center", fontWeight: 800, color: "#E7473C" }}
          >
            EMS
          </Typography>
          <Typography
            variant="three"
            component={"h1"}
            sx={{ textAlign: "center" }}
          >
            Sign In
          </Typography>
          {error ? (
            <Typography variant="two" color="error">
              Invalid Username or Password
            </Typography>
          ) : null}
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              value={username}
              autoComplete="username"
              name="username"
              required
              fullWidth
              id="username"
              placeholder="KingInTheNorth"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              value={password}
              autoComplete="password"
              name="password"
              required
              fullWidth
              id="password"
              placeholder="••••••"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            fullWidth
            // type="submit"
            variant="contained"
            sx={{
              fontSize: ".8rem",
              fontWeight: 600,
            }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Doesn't have an account? <Link to="/sign-up">Sign up</Link>
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}
