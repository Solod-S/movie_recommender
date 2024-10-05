import { Fragment } from "react";
import PropTypes from "prop-types";
import { IntlProvider } from "react-intl";
import { flatten } from "flat";

import messages from "../../messages";
import { LOCALES } from "../../constants";

const Provider = ({ children, locale = LOCALES.ENGLISH }) => {
  return (
    <IntlProvider
      textComponent={Fragment}
      locale={locale}
      messages={flatten(messages[locale])}
    >
      {children}
    </IntlProvider>
  );
};

Provider.displayName = "I18nProvider";

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  locale: PropTypes.oneOf(Object.values(LOCALES)),
};

export default Provider;
