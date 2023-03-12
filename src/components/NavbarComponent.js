import React, { useContext } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Transactions from "./Transactions";
import { Routes, Route } from "react-router-dom";
import Analysis from "./Analysis";
import Accounts from "./Accounts";
import Settings from "./Settings";
import Profile from "./Profile";
import { UserContext } from "../context/Context";
import Budgets from "./Budgets";
import Goals from "./Goals";
import sidebarBg from "../assets/images/sidebar-bg.png";

const drawerWidth = 250;

function ResponsiveDrawer(props) {
  const user = useContext(UserContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Sidebar />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          backgroundColor: "rgba(249, 250, 251, 0.3)",
          backdropFilter: "blur(6px) !important",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon sx={{ color: "#000" }} />
          </IconButton>
          <img
            src={require("../assets/images/logo.png")}
            alt="logo"
            height="50px"
          />
          <h3 style={{ color: "#000", marginLeft: "20px", overflow: "hidden" }}>
            Expense Tracker
          </h3>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Drawer mobile */}
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "#252e3e",
              backgroundImage: `url(${sidebarBg})`,
              backgroundAttachment: "fixed",
              backgroundPosition: "left 0 bottom 0 !important",
              backgroundSize: "250px !important",
              backgroundRepeat: "no-repeat",
              padding: "0 20px",
            },
          }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Drawer desktop */}
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "#252e3e",
              backgroundImage: `url(${sidebarBg})`,
              backgroundAttachment: "fixed",
              backgroundPosition: "left 0 bottom 0 !important",
              backgroundSize: "250px !important",
              backgroundRepeat: "no-repeat",
              padding: "0 20px",
            },
          }}
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            lg: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "rgb(249, 250, 251)",
            height: "100vh",
          },
        }}
      >
        <Toolbar />

        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/transactions" element={<Transactions />} />
          <Route
            exact
            path="/accounts"
            element={<Accounts user={user} />}
          ></Route>

          <Route exact path="/analysis" element={<Analysis />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/budgets" element={<Budgets />} />
          <Route exact path="/goals" element={<Goals />} />
        </Routes>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
