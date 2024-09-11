import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Paginator } from "../components";

export default {
  title: "System/Paginator",
  component: Paginator,
  tags: ["autodocs"],
};

const Template = args => {
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Paginator {...args} page={page} paginationHandler={handleChange} />
      <div>Current Page: {page}</div>
    </Stack>
  );
};

export const Default = Template.bind({});
Default.args = {
  count: 10, // Общее количество страниц
  page: 1, // Текущая страница
};

export const LargePageCount = Template.bind({});
LargePageCount.args = {
  totalPages: 500, // Пример с большим количеством страниц
  page: 1, // Текущая страница
};
