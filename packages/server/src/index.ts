import { prisma, Prisma } from './generated/prisma-client';
import { GraphQLServer } from 'graphql-yoga';

interface Context {
  prisma: Prisma;
}

const resolvers = {
  Mutation: {
    createUser(root, args, context) {
      return context.prisma.createUser({ name: args.name });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    prisma,
  },
});

server.start(() => console.log('Server is running on http://localhost:4000'));
