import React from "react";
import { TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";

const JoinCreateTextField: React.FC<FieldAttributes<{}>> = (props) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      variant="outlined"
      type="input"
      autoComplete="off"
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default JoinCreateTextField;
