import { gql } from "@apollo/client";

const MOVIE_DETAIL_BY_ID_QUERY = gql`
  query MoviesByIds($ids: [Int]) {
    moviesByIds(ids: $ids) {
      releaseDate(format: "dd MMM yyy")
      image: posterPath
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
      genres {
        id
        name
      }
    }
  }
`;

const TRAILERS_BY_ID_QUERY = gql`
  query TrailersById($id: Int) {
    trailersById(id: $id) {
      key
      site
      type
    }
  }
`;

export { MOVIE_DETAIL_BY_ID_QUERY, TRAILERS_BY_ID_QUERY };
