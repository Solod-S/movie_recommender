const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server-core");
const { APP_SECRET, JWT_ACCESS_EXPIRATION, JWT_REFRESH_EXPIRATION } =
  process.env;

const getTokenPayload = token => {
  try {
    const userData = jwt.verify(token, APP_SECRET);

    return userData;
  } catch (error) {
    throw error;
  }
};

const getUserId = (req, authToken) => {
  try {
    if (req) {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");

        if (!token) {
          throw new Error("No token found");
        }

        const { userId } = getTokenPayload(token);

        return userId;
      }
    } else if (authToken) {
      const { userId } = getTokenPayload(authToken);
      return userId;
    }

    throw new AuthenticationError("Not authenticated", "getUserId");
  } catch (error) {
    throw new AuthenticationError("Not authenticated", "getUserId");
  }
};

const generateAccessToken = payload => {
  return jwt.sign(payload, APP_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRATION,
  });
};

const generateRefreshToken = payload => {
  return jwt.sign(payload, APP_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRATION,
  });
};

const hashPassword = async password => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  APP_SECRET,
  JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION,
  getUserId,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  comparePassword,
  getTokenPayload,
};
