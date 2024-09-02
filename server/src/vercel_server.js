const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const helmet = require("helmet");
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

  // Использование Helmet для установки заголовков безопасности, включая CSP
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    })
  );

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

  // Настройка статических файлов для клиентской части
  app.use(express.static(path.join(__dirname, "../../client/build")));
  app.use(express.static("public"));

  // Пример REST endpoint
  app.get("/rest", (req, res) => {
    res.json({ data: "res" });
  });

  // Обработка всех остальных запросов
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
  });
}

// Вызываем функцию старта сервера
startServer();

// Экспортируем обработчик Express для Vercel
module.exports = app;
