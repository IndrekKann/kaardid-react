import * as Yup from "yup";

const ValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required!")
    .max(10, "Name must be shorter than 10 characters!"),
  code: Yup.string().length(6, "Game code must be 6 characters long!"),
});

export default ValidationSchema;
