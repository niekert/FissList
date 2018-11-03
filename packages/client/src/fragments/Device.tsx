import gql from 'graphql-tag';

export const DeviceInfo = gql`
  fragment DeviceInfo on Device {
    id
    name
    isRestricted
    type
  }
`;
