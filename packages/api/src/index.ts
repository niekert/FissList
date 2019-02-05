import { URLSearchParams } from 'url';
import { prisma, Prisma } from './generated/prisma-client';
import { createServer } from 'http';
import * as cors from 'cors';
import * as express from 'express';
import { importSchema } from 'graphql-import';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { PubSub } from 'graphql-yoga';
import { config } from 'dotenv';
import { merge } from 'lodash';
import playlistResolvers from './resolvers/playlist';
import * as path from 'path';
import partyResolvers from './resolvers/party';
import searchResolvers from './resolvers/search';
import * as fallback from 'express-history-api-fallback';
import userResolvers from './resolvers/user';
import playerResolvers from './resolvers/player';
import tracksResolver from './resolvers/tracks';
import { makeHttpService, scopes } from './spotify';

config();

const resolvers = merge(
  playlistResolvers,
  partyResolvers,
  userResolvers,
  playerResolvers,
  tracksResolver,
  searchResolvers,
);

const REDIRECT_URI = encodeURIComponent(`${process.env.HOST}/auth-callback`);
const app = express();

app.use(cors());

app.use('/static', express.static(path.resolve(__dirname, 'www/static')));

const pubsub = new PubSub();

const typeDefs = importSchema('./schema.graphql');
const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({
  schema,
  resolvers,
  subscriptions: {
    onConnect(connectionParams: any) {
      if (connectionParams.Authorization) {
        return {
          authToken: connectionParams.Authorization,
        };
      }
    },
  },
  context: ({ req, connection }) => {
    const spotifyService = connection
      ? makeHttpService(connection.context.authToken)
      : makeHttpService(req.headers.authorization);

    return {
      prisma,
      pubsub,
      spotify: spotifyService,
    };
  },
});

app.get('/authorize', (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${
      process.env.CLIENT_ID
    }&scope=${encodeURIComponent(scopes)}&redirect_uri=${REDIRECT_URI}`,
  );
});

app.get('/auth-callback', async (req, res) => {
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

// app.use(fallback('index.html', { root: path.resolve(__dirname, 'www') }));

const httpServer = createServer(app);
apolloServer.applyMiddleware({ app });

apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(process.env.PORT || 4000, () =>
  console.log(`Server is running on ${process.env.HOST}`),
);
