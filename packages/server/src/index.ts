import { URLSearchParams } from 'url';
import { prisma, Prisma } from './generated/prisma-client';
import { GraphQLServer } from 'graphql-yoga';
import { config } from 'dotEnv';
import * as userQueries from './queries/user';
import { scopes, fetchAccountResource } from './spotify';

config();

interface Context {
  prisma: Prisma;
}

const resolvers = {
  Query: {
    ...userQueries,
  },
  Mutation: {
    createUser(root, args, context) {
      return context.prisma.createUser({ name: args.name });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => {
    const accessKey = req.request.headers.authorization;

    console.log('accessKey is', accessKey);

    return {
      prisma,
      accessKey,
    };
  },
});

const REDIRECT_URI = encodeURIComponent('http://localhost:4000/auth-callback');

server.express.get('/authorize', (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${
      process.env.CLIENT_ID
    }&scope=${encodeURIComponent(scopes)}&redirect_uri=${REDIRECT_URI}`,
  );
});

server.express.get('/auth-callback', async (req, res) => {
  const { code } = req.query;

  const body = new URLSearchParams({
    code,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:4000/auth-callback',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });

  try {
    const authResp = await fetchAccountResource<{
      access_token: string;
      refresh_token: string;
    }>('/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    console.log('authREsp is', authResp);

    res.redirect(
      process.env.CLIENT_HOST +
        `/auth?token=${authResp.access_token}&refreshToken=${
          authResp.refresh_token
        }
    `,
    );
  } catch (err) {
    console.log('error', err);
    throw new Error('yo');
  }

  res.end();
});

console.log('resolvers is', resolvers);

server.start(() => console.log('Server is running on http://localhost:4000'));
