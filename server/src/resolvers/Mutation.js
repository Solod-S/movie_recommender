const {
  generateAccessToken,
  hashPassword,
  comparePassword,
  generateRefreshToken,
  getTokenPayload,
} = require("../utils");
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} = require("apollo-server-errors");

// auth
const signUp = async (parent, args, context, info) => {
  try {
    const password = await hashPassword(args.password, 10);

    const user = await context.prisma.user.create({
      data: { ...args, password },
    });

    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

    return {
      accessToken,
      refreshToken,
      user,
    };
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target === "User_email_key") {
      throw new UserInputError("User with this email already exists.");
    }

    throw new Error(`Registration error: ${error.message}`);
  }
};

const updateUser = async (parent, args, context) => {
  try {
    const { email, password, name } = args;
    const { userId } = context;

    const user = await context.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UserInputError("User not found.");
    }

    let hashedPassword;
    if (password) hashedPassword = await hashPassword(password, 10);

    const updatedUser = await context.prisma.user.update({
      where: { id: userId },
      data: {
        email: email || user.email,
        password: hashedPassword || user.password,
        name: name || user.name,
      },
    });

    return updatedUser;
  } catch (error) {
    throw new Error(`Update user error: ${error.message}`);
  }
};

const login = async (parent, args, context, info) => {
  try {
    const user = await context.prisma.user.findUnique({
      where: { email: args.email },
    });

    if (!user) {
      throw new UserInputError("User not found.");
    }

    const valid = await comparePassword(args.password, user.password);
    if (!valid) {
      throw new AuthenticationError("Invalid password");
    }

    const movies = await context.prisma.savedMovie.findMany({
      where: { userId: user.id },
    });

    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

    return {
      accessToken,
      refreshToken,
      user: { ...user, savedMovies: movies || [] },
    };
  } catch (error) {
    throw new Error(`Login error: ${error.message}`);
  }
};

const removeUser = async (parent, args, context, info) => {
  try {
    const { userId } = context;
    const dellUserId = args.id;

    const user = await context.prisma.user.findUnique({
      where: { id: dellUserId },
    });

    if (!user) {
      throw new UserInputError("User not found.");
    }

    if (user.id !== userId) {
      throw new ForbiddenError("You are not authorized to delete this user");
    }

    const deletedUser = await context.prisma.user.delete({
      where: { id: dellUserId },
    });

    return deletedUser;
  } catch (error) {
    throw new Error(`User remove error: ${error.message}`);
  }
};

const refreshTokens = async (parent, args, context, info) => {
  try {
    const { userId } = await getTokenPayload(args.refreshToken);
    const user = await context.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UserInputError("User not found.");
    }

    const accessToken = generateAccessToken({ userId });
    const refreshToken = generateRefreshToken({ userId });

    return {
      accessToken,
      refreshToken,
      user,
    };
  } catch (error) {
    throw new Error(`Refresh token error: ${error.message}`);
  }
};

// collection
const saveMovie = async (parent, { movie }, context, info) => {
  try {
    if (!context.userId) {
      throw new AuthenticationError("Unauthorized.");
    }

    const user = await context.prisma.user.findUnique({
      where: { id: context.userId },
    });

    if (!user) {
      throw new UserInputError("User not found.");
    }

    const newSavedMovie = await context.prisma.savedMovie.create({
      data: {
        movieId: movie.id,
        title: movie.title,
        releaseDate: movie.releaseDate,
        image: movie.image || "",
        genres: movie.genres || [],
        adult: movie.adult || false,
        backdropPath: movie.backdropPath || "",
        originalLanguage: movie.originalLanguage || "",
        originalTitle: movie.originalTitle || "",
        overview: movie.overview || "",
        popularity: movie.popularity || 0,
        video: movie.video || false,
        voteAverage: movie.voteAverage || 0,
        voteCount: movie.voteCount || 0,
        userId: context.userId,
      },
    });

    return newSavedMovie;
  } catch (error) {
    throw new Error(`Save movie error: ${error.message}`);
  }
};

const removeMovie = async (parent, args, context, info) => {
  try {
    if (!context.userId) {
      throw new AuthenticationError("Unauthorized.");
    }

    const user = await context.prisma.user.findUnique({
      where: { id: context.userId },
    });

    if (!user) {
      throw new UserInputError("User not found.");
    }

    const removedMovie = await context.prisma.savedMovie.delete({
      where: {
        movieId_userId: {
          movieId: args.id,
          userId: user.id,
        },
      },
    });

    return removedMovie;
  } catch (error) {
    throw new Error(`Remove movie error: ${error.message}`);
  }
};

module.exports = {
  signUp,
  updateUser,
  login,
  removeUser,
  refreshTokens,
  saveMovie,
  removeMovie,
};
