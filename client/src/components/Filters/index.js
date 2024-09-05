import React, { useCallback } from "react";
import {
  Paper,
  MenuItem,
  Box,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import debounce from "lodash.debounce";

const Filters = ({ onSubmit, genres, years }) => {
  // Создаём дебаунсированную функцию для вызова onSubmit
  const debouncedSubmit = useCallback(
    debounce(values => {
      onSubmit(values);
    }, 300), // 300 миллисекунд задержки
    [onSubmit]
  );

  return (
    <Paper style={{ padding: "10px" }}>
      <Form
        onSubmit={onSubmit}
        initialValues={{ genre: "", year: "", search: "" }}
        render={({ handleSubmit, form, submitting, pristine, values }) => {
          const handleChange = name => event => {
            form.change(name, event.target.value);
            form.submit();
          };

          // Обработчик изменения инпута поиска
          const handleSearchChange = event => {
            form.change("search", event.target.value);
            debouncedSubmit(form.getState().values);
          };

          return (
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                flexDirection="row"
                gap="20px"
                alignItems="center"
                justifyContent="space-between"
              >
                <div>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Search"
                    variant="outlined"
                    fullWidth
                    onChange={handleSearchChange}
                    inputProps={{
                      style: {
                        padding: "7px",
                        textAlign: "center",
                        minWidth: "320px",
                      },
                    }}
                  />
                </div>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <div style={{ marginRight: "10px" }}>
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
              </Box>
            </form>
          );
        }}
      />
    </Paper>
  );
};

export default Filters;
