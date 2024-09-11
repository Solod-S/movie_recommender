import { ConfirmModal } from "../components";

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL_DEV;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "System/ShareModal",
  component: ConfirmModal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onCardDelete arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onCardDelete: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    open: true,
    title: "My favorite movies",
    url: `${CLIENT_URL}recommend?title=My favorite movies&ids=945961,1160018,573435,533535`,
    onClose: () => {},
  },
};
