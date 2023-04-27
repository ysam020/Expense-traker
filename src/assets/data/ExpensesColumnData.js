import { IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Tooltip } from "@mui/material";
import db from "../../firebase/firebase";

export const expensesColumnData = (user) => {
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
      width: "200",
    },
    {
      field: "category",
      sortable: false,
      headerName: "Category",
      width: "200",
    },
    {
      field: "description",
      sortable: false,
      headerName: "Description",
      width: "160",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: "100",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: "120",
      align: "center",
      renderCell: (params) => {
        var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
        t.setUTCSeconds(params.value.seconds);
        return <div>{t.toLocaleDateString()}</div>;
      },
    },
    {
      field: "type",
      sortable: false,
      headerName: "Type",
      width: "100",
      align: "center",
      renderCell: (params) => {
        if (params.row.type?.toLowerCase() === "expense") {
          return (
            <div
              style={{
                backgroundColor: "rgba(255, 72, 66, 0.16)",
                color: "rgb(183, 33, 54)",
                padding: "5px 10px",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "0.75rem",
                letterSpacing: "0.5px",
              }}
            >
              Expense
            </div>
          );
        } else {
          return (
            <div
              style={{
                backgroundColor: "rgba(84, 214, 44, 0.16)",
                color: "rgb(34, 154, 22)",
                padding: "5px 10px",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "0.75rem",
                letterSpacing: "0.5px",
              }}
            >
              Income
            </div>
          );
        }
      },
    },
    {
      field: "actions",
      sortable: false,
      headerName: "Actions",
      width: "120",
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

          db.collection("transactions")
            .doc(user.email)
            .collection("transactions")
            .where("id", "==", thisRow.id)
            .get()
            .then((querySnapshot) =>
              querySnapshot.forEach((doc) =>
                db
                  .collection("transactions")
                  .doc(user.email)
                  .collection("transactions")
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
