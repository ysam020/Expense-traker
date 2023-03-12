import React, { useState, useCallback, useEffect, useContext } from "react";
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

function Goals() {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rows, setRows] = useState([]);
  const getExpenses = useCallback(() => {
    db.collection("goals")
      .doc(user.email)
      .collection("goals")
      .orderBy("date", "asc")
      .onSnapshot((snapshot) => {
        setRows(snapshot.docs.map((doc) => doc.data()));
      });
    // eslint-disable-next-line
  }, [user.email]);

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  }, []);

  const goalsColumnData = [
    {
      field: "id",
      sortable: false,
      headerName: "Id",
      width: "100",
    },
    {
      field: "title",
      sortable: false,
      headerName: "Title",
      width: "180",
    },
    {
      field: "target",
      sortable: false,
      headerName: "Target",
      width: "160",
    },
    {
      field: "alreadySaved",
      sortable: false,
      headerName: "Already Saved",
      width: "160",
    },
    {
      field: "date",
      headerName: "Target Date",
      width: "150",
      align: "center",
      renderCell: (params) => {
        var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
        t.setUTCSeconds(params.value.seconds);
        return <div>{t.toLocaleDateString()}</div>;
      },
    },
    {
      field: "percentage",
      headerName: "Percentage Achieved",
      width: "180",
      align: "center",
      renderCell: (params) => {
        let percentage = (
          (params.row.alreadySaved / params.row.target) *
          100
        ).toFixed(2);

        if (params.row.alreadySaved > params.row.target) {
          return <ProgressBar now={percentage} label="100%" />;
        } else {
          return <ProgressBar now={percentage} label={`${percentage}%`} />;
        }
      },
    },
    {
      field: "actions",
      sortable: false,
      headerName: "Actions",
      width: "160",
      align: "center",
      renderCell: (params) => {
        const deleteData = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__")
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          db.collection("goals")
            .doc(user.email)
            .collection("goals")
            .where("id", "==", thisRow.id)
            .get()
            .then((querySnapshot) =>
              querySnapshot.forEach((doc) =>
                db
                  .collection("goals")
                  .doc(user.email)
                  .collection("goals")
                  .doc(doc.id)
                  .delete()
              )
            );
        };
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <Tooltip title="delete">
              <IconButton onClick={deleteData}>
                <DeleteRoundedIcon index={params.row.id} />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

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
          columns={goalsColumnData}
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
