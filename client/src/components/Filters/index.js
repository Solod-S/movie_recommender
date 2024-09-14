import React, { useCallback } from "react";
import {
  Paper,
  MenuItem,
  Box,
  Select,
  InputLabel,
  FormControl,
  TextField,
  IconButton,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import debounce from "lodash.debounce";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

const Filters = ({ initialValues, onSubmit, genres, years }) => {
  // Debounced function for form submission
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    debounce(values => {
      onSubmit(values);
    }, 300),
    [onSubmit]
  );

  return (
    <Paper style={{ padding: "10px" }}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, form, values }) => {
          const handleChange = name => event => {
            form.change(name, event.target.value);
            if (name === "sortBy" && event.target.value === "") {
              form.change("sortDirection", "asc"); // Default to ascending if "Sort By" is default
            }
            form.submit();
          };

          // Handle search input change with debounced submit
          const handleSearchChange = event => {
            form.change("search", event.target.value);
            debouncedSubmit(form.getState().values);
          };

          // Toggle between ascending and descending order
          const toggleSortDirection = () => {
            const newOrder = values.sortDirection === "asc" ? "desc" : "asc";
            form.change("sortDirection", newOrder);
            form.submit();
          };

          // Disable other fields if search value is greater than 0
          const disableFields = values.search.length > 0;

          return (
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                flexWrap="wrap"
                flexDirection="row"
                gap="20px"
                alignItems="center"
                justifyContent="space-between"
              >
                <div>
                  <TextField
                    value={values.search || ""}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label={<FormattedMessage id="filters.search.label" />}
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
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap="20px"
                  flexDirection="row"
                  alignItems="center"
                  style={{
                    opacity: disableFields ? 0.4 : 1,
                    pointerEvents: disableFields ? "none" : "auto",
                  }}
                >
                  <div>
                    <FormControl fullWidth style={{ minWidth: "120px" }}>
                      <InputLabel shrink>
                        <FormattedMessage id="filters.genre.label" />
                      </InputLabel>
                      <Field name="genre">
                        {({ input }) => (
                          <Select
                            {...input}
                            value={input.value || ""}
                            label={
                              <FormattedMessage id="filters.genre.label" />
                            }
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
                            disabled={disableFields}
                          >
                            <MenuItem value="">
                              <em>
                                <FormattedMessage id="filters.genre.allGenres" />
                              </em>
                            </MenuItem>
                            {genres.map(genre => {
                              const id =
                                "filters.genre." +
                                genre.name
                                  .replace(/\s+/g, "")
                                  .charAt(0)
                                  .toLowerCase() +
                                genre.name.replace(/\s+/g, "").slice(1);
                              return (
                                <MenuItem key={genre.id} value={genre.id}>
                                  <FormattedMessage id={id} />
                                </MenuItem>
                              );
                            })}
                          </Select>
                        )}
                      </Field>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth style={{ minWidth: "120px" }}>
                      <InputLabel shrink>
                        <FormattedMessage id="filters.year.label" />
                      </InputLabel>
                      <Field name="year">
                        {({ input }) => (
                          <Select
                            {...input}
                            value={input.value || ""}
                            label={<FormattedMessage id="filters.year.label" />}
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
                            disabled={disableFields}
                          >
                            <MenuItem value="">
                              <em>
                                <FormattedMessage id="filters.year.allYears" />
                              </em>
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

                  <div>
                    <FormControl fullWidth style={{ minWidth: "150px" }}>
                      <InputLabel shrink>
                        <FormattedMessage id="filters.sortBy.label" />
                      </InputLabel>
                      <Field name="sortBy">
                        {({ input }) => (
                          <Select
                            {...input}
                            value={input.value || ""}
                            label={
                              <FormattedMessage id="filters.sortBy.label" />
                            }
                            displayEmpty
                            onChange={handleChange("sortBy")}
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
                            disabled={disableFields}
                          >
                            <MenuItem value="popularity">
                              <FormattedMessage id="filters.sortBy.popularity" />
                            </MenuItem>
                            <MenuItem value="release_date">
                              <FormattedMessage id="filters.sortBy.releaseDate" />
                            </MenuItem>
                            <MenuItem value="original_title">
                              <FormattedMessage id="filters.sortBy.title" />
                            </MenuItem>
                            <MenuItem value="vote_average">
                              <FormattedMessage id="filters.sortBy.voteAverage" />
                            </MenuItem>
                            <MenuItem value="vote_count">
                              <FormattedMessage id="filters.sortBy.voteCount" />
                            </MenuItem>
                          </Select>
                        )}
                      </Field>
                    </FormControl>
                  </div>
                  {/* Toggle for ascending/descending order */}
                  <IconButton
                    onClick={toggleSortDirection}
                    disabled={values.sortBy === "" || disableFields} // Disable button if "Sort By" is default or search is active
                  >
                    {values.sortDirection === "asc" ? (
                      <ArrowUpwardIcon />
                    ) : (
                      <ArrowDownwardIcon />
                    )}
                  </IconButton>
                </Box>
              </Box>
            </form>
          );
        }}
      />
    </Paper>
  );
};

Filters.propTypes = {
  initialValues: PropTypes.shape({
    page: PropTypes.number.isRequired,
    sortBy: PropTypes.oneOf([
      "popularity",
      "release_date",
      "original_title",
      "vote_average",
      "vote_count",
    ]).isRequired,
    sortDirection: PropTypes.oneOf(["asc", "desc"]).isRequired,
    search: PropTypes.string.isRequired,
    genre: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
    year: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
    primaryReleaseYear: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([null]),
    ]),
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  years: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Filters;
