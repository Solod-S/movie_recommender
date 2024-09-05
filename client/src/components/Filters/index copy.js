import React from "react";
import {
  Paper,
  MenuItem,
  Button,
  Box,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Form, Field } from "react-final-form";

const Filters = ({ onSubmit, genres, years }) => {
  return (
    <Paper style={{ padding: "10px" }}>
      <Form
        onSubmit={onSubmit}
        initialValues={{ genre: "", year: "" }} // начальные значения пустые
        render={({ handleSubmit, form, submitting, pristine }) => {
          // Обработчик изменения значений
          const handleChange = name => event => {
            form.change(name, event.target.value);
            form.submit();
          };

          return (
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                flexDirection="row"
                gap="20px"
                alignItems="center"
                justifyContent="end"
              >
                <div>
                  <FormControl fullWidth style={{ minWidth: "120px" }}>
                    <InputLabel shrink>Genre</InputLabel>
                    <Field name="genre">
                      {({ input }) => (
                        <Select
                          {...input}
                          value={input.value || ""}
                          label="Genre"
                          displayEmpty
                          onChange={handleChange("genre")}
                          inputProps={{
                            style: { padding: "7px" },
                          }}
                          MenuProps={{
                            PaperProps: {
                              style: { padding: "0px" },
                            },
                          }}
                          sx={{
                            ".MuiSelect-select": {
                              padding: "7px",
                            },
                          }}
                        >
                          <MenuItem value="">
                            <em>All Genres</em>
                          </MenuItem>
                          {genres.map(genre => (
                            <MenuItem key={genre.id} value={genre.id}>
                              {genre.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </Field>
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth style={{ minWidth: "120px" }}>
                    <InputLabel shrink>Year</InputLabel>
                    <Field name="year">
                      {({ input }) => (
                        <Select
                          {...input}
                          value={input.value || ""}
                          label="Year"
                          displayEmpty
                          onChange={handleChange("year")}
                          inputProps={{
                            style: { padding: "7px" },
                          }}
                          MenuProps={{
                            PaperProps: {
                              style: { padding: "0px" },
                            },
                          }}
                          sx={{
                            ".MuiSelect-select": {
                              padding: "7px",
                            },
                          }}
                        >
                          <MenuItem value="">
                            <em>All Years</em>
                          </MenuItem>
                          {years.map(year => (
                            <MenuItem key={year} value={year}>
                              {year}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </Field>
                  </FormControl>
                </div>
              </Box>
            </form>
          );
        }}
      />
    </Paper>
  );
};

export default Filters;
