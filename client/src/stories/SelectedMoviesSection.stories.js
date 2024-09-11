import { fn } from "@storybook/test";
import { SelectedMoviesSection } from "../components";
import { movies } from "./stub";

// Default export for Storybook configuration
export default {
  title: "Card/Selected Movies List",
  component: SelectedMoviesSection,
  parameters: {
    layout: "centered", // Center the component in the Storybook canvas
  },
  tags: ["autodocs"],
  argTypes: {
    // Actions to simulate user events, allowing you to track interactions in Storybook
    onCardDelete: { action: "onCardDelete" }, // Track delete action
    selectedMovies: {
      control: { type: "array" }, // Control to allow editing the movies array directly in Storybook
      description: "Array of selected movies to display in the section",
    },
  },
  args: {
    onCardDelete: fn(), // Default function to spy on delete actions
  },
};

// Story with movies
export const Primary = {
  args: {
    selectedMovies: movies, // Use the predefined movies array for this story
  },
};

// Story with an empty movie list
export const Empty = {
  args: {
    selectedMovies: [], // Empty array to simulate no selected movies
  },
};
