import { DataGrid } from "@mui/x-data-grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "../styles/transactions.scss";
import ExpensesModal from "./modals/ExpensesModal";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { expensesColumnData } from "../assets/data/ExpensesColumnData";
import { UserContext } from "../context/Context";
import { getExpenses } from "../utils/getExpensesFromTransaction";

export default function Transactions() {
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
      <h2>Transactions</h2>
      <div style={{ height: "auto", width: "100%" }}>
        <DataGrid
          sx={{
            padding: "0 30px",
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f8f5ff",
            },
          }}
          className="table expense-table"
          headerAlign="center"
          rows={rows}
          columns={expensesColumnData(user)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          rowHeight={50}
          autoHeight={true}
          disableColumnMenu={true}
          disableSelectionOnClick
        />
      </div>
      <Tooltip title="Add Expense">
        <Fab
          onClick={handleOpen}
          color="primary"
          aria-label="add"
          className="fab add-expense"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <ExpensesModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </div>
  );
}
