import { gql } from "@apollo/client";

const GET_GENRES_QUERY = gql`
  query Genres {
    genres {
      id
      name
    }
  }
`;

export { GET_GENRES_QUERY };
