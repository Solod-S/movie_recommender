const {
  generateAccessToken,
  hashPassword,
  comparePassword,
  generateRefreshToken,
  getTokenPayload,
} = require("../utils");

// auth
const signup = async (parent, args, context, info) => {
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
};

module.exports = {
  signup,
};
