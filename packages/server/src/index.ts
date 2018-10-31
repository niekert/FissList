import { URLSearchParams } from 'url';
import { prisma, Prisma } from './generated/prisma-client';
import { GraphQLServer } from 'graphql-yoga';
import { config } from 'dotEnv';
import * as playlistQueries from './queries/playlist';
import * as userQueries from './queries/user';
import * as partyMutations from './mutations/party';
import { makeHttpService, scopes } from './spotify';

config();

const resolvers = {
  Query: {
    ...userQueries,
    ...playlistQueries,
  },
  Mutation: {
    ...partyMutations,
    createUser(root, args, context) {
      return context.prisma.createUser({ name: args.name });
    },
  },
};

const REDIRECT_URI = encodeURIComponent(`${process.env.HOST}/auth-callback`);

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => {
    const accessKey = req.request.headers.authorization;

    const spotifyService = makeHttpService(accessKey);

    return {
      prisma,
      spotify: spotifyService,
    };
  },
});

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
    redirect_uri: `${process.env.HOST}/auth-callback`,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });

  try {
    const spotifyService = makeHttpService('');
    const authResp = await spotifyService.fetchAccountResource<{
      access_token: string;
      refresh_token: string;
    }>('/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    res.redirect(
      process.env.CLIENT_HOST +
        `/auth?token=${authResp.access_token}&refreshToken=${
          authResp.refresh_token
        }
    `,
    );
  } catch (err) {
    throw new Error('Something went wrong lol');
  }

  res.end();
});

server.start(() => console.log(`Server is running on ${process.env.HOST}`));
