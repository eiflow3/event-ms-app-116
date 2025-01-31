import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UseStateStore from "../state-store";
import { Link, useLocation } from "react-router-dom";

function NavLink({ to, children, ...props }) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Link to={to} style={{ textDecoration: "none", ...props.style }}>
      <Typography
        variant="one"
        sx={{
          color: "#fff", // highlight color
          ...props.sx,
          textDecoration: isActive ? "underline" : "none",
        }}
      >
        {children}
      </Typography>
    </Link>
  );
}

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { userInformation } = UseStateStore();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/sign-in";
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        maxWidth: "100% !important",
        height: "100px",
        bgcolor: "#E7473C",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container sx={{ width: 1, m: 0, p: 0, maxWidth: "100% !important" }}>
        <Toolbar
          sx={{
            width: "100%",
            maxWidth: "100% !important",
            display: "flex",
          }}
        >
          <Box sx={{ display: "flex", flexGrow: 0, gap: 2 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircleIcon sx={{ position: "absolute", color: "#fff" }} />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </Link>
              </MenuItem>
            </Menu>
            <Typography>{userInformation.username}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 5,
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              pt: 6,
              position: "relative",
              right: "50px",
            }}
          >
            <NavLink to={"/events"}>EVENTS</NavLink>
            <NavLink to={"/my-events"}>MY EVENTS</NavLink>
            <NavLink to={"/my-organized-events"}>CREATED EVENTS</NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
