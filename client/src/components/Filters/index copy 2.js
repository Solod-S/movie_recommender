import React, { useCallback } from "react";
import { Paper, Box, TextField, IconButton } from "@mui/material";
import { Form } from "react-final-form";
import debounce from "lodash.debounce";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { GET_GENRES_QUERY } from "./queries";
import { useQuery } from "@apollo/client";

const Filters = ({ initialValues, onSubmit, years }) => {
  const { data: genres } = useQuery(GET_GENRES_QUERY);

  const debouncedSubmit = useCallback(
    debounce(values => {
      onSubmit(values);
    }, 500), // Увеличьте задержку, если нужно
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

          const handleSearchChange = event => {
            form.change("search", event.target.value);
            debouncedSubmit(form.getState().values);
          };

          const toggleSortDirection = () => {
            const newOrder = values.sortDirection === "asc" ? "desc" : "asc";
            form.change("sortDirection", newOrder);
            form.submit();
          };

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
                  {/* Your other fields here */}
                  <IconButton
                    onClick={toggleSortDirection}
                    disabled={values.sortBy === "" || disableFields}
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
