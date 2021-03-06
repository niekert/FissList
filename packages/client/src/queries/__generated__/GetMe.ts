/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMe
// ====================================================

export interface GetMe_me_user_images {
  url: string;
}

export interface GetMe_me_user {
  id: string;
  displayName: string | null;
  email: string;
  href: string;
  images: (GetMe_me_user_images | null)[] | null;
}

export interface GetMe_me_parties {
  id: string;
  name: string;
  updatedAt: string;
  userCount: number;
}

export interface GetMe_me {
  user: GetMe_me_user;
  parties: (GetMe_me_parties | null)[];
}

export interface GetMe {
  me: GetMe_me | null;
}
