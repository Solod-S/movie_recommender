import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
      accessToken
      refreshToken
      user {
        id
        name
        email
        savedMovies {
          id
          title
          releaseDate(format: "dd.MM.yyyy")
          image
          genres
          adult
          backdropPath
          originalLanguage
          originalTitle
          overview
          popularity
          video
          voteAverage
          voteCount
          userId
        }
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        id
        name
        email
        savedMovies {
          id
          title
          releaseDate(format: "dd.MM.yyyy")
          image
          genres
          adult
          backdropPath
          originalLanguage
          originalTitle
          overview
          popularity
          video
          voteAverage
          voteCount
          userId
        }
      }
    }
  }
`;
