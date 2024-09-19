import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "../src/providers/appContext";
import I18nProvider from "../src/providers/i18n";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <BrowserRouter>
        <AppContextProvider>
          <I18nProvider locale="en-us">
            <Story />
          </I18nProvider>
        </AppContextProvider>
      </BrowserRouter>
    ),
  ],
};

export default preview;
