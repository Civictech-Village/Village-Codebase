import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from '../assets/Screenshot 2023-06-13 000111.png'
import HomeIcon from '@mui/icons-material/Home';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { logUserOut } from "../adapters/auth-adapter";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";

export default function ResponsiveDrawer({ window, Children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  
  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  const drawer = (
    <div>
      <Toolbar />
      <img style={{width:"100%"}} src={Image}></img>
      <Divider />
      <List sx={{ display: "flex", flexDirection: "column" }}>
        {["Home", "Village", "Profile"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index == 0 ? <HomeIcon /> : 
                index == 1 ? <HolidayVillageIcon /> :
                <AccountCircleIcon />
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ display: "flex", flexDirection: "column" }}>
        {
          <ListItem key={"Logout"} disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon></LogoutIcon>
              </ListItemIcon>
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>
       }
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#F5F5F5",
        height: "100%",
        width: "100%",
      }}
    >
      <CssBaseline />

      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" }, width:"100%" }}
        >
          <MenuIcon />
        </IconButton>

      </Toolbar>
      <Box
        component="nav"
        sx={{  flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
        <Toolbar />
        {Children}
    </Box>
  );
}
