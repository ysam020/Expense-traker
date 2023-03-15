import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import * as yup from "yup";
import db from "../firebase/firebase";
import cryptoRandomString from "crypto-random-string";
import { UserContext } from "../context/Context";
import { goalsList } from "../assets/data/GoalsList";
import firebase from "firebase/app";

const AddGoalForm = (props) => {
  const user = useContext(UserContext);

  const randomId = cryptoRandomString({ length: 8, type: "numeric" });

  const validationSchema = yup.object({
    title: yup.string("Enter a title").required("Title is required"),
    target: yup.string("Enter target").required("Target is required"),
    alreadySaved: yup
      .string("Enter already saved")
      .required("Already saved is required"),
    date: yup.string("Enter target date").required("Target date is required"),
  });

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

    validationSchema: validationSchema,

    onSubmit: (values) => {
      db.collection("goals")
        .doc(user.email)
        .collection("goals")
        .add({
          id: randomId,
          title: values.title,
          target: values.target,
          alreadySaved: values.alreadySaved,
          date: new Date(values.date),
          note: values.note,
          achieved: values.alreadySaved > values.target ? true : false,
        });

      db.collection("activities")
        .doc(user.email)
        .collection("activities")
        .add({
          title: `You added a goal: ${values.title}`,
          date: firebase.firestore.Timestamp.now(),
        });

      props.handleClose();
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
