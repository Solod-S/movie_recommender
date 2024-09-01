import React from "react";
import { FormattedMessage } from "react-intl";

const translate = (id, value = {}) => {
  console.log(`id, value`, id, value);
  return <FormattedMessage id={id} values={{ ...value }} />;
};

export default translate;
