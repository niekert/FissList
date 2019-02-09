export const typeDefs = /* GraphQL */ `type AggregateParty {
  count: Int!
}

type AggregateQueuedTrack {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateUserNode {
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
  updateQueuedTrack(data: QueuedTrackUpdateInput!, where: QueuedTrackWhereUniqueInput!): QueuedTrack
  updateManyQueuedTracks(data: QueuedTrackUpdateManyMutationInput!, where: QueuedTrackWhereInput): BatchPayload!
  upsertQueuedTrack(where: QueuedTrackWhereUniqueInput!, create: QueuedTrackCreateInput!, update: QueuedTrackUpdateInput!): QueuedTrack!
  deleteQueuedTrack(where: QueuedTrackWhereUniqueInput!): QueuedTrack
  deleteManyQueuedTracks(where: QueuedTrackWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createUserNode(data: UserNodeCreateInput!): UserNode!
  updateUserNode(data: UserNodeUpdateInput!, where: UserNodeWhereUniqueInput!): UserNode
  updateManyUserNodes(data: UserNodeUpdateManyMutationInput!, where: UserNodeWhereInput): BatchPayload!
  upsertUserNode(where: UserNodeWhereUniqueInput!, create: UserNodeCreateInput!, update: UserNodeUpdateInput!): UserNode!
  deleteUserNode(where: UserNodeWhereUniqueInput!): UserNode
  deleteManyUserNodes(where: UserNodeWhereInput): BatchPayload!
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
  activeTrackId: String!
  queuedTracks(where: QueuedTrackWhereInput, orderBy: QueuedTrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [QueuedTrack!]
  requestedUserIds(where: UserNodeWhereInput, orderBy: UserNodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserNode!]
  bannedUserIds(where: UserNodeWhereInput, orderBy: UserNodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserNode!]
  partyUserIds(where: UserNodeWhereInput, orderBy: UserNodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserNode!]
  lastTimeUsersChanged: String
}

type PartyConnection {
  pageInfo: PageInfo!
  edges: [PartyEdge]!
  aggregate: AggregateParty!
}

input PartyCreateInput {
  name: String!
  ownerUserId: String!
  activeTrackId: String!
  queuedTracks: QueuedTrackCreateManyInput
  requestedUserIds: UserNodeCreateManyInput
  bannedUserIds: UserNodeCreateManyInput
  partyUserIds: UserNodeCreateManyInput
  lastTimeUsersChanged: String
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
  activeTrackId_ASC
  activeTrackId_DESC
  lastTimeUsersChanged_ASC
  lastTimeUsersChanged_DESC
}

type PartyPreviousValues {
  id: ID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  ownerUserId: String!
  activeTrackId: String!
  lastTimeUsersChanged: String
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

input PartyUpdateInput {
  name: String
  ownerUserId: String
  activeTrackId: String
  queuedTracks: QueuedTrackUpdateManyInput
  requestedUserIds: UserNodeUpdateManyInput
  bannedUserIds: UserNodeUpdateManyInput
  partyUserIds: UserNodeUpdateManyInput
  lastTimeUsersChanged: String
}

input PartyUpdateManyMutationInput {
  name: String
  ownerUserId: String
  activeTrackId: String
  lastTimeUsersChanged: String
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
  activeTrackId: String
  activeTrackId_not: String
  activeTrackId_in: [String!]
  activeTrackId_not_in: [String!]
  activeTrackId_lt: String
  activeTrackId_lte: String
  activeTrackId_gt: String
  activeTrackId_gte: String
  activeTrackId_contains: String
  activeTrackId_not_contains: String
  activeTrackId_starts_with: String
  activeTrackId_not_starts_with: String
  activeTrackId_ends_with: String
  activeTrackId_not_ends_with: String
  queuedTracks_every: QueuedTrackWhereInput
  queuedTracks_some: QueuedTrackWhereInput
  queuedTracks_none: QueuedTrackWhereInput
  requestedUserIds_every: UserNodeWhereInput
  requestedUserIds_some: UserNodeWhereInput
  requestedUserIds_none: UserNodeWhereInput
  bannedUserIds_every: UserNodeWhereInput
  bannedUserIds_some: UserNodeWhereInput
  bannedUserIds_none: UserNodeWhereInput
  partyUserIds_every: UserNodeWhereInput
  partyUserIds_some: UserNodeWhereInput
  partyUserIds_none: UserNodeWhereInput
  lastTimeUsersChanged: String
  lastTimeUsersChanged_not: String
  lastTimeUsersChanged_in: [String!]
  lastTimeUsersChanged_not_in: [String!]
  lastTimeUsersChanged_lt: String
  lastTimeUsersChanged_lte: String
  lastTimeUsersChanged_gt: String
  lastTimeUsersChanged_gte: String
  lastTimeUsersChanged_contains: String
  lastTimeUsersChanged_not_contains: String
  lastTimeUsersChanged_starts_with: String
  lastTimeUsersChanged_not_starts_with: String
  lastTimeUsersChanged_ends_with: String
  lastTimeUsersChanged_not_ends_with: String
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
  queuedTrack(where: QueuedTrackWhereUniqueInput!): QueuedTrack
  queuedTracks(where: QueuedTrackWhereInput, orderBy: QueuedTrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [QueuedTrack]!
  queuedTracksConnection(where: QueuedTrackWhereInput, orderBy: QueuedTrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): QueuedTrackConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  userNode(where: UserNodeWhereUniqueInput!): UserNode
  userNodes(where: UserNodeWhereInput, orderBy: UserNodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserNode]!
  userNodesConnection(where: UserNodeWhereInput, orderBy: UserNodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserNodeConnection!
  node(id: ID!): Node
}

type QueuedTrack {
  id: ID!
  trackId: String!
  userVotes: [String!]!
  createdAt: DateTime!
  updatedAt: DateTime!
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
  connect: [QueuedTrackWhereUniqueInput!]
}

input QueuedTrackCreateuserVotesInput {
  set: [String!]
}

type QueuedTrackEdge {
  node: QueuedTrack!
  cursor: String!
}

enum QueuedTrackOrderByInput {
  id_ASC
  id_DESC
  trackId_ASC
  trackId_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type QueuedTrackPreviousValues {
  id: ID!
  trackId: String!
  userVotes: [String!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input QueuedTrackScalarWhereInput {
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

input QueuedTrackUpdateDataInput {
  trackId: String
  userVotes: QueuedTrackUpdateuserVotesInput
}

input QueuedTrackUpdateInput {
  trackId: String
  userVotes: QueuedTrackUpdateuserVotesInput
}

input QueuedTrackUpdateManyDataInput {
  trackId: String
  userVotes: QueuedTrackUpdateuserVotesInput
}

input QueuedTrackUpdateManyInput {
  create: [QueuedTrackCreateInput!]
  update: [QueuedTrackUpdateWithWhereUniqueNestedInput!]
  upsert: [QueuedTrackUpsertWithWhereUniqueNestedInput!]
  delete: [QueuedTrackWhereUniqueInput!]
  connect: [QueuedTrackWhereUniqueInput!]
  disconnect: [QueuedTrackWhereUniqueInput!]
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

input QueuedTrackUpdateWithWhereUniqueNestedInput {
  where: QueuedTrackWhereUniqueInput!
  data: QueuedTrackUpdateDataInput!
}

input QueuedTrackUpsertWithWhereUniqueNestedInput {
  where: QueuedTrackWhereUniqueInput!
  update: QueuedTrackUpdateDataInput!
  create: QueuedTrackCreateInput!
}

input QueuedTrackWhereInput {
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
  AND: [QueuedTrackWhereInput!]
  OR: [QueuedTrackWhereInput!]
  NOT: [QueuedTrackWhereInput!]
}

input QueuedTrackWhereUniqueInput {
  id: ID
}

type Subscription {
  party(where: PartySubscriptionWhereInput): PartySubscriptionPayload
  queuedTrack(where: QueuedTrackSubscriptionWhereInput): QueuedTrackSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  userNode(where: UserNodeSubscriptionWhereInput): UserNodeSubscriptionPayload
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

type UserNode {
  id: ID!
  userId: String!
}

type UserNodeConnection {
  pageInfo: PageInfo!
  edges: [UserNodeEdge]!
  aggregate: AggregateUserNode!
}

input UserNodeCreateInput {
  userId: String!
}

input UserNodeCreateManyInput {
  create: [UserNodeCreateInput!]
  connect: [UserNodeWhereUniqueInput!]
}

type UserNodeEdge {
  node: UserNode!
  cursor: String!
}

enum UserNodeOrderByInput {
  id_ASC
  id_DESC
  userId_ASC
  userId_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserNodePreviousValues {
  id: ID!
  userId: String!
}

input UserNodeScalarWhereInput {
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
  userId: String
  userId_not: String
  userId_in: [String!]
  userId_not_in: [String!]
  userId_lt: String
  userId_lte: String
  userId_gt: String
  userId_gte: String
  userId_contains: String
  userId_not_contains: String
  userId_starts_with: String
  userId_not_starts_with: String
  userId_ends_with: String
  userId_not_ends_with: String
  AND: [UserNodeScalarWhereInput!]
  OR: [UserNodeScalarWhereInput!]
  NOT: [UserNodeScalarWhereInput!]
}

type UserNodeSubscriptionPayload {
  mutation: MutationType!
  node: UserNode
  updatedFields: [String!]
  previousValues: UserNodePreviousValues
}

input UserNodeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserNodeWhereInput
  AND: [UserNodeSubscriptionWhereInput!]
  OR: [UserNodeSubscriptionWhereInput!]
  NOT: [UserNodeSubscriptionWhereInput!]
}

input UserNodeUpdateDataInput {
  userId: String
}

input UserNodeUpdateInput {
  userId: String
}

input UserNodeUpdateManyDataInput {
  userId: String
}

input UserNodeUpdateManyInput {
  create: [UserNodeCreateInput!]
  update: [UserNodeUpdateWithWhereUniqueNestedInput!]
  upsert: [UserNodeUpsertWithWhereUniqueNestedInput!]
  delete: [UserNodeWhereUniqueInput!]
  connect: [UserNodeWhereUniqueInput!]
  disconnect: [UserNodeWhereUniqueInput!]
  deleteMany: [UserNodeScalarWhereInput!]
  updateMany: [UserNodeUpdateManyWithWhereNestedInput!]
}

input UserNodeUpdateManyMutationInput {
  userId: String
}

input UserNodeUpdateManyWithWhereNestedInput {
  where: UserNodeScalarWhereInput!
  data: UserNodeUpdateManyDataInput!
}

input UserNodeUpdateWithWhereUniqueNestedInput {
  where: UserNodeWhereUniqueInput!
  data: UserNodeUpdateDataInput!
}

input UserNodeUpsertWithWhereUniqueNestedInput {
  where: UserNodeWhereUniqueInput!
  update: UserNodeUpdateDataInput!
  create: UserNodeCreateInput!
}

input UserNodeWhereInput {
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
  userId: String
  userId_not: String
  userId_in: [String!]
  userId_not_in: [String!]
  userId_lt: String
  userId_lte: String
  userId_gt: String
  userId_gte: String
  userId_contains: String
  userId_not_contains: String
  userId_starts_with: String
  userId_not_starts_with: String
  userId_ends_with: String
  userId_not_ends_with: String
  AND: [UserNodeWhereInput!]
  OR: [UserNodeWhereInput!]
  NOT: [UserNodeWhereInput!]
}

input UserNodeWhereUniqueInput {
  id: ID
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