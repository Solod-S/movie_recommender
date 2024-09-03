const { ApolloServer } = require("apollo-server-micro");
const fs = require("fs");
const path = require("path");
const Cors = require("micro-cors");

const resolvers = { Query: require("./resolvers/Query") };

const cors = Cors({
  allowedMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: [
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Date",
    "X-Api-Version",
    "locale", // Добавлено сюда
  ],
  origin: "*",
  credentials: true,
});

const context = ({ req, res }) => ({
  locale: req?.headers?.locale || "en-US",
});

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context,
  introspection: true,
  plugins: [
    require("apollo-server-core").ApolloServerPluginLandingPageLocalDefault({
      embed: true,
    }),
  ],
});

const startServer = server.start();

module.exports = async (req, res) => {
  await startServer;

  // Применение CORS
  cors((req, res) => {
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, locale"
      );
      res.end();
      return;
    }

    // Основной обработчик запроса
    return server.createHandler({ path: "/api/graphql" })(req, res);
  })(req, res);
};
