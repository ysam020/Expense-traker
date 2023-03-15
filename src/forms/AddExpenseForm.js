import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import * as yup from "yup";
import db from "../firebase/firebase";
import cryptoRandomString from "crypto-random-string";
import { UserContext } from "../context/Context";
import { categoryList } from "../assets/data/CategoryList";
import firebase from "firebase/app";

const AddExpenseForm = (props) => {
  const user = useContext(UserContext);

  const randomId = cryptoRandomString({ length: 8, type: "numeric" });

  const validationSchema = yup.object({
    title: yup.string("Enter a title").required("Title is required"),
    category: yup.string("Enter a category").required("Category is required"),
    amount: yup.string("Enter amount").required("Amount is required"),
    date: yup.string("Enter your date").required("Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "Food & Dining",
      description: "",
      amount: "",
      type: "Income",
      date: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      db.collection("transactions")
        .doc(user.email)
        .collection("transactions")
        .add({
          id: randomId,
          title: values.title,
          category: values.category,
          description: values.description,
          amount: values.amount,
          type: values.type.toLowerCase(),
          date: new Date(values.date),
        });

      db.collection("activities")
        .doc(user.email)
        .collection("activities")
        .add({
          title: `You added a transaction: ${values.title}`,
          date: firebase.firestore.Timestamp.now(),
        });

      props.handleClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />

      <TextField
        select
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="category"
        name="category"
        label="Category"
        defaultValue="Food & Dining"
        helperText="Please select your currency"
        onChange={formik.handleChange}
      >
        {categoryList.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <TextField
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="amount"
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
        name="amount"
        label="Amount"
        value={formik.values.amount}
        onChange={formik.handleChange}
        error={formik.touched.amount && Boolean(formik.errors.amount)}
        helperText={formik.touched.amount && formik.errors.amount}
      />
      <TextField
        select
        size="small"
        margin="dense"
        variant="filled"
        fullWidth
        id="type"
        name="type"
        label="Type"
        defaultValue="Income"
        onChange={formik.handleChange}
      >
        <MenuItem value="Income">Income</MenuItem>
        <MenuItem value="Expense">Expense</MenuItem>
      </TextField>
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

      <Button
        fullWidth
        type="submit"
        className="modal-form-btn add-expense-btn"
      >
        Submit
      </Button>
    </form>
  );
};

export default AddExpenseForm;
