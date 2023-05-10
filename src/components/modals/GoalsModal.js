import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../../styles/expenses-modal.scss";
import AddGoalForm from "../../forms/AddGoalForm";

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

export default function GoalsModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Add Goal</h3>
          <div className="add-goal-form">
            <AddGoalForm handleClose={props.handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
