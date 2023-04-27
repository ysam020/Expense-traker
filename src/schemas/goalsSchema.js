import * as yup from "yup";

export const goalsSchema = yup.object({
  title: yup.string("Enter a title").required("Title is required"),
  target: yup.string("Enter target").required("Target is required"),
  alreadySaved: yup
    .string("Enter already saved")
    .required("Already saved is required"),
  date: yup.string("Enter target date").required("Target date is required"),
});
