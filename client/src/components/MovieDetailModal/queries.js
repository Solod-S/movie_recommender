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

const CASTS_BY_ID_QUERY = gql`
  query CreditsById($id: Int) {
    creditsById(id: $id) {
      adult
      castId
      character
      creditId
      gender
      id
      knownForDepartment
      name
      order
      originalName
      popularity
      posterPath
    }
  }
`;

const REVIEWS_BY_ID_QUERY = gql`
  query Reviews($filter: ReviewsFilterInput!) {
    reviews(filter: $filter) {
      page
      results {
        author
        authorDetails {
          name
          username
          avatar_path
          rating
        }
        content
        createdAt
        id
        updatedAt
        url
      }
      totalPages
      totalResults
    }
  }
`;

export {
  MOVIE_DETAIL_BY_ID_QUERY,
  TRAILERS_BY_ID_QUERY,
  CASTS_BY_ID_QUERY,
  REVIEWS_BY_ID_QUERY,
};
