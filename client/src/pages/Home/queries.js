import { gql, useQuery } from "@apollo/client";

const MOVIES_QUERY = gql`
  query Movies($page: Int) {
    movies(page: $page) {
      page
      totalResults
      totalPages
      results {
        releaseDate(format: "dd MMM yyy")
        image: posterPath
        title
        id
        # adult
        # backdropPath
        # originalLanguage
        # originalTitle
        # overview
        # popularity
        # video
        # voteAverage
        # voteCount
      }
    }
  }
`;

export { MOVIES_QUERY };
