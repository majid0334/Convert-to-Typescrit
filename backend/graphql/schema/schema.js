// graphql/schema.js
const { makeExecutableSchema } = require("graphql-tools");
const taskResolvers = require("../resolvers/taskResolvers");

const typeDefs = `
  type Task {
    id: Int
    title: String
    completed: Boolean
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    createTask(title: String!): Task
    updateTask(id: Int!, title: String, completed: Boolean): Task
    deleteTask(id: Int!): Task
    toggleTask(id: Int!): Task
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: taskResolvers,
});

module.exports = schema;
