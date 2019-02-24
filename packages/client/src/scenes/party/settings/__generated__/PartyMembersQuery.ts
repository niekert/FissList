/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PartyMembersQuery
// ====================================================

export interface PartyMembersQuery_partyMembers_requestedUsers {
  userId: string;
  displayName: string;
}

export interface PartyMembersQuery_partyMembers_partyMembers {
  userId: string;
  displayName: string;
}

export interface PartyMembersQuery_partyMembers {
  requestedUsers: PartyMembersQuery_partyMembers_requestedUsers[];
  partyMembers: PartyMembersQuery_partyMembers_partyMembers[];
}

export interface PartyMembersQuery {
  partyMembers: PartyMembersQuery_partyMembers;
}

export interface PartyMembersQueryVariables {
  partyId: string;
}
