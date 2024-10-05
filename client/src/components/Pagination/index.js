import { Pagination } from "@mui/material";
import PropTypes from "prop-types";

const Paginator = ({ page, totalPages, paginationHandler }) => {
  return (
    <Pagination count={totalPages} page={page} onChange={paginationHandler} />
  );
};

Paginator.protoTypes = {
  page: PropTypes.bool.number,
  totalPages: PropTypes.bool.number,
  paginationHandler: PropTypes.func,
};
export default Paginator;
