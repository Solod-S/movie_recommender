import React from "react";
import { Filters } from "../components";
import { initialValues, genres, years } from "./stub";

export default {
  title: "System/Filters",
  component: Filters,
  parameters: {
    docs: {
      description: {
        component: `The \`Filters\` component allows users to filter items based on various criteria such as genre, year, and sort options. It uses React Final Form for handling form state and validation.`,
      },
    },
  },
  tags: ["autodocs"],
};

const Template = args => <Filters {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialValues,
  genres,
  years,
  onSubmit: values => {
    console.log("Submitted values:", values);
  },
};

export const WithSearch = Template.bind({});
WithSearch.args = {
  ...Default.args,
  initialValues: {
    ...initialValues,
    search: "Action",
  },
};
