import { render, act, screen } from "@testing-library/react";
import { useSavedMovies } from "./index";
import { AppContext } from "../../providers/appContext";
import { MockedProvider } from "@apollo/client/testing"; // Мокаем Apollo Client
import { GET_SAVED_MOVIES, SAVE_MOVIE, REMOVE_MOVIE } from "./queries";

const mockSavedMovies = [];

const mocks = [
  {
    request: {
      query: GET_SAVED_MOVIES,
      variables: { page: 1, all: true },
    },
    result: {
      data: {
        getSavedMovies: {
          results: mockSavedMovies,
          page: 1,
          totalResults: 0,
          totalPages: 1,
        },
      },
    },
  },
  {
    request: {
      query: SAVE_MOVIE,
      variables: {
        movie: {
          id: 3,
          title: "New Movie",
          releaseDate: "2023-09-25",
          genres: [],
          image: "https://example.com/image.jpg",
          adult: false,
          backdropPath: "path/to/backdrop.jpg",
          originalLanguage: "en",
          originalTitle: "New Movie Original Title",
          overview: "Description of the movie",
          popularity: 10.0,
          video: false,
          voteAverage: 0,
          voteCount: 0,
        },
      },
    },
    result: {
      data: {
        saveMovie: {
          id: 3,
          movieId: "",
          title: "New Movie",
          releaseDate: "2023-09-25",
          image: "https://example.com/image.jpg",
          voteAverage: 0,
          voteCount: 0,
        },
      },
    },
  },
  {
    request: {
      query: REMOVE_MOVIE,
      variables: { id: 3 },
    },
    result: {
      data: {
        removeMovie: {
          id: "6702485e66eb3d7998ad923a",
        },
      },
    },
  },
];

// Компонент для тестирования хуков
const TestComponent = () => {
  const { savedMovies, addMovieToSaved, removeMovieFromSaved } =
    useSavedMovies();

  return (
    <div>
      <div data-testid="movies">{JSON.stringify(savedMovies)}</div>
      <button
        onClick={() =>
          addMovieToSaved({
            id: 3,
            title: "New Movie",
            releaseDate: "2023-09-25",
            genres: [],
            image: "https://example.com/image.jpg",
            adult: false,
            backdropPath: "path/to/backdrop.jpg",
            originalLanguage: "en",
            originalTitle: "New Movie Original Title",
            overview: "Description of the movie",
            popularity: 10.0,
            video: false,
            voteAverage: 0,
            voteCount: 0,
          })
        }
      >
        Add Movie
      </button>
      <button onClick={() => removeMovieFromSaved({ id: 3 })}>
        Remove Movie
      </button>
    </div>
  );
};

describe("useSavedMovies", () => {
  const contextValue = {
    state: {
      user: {
        accessToken: "your_access_token",
        refreshToken: "your_refresh_token",
        user: {
          id: "66f432afcb4fa9476faefd4b",
          name: "Sergey Solod",
          email: "s.solod@megabite.com.ua",
          savedMovies: [],
        },
      },
    },
  };

  it("should fetch saved movies when user exists", async () => {
    render(
      <AppContext.Provider value={contextValue}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <TestComponent />
        </MockedProvider>
      </AppContext.Provider>
    );

    const movies = await screen.findByTestId("movies");
    expect(movies).toHaveTextContent(JSON.stringify(mockSavedMovies));
  });

  it("should add a movie to saved movies", async () => {
    render(
      <AppContext.Provider value={contextValue}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <TestComponent />
        </MockedProvider>
      </AppContext.Provider>
    );

    // Действие: добавляем фильм
    act(() => {
      screen.getByText("Add Movie").click();
    });
  });

  it("should remove a movie from saved movies", async () => {
    render(
      <AppContext.Provider value={contextValue}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <TestComponent />
        </MockedProvider>
      </AppContext.Provider>
    );

    // Сначала добавляем фильм
    act(() => {
      screen.getByText("Add Movie").click();
    });

    // Проверяем, что фильм добавлен
    expect(screen.getByTestId("movies")).toHaveTextContent(/New Movie/);

    // Удаляем фильм
    act(() => {
      screen.getByText("Remove Movie").click();
    });

    // Проверяем, что фильм удален
    expect(screen.getByTestId("movies")).toHaveTextContent("[]");
  });
});
