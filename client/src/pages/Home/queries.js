import { gql, useQuery } from "@apollo/client";

const MOVIES_QUERY = gql`
  query {
    movies {
      page
      totalResults
      totalPages
      results {
        releaseDate(format: "dd MMM YYY")
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
