// graphql/resolvers/taskResolvers.js
const taskResolvers = {
  Query: {
    tasks: async (_, __, { prisma }) => {
      return prisma.task.findMany();
    },
  },
  Mutation: {
    createTask: async (_, { title }, { prisma }) => {
      return prisma.task.create({
        data: {
          title,
          completed: false,
        },
      });
    },
    updateTask: async (_, { id, title, completed }, { prisma }) => {
      return prisma.task.update({
        where: { id },
        data: {
          title,
          completed,
        },
      });
    },
    deleteTask: async (_, { id }, { prisma }) => {
      return prisma.task.delete({
        where: { id },
      });
    },
    toggleTask: async (_, { id }, { prisma }) => {
      const task = await prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new Error(`Task with ID ${id} not found`);
      }

      return prisma.task.update({
        where: { id },
        data: { completed: !task.completed },
      });
    },
  },
};

module.exports = taskResolvers;
