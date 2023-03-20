import React, { useState, useEffect, useContext } from "react";
import { Tooltip } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import GoalsModal from "./modals/GoalsModal";
import "../styles/goals.css";
import db from "../firebase/firebase";
import { UserContext } from "../context/Context";
import { DataGrid } from "@mui/x-data-grid";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton } from "@mui/material";
import ProgressBar from "react-bootstrap/ProgressBar";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { goalsColumnData } from "../assets/data/GoalsColumnData";
import { getExpenses } from "../utils/getExpensesFromGoals";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      color: "#F15C6D !important",
    },
  })
);

function Goals() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    getExpenses(user, setRows);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="transactions">
      <h2>Goals</h2>
      <div style={{ height: "auto", width: "100%" }}>
        <DataGrid
          sx={{
            padding: "0 30px",
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f8f5ff",
            },
          }}
          className="table goals-table"
          headerAlign="center"
          rows={rows}
          columns={goalsColumnData(
            ProgressBar,
            user,
            db,
            Tooltip,
            IconButton,
            DeleteRoundedIcon,
            classes
          )}
          pageSize={10}
          rowsPerPageOptions={[10]}
          rowHeight={50}
          autoHeight={true}
          disableColumnMenu={true}
          disableSelectionOnClick
        />
      </div>
      <Tooltip title="Add Goal">
        <Fab
          onClick={handleOpen}
          color="primary"
          aria-label="add"
          className="fab add-goal"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <GoalsModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </div>
  );
}

export default Goals;
