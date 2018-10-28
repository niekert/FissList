/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMe
// ====================================================

export interface GetMe_getMe_images {
  url: string;
}

export interface GetMe_getMe {
  id: string;
  displayName: string | null;
  email: string;
  href: string;
  images: (GetMe_getMe_images | null)[] | null;
}

export interface GetMe {
  getMe: GetMe_getMe | null;
}
