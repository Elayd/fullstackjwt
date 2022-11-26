import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { destroyCookie } from "nookies";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useAppSelector } from "../redux/hooks";
import Link from "next/link";
import HouseIcon from "@mui/icons-material/House";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const deleteTokenFromCookie = () => {
    destroyCookie(undefined, "access_token");
    destroyCookie(undefined, "refresh_token");
    handleClose();
    location.reload();
  };

  const isAuthenticated = useAppSelector((state) => !!state.auth.access_token);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup></FormGroup>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{ textDecoration: "none", color: "white" }} href={"/"}>
              <HouseIcon />
            </Link>
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {isAuthenticated ? (
                <>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    href={"/profile"}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={deleteTokenFromCookie}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    href={"/login"}
                  >
                    <MenuItem onClick={handleClose}>Login</MenuItem>
                  </Link>
                </>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
