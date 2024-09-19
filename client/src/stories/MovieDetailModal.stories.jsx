import React from "react";
import MovieDetailModal from "../components/MovieDetailModal";
import { action } from "@storybook/addon-actions";

export default {
  title: "Card/Movie Card Detail",
  component: MovieDetailModal,
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "closed" },
    selectMovie: { action: "selected" },
    deleteMovie: { action: "deleted" },
  },
};

const Template = args => <MovieDetailModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
  movieId: "533535",
  isPreviewMode: false,
  selectedMovies: [],
  selectMovie: action("selectMovie"),
  deleteMovie: action("deleteMovie"),
  onClose: action("onClose"),
};
