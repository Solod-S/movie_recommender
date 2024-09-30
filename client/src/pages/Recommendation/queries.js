import { gql } from "@apollo/client";

const MOVIES_BY_IDS_QUERY = gql`
  query MoviesByIds($ids: [Int]) {
    moviesByIds(ids: $ids) {
      releaseDate(format: "dd MMM yyy")
      # image: posterPath
      title
      id
      adult
      backdropPath
      originalLanguage
      originalTitle
      overview
      popularity
      video
      voteAverage
      voteCount
    }
  }
`;

export { MOVIES_BY_IDS_QUERY };
