const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const fs = require("fs");
const express = require("express");
const http = require("http");
const path = require("path");

const context = ({ req, res }) => ({
  locale: req?.headers?.locale || "en-US",
});

const resolvers = { Query: require("./resolvers/Query") };

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

// Создаем сервер Apollo и Express приложение
const app = express();
const httpServer = http.createServer(app);

// Настройки CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: [
      "X-CSRF-Token",
      "X-Requested-With",
      "Accept",
      "Accept-Version",
      "Content-Length",
      "Content-MD5",
      "Content-Type",
      "Date",
      "X-Api-Version",
      "locale",
    ],
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Используем абсолютные пути
  const clientBuildPath = path.join(__dirname, "../../client/build");
  const publicPath = path.join(__dirname, "public");

  // Проверяем, что пути существуют
  if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
  } else {
    console.warn(`Client build path does not exist: ${clientBuildPath}`);
  }

  if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
  } else {
    console.warn(`Public path does not exist: ${publicPath}`);
  }

  // Пример REST endpoint
  app.get("/rest", (req, res) => {
    res.json({ data: "res" });
  });

  // Обработка всех остальных запросов
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// Вызываем функцию старта сервера
startServer();

// Экспортируем обработчик Express для Vercel
module.exports = app;
