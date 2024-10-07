import React from "react";

import { AuthModal } from "../components";

export default {
  title: "System/AuthModal",
  component: AuthModal,
  tags: ["autodocs"],
};

const Template = args => <AuthModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
};
