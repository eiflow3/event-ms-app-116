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
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import RegisterUser from "../services/auth/post-register";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Nav = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await RegisterUser(
        firstname,
        lastname,
        email,
        username,
        password
      );

      Nav("/sign-in?registered-successfully=true");
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      console.log("Registration successful");
    }
  };
  return (
    <Paper
      sx={{
        width: "20%",
        padding: "20px",
      }}
    >
      <Box component={"form"}>
        <Stack spacing={2}>
          <Typography
            variant="three"
            component={"h1"}
            sx={{ textAlign: "center" }}
          >
            Sign Up
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <FormControl>
              <FormLabel htmlFor="firstname">First name</FormLabel>
              <TextField
                value={firstname}
                autoComplete="firstname"
                name="firstname"
                required
                fullWidth
                id="firstname"
                placeholder="Jon"
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastname">Last name</FormLabel>
              <TextField
                value={lastname}
                autoComplete="lastname"
                name="lastname"
                required
                fullWidth
                id="lastname"
                placeholder="Snow"
                type="text"
                onChange={(e) => setLastname(e.target.value)}
              />
            </FormControl>
          </Stack>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              value={email}
              autoComplete="email"
              name="email"
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
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
            variant="contained"
            sx={{
              fontSize: ".8rem",
              fontWeight: 600,
            }}
            onClick={handleRegister}
          >
            Sign up
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account? <Link to="/sign-in">Sign in</Link>
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}
