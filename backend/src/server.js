// server/server.js
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("../graphql/schema/schema");
const { PrismaClient } = require("./generated/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
// Middleware to inject Prisma into the context for each GraphQL resolver
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: { prisma: req.prisma },
  }))
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
