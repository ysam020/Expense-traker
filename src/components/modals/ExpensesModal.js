import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../../styles/expenses-modal.scss";
import AddExpenseForm from "../../forms/AddExpenseForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function ExpensesModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Add Expense</h3>
          <div className="add-expense-form">
            <AddExpenseForm handleClose={props.handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
