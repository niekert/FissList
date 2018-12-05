export const typeDefs = /* GraphQL */ `type AggregateParty {
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
  updateManyParties(data: PartyUpdateInput!, where: PartyWhereInput): BatchPayload!
  upsertParty(where: PartyWhereUniqueInput!, create: PartyCreateInput!, update: PartyUpdateInput!): Party!
  deleteParty(where: PartyWhereUniqueInput!): Party
  deleteManyParties(where: PartyWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
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
  activeTrackIndex: Int
  createdAt: DateTime!
  updatedAt: DateTime!
  ownerUserId: String!
  playlistId: String!
  trackUris: [String!]!
  partyMemberIds: [String!]!
}

type PartyConnection {
  pageInfo: PageInfo!
  edges: [PartyEdge]!
  aggregate: AggregateParty!
}

input PartyCreateInput {
  name: String!
  activeTrackIndex: Int
  ownerUserId: String!
  playlistId: String!
  trackUris: PartyCreatetrackUrisInput
  partyMemberIds: PartyCreatepartyMemberIdsInput
}

input PartyCreatepartyMemberIdsInput {
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
  activeTrackIndex_ASC
  activeTrackIndex_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  ownerUserId_ASC
  ownerUserId_DESC
  playlistId_ASC
  playlistId_DESC
}

type PartyPreviousValues {
  id: ID!
  name: String!
  activeTrackIndex: Int
  createdAt: DateTime!
  updatedAt: DateTime!
  ownerUserId: String!
  playlistId: String!
  trackUris: [String!]!
  partyMemberIds: [String!]!
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
  activeTrackIndex: Int
  ownerUserId: String
  playlistId: String
  trackUris: PartyUpdatetrackUrisInput
  partyMemberIds: PartyUpdatepartyMemberIdsInput
}

input PartyUpdatepartyMemberIdsInput {
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
  activeTrackIndex: Int
  activeTrackIndex_not: Int
  activeTrackIndex_in: [Int!]
  activeTrackIndex_not_in: [Int!]
  activeTrackIndex_lt: Int
  activeTrackIndex_lte: Int
  activeTrackIndex_gt: Int
  activeTrackIndex_gte: Int
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
  playlistId: String
  playlistId_not: String
  playlistId_in: [String!]
  playlistId_not_in: [String!]
  playlistId_lt: String
  playlistId_lte: String
  playlistId_gt: String
  playlistId_gte: String
  playlistId_contains: String
  playlistId_not_contains: String
  playlistId_starts_with: String
  playlistId_not_starts_with: String
  playlistId_ends_with: String
  playlistId_not_ends_with: String
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
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  party(where: PartySubscriptionWhereInput): PartySubscriptionPayload
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