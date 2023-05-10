import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.scss";
import { sidebarData } from "../assets/data/SidebarData";
import { IconButton, List, ListItem, ListItemButton } from "@mui/material";
import { Avatar } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { UserContext, LogoutContext } from "../context/Context";

function Sidebar() {
  const user = useContext(UserContext);
  const logout = useContext(LogoutContext);

  return (
    <div className="sidebar">
      <List>
        <div className="avatar">
          <Avatar
            src={user.photoURL}
            sx={{ width: "100px !important", height: "100px !important" }}
          />
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
                  style={{ padding: "5px 0" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton sx={{ color: "#ffffff9f" }}>{icon}</IconButton>
                    <p className="sidebar-list-text">{name}</p>
                  </div>
                </ListItemButton>
              </NavLink>
            </ListItem>
          );
        })}
        <ListItem
          sx={{ textAlign: "left" }}
          className="sidebar-listItem"
          style={{
            padding: "5px 0",
          }}
        >
          <div className="sidebar-link">
            <ListItemButton
              sx={{ textAlign: "left" }}
              className="appbar-links"
              onClick={() => logout()}
              style={{
                padding: "5px 0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton sx={{ color: "#ffffff9f" }}>
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
