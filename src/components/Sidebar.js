import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
import { sidebarData } from "../assets/data/SidebarData";
import { IconButton, List, ListItem, ListItemButton } from "@mui/material";
import { Avatar } from "@mui/material";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { UserContext, LogoutContext } from "../context/Context";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      width: "100px !important",
      height: "100px !important",
    },
  })
);

function Sidebar() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const logout = useContext(LogoutContext);

  return (
    <div className="sidebar">
      <List>
        <div className="avatar">
          <Avatar src={user.photoURL} className={classes.icon} />
        </div>
        {sidebarData.map((val) => {
          const { id, icon, name, url } = val;

          return (
            <ListItem
              disableGutters={true}
              key={id}
              className="sidebar-listItem"
            >
              <NavLink to={`/${url}`} key={id} className="sidebar-link">
                <ListItemButton
                  sx={{ textAlign: "left" }}
                  className="appbar-links"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton>{icon}</IconButton>
                    <p className="sidebar-list-text">{name}</p>
                  </div>
                </ListItemButton>
              </NavLink>
            </ListItem>
          );
        })}
        <ListItem sx={{ textAlign: "left" }} className="sidebar-listItem">
          <div className="sidebar-link">
            <ListItemButton
              sx={{ textAlign: "left" }}
              className="appbar-links"
              onClick={() => logout()}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton>
                  <LogoutRoundedIcon />
                </IconButton>
                <p className="sidebar-list-text">Logout</p>
              </div>
            </ListItemButton>
          </div>
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;