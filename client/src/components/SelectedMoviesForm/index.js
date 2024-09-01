import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { Form, Field } from "react-final-form";
import { useIntl } from "react-intl";

const required = value => (value ? undefined : "Required");

const SelectedMoviesForm = ({ onSubmit }) => {
  const intl = useIntl(); // Get access to the intl instance

  return (
    <Form
      // validate={values => {
      //   const errors = {};
      //   if (!values.listName) {
      //     errors.listName = "Required";
      //   }

      //   return errors;
      // }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
            <Field
              name="listName"
              validate={required}
              render={({ input, meta }) => (
                <>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={intl.formatMessage({
                      id: "put_the_list_name",
                    })}
                    inputProps={{ "aria-label": "put list name" }}
                    {...input}
                  />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </>
              )}
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <IconButton
              type="submit"
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
            >
              <CheckIcon />
            </IconButton>
          </Paper>
        </form>
      )}
    />
  );
};

export default SelectedMoviesForm;