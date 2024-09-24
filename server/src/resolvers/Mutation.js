const {
  generateAccessToken,
  hashPassword,
  comparePassword,
  generateRefreshToken,
  getTokenPayload,
} = require("../utils");

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
      throw new Error("User with this email already exists.");
    }

    throw new Error(`Registration error: ${error.message}`);
  }
};

const updateUser = async (parent, args, context) => {
  const { email, password, name } = args;
  const { userId } = context;

  const user = await context.prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("User not found.");
  }
  let hashedPassword;
  if (password) hashedPassword = await hashPassword(args.password, 10);

  const updatedUser = await context.prisma.user.update({
    where: { id: userId },
    data: {
      email: email || user.email,
      password: hashedPassword || user.password,
      name: name || user.name,
    },
  });

  return updatedUser;
};

const login = async (parent, args, context, info) => {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const valid = await comparePassword(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });
  return {
    accessToken,
    refreshToken,
    user,
  };
};

const removeUser = async (parent, args, context, info) => {
  const { userId } = context;
  const dellUserId = args.id;
  console.log(`dellUserId`, args.id);
  const user = await context.prisma.user.findUnique({
    where: { id: dellUserId },
  });
  if (!user) {
    throw new Error("User not found.");
  }

  if (user.id !== userId) {
    throw new Error("You are not authorized to delete this user");
  }

  const deletedUser = await context.prisma.user.delete({
    where: { id: dellUserId },
  });

  return deletedUser;
};

const refreshTokens = async (parent, args, context, info) => {
  const { userId } = await getTokenPayload(args.refreshToken);
  const user = await context.prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found.");
  }
  const accessToken = generateAccessToken({ userId: Number(args.id) });
  const refreshToken = generateRefreshToken({ userId: Number(args.id) });

  return {
    accessToken,
    refreshToken,
    user,
  };
};

// collection
const saveMovie = async (parent, { movie }, context, info) => {
  try {
    if (!context.userId) {
      throw new Error("Unauthorized.");
    }

    console.log(`context`, context.userId);
    const user = await context.prisma.user.findUnique({
      where: { id: context.userId },
    });
    if (!user) {
      throw new Error("User not found.");
    }
    console.log(`movie`, context.userId);
    const newSavedMovie = await context.prisma.savedMovie.create({
      data: {
        movieId: movie.id,
        title: movie.title,
        releaseDate: movie.releaseDate,
        posterPath: movie.posterPath,
        genres: movie.genres,
        adult: movie.adult,
        backdropPath: movie.backdropPath,
        originalLanguage: movie.originalLanguage,
        originalTitle: movie.originalTitle,
        overview: movie.overview,
        popularity: movie.popularity,
        video: movie.video,
        voteAverage: movie.voteAverage,
        voteCount: movie.voteCount,
        userId: context.userId,
      },
    });
    return newSavedMovie;
  } catch (error) {
    throw new Error(`Save movie error: ${error.message}`);
  }
};

module.exports = {
  signUp,
  updateUser,
  login,
  removeUser,
  refreshTokens,
  saveMovie,
};
