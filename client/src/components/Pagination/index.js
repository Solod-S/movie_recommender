import * as React from "react";

import { Pagination } from "@mui/material";

const Paginator = ({ page, paginationHandler, totalPages }) => {
  return (
    <Pagination count={totalPages} page={page} onChange={paginationHandler} />
  );
};
export default Paginator;
