export const typeDefs = /* GraphQL */ `type AggregateParty {
  count: Int!
}

type AggregateQueuedTrack {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createParty(data: PartyCreateInput!): Party!
  updateParty(data: PartyUpdateInput!, where: PartyWhereUniqueInput!): Party
  updateManyParties(data: PartyUpdateManyMutationInput!, where: PartyWhereInput): BatchPayload!
  upsertParty(where: PartyWhereUniqueInput!, create: PartyCreateInput!, update: PartyUpdateInput!): Party!
  deleteParty(where: PartyWhereUniqueInput!): Party
  deleteManyParties(where: PartyWhereInput): BatchPayload!
  createQueuedTrack(data: QueuedTrackCreateInput!): QueuedTrack!
  updateManyQueuedTracks(data: QueuedTrackUpdateManyMutationInput!, where: QueuedTrackWhereInput): BatchPayload!
  deleteManyQueuedTracks(where: QueuedTrackWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Party {
  id: ID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  ownerUserId: String!
  previousTrackUris: [String!]!
  queuedTracks(where: QueuedTrackWhereInput, orderBy: QueuedTrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [QueuedTrack!]
  trackUris: [String!]!
  requestedUserIds: [String!]!
  bannedUserIds: [String!]!
  partyUserIds: [String!]!
}

type PartyConnection {
  pageInfo: PageInfo!
  edges: [PartyEdge]!
  aggregate: AggregateParty!
}

input PartyCreatebannedUserIdsInput {
  set: [String!]
}

input PartyCreateInput {
  name: String!
  ownerUserId: String!
  previousTrackUris: PartyCreatepreviousTrackUrisInput
  queuedTracks: QueuedTrackCreateManyInput
  trackUris: PartyCreatetrackUrisInput
  requestedUserIds: PartyCreaterequestedUserIdsInput
  bannedUserIds: PartyCreatebannedUserIdsInput
  partyUserIds: PartyCreatepartyUserIdsInput
}

input PartyCreatepartyUserIdsInput {
  set: [String!]
}

input PartyCreatepreviousTrackUrisInput {
  set: [String!]
}

input PartyCreaterequestedUserIdsInput {
  set: [String!]
}

input PartyCreatetrackUrisInput {
  set: [String!]
}

type PartyEdge {
  node: Party!
  cursor: String!
}

enum PartyOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  ownerUserId_ASC
  ownerUserId_DESC
}

type PartyPreviousValues {
  id: ID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  ownerUserId: String!
  previousTrackUris: [String!]!
  trackUris: [String!]!
  requestedUserIds: [String!]!
  bannedUserIds: [String!]!
  partyUserIds: [String!]!
}

type PartySubscriptionPayload {
  mutation: MutationType!
  node: Party
  updatedFields: [String!]
  previousValues: PartyPreviousValues
}

input PartySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PartyWhereInput
  AND: [PartySubscriptionWhereInput!]
  OR: [PartySubscriptionWhereInput!]
  NOT: [PartySubscriptionWhereInput!]
}

input PartyUpdatebannedUserIdsInput {
  set: [String!]
}

input PartyUpdateInput {
  name: String
  ownerUserId: String
  previousTrackUris: PartyUpdatepreviousTrackUrisInput
  queuedTracks: QueuedTrackUpdateManyInput
  trackUris: PartyUpdatetrackUrisInput
  requestedUserIds: PartyUpdaterequestedUserIdsInput
  bannedUserIds: PartyUpdatebannedUserIdsInput
  partyUserIds: PartyUpdatepartyUserIdsInput
}

input PartyUpdateManyMutationInput {
  name: String
  ownerUserId: String
  previousTrackUris: PartyUpdatepreviousTrackUrisInput
  trackUris: PartyUpdatetrackUrisInput
  requestedUserIds: PartyUpdaterequestedUserIdsInput
  bannedUserIds: PartyUpdatebannedUserIdsInput
  partyUserIds: PartyUpdatepartyUserIdsInput
}

input PartyUpdatepartyUserIdsInput {
  set: [String!]
}

input PartyUpdatepreviousTrackUrisInput {
  set: [String!]
}

input PartyUpdaterequestedUserIdsInput {
  set: [String!]
}

input PartyUpdatetrackUrisInput {
  set: [String!]
}

input PartyWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  ownerUserId: String
  ownerUserId_not: String
  ownerUserId_in: [String!]
  ownerUserId_not_in: [String!]
  ownerUserId_lt: String
  ownerUserId_lte: String
  ownerUserId_gt: String
  ownerUserId_gte: String
  ownerUserId_contains: String
  ownerUserId_not_contains: String
  ownerUserId_starts_with: String
  ownerUserId_not_starts_with: String
  ownerUserId_ends_with: String
  ownerUserId_not_ends_with: String
  queuedTracks_every: QueuedTrackWhereInput
  queuedTracks_some: QueuedTrackWhereInput
  queuedTracks_none: QueuedTrackWhereInput
  AND: [PartyWhereInput!]
  OR: [PartyWhereInput!]
  NOT: [PartyWhereInput!]
}

input PartyWhereUniqueInput {
  id: ID
}

type Query {
  party(where: PartyWhereUniqueInput!): Party
  parties(where: PartyWhereInput, orderBy: PartyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Party]!
  partiesConnection(where: PartyWhereInput, orderBy: PartyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PartyConnection!
  queuedTracks(where: QueuedTrackWhereInput, orderBy: QueuedTrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [QueuedTrack]!
  queuedTracksConnection(where: QueuedTrackWhereInput, orderBy: QueuedTrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): QueuedTrackConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type QueuedTrack {
  trackId: String!
  userVotes: [String!]!
}

type QueuedTrackConnection {
  pageInfo: PageInfo!
  edges: [QueuedTrackEdge]!
  aggregate: AggregateQueuedTrack!
}

input QueuedTrackCreateInput {
  trackId: String!
  userVotes: QueuedTrackCreateuserVotesInput
}

input QueuedTrackCreateManyInput {
  create: [QueuedTrackCreateInput!]
}

input QueuedTrackCreateuserVotesInput {
  set: [String!]
}

type QueuedTrackEdge {
  node: QueuedTrack!
  cursor: String!
}

enum QueuedTrackOrderByInput {
  trackId_ASC
  trackId_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type QueuedTrackPreviousValues {
  trackId: String!
  userVotes: [String!]!
}

input QueuedTrackScalarWhereInput {
  trackId: String
  trackId_not: String
  trackId_in: [String!]
  trackId_not_in: [String!]
  trackId_lt: String
  trackId_lte: String
  trackId_gt: String
  trackId_gte: String
  trackId_contains: String
  trackId_not_contains: String
  trackId_starts_with: String
  trackId_not_starts_with: String
  trackId_ends_with: String
  trackId_not_ends_with: String
  AND: [QueuedTrackScalarWhereInput!]
  OR: [QueuedTrackScalarWhereInput!]
  NOT: [QueuedTrackScalarWhereInput!]
}

type QueuedTrackSubscriptionPayload {
  mutation: MutationType!
  node: QueuedTrack
  updatedFields: [String!]
  previousValues: QueuedTrackPreviousValues
}

input QueuedTrackSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: QueuedTrackWhereInput
  AND: [QueuedTrackSubscriptionWhereInput!]
  OR: [QueuedTrackSubscriptionWhereInput!]
  NOT: [QueuedTrackSubscriptionWhereInput!]
}

input QueuedTrackUpdateManyDataInput {
  trackId: String
  userVotes: QueuedTrackUpdateuserVotesInput
}

input QueuedTrackUpdateManyInput {
  create: [QueuedTrackCreateInput!]
  deleteMany: [QueuedTrackScalarWhereInput!]
  updateMany: [QueuedTrackUpdateManyWithWhereNestedInput!]
}

input QueuedTrackUpdateManyMutationInput {
  trackId: String
  userVotes: QueuedTrackUpdateuserVotesInput
}

input QueuedTrackUpdateManyWithWhereNestedInput {
  where: QueuedTrackScalarWhereInput!
  data: QueuedTrackUpdateManyDataInput!
}

input QueuedTrackUpdateuserVotesInput {
  set: [String!]
}

input QueuedTrackWhereInput {
  trackId: String
  trackId_not: String
  trackId_in: [String!]
  trackId_not_in: [String!]
  trackId_lt: String
  trackId_lte: String
  trackId_gt: String
  trackId_gte: String
  trackId_contains: String
  trackId_not_contains: String
  trackId_starts_with: String
  trackId_not_starts_with: String
  trackId_ends_with: String
  trackId_not_ends_with: String
  AND: [QueuedTrackWhereInput!]
  OR: [QueuedTrackWhereInput!]
  NOT: [QueuedTrackWhereInput!]
}

type Subscription {
  party(where: PartySubscriptionWhereInput): PartySubscriptionPayload
  queuedTrack(where: QueuedTrackSubscriptionWhereInput): QueuedTrackSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
}

input UserUpdateManyMutationInput {
  name: String
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
}
`