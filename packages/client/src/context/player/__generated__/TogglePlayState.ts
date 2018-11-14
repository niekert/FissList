/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TogglePlayState
// ====================================================

export interface TogglePlayState_togglePlayState {
  __typename: "PlayStateChange";
  isPlaying: boolean | null;
}

export interface TogglePlayState {
  togglePlayState: TogglePlayState_togglePlayState | null;
}

export interface TogglePlayStateVariables {
  type: string;
  contextUri?: string | null;
  offsetUri?: string | null;
}
