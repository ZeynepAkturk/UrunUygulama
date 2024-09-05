import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { NavLink, Outlet } from "react-router-dom";
import { routes } from "../Router/Router";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function ThemeLayout() {
  //const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open
      >
        <DrawerHeader></DrawerHeader>
        <Divider />
        <List>
          {routes
            .filter((x) => !x.hidden)
            .map((route, index) => (
              <NavLink
                key={index}
                to={route.path ?? ""}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "white" : "black",
                  backgroundColor: isActive ? "yellowgreen" : "",
                })}
              >
                <ListItem
                  key={index}
                  disablePadding
                  sx={{ backgroundColor: "inherit" }}
                >
                  <ListItemButton>
                    <ListItemIcon>{route.icon}</ListItemIcon>
                    <ListItemText primary={route.menuname} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
        </List>
      </Drawer>
      <Main open>
        <Outlet />
      </Main>
    </Box>
  );
}
