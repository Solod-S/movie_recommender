const { ApolloServer } = require("apollo-server-micro");
const fs = require("fs");
const path = require("path");
const Cors = require("micro-cors");

const resolvers = { Query: require("./resolvers/Query") };

const cors = Cors({
  allowedMethods: ["GET", "POST", "OPTIONS"], // Добавлено для разрешения методов
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
  ],
  origin: "*", // Позволяет любые источники
  credentials: true, // Если требуется передача куки
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
    // Плагин для добавления Apollo Sandbox
    require("apollo-server-core").ApolloServerPluginLandingPageLocalDefault({
      embed: true,
    }),
  ],
});

const startServer = server.start();

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  ); // Добавлен необходимый заголовок
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.end(); // Завершить обработку для запросов OPTIONS
    return;
  }

  await startServer;
  return server.createHandler({ path: "/api/graphql" })(req, res);
};
