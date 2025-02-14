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

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
    context,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  app.use(express.static(path.join(__dirname, "../../client/build")));
  app.use(express.static("public"));
  app.use(cors());
  app.get("/rest", (req, res) => {
    res.json({ data: "res" });
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
  });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(`🚀 Client ready at http://localhost:4000`);
};

startApolloServer(typeDefs, resolvers);
