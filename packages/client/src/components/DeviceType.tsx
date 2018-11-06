import * as React from 'react';
import styled from 'styled-components';
import { PhoneIcon, LaptopIcon, SpeakerIcon } from 'icons';

const Wrapper = styled.div`
  width: 45px;
  height: 45px;
`;

enum Types {
  Computer = 'Computer',
  Smartphone = 'Smartphone',
  Speaker = 'Speaker',
}

const componentMap = {
  [Types.Computer]: LaptopIcon,
  [Types.Speaker]: SpeakerIcon,
  [Types.Smartphone]: PhoneIcon,
};

function DeviceType({ type }: { type: string }) {
  const Component = componentMap[type];
  return <Wrapper as={Component} />;
}

export default DeviceType;
