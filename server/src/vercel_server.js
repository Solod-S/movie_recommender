const { ApolloServer } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const fs = require("fs");
const express = require("express");
const http = require("http");
const path = require("path");

const prisma = new PrismaClient();

const context = ({ req }) => ({
  locale: req?.headers?.locale || "en-US",
  prisma,
  userId: req?.headers?.authorization ? getUserId(req) : null,
});

const resolvers = {
  Query: require("./resolvers/Query"),
  Mutation: require("./resolvers/Mutation"),
};

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    csrfPrevention: true,
    cache: "bounded",
  });

  await server.start();
  server.applyMiddleware({ app });

  app.use(cors());
  app.use(express.static(path.join(__dirname, "../../client/build")));

  app.get("/rest", (req, res) => {
    res.json({ data: "res" });
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
  });

  await new Promise(resolve =>
    httpServer.listen(process.env.PORT || 4000, resolve)
  );
  console.log(`🚀 Server ready at ${server.graphqlPath}`);
};

startApolloServer(typeDefs, resolvers);
