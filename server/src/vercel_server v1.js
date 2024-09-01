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
  playground: true,
});

server.start().then(() => {
  const handler = server.createHandler({ path: "/api/graphql" });

  const port = process.env.PORT || 4000;

  require("http")
    .createServer(
      cors((req, res) =>
        req.method === "OPTIONS" ? send(res, 200, "ok") : handler(req, res)
      )
    )
    .listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/api/graphql`);
    });
});
