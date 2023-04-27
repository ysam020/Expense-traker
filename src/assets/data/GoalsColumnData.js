import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton } from "@mui/material";
import { Tooltip } from "@mui/material";
import ProgressBar from "react-bootstrap/ProgressBar";
import db from "../../firebase/firebase";

export const goalsColumnData = (user) => {
  return [
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
          return (
            <>
              <ProgressBar now={percentage} label="100%" />
              <p style={{ marginBottom: 0, marginLeft: "5px" }}>100%</p>
            </>
          );
        } else {
          return (
            <>
              <ProgressBar now={percentage} label={percentage} />
              <p
                style={{ marginBottom: 0, marginLeft: "5px" }}
              >{`${percentage}%`}</p>
            </>
          );
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
            <Tooltip title="Delete">
              <IconButton onClick={deleteData}>
                <DeleteRoundedIcon index={params.row.id} color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];
};
