import * as yup from "yup";

export const transactionsSchema = yup.object({
  title: yup.string("Enter a title").required("Title is required"),
  category: yup.string("Enter a category").required("Category is required"),
  amount: yup.string("Enter amount").required("Amount is required"),
  date: yup.string("Enter your date").required("Date is required"),
});
