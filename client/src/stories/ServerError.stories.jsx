import React from "react";
import ServerError from "../components/ServerErrorSection";

export default {
  title: "System/Server Error",
  component: ServerError,
  tags: ["autodocs"],
};

const Template = args => <ServerError {...args} />;

export const Default = Template.bind({});
