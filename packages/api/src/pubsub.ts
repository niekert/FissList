import { PubSub } from 'graphql-subscriptions';

export enum PubsubEvents {
  PartyTracksChanged = 'PartyTracksChanged',
}

export default new PubSub();
