import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import cryptoRandomString from "crypto-random-string";
import { UserContext } from "../context/Context";
import { goalsList } from "../assets/data/GoalsList";
import { addGoals } from "../utils/addGoals";
import { goalsSchema } from "../schemas/goalsSchema";

const AddGoalForm = (props) => {
  const user = useContext(UserContext);

  const randomId = cryptoRandomString({ length: 8, type: "numeric" });

  const formik = useFormik({
    initialValues: {
      id: randomId,
      title: "New Car",
      target: "",
      alreadySaved: "",
      date: "",
      note: "",
      achieved: false,
    },

    validationSchema: goalsSchema,

    onSubmit: (values) => {
      addGoals(user, values, randomId, props.handleClose);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        select
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="title"
        name="title"
        label="What are you saving for?"
        defaultValue="New Car"
        onChange={formik.handleChange}
      >
        {goalsList.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="target"
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
        name="target"
        label="Target amount"
        value={formik.values.target}
        onChange={formik.handleChange}
        error={formik.touched.target && Boolean(formik.errors.target)}
        helperText={formik.touched.target && formik.errors.target}
      />

      <TextField
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="alreadySaved"
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
        name="alreadySaved"
        label="Already Saved"
        value={formik.values.alreadySaved}
        onChange={formik.handleChange}
        error={
          formik.touched.alreadySaved && Boolean(formik.errors.alreadySaved)
        }
        helperText={formik.touched.alreadySaved && formik.errors.alreadySaved}
      />

      <TextField
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="amount"
        type="date"
        name="date"
        className="date-picker"
        defaultValue={formik.values.date}
        onChange={formik.handleChange}
        error={formik.touched.date && Boolean(formik.errors.date)}
        helperText={formik.touched.date && formik.errors.date}
      />

      <TextField
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="note"
        name="note"
        label="Note"
        value={formik.values.note}
        onChange={formik.handleChange}
      />

      <Button fullWidth type="submit" className="modal-form-btn add-goal-btn">
        Submit
      </Button>
    </form>
  );
};

export default AddGoalForm;
